// Complete game data - ALL jobs, crew, equipment, and properties

const jobs = [
  // STARTER JOB (Level 1) - 5s, no energy required
  {id: 0, name: "Beg for Change", energy: 0, money: [1, 20], xp: 2, respect: 0, minLevel: 1, category: "starter", description: "Pocket change from strangers", successRate: 0.50, duration: 5000, risk: 'low', requirements: {}},

  // PETTY CRIMES (Level 1-3) - 5-15s, quick starter cash
  {id: 1, name: "Pickpocket Tourists", energy: 5, money: [50, 120], xp: 5, respect: 1, minLevel: 1, category: "petty", description: "Easy money from distracted tourists", successRate: 0.70, duration: 5000, risk: 'low', requirements: {}},
  {id: 2, name: "Sell Knockoff Goods", energy: 8, money: [80, 180], xp: 8, respect: 2, minLevel: 1, category: "petty", description: "Move some 'designer' handbags", successRate: 0.68, duration: 8000, risk: 'low', requirements: {}},
  {id: 3, name: "Steal Car Radio", energy: 10, money: [120, 250], xp: 10, respect: 3, minLevel: 2, category: "petty", description: "Quick smash and grab", successRate: 0.65, duration: 10000, risk: 'low', requirements: {crewType: ["stealth"]}},
  {id: 4, name: "Mug Drunk Businessman", energy: 12, money: [180, 350], xp: 12, respect: 4, minLevel: 2, category: "petty", description: "Dark alley special", successRate: 0.67, duration: 12000, risk: 'low', requirements: {crewType: ["violent"]}},

  // SHAKEDOWNS (Level 3-5) - 20-30s, building up
  {id: 5, name: "Collect Protection Money", energy: 12, money: [250, 500], xp: 15, respect: 5, minLevel: 3, category: "shakedown", description: "Local business needs protection", successRate: 0.65, duration: 20000, risk: 'medium', requirements: {crewType: ["violent"]}},
  {id: 6, name: "Threaten Loan Defaulter", energy: 15, money: [300, 600], xp: 18, respect: 6, minLevel: 3, category: "shakedown", description: "Pay up or else", successRate: 0.66, duration: 22000, risk: 'medium', requirements: {crewType: ["violent"]}},
  {id: 7, name: "Intimidate Witness", energy: 18, money: [400, 800], xp: 22, respect: 8, minLevel: 4, category: "shakedown", description: "Convince them to forget", successRate: 0.63, duration: 25000, risk: 'medium', requirements: {crewType: ["violent", "political"]}},
  {id: 8, name: "Extort Club Owner", energy: 20, money: [550, 1100], xp: 28, respect: 10, minLevel: 5, category: "shakedown", description: "Nice place... be a shame...", successRate: 0.62, duration: 30000, risk: 'medium', requirements: {crewType: ["violent"]}},

  // ROBBERIES (Level 5-8) - 45s-1min, good payouts
  {id: 9, name: "Rob Convenience Store", energy: 20, money: [800, 1600], xp: 30, respect: 12, minLevel: 5, category: "robbery", description: "Late night quick cash", successRate: 0.62, duration: 45000, risk: 'high', requirements: {crewType: ["violent"]}},
  {id: 10, name: "Hijack Delivery Truck", energy: 25, money: [1000, 2000], xp: 35, respect: 15, minLevel: 5, category: "robbery", description: "Five-finger discount on wholesale", successRate: 0.60, duration: 50000, risk: 'high', requirements: {crewType: ["transport"], vehicle: true}},
  {id: 11, name: "Rob Gas Station", energy: 22, money: [900, 1800], xp: 32, respect: 13, minLevel: 6, category: "robbery", description: "Fill up on cash", successRate: 0.61, duration: 50000, risk: 'high', requirements: {crewType: ["violent"], vehicle: true}},
  {id: 12, name: "Steal ATM Machine", energy: 30, money: [1300, 2600], xp: 40, respect: 18, minLevel: 7, category: "robbery", description: "Heavy but worth it", successRate: 0.58, duration: 60000, risk: 'high', requirements: {crewType: ["transport"], vehicle: true}},
  {id: 13, name: "Rob Jewelry Store", energy: 35, money: [1800, 3600], xp: 50, respect: 25, minLevel: 8, category: "robbery", description: "Diamonds are forever", successRate: 0.56, duration: 70000, risk: 'very high', requirements: {crewType: ["stealth"], vehicle: true}},

  // SMUGGLING (Level 6-10) - 1-2min, solid income
  {id: 14, name: "Smuggle Cigarettes", energy: 25, money: [1200, 2400], xp: 38, respect: 16, minLevel: 6, category: "smuggling", description: "Tax-free profits", successRate: 0.66, duration: 60000, risk: 'medium', requirements: {crewType: ["transport"], vehicle: true}},
  {id: 15, name: "Run Contraband Across Border", energy: 30, money: [1800, 3600], xp: 45, respect: 20, minLevel: 7, category: "smuggling", description: "Don't ask what's in the trunk", successRate: 0.63, duration: 90000, risk: 'high', requirements: {crewType: ["transport"], vehicle: true}},
  {id: 16, name: "Smuggle Stolen Electronics", energy: 28, money: [1500, 3000], xp: 42, respect: 18, minLevel: 7, category: "smuggling", description: "Hot merchandise", successRate: 0.64, duration: 75000, risk: 'medium', requirements: {crewType: ["transport"], vehicle: true}},
  {id: 17, name: "Transport Illegal Firearms", energy: 35, money: [2200, 4400], xp: 52, respect: 24, minLevel: 9, category: "smuggling", description: "Dangerous cargo", successRate: 0.60, duration: 105000, risk: 'high', requirements: {crewType: ["transport", "violent"], vehicle: true}},
  {id: 18, name: "Smuggle Exotic Animals", energy: 40, money: [2800, 5600], xp: 60, respect: 30, minLevel: 10, category: "smuggling", description: "They bite", successRate: 0.58, duration: 120000, risk: 'very high', requirements: {crewType: ["transport"], vehicle: true}},

  // FRAUD & CONS (Level 4-9) - 45s-2min, white collar crime
  {id: 19, name: "Run Card Skimming Operation", energy: 18, money: [700, 1400], xp: 24, respect: 9, minLevel: 4, category: "fraud", description: "Steal credit card info", successRate: 0.68, duration: 45000, risk: 'medium', requirements: {crewType: ["financial"]}},
  {id: 20, name: "Counterfeit Designer Goods", energy: 22, money: [950, 1900], xp: 30, respect: 12, minLevel: 5, category: "fraud", description: "Fake it till you make it", successRate: 0.69, duration: 55000, risk: 'medium', requirements: {crewType: ["financial"]}},
  {id: 21, name: "Run Insurance Scam", energy: 26, money: [1400, 2800], xp: 38, respect: 17, minLevel: 6, category: "fraud", description: "Fake accident, real money", successRate: 0.66, duration: 70000, risk: 'medium', requirements: {crewType: ["financial"]}},
  {id: 22, name: "Embezzle from Corporation", energy: 32, money: [2100, 4200], xp: 48, respect: 22, minLevel: 8, category: "fraud", description: "White collar crime", successRate: 0.62, duration: 95000, risk: 'high', requirements: {crewType: ["financial", "political"]}},
  {id: 23, name: "Run Ponzi Scheme", energy: 38, money: [2600, 5200], xp: 58, respect: 28, minLevel: 9, category: "fraud", description: "Rob Peter to pay Paul", successRate: 0.59, duration: 110000, risk: 'high', requirements: {crewType: ["financial"]}},

  // GAMBLING & VICE (Level 4-8) - 45s-1.5min, vice operations
  {id: 24, name: "Run Underground Poker Game", energy: 15, money: [600, 1200], xp: 20, respect: 8, minLevel: 4, category: "gambling", description: "House always wins", successRate: 0.70, duration: 45000, risk: 'medium', requirements: {crewType: ["financial"]}},
  {id: 25, name: "Organize Illegal Cockfight", energy: 20, money: [850, 1700], xp: 28, respect: 11, minLevel: 5, category: "gambling", description: "Blood sport betting", successRate: 0.68, duration: 55000, risk: 'medium', requirements: {crewType: ["violent"]}},
  {id: 26, name: "Fix Underground Fight", energy: 25, money: [1300, 2600], xp: 36, respect: 16, minLevel: 6, category: "gambling", description: "Bet on the winner you chose", successRate: 0.66, duration: 70000, risk: 'high', requirements: {crewType: ["violent"]}},
  {id: 27, name: "Run Numbers Racket", energy: 28, money: [1600, 3200], xp: 42, respect: 19, minLevel: 7, category: "gambling", description: "Illegal lottery operation", successRate: 0.67, duration: 75000, risk: 'medium', requirements: {crewType: ["financial"]}},
  {id: 28, name: "Rig Casino Games", energy: 35, money: [2500, 5000], xp: 54, respect: 26, minLevel: 8, category: "gambling", description: "Loaded dice, marked cards", successRate: 0.62, duration: 100000, risk: 'high', requirements: {crewType: ["financial", "stealth"]}},

  // CONTRACTS & HITS (Level 8-12) - 1.5-3min, high-stakes
  {id: 29, name: "Intimidate Rival Soldier", energy: 30, money: [1900, 3800], xp: 44, respect: 21, minLevel: 8, category: "contract", description: "Send a message", successRate: 0.63, duration: 85000, risk: 'very high', requirements: {crewType: ["violent"]}},
  {id: 30, name: "Blackmail City Official", energy: 32, money: [2200, 4400], xp: 50, respect: 23, minLevel: 8, category: "contract", description: "Those photos ain't deleting themselves", successRate: 0.62, duration: 95000, risk: 'high', requirements: {crewType: ["political", "stealth"]}},
  {id: 31, name: "Eliminate Rival Lieutenant", energy: 40, money: [3500, 7000], xp: 65, respect: 32, minLevel: 10, category: "contract", description: "Make it look like an accident", successRate: 0.58, duration: 130000, risk: 'very high', requirements: {crewType: ["stealth"]}},
  {id: 32, name: "Assassinate Police Informant", energy: 45, money: [4500, 9000], xp: 75, respect: 38, minLevel: 11, category: "contract", description: "Loose lips sink ships", successRate: 0.55, duration: 150000, risk: 'extreme', requirements: {crewType: ["stealth"]}},
  {id: 33, name: "Take Out Rival Boss", energy: 50, money: [6500, 13000], xp: 90, respect: 50, minLevel: 12, category: "contract", description: "Biggest payday, biggest risk", successRate: 0.53, duration: 180000, risk: 'extreme', requirements: {crewType: ["violent", "stealth"]}},

  // HEISTS (Level 10+) - 2-5min, massive endgame payouts
  {id: 34, name: "Rob Armored Car", energy: 40, money: [4200, 8400], xp: 68, respect: 35, minLevel: 10, category: "heist", description: "Moving vault full of cash", successRate: 0.58, duration: 140000, risk: 'very high', requirements: {crewType: ["violent", "transport"], vehicle: true}},
  {id: 35, name: "Raid Pharmaceutical Warehouse", energy: 42, money: [4800, 9600], xp: 70, respect: 36, minLevel: 10, category: "heist", description: "Drugs on drugs", successRate: 0.59, duration: 155000, risk: 'very high', requirements: {crewType: ["stealth", "transport"], vehicle: true}},
  {id: 36, name: "Hijack Art Shipment", energy: 45, money: [5800, 11600], xp: 78, respect: 40, minLevel: 11, category: "heist", description: "Priceless paintings", successRate: 0.57, duration: 175000, risk: 'very high', requirements: {crewType: ["stealth", "transport"], vehicle: true}},
  {id: 37, name: "Rob Bank", energy: 50, money: [8500, 17000], xp: 95, respect: 55, minLevel: 12, category: "heist", description: "The big score", successRate: 0.55, duration: 210000, risk: 'extreme', requirements: {crewType: ["violent", "financial", "stealth"], vehicle: true}},
  {id: 38, name: "Steal Military Equipment", energy: 55, money: [11000, 22000], xp: 105, respect: 60, minLevel: 13, category: "heist", description: "High security, high reward", successRate: 0.53, duration: 240000, risk: 'extreme', requirements: {crewType: ["violent", "stealth"], vehicle: true}},
  {id: 39, name: "Hit Rival's Vault", energy: 60, money: [15000, 30000], xp: 120, respect: 70, minLevel: 14, category: "heist", description: "Steal from other criminals", successRate: 0.51, duration: 270000, risk: 'extreme', requirements: {crewType: ["violent", "stealth", "financial"], vehicle: true}},
  {id: 40, name: "Federal Reserve Heist", energy: 70, money: [25000, 50000], xp: 150, respect: 100, minLevel: 15, category: "heist", description: "The ultimate score", successRate: 0.50, duration: 300000, risk: 'extreme', requirements: {crewType: ["violent", "stealth", "financial", "political"], vehicle: true}}
];

