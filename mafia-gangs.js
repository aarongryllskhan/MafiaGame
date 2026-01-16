// War Room - Turn-Based Territory Combat System

// Rival Gang Data - Balanced progression (Tier 1: 10-12, Tier 2: 14-16, Tier 3: 18-20, Tier 4: 22-24)
const rivalGangs = [
  {id: 1, name: "The Bratva", boss: "Viktor Sokolov", health: 100, maxHealth: 100, power: 16, tier: 2, color: "red", description: "Russian mob with brutal tactics"},
  {id: 2, name: "Triads", boss: "Chen Wei", health: 100, maxHealth: 100, power: 20, tier: 3, color: "yellow", description: "Ancient Chinese crime syndicate"},
  {id: 3, name: "Los Zetas", boss: "El Diablo", health: 100, maxHealth: 100, power: 24, tier: 4, color: "green", description: "Ruthless cartel enforcers"},
  {id: 4, name: "La Cosa Nostra", boss: "Don Vitelli", health: 100, maxHealth: 100, power: 22, tier: 4, color: "blue", description: "Traditional Italian mafia"},
  {id: 5, name: "Yakuza", boss: "Takeshi Yamamoto", health: 100, maxHealth: 100, power: 20, tier: 3, color: "purple", description: "Japanese organized crime"},
  {id: 6, name: "Street Kings", boss: "Marcus Kane", health: 100, maxHealth: 100, power: 10, tier: 1, color: "orange", description: "Aggressive street gang"},
  {id: 7, name: "Irish Mob", boss: "Patrick O'Sullivan", health: 100, maxHealth: 100, power: 14, tier: 2, color: "emerald", description: "Old-school Irish crime"},
  {id: 8, name: "Balkan Cartel", boss: "Dragan Kovač", health: 100, maxHealth: 100, power: 16, tier: 2, color: "slate", description: "Eastern European smugglers"},
  {id: 9, name: "The Syndicate", boss: "Mr. Black", health: 100, maxHealth: 100, power: 24, tier: 4, color: "zinc", description: "Corporate crime organization"},
  {id: 10, name: "Ghost Crew", boss: "Unknown", health: 100, maxHealth: 100, power: 12, tier: 1, color: "indigo", description: "Elusive thieves and assassins"}
];

// Territory System (unchanged)
const territories = [
  {id: 1, name: "Downtown", income: 500, control: null},
  {id: 2, name: "Docks", income: 400, control: null},
  {id: 3, name: "Industrial District", income: 350, control: null},
  {id: 4, name: "Chinatown", income: 450, control: null},
  {id: 5, name: "Little Italy", income: 500, control: null},
  {id: 6, name: "Financial District", income: 600, control: null},
  {id: 7, name: "Red Light District", income: 550, control: null},
  {id: 8, name: "Warehouse District", income: 400, control: null},
  {id: 9, name: "Casino Strip", income: 700, control: null},
  {id: 10, name: "Harbor", income: 450, control: null},
  {id: 11, name: "Suburbs", income: 300, control: null},
  {id: 12, name: "Airport", income: 550, control: null},
  {id: 13, name: "Business Park", income: 500, control: null},
  {id: 14, name: "Shopping District", income: 450, control: null},
  {id: 15, name: "Old Town", income: 400, control: null},
  {id: 16, name: "Tech Quarter", income: 600, control: null},
  {id: 17, name: "Entertainment District", income: 650, control: null},
  {id: 18, name: "Railyard", income: 350, control: null},
  {id: 19, name: "Beach Front", income: 700, control: null},
  {id: 20, name: "Penthouse Row", income: 800, control: null}
];

