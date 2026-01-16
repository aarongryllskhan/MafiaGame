// War Room - Gang Warfare System

// Rival Gang Data
const rivalGangs = [
  {
    id: 1,
    name: "The Bratva",
    boss: "Viktor Sokolov",
    type: "russian",
    strength: 50,
    territory: 3,
    respect: 40,
    specialty: "violent",
    description: "Russian mob with brutal enforcement tactics",
    color: "red",
    relations: 0 // -100 to 100 (hostile to allied)
  },
  {
    id: 2,
    name: "Triads",
    boss: "Chen Wei",
    type: "chinese",
    strength: 60,
    territory: 4,
    respect: 55,
    specialty: "financial",
    description: "Ancient organized crime syndicate",
    color: "yellow",
    relations: 0
  },
  {
    id: 3,
    name: "Los Zetas",
    boss: "Miguel Reyes",
    type: "cartel",
    strength: 70,
    territory: 5,
    respect: 65,
    specialty: "transport",
    description: "Powerful drug cartel with military training",
    color: "green",
    relations: 0
  },
  {
    id: 4,
    name: "La Cosa Nostra",
    boss: "Don Salvatore",
    type: "italian",
    strength: 80,
    territory: 6,
    respect: 75,
    specialty: "political",
    description: "Traditional Italian mafia family",
    color: "purple",
    relations: 0
  },
  {
    id: 5,
    name: "Yakuza",
    boss: "Takeshi Yamamoto",
    type: "japanese",
    strength: 75,
    territory: 5,
    respect: 70,
    specialty: "stealth",
    description: "Honor-bound Japanese crime syndicate",
    color: "blue",
    relations: 0
  },
  {
    id: 6,
    name: "Street Kings",
    boss: "Tyrone Davis",
    type: "street",
    strength: 40,
    territory: 2,
    respect: 30,
    specialty: "violent",
    description: "Aggressive street gang expanding territory",
    color: "orange",
    relations: 0
  },
  {
    id: 7,
    name: "Irish Mob",
    boss: "Patrick O'Sullivan",
    type: "irish",
    strength: 65,
    territory: 4,
    respect: 60,
    specialty: "violent",
    description: "Old-school Irish organized crime",
    color: "emerald",
    relations: 0
  },
  {
    id: 8,
    name: "Balkan Cartel",
    boss: "Dragan Kovač",
    type: "balkan",
    strength: 55,
    territory: 3,
    respect: 50,
    specialty: "transport",
    description: "Ruthless Eastern European smugglers",
    color: "slate",
    relations: 0
  },
  {
    id: 9,
    name: "The Syndicate",
    boss: "Mr. Black",
    type: "corporate",
    strength: 90,
    territory: 7,
    respect: 85,
    specialty: "financial",
    description: "Shadowy corporate crime organization",
    color: "zinc",
    relations: 0
  },
  {
    id: 10,
    name: "Ghost Crew",
    boss: "Unknown",
    type: "mysterious",
    strength: 45,
    territory: 2,
    respect: 40,
    specialty: "stealth",
    description: "Elusive thieves and assassins",
    color: "indigo",
    relations: 0
  }
];

// Territory/Turf System
const territories = [
  {id: 1, name: "Downtown", income: 500, control: null, contested: false},
  {id: 2, name: "Docks", income: 400, control: null, contested: false},
  {id: 3, name: "Industrial District", income: 350, control: null, contested: false},
  {id: 4, name: "Chinatown", income: 450, control: null, contested: false},
  {id: 5, name: "Little Italy", income: 500, control: null, contested: false},
  {id: 6, name: "Financial District", income: 600, control: null, contested: false},
  {id: 7, name: "Red Light District", income: 550, control: null, contested: false},
  {id: 8, name: "Warehouse District", income: 400, control: null, contested: false},
  {id: 9, name: "Casino Strip", income: 700, control: null, contested: false},
  {id: 10, name: "Harbor", income: 450, control: null, contested: false},
  {id: 11, name: "Suburbs", income: 300, control: null, contested: false},
  {id: 12, name: "Airport", income: 550, control: null, contested: false},
  {id: 13, name: "Business Park", income: 500, control: null, contested: false},
  {id: 14, name: "Shopping District", income: 450, control: null, contested: false},
  {id: 15, name: "Old Town", income: 400, control: null, contested: false},
  {id: 16, name: "Tech Quarter", income: 600, control: null, contested: false},
  {id: 17, name: "Entertainment District", income: 650, control: null, contested: false},
  {id: 18, name: "Railyard", income: 350, control: null, contested: false},
  {id: 19, name: "Beach Front", income: 700, control: null, contested: false},
  {id: 20, name: "Penthouse Row", income: 800, control: null, contested: false}
];