const availableCrew = [
  // 💪 MUSCLE — "Win jobs and survive mistakes"
  // PRIMARY: Success Rate (0.3-1.2%) + Energy (10-30)
  // SECONDARY: Small XP (0-10%)
  // NEVER: Cash bonuses
  {id: 1, name: "Street Punk", cost: 500, bonus: {successRate: 0.003, energy: 10}, respect: 5, role: "muscle", roleBadge: "enforcer", description: "Eager street fighter", specializations: ["violent"]},
  {id: 2, name: "Brawler", cost: 1000, bonus: {successRate: 0.004, energy: 12}, respect: 10, role: "muscle", roleBadge: "enforcer", description: "Fists of fury", specializations: ["violent"]},
  {id: 3, name: "Experienced Thug", cost: 1500, bonus: {successRate: 0.005, energy: 15}, respect: 15, role: "muscle", roleBadge: "enforcer", description: "Knows the streets", specializations: ["violent"]},
  {id: 4, name: "Bodyguard", cost: 3000, bonus: {successRate: 0.006, energy: 18, xp: 0.03}, respect: 25, role: "muscle", roleBadge: "enforcer", description: "Personal protection", specializations: ["violent"]},
  {id: 5, name: "Enforcer", cost: 6000, bonus: {successRate: 0.007, energy: 20, xp: 0.05}, respect: 40, role: "muscle", roleBadge: "enforcer", description: "Breaks bones professionally", specializations: ["violent"]},
  {id: 6, name: "Hitman", cost: 15000, bonus: {successRate: 0.009, energy: 25, xp: 0.08}, respect: 80, role: "muscle", roleBadge: "enforcer", description: "Silent and deadly", specializations: ["violent", "stealth"]},
  {id: 7, name: "War Veteran", cost: 12000, bonus: {successRate: 0.008, energy: 22, xp: 0.07}, respect: 70, role: "muscle", roleBadge: "enforcer", description: "Combat trained", specializations: ["violent"]},
  {id: 8, name: "MMA Fighter", cost: 8000, bonus: {successRate: 0.007, energy: 20, xp: 0.05}, respect: 55, role: "muscle", roleBadge: "enforcer", description: "Professional brawler", specializations: ["violent"]},

  // 🧠 SPECIALISTS — "Level faster and unlock bonuses"
  // PRIMARY: XP (15-30%) + Unique mechanics
  // SECONDARY: Small success (0.2-0.5%)
  // NEVER: Cash or Energy
  {id: 9, name: "Wheelman", cost: 2500, bonus: {xp: 0.15, successRate: 0.002}, respect: 20, role: "specialist", roleBadge: "trainer", description: "Fast driver, teaches evasion", specializations: ["transport"]},
  {id: 10, name: "Safecracker", cost: 10000, bonus: {xp: 0.22, successRate: 0.003}, respect: 60, role: "specialist", roleBadge: "trainer", description: "Opens anything, teaches patience", specializations: ["stealth"]},
  {id: 11, name: "Hacker", cost: 12000, bonus: {xp: 0.25, successRate: 0.004}, respect: 70, role: "specialist", roleBadge: "trainer", description: "Digital wizard, tech mentor", specializations: ["financial", "stealth"]},
  {id: 12, name: "Getaway Driver", cost: 7000, bonus: {xp: 0.18, successRate: 0.004}, respect: 50, role: "specialist", roleBadge: "trainer", description: "Never caught, teaches speed", specializations: ["transport"]},
  {id: 13, name: "Forger", cost: 8000, bonus: {xp: 0.20, successRate: 0.003}, respect: 55, role: "specialist", roleBadge: "trainer", description: "Master of fake docs and art", specializations: ["financial"]},
  {id: 14, name: "Demo Expert", cost: 13000, bonus: {xp: 0.24, successRate: 0.005}, respect: 75, role: "specialist", roleBadge: "trainer", description: "Explosives master, bonus on heists", specializations: ["violent"]},
  {id: 15, name: "Cat Burglar", cost: 9000, bonus: {xp: 0.21, successRate: 0.004}, respect: 60, role: "specialist", roleBadge: "trainer", description: "Silent entry expert", specializations: ["stealth"]},
  {id: 16, name: "Con Artist", cost: 6000, bonus: {xp: 0.23, successRate: 0.003}, respect: 45, role: "specialist", roleBadge: "trainer", description: "Master manipulator, bonus on fraud", specializations: ["financial"]},
  {id: 17, name: "Sniper", cost: 18000, bonus: {xp: 0.28, successRate: 0.005}, respect: 90, role: "specialist", roleBadge: "trainer", description: "Long range specialist, contract expert", specializations: ["stealth", "violent"]},

  // 🧰 SUPPORT — "Make money and sustain operations"
  // PRIMARY: Cash (15-25%) + Energy efficiency (10-30)
  // SECONDARY: Small success (0-0.4%)
  // NEVER: XP
  // MERGED: Income generators now provide both job bonuses AND passive income
  {id: 18, name: "Inside Man", cost: 4000, bonus: {money: 0.15, energy: 12}, respect: 30, role: "support", roleBadge: "earner", description: "Connected everywhere", specializations: ["political"]},
  {id: 19, name: "Accountant", cost: 10000, bonus: {money: 0.20, energy: 15}, respect: 65, role: "support", roleBadge: "earner", description: "Launders money expertly", specializations: ["financial"]},
  {id: 20, name: "Lawyer", cost: 15000, bonus: {money: 0.18, energy: 18, successRate: 0.002}, respect: 85, role: "support", roleBadge: "earner", description: "Gets you out of trouble", specializations: ["political"]},
  {id: 21, name: "Corrupt Cop", cost: 20000, bonus: {money: 0.15, energy: 20, successRate: 0.004}, respect: 100, role: "support", roleBadge: "earner", description: "Inside police intel", specializations: ["political"]},
  {id: 22, name: "Doctor", cost: 12000, bonus: {money: 0.10, energy: 25}, respect: 70, role: "support", roleBadge: "earner", description: "Patches you up", specializations: []},
  {id: 23, name: "Fence", cost: 8000, bonus: {money: 0.22, energy: 10}, respect: 50, role: "support", roleBadge: "earner", description: "Sells stolen goods", specializations: ["financial"]},
  {id: 24, name: "Arms Dealer", cost: 14000, bonus: {money: 0.17, energy: 15, successRate: 0.003}, respect: 80, role: "support", roleBadge: "earner", description: "Weapon connections", specializations: ["violent"]},
  {id: 25, name: "Informant Network", cost: 11000, bonus: {money: 0.16, energy: 12, successRate: 0.003}, respect: 65, role: "support", roleBadge: "earner", description: "Eyes and ears everywhere", specializations: ["political"]},
  {id: 26, name: "Political Contact", cost: 25000, bonus: {money: 0.20, energy: 20, successRate: 0.004}, respect: 120, role: "support", roleBadge: "earner", description: "High level protection", specializations: ["political"]},
  {id: 27, name: "Drug Runner", cost: 9000, bonus: {money: 0.18, energy: 10, income: 100}, respect: 55, role: "support", roleBadge: "earner", description: "Street dealer, +$100/hr passive", specializations: ["transport"]},
  {id: 28, name: "Numbers Runner", cost: 7000, bonus: {money: 0.15, energy: 8, income: 75}, respect: 45, role: "support", roleBadge: "earner", description: "Gambling ops, +$75/hr passive", specializations: ["financial"]},
  {id: 29, name: "Loan Shark", cost: 11000, bonus: {money: 0.20, energy: 12, income: 125}, respect: 70, role: "support", roleBadge: "earner", description: "High interest lending, +$125/hr", specializations: ["financial", "violent"]},
  {id: 30, name: "Bookmaker", cost: 10000, bonus: {money: 0.17, energy: 10, income: 110}, respect: 65, role: "support", roleBadge: "earner", description: "Sports betting, +$110/hr passive", specializations: ["financial"]},
  {id: 31, name: "Pimp", cost: 8500, bonus: {money: 0.16, energy: 9, income: 95}, respect: 50, role: "support", roleBadge: "earner", description: "Vice operations, +$95/hr passive", specializations: ["violent"]},
  {id: 32, name: "Smuggler", cost: 13000, bonus: {money: 0.21, energy: 15, successRate: 0.003, income: 150}, respect: 80, role: "support", roleBadge: "earner", description: "Contraband network, +$150/hr", specializations: ["transport"]},
  {id: 33, name: "Black Market Trader", cost: 16000, bonus: {money: 0.25, energy: 18, successRate: 0.003, income: 200}, respect: 95, role: "support", roleBadge: "earner", description: "Elite fence, +$200/hr passive", specializations: ["financial", "transport"]},

  // 💀 ELITE — "Break the rules"
  // PRIMARY: Multiple strong bonuses + unique mechanics
  // COST: Very expensive, high rep
  {id: 34, name: "Underboss", cost: 50000, bonus: {successRate: 0.006, money: 0.15, energy: 30, xp: 0.12}, respect: 200, role: "elite", roleBadge: "wildcard", description: "Your second in command, boosts all", specializations: ["violent", "political"]},
  {id: 35, name: "Consigliere", cost: 60000, bonus: {money: 0.20, xp: 0.18, successRate: 0.005, energy: 25}, respect: 250, role: "elite", roleBadge: "wildcard", description: "Trusted advisor, master strategist", specializations: ["political", "financial"]},
  {id: 36, name: "Master Thief", cost: 75000, bonus: {xp: 0.30, successRate: 0.007, energy: 20}, respect: 300, role: "elite", roleBadge: "wildcard", description: "Legend, double XP on heists", specializations: ["stealth", "financial"]},
  {id: 37, name: "Crime Lord", cost: 100000, bonus: {money: 0.25, successRate: 0.006, energy: 30, income: 500}, respect: 400, role: "elite", roleBadge: "wildcard", description: "Empire builder, +$500/hr passive", specializations: ["violent", "political", "financial"]},
  {id: 38, name: "The Ghost", cost: 80000, bonus: {successRate: 0.012, xp: 0.20, energy: 25}, respect: 350, role: "elite", roleBadge: "wildcard", description: "Never caught, eliminates failures", specializations: ["stealth", "violent"]}
];

