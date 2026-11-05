// /api/stkquery.js - Vercel Serverless Function to query Safaricom Daraja STK Push Status

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

  const { checkoutRequestId } = req.body || {};

  if (!checkoutRequestId) {
    return res.status(400).json({ ok: false, message: 'checkoutRequestId is required.' });
  }

  // Preview / Simulation mode fallback
  if (checkoutRequestId.startsWith('mock_') || checkoutRequestId === 'preview' || !consumerKey || !consumerSecret) {
    const elapsed = Date.now() - (Number(checkoutRequestId.replace('mock_', '')) || 0);
    // Simulate customer entering PIN after 6 seconds
    if (elapsed < 6000) {
      return res.status(200).json({
        ok: true,
        status: 'PENDING',
        resultDesc: 'Waiting for customer PIN (simulation)'
      });
    }
    return res.status(200).json({
      ok: true,
      status: 'COMPLETED',
      resultCode: 0,
      resultDesc: 'Simulated payment approved',
      receipt: 'SIM' + Math.random().toString(36).substring(2, 9).toUpperCase()
    });
  }

  try {
    const baseUrl = isProduction
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';

    // 1. Generate OAuth Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: { Authorization: `Basic ${auth}` }
    });

    if (!tokenRes.ok) {
      return res.status(200).json({ ok: true, status: 'PENDING', message: 'Waiting for token' });
    }

    const { access_token } = await tokenRes.json();

    // 2. Build Query Payload
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const queryRes = await fetch(`${baseUrl}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      })
    });

    const data = await queryRes.json().catch(() => ({}));

    // Check Safaricom ResultCode
    const resultCode = String(data.ResultCode ?? '');
    const desc = data.ResultDesc || data.errorMessage || data.ResponseDescription || '';

    if (resultCode === '0') {
      return res.status(200).json({
        ok: true,
        status: 'COMPLETED',
        resultCode: 0,
        resultDesc: desc
      });
    }

    if (resultCode === '1032') {
      return res.status(200).json({
        ok: true,
        status: 'CANCELLED',
        resultCode: 1032,
        resultDesc: 'Payment cancelled on phone.'
      });
    }

    if (resultCode === '1037') {
      return res.status(200).json({
        ok: true,
        status: 'TIMEOUT',
        resultCode: 1037,
        resultDesc: 'PIN entry timed out.'
      });
    }

    // If still in process (ResultCode empty or processing message)
    if (desc.toLowerCase().includes('being processed') || desc.toLowerCase().includes('unable to lock') || !resultCode) {
      return res.status(200).json({
        ok: true,
        status: 'PENDING',
        resultDesc: desc || 'Waiting for customer PIN'
      });
    }

    // Any other failure code (e.g., insufficient funds, wrong pin)
    return res.status(200).json({
      ok: true,
      status: 'FAILED',
      resultCode: resultCode,
      resultDesc: desc || 'Payment could not be completed.'
    });
  } catch (err) {
    console.error('[Daraja Query Exception]', err);
    return res.status(200).json({ ok: true, status: 'PENDING', message: 'Checking...' });
  }
};
