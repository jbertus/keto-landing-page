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
      body: JSON.stringify({ email, source: 't2d_macro_map' }),
    });
  } catch (err) {
    console.error('Supabase save error:', err);
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The T2D Macro Map</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="660" cellpadding="0" cellspacing="0" style="max-width:660px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#0a0f1e;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <img src="https://app.ketocontractor.com/kc-logo.png" alt="Keto Contractor" width="64" height="64" style="border-radius:12px;display:block;margin:0 auto 16px;" />
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#06b6d4;">Keto Contractor</p>
              <h1 style="margin:8px 0 0;font-size:28px;font-weight:900;color:#f8fafc;letter-spacing:-0.02em;line-height:1.2;">The T2D Macro Map</h1>
              <p style="margin:10px 0 0;font-size:15px;color:#94a3b8;line-height:1.6;">Here's exactly how to compute your daily macros, split them across meals, and adjust for snacks, dessert, and medication. The actual math.</p>
            </td>
          </tr>

          <!-- INTRO -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px 24px;">
              <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">If you have Type 2 diabetes, "watch your carbs" is the most useless advice you'll ever get. <strong>How many carbs, in which meals, with what protein and fat, and what changes if you add a snack or have dessert</strong> — those are the actual questions.</p>
              <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">Below is the full framework. Every calculation, every rule, every override. We'll use a baseline example user — <strong>Sarah, 165 lbs, lightly active, Type 2 on Metformin</strong> — so you can see the numbers land.</p>
              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;font-style:italic;">Educational, not medical advice. Talk to your doctor before changing anything that affects your management plan, especially if you're on insulin or other glucose-affecting medication.</p>
            </td>
          </tr>

          <!-- ============== PART A: DAILY TARGETS ============== -->
          <tr>
            <td style="background:#0f172a;color:#f8fafc;padding:20px 40px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#06b6d4;">Part A</p>
              <h2 style="margin:4px 0 0;font-size:22px;font-weight:900;color:#f8fafc;letter-spacing:-0.02em;">Compute Sarah's Daily Targets</h2>
            </td>
          </tr>

          <!-- STEP A1: BMR -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step A1 · Basal Metabolic Rate (Mifflin-St Jeor)</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">BMR is the calories your body burns at complete rest. Different formulas for biological male vs female.</p>
              <div style="background:#0f172a;color:#f8fafc;padding:14px 16px;border-radius:8px;font-family:'SF Mono',Monaco,Consolas,monospace;font-size:13px;line-height:1.8;">
                BMR (female) = 10·kg + 6.25·cm − 5·age − 161<br />
                BMR (male)   = 10·kg + 6.25·cm − 5·age + 5
              </div>
              <p style="margin:10px 0 0;font-size:14px;color:#475569;line-height:1.65;">Sarah: 165 lbs (75 kg), 5'5" (165 cm), 48 years old, female.<br />BMR = 10(75) + 6.25(165) − 5(48) − 161 = 750 + 1031 − 240 − 161 = <strong>1380 cal/day</strong></p>
            </td>
          </tr>

          <!-- STEP A2: TDEE -->
          <tr>
            <td style="background:#ffffff;padding:20px 40px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step A2 · Total Daily Energy Expenditure</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">Multiply BMR by activity level, then adjust for goal.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#f8fafc;"><td style="padding:8px 10px;font-weight:700;">Activity</td><td style="padding:8px 10px;font-weight:700;text-align:right;">Multiplier</td></tr>
                <tr><td style="padding:8px 10px;border-top:1px solid #e2e8f0;">Sedentary (desk job)</td><td style="padding:8px 10px;border-top:1px solid #e2e8f0;text-align:right;">×1.2</td></tr>
                <tr style="background:#ecfeff;"><td style="padding:8px 10px;border-top:1px solid #e2e8f0;"><strong>Lightly active (1–3×/wk)</strong> — Sarah</td><td style="padding:8px 10px;border-top:1px solid #e2e8f0;text-align:right;"><strong>×1.375</strong></td></tr>
                <tr><td style="padding:8px 10px;border-top:1px solid #e2e8f0;">Moderately active (3–5×/wk)</td><td style="padding:8px 10px;border-top:1px solid #e2e8f0;text-align:right;">×1.55</td></tr>
                <tr><td style="padding:8px 10px;border-top:1px solid #e2e8f0;">Very active (6–7×/wk)</td><td style="padding:8px 10px;border-top:1px solid #e2e8f0;text-align:right;">×1.725</td></tr>
                <tr><td style="padding:8px 10px;border-top:1px solid #e2e8f0;">Extra active (physical job + training)</td><td style="padding:8px 10px;border-top:1px solid #e2e8f0;text-align:right;">×1.9</td></tr>
              </table>
              <p style="margin:10px 0 0;font-size:14px;color:#475569;line-height:1.65;">Goal adjustment: <strong>−500 cal/day to lose ~1 lb/wk</strong>, 0 to maintain, +250 to gain.</p>
              <p style="margin:6px 0 0;font-size:14px;color:#475569;line-height:1.65;">Sarah wants to lose weight: TDEE = 1380 × 1.375 − 500 = 1397 cal/day. Round to <strong>1400 cal/day</strong>.</p>
            </td>
          </tr>

          <!-- STEP A3: CARB CAP -->
          <tr>
            <td style="background:#ffffff;padding:20px 40px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step A3 · Daily Net Carb Cap (scales by T2D stage)</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">Net carbs come out of total calories at a percentage that depends on your stage. Stricter stages = less margin to clear carbs.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#0f172a;color:#f8fafc;">
                  <td style="padding:9px 11px;font-weight:700;font-size:12px;">Your situation</td>
                  <td style="padding:9px 11px;font-weight:700;font-size:12px;text-align:center;">% of cal</td>
                  <td style="padding:9px 11px;font-weight:700;font-size:12px;text-align:right;">Sarah @ 1,400 cal</td>
                </tr>
                <tr style="background:#fef2f2;">
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;"><strong>Type 2 on insulin</strong></td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:center;">5%</td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:right;">~18g</td>
                </tr>
                <tr style="background:#fff7ed;">
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;"><strong>Type 2 on medication</strong> (Metformin, etc.) — Sarah</td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:center;">7%</td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:right;"><strong>~25g</strong></td>
                </tr>
                <tr style="background:#fefce8;">
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;"><strong>Type 2 diet-controlled</strong></td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:center;">10%</td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:right;">~35g</td>
                </tr>
                <tr style="background:#f0fdf4;">
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;"><strong>Pre-diabetic / non-diabetic</strong></td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:center;">12%</td>
                  <td style="padding:9px 11px;border-top:1px solid #e2e8f0;text-align:right;">~42g</td>
                </tr>
              </table>
              <div style="background:#f8fafc;border-left:3px solid #06b6d4;padding:10px 12px;margin-top:12px;border-radius:0 6px 6px 0;font-size:13px;color:#334155;line-height:1.6;">
                <strong>Math:</strong> 1400 cal × 7% ÷ 4 cal/g = <strong>24.5 g net carbs/day</strong> (rounded to 25g)
              </div>
            </td>
          </tr>

          <!-- STEP A4: PROTEIN -->
          <tr>
            <td style="background:#ffffff;padding:20px 40px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step A4 · Daily Protein</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">Protein scales with body weight, not calories. Standard low-carb rule: <strong>0.8 g per lb of body weight</strong>.</p>
              <div style="background:#f8fafc;border-left:3px solid #06b6d4;padding:10px 12px;border-radius:0 6px 6px 0;font-size:13px;color:#334155;line-height:1.6;">
                <strong>Math:</strong> 165 lb × 0.8 = <strong>132 g protein/day</strong>
              </div>
            </td>
          </tr>

          <!-- STEP A5: FAT -->
          <tr>
            <td style="background:#ffffff;padding:20px 40px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step A5 · Daily Fat (the residual)</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">Fat fills whatever calories are left after carbs and protein are subtracted.</p>
              <div style="background:#0f172a;color:#f8fafc;padding:14px 16px;border-radius:8px;font-family:'SF Mono',Monaco,Consolas,monospace;font-size:13px;line-height:1.8;">
                fat (g) = (TDEE − carbs·4 − protein·4) ÷ 9
              </div>
              <div style="background:#f8fafc;border-left:3px solid #06b6d4;padding:10px 12px;margin-top:10px;border-radius:0 6px 6px 0;font-size:13px;color:#334155;line-height:1.6;">
                <strong>Math:</strong> (1400 − 25·4 − 132·4) ÷ 9 = (1400 − 100 − 528) ÷ 9 = 772 ÷ 9 = <strong>~86 g fat/day</strong>
              </div>
            </td>
          </tr>

          <!-- STEP A6: FIBER -->
          <tr>
            <td style="background:#ffffff;padding:20px 40px 28px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step A6 · Daily Fiber Target</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">ADA recommends roughly <strong>14 g fiber per 1,000 cal</strong> for T2D — fiber slows glucose absorption and reduces net carb impact.</p>
              <div style="background:#f8fafc;border-left:3px solid #06b6d4;padding:10px 12px;border-radius:0 6px 6px 0;font-size:13px;color:#334155;line-height:1.6;">
                <strong>Math:</strong> 1400 × 14 ÷ 1000 = <strong>~20 g fiber/day</strong>
              </div>
            </td>
          </tr>

          <!-- A SUMMARY -->
          <tr>
            <td style="background:#ecfeff;padding:18px 40px;border-top:1px solid #a5f3fc;border-bottom:1px solid #a5f3fc;">
              <p style="margin:0;font-size:13px;color:#0e7490;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">Sarah's daily targets — finished computing 6 numbers</p>
              <p style="margin:6px 0 0;font-size:14px;color:#0f172a;line-height:1.6;"><strong>1,400 cal · 25g net carbs · 132g protein · 86g fat · 20g fiber</strong> — and we haven't even started splitting them across meals yet.</p>
            </td>
          </tr>

          <!-- ============== PART B: SPLIT ACROSS MEALS ============== -->
          <tr>
            <td style="background:#0f172a;color:#f8fafc;padding:20px 40px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#06b6d4;">Part B</p>
              <h2 style="margin:4px 0 0;font-size:22px;font-weight:900;color:#f8fafc;letter-spacing:-0.02em;">Split Across 5+ Meal Slots</h2>
            </td>
          </tr>

          <!-- B1: BLD BASE SPLIT -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step B1 · Base Split (no snacks, no dessert)</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">Breakfast carries less of the load because the dawn-phenomenon glucose rise compounds with morning intake. Lunch and dinner split evenly. <strong>Protein gets a separate bump — 25% breakfast / 37.5% lunch / 37.5% dinner</strong> — to keep you full and slow the glycemic response.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#0f172a;color:#f8fafc;">
                  <td style="padding:8px 9px;font-weight:700;">Meal</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Cal %</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Protein %</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Fat %</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Carbs %</td>
                </tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Breakfast</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">20%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;color:#dc2626;"><strong>25%</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">20%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">20%</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Lunch</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">40%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">37.5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">40%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">40%</td></tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Dinner</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">40%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">37.5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">40%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">40%</td></tr>
              </table>
              <p style="margin:14px 0 8px;font-size:12px;font-weight:700;color:#0f172a;">Sarah's per-meal numbers (no snacks, no dessert):</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#0f172a;color:#f8fafc;">
                  <td style="padding:8px 9px;font-weight:700;">Meal</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Cal</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Protein</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Fat</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Net Carbs</td>
                </tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Breakfast</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">280</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">33g</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">17g</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">5g</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Lunch</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">560</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">49.5g</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">34g</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">10g</td></tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Dinner</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">560</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">49.5g</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">34g</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">10g</td></tr>
                <tr style="background:#ecfeff;"><td style="padding:8px 9px;border-top:1px solid #a5f3fc;font-weight:700;">TOTAL</td><td style="padding:8px 9px;border-top:1px solid #a5f3fc;text-align:center;font-weight:700;">1400</td><td style="padding:8px 9px;border-top:1px solid #a5f3fc;text-align:center;font-weight:700;">132g</td><td style="padding:8px 9px;border-top:1px solid #a5f3fc;text-align:center;font-weight:700;">85g</td><td style="padding:8px 9px;border-top:1px solid #a5f3fc;text-align:center;font-weight:700;">25g</td></tr>
              </table>
            </td>
          </tr>

          <!-- B2: SNACK & DESSERT RESERVATION -->
          <tr>
            <td style="background:#ffffff;padding:20px 40px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step B2 · Snack &amp; Dessert Reservation Rules</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.65;">Snacks and dessert come <strong>out of</strong> your daily budget — not on top. Each slot has its own per-macro reservation, then B/L/D split what remains in 20/40/40.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#0f172a;color:#f8fafc;">
                  <td style="padding:8px 9px;font-weight:700;">Slot</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Cal %</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Protein %</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Fat %</td>
                  <td style="padding:8px 9px;font-weight:700;text-align:center;">Carbs %</td>
                </tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;">Mid-morning snack</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:8px 9px;border-top:1px solid #e2e8f0;">Mid-afternoon snack</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td></tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Evening snack (non-insulin)</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;color:#dc2626;"><strong>0%</strong></td></tr>
                <tr style="background:#fef2f2;"><td style="padding:8px 9px;border-top:1px solid #e2e8f0;"><strong>Evening snack (insulin user)</strong></td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;color:#0e7490;"><strong>8%</strong></td></tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;">Dessert after dinner</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">5%</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:8px 9px;border-top:1px solid #e2e8f0;">Dessert mid-day</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">3%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">8%</td></tr>
                <tr><td style="padding:8px 9px;border-top:1px solid #e2e8f0;">Dessert "occasionally"</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">2.5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">2.5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">2.5%</td><td style="padding:8px 9px;border-top:1px solid #e2e8f0;text-align:center;">2.5%</td></tr>
              </table>
              <p style="margin:10px 0 0;font-size:13px;color:#64748b;line-height:1.6;font-style:italic;">Side dishes and sauces have fixed allocations (5% / 3%) outside the 100% pool — they're add-ons, not standalone meals.</p>
            </td>
          </tr>

          <!-- B3: SARAH WORKED SCENARIOS -->
          <tr>
            <td style="background:#ffffff;padding:20px 40px 28px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#06b6d4;letter-spacing:0.05em;text-transform:uppercase;">Step B3 · Sarah's Real Daily Targets — 3 Scenarios</p>
              <p style="margin:0 0 14px;font-size:14px;color:#475569;line-height:1.65;">Same Sarah, same body, same medication, just different snack/dessert habits. Watch how every per-meal number changes.</p>

              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0f172a;">Scenario 1 — 0 snacks, no dessert</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:11px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:14px;">
                <tr style="background:#0f172a;color:#f8fafc;"><td style="padding:7px 8px;font-weight:700;">Slot</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Cal</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Pro</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Fat</td><td style="padding:7px 8px;font-weight:700;text-align:center;">NC</td></tr>
                <tr><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Breakfast</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">280</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">33g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">17g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">5g</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Lunch</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">560</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">49.5g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">34g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">10g</td></tr>
                <tr><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Dinner</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">560</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">49.5g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">34g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">10g</td></tr>
              </table>

              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0f172a;">Scenario 2 — 1 mid-afternoon snack, no dessert</p>
              <p style="margin:0 0 6px;font-size:12px;color:#64748b;line-height:1.55;">Reserve 3% of each macro for the snack first, then B/L/D split the remaining 97% in 20/40/40.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:11px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:14px;">
                <tr style="background:#0f172a;color:#f8fafc;"><td style="padding:7px 8px;font-weight:700;">Slot</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Cal</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Pro</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Fat</td><td style="padding:7px 8px;font-weight:700;text-align:center;">NC</td></tr>
                <tr><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Breakfast</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">272</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">32g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">16.5g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">4.9g</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Lunch</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">543</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">48g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">33g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">9.7g</td></tr>
                <tr><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Mid-afternoon snack</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">42</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">4g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">2.6g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">0.75g</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Dinner</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">543</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">48g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">33g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">9.7g</td></tr>
              </table>

              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0f172a;">Scenario 3 — 1 evening snack + after-dinner dessert</p>
              <p style="margin:0 0 6px;font-size:12px;color:#64748b;line-height:1.55;">Reserve 3% of cal/pro/fat (and <span style="color:#dc2626;font-weight:700;">0% carbs</span> — Sarah's not on insulin) for the evening snack. Reserve 5% of cal/fat/carbs (3% protein) for dessert. B/L/D split the remainder.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:11px;color:#334155;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#0f172a;color:#f8fafc;"><td style="padding:7px 8px;font-weight:700;">Slot</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Cal</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Pro</td><td style="padding:7px 8px;font-weight:700;text-align:center;">Fat</td><td style="padding:7px 8px;font-weight:700;text-align:center;">NC</td></tr>
                <tr><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Breakfast</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">258</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">31g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">15.5g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">4.75g</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Lunch</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">515</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">46.5g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">31g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">9.5g</td></tr>
                <tr><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Dinner</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">515</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">46.5g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">31g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">9.5g</td></tr>
                <tr style="background:#fef2f2;"><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Evening snack</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">42</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">4g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">2.6g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;color:#dc2626;"><strong>0g</strong></td></tr>
                <tr><td style="padding:6px 8px;border-top:1px solid #e2e8f0;">Dessert</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">70</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">4g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">4.3g</td><td style="padding:6px 8px;border-top:1px solid #e2e8f0;text-align:center;">1.25g</td></tr>
              </table>
              <p style="margin:10px 0 0;font-size:13px;color:#64748b;line-height:1.6;font-style:italic;">Same Sarah, same body, three different days, three completely different per-meal targets. Every macro number recomputed.</p>
            </td>
          </tr>

          <!-- ============== PART C: THE AMPLIFIER ============== -->
          <tr>
            <td style="background:#0f172a;color:#f8fafc;padding:20px 40px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#06b6d4;">Part C</p>
              <h2 style="margin:4px 0 0;font-size:22px;font-weight:900;color:#f8fafc;letter-spacing:-0.02em;">Now Multiply by Everything That Changes</h2>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;padding:24px 40px 28px;">
              <p style="margin:0 0 14px;font-size:14px;color:#475569;line-height:1.65;">The math above is for ONE day, ONE user, ONE set of habits. Now consider what triggers a full recomputation:</p>
              <ul style="margin:0 0 14px;padding-left:20px;font-size:14px;color:#475569;line-height:1.85;">
                <li>Weight changes by 5 lbs → BMR shifts → daily cal / protein / fat / carbs all recompute</li>
                <li>Activity level changes (you started walking, you got a desk job, the seasons changed) → TDEE multiplier changes → everything recomputes</li>
                <li>Your doctor adjusts your medication → carb % changes → daily cap recomputes → every meal slot recomputes</li>
                <li>You add a snack one day a week → reservation pool changes that day → B/L/D recompute</li>
                <li>You skip dessert for a week → reservation pool shrinks → B/L/D get more headroom</li>
                <li>You switch from "after-dinner dessert" to "mid-day dessert" → carb allocation shifts (5% → 8%) → B/L/D shrinks slightly</li>
                <li>Goal changes from "lose weight" to "maintain" → +500 cal/day → everything scales up</li>
              </ul>
              <p style="margin:0 0 14px;font-size:14px;color:#475569;line-height:1.65;">For every meal, every day, the app computes:</p>
              <div style="background:#0f172a;color:#f8fafc;padding:18px 20px;border-radius:10px;text-align:center;">
                <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.6;">5 meal slots × 4 macros × 7 days =</p>
                <p style="margin:6px 0 0;font-size:38px;font-weight:900;color:#06b6d4;letter-spacing:-0.02em;">140 numbers/week</p>
                <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">All recomputed every time anything changes.</p>
              </div>
              <p style="margin:16px 0 0;font-size:14px;color:#475569;line-height:1.65;">Doing this on paper takes 20+ minutes per recompute. Doing it in a spreadsheet means maintaining a spreadsheet. Doing it from memory means getting it wrong — and for T2D, "wrong" lands on your bloodwork at the next quarterly check-in.</p>
            </td>
          </tr>

          <!-- ============== CTA ============== -->
          <tr>
            <td style="background:#0f172a;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#06b6d4;">Or — let us do this for you</p>
              <h2 style="margin:0 0 14px;font-size:22px;font-weight:900;color:#f8fafc;line-height:1.25;letter-spacing:-0.02em;">Keto Contractor does every calculation above<br />automatically, for every meal, every day.</h2>
              <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.65;">Your daily cap, the 20/40/40 split, the breakfast protein bump, the evening-snack zero-carb rule, the insulin-user exception, the reservation pool math — all of it. Set up in a 5-minute onboarding. Every recipe in the app arrives pre-tuned for your numbers.</p>
              <a href="https://app.ketocontractor.com/login" style="display:inline-block;background:#06b6d4;color:#000;font-weight:800;font-size:15px;padding:14px 32px;border-radius:10px;text-decoration:none;">Start Free — 7 Days on Us</a>
              <p style="margin:16px 0 0;font-size:12px;color:#475569;">7-day free trial. Cancel anytime.</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0a0f1e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;color:#94a3b8;line-height:1.6;font-style:italic;">
                Educational, not medical advice. Talk to your doctor about any changes to your management plan, especially if you're on insulin or other glucose-affecting medication.
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:#334155;line-height:1.6;">
                © 2026 Keto Contractor · <a href="mailto:support@ketocontractor.com" style="color:#475569;text-decoration:none;">support@ketocontractor.com</a>
              </p>
              <p style="margin:0;font-size:11px;color:#475569;line-height:1.6;">
                You received this email because you requested the T2D Macro Map at ketocontractor.com.<br />
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
        subject: 'The T2D Macro Map — Every Calculation, For Every Meal',
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