const availableEquipment = [
  // WEAPONS
  {id: 1, name: "Brass Knuckles", cost: 150, bonus: {successRate: 0.001}, category: "weapon", description: "Street fighter special"},
  {id: 2, name: "Baseball Bat", cost: 200, bonus: {successRate: 0.001}, category: "weapon", description: "Louisville slugger"},
  {id: 3, name: "Tire Iron", cost: 250, bonus: {successRate: 0.001}, category: "weapon", description: "Mechanic's choice"},
  {id: 4, name: "Switchblade", cost: 300, bonus: {successRate: 0.002}, category: "weapon", description: "Quick and deadly"},
  {id: 5, name: "Machete", cost: 500, bonus: {successRate: 0.002}, category: "weapon", description: "Intimidation factor"},
  {id: 6, name: "Saturday Night Special", cost: 800, bonus: {successRate: 0.002}, category: "weapon", description: "Cheap pistol"},
  {id: 7, name: "9mm Pistol", cost: 1500, bonus: {successRate: 0.003}, category: "weapon", description: "Reliable sidearm"},
  {id: 8, name: "Sawed-off Shotgun", cost: 2500, bonus: {successRate: 0.004}, category: "weapon", description: "Close quarters beast"},
  {id: 9, name: "Tommy Gun", cost: 5000, bonus: {successRate: 0.005, respect: 10}, category: "weapon", description: "Classic gangster piece"},
  {id: 10, name: "Uzi", cost: 7500, bonus: {successRate: 0.005}, category: "weapon", description: "Spray and pray"},
  {id: 11, name: "AK-47", cost: 12000, bonus: {successRate: 0.006, respect: 15}, category: "weapon", description: "Warlord approved"},
  {id: 12, name: "Sniper Rifle", cost: 20000, bonus: {successRate: 0.007, xp: 0.1}, category: "weapon", description: "One shot, one kill"},
  {id: 13, name: "M4 Carbine", cost: 18000, bonus: {successRate: 0.006}, category: "weapon", description: "Military grade"},

  // EXPLOSIVES
  {id: 14, name: "Molotov Cocktails", cost: 400, bonus: {successRate: 0.002}, category: "explosive", description: "DIY destruction"},
  {id: 15, name: "Pipe Bombs", cost: 1000, bonus: {successRate: 0.003}, category: "explosive", description: "Homemade havoc"},
  {id: 16, name: "Hand Grenades", cost: 3000, bonus: {successRate: 0.005}, category: "explosive", description: "Pull pin, throw"},
  {id: 17, name: "C4 Explosives", cost: 8000, bonus: {successRate: 0.006, xp: 0.05}, category: "explosive", description: "Professional demolition"},
  {id: 18, name: "Remote Detonators", cost: 5000, bonus: {successRate: 0.003}, category: "explosive", description: "Boom on demand"},

  // PROTECTION
  {id: 19, name: "Leather Jacket", cost: 500, bonus: {successRate: 0.001}, category: "protection", description: "Looks cool, blocks some"},
  {id: 20, name: "Kevlar Vest", cost: 1200, bonus: {successRate: 0.002}, category: "protection", description: "Stop most calibers"},
  {id: 21, name: "Body Armor", cost: 3000, bonus: {successRate: 0.004}, category: "protection", description: "Heavy duty protection"},
  {id: 22, name: "Riot Gear", cost: 6000, bonus: {successRate: 0.005, energy: 10}, category: "protection", description: "Full tactical gear"},
  {id: 23, name: "Ballistic Shield", cost: 4500, bonus: {successRate: 0.005}, category: "protection", description: "Mobile cover"},

  // UTILITY
  {id: 24, name: "Burner Phone", cost: 400, bonus: {energy: 5}, category: "utility", description: "Untraceable calls"},
  {id: 25, name: "Lock Picks", cost: 600, bonus: {successRate: 0.002}, category: "utility", description: "Silent entry"},
  {id: 26, name: "Bolt Cutters", cost: 800, bonus: {successRate: 0.002}, category: "utility", description: "Cut through chains"},
  {id: 27, name: "Crowbar", cost: 300, bonus: {successRate: 0.002}, category: "utility", description: "Pry open anything"},
  {id: 28, name: "Glass Cutter", cost: 1000, bonus: {successRate: 0.003}, category: "utility", description: "Quiet window access"},
  {id: 29, name: "Grappling Hook", cost: 2500, bonus: {successRate: 0.003}, category: "utility", description: "Roof access"},
  {id: 30, name: "Night Vision Goggles", cost: 5000, bonus: {successRate: 0.004, xp: 0.05}, category: "utility", description: "See in the dark"},
  {id: 31, name: "Thermal Scanner", cost: 7500, bonus: {successRate: 0.005}, category: "utility", description: "Detect heat signatures"},

  // DOCUMENTS
  {id: 32, name: "Fake ID", cost: 1500, bonus: {successRate: 0.003}, category: "documents", description: "New identity"},
  {id: 33, name: "Counterfeit Documents", cost: 3000, bonus: {successRate: 0.004, money: 0.05}, category: "documents", description: "Look legitimate"},
  {id: 34, name: "Forged Passport", cost: 5000, bonus: {successRate: 0.005}, category: "documents", description: "International travel"},
  {id: 35, name: "Police Badge (Fake)", cost: 8000, bonus: {successRate: 0.006}, category: "documents", description: "Flash the badge"},

  // TECH
  {id: 36, name: "Police Scanner", cost: 2000, bonus: {successRate: 0.003}, category: "tech", description: "Monitor police chatter"},
  {id: 37, name: "Encrypted Radio", cost: 3500, bonus: {energy: 10, successRate: 0.002}, category: "tech", description: "Secure communications"},
  {id: 38, name: "GPS Trackers", cost: 2500, bonus: {successRate: 0.004}, category: "tech", description: "Track targets"},
  {id: 39, name: "Security Camera System", cost: 6000, bonus: {successRate: 0.005, money: 0.05}, category: "tech", description: "Eyes everywhere"},
  {id: 40, name: "Laptop & Hacking Tools", cost: 8000, bonus: {money: 0.10, xp: 0.08, successRate: 0.001}, category: "tech", description: "Digital warfare"},
  {id: 41, name: "Signal Jammer", cost: 10000, bonus: {successRate: 0.006}, category: "tech", description: "Block communications"},
  {id: 42, name: "USB Malware Drive", cost: 4000, bonus: {successRate: 0.004, xp: 0.05}, category: "tech", description: "Infect systems"},
  {id: 43, name: "Drone with Camera", cost: 12000, bonus: {successRate: 0.006, xp: 0.10}, category: "tech", description: "Aerial surveillance"},
  {id: 44, name: "Bug Sweeper", cost: 5500, bonus: {successRate: 0.005}, category: "tech", description: "Detect listening devices"},

  // VEHICLES
  {id: 45, name: "Getaway Motorcycle", cost: 4000, bonus: {successRate: 0.004, energy: 5}, category: "vehicle", description: "Fast escape"},
  {id: 46, name: "Muscle Car", cost: 8000, bonus: {successRate: 0.005, energy: 10}, category: "vehicle", description: "Raw power"},
  {id: 47, name: "Getaway Car", cost: 10000, bonus: {successRate: 0.006, energy: 15}, category: "vehicle", description: "Quick exits"},
  {id: 48, name: "SUV with Tinted Windows", cost: 15000, bonus: {successRate: 0.006, respect: 10}, category: "vehicle", description: "Intimidating presence"},
  {id: 49, name: "Armored Vehicle", cost: 30000, bonus: {successRate: 0.008, energy: 20, respect: 20}, category: "vehicle", description: "Tank on wheels"},
  {id: 50, name: "Speed Boat", cost: 25000, bonus: {successRate: 0.007, money: 0.05}, category: "vehicle", description: "Water escape route"},

  // MISC
  {id: 51, name: "Disguise Kit", cost: 3500, bonus: {successRate: 0.005}, category: "misc", description: "Blend in anywhere"},
  {id: 52, name: "Safe House Upgrades", cost: 20000, bonus: {energy: 25, successRate: 0.004}, category: "misc", description: "Secure hideout"},
  {id: 53, name: "Surveillance Van", cost: 22000, bonus: {successRate: 0.007, xp: 0.10}, category: "misc", description: "Mobile command center"},
  {id: 54, name: "Helicopter", cost: 100000, bonus: {successRate: 0.015, energy: 30, respect: 50}, category: "misc", description: "Air superiority"}
];