// Initialize gang warfare state
if (!gameState.gangWarfare) {
  const initializedTerritories = JSON.parse(JSON.stringify(territories));

  // Distribute territories among gangs
  const gangTerritoryMap = {
    1: [2, 8],          // Bratva
    2: [4, 13],         // Triads
    3: [10, 12, 18],    // Los Zetas
    4: [5, 9],          // La Cosa Nostra
    5: [14, 16],        // Yakuza
    6: [11],            // Street Kings
    7: [15],            // Irish Mob
    8: [3],             // Balkan Cartel
    9: [1, 6, 17, 19, 20], // The Syndicate
    10: []              // Ghost Crew (no territories)
  };

  Object.keys(gangTerritoryMap).forEach(gangId => {
    gangTerritoryMap[gangId].forEach(territoryId => {
      const territory = initializedTerritories.find(t => t.id === territoryId);
      if (territory) territory.control = parseInt(gangId);
    });
  });

  gameState.gangWarfare = {
    rivalGangs: JSON.parse(JSON.stringify(rivalGangs)),
    territories: initializedTerritories,
    activeBattle: null, // Current turn-based battle
    territoriesWon: 0
  };
}

// Initialize crew combat stats
function initializeCrewCombatStats() {
  gameState.crew.forEach(member => {
    if (!member.combat) {
      member.combat = {
        power: 10 + (member.bonus.successRate || 0) * 1000,
        health: 100,
        maxHealth: 100
      };
    }
  });
}

// Select territory from map
function selectTerritory(territoryId) {
  const territory = gameState.gangWarfare.territories.find(t => t.id === territoryId);
  if (!territory) return;

  // Store selected territory in game state for display
  gameState.gangWarfare.selectedTerritory = territoryId;
  render();
}

// Start battle for a territory
function startBattle(territoryId) {
  const territory = gameState.gangWarfare.territories.find(t => t.id === territoryId);
  if (!territory) {
    addNotification('Territory not found!', 'error');
    return;
  }

  // Check if territory is available
  if (territory.control === 'player') {
    addNotification('You already control this territory!', 'warning');
    return;
  }

  // Check if unclaimed or owned by gang
  const defendingGang = territory.control ? gameState.gangWarfare.rivalGangs.find(g => g.id === territory.control) : null;

  // Check requirements
  if (gameState.player.energy < 50) {
    addNotification('Need 50 energy to start a battle!', 'error');
    return;
  }

  const availableCrew = gameState.crew.filter(c => !c.onJob && c.combat.health > 0);
  if (availableCrew.length < 3) {
    addNotification('Need at least 3 healthy crew members for battle!', 'error');
    return;
  }

  // Deduct energy
  gameState.player.energy -= 50;

  // Select 3 strongest crew
  initializeCrewCombatStats();
  const sortedCrew = availableCrew.sort((a, b) => (b.combat?.power || 0) - (a.combat?.power || 0));
  const battleCrew = sortedCrew.slice(0, 3);

  // Create battle state
  gameState.gangWarfare.activeBattle = {
    territoryId: territory.id,
    territoryName: territory.name,
    territoryIncome: territory.income,
    defendingGangId: territory.control,
    defendingGangName: defendingGang ? defendingGang.name : "Unclaimed Thugs",
    playerCrew: battleCrew.map(c => ({
      id: c.id,
      name: c.name,
      health: c.combat.health,
      maxHealth: c.combat.maxHealth,
      power: c.combat.power
    })),
    enemyUnits: defendingGang ? [
      {name: `${defendingGang.name} Enforcer`, health: 80, maxHealth: 80, power: defendingGang.power},
      {name: `${defendingGang.name} Lieutenant`, health: 100, maxHealth: 100, power: defendingGang.power + 5},
      {name: defendingGang.boss, health: 120, maxHealth: 120, power: defendingGang.power + 10}
    ] : [
      {name: "Street Thug", health: 60, maxHealth: 60, power: 8},
      {name: "Gang Leader", health: 80, maxHealth: 80, power: 12},
      {name: "Territory Boss", health: 100, maxHealth: 100, power: 15}
    ],
    turn: 'player',
    round: 1,
    log: [`⚔️ Battle for ${territory.name} has begun!`]
  };

  render();
}

