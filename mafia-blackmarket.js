// BLACK MARKET SYSTEM
// Rotating shop with rare items, buffs, weapons, intel, and special operations

// Black Market Item Catalog - MASSIVE INVENTORY
const blackMarketCatalog = {
  weapons: [
    // Common weapons (10) - Now provide job bonuses and combat power
    { id: 'bm_knife', name: 'Switchblade', icon: '🔪', description: '+2% violent job success, +3 combat power', bonus: {successRate: 0.02}, combat: 3, price: 2500, rarity: 'common', jobType: 'violent' },
    { id: 'bm_brass', name: 'Brass Knuckles', icon: '👊', description: '+2% violent job success, +4 combat power', bonus: {successRate: 0.02}, combat: 4, price: 2000, rarity: 'common', jobType: 'violent' },
    { id: 'bm_bat', name: 'Aluminum Bat', icon: '⚾', description: '+3% violent job success, +5 combat power', bonus: {successRate: 0.03}, combat: 5, price: 3000, rarity: 'common', jobType: 'violent' },
    { id: 'bm_crowbar', name: 'Crowbar', icon: '🔨', description: '+3% success, +5 combat, +2 stealth (multi-purpose)', bonus: {successRate: 0.03}, combat: 5, stealth: 2, price: 2800, rarity: 'common' },
    { id: 'bm_machete', name: 'Machete', icon: '🗡️', description: '+3% violent job success, +6 combat power', bonus: {successRate: 0.03}, combat: 6, price: 3500, rarity: 'common', jobType: 'violent' },
    { id: 'bm_taser', name: 'Stun Gun', icon: '⚡', description: '+4% stealth job success, +5 stealth power', bonus: {successRate: 0.04}, stealth: 5, price: 4000, rarity: 'common', jobType: 'stealth' },
    { id: 'bm_chain', name: 'Chain Whip', icon: '⛓️', description: '+3% violent job success, +5 combat power', bonus: {successRate: 0.03}, combat: 5, price: 3200, rarity: 'common', jobType: 'violent' },
    { id: 'bm_baton', name: 'Police Baton', icon: '🏑', description: '+3% success, +4 combat, +3 stealth', bonus: {successRate: 0.03}, combat: 4, stealth: 3, price: 2700, rarity: 'common' },
    { id: 'bm_cleaver', name: 'Butcher Knife', icon: '🔪', description: '+3% violent job success, +6 combat power', bonus: {successRate: 0.03}, combat: 6, price: 3300, rarity: 'common', jobType: 'violent' },
    { id: 'bm_shiv', name: 'Prison Shiv', icon: '🗡️', description: '+4% stealth success, +5 combat, +4 stealth', bonus: {successRate: 0.04}, combat: 5, stealth: 4, price: 2900, rarity: 'common', jobType: 'stealth' },

    // Uncommon weapons (12) - Better bonuses
    { id: 'bm_pistol', name: 'Unlicensed .38', icon: '🔫', description: '+5% violent job success, +8 combat power', bonus: {successRate: 0.05}, combat: 8, price: 8000, rarity: 'uncommon', jobType: 'violent' },
    { id: 'bm_revolver', name: 'Six Shooter', icon: '🔫', description: '+5% violent job success, +9 combat power', bonus: {successRate: 0.05}, combat: 9, price: 9000, rarity: 'uncommon', jobType: 'violent' },
    { id: 'bm_glock', name: 'Street Glock', icon: '🔫', description: '+6% violent job success, +10 combat power', bonus: {successRate: 0.06}, combat: 10, price: 10000, rarity: 'uncommon', jobType: 'violent' },
    { id: 'bm_silencer', name: 'Silenced .22', icon: '🔫', description: '+8% stealth job success, +7 combat, +8 stealth', bonus: {successRate: 0.08}, combat: 7, stealth: 8, price: 12000, rarity: 'uncommon', jobType: 'stealth' },
    { id: 'bm_shotgun', name: 'Sawed-Off Shotgun', icon: '💥', description: '+7% violent job success, +12 combat power', bonus: {successRate: 0.07}, combat: 12, price: 11000, rarity: 'uncommon', jobType: 'violent' },
    { id: 'bm_uzi', name: 'Micro Uzi', icon: '🔫', description: '+6% violent job success, +11 combat power', bonus: {successRate: 0.06}, combat: 11, price: 13000, rarity: 'uncommon', jobType: 'violent' },
    { id: 'bm_crossbow', name: 'Tactical Crossbow', icon: '🏹', description: '+9% stealth success, +9 combat, +10 stealth', bonus: {successRate: 0.09}, combat: 9, stealth: 10, price: 14000, rarity: 'uncommon', jobType: 'stealth' },
    { id: 'bm_flamethrower', name: 'Pocket Flamethrower', icon: '🔥', description: '+7% success, +13 combat (destroys evidence)', bonus: {successRate: 0.07}, combat: 13, price: 15000, rarity: 'uncommon' },
    { id: 'bm_nunchucks', name: 'Steel Nunchucks', icon: '⚔️', description: '+6% success, +8 combat, +6 stealth', bonus: {successRate: 0.06}, combat: 8, stealth: 6, price: 9500, rarity: 'uncommon' },
    { id: 'bm_katana', name: 'Yakuza Katana', icon: '⚔️', description: '+6% violent success, +11 combat, +5 stealth', bonus: {successRate: 0.06}, combat: 11, stealth: 5, price: 12500, rarity: 'uncommon', jobType: 'violent' },
    { id: 'bm_garrote', name: 'Wire Garrote', icon: '🪢', description: '+10% stealth success, +7 combat, +12 stealth', bonus: {successRate: 0.10}, combat: 7, stealth: 12, price: 11500, rarity: 'uncommon', jobType: 'stealth' },
    { id: 'bm_grenades', name: 'Flash Grenades', icon: '💣', description: '+6% success, +10 combat (stun & escape)', bonus: {successRate: 0.06}, combat: 10, price: 10500, rarity: 'uncommon' },

    // Rare weapons (10) - Powerful bonuses
    { id: 'bm_smg', name: 'Modified SMG', icon: '💥', description: '+10% violent success, +5% XP, +15 combat', bonus: {successRate: 0.10, xp: 0.05}, combat: 15, price: 25000, rarity: 'rare', jobType: 'violent' },
    { id: 'bm_sniper', name: 'Precision Rifle', icon: '🎯', description: '+12% stealth success, +8% money, +20 combat, +5 stealth', bonus: {successRate: 0.12, money: 0.08}, combat: 20, stealth: 5, price: 45000, rarity: 'rare', jobType: 'stealth' },
    { id: 'bm_ak47', name: 'Black Market AK-47', icon: '💥', description: '+11% success, +18 combat (Russian reliability)', bonus: {successRate: 0.11}, combat: 18, price: 35000, rarity: 'rare' },
    { id: 'bm_ar15', name: 'Tactical AR-15', icon: '💥', description: '+12% violent success, +10% XP, +19 combat', bonus: {successRate: 0.12, xp: 0.10}, combat: 19, price: 40000, rarity: 'rare', jobType: 'violent' },
    { id: 'bm_deagle', name: 'Desert Eagle .50', icon: '🔫', description: '+10% success, +16 combat (hand cannon)', bonus: {successRate: 0.10}, combat: 16, price: 28000, rarity: 'rare' },
    { id: 'bm_launcher', name: 'Grenade Launcher', icon: '💣', description: '+15% success, +22 combat (explosive solution)', bonus: {successRate: 0.15}, combat: 22, price: 50000, rarity: 'rare' },
    { id: 'bm_minigun', name: 'Portable Minigun', icon: '💥', description: '+15% violent success, +25 combat (suppressive fire)', bonus: {successRate: 0.15}, combat: 25, price: 55000, rarity: 'rare', jobType: 'violent' },
    { id: 'bm_railgun', name: 'Prototype Railgun', icon: '⚡', description: '+14% success, +15% money, +23 combat', bonus: {successRate: 0.14, money: 0.15}, combat: 23, stealth: 3, price: 60000, rarity: 'rare' },
    { id: 'bm_plasmacutter', name: 'Industrial Plasma Cutter', icon: '🔥', description: '+13% success, +21 combat (cuts anything)', bonus: {successRate: 0.13}, combat: 21, price: 48000, rarity: 'rare' },
    { id: 'bm_compound', name: 'Compound Bow', icon: '🏹', description: '+15% stealth success, +17 combat, +15 stealth', bonus: {successRate: 0.15}, combat: 17, stealth: 15, price: 42000, rarity: 'rare', jobType: 'stealth' },

    // Legendary weapons (8) - Elite bonuses
    { id: 'bm_explosive', name: 'C4 Package', icon: '💣', description: '+20% success, +10% money, +30 combat', bonus: {successRate: 0.20, money: 0.10}, combat: 30, price: 75000, rarity: 'legendary' },
    { id: 'bm_rpg', name: 'RPG-7 Launcher', icon: '🚀', description: '+25% success, +15% money, +35 combat', bonus: {successRate: 0.25, money: 0.15}, combat: 35, price: 90000, rarity: 'legendary' },
    { id: 'bm_barrett', name: 'Barrett .50 Cal', icon: '🎯', description: '+22% success, +20% money, +32 combat, +8 stealth', bonus: {successRate: 0.22, money: 0.20}, combat: 32, stealth: 8, price: 85000, rarity: 'legendary' },
    { id: 'bm_chaingun', name: 'M134 Minigun', icon: '💥', description: '+28% success, +38 combat (gatling gun)', bonus: {successRate: 0.28}, combat: 38, price: 100000, rarity: 'legendary' },
    { id: 'bm_emp', name: 'EMP Device', icon: '⚡', description: '+30% success, +15 combat, +20 stealth (disables electronics)', bonus: {successRate: 0.30}, combat: 15, stealth: 20, price: 95000, rarity: 'legendary' },
    { id: 'bm_lasercutter', name: 'Military Laser System', icon: '🔴', description: '+30% success, +25% money, +40 combat', bonus: {successRate: 0.30, money: 0.25}, combat: 40, price: 120000, rarity: 'legendary' },
    { id: 'bm_nuke', name: 'Briefcase Nuke', icon: '☢️', description: '+50% success, +50% money, +50 combat (nuclear option)', bonus: {successRate: 0.50, money: 0.50}, combat: 50, price: 250000, rarity: 'legendary' },
    { id: 'bm_exosuit', name: 'Combat Exosuit', icon: '🤖', description: '+35% success, +30% XP, +45 combat', bonus: {successRate: 0.35, xp: 0.30}, combat: 45, price: 150000, rarity: 'legendary' }
  ],

  intel: [
    // Common intel (8)
    { id: 'bm_intel_1', name: 'Street Rumors', icon: '📰', description: 'Low-level gossip', intel: 5, price: 3000, rarity: 'common' },
    { id: 'bm_intel_2', name: 'Bar Talk', icon: '🍺', description: 'Drunk confessions', intel: 6, price: 3500, rarity: 'common' },
    { id: 'bm_intel_3', name: 'Snitch Info', icon: '🐀', description: 'Informant tips', intel: 7, price: 4000, rarity: 'common' },
    { id: 'bm_intel_4', name: 'Overheard Phone Call', icon: '📞', description: 'Wiretap fragment', intel: 6, price: 3200, rarity: 'common' },
    { id: 'bm_intel_5', name: 'Stolen Notebook', icon: '📓', description: 'Gang records', intel: 8, price: 4500, rarity: 'common' },
    { id: 'bm_intel_6', name: 'Surveillance Photos', icon: '📸', description: 'Target movements', intel: 7, price: 3800, rarity: 'common' },
    { id: 'bm_intel_7', name: 'Burner Phone Data', icon: '📱', description: 'Text message logs', intel: 8, price: 4200, rarity: 'common' },
    { id: 'bm_intel_8', name: 'Dumpster Dive Documents', icon: '🗑️', description: 'Shredded evidence', intel: 6, price: 3300, rarity: 'common' },

    // Uncommon intel (10)
    { id: 'bm_intel_9', name: 'Police Scanner', icon: '📻', description: 'Real-time cop chatter', intel: 15, price: 10000, rarity: 'uncommon' },
    { id: 'bm_intel_10', name: 'Hacked Email Archive', icon: '💻', description: 'Corporate secrets', intel: 16, price: 11000, rarity: 'uncommon' },
    { id: 'bm_intel_11', name: 'Security Camera Footage', icon: '📹', description: 'Building layouts', intel: 14, price: 9500, rarity: 'uncommon' },
    { id: 'bm_intel_12', name: 'Bank Records', icon: '🏦', description: 'Financial trails', intel: 17, price: 12000, rarity: 'uncommon' },
    { id: 'bm_intel_13', name: 'Shipping Manifests', icon: '📋', description: 'Cargo schedules', intel: 15, price: 10500, rarity: 'uncommon' },
    { id: 'bm_intel_14', name: 'Undercover Report', icon: '🕵️', description: 'Inside information', intel: 18, price: 13000, rarity: 'uncommon' },
    { id: 'bm_intel_15', name: 'GPS Tracking Data', icon: '🛰️', description: 'Target locations', intel: 16, price: 11500, rarity: 'uncommon' },
    { id: 'bm_intel_16', name: 'Blueprints Package', icon: '📐', description: 'Building schematics', intel: 17, price: 12500, rarity: 'uncommon' },
    { id: 'bm_intel_17', name: 'Safe Combinations', icon: '🔐', description: 'Easy money', intel: 19, price: 14000, rarity: 'uncommon' },
    { id: 'bm_intel_18', name: 'Patrol Routes', icon: '🚔', description: 'Security schedules', intel: 15, price: 10800, rarity: 'uncommon' },

    // Rare intel (8)
    { id: 'bm_intel_19', name: 'FBI Files', icon: '📁', description: 'Federal investigation data', intel: 30, price: 25000, rarity: 'rare' },
    { id: 'bm_intel_20', name: 'Blackmail Material', icon: '📸', description: 'Leverage on officials', intel: 32, price: 28000, rarity: 'rare' },
    { id: 'bm_intel_21', name: 'Cartel Ledger', icon: '📖', description: 'Drug trade routes', intel: 28, price: 23000, rarity: 'rare' },
    { id: 'bm_intel_22', name: 'Swiss Bank Account Info', icon: '🏦', description: 'Hidden fortunes', intel: 35, price: 30000, rarity: 'rare' },
    { id: 'bm_intel_23', name: 'Mafia Family Tree', icon: '👥', description: 'Complete hierarchy', intel: 29, price: 24000, rarity: 'rare' },
    { id: 'bm_intel_24', name: 'Arms Deal Contract', icon: '📜', description: 'Weapon shipment details', intel: 31, price: 27000, rarity: 'rare' },
    { id: 'bm_intel_25', name: 'Satellite Imagery', icon: '🛰️', description: 'Complete surveillance', intel: 33, price: 29000, rarity: 'rare' },
    { id: 'bm_intel_26', name: 'Political Corruption Files', icon: '🏛️', description: 'City hall secrets', intel: 34, price: 31000, rarity: 'rare' },

    // Legendary intel (4)
    { id: 'bm_intel_27', name: 'Witness Protection List', icon: '🗂️', description: 'High-value targets', intel: 50, price: 50000, rarity: 'legendary' },
    { id: 'bm_intel_28', name: 'CIA Black Ops File', icon: '🎖️', description: 'Classified operations', intel: 55, price: 60000, rarity: 'legendary' },
    { id: 'bm_intel_29', name: 'Diamond Heist Plans', icon: '💎', description: 'Perfect score blueprint', intel: 60, price: 70000, rarity: 'legendary' },
    { id: 'bm_intel_30', name: 'Presidential Security Detail', icon: '🛡️', description: 'Ultimate access', intel: 70, price: 90000, rarity: 'legendary' }
  ],

  buffs: [
    // Common buffs (8)
    { id: 'bm_buff_1', name: 'Coffee Shot', icon: '☕', description: '+20 energy for 30min', duration: 1800000, effect: 'energy', value: 20, price: 2000, rarity: 'common' },
    { id: 'bm_buff_2', name: 'Energy Drink', icon: '🥤', description: '+30 energy for 1hr', duration: 3600000, effect: 'energy', value: 30, price: 3000, rarity: 'common' },
    { id: 'bm_buff_3', name: 'Rabbit Foot', icon: '🐰', description: '+5% success for 30min', duration: 1800000, effect: 'success', value: 0.05, price: 2500, rarity: 'common' },
    { id: 'bm_buff_4', name: 'Four Leaf Clover', icon: '🍀', description: '+8% success for 1hr', duration: 3600000, effect: 'success', value: 0.08, price: 4000, rarity: 'common' },
    { id: 'bm_buff_5', name: 'Cocaine Bump', icon: '❄️', description: '+15% XP for 30min', duration: 1800000, effect: 'xp', value: 0.15, price: 3500, rarity: 'common' },
    { id: 'bm_buff_6', name: 'Street Smarts', icon: '🎓', description: '+20% XP for 45min', duration: 2700000, effect: 'xp', value: 0.20, price: 4500, rarity: 'common' },
    { id: 'bm_buff_7', name: 'Negotiation Skills', icon: '💬', description: '+10% money for 30min', duration: 1800000, effect: 'money', value: 0.10, price: 3200, rarity: 'common' },
    { id: 'bm_buff_8', name: 'Smooth Talker', icon: '🗣️', description: '+15% money for 45min', duration: 2700000, effect: 'money', value: 0.15, price: 4200, rarity: 'common' },

    // Uncommon buffs (12)
    { id: 'bm_buff_9', name: 'Adrenaline Shot', icon: '💉', description: '+50 max energy for 2hrs', duration: 7200000, effect: 'energy', value: 50, price: 8000, rarity: 'uncommon' },
    { id: 'bm_buff_10', name: 'Lucky Charm', icon: '🍀', description: '+15% success for 1hr', duration: 3600000, effect: 'success', value: 0.15, price: 9000, rarity: 'uncommon' },
    { id: 'bm_buff_11', name: 'Horseshoe', icon: '🧲', description: '+18% success for 90min', duration: 5400000, effect: 'success', value: 0.18, price: 10000, rarity: 'uncommon' },
    { id: 'bm_buff_12', name: 'Focus Pills', icon: '💊', description: '+60 energy for 2hrs', duration: 7200000, effect: 'energy', value: 60, price: 9500, rarity: 'uncommon' },
    { id: 'bm_buff_13', name: 'Speed Paste', icon: '⚡', description: '+5 combat for 1hr', duration: 3600000, effect: 'combat', value: 5, price: 8500, rarity: 'uncommon' },
    { id: 'bm_buff_14', name: 'Steroids', icon: '💪', description: '+8 combat for 90min', duration: 5400000, effect: 'combat', value: 8, price: 11000, rarity: 'uncommon' },
    { id: 'bm_buff_15', name: 'Intimidation Cologne', icon: '🧴', description: '+20% respect gain for 1hr', duration: 3600000, effect: 'respect', value: 0.20, price: 9200, rarity: 'uncommon' },
    { id: 'bm_buff_16', name: 'Silver Tongue', icon: '🪙', description: '+22% money for 1hr', duration: 3600000, effect: 'money', value: 0.22, price: 10500, rarity: 'uncommon' },
    { id: 'bm_buff_17', name: 'Brain Boost', icon: '🧠', description: '+35% XP for 1hr', duration: 3600000, effect: 'xp', value: 0.35, price: 9800, rarity: 'uncommon' },
    { id: 'bm_buff_18', name: 'Invisibility Cloak', icon: '👻', description: '+10 stealth for 1hr', duration: 3600000, effect: 'stealth', value: 10, price: 10200, rarity: 'uncommon' },
    { id: 'bm_buff_19', name: 'Heat Shield', icon: '🛡️', description: 'Freeze heat decay for 2hrs', duration: 7200000, effect: 'heat_immune', value: 1, price: 11500, rarity: 'uncommon' },
    { id: 'bm_buff_20', name: 'Double Down', icon: '🎲', description: '+12% success for 2hrs', duration: 7200000, effect: 'success', value: 0.12, price: 9600, rarity: 'uncommon' },

    // Rare buffs (10)
    { id: 'bm_buff_21', name: 'Golden Touch', icon: '✨', description: '+35% money for 2hrs', duration: 7200000, effect: 'money', value: 0.35, price: 18000, rarity: 'rare' },
    { id: 'bm_buff_22', name: 'Street Wisdom', icon: '📚', description: '+60% XP for 2hrs', duration: 7200000, effect: 'xp', value: 0.60, price: 17000, rarity: 'rare' },
    { id: 'bm_buff_23', name: 'Combat Stims', icon: '⚡', description: '+15 combat for 2hrs', duration: 7200000, effect: 'combat', value: 15, price: 20000, rarity: 'rare' },
    { id: 'bm_buff_24', name: 'God Mode', icon: '😇', description: '+25% success for 2hrs', duration: 7200000, effect: 'success', value: 0.25, price: 19000, rarity: 'rare' },
    { id: 'bm_buff_25', name: 'Super Soldier Serum', icon: '💉', description: '+20 combat for 3hrs', duration: 10800000, effect: 'combat', value: 20, price: 25000, rarity: 'rare' },
    { id: 'bm_buff_26', name: 'Midas Package', icon: '👑', description: '+50% money for 2hrs', duration: 7200000, effect: 'money', value: 0.50, price: 24000, rarity: 'rare' },
    { id: 'bm_buff_27', name: 'Genius Pills', icon: '🧠', description: '+80% XP for 2hrs', duration: 7200000, effect: 'xp', value: 0.80, price: 22000, rarity: 'rare' },
    { id: 'bm_buff_28', name: 'Shadow Cloak', icon: '🌑', description: '+20 stealth for 2hrs', duration: 7200000, effect: 'stealth', value: 20, price: 21000, rarity: 'rare' },
    { id: 'bm_buff_29', name: 'Mega Energy Pack', icon: '🔋', description: '+100 max energy for 3hrs', duration: 10800000, effect: 'energy', value: 100, price: 23000, rarity: 'rare' },
    { id: 'bm_buff_30', name: 'Untouchable', icon: '🛡️', description: 'Immune to heat for 3hrs', duration: 10800000, effect: 'heat_immune', value: 1, price: 26000, rarity: 'rare' },

    // Legendary buffs (5)
    { id: 'bm_buff_31', name: 'King Midas', icon: '👑', description: '+100% money for 3hrs', duration: 10800000, effect: 'money', value: 1.0, price: 50000, rarity: 'legendary' },
    { id: 'bm_buff_32', name: 'Einstein Formula', icon: '🔬', description: '+150% XP for 3hrs', duration: 10800000, effect: 'xp', value: 1.5, price: 45000, rarity: 'legendary' },
    { id: 'bm_buff_33', name: 'Invincibility', icon: '⭐', description: '+50% success for 3hrs', duration: 10800000, effect: 'success', value: 0.50, price: 48000, rarity: 'legendary' },
    { id: 'bm_buff_34', name: 'Titan Serum', icon: '💪', description: '+40 combat for 4hrs', duration: 14400000, effect: 'combat', value: 40, price: 55000, rarity: 'legendary' },
    { id: 'bm_buff_35', name: 'Godmode Package', icon: '😇', description: 'All stats +25% for 4hrs', duration: 14400000, effect: 'all', value: 0.25, price: 75000, rarity: 'legendary' }
  ],

  crew: [
    // Rare crew (15)
    { id: 'bm_crew_1', name: 'The Hitman', icon: '🎯', combat: 18, stealth: 12, price: 35000, rarity: 'rare', type: 'violent', salary: 800, description: 'Professional killer' },
    { id: 'bm_crew_2', name: 'Elite Hacker', icon: '💻', financial: 15, stealth: 10, price: 30000, rarity: 'rare', type: 'financial', salary: 700, description: 'Digital ghost' },
    { id: 'bm_crew_3', name: 'Ace Driver', icon: '🏎️', transport: 20, stealth: 8, price: 28000, rarity: 'rare', type: 'transport', salary: 600, description: 'Fastest wheels' },
    { id: 'bm_crew_4', name: 'Demolitions Expert', icon: '💣', combat: 16, stealth: 6, price: 32000, rarity: 'rare', type: 'violent', salary: 750, description: 'Explosive specialist' },
    { id: 'bm_crew_5', name: 'Master Thief', icon: '🥷', stealth: 22, financial: 8, price: 38000, rarity: 'rare', type: 'stealth', salary: 850, description: 'Phantom burglar' },
    { id: 'bm_crew_6', name: 'Con Artist', icon: '🎭', financial: 18, political: 10, price: 34000, rarity: 'rare', type: 'financial', salary: 720, description: 'Master manipulator' },
    { id: 'bm_crew_7', name: 'Ex-Special Forces', icon: '🪖', combat: 20, transport: 8, price: 40000, rarity: 'rare', type: 'violent', salary: 900, description: 'Military precision' },
    { id: 'bm_crew_8', name: 'Street Racer', icon: '🏁', transport: 24, stealth: 5, price: 36000, rarity: 'rare', type: 'transport', salary: 780, description: 'Speed demon' },
    { id: 'bm_crew_9', name: 'Forger', icon: '📝', financial: 20, stealth: 12, price: 37000, rarity: 'rare', type: 'financial', salary: 820, description: 'Document artist' },
    { id: 'bm_crew_10', name: 'Dirty Cop', icon: '👮', political: 15, combat: 12, price: 39000, rarity: 'rare', type: 'political', salary: 880, description: 'Inside man' },
    { id: 'bm_crew_11', name: 'Sniper', icon: '🎯', combat: 22, stealth: 14, price: 42000, rarity: 'rare', type: 'violent', salary: 950, description: 'Long range specialist' },
    { id: 'bm_crew_12', name: 'Safecracker', icon: '🔓', stealth: 18, financial: 14, price: 35000, rarity: 'rare', type: 'stealth', salary: 790, description: 'Master locksmith' },
    { id: 'bm_crew_13', name: 'Smuggler', icon: '📦', transport: 18, political: 10, price: 33000, rarity: 'rare', type: 'transport', salary: 740, description: 'Border expert' },
    { id: 'bm_crew_14', name: 'Spy', icon: '🕵️', stealth: 20, political: 12, price: 41000, rarity: 'rare', type: 'stealth', salary: 920, description: 'Intelligence operative' },
    { id: 'bm_crew_15', name: 'Muscle', icon: '💪', combat: 19, price: 31000, rarity: 'rare', type: 'violent', salary: 710, description: 'Pure intimidation' },

    // Legendary crew (10)
    { id: 'bm_crew_16', name: 'The Enforcer', icon: '💪', combat: 28, price: 60000, rarity: 'legendary', type: 'violent', salary: 1400, description: 'Walking arsenal' },
    { id: 'bm_crew_17', name: 'Corrupt Senator', icon: '🏛️', political: 25, financial: 15, price: 70000, rarity: 'legendary', type: 'political', salary: 1600, description: 'Ultimate connection' },
    { id: 'bm_crew_18', name: 'Ghost', icon: '👻', stealth: 30, combat: 15, price: 65000, rarity: 'legendary', type: 'stealth', salary: 1500, description: 'Invisible assassin' },
    { id: 'bm_crew_19', name: 'Crime Lord', icon: '👑', combat: 22, political: 20, financial: 18, price: 90000, rarity: 'legendary', type: 'political', salary: 2000, description: 'Ultimate boss' },
    { id: 'bm_crew_20', name: 'Master Hacker', icon: '💻', financial: 28, stealth: 18, price: 68000, rarity: 'legendary', type: 'financial', salary: 1550, description: 'Digital god' },
    { id: 'bm_crew_21', name: 'Wheelman Elite', icon: '🏎️', transport: 30, combat: 12, price: 62000, rarity: 'legendary', type: 'transport', salary: 1450, description: 'Unstoppable driver' },
    { id: 'bm_crew_22', name: 'Assassin', icon: '🗡️', combat: 26, stealth: 24, price: 75000, rarity: 'legendary', type: 'violent', salary: 1700, description: 'Death incarnate' },
    { id: 'bm_crew_23', name: 'FBI Mole', icon: '🕵️', political: 28, stealth: 16, price: 80000, rarity: 'legendary', type: 'political', salary: 1800, description: 'Federal insider' },
    { id: 'bm_crew_24', name: 'Drug Chemist', icon: '🧪', financial: 24, combat: 8, price: 66000, rarity: 'legendary', type: 'financial', salary: 1520, description: 'Walter White' },
    { id: 'bm_crew_25', name: 'The Phantom', icon: '🌑', stealth: 32, political: 12, price: 72000, rarity: 'legendary', type: 'stealth', salary: 1650, description: 'Legend of shadows' }
  ],

  bribes: [
    // Common bribes (6)
    { id: 'bm_bribe_1', name: 'Bribe Beat Cop', icon: '👮', description: 'Clear -15 heat', effect: 'heat', value: -15, price: 3000, rarity: 'common' },
    { id: 'bm_bribe_2', name: 'Pay Off Witness', icon: '👁️', description: 'Clear -12 heat', effect: 'heat', value: -12, price: 2500, rarity: 'common' },
    { id: 'bm_bribe_3', name: 'Silence Snitch', icon: '🤐', description: 'Clear -18 heat', effect: 'heat', value: -18, price: 3500, rarity: 'common' },
    { id: 'bm_bribe_4', name: 'Destroy Evidence', icon: '🔥', description: 'Clear -20 heat', effect: 'heat', value: -20, price: 4000, rarity: 'common' },
    { id: 'bm_bribe_5', name: 'Fake Alibi', icon: '📋', description: 'Clear -16 heat', effect: 'heat', value: -16, price: 3200, rarity: 'common' },
    { id: 'bm_bribe_6', name: 'Frame Someone Else', icon: '🎭', description: 'Clear -22 heat', effect: 'heat', value: -22, price: 4500, rarity: 'common' },

    // Uncommon bribes (8)
    { id: 'bm_bribe_7', name: 'Bribe Detective', icon: '🕵️', description: 'Clear -35 heat', effect: 'heat', value: -35, price: 9000, rarity: 'uncommon' },
    { id: 'bm_bribe_8', name: 'Lose Police Files', icon: '📁', description: 'Clear -30 heat', effect: 'heat', value: -30, price: 8000, rarity: 'uncommon' },
    { id: 'bm_bribe_9', name: 'Hack Police Database', icon: '💻', description: 'Clear -40 heat', effect: 'heat', value: -40, price: 10000, rarity: 'uncommon' },
    { id: 'bm_bribe_10', name: 'Buy Journalist', icon: '📰', description: 'Clear -32 heat', effect: 'heat', value: -32, price: 8500, rarity: 'uncommon' },
    { id: 'bm_bribe_11', name: 'Intimidate DA', icon: '⚖️', description: 'Clear -38 heat', effect: 'heat', value: -38, price: 9500, rarity: 'uncommon' },
    { id: 'bm_bribe_12', name: 'Plant False Info', icon: '📝', description: 'Clear -34 heat', effect: 'heat', value: -34, price: 8800, rarity: 'uncommon' },
    { id: 'bm_bribe_13', name: 'Bribe Forensics', icon: '🔬', description: 'Clear -36 heat', effect: 'heat', value: -36, price: 9200, rarity: 'uncommon' },
    { id: 'bm_bribe_14', name: 'Compromise Prosecutor', icon: '👨‍⚖️', description: 'Clear -42 heat', effect: 'heat', value: -42, price: 10500, rarity: 'uncommon' },

    // Rare bribes (6)
    { id: 'bm_bribe_15', name: 'Bribe Judge', icon: '⚖️', description: 'Clear -60 heat', effect: 'heat', value: -60, price: 20000, rarity: 'rare' },
    { id: 'bm_bribe_16', name: 'Buy Police Chief', icon: '👮', description: 'Clear -55 heat', effect: 'heat', value: -55, price: 18000, rarity: 'rare' },
    { id: 'bm_bribe_17', name: 'Frame Rival Gang', icon: '🎯', description: 'Clear -65 heat', effect: 'heat', value: -65, price: 22000, rarity: 'rare' },
    { id: 'bm_bribe_18', name: 'Fake Death Certificate', icon: '💀', description: 'Clear -58 heat', effect: 'heat', value: -58, price: 19000, rarity: 'rare' },
    { id: 'bm_bribe_19', name: 'Destroy Crime Lab', icon: '💣', description: 'Clear -70 heat', effect: 'heat', value: -70, price: 25000, rarity: 'rare' },
    { id: 'bm_bribe_20', name: 'Blackmail Commissioner', icon: '📸', description: 'Clear -62 heat', effect: 'heat', value: -62, price: 21000, rarity: 'rare' },

    // Legendary bribes (5)
    { id: 'bm_bribe_21', name: 'Bribe FBI Director', icon: '🏛️', description: 'Clear ALL heat', effect: 'heat', value: -999, price: 60000, rarity: 'legendary' },
    { id: 'bm_bribe_22', name: 'Bribe Governor', icon: '🎖️', description: 'Clear -90 heat', effect: 'heat', value: -90, price: 45000, rarity: 'legendary' },
    { id: 'bm_bribe_23', name: 'Witness Protection Bypass', icon: '🛡️', description: 'Clear -85 heat', effect: 'heat', value: -85, price: 42000, rarity: 'legendary' },
    { id: 'bm_bribe_24', name: 'Federal Pardon', icon: '📜', description: 'Clear ALL heat + immunity for 1hr', effect: 'heat_clear', value: -999, price: 80000, rarity: 'legendary' },
    { id: 'bm_bribe_25', name: 'New Identity Package', icon: '🎭', description: 'Clear ALL heat forever', effect: 'heat', value: -999, price: 100000, rarity: 'legendary' }
  ],

  operations: [
    // Uncommon operations (8)
    { id: 'bm_op_1', name: 'Warehouse Raid', icon: '📦', description: 'Steal cargo: $50k-$90k', minPayout: 50000, maxPayout: 90000, energy: 30, price: 15000, rarity: 'uncommon', successRate: 0.75 },
    { id: 'bm_op_2', name: 'Casino Skim', icon: '🎰', description: 'Inside job: $60k-$100k', minPayout: 60000, maxPayout: 100000, energy: 35, price: 18000, rarity: 'uncommon', successRate: 0.72 },
    { id: 'bm_op_3', name: 'VIP Extraction', icon: '🎭', description: 'Ransom play: $70k-$120k', minPayout: 70000, maxPayout: 120000, energy: 38, price: 20000, rarity: 'uncommon', successRate: 0.70 },
    { id: 'bm_op_4', name: 'Jewelry Store Hit', icon: '💍', description: 'Smash and grab: $55k-$95k', minPayout: 55000, maxPayout: 95000, energy: 32, price: 16000, rarity: 'uncommon', successRate: 0.73 },
    { id: 'bm_op_5', name: 'Drug Lab Takeover', icon: '🧪', description: 'Seize operation: $65k-$110k', minPayout: 65000, maxPayout: 110000, energy: 36, price: 19000, rarity: 'uncommon', successRate: 0.68 },
    { id: 'bm_op_6', name: 'Political Blackmail', icon: '📸', description: 'Extortion: $75k-$125k', minPayout: 75000, maxPayout: 125000, energy: 34, price: 21000, rarity: 'uncommon', successRate: 0.71 },
    { id: 'bm_op_7', name: 'Armored Car Heist', icon: '🚛', description: 'Highway robbery: $80k-$140k', minPayout: 80000, maxPayout: 140000, energy: 40, price: 23000, rarity: 'uncommon', successRate: 0.69 },
    { id: 'bm_op_8', name: 'Corporate Espionage', icon: '💼', description: 'Steal secrets: $68k-$115k', minPayout: 68000, maxPayout: 115000, energy: 33, price: 17500, rarity: 'uncommon', successRate: 0.74 },

    // Rare operations (10)
    { id: 'bm_op_9', name: 'Bank Heist Blueprint', icon: '🏦', description: 'Vault job: $120k-$220k', minPayout: 120000, maxPayout: 220000, energy: 50, price: 35000, rarity: 'rare', successRate: 0.65 },
    { id: 'bm_op_10', name: 'Art Gallery Theft', icon: '🖼️', description: 'Masterpiece steal: $130k-$200k', minPayout: 130000, maxPayout: 200000, energy: 45, price: 32000, rarity: 'rare', successRate: 0.63 },
    { id: 'bm_op_11', name: 'Crypto Exchange Hack', icon: '💎', description: 'Digital heist: $150k-$280k', minPayout: 150000, maxPayout: 280000, energy: 55, price: 40000, rarity: 'rare', successRate: 0.60 },
    { id: 'bm_op_12', name: 'Diamond District Score', icon: '💎', description: 'Gem heist: $140k-$240k', minPayout: 140000, maxPayout: 240000, energy: 48, price: 36000, rarity: 'rare', successRate: 0.64 },
    { id: 'bm_op_13', name: 'Cartel Ambush', icon: '🔫', description: 'Drug money: $135k-$230k', minPayout: 135000, maxPayout: 230000, energy: 52, price: 38000, rarity: 'rare', successRate: 0.62 },
    { id: 'bm_op_14', name: 'Port Hijacking', icon: '🚢', description: 'Shipping containers: $125k-$210k', minPayout: 125000, maxPayout: 210000, energy: 46, price: 33000, rarity: 'rare', successRate: 0.66 },
    { id: 'bm_op_15', name: 'Airport Gold Heist', icon: '✈️', description: 'Gold shipment: $145k-$250k', minPayout: 145000, maxPayout: 250000, energy: 51, price: 37000, rarity: 'rare', successRate: 0.61 },
    { id: 'bm_op_16', name: 'Casino Vault Job', icon: '🎰', description: 'Underground vault: $138k-$235k', minPayout: 138000, maxPayout: 235000, energy: 49, price: 34500, rarity: 'rare', successRate: 0.63 },
    { id: 'bm_op_17', name: 'Military Base Raid', icon: '🪖', description: 'Weapons steal: $142k-$245k', minPayout: 142000, maxPayout: 245000, energy: 53, price: 39000, rarity: 'rare', successRate: 0.59 },
    { id: 'bm_op_18', name: 'Pharmaceutical Heist', icon: '💊', description: 'Drug supplies: $128k-$215k', minPayout: 128000, maxPayout: 215000, energy: 47, price: 31500, rarity: 'rare', successRate: 0.65 },

    // Legendary operations (7)
    { id: 'bm_op_19', name: 'Federal Reserve Job', icon: '🏛️', description: 'Ultimate heist: $300k-$500k', minPayout: 300000, maxPayout: 500000, energy: 70, price: 80000, rarity: 'legendary', successRate: 0.50 },
    { id: 'bm_op_20', name: 'Nuclear Material Theft', icon: '☢️', description: 'Black market sale: $280k-$480k', minPayout: 280000, maxPayout: 480000, energy: 68, price: 75000, rarity: 'legendary', successRate: 0.52 },
    { id: 'bm_op_21', name: 'Celebrity Ransom', icon: '⭐', description: 'A-list target: $260k-$450k', minPayout: 260000, maxPayout: 450000, energy: 65, price: 70000, rarity: 'legendary', successRate: 0.54 },
    { id: 'bm_op_22', name: 'Museum Grand Theft', icon: '🏛️', description: 'Priceless artifacts: $290k-$490k', minPayout: 290000, maxPayout: 490000, energy: 72, price: 78000, rarity: 'legendary', successRate: 0.51 },
    { id: 'bm_op_23', name: 'Satellite Hack', icon: '🛰️', description: 'Ransom governments: $320k-$520k', minPayout: 320000, maxPayout: 520000, energy: 75, price: 85000, rarity: 'legendary', successRate: 0.48 },
    { id: 'bm_op_24', name: 'Billionaire Kidnapping', icon: '💼', description: 'Mega ransom: $350k-$550k', minPayout: 350000, maxPayout: 550000, energy: 78, price: 90000, rarity: 'legendary', successRate: 0.47 },
    { id: 'bm_op_25', name: 'Pentagon Data Breach', icon: '🎖️', description: 'Sell secrets: $400k-$600k', minPayout: 400000, maxPayout: 600000, energy: 80, price: 100000, rarity: 'legendary', successRate: 0.45 }
  ]
};