// War Operations
const warOperations = [
  {
    id: 1,
    name: "Raid Enemy Safehouse",
    type: "attack",
    energy: 40,
    crewRequired: 3,
    duration: 120000,
    effects: {
      gangStrength: -5,
      playerRespect: 10,
      money: [2000, 4000],
      relations: -10
    },
    requirements: {crewType: ["violent"]},
    successRate: 0.65
  },
  {
    id: 2,
    name: "Sabotage Operations",
    type: "sabotage",
    energy: 30,
    crewRequired: 2,
    duration: 90000,
    effects: {
      gangStrength: -3,
      gangIncome: -100,
      relations: -5
    },
    requirements: {crewType: ["stealth"]},
    successRate: 0.70
  },
  {
    id: 3,
    name: "Assassinate Lieutenant",
    type: "hit",
    energy: 50,
    crewRequired: 1,
    duration: 180000,
    effects: {
      gangStrength: -10,
      playerRespect: 20,
      relations: -20,
      heat: 15
    },
    requirements: {crewType: ["stealth", "violent"]},
    successRate: 0.55
  },
  {
    id: 4,
    name: "Negotiate Alliance",
    type: "diplomacy",
    energy: 20,
    crewRequired: 1,
    duration: 45000,
    effects: {
      relations: 25,
      playerRespect: 5
    },
    requirements: {crewType: ["political"]},
    successRate: 0.60
  },
  {
    id: 5,
    name: "Bribe Enemy Crew",
    type: "sabotage",
    energy: 25,
    money: 5000,
    crewRequired: 1,
    duration: 60000,
    effects: {
      gangStrength: -8,
      relations: -8
    },
    requirements: {crewType: ["financial", "political"]},
    successRate: 0.68
  },
  {
    id: 6,
    name: "Intimidate Rivals",
    type: "attack",
    energy: 30,
    crewRequired: 3,
    duration: 90000,
    effects: {
      gangStrength: -5,
      playerRespect: 15,
      relations: -12
    },
    requirements: {crewType: ["violent"]},
    successRate: 0.70
  },
  {
    id: 7,
    name: "All-Out Assault",
    type: "war",
    energy: 80,
    crewRequired: 8,
    duration: 300000,
    effects: {
      gangStrength: -20,
      playerRespect: 50,
      money: [5000, 10000],
      relations: -30,
      heat: 25
    },
    requirements: {crewType: ["violent", "stealth", "transport"]},
    successRate: 0.45
  }
];

// Initialize gang warfare state
if (!gameState.gangWarfare) {
  const initializedTerritories = JSON.parse(JSON.stringify(territories));

  // Distribute territories among gangs (leave some unclaimed)
  // Give each gang some territories based on their data
  const gangTerritoryMap = {
    1: [2, 8],          // Bratva: Docks, Warehouse District
    2: [4, 13],         // Triads: Chinatown, Business Park
    3: [10, 12, 18],    // Los Zetas: Harbor, Airport, Railyard
    4: [5, 9],          // La Cosa Nostra: Little Italy, Casino Strip
    5: [14, 16],        // Yakuza: Shopping District, Tech Quarter
    6: [11],            // Street Kings: Suburbs
    7: [15],            // Irish Mob: Old Town
    8: [3],             // Balkan Cartel: Industrial District
    9: [1, 6, 17, 19, 20], // The Syndicate: Downtown, Financial District, Entertainment District, Beach Front, Penthouse Row
    10: []              // Ghost Crew: No territories (mysterious)
  };

  Object.keys(gangTerritoryMap).forEach(gangId => {
    gangTerritoryMap[gangId].forEach(territoryId => {
      const territory = initializedTerritories.find(t => t.id === territoryId);
      if (territory) {
        territory.control = parseInt(gangId);
      }
    });
  });

  gameState.gangWarfare = {
    rivalGangs: JSON.parse(JSON.stringify(rivalGangs)),
    territories: initializedTerritories,
    activeWars: [],
    activeOperations: [],
    playerTerritory: 0,
    warVictories: 0,
    territoryCaptured: 0
  };
}

// Add crew combat stats if they don't exist
function initializeCrewCombatStats() {
  gameState.crew.forEach(member => {
    if (!member.combat) {
      member.combat = {
        power: 10 + (member.bonus.successRate || 0) * 1000, // Convert success bonus to power
        health: 100,
        maxHealth: 100,
        kills: 0,
        wins: 0
      };
    }
  });
}

// Declare war on a gang
function declareWar(gangId) {
  const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === gangId);
  if (!gang) return;

  // Check if allied
  if (gameState.gangWarfare.alliances && gameState.gangWarfare.alliances.some(a => a.gangId === gangId)) {
    showMessage(`Cannot declare war on ally ${gang.name}! Break the alliance first.`, 'error');
    return;
  }

  // Check if already at war
  if (gameState.gangWarfare.activeWars.some(w => w.gangId === gangId)) {
    showMessage(`Already at war with ${gang.name}!`, 'error');
    return;
  }

  // Require minimum crew and respect
  if (gameState.crew.length < 3) {
    showMessage('Need at least 3 crew members to declare war!', 'error');
    return;
  }

  if (gameState.player.respect < 50) {
    showMessage('Need at least 50 respect to declare war!', 'error');
    return;
  }

  // Create war
  const war = {
    id: Date.now(),
    gangId: gangId,
    gangName: gang.name,
    startedAt: Date.now(),
    playerVictories: 0,
    gangVictories: 0,
    status: 'active'
  };

  gameState.gangWarfare.activeWars.push(war);
  gang.relations = -50; // Hostile

  showMessage(`🔥 WAR DECLARED: ${gang.name} is now your enemy!`, 'error');
  saveGame();
  render();
}

// Make peace with a gang
function makePeace(gangId) {
  const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === gangId);
  const war = gameState.gangWarfare.activeWars.find(w => w.gangId === gangId);

  if (!war) {
    showMessage('Not at war with this gang!', 'error');
    return;
  }

  // Cost to make peace depends on how badly you're losing
  const peaceCost = Math.max(10000, (war.gangVictories - war.playerVictories) * 5000);

  if (gameState.player.money < peaceCost) {
    showMessage(`Need $${peaceCost.toLocaleString()} to negotiate peace!`, 'error');
    return;
  }

  gameState.player.money -= peaceCost;
  gameState.gangWarfare.activeWars = gameState.gangWarfare.activeWars.filter(w => w.gangId !== gangId);
  gang.relations = 0;

  showMessage(`🤝 Peace negotiated with ${gang.name} for $${peaceCost.toLocaleString()}`, 'success');
  saveGame();
  render();
}