// Combat action: Attack
function battleAttack(attackerIndex) {
  const battle = gameState.gangWarfare.activeBattle;
  if (!battle || battle.turn !== 'player') return;

  const attacker = battle.playerCrew[attackerIndex];
  if (!attacker || attacker.health <= 0) return;

  // Find first alive enemy
  const target = battle.enemyUnits.find(e => e.health > 0);
  if (!target) return;

  // Calculate damage
  const baseDamage = attacker.power;
  const variance = Math.random() * 0.3 - 0.15; // ±15% variance
  const damage = Math.floor(baseDamage * (1 + variance));

  target.health = Math.max(0, target.health - damage);

  battle.log.push(`💥 ${attacker.name} attacks ${target.name} for ${damage} damage!`);

  if (target.health === 0) {
    battle.log.push(`💀 ${target.name} has been defeated!`);
  }

  checkBattleEnd();
  if (gameState.gangWarfare.activeBattle) {
    enemyTurn();
  }
}

// Combat action: Defend (reduce next incoming damage)
function battleDefend(defenderIndex) {
  const battle = gameState.gangWarfare.activeBattle;
  if (!battle || battle.turn !== 'player') return;

  const defender = battle.playerCrew[defenderIndex];
  if (!defender || defender.health <= 0) return;

  defender.defending = true;
  battle.log.push(`🛡️ ${defender.name} takes a defensive stance!`);

  checkBattleEnd();
  if (gameState.gangWarfare.activeBattle) {
    enemyTurn();
  }
}

// Combat action: Special move (costs health, deals massive damage)
function battleSpecial(attackerIndex) {
  const battle = gameState.gangWarfare.activeBattle;
  if (!battle || battle.turn !== 'player') return;

  const attacker = battle.playerCrew[attackerIndex];
  if (!attacker || attacker.health <= 0) return;

  // Special costs 20% health
  const healthCost = Math.floor(attacker.maxHealth * 0.2);
  if (attacker.health <= healthCost) {
    addNotification('Not enough health to use special move!', 'error');
    return;
  }

  attacker.health -= healthCost;

  // Find first alive enemy
  const target = battle.enemyUnits.find(e => e.health > 0);
  if (!target) return;

  // Deal 2.5x damage
  const damage = Math.floor(attacker.power * 2.5);
  target.health = Math.max(0, target.health - damage);

  battle.log.push(`⚡ ${attacker.name} uses SPECIAL ATTACK on ${target.name} for ${damage} damage! (Cost: ${healthCost} HP)`);

  if (target.health === 0) {
    battle.log.push(`💀 ${target.name} has been defeated!`);
  }

  checkBattleEnd();
  if (gameState.gangWarfare.activeBattle) {
    enemyTurn();
  }
}

// Enemy AI turn
function enemyTurn() {
  const battle = gameState.gangWarfare.activeBattle;
  battle.turn = 'enemy';

  setTimeout(() => {
    // Each alive enemy attacks a random alive player unit
    battle.enemyUnits.filter(e => e.health > 0).forEach(enemy => {
      const aliveTargets = battle.playerCrew.filter(c => c.health > 0);
      if (aliveTargets.length === 0) return;

      const target = aliveTargets[Math.floor(Math.random() * aliveTargets.length)];

      // Calculate damage
      let damage = Math.floor(enemy.power * (Math.random() * 0.3 + 0.85)); // 85-115% of power

      // Apply defense reduction
      if (target.defending) {
        damage = Math.floor(damage * 0.5);
        target.defending = false;
        battle.log.push(`🛡️ ${target.name}'s defense reduced damage!`);
      }

      target.health = Math.max(0, target.health - damage);

      battle.log.push(`🔴 ${enemy.name} attacks ${target.name} for ${damage} damage!`);

      if (target.health === 0) {
        battle.log.push(`💀 ${target.name} has been defeated!`);
      }
    });

    // Trim log to last 10 messages
    if (battle.log.length > 10) {
      battle.log = battle.log.slice(-10);
    }

    checkBattleEnd();
    if (gameState.gangWarfare.activeBattle) {
      battle.turn = 'player';
      battle.round++;
      battle.log.push(`\n--- Round ${battle.round} ---`);
      render();
    }
  }, 1500);

  render();
}