// Generate random items for the shop - MASSIVE INVENTORY PER REFRESH
function refreshBlackMarket() {
  const now = Date.now();

  // Check if refresh needed (1 hour cooldown)
  if (now - gameState.blackMarket.lastRefresh < gameState.blackMarket.refreshInterval) {
    return; // Not time yet
  }

  const items = [];

  // Add 2-4 weapons
  const weaponCount = 2 + Math.floor(Math.random() * 3);
  const attempts = weaponCount * 3;
  for (let i = 0; i < attempts && items.filter(item => item.category === 'weapon').length < weaponCount; i++) {
    const weapon = blackMarketCatalog.weapons[Math.floor(Math.random() * blackMarketCatalog.weapons.length)];
    if (!items.find(item => item.id === weapon.id)) {
      items.push({ ...weapon, category: 'weapon' });
    }
  }

  // Add 2-3 intel packages
  const intelCount = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < intelCount * 3 && items.filter(item => item.category === 'intel').length < intelCount; i++) {
    const intel = blackMarketCatalog.intel[Math.floor(Math.random() * blackMarketCatalog.intel.length)];
    if (!items.find(item => item.id === intel.id)) {
      items.push({ ...intel, category: 'intel' });
    }
  }

  // Add 3-5 buffs
  const buffCount = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < buffCount * 3 && items.filter(item => item.category === 'buff').length < buffCount; i++) {
    const buff = blackMarketCatalog.buffs[Math.floor(Math.random() * blackMarketCatalog.buffs.length)];
    if (!items.find(item => item.id === buff.id)) {
      items.push({ ...buff, category: 'buff' });
    }
  }

  // Add 1-2 rare crew members
  const crewCount = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < crewCount * 3 && items.filter(item => item.category === 'crew').length < crewCount; i++) {
    const crew = blackMarketCatalog.crew[Math.floor(Math.random() * blackMarketCatalog.crew.length)];
    if (!items.find(item => item.id === crew.id)) {
      items.push({ ...crew, category: 'crew' });
    }
  }

  // Add 2-3 bribes
  const bribeCount = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < bribeCount * 3 && items.filter(item => item.category === 'bribe').length < bribeCount; i++) {
    const bribe = blackMarketCatalog.bribes[Math.floor(Math.random() * blackMarketCatalog.bribes.length)];
    if (!items.find(item => item.id === bribe.id)) {
      items.push({ ...bribe, category: 'bribe' });
    }
  }

  // Operations removed - not part of Black Market anymore

  gameState.blackMarket.currentItems = items;
  gameState.blackMarket.lastRefresh = now;
  addNewsItem(`🎭 Black Market has restocked with ${items.length} items!`, 'info');
  saveGame();
}

