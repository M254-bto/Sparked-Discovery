// /api/register.js - Vercel Serverless Function to send registration emails via Resend

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

  const { parent, kids, phone, amount, paymentStatus } = req.body || {};

  if (!parent || !parent.email) {
    return res.status(400).json({ ok: false, message: 'Parent details and email are required.' });
  }

  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
  const adminEmail = (process.env.ADMIN_EMAIL || 'sparkeducationthika@gmail.com').trim();
  const fromEmail = (process.env.RESEND_FROM_EMAIL || 'Inventors Camp by SparkEd <noreply@resend.client.afribs.co.ke>').replace(/^["']|["']$/g, '').trim();

  // If RESEND_API_KEY is not configured yet
  if (!resendApiKey) {
    console.warn('[Resend] RESEND_API_KEY is not configured in Vercel environment variables. Running in preview mode.');
    return res.status(200).json({
      ok: true,
      preview: true,
      adminNotification: 'preview_mode (RESEND_API_KEY not set in Vercel)',
      parentConfirmation: 'preview_mode (RESEND_API_KEY not set in Vercel)',
      message: 'Add RESEND_API_KEY in Vercel Settings > Environment Variables, then Redeploy to send live emails.'
    });
  }

  try {
    const formattedAmount = (amount || 0).toLocaleString('en-KE');
    const kidsListHtml = (kids || []).map((k, i) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px 12px; font-weight: 600; color: #173f32;">Child ${i + 1}: ${k.name || 'Learner'}</td>
        <td style="padding: 10px 12px; color: #4b5563;">Age: ${k.age || '—'}</td>
        <td style="padding: 10px 12px; font-weight: 600; color: #173f32;">${k.mode === 'virtual' ? 'Online (KES 5,000)' : 'In-person (KES 8,000)'}</td>
      </tr>
    `).join('');

    let adminStatus = { ok: false };
    let parentStatus = { ok: false };

    // 1. Send Admin Notification Email (sparkeducationthika@gmail.com)
    try {
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          reply_to: parent.email,
          subject: `New Camp Registration: ${parent.name} (${kids?.length || 1} learner${kids?.length === 1 ? '' : 's'})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #173f32; border: 1px solid #e5e7eb; border-radius: 8px; background: #ffffff;">
              <div style="border-bottom: 2px solid #c39132; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #173f32; font-size: 22px;">New Camp Registration Received</h2>
                <p style="margin: 4px 0 0; color: #748078; font-size: 14px;">SparkEd Inventors Camp (16th–27th November)</p>
              </div>

              <h3 style="margin: 0 0 10px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #748078;">Parent / Guardian</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px; font-size: 14px;">
                <tr><td style="padding: 6px 0; width: 130px; color: #748078;">Full Name:</td><td style="font-weight: 600; color: #173f32;">${parent.name}</td></tr>
                <tr><td style="padding: 6px 0; color: #748078;">Phone:</td><td><a href="tel:${parent.phone}" style="color: #173f32; font-weight: 600;">${parent.phone}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #748078;">Email:</td><td><a href="mailto:${parent.email}" style="color: #173f32;">${parent.email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #748078;">M-Pesa Number:</td><td>${phone || parent.phone}</td></tr>
                <tr><td style="padding: 6px 0; color: #748078;">Payment Status:</td><td><span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 13px;">${paymentStatus || 'Pending'}</span></td></tr>
                <tr><td style="padding: 6px 0; color: #748078;">Total Fee:</td><td style="font-size: 16px; font-weight: 700; color: #173f32;">KES ${formattedAmount}</td></tr>
              </table>

              <h3 style="margin: 20px 0 10px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #748078;">Registered Learners</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #fdfbf7; border-radius: 6px; overflow: hidden; border: 1px solid #e5e7eb;">
                ${kidsListHtml}
              </table>
            </div>
          `
        })
      });

      const adminData = await adminRes.json().catch(() => ({}));
      adminStatus = { ok: adminRes.ok, data: adminData };

      if (!adminRes.ok) {
        console.error('[Resend Admin Email Failed]:', adminRes.status, adminData);
      } else {
        console.log('[Resend Admin Email Sent]:', adminData.id);
      }
    } catch (e) {
      console.error('[Resend Admin Fetch Exception]:', e.message);
      adminStatus = { ok: false, error: e.message };
    }

    // 2. Send Parent Confirmation Email
    try {
      const parentRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [parent.email],
          reply_to: adminEmail,
          subject: `Registration Confirmed: SparkEd Inventors Camp (16th–27th Nov)`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px 20px; color: #24483b; background: #f8f1e4; border-radius: 12px;">
              <div style="background: #ffffff; padding: 30px 26px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div style="border-bottom: 2px solid #c39132; padding-bottom: 16px; margin-bottom: 24px;">
                  <h1 style="margin: 0; color: #173f32; font-size: 24px; font-family: Georgia, serif;">SparkEd Inventors Camp</h1>
                  <p style="margin: 6px 0 0; color: #748078; font-size: 14px;">Your ideas. Your inventions. Your future.</p>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                  Dear <strong>${parent.name.split(' ')[0]}</strong>,
                </p>
                <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0 0 22px;">
                  Thank you for registering for the <strong>SparkEd Inventors Camp</strong>! We are delighted to confirm your child's spot for an exciting two-week journey of imagination, experimenting, and building.
                </p>

                <div style="background: #fdfbf7; border: 1px solid #dcd4c5; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #173f32;">📅 Essential Event Details</h3>
                  <ul style="margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px; color: #374151;">
                    <li><strong>Programme Dates:</strong> 16th – 27th November</li>
                    <li><strong>Duration:</strong> 2-week immersive camp</li>
                    <li><strong>In-Person Venue:</strong> Section 9, Thika (11:00 AM – 1:00 PM)</li>
                    <li><strong>Online Sessions:</strong> Evening sessions (7:00 PM – 8:30 PM)</li>
                  </ul>
                </div>

                <h3 style="margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #748078;">Registered Learners</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                  ${kidsListHtml}
                </table>

                <div style="background: #173f32; color: #ffffff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                  <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #e7d4a2; font-weight: 600; margin-bottom: 10px;">M-Pesa Payment Details</div>
                  <table style="width: 100%; color: #ffffff; font-size: 14px;">
                    <tr><td style="padding: 4px 0; color: rgba(255,255,255,0.75);">Paybill:</td><td style="font-weight: 700; font-family: monospace; font-size: 16px; color: #e7d4a2;">4331541</td></tr>
                    <tr><td style="padding: 4px 0; color: rgba(255,255,255,0.75);">Account:</td><td style="font-weight: 700; font-family: monospace; font-size: 16px; color: #e7d4a2;">${parent.name}</td></tr>
                    <tr><td style="padding: 4px 0; color: rgba(255,255,255,0.75);">Total Fee:</td><td style="font-weight: 700; font-size: 16px;">KES ${formattedAmount}</td></tr>
                    <tr><td style="padding: 4px 0; color: rgba(255,255,255,0.75);">Status:</td><td>${paymentStatus}</td></tr>
                  </table>
                </div>

                <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 0 0 8px;">
                  Detailed schedules, preparation instructions, and joining links will be sent to this email address before camp starts.
                </p>
                <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 0 0 22px;">
                  Have any questions? Simply reply to this email or reach us at <a href="mailto:${adminEmail}" style="color: #173f32; font-weight: 600;">${adminEmail}</a>.
                </p>

                <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 13px; color: #9ca3af;">
                  Warm regards,<br>
                  <strong style="color: #173f32;">The SparkEd Team</strong><br>
                  <em>The Future Sparked.</em>
                </div>
              </div>
            </div>
          `
        })
      });

      const parentData = await parentRes.json().catch(() => ({}));
      parentStatus = { ok: parentRes.ok, data: parentData };

      if (!parentRes.ok) {
        console.error('[Resend Parent Email Failed]:', parentRes.status, parentData);
        if (parentData?.message && parentData.message.includes('testing emails')) {
          console.warn('[Resend Domain Notice]: onboarding@resend.dev test sender only delivers to the Resend account owner. Add a verified custom domain on resend.com/domains to send to any parent email.');
        }
      } else {
        console.log('[Resend Parent Email Sent]:', parentData.id);
      }
    } catch (e) {
      console.error('[Resend Parent Fetch Exception]:', e.message);
      parentStatus = { ok: false, error: e.message };
    }

    return res.status(200).json({
      ok: true,
      adminNotification: adminStatus.ok ? 'sent' : (adminStatus.data?.message || 'failed'),
      parentConfirmation: parentStatus.ok ? 'sent' : (parentStatus.data?.message || 'failed')
    });
  } catch (err) {
    console.error('[Resend Exception]', err);
    return res.status(500).json({ ok: false, message: 'Server error processing registration emails.' });
  }
};