// Check if battle is over
function checkBattleEnd() {
  const battle = gameState.gangWarfare.activeBattle;
  if (!battle) return;

  const playerAlive = battle.playerCrew.some(c => c.health > 0);
  const enemyAlive = battle.enemyUnits.some(e => e.health > 0);

  if (!playerAlive) {
    // Player lost
    battle.log.push(`\n💀 DEFEAT! Your crew has been wiped out!`);

    // Apply health damage to actual crew
    battle.playerCrew.forEach(bc => {
      const crew = gameState.crew.find(c => c.id === bc.id);
      if (crew) {
        crew.combat.health = Math.max(0, bc.health);
      }
    });

    setTimeout(() => {
      addNotification(`❌ DEFEAT! Lost battle for ${battle.territoryName}`, 'error');
      addNewsItem(`Lost battle for ${battle.territoryName}. Crew needs recovery.`, 'warning');
      gameState.gangWarfare.activeBattle = null;
      render();
    }, 2000);
  } else if (!enemyAlive) {
    // Player won
    battle.log.push(`\n🏆 VICTORY! ${battle.territoryName} is now yours!`);

    const territory = gameState.gangWarfare.territories.find(t => t.id === battle.territoryId);
    if (territory) {
      territory.control = 'player';
    }

    // Heal crew back to full and apply experience
    battle.playerCrew.forEach(bc => {
      const crew = gameState.crew.find(c => c.id === bc.id);
      if (crew) {
        crew.combat.health = crew.combat.maxHealth; // Full heal on victory
        crew.combat.power += 2; // Gain power from victory
      }
    });

    gameState.gangWarfare.territoriesWon++;
    gameState.player.respect = (gameState.player.respect || 0) + 30;

    setTimeout(() => {
      addNotification(`🏆 VICTORY! Captured ${battle.territoryName}! +$${battle.territoryIncome}/hr income`, 'success');
      addNewsItem(`🏆 ${battle.territoryName} captured! Now earning $${battle.territoryIncome}/hr from this territory`, 'territory');
      gameState.gangWarfare.activeBattle = null;
      render();
    }, 2000);
  }
}

// Retreat from battle
function retreatBattle() {
  const battle = gameState.gangWarfare.activeBattle;

  // Apply current health damage to crew
  battle.playerCrew.forEach(bc => {
    const crew = gameState.crew.find(c => c.id === bc.id);
    if (crew) {
      crew.combat.health = Math.max(0, bc.health);
    }
  });

  addNotification('Retreated from battle. 50 energy lost.', 'warning');
  gameState.gangWarfare.activeBattle = null;
  render();
}

// Get territory income
function getTerritoryIncome() {
  if (!gameState.gangWarfare) return 0;
  return gameState.gangWarfare.territories
    .filter(t => t.control === 'player')
    .reduce((sum, t) => sum + t.income, 0);
}