const availableProperties = [
  // LOW-TIER
  {id: 1, name: "Hot Dog Stand", cost: 500, income: 10, tier: "low", description: "Launders $10/hour"},
  {id: 2, name: "Vending Machine Route", cost: 1000, income: 20, tier: "low", description: "Launders $20/hour"},
  {id: 3, name: "Laundromat", cost: 1500, income: 25, tier: "low", description: "Launders $25/hour"},
  {id: 4, name: "Car Wash", cost: 2000, income: 30, tier: "low", description: "Launders $30/hour"},
  {id: 5, name: "Food Truck", cost: 2500, income: 35, tier: "low", description: "Launders $35/hour"},
  {id: 6, name: "Barber Shop", cost: 3000, income: 40, tier: "low", description: "Launders $40/hour"},
  {id: 7, name: "Pawn Shop", cost: 3500, income: 50, tier: "low", description: "Launders $50/hour"},
  
  // MID-TIER
  {id: 8, name: "Tattoo Parlor", cost: 5000, income: 75, tier: "mid", description: "Launders $75/hour"},
  {id: 9, name: "Arcade", cost: 6000, income: 90, tier: "mid", description: "Launders $90/hour"},
  {id: 10, name: "Bail Bonds Office", cost: 7000, income: 100, tier: "mid", description: "Launders $100/hour"},
  {id: 11, name: "Check Cashing Store", cost: 8000, income: 110, tier: "mid", description: "Launders $110/hour"},
  {id: 12, name: "Used Car Lot", cost: 10000, income: 125, tier: "mid", description: "Launders $125/hour"},
  {id: 13, name: "Storage Facility", cost: 12000, income: 150, tier: "mid", description: "Launders $150/hour"},
  {id: 14, name: "Auto Repair Shop", cost: 13000, income: 165, tier: "mid", description: "Launders $165/hour"},
  {id: 15, name: "Restaurant", cost: 15000, income: 200, tier: "mid", description: "Launders $200/hour"},
  {id: 16, name: "Gym", cost: 16000, income: 210, tier: "mid", description: "Launders $210/hour"},
  {id: 17, name: "Strip Club", cost: 20000, income: 300, tier: "mid", description: "Launders $300/hour"},
  {id: 18, name: "Sports Bar", cost: 22000, income: 325, tier: "mid", description: "Launders $325/hour"},
  {id: 19, name: "Gentlemen's Club", cost: 25000, income: 350, tier: "mid", description: "Launders $350/hour"},
  
  // HIGH-TIER
  {id: 20, name: "Nightclub", cost: 30000, income: 400, tier: "high", description: "Launders $400/hour"},
  {id: 21, name: "Construction Company", cost: 40000, income: 600, tier: "high", description: "Launders $600/hour"},
  {id: 22, name: "Tow Truck Company", cost: 35000, income: 500, tier: "high", description: "Launders $500/hour"},
  {id: 23, name: "Car Dealership", cost: 50000, income: 750, tier: "high", description: "Launders $750/hour"},
  {id: 24, name: "Waste Management", cost: 55000, income: 800, tier: "high", description: "Launders $800/hour"},
  {id: 25, name: "Shipping Company", cost: 75000, income: 1200, tier: "high", description: "Launders $1200/hour"},
  {id: 26, name: "Private Security Firm", cost: 80000, income: 1500, tier: "high", description: "Launders $1500/hour"},
  {id: 27, name: "Import/Export Business", cost: 90000, income: 1600, tier: "high", description: "Launders $1600/hour"},
  {id: 28, name: "Real Estate Agency", cost: 100000, income: 2000, tier: "high", description: "Launders $2000/hour"},
  {id: 29, name: "Pharmaceutical Company", cost: 120000, income: 2500, tier: "high", description: "Launders $2500/hour"},
  {id: 30, name: "Casino", cost: 150000, income: 3500, tier: "high", description: "Launders $3500/hour"},
  
  // PREMIUM-TIER
  {id: 31, name: "Hotel Chain", cost: 200000, income: 5000, tier: "premium", description: "Launders $5000/hour"},
  {id: 32, name: "Private Airport", cost: 250000, income: 6500, tier: "premium", description: "Launders $6500/hour"},
  {id: 33, name: "Offshore Bank", cost: 300000, income: 8000, tier: "premium", description: "Launders $8000/hour"},
  {id: 34, name: "Cryptocurrency Exchange", cost: 350000, income: 10000, tier: "premium", description: "Launders $10000/hour"}
];