// Purchase Black Market item
function purchaseBlackMarketItem(itemId) {
  const item = gameState.blackMarket.currentItems.find(i => i.id === itemId);
  if (!item) {
    addNotification('Item not found!', 'error');
    return;
  }

  if (gameState.player.money < item.price) {
    addNotification(`Not enough money! Need $${item.price.toLocaleString()}`, 'error');
    return;
  }

  gameState.player.money -= item.price;

  switch(item.category) {
    case 'weapon':
      // Add as equipment
      const weaponEquipment = {
        id: `eq_${Date.now()}`,
        name: item.name,
        icon: item.icon,
        description: item.description,
        combat: item.combat || 0,
        stealth: item.stealth || 0,
        price: item.price,
        equipped: false
      };
      gameState.equipment.push(weaponEquipment);
      addNotification(`${item.icon} Purchased ${item.name}!`, 'success');
      addNewsItem(`Acquired ${item.name} from the Black Market`, 'success');
      break;

    case 'intel':
      gameState.player.intel += item.intel;
      addNotification(`${item.icon} Gained ${item.intel} intel!`, 'success');
      addNewsItem(`Purchased intel package: +${item.intel} intel`, 'info');
      break;

    case 'buff':
      // Add active buff
      if (!gameState.activeBuffs) gameState.activeBuffs = [];
      gameState.activeBuffs.push({
        id: item.id,
        name: item.name,
        icon: item.icon,
        effect: item.effect,
        value: item.value,
        expiresAt: Date.now() + item.duration
      });
      addNotification(`${item.icon} ${item.name} activated!`, 'success');
      addNewsItem(`Activated buff: ${item.name}`, 'success');
      break;

    case 'crew':
      // Add crew member
      const crewMember = {
        id: `crew_${Date.now()}`,
        name: item.name,
        icon: item.icon,
        type: item.type,
        combat: item.combat || 0,
        stealth: item.stealth || 0,
        transport: item.transport || 0,
        financial: item.financial || 0,
        political: item.political || 0,
        salary: item.salary,
        description: item.description,
        hired: true
      };
      gameState.crew.push(crewMember);
      addNotification(`${item.icon} ${item.name} joined your crew!`, 'success');
      addNewsItem(`Recruited ${item.name} from the Black Market`, 'crew');
      break;

    case 'bribe':
      const heatReduction = Math.min(gameState.player.heat, Math.abs(item.value));
      gameState.player.heat = Math.max(0, gameState.player.heat + item.value);
      addNotification(`${item.icon} Heat reduced by ${heatReduction}!`, 'success');
      addNewsItem(`Bribed officials, heat reduced by ${heatReduction}`, 'success');
      break;

  }

  // Remove item from shop
  gameState.blackMarket.currentItems = gameState.blackMarket.currentItems.filter(i => i.id !== itemId);
  saveGame();
  render();
}

