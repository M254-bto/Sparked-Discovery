import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = `${process.env.FROM_NAME ?? "SparkEd"} <${process.env.FROM_EMAIL ?? "onboarding@resend.dev"}>`;
const ADMIN = process.env.ADMIN_EMAIL!;

// ─── Label helpers ────────────────────────────────────────────────────────────

const codingLabels: Record<string, string> = {
  none: "No — this will be their first time",
  scratch: "Yes — Scratch",
  python: "Yes — Python",
  other: "Yes — Other",
};

const motivationLabels: Record<string, string> = {
  confidence: "Building confidence with technology",
  coding: "Learning coding and problem-solving",
  future: "Preparing for the future digital world",
  creativity: "Exploring creativity through technology",
  other: "Something else",
};

const enrollmentLabels: Record<string, string> = {
  yes: "Yes, definitely",
  maybe: "Possibly — would like more information",
  notsure: "Not sure yet",
};

// ─── Email templates ──────────────────────────────────────────────────────────

function parentConfirmationHtml(parentName: string, childName: string): string {
  const first = parentName.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SparkEd Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#F8F7F4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:40px auto;">
    <tr>
      <td style="padding:0 20px;">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #E8E5DF;overflow:hidden;">

          <!-- Gold top bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#B8965A 0%,#D4AF7A 50%,#B8965A 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:40px 44px 32px;border-bottom:1px solid #F0EDE7;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#B8965A;font-weight:600;">SparkEd · Discovery Week</p>
              <h1 style="margin:0;font-size:26px;color:#0A1628;font-weight:600;line-height:1.2;">Registration Confirmed</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 44px;">
              <p style="margin:0 0 20px;font-size:16px;color:#3A3A3A;line-height:1.7;">Dear ${first},</p>
              <p style="margin:0 0 20px;font-size:15px;color:#555550;line-height:1.8;">
                Thank you for registering <strong style="color:#0A1628;">${childName}</strong> for SparkEd Discovery Week. We are thrilled to welcome them to this experience.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#555550;line-height:1.8;">
                Our team will be in touch within <strong style="color:#0A1628;">24 hours</strong> to confirm all details and share everything you need before the programme begins.
              </p>

              <!-- Info block -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F4;border-radius:12px;border:1px solid #E8E5DF;margin-bottom:32px;">
                <tr><td style="padding:24px 28px;">
                  <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9B9B9B;font-weight:600;">What Happens Next</p>
                  <table cellpadding="0" cellspacing="0">
                    ${["Confirmation call from our team", "Pre-programme welcome guide", "Day-by-day schedule and what to bring"].map(
                      (item) =>
                        `<tr><td style="padding:5px 0;font-size:14px;color:#555550;line-height:1.6;">
                          <span style="color:#B8965A;margin-right:10px;">&#9654;</span>${item}
                        </td></tr>`
                    ).join("")}
                  </table>
                </td></tr>
              </table>

              <p style="margin:0;font-size:15px;color:#555550;font-style:italic;">We look forward to welcoming ${childName} to SparkEd.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 44px;border-top:1px solid #F0EDE7;background:#FDFCFA;">
              <p style="margin:0;font-size:12px;color:#BBBBBB;line-height:1.6;">
                SparkEd &nbsp;·&nbsp; Empowering the next generation of creators
              </p>
            </td>
          </tr>

        </table>
        <!-- End card -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

function adminNotificationHtml(data: Record<string, string>): string {
  const rows = [
    ["Parent Name", data.parentName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Area", data.area || "—"],
    ["Child's Name", data.childName],
    ["Age", data.age ? `${data.age} years` : "—"],
    ["School", data.school || "—"],
    ["Grade", data.grade || "—"],
    ["Coding Experience", `${codingLabels[data.codingExp] ?? data.codingExp}${data.codingOther ? ` (${data.codingOther})` : ""}`],
    ["Parent Motivation", `${motivationLabels[data.parentMotivation] ?? data.parentMotivation}${data.motivationOther ? ` — ${data.motivationOther}` : ""}`],
    ["Ongoing Enrollment Interest", enrollmentLabels[data.longEnrollment] ?? data.longEnrollment],
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New SparkEd Registration</title>
</head>
<body style="margin:0;padding:0;background:#F8F7F4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:40px auto;">
    <tr>
      <td style="padding:0 20px;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #E8E5DF;overflow:hidden;">

          <!-- Gold top bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#0A1628 0%,#162036 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:36px 44px 28px;border-bottom:1px solid #F0EDE7;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#9B9B9B;">SparkEd Admin</p>
              <h1 style="margin:0;font-size:22px;color:#0A1628;font-weight:600;">New Registration Received</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#9B9B9B;">${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
            </td>
          </tr>

          <!-- Data table -->
          <tr>
            <td style="padding:32px 44px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${rows
                  .map(
                    ([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? "#FDFCFA" : "#ffffff"};">
                  <td style="padding:11px 14px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9B9B9B;white-space:nowrap;border-radius:6px 0 0 6px;width:38%;">${label}</td>
                  <td style="padding:11px 14px;font-size:14px;color:#1A1A1A;font-weight:500;border-radius:0 6px 6px 0;">${value || "—"}</td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          <!-- CTA hint -->
          <tr>
            <td style="padding:0 44px 36px;">
              <p style="margin:0;font-size:13px;color:#9B9B9B;line-height:1.6;">
                Follow up via phone: <strong style="color:#0A1628;">${data.phone}</strong> &nbsp;·&nbsp; Reply to: <strong style="color:#0A1628;">${data.email}</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 44px;border-top:1px solid #F0EDE7;background:#FDFCFA;">
              <p style="margin:0;font-size:11px;color:#CCCCCC;">SparkEd Discovery Week · Registration System</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Record<string, string>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { parentName, email, childName } = body;

  if (!parentName || !email || !childName) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  try {
    // Send both emails concurrently
    const [clientResult, adminResult] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: [email],
        subject: `${childName}'s spot is confirmed — SparkEd Discovery Week`,
        html: parentConfirmationHtml(parentName, childName),
      }),
      resend.emails.send({
        from: FROM,
        to: [ADMIN],
        subject: `New Registration: ${childName} (${parentName}) — SparkEd`,
        html: adminNotificationHtml(body),
        replyTo: email,
      }),
    ]);

    if (clientResult.error || adminResult.error) {
      console.error("Resend partial error:", clientResult.error ?? adminResult.error);
      return NextResponse.json(
        { error: "Email delivery issue. Please contact us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send emails. Please try again." },
      { status: 500 }
    );
  }
}