// Advanced Job Templates - randomly generated opportunities
const advancedJobTemplates = [
  {name: "Armored Convoy", desc: "moving through the docks", energy: 45, money: [8000, 16000], xp: 85, respect: 40, duration: 180000, risk: 'extreme', successRate: 0.55, heatGain: 25, requirements: {crewType: ["violent", "transport"], vehicle: true}},
  {name: "Casino Vault", desc: "Insider offers access", energy: 50, money: [12000, 24000], xp: 100, respect: 55, duration: 210000, risk: 'extreme', successRate: 0.52, heatGain: 30, intelCost: 3, requirements: {crewType: ["stealth", "financial"]}},
  {name: "Bribe Politician", desc: "open to bribery", energy: 30, money: [6000, 12000], xp: 70, respect: 35, duration: 120000, risk: 'high', successRate: 0.70, heatGain: 10, maxHeat: 40, requirements: {crewType: ["political"]}},
  {name: "Weak Rival Gang", desc: "vulnerable after a war", energy: 40, money: [9000, 18000], xp: 90, respect: 45, duration: 150000, risk: 'very high', successRate: 0.65, heatGain: 20, minCrew: 3, requirements: {crewType: ["violent"]}},
  {name: "Diamond Shipment", desc: "arriving at private airfield", energy: 55, money: [15000, 30000], xp: 110, respect: 60, duration: 240000, risk: 'extreme', successRate: 0.48, heatGain: 35, requirements: {crewType: ["stealth", "transport"], vehicle: true}},
  {name: "Corrupt Judge", desc: "can erase records", energy: 35, money: [5000, 10000], xp: 65, respect: 30, duration: 90000, risk: 'medium', successRate: 0.75, heatReduction: 30, requirements: {crewType: ["political"]}},
  {name: "Drug Laboratory", desc: "unguarded for maintenance", energy: 48, money: [11000, 22000], xp: 95, respect: 50, duration: 200000, risk: 'very high', successRate: 0.58, heatGain: 28, requirements: {crewType: ["violent", "stealth"]}},
  {name: "Insider Trading", desc: "stock manipulation opportunity", energy: 25, money: [7000, 14000], xp: 75, respect: 35, duration: 100000, risk: 'medium', successRate: 0.72, heatGain: 8, intelCost: 2, requirements: {crewType: ["financial"]}},
  {name: "Art Auction Heist", desc: "priceless collection on display", energy: 52, money: [13000, 26000], xp: 105, respect: 58, duration: 220000, risk: 'extreme', successRate: 0.50, heatGain: 32, intelCost: 4, requirements: {crewType: ["stealth", "financial"], vehicle: true}},
  {name: "Weapons Shipment", desc: "military convoy passing through", energy: 50, money: [10000, 20000], xp: 92, respect: 48, duration: 190000, risk: 'extreme', successRate: 0.54, heatGain: 27, requirements: {crewType: ["violent", "transport"], vehicle: true}},
  {name: "Blackmail Opportunity", desc: "CEO caught in compromising situation", energy: 28, money: [5500, 11000], xp: 68, respect: 32, duration: 85000, risk: 'low', successRate: 0.80, heatGain: 5, intelCost: 2, maxHeat: 30, requirements: {crewType: ["political", "stealth"]}},
  {name: "Underground Fight Fix", desc: "fighter willing to throw match", energy: 32, money: [4500, 9000], xp: 62, respect: 28, duration: 75000, risk: 'medium', successRate: 0.78, heatGain: 12, requirements: {crewType: ["violent", "financial"]}},
  {name: "Money Laundering Op", desc: "shell company needs cleanup", energy: 38, money: [8500, 17000], xp: 80, respect: 42, duration: 140000, risk: 'high', successRate: 0.68, heatReduction: 20, requirements: {crewType: ["financial", "political"]}},
  {name: "Kidnapping Contract", desc: "wealthy target vulnerable", energy: 60, money: [18000, 36000], xp: 120, respect: 65, duration: 270000, risk: 'extreme', successRate: 0.45, heatGain: 40, intelCost: 5, minCrew: 4, requirements: {crewType: ["violent", "stealth"], vehicle: true}},
  {name: "Corporate Espionage", desc: "steal trade secrets", energy: 42, money: [9500, 19000], xp: 88, respect: 46, duration: 160000, risk: 'high', successRate: 0.62, heatGain: 15, intelCost: 3, requirements: {crewType: ["stealth", "financial"]}},
];

