const MENUS = {"Another_Broken_Egg_Cafe": "Another Broken Egg Cafe", "Applebee_s_Grill_Bar": "Applebee's Grill + Bar", "Arby_s": "Arby's", "Baton_Rouge_Airport": "Baton Rouge Airport", "BJ_s_Restaurant_and_Brewhouse": "BJ's Restaurant & Brewhouse", "Blaze_Pizza": "Blaze Pizza", "Boston_Fish_and_Chicken_Market": "Boston Fish and Chicken Market", "Buffalo_Wild_Wings": "Buffalo Wild Wings", "Burger_King": "Burger King", "Camellia_Mexican_Restaurant": "Camellia Mexican Restaurant", "Carrabba_s_Italian_Grill": "Carrabba's Italian Grill", "Casa_Cantina": "Casa Cantina", "Casa_Jimador": "Casa Jimador", "CAVA": "CAVA", "Chester_s_Chicken": "Chester's Chicken", "Chick-fil-A": "Chick-fil-A", "Chili_s_Grill_and_Bar": "Chili's Grill & Bar", "China_Legend": "China Legend", "Chipotle_Mexican_Grill": "Chipotle Mexican Grill", "Copeland_s_of_New_Orleans": "Copeland's of New Orleans", "Cracker_Barrel_Old_Country_Store": "Cracker Barrel Old Country Store", "Crawfish_King": "Crawfish King", "Culver_s": "Culver's", "Del_Taco": "Del Taco", "Denny_s_Restaurant": "Denny's Restaurant", "Domino_s_Pizza": "Domino's Pizza", "Dunkin": "Dunkin'", "El_Compadre_Mexican_Restaurant_and_Seafood": "El Compadre Mexican Restaurant & Seafood", "El_Patio_Mexican_Restaurant": "El Patio | Mexican Restaurant", "El_Pollo_Loco": "El Pollo Loco", "Firehouse_Subs_Shreveport": "Firehouse Subs Shreveport", "First_Watch_Breakfast_Brunch_Lunch": "First Watch | Breakfast \u2022 Brunch \u2022 Lunch", "Five_Guys": "Five Guys", "Fogo_de_Cho_Brazilian_Steakhouse": "Fogo de Ch\u00e3o Brazilian Steakhouse", "Godfather_s_Pizza_Express": "Godfather's Pizza Express", "Golden_Corral_Buffet_and_Grill": "Golden Corral Buffet & Grill", "Hardee_s": "Hardee's", "Hooters": "Hooters", "HUNTER_CRAB_-_Shreveport": "HUNTER CRAB - Shreveport", "IHOP": "IHOP", "In-N-Out_Burger": "In-N-Out Burger", "Jack_in_the_Box": "Jack in the Box", "Jason_s_Deli": "Jason's Deli", "Jersey_Mike_s_Subs": "Jersey Mike's Subs", "Jimmy_John_s": "Jimmy John's", "Johnny_s_Catfish_and_Seafood": "Johnny's Catfish & Seafood", "KFC": "KFC", "Ki_Mexico": "Ki' Mexico", "Logan_s_Roadhouse": "Logan's Roadhouse", "LongHorn_Steakhouse": "LongHorn Steakhouse", "Love_s_Travel_Stop": "Love's Travel Stop", "McDonald_s": "McDonald's", "MOD_Pizza": "MOD Pizza", "Moe_s_Southwest_Grill": "Moe's Southwest Grill", "NEE_HAO_CHINESE_and_SUSHI_BAR": "NEE HAO | CHINESE & SUSHI BAR", "Newk_s_Eatery": "Newk's Eatery", "Noodles_and_Company": "Noodles and Company", "Oki_Eatz": "Oki Eatz", "Olive_Garden_Italian_Restaurant": "Olive Garden Italian Restaurant", "Outback_Steakhouse": "Outback Steakhouse", "Oyster_Bar_and_Grille": "Oyster Bar & Grille", "PF_Chang_s": "P.F. Chang's", "Panda_Express": "Panda Express", "Panera_Bread": "Panera Bread", "Papa_Johns_Pizza": "Papa Johns Pizza", "Pei_Wei_Asian_Express": "Pei Wei Asian Express", "Pita_De_Novo": "Pita De' Novo", "Pizza_Hut": "Pizza Hut", "Popeyes_Louisiana_Kitchen": "Popeyes Louisiana Kitchen", "QDOBA_Mexican_Eats": "QDOBA Mexican Eats", "Red_Lobster": "Red Lobster", "Ruby_Tuesday": "Ruby Tuesday", "Sam_s_Southern_Eatery": "Sam's Southern Eatery", "Shake_Shack_Old_Town": "Shake Shack Old Town", "Smoothie_King": "Smoothie King", "Sonic_Drive-In": "Sonic Drive-In", "Stacked_and_Tossed": "Stacked and Tossed", "Starbucks_Coffee_Company": "Starbucks Coffee Company", "Steak_n_Shake": "Steak n' Shake", "Strawn_s_Eat_Shop_Too": "Strawn's Eat Shop Too", "Subway": "Subway", "Superior_Grill": "Superior Grill", "Taco_Bell": "Taco Bell", "Taquera_La_Michoacana_Mexican_Restaurant": "Taquer\u00eda La Michoacana | Mexican Restaurant", "Texas_de_Brazil_-_Baton_Rouge": "Texas de Brazil - Baton Rouge", "Texas_Roadhouse": "Texas Roadhouse", "TGI_Fridays": "TGI Fridays", "Thai_and_Japanese_Kitchen": "Thai and Japanese Kitchen", "The_Cheesecake_Factory": "The Cheesecake Factory", "The_Crabby_Crawfish": "The Crabby Crawfish", "The_Prime_Rib": "The Prime Rib", "Tropical_Smoothie_Cafe": "Tropical Smoothie Cafe", "Twin_Peaks": "Twin Peaks", "Waffle_House": "Waffle House", "Walk-On_s_Sports_Bistreaux_-_Shreveport_Restaurant": "Walk-On's Sports Bistreaux - Shreveport Restaurant", "Wendy_s": "Wendy's", "Whataburger": "Whataburger", "Windrush_Village_Marketplace": "Windrush Village Marketplace", "Wingstop": "Wingstop", "Yard_House": "Yard House", "Zaxbys_Chicken_Fingers_and_Buffalo_Wings": "Zaxbys Chicken Fingers & Buffalo Wings"};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email, slug;
  try {
    const body = JSON.parse(event.body);
    email = (body.email || '').trim().toLowerCase();
    slug = (body.slug || '').trim();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) };
  }
  if (!Object.prototype.hasOwnProperty.call(MENUS, slug)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Unknown menu' }) };
  }

  const name = MENUS[slug];
  const pdfUrl = 'https://ketocontractor.com/menus/' + slug + '_Hacked.pdf';

  // Save subscriber (tagged with which restaurant hooked them)
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/lead_magnet_subscribers`, {
      method: 'POST',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates',
      },
      body: JSON.stringify({ email, source: 'hacked_menu_' + slug }),
    });
  } catch (err) {
    console.error('Supabase save error:', err);
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Your ${name} Hacked Menu</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#0a0f1e;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <img src="https://app.ketocontractor.com/kc-logo.png" alt="Keto Contractor" width="64" height="64" style="border-radius:12px;display:block;margin:0 auto 16px;" />
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#06b6d4;">Keto Contractor &bull; Hacked Menu</p>
            <h1 style="margin:8px 0 0;font-size:26px;font-weight:900;color:#f8fafc;line-height:1.25;">${name}</h1>
            <p style="margin:10px 0 0;font-size:14px;color:#94a3b8;line-height:1.6;">Every approved keto pick, net carbs as modified, and exactly what to say to the waiter.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 20px;font-size:15px;color:#334155;line-height:1.7;">Here is your <strong>${name}</strong> Hacked Menu. Save it to your phone and order with total confidence on your next visit.</p>
            <a href="${pdfUrl}" style="display:inline-block;background:#06b6d4;color:#000;font-weight:800;font-size:15px;padding:14px 32px;border-radius:10px;text-decoration:none;">Open Your Hacked Menu (PDF)</a>
            <p style="margin:24px 0 0;font-size:13px;color:#64748b;line-height:1.65;">This menu is one output of <strong>Hack the Menu</strong>, tool #3 of 12 inside Keto Contractor - the meal planning app built for type 2 diabetics. It reads any restaurant menu and shows your safest order in seconds.</p>
            <a href="https://ketocontractor.com" style="display:inline-block;margin-top:14px;color:#0e7490;font-weight:700;font-size:14px;">Start your free 3-day trial &rarr;</a>
          </td>
        </tr>
        <tr>
          <td style="background:#0a0f1e;border-radius:0 0 16px 16px;padding:22px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;color:#94a3b8;line-height:1.6;font-style:italic;">Educational, not medical advice. Talk to your doctor about any changes to your management plan.</p>
            <p style="margin:0;font-size:11px;color:#475569;line-height:1.6;">&copy; 2026 Keto Contractor &middot; <a href="mailto:support@ketocontractor.com" style="color:#475569;">support@ketocontractor.com</a><br />You received this because you requested the ${name} Hacked Menu.<br /><a href="mailto:support@ketocontractor.com?subject=Unsubscribe" style="color:#64748b;text-decoration:underline;">Unsubscribe</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

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
        subject: 'Your ' + name + ' Hacked Menu - Every Keto-Safe Order',
        html,
      }),
    });
    if (!res.ok) {
      console.error('Resend error:', await res.text());
      return { statusCode: 500, body: JSON.stringify({ error: 'Email failed to send' }) };
    }
    return { statusCode: 200, body: JSON.stringify({ success: true, pdf: pdfUrl }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