// Execute operation directly from Black Market
function executeBlackMarketOperation(opId) {
  const op = gameState.blackMarket.currentItems.find(i => i.id === opId && i.category === 'operation');

  if (!op) {
    addNotification('Operation not found!', 'error');
    return;
  }

  if (gameState.player.energy < op.energy) {
    addNotification(`Not enough energy! Need ${op.energy}`, 'error');
    return;
  }

  gameState.player.energy -= op.energy;

  const success = Math.random() < op.successRate;

  if (success) {
    const payout = Math.floor(op.minPayout + Math.random() * (op.maxPayout - op.minPayout));
    gameState.player.money += payout;
    gameState.stats.totalMoneyEarned += payout;
    gameState.stats.jobsCompleted++;

    addNotification(`${op.icon} ${op.name} SUCCESS! +$${payout.toLocaleString()}`, 'success');
    addNewsItem(`Black Market operation "${op.name}" completed: +$${payout.toLocaleString()}`, 'success');
  } else {
    const heatGain = 20 + Math.floor(Math.random() * 30);
    gameState.player.heat = Math.min(100, gameState.player.heat + heatGain);
    gameState.stats.jobsFailed++;

    addNotification(`${op.icon} ${op.name} FAILED! +${heatGain} heat`, 'error');
    addNewsItem(`Black Market operation "${op.name}" failed, heat increased`, 'warning');
  }

  // Remove operation from shop after execution
  gameState.blackMarket.currentItems = gameState.blackMarket.currentItems.filter(i => i.id !== opId);
  saveGame();
  render();
}

