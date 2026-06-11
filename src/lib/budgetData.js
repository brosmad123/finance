export const INCOME_DATA = {
  grossSalary: 6250.00,
  federalTax: -1281.25,
  provincialTax: -571.88,
  cpp: -371.88,
  ei: -103.13,
  netPay: 3921.88,
};

export const NEEDS = [
  { emoji: "🏠", category: "Rent (my ¼ share)", monthly: 637.50, notes: "Townhouse split 4 ways with roommates", priority: "Essential", type: "Housing" },
  { emoji: "💡", category: "Utilities (my ¼ share)", monthly: 18.75, notes: "75% discounted rate, split 4 ways", priority: "Essential", type: "Utilities" },
  { emoji: "🚌", category: "Brampton Transit Pass", monthly: 148.50, notes: "Monthly adult pass", priority: "Essential", type: "Transport" },
  { emoji: "🛒", category: "Groceries", monthly: 320.00, notes: "Avg. for single adult in Canada", priority: "Essential", type: "Food" },
  { emoji: "🏦", category: "Bank Account Fee", monthly: 30.95, notes: "TD All-Inclusive Banking Plan", priority: "Essential", type: "Banking" },
  { emoji: "📶", category: "Wi-Fi / Internet", monthly: 23.75, notes: "Rogers internet plan", priority: "Essential", type: "Utilities" },
  { emoji: "🏥", category: "Health Insurance", monthly: 150.00, notes: "Supplemental private coverage", priority: "Essential", type: "Health" },
  { emoji: "💊", category: "Medication", monthly: 25.00, notes: "Pain relief + monthly inhaler supply", priority: "Essential", type: "Health" },
  { emoji: "🪣", category: "Laundry Detergent", monthly: 12.00, notes: "Monthly Supply of Tide Pods, etc", priority: "Essential", type: "Household" },
  { emoji: "🧻", category: "Toilet Paper", monthly: 10.00, notes: "1 pack of Royale toilet paper a month", priority: "Essential", type: "Household" },
  { emoji: "🗑️", category: "Garbage Bags", monthly: 8.00, notes: "1 box of Glad kitchen garbage bags/month", priority: "Essential", type: "Household" },
  { emoji: "💡", category: "Light Bulbs & Fixtures", monthly: 5.00, notes: "Monthly average of LED replacements", priority: "Essential", type: "Household" },
  { emoji: "🌿", category: "Indoor Plants (care/new)", monthly: 10.00, notes: "Soil, pots, new plants on occasion", priority: "Essential", type: "Household" },
  { emoji: "🔋", category: "Batteries (AA/AAA)", monthly: 6.00, notes: "Energizer batteries, remotes, other devices", priority: "Essential", type: "Household" },
];

export const HYGIENE = [
  { emoji: "🧼", category: "Body Soap (bar, 8-pack)", monthly: 7.00, notes: "Dove or Irish Spring, ~8 bars/pack lasts ~2 mo", priority: "Essential", type: "Hygiene" },
  { emoji: "🦷", category: "Toothpaste (2-pack)", monthly: 9.00, notes: "Colgate or Sensodyne, 2-pack lasts ~2 months", priority: "Essential", type: "Hygiene" },
  { emoji: "🪥", category: "Toothbrushes (2-pack)", monthly: 5.00, notes: "Oral-B manual, replace every 3 months", priority: "Essential", type: "Hygiene" },
  { emoji: "🧴", category: "Shampoo & Conditioner", monthly: 12.00, notes: "Head & Shoulders or Pantene combo pack", priority: "Essential", type: "Hygiene" },
  { emoji: "🪒", category: "Razors / Shaving Cream", monthly: 10.00, notes: "Gillette cartridges + shave gel monthly avg", priority: "Essential", type: "Hygiene" },
  { emoji: "🧴", category: "Deodorant (2-pack)", monthly: 8.00, notes: "Degree or Dove, 2-pack lasts ~2 months", priority: "Essential", type: "Hygiene" },
  { emoji: "🧴", category: "Moisturizer / Lotion", monthly: 6.00, notes: "Lubriderm or Vaseline Intensive Care", priority: "Essential", type: "Hygiene" },
  { emoji: "✂️", category: "Haircut / Grooming", monthly: 20.00, notes: "Monthly trim at local barbershop", priority: "Essential", type: "Grooming" },
  { emoji: "🌸", category: "Cologne / Body Spray", monthly: 8.00, notes: "Monthly avg cost of fragrance products", priority: "Low", type: "Grooming" },
  { emoji: "🧴", category: "Hand Soap (refill)", monthly: 5.00, notes: "Softsoap refill pump bottle", priority: "Essential", type: "Hygiene" },
  { emoji: "🧻", category: "Facial Tissue Boxes (2)", monthly: 6.00, notes: "Kleenex or Puffs, 2 boxes per month", priority: "Essential", type: "Household" },
  { emoji: "🦷", category: "Dental Insurance", monthly: 106.00, notes: "Dental Insurance for ages 20-44", priority: "Essential", type: "Hygiene" },
  { emoji: "💅", category: "Nail Care (clippers/files)", monthly: 3.00, notes: "Monthly avg — trimmers + nail file replacement", priority: "Low", type: "Grooming" },
];

