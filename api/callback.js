// /api/callback.js - Safaricom Daraja STK Push Result Webhook

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const callbackData = req.body?.Body?.stkCallback;
    console.log('[Daraja Callback] Payload:', JSON.stringify(callbackData, null, 2));

    if (!callbackData) {
      return res.status(400).json({ message: 'Invalid callback payload' });
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callbackData;

    if (ResultCode === 0) {
      // Payment Successful
      let receiptNumber = '';
      let amount = 0;
      let phone = '';

      if (CallbackMetadata?.Item) {
        for (const item of CallbackMetadata.Item) {
          if (item.Name === 'MpesaReceiptNumber') receiptNumber = item.Value;
          if (item.Name === 'Amount') amount = item.Value;
          if (item.Name === 'PhoneNumber') phone = item.Value;
        }
      }

      console.log(`[Daraja Payment SUCCESS] Receipt: ${receiptNumber}, Amount: ${amount}, Phone: ${phone}, CheckoutRequestID: ${CheckoutRequestID}`);
    } else {
      console.warn(`[Daraja Payment CANCELLED/FAILED] Code: ${ResultCode}, Reason: ${ResultDesc}`);
    }

    // Always acknowledge Safaricom callback with 200 OK
    return res.status(200).json({ ResultCode: 0, ResultDesc: 'Callback processed successfully' });
  } catch (err) {
    console.error('[Daraja Callback Error]:', err);
    return res.status(200).json({ ResultCode: 0, ResultDesc: 'Callback acknowledged with error' });
  }
};