// Form alliance with a gang
function formAlliance(gangId) {
  const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === gangId);

  if (gang.relations < 50) {
    showMessage(`${gang.name} doesn't trust you enough. Need +50 relations (currently ${gang.relations})`, 'error');
    return;
  }

  if (gameState.player.respect < 100) {
    showMessage('Need at least 100 respect to form alliances!', 'error');
    return;
  }

  // Initialize alliance tracking if not exists
  if (!gameState.gangWarfare.alliances) {
    gameState.gangWarfare.alliances = [];
  }

  // Add alliance
  gameState.gangWarfare.alliances.push({
    gangId: gang.id,
    formedAt: Date.now(),
    sharedIncome: true,
    militarySupport: true
  });

  gang.relations = 100; // Max relations

  // Alliance benefits: Share a portion of their territory income with you
  const allyTerritories = gameState.gangWarfare.territories.filter(t => t.control === gang.id);
  const sharedIncome = allyTerritories.reduce((sum, t) => sum + t.income, 0) * 0.15; // 15% of their income

  showMessage(`⚔️ ALLIANCE FORMED: ${gang.name} is now your ally! They'll share ${Math.floor(sharedIncome)}/hr income and provide military support!`, 'success');
  saveGame();
  render();
}

// Break alliance with a gang
function breakAlliance(gangId) {
  const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === gangId);

  if (!gameState.gangWarfare.alliances) {
    gameState.gangWarfare.alliances = [];
  }

  gameState.gangWarfare.alliances = gameState.gangWarfare.alliances.filter(a => a.gangId !== gangId);
  gang.relations = 0; // Reset to neutral
  showMessage(`💔 Alliance broken with ${gang.name}. Relations reset to neutral.`, 'warning');
  saveGame();
  render();
}

// Execute war operation
function executeWarOperation(operationId, targetGangId) {
  const operation = warOperations.find(op => op.id === operationId);
  const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === targetGangId);

  if (!operation || !gang) return;

  // Check if at war (except diplomacy)
  if (operation.type !== 'diplomacy') {
    const atWar = gameState.gangWarfare.activeWars.some(w => w.gangId === targetGangId);
    if (!atWar) {
      showMessage(`Must declare war on ${gang.name} first!`, 'error');
      return;
    }
  }

  // Check requirements
  if (gameState.player.energy < operation.energy) {
    showMessage(`Need ${operation.energy} energy!`, 'error');
    return;
  }

  const availableCrew = gameState.crew.filter(c => !c.onJob);
  if (availableCrew.length < operation.crewRequired) {
    showMessage(`Need ${operation.crewRequired} available crew members!`, 'error');
    return;
  }

  // Check crew types
  if (operation.requirements.crewType) {
    const hasRequired = operation.requirements.crewType.every(reqType =>
      gameState.crew.some(c => c.specializations && c.specializations.includes(reqType))
    );
    if (!hasRequired) {
      showMessage(`Missing required crew types: ${operation.requirements.crewType.join(', ')}`, 'error');
      return;
    }
  }

  // Check money cost
  if (operation.money && gameState.player.money < operation.money) {
    showMessage(`Need $${operation.money.toLocaleString()}!`, 'error');
    return;
  }

  // Deduct costs
  gameState.player.energy -= operation.energy;
  if (operation.money) {
    gameState.player.money -= operation.money;
  }

  // Assign crew to operation
  const assignedCrew = availableCrew.slice(0, operation.crewRequired);
  assignedCrew.forEach(c => c.onJob = true);

  // Create active operation
  const activeOp = {
    id: Date.now(),
    operation: operation,
    targetGangId: targetGangId,
    assignedCrew: assignedCrew.map(c => c.id),
    startTime: Date.now(),
    endTime: Date.now() + operation.duration
  };

  gameState.gangWarfare.activeOperations.push(activeOp);

  showMessage(`⚔️ ${operation.name} against ${gang.name} - ${Math.floor(operation.duration / 1000)}s`, 'info');
  saveGame();
  render();

  // Schedule completion
  setTimeout(() => {
    completeWarOperation(activeOp.id);
  }, operation.duration);
}

