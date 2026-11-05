// /api/stkpush.js - Vercel Serverless Function for Safaricom Daraja STK Push

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  const { phone, amount, parent, kids } = req.body || {};

  if (!phone || !amount) {
    return res.status(400).json({ ok: false, message: 'Phone and amount are required.' });
  }

  // Daraja environment variables (sanitized)
  const consumerKey = (process.env.DARAJA_CONSUMER_KEY || '').trim();
  const consumerSecret = (process.env.DARAJA_CONSUMER_SECRET || '').trim();
  const shortcode = (process.env.DARAJA_BUSINESS_SHORTCODE || '4331541').trim();
  const passkey = (process.env.DARAJA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919').trim();
  const envVar = (process.env.DARAJA_ENVIRONMENT || '').trim().toLowerCase();
  const isProduction = envVar === 'production' || (envVar !== 'sandbox' && shortcode !== '174379');
  const transactionType = (process.env.DARAJA_TRANSACTION_TYPE || 'CustomerPayBillOnline').trim();
  const host = (req.headers && req.headers.host) || 'localhost';
  const callbackUrl = (process.env.DARAJA_CALLBACK_URL || `https://${host}/api/callback`).trim();

  // If credentials are not yet configured in environment variables, provide smooth fallback preview mode
  if (!consumerKey || !consumerSecret) {
    console.warn('[Daraja] Credentials not configured in Vercel environment variables. Falling back to preview mode.');
    return res.status(200).json({
      ok: true,
      preview: true,
      checkoutRequestId: 'mock_' + Date.now(),
      message: 'Preview mode: Set DARAJA_CONSUMER_KEY and DARAJA_CONSUMER_SECRET in Vercel to trigger live M-Pesa prompts.'
    });
  }

  try {
    const baseUrl = isProduction
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';

    // 1. Generate OAuth Access Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('[Daraja Auth Error] Target:', baseUrl, 'Status:', tokenRes.status, 'Response:', errText);
      return res.status(502).json({
        ok: false,
        message: 'The M-Pesa automated prompt is currently unavailable. You can register now and pay via Paybill 4331541.'
      });
    }

    const { access_token } = await tokenRes.json();

    // 2. Format Timestamp: YYYYMMDDHHmmss
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    // 3. Generate Password: base64(BusinessShortCode + Passkey + Timestamp)
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    // Format phone to 254XXXXXXXXX
    let formattedPhone = String(phone).replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1);
    }

    // 4. Initiate STK Push
    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: transactionType,
      Amount: Math.round(Number(amount)),
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: (parent && parent.name ? parent.name.replace(/[^a-zA-Z0-9 ]/g, '').trim().slice(0, 12) : 'SparkEd Camp') || 'SparkEd Camp',
      TransactionDesc: `Camp Registration - ${kids && kids.length ? kids.map(k => k.name).filter(Boolean).join(', ') : 'Learner'}`.slice(0, 32)
    };

    const stkRes = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stkPayload)
    });

    const stkData = await stkRes.json();

    if (stkRes.ok && stkData.ResponseCode === '0') {
      return res.status(200).json({
        ok: true,
        merchantRequestId: stkData.MerchantRequestID,
        checkoutRequestId: stkData.CheckoutRequestID,
        message: stkData.CustomerMessage || 'STK Push sent successfully.'
      });
    } else {
      console.error('[Daraja STK Error]:', stkData);
      return res.status(400).json({
        ok: false,
        message: 'The M-Pesa prompt was not completed. You can register now and pay via Paybill 4331541.'
      });
    }
  } catch (err) {
    console.error('[Daraja Exception]:', err);
    return res.status(500).json({
      ok: false,
      message: 'Unable to connect to the M-Pesa service at this time. Please complete your registration and pay later via Paybill.'
    });
  }
};
