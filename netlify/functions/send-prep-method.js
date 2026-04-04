exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = (body.email || '').trim().toLowerCase();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) };
  }

  // ── SAVE TO SUPABASE ──
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/lead_magnet_subscribers`, {
      method: 'POST',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates',
      },
      body: JSON.stringify({ email, source: 'sunday_prep_method' }),
    });
  } catch (err) {
    console.error('Supabase save error:', err);
    // don't block the email send if DB save fails
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Sunday Prep Method</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#0a0f1e;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <img src="https://app.ketocontractor.com/kc-logo.png" alt="Keto Contractor" width="64" height="64" style="border-radius:12px;display:block;margin:0 auto 16px;" />
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#06b6d4;">Keto Contractor</p>
              <h1 style="margin:8px 0 0;font-size:28px;font-weight:900;color:#f8fafc;letter-spacing:-0.02em;line-height:1.2;">The Sunday Prep Method</h1>
              <p style="margin:10px 0 0;font-size:15px;color:#94a3b8;line-height:1.6;">One day of prep. Six days of food. Zero daily decisions.</p>
            </td>
          </tr>

          <!-- INTRO -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px 24px;">
              <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">This is the exact system that started Keto Contractor. Six days a week on job sites, one day off. The only way to eat right was to handle the whole week in one session — no shortcuts, no excuses.</p>
              <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;">Here's the 5-step system:</p>
            </td>
          </tr>

          <!-- STEP 1 -->
          <tr>
            <td style="background:#ffffff;padding:8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;text-align:center;line-height:36px;font-size:14px;font-weight:900;color:#06b6d4;">1</div>
                  </td>
                  <td style="padding-left:12px;">
                    <h2 style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0f172a;">Saturday Night — Pick Your Recipes</h2>
                    <p style="margin:0;font-size:14px;color:#475569;line-height:1.65;">Open Keto Contractor and generate 2 recipes — one breakfast, one lunch. Scale each to 6 servings. That's your whole week. Check your pantry for what you already have, then let the app build your shopping list automatically.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="background:#ffffff;padding:4px 40px;"><hr style="border:none;border-top:1px solid #f1f5f9;margin:12px 0;" /></td></tr>

          <!-- STEP 2 -->
          <tr>
            <td style="background:#ffffff;padding:8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;text-align:center;line-height:36px;font-size:14px;font-weight:900;color:#06b6d4;">2</div>
                  </td>
                  <td style="padding-left:12px;">
                    <h2 style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0f172a;">Sunday Morning — Grocery Run (30 min)</h2>
                    <p style="margin:0;font-size:14px;color:#475569;line-height:1.65;">Shop with your list. Buy in bulk — protein especially. If you don't have 6 meal prep containers, grab them while you're there. Get in, get out. This is logistics, not browsing.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="background:#ffffff;padding:4px 40px;"><hr style="border:none;border-top:1px solid #f1f5f9;margin:12px 0;" /></td></tr>

          <!-- STEP 3 -->
          <tr>
            <td style="background:#ffffff;padding:8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;text-align:center;line-height:36px;font-size:14px;font-weight:900;color:#06b6d4;">3</div>
                  </td>
                  <td style="padding-left:12px;">
                    <h2 style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0f172a;">The Cook Session (2–3 Hours)</h2>
                    <p style="margin:0;font-size:14px;color:#475569;line-height:1.65;">Start the longest cook first — proteins take the most time. Use the downtime while things are in the oven or on the stove to prep sides and veggies. Cook Mode in the app walks you through each recipe step by step so nothing gets burned and nothing gets missed.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="background:#ffffff;padding:4px 40px;"><hr style="border:none;border-top:1px solid #f1f5f9;margin:12px 0;" /></td></tr>

          <!-- STEP 4 -->
          <tr>
            <td style="background:#ffffff;padding:8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;text-align:center;line-height:36px;font-size:14px;font-weight:900;color:#06b6d4;">4</div>
                  </td>
                  <td style="padding-left:12px;">
                    <h2 style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0f172a;">The Container System</h2>
                    <p style="margin:0;font-size:14px;color:#475569;line-height:1.65;">Portion everything into 6 containers per meal while it's still warm. Stack breakfast on the left shelf, lunch on the right. Label them if you want — or just count. Everything goes in the fridge Sunday night. The week is handled.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="background:#ffffff;padding:4px 40px;"><hr style="border:none;border-top:1px solid #f1f5f9;margin:12px 0;" /></td></tr>

          <!-- STEP 5 -->
          <tr>
            <td style="background:#ffffff;padding:8px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;text-align:center;line-height:36px;font-size:14px;font-weight:900;color:#06b6d4;">5</div>
                  </td>
                  <td style="padding-left:12px;">
                    <h2 style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0f172a;">Monday–Saturday — Grab and Go</h2>
                    <p style="margin:0;font-size:14px;color:#475569;line-height:1.65;">Morning: grab your breakfast container, go. Lunch: same. No thinking, no deciding, no failing. You've already done the work. You show up to the job fueled and on track — every single day.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#0f172a;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#06b6d4;">Ready to automate the whole system?</p>
              <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.6;">Keto Contractor handles the recipes, the plan, and the shopping list — in minutes.</p>
              <a href="https://app.ketocontractor.com/login" style="display:inline-block;background:#06b6d4;color:#000;font-weight:800;font-size:15px;padding:14px 32px;border-radius:10px;text-decoration:none;">Start Free — 7 Days on Us</a>
              <p style="margin:16px 0 0;font-size:12px;color:#475569;">7-day free trial. Cancel anytime.</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0a0f1e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#334155;line-height:1.6;">
                © 2026 Keto Contractor · <a href="mailto:support@ketocontractor.com" style="color:#475569;text-decoration:none;">support@ketocontractor.com</a>
              </p>
              <p style="margin:0 0 8px;font-size:11px;color:#475569;line-height:1.6;">
                Keto Contractor · support@ketocontractor.com
              </p>
              <p style="margin:0;font-size:11px;color:#475569;line-height:1.6;">
                You received this email because you requested the Sunday Prep Method at ketocontractor.com.<br />
                Don't want to hear from us? <a href="mailto:support@ketocontractor.com?subject=Unsubscribe" style="color:#64748b;text-decoration:underline;">Click here to unsubscribe</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Keto Contractor <support@ketocontractor.com>',
        to: [email],
        subject: 'The Sunday Prep Method — Your Free System',
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Email failed to send' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