// Intel Jobs - Information & Espionage Operations
const intelJobs = [
  // SURVEILLANCE (Low-risk intel gathering)
  {id: 1, name: "Tail Rival Associate", energy: 15, money: [200, 400], intel: [1, 2], xp: 12, respect: 3, minLevel: 3, category: "surveillance", description: "Follow them, see where they go", successRate: 0.80, duration: 30000, risk: 'low', heatRisk: 0.05, requirements: {}},
  {id: 2, name: "Bug Restaurant Meeting", energy: 18, money: [300, 600], intel: [1, 3], xp: 15, respect: 4, minLevel: 4, category: "surveillance", description: "Plant listening devices", successRate: 0.75, duration: 40000, risk: 'medium', heatRisk: 0.10, requirements: {crewType: ["stealth"]}},
  {id: 3, name: "Photograph Secret Meeting", energy: 20, money: [400, 800], intel: [2, 3], xp: 18, respect: 5, minLevel: 4, category: "surveillance", description: "Long-range surveillance", successRate: 0.78, duration: 45000, risk: 'low', heatRisk: 0.08, requirements: {crewType: ["stealth"]}},
  {id: 4, name: "Monitor Police Scanner", energy: 12, money: [150, 300], intel: [1, 2], xp: 10, respect: 2, minLevel: 3, category: "surveillance", description: "Listen to police communications", successRate: 0.85, duration: 25000, risk: 'low', heatRisk: 0.02, requirements: {}},
  {id: 5, name: "Track Criminal Shipment", energy: 25, money: [500, 1000], intel: [2, 4], xp: 22, respect: 6, minLevel: 5, category: "surveillance", description: "Follow the money trail", successRate: 0.72, duration: 55000, risk: 'medium', heatRisk: 0.12, requirements: {crewType: ["transport"], vehicle: true}},

  // INFILTRATION (Medium-risk insider ops)
  {id: 6, name: "Bribe Low-Level Cop", energy: 22, money: [600, 1200], intel: [2, 3], xp: 20, respect: 7, minLevel: 5, category: "infiltration", description: "Get police intel", successRate: 0.70, duration: 50000, risk: 'medium', heatRisk: 0.15, requirements: {crewType: ["political"]}},
  {id: 7, name: "Plant Mole in Rival Gang", energy: 30, money: [800, 1600], intel: [3, 5], xp: 28, respect: 10, minLevel: 6, category: "infiltration", description: "Long-term infiltration", successRate: 0.65, duration: 70000, risk: 'high', heatRisk: 0.20, requirements: {crewType: ["stealth"]}},
  {id: 8, name: "Corrupt City Hall Clerk", energy: 28, money: [700, 1400], intel: [2, 4], xp: 25, respect: 9, minLevel: 6, category: "infiltration", description: "Access to city records", successRate: 0.68, duration: 60000, risk: 'medium', heatRisk: 0.18, requirements: {crewType: ["political"]}},
  {id: 9, name: "Recruit Informant", energy: 20, money: [400, 800], intel: [1, 3], xp: 18, respect: 5, minLevel: 4, category: "infiltration", description: "Build your network", successRate: 0.75, duration: 45000, risk: 'medium', heatRisk: 0.10, requirements: {}},
  {id: 10, name: "Infiltrate Warehouse", energy: 32, money: [900, 1800], intel: [3, 4], xp: 30, respect: 12, minLevel: 7, category: "infiltration", description: "Scope out rival operations", successRate: 0.66, duration: 75000, risk: 'high', heatRisk: 0.22, requirements: {crewType: ["stealth"]}},

  // HACKING (Tech-based intel)
  {id: 11, name: "Hack Email Account", energy: 18, money: [500, 1000], intel: [2, 3], xp: 16, respect: 5, minLevel: 5, category: "hacking", description: "Digital espionage", successRate: 0.72, duration: 40000, risk: 'medium', heatRisk: 0.12, requirements: {crewType: ["financial"]}},
  {id: 12, name: "Crack Security System", energy: 25, money: [800, 1600], intel: [3, 4], xp: 24, respect: 8, minLevel: 6, category: "hacking", description: "Bypass digital locks", successRate: 0.68, duration: 60000, risk: 'medium', heatRisk: 0.15, requirements: {crewType: ["financial"]}},
  {id: 13, name: "Steal Database Files", energy: 30, money: [1000, 2000], intel: [3, 5], xp: 28, respect: 11, minLevel: 7, category: "hacking", description: "Raid corporate servers", successRate: 0.64, duration: 70000, risk: 'high', heatRisk: 0.20, requirements: {crewType: ["financial"]}},
  {id: 14, name: "Hack Bank Records", energy: 35, money: [1200, 2400], intel: [4, 6], xp: 32, respect: 14, minLevel: 8, category: "hacking", description: "Financial intelligence", successRate: 0.60, duration: 85000, risk: 'high', heatRisk: 0.25, requirements: {crewType: ["financial"]}},
  {id: 15, name: "Breach Police Database", energy: 40, money: [1500, 3000], intel: [4, 7], xp: 38, respect: 16, minLevel: 9, category: "hacking", description: "High-risk, high-reward", successRate: 0.55, duration: 95000, risk: 'very high', heatRisk: 0.30, requirements: {crewType: ["financial"]}},

  // BLACKMAIL (Info gathering for leverage)
  {id: 16, name: "Dig Up Dirt on Judge", energy: 28, money: [700, 1400], intel: [2, 4], xp: 26, respect: 9, minLevel: 6, category: "blackmail", description: "Find their secrets", successRate: 0.70, duration: 65000, risk: 'medium', heatRisk: 0.16, requirements: {crewType: ["political"]}},
  {id: 17, name: "Investigate Politician", energy: 32, money: [900, 1800], intel: [3, 5], xp: 30, respect: 12, minLevel: 7, category: "blackmail", description: "Uncover corruption", successRate: 0.66, duration: 75000, risk: 'high', heatRisk: 0.20, requirements: {crewType: ["political"]}},
  {id: 18, name: "Follow Cheating Spouse", energy: 20, money: [400, 800], intel: [1, 2], xp: 18, respect: 4, minLevel: 4, category: "blackmail", description: "Get compromising photos", successRate: 0.78, duration: 45000, risk: 'low', heatRisk: 0.08, requirements: {}},
  {id: 19, name: "Expose Business Fraud", energy: 35, money: [1100, 2200], intel: [3, 5], xp: 34, respect: 13, minLevel: 8, category: "blackmail", description: "Corporate secrets for sale", successRate: 0.62, duration: 80000, risk: 'high', heatRisk: 0.22, requirements: {crewType: ["financial"]}},
  {id: 20, name: "Uncover Rival's Weakness", energy: 38, money: [1300, 2600], intel: [4, 6], xp: 36, respect: 15, minLevel: 9, category: "blackmail", description: "Knowledge is power", successRate: 0.58, duration: 90000, risk: 'very high', heatRisk: 0.28, requirements: {crewType: ["stealth"]}},

  // CITY SECRETS (High-level intel)
  {id: 21, name: "Map Rival Territory", energy: 25, money: [600, 1200], intel: [2, 3], xp: 22, respect: 7, minLevel: 5, category: "secrets", description: "Know the lay of the land", successRate: 0.74, duration: 55000, risk: 'medium', heatRisk: 0.14, requirements: {}},
  {id: 22, name: "Identify Undercover Cops", energy: 30, money: [800, 1600], intel: [3, 4], xp: 28, respect: 10, minLevel: 7, category: "secrets", description: "Spot the rats", successRate: 0.68, duration: 70000, risk: 'high', heatRisk: 0.18, requirements: {crewType: ["stealth"]}},
  {id: 23, name: "Locate Secret Stash House", energy: 32, money: [1000, 2000], intel: [3, 5], xp: 30, respect: 11, minLevel: 7, category: "secrets", description: "Find hidden valuables", successRate: 0.66, duration: 75000, risk: 'high', heatRisk: 0.20, requirements: {crewType: ["stealth"]}},
  {id: 24, name: "Discover Smuggling Route", energy: 35, money: [1200, 2400], intel: [4, 5], xp: 34, respect: 13, minLevel: 8, category: "secrets", description: "New trafficking channel", successRate: 0.64, duration: 85000, risk: 'high', heatRisk: 0.22, requirements: {crewType: ["transport"], vehicle: true}},
  {id: 25, name: "Predict Gang War", energy: 40, money: [1500, 3000], intel: [4, 7], xp: 40, respect: 17, minLevel: 10, category: "secrets", description: "See conflict before it starts", successRate: 0.60, duration: 100000, risk: 'very high', heatRisk: 0.26, requirements: {crewType: ["political", "stealth"]}},

  // Additional operations for variety (26-35)
  {id: 26, name: "Wiretap Phone Lines", energy: 22, money: [450, 900], intel: [2, 3], xp: 20, respect: 6, minLevel: 5, category: "surveillance", description: "Intercept communications", successRate: 0.73, duration: 50000, risk: 'medium', heatRisk: 0.14, requirements: {crewType: ["financial"]}},
  {id: 27, name: "Steal Security Footage", energy: 24, money: [550, 1100], intel: [2, 4], xp: 22, respect: 7, minLevel: 5, category: "hacking", description: "Erase your tracks", successRate: 0.71, duration: 55000, risk: 'medium', heatRisk: 0.16, requirements: {crewType: ["financial"]}},
  {id: 28, name: "Interrogate Street Thug", energy: 18, money: [350, 700], intel: [1, 3], xp: 16, respect: 5, minLevel: 4, category: "infiltration", description: "Extract information", successRate: 0.76, duration: 40000, risk: 'medium', heatRisk: 0.12, requirements: {crewType: ["violent"]}},
  {id: 29, name: "Analyze Gang Communications", energy: 26, money: [650, 1300], intel: [2, 4], xp: 24, respect: 8, minLevel: 6, category: "hacking", description: "Decode encrypted messages", successRate: 0.69, duration: 60000, risk: 'medium', heatRisk: 0.17, requirements: {crewType: ["financial"]}},
  {id: 30, name: "Spy on Rival Meetings", energy: 28, money: [750, 1500], intel: [3, 4], xp: 26, respect: 9, minLevel: 6, category: "surveillance", description: "Hidden observation", successRate: 0.67, duration: 65000, risk: 'high', heatRisk: 0.19, requirements: {crewType: ["stealth"]}},
  {id: 31, name: "Steal Evidence Files", energy: 33, money: [950, 1900], intel: [3, 5], xp: 31, respect: 12, minLevel: 7, category: "infiltration", description: "Break into precinct", successRate: 0.63, duration: 75000, risk: 'high', heatRisk: 0.23, requirements: {crewType: ["stealth"]}},
  {id: 32, name: "Track Money Laundering", energy: 30, money: [850, 1700], intel: [3, 4], xp: 28, respect: 10, minLevel: 7, category: "blackmail", description: "Follow dirty money", successRate: 0.65, duration: 70000, risk: 'high', heatRisk: 0.21, requirements: {crewType: ["financial"]}},
  {id: 33, name: "Compromise Security Guard", energy: 24, money: [600, 1200], intel: [2, 3], xp: 22, respect: 7, minLevel: 5, category: "infiltration", description: "Bribe or blackmail", successRate: 0.72, duration: 55000, risk: 'medium', heatRisk: 0.15, requirements: {crewType: ["political"]}},
  {id: 34, name: "Decode Police Radio", energy: 16, money: [300, 600], intel: [1, 2], xp: 14, respect: 4, minLevel: 3, category: "surveillance", description: "Listen to encrypted channels", successRate: 0.80, duration: 35000, risk: 'low', heatRisk: 0.08, requirements: {}},
  {id: 35, name: "Extract Witness Testimony", energy: 27, money: [700, 1400], intel: [2, 4], xp: 25, respect: 8, minLevel: 6, category: "blackmail", description: "Get them to talk", successRate: 0.68, duration: 62000, risk: 'medium', heatRisk: 0.18, requirements: {crewType: ["violent"]}},
];