// Execute special operation (from purchased inventory)
function executeSpecialOperation(opId) {
  if (!gameState.specialOperations) gameState.specialOperations = [];
  const op = gameState.specialOperations.find(o => o.id === opId);

  if (!op) {
    addNotification('Operation not found!', 'error');
    return;
  }

  if (gameState.player.energy < op.energy) {
    addNotification(`Not enough energy! Need ${op.energy}`, 'error');
    return;
  }

  gameState.player.energy -= op.energy;

  const success = Math.random() < op.successRate;

  if (success) {
    const payout = Math.floor(op.minPayout + Math.random() * (op.maxPayout - op.minPayout));
    gameState.player.money += payout;
    gameState.stats.totalMoneyEarned += payout;

    addNotification(`${op.icon} ${op.name} SUCCESS! +$${payout.toLocaleString()}`, 'success');
    addNewsItem(`Special operation "${op.name}" completed: +$${payout.toLocaleString()}`, 'success');
  } else {
    const heatGain = 15 + Math.floor(Math.random() * 20);
    gameState.player.heat = Math.min(100, gameState.player.heat + heatGain);

    addNotification(`${op.icon} ${op.name} FAILED! +${heatGain} heat`, 'error');
    addNewsItem(`Special operation "${op.name}" failed, heat increased`, 'warning');
  }

  // Remove operation after use
  gameState.specialOperations = gameState.specialOperations.filter(o => o.id !== opId);
  saveGame();
  render();
}