export const FOOD_LIFE = [
  { emoji: "☕", category: "Tim Hortons (daily coffee)", monthly: 93.00, notes: "~$3/day × 31 days (medium double-double)", priority: "Medium", type: "Food/Coffee" },
  { emoji: "🍽️", category: "Kitchen Utensils (monthly)", monthly: 15.00, notes: "Spatulas, spoons, peelers replaced as needed", priority: "Low", type: "Household" },
  { emoji: "🌿", category: "Pest Control (monthly avg)", monthly: 10.00, notes: "Traps, spray, prevention products", priority: "Essential", type: "Household" },
  { emoji: "🖨️", category: "Printing Costs (ink/paper)", monthly: 8.00, notes: "Monthly avg for home printing", priority: "Low", type: "Office" },
  { emoji: "📄", category: "A4 Paper (500 sheets)", monthly: 7.00, notes: "Hammermill or HP, 1 ream/month avg", priority: "Low", type: "Office" },
  { emoji: "🍬", category: "Gum (4-pack monthly)", monthly: 6.00, notes: "Extra or Trident variety packs", priority: "Low", type: "Snacks" },
  { emoji: "🎰", category: "Lottery Scratch Cards", monthly: 20.00, notes: "Monthly entertainment budget for scratch tickets", priority: "Low", type: "Entertainment" },
];

export const FREE_RESOURCES = [
  { emoji: "📚", category: "Brampton Library Pass", notes: "Free books, e-books, audiobooks, DVDs, internet", type: "Education" },
  { emoji: "🔍", category: "Google Search", notes: "Free web search, daily use", type: "Productivity" },
  { emoji: "📺", category: "YouTube (free tier)", notes: "Free video streaming with ads", type: "Entertainment" },
  { emoji: "📧", category: "Gmail", notes: "Free Google email (15 GB included)", type: "Productivity" },
  { emoji: "🗺️", category: "Google Maps", notes: "Free navigation and transit directions", type: "Navigation" },
  { emoji: "☁️", category: "Google Drive (15 GB free)", notes: "Free cloud storage up to 15 GB", type: "Storage" },
  { emoji: "💬", category: "WhatsApp / iMessage", notes: "Free messaging over Wi-Fi or data", type: "Communication" },
  { emoji: "🏃", category: "Outdoor Exercise (parks)", notes: "Chinguacousy Park, Gage Park — free trails & fitness", type: "Health" },
  { emoji: "📡", category: "CBC & CTV News Online", notes: "Free Canadian news streaming", type: "News" },
  { emoji: "🆓", category: "Kijiji / Facebook Marketplace", notes: "Free local buy/sell platform", type: "Shopping" },
  { emoji: "🏛️", category: "Service Ontario Online", notes: "Free government services portal", type: "Government" },
  { emoji: "🩺", category: "OHIP (Ontario Health)", notes: "Free provincial health coverage for doctor visits", type: "Health" },
  { emoji: "📖", category: "Wikipedia", notes: "Free online encyclopedia, daily reference", type: "Education" },
];

export const WANTS = [
  { emoji: "📱", category: "Phone Plan (Freedom Mobile)", monthly: 40.00, notes: "Total Freedom 175GB + Roam Beyond 10GB", priority: "High", type: "Telecom" },
  { emoji: "📱", category: "Phone Payment (Pixel 10 Pro XL)", monthly: 40.00, notes: "MyTab monthly device payment", priority: "High", type: "Device" },
  { emoji: "🎵", category: "Spotify Premium", monthly: 13.99, notes: "Individual plan — music & podcasts", priority: "Medium", type: "Streaming" },
  { emoji: "📺", category: "Netflix Standard", monthly: 18.99, notes: "Standard no-ads — HD, 2 screens", priority: "Medium", type: "Streaming" },
  { emoji: "📦", category: "Amazon Prime", monthly: 9.99, notes: "Free shipping + Prime Video + Prime Reading", priority: "Medium", type: "Streaming" },
  { emoji: "🏋️", category: "Gym Membership (GoodLife)", monthly: 29.99, notes: "GoodLife Essential — Brampton Bramalea City Centre", priority: "Medium", type: "Health" },
  { emoji: "🎮", category: "Xbox Game Pass Ultimate", monthly: 22.99, notes: "400+ games, cloud gaming, EA Play, day-one titles", priority: "Medium", type: "Gaming" },
  { emoji: "🟥", category: "Roblox Plus", monthly: 6.84, notes: "Roblox Plus — $4.99 USD converted ~CAD", priority: "Low", type: "Gaming" },
  { emoji: "☁️", category: "Google One (100 GB)", monthly: 2.79, notes: "100GB plan at ~$1.99 USD/mo → ~$2.79 CAD", priority: "Medium", type: "Storage" },
  { emoji: "💳", category: "Credit Card Annual Fee", monthly: 0.00, notes: "TD Cash Back Visa — no annual fee", priority: "Low", type: "Finance" },
  { emoji: "🛍️", category: "Costco Membership", monthly: 65.00, notes: "Gold Star membership (annual, shown monthly avg)", priority: "Medium", type: "Shopping" },
  { emoji: "💹", category: "Investments", monthly: 200.00, notes: "Investing generates profit in the long run", priority: "Medium", type: "Finance" },
  { emoji: "📈", category: "RRSP Contribution (8%)", monthly: 313.75, notes: "8% of net monthly income — retirement savings", priority: "High", type: "Savings" },
];

export function calcSubtotal(items) {
  return items.reduce((sum, i) => sum + (i.monthly || 0), 0);
}

export function fmt(n) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);
}

export function fmtPct(n) {
  return (n * 100).toFixed(1) + '%';
}