// Render War Room
function renderWarRoom() {
  initializeCrewCombatStats();

  // If in active battle, render battle screen
  if (gameState.gangWarfare.activeBattle) {
    return renderBattleScreen();
  }

  // Otherwise render territory map
  const playerTerritoryCount = gameState.gangWarfare.territories.filter(t => t.control === 'player').length;
  const territoryIncome = getTerritoryIncome();
  const selectedTerritoryId = gameState.gangWarfare.selectedTerritory || null;
  const selectedTerritory = selectedTerritoryId ? gameState.gangWarfare.territories.find(t => t.id === selectedTerritoryId) : null;

  return `
    <div class="space-y-4 mt-6">
      <!-- War Room Header -->
      <div class="bg-zinc-950 p-4 border-2 border-red-600">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-3xl">⚔️</span>
          <h2 class="text-2xl font-bold text-red-600 uppercase">// WAR ROOM</h2>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-black p-2 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Territories</p>
            <p class="text-lg font-bold text-purple-400">${playerTerritoryCount}/20</p>
          </div>
          <div class="bg-black p-2 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Income</p>
            <p class="text-lg font-bold text-green-400">$${territoryIncome}/hr</p>
          </div>
          <div class="bg-black p-2 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Victories</p>
            <p class="text-lg font-bold text-yellow-400">${gameState.gangWarfare.territoriesWon}</p>
          </div>
        </div>
      </div>

      <!-- Combat System Explanation -->
      <div class="bg-zinc-900 p-4 border border-cyan-700">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xl">ℹ️</span>
          <h3 class="text-md font-bold text-cyan-400 uppercase">HOW COMBAT WORKS</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-yellow-400 font-bold mb-1">⚔️ CREW POWER</p>
            <p class="text-gray-300">Your crew's combat power = Base 10 + (Success Rate × 1000). Higher success rates make stronger fighters. Each victory adds +2 power.</p>
          </div>
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-red-400 font-bold mb-1">🎯 COMBAT ACTIONS</p>
            <p class="text-gray-300"><b>ATTACK:</b> Deal damage equal to your power ±15%. <b>DEFEND:</b> Reduce next incoming damage by 50%. <b>SPECIAL:</b> Deal 2.5× damage but costs 20% of your HP.</p>
          </div>
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-purple-400 font-bold mb-1">🏆 GANG TIERS</p>
            <p class="text-gray-300"><b>Tier 1:</b> Power 10-12 (Easy). <b>Tier 2:</b> 14-16 (Medium). <b>Tier 3:</b> 18-20 (Hard). <b>Tier 4:</b> 22-24 (Very Hard). Each enemy has +5 or +10 bonus power.</p>
          </div>
        </div>
      </div>

      <!-- Map and Info Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Territory Map (2/3 width) -->
        <div class="lg:col-span-2 bg-zinc-900 p-4 border border-zinc-800">
          <h3 class="text-lg font-bold text-purple-500 mb-2 uppercase">🗺️ CITY MAP</h3>
          <p class="text-xs text-gray-400 mb-3">Click territories to select</p>

          <!-- Visual Map Grid -->
          <div class="relative bg-black border-2 border-zinc-700 p-6" style="min-height: 600px;">
            <svg viewBox="0 0 1000 1000" class="w-full h-full">
              <!-- Grid background -->
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#333" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="1000" height="1000" fill="url(#grid)" />

              ${gameState.gangWarfare.territories.map((territory, index) => {
                const gang = territory.control ? gameState.gangWarfare.rivalGangs.find(g => g.id === territory.control) : null;
                const isSelected = selectedTerritoryId === territory.id;
                const fillColor = territory.control === 'player' ? '#22c55e' :
                                 territory.control ? '#ef4444' : '#eab308';
                const strokeColor = territory.control === 'player' ? '#16a34a' :
                                   territory.control ? '#dc2626' : '#ca8a04';

                // Position territories in a 4x5 grid with better spacing
                const row = Math.floor(index / 4);
                const col = index % 4;
                const x = 60 + col * 230 + (row % 2) * 50;
                const y = 60 + row * 180;
                const width = 200;
                const height = 140;

                return `
                  <g onclick="selectTerritory(${territory.id})" style="cursor: pointer;" class="territory-hover">
                    <rect
                      x="${x}" y="${y}"
                      width="${width}" height="${height}"
                      fill="${fillColor}"
                      fill-opacity="${isSelected ? '0.6' : '0.3'}"
                      stroke="${isSelected ? '#ffffff' : strokeColor}"
                      stroke-width="${isSelected ? '4' : '3'}"
                      rx="6"
                    />
                    <text
                      x="${x + width/2}"
                      y="${y + height/2 - 15}"
                      text-anchor="middle"
                      fill="white"
                      font-size="16"
                      font-weight="bold"
                      font-family="monospace"
                    >${territory.name.toUpperCase()}</text>
                    <text
                      x="${x + width/2}"
                      y="${y + height/2 + 15}"
                      text-anchor="middle"
                      fill="#ddd"
                      font-size="14"
                      font-family="monospace"
                    >$${territory.income}/hr</text>
                  </g>
                `;
              }).join('')}
            </svg>
          </div>

          <!-- Map Legend -->
          <div class="flex gap-4 mt-3 text-xs">
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 bg-green-500"></div>
              <span class="text-gray-400">Your Territory</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 bg-red-500"></div>
              <span class="text-gray-400">Enemy</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 bg-yellow-500"></div>
              <span class="text-gray-400">Unclaimed</span>
            </div>
          </div>
        </div>

        <!-- Territory Info Panel (1/3 width) -->
        <div class="lg:col-span-1 space-y-4">
          ${selectedTerritory ? (() => {
            const gang = selectedTerritory.control ? gameState.gangWarfare.rivalGangs.find(g => g.id === selectedTerritory.control) : null;
            const controller = selectedTerritory.control === 'player' ? 'YOU' : gang ? gang.name : 'Unclaimed';
            const controlColor = selectedTerritory.control === 'player' ? 'green' : selectedTerritory.control ? 'red' : 'yellow';
            const canBattle = selectedTerritory.control !== 'player';

            return `
              <div class="bg-zinc-900 p-4 border-2 border-${controlColor}-600">
                <h3 class="text-xl font-bold text-${controlColor}-400 mb-3">${selectedTerritory.name}</h3>

                <div class="space-y-2 mb-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Controller:</span>
                    <span class="text-${controlColor}-300 font-bold">${controller}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Income:</span>
                    <span class="text-green-400 font-bold">$${selectedTerritory.income}/hr</span>
                  </div>
                  ${gang ? `
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-400">Boss:</span>
                      <span class="text-red-300 font-bold">${gang.boss}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-400">Gang Power:</span>
                      <span class="text-orange-400 font-bold">${gang.power}</span>
                    </div>
                  ` : ''}
                </div>

                ${canBattle ? `
                  <button
                    onclick="startBattle(${selectedTerritory.id})"
                    class="w-full py-3 text-sm font-bold uppercase bg-red-700 hover:bg-red-600 text-white border-2 border-red-500 animate-pulse-border"
                  >
                    ⚔️ START BATTLE
                    <div class="text-xs opacity-75 mt-1">Costs 50 energy</div>
                  </button>
                ` : `
                  <div class="py-3 text-sm text-center bg-green-900 text-green-300 border-2 border-green-700">
                    ✓ UNDER YOUR CONTROL
                  </div>
                `}

                ${canBattle && gang ? `
                  <div class="mt-4 p-3 bg-red-950 bg-opacity-30 border border-red-800 text-xs">
                    <p class="text-red-400 font-bold mb-1">⚠️ BATTLE INFO</p>
                    <p class="text-gray-300">You'll face 3 enemy units in turn-based combat. Your 3 strongest crew members will fight.</p>
                  </div>
                ` : ''}
              </div>
            `;
          })() : `
            <div class="bg-zinc-900 p-4 border border-zinc-800 text-center">
              <p class="text-gray-400 text-sm">👆 Click a territory on the map to view details</p>
            </div>
          `}

          <!-- Your Combat Crew -->
          <div class="bg-zinc-900 p-4 border border-cyan-600">
            <h3 class="text-md font-bold text-cyan-400 mb-2 uppercase">⭐ YOUR BATTLE CREW</h3>
            <p class="text-xs text-gray-400 mb-3">Top 3 will deploy</p>
            <div class="space-y-2">
              ${gameState.crew
                .sort((a, b) => (b.combat?.power || 0) - (a.combat?.power || 0))
                .slice(0, 3)
                .map((member, index) => `
                <div class="bg-black p-2 border border-cyan-800">
                  <p class="text-sm font-bold text-cyan-300">${index + 1}. ${member.name}</p>
                  <div class="flex justify-between text-xs mt-1">
                    <span class="text-yellow-400">⚔️ ${Math.floor(member.combat?.power || 10)}</span>
                    <span class="${member.combat?.health === member.combat?.maxHealth ? 'text-green-400' : 'text-red-400'}">❤️ ${member.combat?.health || 100}/${member.combat?.maxHealth || 100}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render active battle screen
function renderBattleScreen() {
  const battle = gameState.gangWarfare.activeBattle;

  return `
    <div class="space-y-4 mt-6">
      <!-- Battle Header -->
      <div class="bg-zinc-950 p-4 border-2 border-red-600">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold text-red-600">⚔️ BATTLE FOR ${battle.territoryName}</h2>
            <p class="text-sm text-gray-400">${battle.defendingGangName} • Round ${battle.round} • ${battle.turn === 'player' ? '🟢 YOUR TURN' : '🔴 ENEMY TURN'}</p>
          </div>
          <button onclick="retreatBattle()" class="px-3 py-1 text-xs font-bold uppercase bg-gray-700 hover:bg-gray-600 text-white border border-gray-500">
            🏃 RETREAT
          </button>
        </div>
      </div>

      <!-- Enemy Units -->
      <div class="bg-zinc-900 p-4 border border-red-800">
        <h3 class="text-md font-bold text-red-400 mb-3">ENEMY FORCES</h3>
        <div class="grid grid-cols-3 gap-3">
          ${battle.enemyUnits.map((enemy, index) => `
            <div class="bg-black p-3 border-2 ${enemy.health > 0 ? 'border-red-700' : 'border-zinc-800 opacity-50'}">
              <p class="text-sm font-bold ${enemy.health > 0 ? 'text-red-400' : 'text-gray-600'}">${enemy.name}</p>
              <div class="mt-2">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-400">HP</span>
                  <span class="${enemy.health > enemy.maxHealth * 0.5 ? 'text-green-400' : 'text-red-400'}">${enemy.health}/${enemy.maxHealth}</span>
                </div>
                <div class="w-full bg-zinc-800 h-2">
                  <div class="bg-red-600 h-2" style="width: ${(enemy.health / enemy.maxHealth) * 100}%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">⚔️ ${enemy.power} Power</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Combat Log -->
      <div class="bg-zinc-900 p-4 border border-zinc-800">
        <h3 class="text-md font-bold text-yellow-400 mb-2">COMBAT LOG</h3>
        <div class="bg-black p-3 text-xs text-gray-300 font-mono h-32 overflow-y-auto">
          ${battle.log.map(msg => `<p>${msg}</p>`).join('')}
        </div>
      </div>

      <!-- Player Crew -->
      <div class="bg-zinc-900 p-4 border border-green-800">
        <h3 class="text-md font-bold text-green-400 mb-3">YOUR CREW</h3>
        <div class="grid grid-cols-3 gap-3">
          ${battle.playerCrew.map((crew, index) => `
            <div class="bg-black p-3 border-2 ${crew.health > 0 ? 'border-green-700' : 'border-zinc-800 opacity-50'}">
              <p class="text-sm font-bold ${crew.health > 0 ? 'text-green-400' : 'text-gray-600'}">${crew.name} ${crew.defending ? '🛡️' : ''}</p>
              <div class="mt-2">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-400">HP</span>
                  <span class="${crew.health > crew.maxHealth * 0.5 ? 'text-green-400' : 'text-red-400'}">${crew.health}/${crew.maxHealth}</span>
                </div>
                <div class="w-full bg-zinc-800 h-2">
                  <div class="bg-green-600 h-2" style="width: ${(crew.health / crew.maxHealth) * 100}%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">⚔️ ${Math.floor(crew.power)} Power</p>
              </div>

              ${battle.turn === 'player' && crew.health > 0 ? `
                <div class="mt-3 space-y-1">
                  <button onclick="battleAttack(${index})" class="w-full px-2 py-1 text-xs font-bold uppercase bg-red-700 hover:bg-red-600 text-white">
                    ⚔️ ATTACK
                  </button>
                  <button onclick="battleDefend(${index})" class="w-full px-2 py-1 text-xs font-bold uppercase bg-blue-700 hover:bg-blue-600 text-white">
                    🛡️ DEFEND
                  </button>
                  <button onclick="battleSpecial(${index})" class="w-full px-2 py-1 text-xs font-bold uppercase bg-purple-700 hover:bg-purple-600 text-white">
                    ⚡ SPECIAL
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Initialize on load
initializeCrewCombatStats();