// Complete war operation
function completeWarOperation(opId) {
  const activeOp = gameState.gangWarfare.activeOperations.find(op => op.id === opId);
  if (!activeOp) return;

  const operation = activeOp.operation;
  const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === activeOp.targetGangId);
  const war = gameState.gangWarfare.activeWars.find(w => w.gangId === activeOp.targetGangId);

  // Free up crew
  activeOp.assignedCrew.forEach(crewId => {
    const crew = gameState.crew.find(c => c.id === crewId);
    if (crew) crew.onJob = false;
  });

  // Calculate success
  initializeCrewCombatStats();
  const crewPower = activeOp.assignedCrew.reduce((total, crewId) => {
    const crew = gameState.crew.find(c => c.id === crewId);
    return total + (crew ? crew.combat.power : 0);
  }, 0);

  const powerBonus = Math.min(0.2, crewPower / 1000);

  // Gang strength affects difficulty (stronger gangs are harder to attack)
  const strengthPenalty = (gang.strength / 100) * 0.15; // Up to -15% for full strength gang

  // Relations affect success rate
  let relationsModifier = 0;
  if (operation.effects.relations && operation.effects.relations > 0) {
    // Diplomatic operations are easier with higher relations
    relationsModifier = (gang.relations / 100) * 0.10; // Up to +10% for max relations
  } else {
    // Hostile operations are harder with higher relations (they're more defensive)
    relationsModifier = -(gang.relations / 100) * 0.05; // Up to -5% for friendly gangs
  }

  const finalSuccessRate = Math.min(0.95, Math.max(0.05,
    operation.successRate + powerBonus - strengthPenalty + relationsModifier
  ));
  const success = Math.random() < finalSuccessRate;

  // Remove from active operations
  gameState.gangWarfare.activeOperations = gameState.gangWarfare.activeOperations.filter(op => op.id !== opId);

  if (success) {
    // Apply effects
    if (operation.effects.gangStrength) {
      gang.strength = Math.max(0, gang.strength + operation.effects.gangStrength);
    }
    if (operation.effects.playerRespect) {
      gameState.player.respect += operation.effects.playerRespect;
    }
    if (operation.effects.relations) {
      gang.relations = Math.max(-100, Math.min(100, gang.relations + operation.effects.relations));
    }
    if (operation.effects.heat) {
      modifyHeat(operation.effects.heat);
    }
    if (operation.effects.money) {
      const earned = Math.floor(Math.random() * (operation.effects.money[1] - operation.effects.money[0])) + operation.effects.money[0];
      gameState.player.money += earned;
    }

    // Territory capture
    if (operation.effects.captureTerritory) {
      const gangTerritories = gameState.gangWarfare.territories.filter(t => t.control === activeOp.targetGangId);
      if (gangTerritories.length > 0) {
        const captured = gangTerritories[0];
        captured.control = 'player';
        gameState.gangWarfare.playerTerritory++;
        gameState.gangWarfare.territoryCaptured++;
        showMessage(`🏴 TERRITORY CAPTURED: ${captured.name} (+$${captured.income}/hr)`, 'success');
      }
    }

    // Update war score
    if (war) {
      war.playerVictories++;
      gameState.gangWarfare.warVictories++;

      // Check if gang is defeated
      if (gang.strength <= 0) {
        showMessage(`💀 ${gang.name} has been ELIMINATED!`, 'success');
        gameState.gangWarfare.activeWars = gameState.gangWarfare.activeWars.filter(w => w.gangId !== activeOp.targetGangId);
        gang.strength = 0;

        // Capture all their territories
        gameState.gangWarfare.territories.forEach(t => {
          if (t.control === activeOp.targetGangId) {
            t.control = 'player';
            gameState.gangWarfare.playerTerritory++;
          }
        });
      }
    }

    // Update crew combat stats
    activeOp.assignedCrew.forEach(crewId => {
      const crew = gameState.crew.find(c => c.id === crewId);
      if (crew && crew.combat) {
        crew.combat.wins++;
        crew.combat.power = Math.min(100, crew.combat.power + 1);
      }
    });

    showMessage(`✅ SUCCESS: ${operation.name} - ${gang.name} weakened!`, 'success');
  } else {
    // Operation failed
    if (war) war.gangVictories++;

    // Take damage
    activeOp.assignedCrew.forEach(crewId => {
      const crew = gameState.crew.find(c => c.id === crewId);
      if (crew && crew.combat) {
        crew.combat.health = Math.max(0, crew.combat.health - 20);
      }
    });

    showMessage(`❌ FAILED: ${operation.name} - Your crew took casualties!`, 'error');
  }

  saveGame();
  render();
}