// Render Black Market
function renderBlackMarket() {
  // Auto-refresh if needed
  refreshBlackMarket();

  const now = Date.now();
  const timeUntilRefresh = gameState.blackMarket.lastRefresh + gameState.blackMarket.refreshInterval - now;
  const minutesUntilRefresh = Math.floor(timeUntilRefresh / 60000);

  const rarityColors = {
    common: 'text-gray-400 border-gray-600',
    uncommon: 'text-green-400 border-green-600',
    rare: 'text-blue-400 border-blue-600',
    legendary: 'text-purple-400 border-purple-600'
  };

  let html = `
    <div class="p-6">
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-3xl font-bold text-red-500 mb-2">🎭 BLACK MARKET</h2>
            <p class="text-sm text-gray-400">Exclusive items from the underground network</p>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500 uppercase">Next Refresh</div>
            <div class="text-lg font-bold text-cyan-400">${minutesUntilRefresh}m</div>
          </div>
        </div>

        <div class="bg-yellow-900 border border-yellow-600 p-3 mb-4">
          <p class="text-xs text-yellow-200">⚠️ <strong>LIMITED STOCK:</strong> Items refresh every hour. Once sold, they're gone until next refresh!</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
  `;

  // Display current items
  gameState.blackMarket.currentItems.forEach(item => {
    const rarityClass = rarityColors[item.rarity] || rarityColors.common;
    const canAfford = gameState.player.money >= item.price;

    html += `
      <div class="bg-zinc-900 border-2 ${rarityClass} p-4">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${item.icon}</span>
            <div>
              <div class="font-bold text-sm">${item.name}</div>
              <div class="text-xs ${rarityClass} uppercase">${item.rarity}</div>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-400 mb-3">${item.description}</p>

        ${item.category === 'weapon' ? `
          <div class="text-xs space-y-1 mb-3">
            ${item.stealth ? `<div class="text-blue-400">🥷 Stealth: +${item.stealth}</div>` : ''}
          </div>
        ` : ''}

        ${item.category === 'intel' ? `
          <div class="text-xs mb-3">
            <div class="text-blue-400">🕵️ Intel: +${item.intel}</div>
          </div>
        ` : ''}

        ${item.category === 'buff' ? `
          <div class="text-xs space-y-1 mb-3">
            <div class="text-yellow-400">⏱️ Duration: ${Math.floor(item.duration / 60000)}m</div>
            <div class="text-green-400">✨ Effect: ${item.description.split(':')[1]}</div>
          </div>
        ` : ''}

        ${item.category === 'crew' ? `
          <div class="text-xs space-y-1 mb-3">
            ${item.stealth ? `<div class="text-blue-400">🥷 Stealth: ${item.stealth}</div>` : ''}
            ${item.transport ? `<div class="text-cyan-400">🚗 Transport: ${item.transport}</div>` : ''}
            ${item.financial ? `<div class="text-green-400">💰 Financial: ${item.financial}</div>` : ''}
            ${item.political ? `<div class="text-purple-400">🏛️ Political: ${item.political}</div>` : ''}
            <div class="text-gray-400">💵 Salary: $${item.salary}/day</div>
          </div>
        ` : ''}


        <div class="flex items-center justify-between pt-3 border-t border-zinc-800">
          <div class="text-lg font-bold text-green-400">$${item.price.toLocaleString()}</div>
          <button
            onclick="purchaseBlackMarketItem('${item.id}')"
            ${!canAfford ? 'disabled' : ''}
            class="px-4 py-2 text-xs font-bold uppercase ${canAfford ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'} border ${canAfford ? 'border-red-500' : 'border-zinc-700'}"
          >
            ${canAfford ? 'BUY' : 'TOO EXPENSIVE'}
          </button>
        </div>
      </div>
    `;
  });

  html += `
      </div>
  `;

  // Special Operations section
  if (gameState.specialOperations && gameState.specialOperations.length > 0) {
    html += `
      <div class="mt-8">
        <h3 class="text-2xl font-bold text-purple-500 mb-4">💼 SPECIAL OPERATIONS</h3>
        <p class="text-sm text-gray-400 mb-4">One-time high-stakes jobs. Use them wisely!</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    gameState.specialOperations.forEach(op => {
      const canExecute = gameState.player.energy >= op.energy;

      html += `
        <div class="bg-black border-2 border-purple-600 p-4">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">${op.icon}</span>
            <div class="font-bold">${op.name}</div>
          </div>

          <p class="text-xs text-gray-400 mb-3">${op.description}</p>

          <div class="text-xs space-y-1 mb-3">
            <div class="text-green-400">💰 Potential: $${op.minPayout.toLocaleString()} - $${op.maxPayout.toLocaleString()}</div>
            <div class="text-yellow-400">⚡ Energy: ${op.energy}</div>
            <div class="text-cyan-400">📊 Success Rate: ${Math.floor(op.successRate * 100)}%</div>
          </div>

          <button
            onclick="executeSpecialOperation('${op.id}')"
            ${!canExecute ? 'disabled' : ''}
            class="w-full px-4 py-2 text-sm font-bold uppercase ${canExecute ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'} border ${canExecute ? 'border-purple-500' : 'border-zinc-700'}"
          >
            ${canExecute ? 'EXECUTE' : 'NOT ENOUGH ENERGY'}
          </button>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  }

  html += `
    </div>
  `;

  return html;
}