// Render War Room tab
function renderWarRoom() {
  initializeCrewCombatStats();

  const playerTerritoryCount = gameState.gangWarfare.territories.filter(t => t.control === 'player').length;
  const territoryIncome = gameState.gangWarfare.territories
    .filter(t => t.control === 'player')
    .reduce((sum, t) => sum + t.income, 0);

  // Time display helper
  const timeRemaining = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return `
    <div class="space-y-6 mt-6">
      <!-- War Room Header -->
      <div class="bg-zinc-950 p-6 border-2 border-red-600">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-3xl">⚔️</span>
          <h2 class="text-2xl font-bold text-red-600 uppercase">// WAR ROOM</h2>
        </div>
        <p class="text-sm text-gray-400 mb-4">Manage gang conflicts, control territory, and dominate the underworld</p>

        <!-- How it Works -->
        <div class="bg-yellow-950 bg-opacity-30 border border-yellow-700 p-4 mb-4">
          <h3 class="text-sm font-bold text-yellow-400 uppercase mb-2">📖 HOW GANG WARFARE WORKS</h3>
          <div class="text-xs text-gray-300 space-y-1">
            <p><strong class="text-yellow-400">1. CLAIM TERRITORY:</strong> Scroll to Territory Control section. Click "⚔️ INVADE" on enemy territories (must be at war with owner).</p>
            <p><strong class="text-yellow-400">2. DECLARE WAR:</strong> Click "🔥 Declare War" on rival gangs to unlock their territories for invasion.</p>
            <p><strong class="text-yellow-400">3. WAR OPERATIONS:</strong> Execute operations to weaken gangs (-Strength), earn money, or build/destroy relations.</p>
            <p><strong class="text-yellow-400">4. WAR SCORE:</strong> Successful operations = +1 victory. Failed operations = +1 to enemy. View in gang cards.</p>
            <p><strong class="text-yellow-400">5. ELIMINATE GANGS:</strong> Reduce Strength to 0 to eliminate them. All their territories become unclaimed!</p>
            <p><strong class="text-yellow-400">6. BUILD ALLIANCES:</strong> Use "Negotiate Alliance" operation to reach +50 relations, then click "Form Alliance". Allies share 15% of their territory income with you and provide invasion bonuses!</p>
            <p class="text-yellow-300 mt-2">💡 <em>Territory gives passive $/hr income. Invading costs 60 energy + 5 crew and takes 4 minutes!</em></p>
          </div>

          <div class="border-t border-yellow-700 mt-3 pt-3 space-y-2">
            <h3 class="text-sm font-bold text-yellow-400 uppercase">📊 UNDERSTANDING THE MECHANICS</h3>
            <div class="text-xs text-gray-300 space-y-1">
              <p><strong class="text-cyan-400">GANG STRENGTH:</strong> Health of a gang (0-100). War operations reduce it. <strong class="text-red-300">Higher strength = harder to attack (up to -15% success rate)</strong>. At 0, the gang is eliminated and loses all territories!</p>
              <p><strong class="text-cyan-400">RELATIONS:</strong> Your standing with each gang (-100 to +100). Negative = hostile, 0-49 = neutral, 50-99 = friendly, 100 = ally. <strong class="text-green-300">Diplomatic operations are easier with good relations (+10% max)</strong>. <strong class="text-red-300">Hostile operations harder against friends (-5%)</strong>. Invasions harder against friendly gangs (-10%).</p>
              <p><strong class="text-cyan-400">CREW SELECTION:</strong> Crew is automatically selected for operations based on availability and specialization. Your strongest available crew matching the operation requirements will be used.</p>
              <p><strong class="text-cyan-400">CREW POWER:</strong> Each crew member has combat stats shown below. Higher power = better operation success rates (+20% max). Crew gain experience from successful operations!</p>
            </div>
          </div>
        </div>

        <!-- War Stats -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Territories</p>
            <p class="text-xl font-bold text-purple-400">${playerTerritoryCount}/20</p>
          </div>
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Territory Income</p>
            <p class="text-xl font-bold text-green-400">$${territoryIncome}/hr</p>
          </div>
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Alliance Income</p>
            <p class="text-xl font-bold text-cyan-400">$${getAllianceIncome()}/hr</p>
          </div>
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Active Wars</p>
            <p class="text-xl font-bold text-red-400">${gameState.gangWarfare.activeWars.length}</p>
          </div>
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-xs text-gray-400 uppercase">Alliances</p>
            <p class="text-xl font-bold text-blue-400">${(gameState.gangWarfare.alliances || []).length}</p>
          </div>
        </div>
      </div>

      <!-- Active Operations -->
      ${gameState.gangWarfare.activeOperations.length > 0 ? `
        <div class="bg-zinc-900 p-4 border border-green-700">
          <h3 class="text-lg font-bold text-green-400 mb-3">⏳ ACTIVE OPERATIONS</h3>
          <div class="space-y-2">
            ${gameState.gangWarfare.activeOperations.map(op => {
              if (op.type === 'invasion') {
                // Handle invasion operations
                const endTime = op.startTime + op.duration;
                const progress = Math.min(100, ((Date.now() - op.startTime) / op.duration) * 100);
                const timeLeft = Math.max(0, endTime - Date.now());

                // Get crew info
                const invasionCrew = gameState.crew.filter(c => op.crewIds.includes(c.id));
                const crewPower = invasionCrew.reduce((sum, c) => sum + (c.combat?.power || 0), 0);
                const crewList = invasionCrew.map(c => c.name).join(', ');

                return `
                  <div class="bg-black p-3 border border-purple-800">
                    <p class="text-sm font-bold text-purple-400">⚔️ Invading ${op.territoryName}</p>
                    <p class="text-xs text-gray-400">⏱️ ${timeRemaining(timeLeft)} | 👥 ${op.crewIds.length} crew (${Math.floor(crewPower)} power)</p>
                    <p class="text-xs text-gray-500 mt-1 truncate" title="${crewList}">${crewList}</p>
                    <div class="w-full bg-zinc-800 h-2 mt-2">
                      <div class="bg-purple-600 h-2" style="width: ${progress}%"></div>
                    </div>
                  </div>
                `;
              } else {
                // Handle regular war operations
                const progress = Math.min(100, ((Date.now() - op.startTime) / (op.endTime - op.startTime)) * 100);
                const timeLeft = Math.max(0, op.endTime - Date.now());
                const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === op.targetGangId);

                return `
                  <div class="bg-black p-3 border border-green-800">
                    <p class="text-sm font-bold text-green-400">${op.operation.name} vs ${gang.name}</p>
                    <p class="text-xs text-gray-400">⏱️ ${timeRemaining(timeLeft)}</p>
                    <div class="w-full bg-zinc-800 h-2 mt-2">
                      <div class="bg-green-600 h-2" style="width: ${progress}%"></div>
                    </div>
                  </div>
                `;
              }
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Rival Gangs -->
      <div class="bg-zinc-900 p-4 border border-zinc-800">
        <h3 class="text-lg font-bold text-red-500 mb-3 uppercase">// Rival Gangs</h3>
        <div class="grid gap-4">
          ${gameState.gangWarfare.rivalGangs.map(gang => {
            const war = gameState.gangWarfare.activeWars.find(w => w.gangId === gang.id);
            const gangTerritories = gameState.gangWarfare.territories.filter(t => t.control === gang.id).length;
            const isAllied = gang.relations >= 100;
            const isFriendly = gang.relations >= 50;
            const isHostile = gang.relations < 0;

            return `
              <div class="bg-black p-4 border-2 ${war ? 'border-red-600' : isAllied ? 'border-green-600' : isFriendly ? 'border-blue-600' : isHostile ? 'border-red-800' : 'border-zinc-800'}">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="text-lg font-bold text-${gang.color}-400">${gang.name}</h4>
                    <p class="text-sm text-gray-400">Boss: ${gang.boss}</p>
                    <p class="text-xs text-gray-500">${gang.description}</p>
                  </div>
                  <div class="text-right">
                    ${war ? `<span class="px-2 py-1 bg-red-900 text-red-300 text-xs font-bold border border-red-600">🔥 AT WAR</span>` : ''}
                    ${isAllied ? `<span class="px-2 py-1 bg-green-900 text-green-300 text-xs font-bold border border-green-600">⚔️ ALLIED</span>` : ''}
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-3 mb-3 text-xs">
                  <div class="bg-zinc-900 p-2 border border-zinc-800">
                    <p class="text-gray-400">Strength</p>
                    <p class="text-lg font-bold ${gang.strength > 50 ? 'text-red-400' : 'text-yellow-400'}">${gang.strength}</p>
                  </div>
                  <div class="bg-zinc-900 p-2 border border-zinc-800">
                    <p class="text-gray-400">Territory</p>
                    <p class="text-lg font-bold text-purple-400">${gangTerritories}</p>
                  </div>
                  <div class="bg-zinc-900 p-2 border border-zinc-800">
                    <p class="text-gray-400">Relations</p>
                    <p class="text-lg font-bold ${gang.relations >= 50 ? 'text-green-400' : gang.relations >= 0 ? 'text-yellow-400' : 'text-red-400'}">${gang.relations}</p>
                  </div>
                </div>

                ${war ? `
                  <div class="bg-red-950 p-2 border border-red-800 mb-3 text-xs">
                    <p class="text-red-300">War Score: ${war.playerVictories} - ${war.gangVictories}</p>
                  </div>
                ` : ''}

                <div class="flex gap-2 flex-wrap">
                  ${!war && !isAllied ? `
                    <button onclick="declareWar(${gang.id})" class="px-3 py-1 text-xs font-bold uppercase bg-red-700 hover:bg-red-600 text-white border border-red-500">
                      🔥 Declare War
                    </button>
                  ` : ''}
                  ${war ? `
                    <button onclick="makePeace(${gang.id})" class="px-3 py-1 text-xs font-bold uppercase bg-blue-700 hover:bg-blue-600 text-white border border-blue-500">
                      🤝 Make Peace
                    </button>
                  ` : ''}
                  ${!isAllied && isFriendly && !war ? `
                    <button onclick="formAlliance(${gang.id})" class="px-3 py-1 text-xs font-bold uppercase bg-green-700 hover:bg-green-600 text-white border border-green-500">
                      ⚔️ Form Alliance
                    </button>
                  ` : ''}
                  ${isAllied ? `
                    <button onclick="breakAlliance(${gang.id})" class="px-3 py-1 text-xs font-bold uppercase bg-gray-700 hover:bg-gray-600 text-white border border-gray-500">
                      💔 Break Alliance
                    </button>
                  ` : ''}
                </div>
                ${isAllied ? `
                  <div class="bg-green-950 bg-opacity-30 border border-green-700 p-2 mt-3 text-xs">
                    <p class="text-green-300"><strong>Alliance Benefits:</strong></p>
                    <p class="text-green-200">• ${Math.floor(gameState.gangWarfare.territories.filter(t => t.control === gang.id).reduce((sum, t) => sum + t.income, 0) * 0.15)}/hr shared income</p>
                    <p class="text-green-200">• +10% success rate on invasions</p>
                    <p class="text-green-200">• Cannot attack each other</p>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- War Operations -->
      ${gameState.gangWarfare.activeWars.length > 0 ? `
        <div class="bg-zinc-900 p-4 border border-zinc-800">
          <h3 class="text-lg font-bold text-yellow-500 mb-3 uppercase">// War Operations</h3>
          <div class="grid md:grid-cols-2 gap-4">
            ${warOperations.map(op => `
              <div class="bg-black p-4 border border-zinc-800">
                <h4 class="text-md font-bold text-yellow-400 mb-2">${op.name}</h4>
                <p class="text-xs text-gray-400 mb-2">${op.type.toUpperCase()}</p>

                <!-- What it does -->
                <div class="bg-zinc-900 p-2 mb-3 border-l-2 ${op.effects.captureTerritory ? 'border-purple-500' : op.effects.relations > 0 ? 'border-green-500' : 'border-red-500'}">
                  <p class="text-xs text-gray-300">
                    ${op.effects.gangStrength ? `<span class="text-red-400">-${Math.abs(op.effects.gangStrength)} Gang Strength</span> ` : ''}
                    ${op.effects.playerRespect ? `<span class="text-purple-400">+${op.effects.playerRespect} Respect</span> ` : ''}
                    ${op.effects.money ? `<span class="text-green-400">$${op.effects.money[0]}-${op.effects.money[1]}</span> ` : ''}
                    ${op.effects.relations ? `<span class="${op.effects.relations > 0 ? 'text-green-400' : 'text-red-400'}">${op.effects.relations > 0 ? '+' : ''}${op.effects.relations} Relations</span> ` : ''}
                    ${op.effects.heat ? `<span class="text-orange-400">+${op.effects.heat} Heat</span> ` : ''}
                    ${op.effects.captureTerritory ? `<span class="text-purple-400">Claim 1 Territory</span>` : ''}
                  </p>
                </div>

                <div class="text-xs space-y-1 mb-3">
                  <p class="text-gray-300">⚡ ${op.energy} Energy</p>
                  <p class="text-gray-300">👥 ${op.crewRequired} Crew Required</p>
                  <p class="text-gray-300">⏱️ ${Math.floor(op.duration / 1000)}s</p>
                  <p class="text-gray-300">📊 ${Math.floor(op.successRate * 100)}% Success</p>
                  ${op.requirements.crewType ? `
                    <p class="text-gray-400">Needs: ${op.requirements.crewType.join(', ')}</p>
                  ` : ''}
                </div>

                <select id="target-${op.id}" class="w-full mb-2 px-3 py-2 bg-zinc-900 border-2 border-zinc-700 hover:border-cyan-500 text-white text-sm focus:outline-none focus:border-cyan-400 cursor-pointer" style="min-height: 40px;">
                  <option value="" disabled selected>Select Target Gang...</option>
                  ${gameState.gangWarfare.activeWars.map(war => {
                    const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === war.gangId);
                    return `<option value="${gang.id}">${gang.name} (Strength: ${gang.strength})</option>`;
                  }).join('')}
                </select>

                <button
                  onclick="const selectEl = document.getElementById('target-${op.id}'); const target = selectEl.value; if(!target || target === '') { alert('Please select a target gang first!'); return; } executeWarOperation(${op.id}, parseInt(target));"
                  class="w-full px-3 py-2 text-xs font-bold uppercase bg-red-700 hover:bg-red-600 text-white border border-red-500 transition-colors"
                >
                  ▶ Execute Operation
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="bg-zinc-900 p-8 border border-zinc-800 text-center">
          <p class="text-gray-400">Declare war on a rival gang to access war operations.</p>
        </div>
      `}

      <!-- Territory Map -->
      <div class="bg-zinc-900 p-4 border border-zinc-800">
        <h3 class="text-lg font-bold text-purple-500 mb-3 uppercase">// Territory Control</h3>
        <p class="text-xs text-gray-400 mb-3">Click "⚔️ INVADE" to claim enemy or unclaimed territory. Costs 60 energy, 5 crew, 4 min duration.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          ${gameState.gangWarfare.territories.map(territory => {
            const gang = territory.control ? gameState.gangWarfare.rivalGangs.find(g => g.id === territory.control) : null;
            const controller = territory.control === 'player' ? 'YOU' :
                             gang ? gang.name :
                             'Unclaimed';
            const controlColor = territory.control === 'player' ? 'green' :
                               territory.control ? 'red' :
                               'yellow';

            const atWar = gang ? gameState.gangWarfare.activeWars.some(w => w.gangId === gang.id) : false;
            const canInvade = territory.control !== 'player' && (territory.control === null || atWar);

            return `
              <div class="bg-black p-3 border-2 border-${controlColor}-${territory.control === 'player' ? '600' : '800'}">
                <p class="text-sm font-bold text-${controlColor}-400">${territory.name}</p>
                <p class="text-xs text-gray-400">💰 $${territory.income}/hr</p>
                <p class="text-xs text-${controlColor}-300 mt-1">Owner: ${controller}</p>
                ${canInvade ? `
                  <button
                    onclick="invadeTerritory(${territory.id})"
                    class="w-full mt-2 px-2 py-1 text-xs font-bold uppercase bg-purple-700 hover:bg-purple-600 text-white border border-purple-500"
                  >
                    ⚔️ INVADE
                  </button>
                ` : territory.control !== 'player' && !atWar && territory.control ? `
                  <p class="text-xs text-red-400 mt-2">⚠️ Declare war on ${controller} first!</p>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Crew Combat Stats -->
      <div class="bg-zinc-900 p-4 border border-zinc-800">
        <h3 class="text-lg font-bold text-cyan-500 mb-3 uppercase">// Combat Crew</h3>
        <div class="grid gap-2">
          ${gameState.crew.map(member => `
            <div class="bg-black p-3 border border-zinc-800 flex justify-between items-center">
              <div>
                <p class="text-sm font-bold text-cyan-400">${member.name}</p>
                <p class="text-xs text-gray-400">${member.specializations?.join(', ') || 'No specialty'}</p>
              </div>
              <div class="flex gap-4 text-xs">
                <div class="text-center">
                  <p class="text-gray-400">Power</p>
                  <p class="text-yellow-400 font-bold">${Math.floor(member.combat?.power || 10)}</p>
                </div>
                <div class="text-center">
                  <p class="text-gray-400">Health</p>
                  <p class="text-green-400 font-bold">${member.combat?.health || 100}/${member.combat?.maxHealth || 100}</p>
                </div>
                <div class="text-center">
                  <p class="text-gray-400">Wins</p>
                  <p class="text-purple-400 font-bold">${member.combat?.wins || 0}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Add territory income to passive income calculation
function getTerritoryIncome() {
  if (!gameState.gangWarfare) return 0;
  return gameState.gangWarfare.territories
    .filter(t => t.control === 'player')
    .reduce((sum, t) => sum + t.income, 0);
}

// Get alliance shared income
function getAllianceIncome() {
  if (!gameState.gangWarfare || !gameState.gangWarfare.alliances) return 0;

  let totalShared = 0;
  gameState.gangWarfare.alliances.forEach(alliance => {
    const allyTerritories = gameState.gangWarfare.territories.filter(t => t.control === alliance.gangId);
    const sharedIncome = allyTerritories.reduce((sum, t) => sum + t.income, 0) * 0.15; // 15% share
    totalShared += sharedIncome;
  });

  return Math.floor(totalShared);
}

// Check for completed war operations on load
function checkWarOperationCompletion() {
  if (!gameState.gangWarfare || !gameState.gangWarfare.activeOperations) return;

  const now = Date.now();
  const completed = gameState.gangWarfare.activeOperations.filter(op => {
    const endTime = op.endTime || (op.startTime + op.duration);
    return endTime <= now;
  });

  completed.forEach(op => {
    if (op.type === 'invasion') {
      completeInvasion(op.id);
    } else {
      completeWarOperation(op.id);
    }
  });
}

// Territory Invasion System
function invadeTerritory(territoryId) {
  const territory = gameState.gangWarfare.territories.find(t => t.id === territoryId);
  if (!territory) {
    alert('Territory not found!');
    return;
  }

  // Check if player has enough energy
  if (gameState.player.energy < 60) {
    alert('Not enough energy! Need 60 energy to invade.');
    return;
  }

  // Check available crew (not on jobs or operations)
  const availableCrew = gameState.crew.filter(c => !c.onJob);
  if (availableCrew.length < 5) {
    alert('Not enough crew! Need 5 available crew members to invade.');
    return;
  }

  // Check if at war with territory owner (if owned)
  if (territory.control && territory.control !== 'player') {
    const atWar = gameState.gangWarfare.activeWars.some(w => w.gangId === territory.control);
    if (!atWar) {
      const gang = gameState.gangWarfare.rivalGangs.find(g => g.id === territory.control);
      alert(`You must be at war with ${gang ? gang.name : 'the owner'} to invade this territory!`);
      return;
    }
  }

  // Deduct energy
  gameState.player.energy -= 60;

  // Select 5 strongest available crew (sorted by power)
  initializeCrewCombatStats();
  const sortedCrew = availableCrew.sort((a, b) => (b.combat?.power || 0) - (a.combat?.power || 0));
  const crewForOperation = sortedCrew.slice(0, 5);
  crewForOperation.forEach(c => c.onJob = true);

  // Show which crew was selected
  const crewNames = crewForOperation.map(c => `${c.name} (${Math.floor(c.combat.power)} pwr)`).join(', ');
  console.log(`Selected crew for invasion: ${crewNames}`);

  // Create invasion operation
  const invasion = {
    id: Date.now(),
    type: 'invasion',
    territoryId: territory.id,
    territoryName: territory.name,
    targetGangId: territory.control,
    startTime: Date.now(),
    duration: 240000, // 4 minutes
    crewIds: crewForOperation.map(c => c.id)
  };

  gameState.gangWarfare.activeOperations.push(invasion);

  const totalPower = crewForOperation.reduce((sum, c) => sum + (c.combat?.power || 0), 0);
  alert(`⚔️ Invasion of ${territory.name} has begun! (4 minutes)\n\nCrew deployed: ${crewNames}\nTotal Power: ${Math.floor(totalPower)}`);
  render();
}

function completeInvasion(invasionId) {
  const invasion = gameState.gangWarfare.activeOperations.find(op => op.id === invasionId);
  if (!invasion) return;

  const territory = gameState.gangWarfare.territories.find(t => t.id === invasion.territoryId);
  if (!territory) return;

  // Release crew
  invasion.crewIds.forEach(crewId => {
    const crew = gameState.crew.find(c => c.id === crewId);
    if (crew) crew.onJob = false;
  });

  // Calculate success rate
  let successRate = 0.50; // Base 50% success rate

  // Add crew power bonuses
  const crewInInvasion = gameState.crew.filter(c => invasion.crewIds.includes(c.id));
  crewInInvasion.forEach(c => {
    successRate += (c.power || 0) * 0.002; // Each power point adds 0.2%
  });

  // Add player respect bonus
  successRate += (gameState.player.respect || 0) * 0.0001; // Each respect adds 0.01%

  // Gang strength affects invasion difficulty
  if (invasion.targetGangId && invasion.targetGangId !== 'player') {
    const defendingGang = gameState.gangWarfare.rivalGangs.find(g => g.id === invasion.targetGangId);
    if (defendingGang) {
      const strengthPenalty = (defendingGang.strength / 100) * 0.20; // Up to -20% for full strength
      successRate -= strengthPenalty;

      // Relations make invasion harder (they defend better if they like you)
      if (defendingGang.relations > 0) {
        successRate -= (defendingGang.relations / 100) * 0.10; // Up to -10% for friendly relations
      }
    }
  }

  // Alliance bonus: Allies provide military support (+10% success)
  if (gameState.gangWarfare.alliances && gameState.gangWarfare.alliances.length > 0) {
    const allyBonus = gameState.gangWarfare.alliances.length * 0.10; // +10% per ally
    successRate += allyBonus;
  }

  // Cap at 95%, floor at 5%
  successRate = Math.min(0.95, Math.max(0.05, successRate));

  // Roll for success
  const success = Math.random() < successRate;

  if (success) {
    // Transfer territory to player
    const previousOwner = territory.control;
    territory.control = 'player';

    // Update stats
    gameState.gangWarfare.territoryCaptured = (gameState.gangWarfare.territoryCaptured || 0) + 1;
    gameState.player.respect = (gameState.player.respect || 0) + 50;

    // Update war score if applicable
    if (previousOwner && previousOwner !== 'player') {
      const war = gameState.gangWarfare.activeWars.find(w => w.gangId === previousOwner);
      if (war) {
        war.playerVictories++;
      }
    }

    // Add to history
    if (!gameState.jobHistory) gameState.jobHistory = [];
    gameState.jobHistory.unshift({
      name: `Invade ${invasion.territoryName}`,
      success: true,
      timestamp: Date.now(),
      rewards: `+${territory.income}/hr income, +50 Respect`
    });
    if (gameState.jobHistory.length > 50) gameState.jobHistory.pop();

    alert(`✅ SUCCESS! You've captured ${territory.name}! (+${territory.income}/hr income, +50 Respect)`);
  } else {
    // Failure - possible crew damage
    crewInInvasion.forEach(c => {
      if (Math.random() < 0.3) { // 30% chance to lose power
        c.power = Math.max(0, (c.power || 0) - 5);
      }
    });

    // Update war score for enemy
    if (invasion.targetGangId && invasion.targetGangId !== 'player') {
      const war = gameState.gangWarfare.activeWars.find(w => w.gangId === invasion.targetGangId);
      if (war) {
        war.gangVictories++;
      }
    }

    // Add to history
    if (!gameState.jobHistory) gameState.jobHistory = [];
    gameState.jobHistory.unshift({
      name: `Invade ${invasion.territoryName}`,
      success: false,
      timestamp: Date.now(),
      rewards: 'Some crew members injured'
    });
    if (gameState.jobHistory.length > 50) gameState.jobHistory.pop();

    alert(`❌ FAILED! Your invasion of ${territory.name} was repelled! Some crew members were injured.`);
  }

  // Remove operation
  const index = gameState.gangWarfare.activeOperations.findIndex(op => op.id === invasionId);
  if (index !== -1) {
    gameState.gangWarfare.activeOperations.splice(index, 1);
  }

  render();
}

// Update progress bars every second without full re-render
let lastOperationCount = 0;
setInterval(() => {
  if (gameState.gangWarfare && gameState.gangWarfare.activeOperations.length > 0) {
    checkWarOperationCompletion();

    // Only full re-render if operations count changed (started/completed)
    // Otherwise just update progress bars to avoid resetting dropdowns
    if (gameState.currentTab === 'warroom') {
      if (lastOperationCount !== gameState.gangWarfare.activeOperations.length) {
        lastOperationCount = gameState.gangWarfare.activeOperations.length;
        render();
      }
      // If count is same, don't re-render to preserve dropdown state
    }
  }
}, 1000);

// Initialize on load
checkWarOperationCompletion();
initializeCrewCombatStats();
