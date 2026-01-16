// Save game to localStorage
function saveGame() {
  try {
    const saveData = {
      player: gameState.player,
      crew: gameState.crew,
      equipment: gameState.equipment,
      properties: gameState.properties,
      achievements: gameState.achievements,
      stats: gameState.stats,
      expandedCategories: gameState.expandedCategories,
      jobFilter: gameState.jobFilter,
      jobSort: gameState.jobSort,
      activeJobs: gameState.activeJobs,
      advancedJobs: gameState.advancedJobs,
      lastAdvancedJobRefresh: gameState.lastAdvancedJobRefresh,
      energyRecovery: gameState.energyRecovery,
      gangWarfare: gameState.gangWarfare,
      blackMarket: gameState.blackMarket,
      newsTickerItems: gameState.newsTickerItems,
      specialOperations: gameState.specialOperations,
      activeBuffs: gameState.activeBuffs,
      jobHistory: gameState.jobHistory,
      savedAt: Date.now()
    };
    localStorage.setItem('mafiaEmpireSave', JSON.stringify(saveData));
    console.log('Game saved successfully');
  } catch (e) {
    console.error('Failed to save game:', e);
  }
}

// Load game from localStorage
function loadGame() {
  try {
    const savedData = localStorage.getItem('mafiaEmpireSave');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      gameState.player = parsed.player;
      gameState.crew = parsed.crew || [];
      gameState.equipment = parsed.equipment || [];
      gameState.properties = parsed.properties || [];
      gameState.achievements = parsed.achievements || [];
      gameState.stats = parsed.stats || { totalMoneyEarned: 0, jobsCompleted: 0, jobsFailed: 0 };
      gameState.expandedCategories = parsed.expandedCategories || gameState.expandedCategories;
      gameState.jobFilter = parsed.jobFilter || 'all';
      gameState.jobSort = parsed.jobSort || 'level';
      gameState.gangWarfare = parsed.gangWarfare || gameState.gangWarfare;
      gameState.blackMarket = parsed.blackMarket || gameState.blackMarket;
      gameState.newsTickerItems = parsed.newsTickerItems || [];
      gameState.specialOperations = parsed.specialOperations || [];
      gameState.activeBuffs = parsed.activeBuffs || [];
      gameState.jobHistory = parsed.jobHistory || [];

      // Migration: Convert old activeJob to activeJobs array
      if (parsed.activeJob) {
        gameState.activeJobs = [parsed.activeJob];
      } else {
        gameState.activeJobs = parsed.activeJobs || [];
      }

      // Migration: Add leveling properties and specializations to existing crew members
      gameState.crew = gameState.crew.map(member => {
        // Find the crew template to get specializations
        const template = availableCrew.find(c => c.id === member.id);
        return {
          ...member,
          level: member.level || 1,
          xp: member.xp || 0,
          xpToNext: member.xpToNext || 100,
          onJob: false,  // Reset onJob status, will be set from activeJobs
          specializations: member.specializations || (template ? template.specializations : [])
        };
      });

      // Restore onJob status from activeJobs
      gameState.activeJobs.forEach(activeJob => {
        if (activeJob.assignedTo !== 'player') {
          const crew = gameState.crew.find(c => c.id === activeJob.assignedTo);
          if (crew) {
            crew.onJob = true;
          }
        }
      });

      // Migration: Add energy recovery tracking
      gameState.energyRecovery = parsed.energyRecovery || {
        quickRest: null,
        takeBreak: null,
        fullRest: null,
        luxuryRest: null
      };

      // Migration: Add heat and intel system
      if (gameState.player.heat === undefined) {
        gameState.player.heat = 0;
        gameState.player.intel = 0;
        gameState.player.lastHeatUpdate = Date.now();
      }

      // Migration: Add advanced jobs system
      gameState.advancedJobs = parsed.advancedJobs || [];
      gameState.lastAdvancedJobRefresh = parsed.lastAdvancedJobRefresh || null;

      console.log('Game loaded successfully');
      showMessage('Game loaded!', 'success');
      return true;
    }
  } catch (e) {
    console.error('Failed to load game:', e);
  }
  return false;
}

// Reset game (delete save)
function resetGame() {
  if (confirm('Are you sure you want to reset your game? This cannot be undone!')) {
    localStorage.removeItem('mafiaEmpireSave');
    location.reload();
  }
}

// Export save data as JSON file
function exportSave() {
  try {
    const saveData = {
      player: gameState.player,
      crew: gameState.crew,
      equipment: gameState.equipment,
      properties: gameState.properties,
      achievements: gameState.achievements,
      stats: gameState.stats,
      savedAt: Date.now()
    };
    const dataStr = JSON.stringify(saveData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mafia-empire-save-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showMessage('Save exported!', 'success');
  } catch (e) {
    console.error('Failed to export save:', e);
    showMessage('Failed to export save', 'error');
  }
}

// Import save data from JSON file
function importSave(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      gameState.player = parsed.player;
      gameState.crew = parsed.crew || [];
      gameState.equipment = parsed.equipment || [];
      gameState.properties = parsed.properties || [];
      gameState.achievements = parsed.achievements || [];
      gameState.stats = parsed.stats || { totalMoneyEarned: 0, jobsCompleted: 0, jobsFailed: 0 };
      saveGame();
      render();
      showMessage('Save imported successfully!', 'success');
    } catch (err) {
      console.error('Failed to import save:', err);
      showMessage('Failed to import save - invalid file', 'error');
    }
  };
  reader.readAsText(file);
}

// Default game state
const defaultGameState = {
  player: {
    name: "Nobody",
    level: 1,
    xp: 0,
    xpToNext: 100,
    money: 100,
    respect: 0,
    energy: 100,
    maxEnergy: 100,
    lastEnergyUpdate: Date.now(),
    heat: 0,  // Heat level 0-100 (lower is better)
    intel: 0  // Intel points for advanced jobs
  },
  crew: [],
  equipment: [],
  properties: [],
  activeTab: 'dashboard',
  activeJobs: [],  // Changed from activeJob to activeJobs array
  advancedJobs: [],  // Random time-limited advanced opportunities
  lastAdvancedJobRefresh: null,
  activeIntelOps: [],  // Active intel gathering operations
  jobHistory: [],  // Last 10 completed advanced jobs/operations
  energyRecovery: {
    quickRest: null,      // 10 min cooldown, +10 energy
    takeBreak: null,      // 30 min cooldown, +25 energy
    fullRest: null,       // 1 hour cooldown, +50 energy
    luxuryRest: null      // 2 hour cooldown, +100 energy (requires property)
  },
  expandedCategories: {
    weapon: true, explosive: false, protection: false, utility: false,
    documents: false, tech: false, vehicle: false, misc: false,
    elite: true, muscle: true, specialist: false, support: false, income: false,
    premium: false, high: true, mid: true, low: true
  },
  achievements: [],
  notifications: [],
  stats: {
    totalMoneyEarned: 0,
    jobsCompleted: 0,
    jobsFailed: 0
  },
  jobFilter: 'all',
  jobSort: 'level',
  crewAssignmentModal: null,  // Stores job being assigned
  newsTickerItems: [],  // Live news feed
  blackMarket: {
    lastRefresh: 0,
    refreshInterval: 3600000,  // 1 hour in ms
    currentItems: []
  }
};

// Game State - will be loaded from localStorage or use default
let gameState = JSON.parse(JSON.stringify(defaultGameState));

// Achievement definitions
const achievementDefs = [
  { id: 'first_score', name: 'First Score', description: 'Complete your first job', icon: '💰', check: () => gameState.stats.jobsCompleted >= 1 },
  { id: 'made_man', name: 'Made Man', description: 'Reach level 5', icon: '👔', check: () => gameState.player.level >= 5 },
  { id: 'millionaire', name: 'Millionaire', description: 'Accumulate $1,000,000', icon: '💎', check: () => gameState.player.money >= 1000000 },
  { id: 'hard_worker', name: 'Hard Worker', description: 'Complete 10 jobs', icon: '⚡', check: () => gameState.stats.jobsCompleted >= 10 },
  { id: 'the_boss', name: 'The Boss', description: 'Reach level 10', icon: '👑', check: () => gameState.player.level >= 10 },
  { id: 'crew_leader', name: 'Crew Leader', description: 'Recruit 5 crew members', icon: '👥', check: () => gameState.crew.length >= 5 },
  { id: 'well_equipped', name: 'Well Equipped', description: 'Own 10 pieces of equipment', icon: '🔫', check: () => gameState.equipment.length >= 10 },
  { id: 'real_estate_mogul', name: 'Real Estate Mogul', description: 'Own 5 properties', icon: '🏢', check: () => gameState.properties.length >= 5 },
  { id: 'untouchable', name: 'Untouchable', description: 'Earn $100,000 total', icon: '🛡️', check: () => gameState.stats.totalMoneyEarned >= 100000 },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Achieve 90% success rate (min 20 jobs)', icon: '⭐', check: () => gameState.stats.jobsCompleted + gameState.stats.jobsFailed >= 20 && (gameState.stats.jobsCompleted / (gameState.stats.jobsCompleted + gameState.stats.jobsFailed)) >= 0.9 }
];

// Jobs data is loaded from mafia-empire-data.js
// Crew members data is loaded from mafia-empire-data.js  
// Equipment data is loaded from mafia-empire-data.js
// Properties data is loaded from mafia-empire-data.js

// Utility Functions
function showMessage(msg, type = 'info') {
  addNotification(msg, type);
}

function addNotification(msg, type = 'info') {
  const id = Date.now();
  const notification = { id, msg, type };
  gameState.notifications.push(notification);
  
  renderNotifications();
  
  setTimeout(() => {
    gameState.notifications = gameState.notifications.filter(n => n.id !== id);
    renderNotifications();
  }, 4000);
}

function getRiskColor(risk) {
  switch(risk) {
    case 'low': return 'text-green-400 border-green-700';
    case 'medium': return 'text-yellow-400 border-yellow-700';
    case 'high': return 'text-orange-400 border-orange-700';
    case 'very high': return 'text-red-400 border-red-700';
    case 'extreme': return 'text-red-600 border-red-800';
    default: return 'text-gray-400 border-gray-700';
  }
}

function getRiskIcon(risk) {
  switch(risk) {
    case 'low': return '🛡️';
    case 'medium': return '🎯';
    case 'high': return '⚠️';
    case 'very high': return '💀';
    case 'extreme': return '💀';
    default: return '';
  }
}

// Calculate job bonuses from crew and equipment
function calculateJobBonuses() {
  let successRate = 0;
  let money = 0;
  let xp = 0;

  gameState.crew.forEach(member => {
    if (member.bonus.successRate) successRate += member.bonus.successRate;
    if (member.bonus.money) money += member.bonus.money;
    if (member.bonus.xp) xp += member.bonus.xp;
  });

  gameState.equipment.forEach(item => {
    if (item.bonus && item.bonus.successRate) successRate += item.bonus.successRate;
    if (item.bonus && item.bonus.money) money += item.bonus.money;
    if (item.bonus && item.bonus.xp) xp += item.bonus.xp;
  });

  return { successRate, money, xp };
}

// Add entry to job history (keep last 10)
function addToJobHistory(entry) {
  if (!gameState.jobHistory) {
    gameState.jobHistory = [];
  }

  gameState.jobHistory.unshift(entry); // Add to beginning

  // Keep only last 10 entries
  if (gameState.jobHistory.length > 10) {
    gameState.jobHistory = gameState.jobHistory.slice(0, 10);
  }
}

// Job Requirements Checking
function checkJobRequirements(job) {
  const requirements = job.requirements || {};
  const missing = [];

  // Check crew type requirements - MUST have at least one crew with EACH required specialization
  if (requirements.crewType && requirements.crewType.length > 0) {
    for (const reqType of requirements.crewType) {
      // Check if ANY crew member has this specific specialization
      const hasCrew = gameState.crew.some(member => {
        // Make sure member has specializations array and it includes the required type
        return member.specializations &&
               Array.isArray(member.specializations) &&
               member.specializations.includes(reqType);
      });

      if (!hasCrew) {
        missing.push(`${reqType} crew`);
      }
    }
  }

  // Check vehicle requirement
  if (requirements.vehicle) {
    const hasVehicle = gameState.equipment.some(item => item.category === 'vehicle');
    if (!hasVehicle) {
      missing.push('vehicle');
    }
  }

  return {
    met: missing.length === 0,
    missing: missing
  };
}

function getSpecializationIcon(spec) {
  const icons = {
    'violent': '👊',
    'stealth': '🥷',
    'financial': '💰',
    'political': '🎩',
    'transport': '🚗'
  };
  return icons[spec] || '⭐';
}

function getSpecializationColor(spec) {
  const colors = {
    'violent': 'bg-red-950 text-red-300 border-red-700',
    'stealth': 'bg-purple-950 text-purple-300 border-purple-700',
    'financial': 'bg-green-950 text-green-300 border-green-700',
    'political': 'bg-blue-950 text-blue-300 border-blue-700',
    'transport': 'bg-yellow-950 text-yellow-300 border-yellow-700'
  };
  return colors[spec] || 'bg-gray-950 text-gray-300 border-gray-700';
}

// Game Actions
// Open crew assignment modal for job (accepts job object or job ID)
function doJob(jobOrId) {
  // Handle both job object and job ID
  const job = typeof jobOrId === 'number' ? jobs.find(j => j.id === jobOrId) : jobOrId;

  if (!job) {
    console.error('Job not found:', jobOrId);
    showMessage('Job not found!', 'error');
    return;
  }

  console.log('doJob called for:', job.name);

  if (gameState.player.level < job.minLevel) {
    showMessage(`You need to be level ${job.minLevel} for this job`, 'error');
    return;
  }

  // Check job requirements (crew types and vehicles)
  const reqCheck = checkJobRequirements(job);
  if (!reqCheck.met) {
    showMessage(`Missing requirements: ${reqCheck.missing.join(', ')}`, 'error');
    return;
  }

  // Check if at least one slot is available (player or crew)
  const playerBusy = gameState.activeJobs.some(activeJob => activeJob.assignedTo === 'player');
  const availableCrew = gameState.crew.filter(c => !c.onJob);

  console.log('Player busy?', playerBusy, 'Available crew:', availableCrew.length);

  if (playerBusy && availableCrew.length === 0) {
    showMessage('All job slots are busy! Wait for a job to finish.', 'error');
    return;
  }

  // Check if ANYONE (player or crew) has enough energy
  const playerCanDo = !playerBusy && gameState.player.energy >= job.energy;
  const crewCanDo = availableCrew.some(crew => (crew.energy || 100) >= job.energy);

  if (!playerCanDo && !crewCanDo) {
    showMessage('Not enough energy! Neither you nor any available crew can do this job.', 'error');
    return;
  }

  console.log('Opening modal for job:', job.name);

  // Show crew assignment modal
  gameState.crewAssignmentModal = job;
  render();
}

// Assign job to player or crew member (accepts job object or job ID)
function assignJob(jobOrId, crewMemberId) {
  // Handle both job object and job ID
  const job = typeof jobOrId === 'number' ? jobs.find(j => j.id === jobOrId) : jobOrId;

  if (!job) {
    console.error('Job not found:', jobOrId);
    showMessage('Job not found!', 'error');
    return;
  }

  // CRITICAL: Close modal FIRST before any other logic
  // This prevents the 50ms render interval from recreating it
  gameState.crewAssignmentModal = null;

  const modal = document.getElementById('crewAssignmentModal');
  if (modal) {
    modal.remove();
  }

  // Check if player is trying to do job themselves but already on a job
  if (!crewMemberId) {
    const playerAlreadyWorking = gameState.activeJobs.some(activeJob => activeJob.assignedTo === 'player');
    if (playerAlreadyWorking) {
      showMessage('You are already working on a job!', 'error');
      return;
    }

    if (gameState.player.energy < job.energy) {
      showMessage('Not enough energy!', 'error');
      return;
    }
  }

  let assignedCrew = null;

  if (crewMemberId) {
    assignedCrew = gameState.crew.find(c => c.id === crewMemberId);
    if (!assignedCrew || assignedCrew.onJob) {
      showMessage('Crew member not available!', 'error');
      return;
    }

    // Check crew member's energy
    if (!assignedCrew.energy) assignedCrew.energy = 100; // Migration for old saves
    if (assignedCrew.energy < job.energy) {
      showMessage(`${assignedCrew.name} doesn't have enough energy! (${assignedCrew.energy}/${job.energy})`, 'error');
      return;
    }
    assignedCrew.onJob = true;
  }

  // Deduct energy from the appropriate person
  if (crewMemberId && assignedCrew) {
    assignedCrew.energy -= job.energy;
  } else {
    gameState.player.energy -= job.energy;
  }

  gameState.activeJobs.push({
    job: job,
    startTime: Date.now(),
    duration: job.duration,
    progress: 0,
    assignedTo: crewMemberId || 'player'
  });

  const assignedName = crewMemberId ? assignedCrew.name : 'You';
  showMessage(`${assignedName} started: ${job.name}`, 'info');

  saveGame();
  render();
}

// Close assignment modal
function closeCrewModal() {
  gameState.crewAssignmentModal = null;

  // Remove the modal wrapper (which contains the backdrop)
  const modal = document.getElementById('crewAssignmentModal');
  if (modal) {
    modal.remove();
  }

  render();
}

function completeJob(activeJob) {
  // Handle both regular jobs (activeJob.job) and advanced jobs (job data directly in activeJob)
  const job = activeJob.job || activeJob;
  const assignedTo = activeJob.assignedTo;

  // Get bonuses from ALL crew and equipment (passive bonuses)
  // Using additive bonuses now that values are small
  let successBonus = 0;
  let moneyBonus = 0;
  let xpBonus = 0;

  gameState.crew.forEach(member => {
    if (member.bonus.successRate) {
      successBonus += member.bonus.successRate;
    }
    if (member.bonus.money) moneyBonus += member.bonus.money;
    if (member.bonus.xp) xpBonus += member.bonus.xp;
  });

  gameState.equipment.forEach(item => {
    if (item.bonus && item.bonus.successRate) {
      successBonus += item.bonus.successRate;
    }
    if (item.bonus && item.bonus.money) moneyBonus += item.bonus.money;
    if (item.bonus && item.bonus.xp) xpBonus += item.bonus.xp;
  });

  // Get assigned crew member if applicable
  let assignedCrew = null;
  if (assignedTo !== 'player') {
    assignedCrew = gameState.crew.find(c => c.id === assignedTo);
  }

  // Apply additive bonus to base success rate, cap at 95%
  const bonusedSuccessRate = job.successRate + successBonus;
  const finalSuccessRate = Math.min(0.95, bonusedSuccessRate);
  const success = Math.random() < finalSuccessRate;

  if (success) {
    const baseMoney = Math.floor(Math.random() * (job.money[1] - job.money[0] + 1)) + job.money[0];
    const finalMoney = Math.floor(baseMoney * (1 + moneyBonus));
    const finalXp = Math.floor(job.xp * (1 + xpBonus));

    // Debug logging for money calculation
    console.log(`Job: ${job.name}, Base: $${baseMoney}, Money Bonus: ${(moneyBonus * 100).toFixed(1)}%, Final: $${finalMoney}`);

    gameState.stats.totalMoneyEarned += finalMoney;
    gameState.stats.jobsCompleted += 1;

    const newXp = gameState.player.xp + finalXp;
    const newRespect = gameState.player.respect + job.respect;
    let newLevel = gameState.player.level;
    let newXpToNext = gameState.player.xpToNext;
    let remainingXp = newXp;

    while (remainingXp >= newXpToNext) {
      remainingXp -= newXpToNext;
      newLevel++;
      newXpToNext = Math.floor(newXpToNext * 1.5);
    }

    if (newLevel > gameState.player.level) {
      addNotification(`Level up! You're now level ${newLevel}!`, 'levelup');
      addNewsItem(`🎉 You reached level ${newLevel}! (+10 max energy)`, 'level');
      gameState.player.maxEnergy += 10;
    }

    gameState.player.level = newLevel;
    gameState.player.xp = remainingXp;
    gameState.player.xpToNext = newXpToNext;
    gameState.player.money += finalMoney;
    gameState.player.respect = newRespect;

    // Give XP to assigned crew member
    if (assignedCrew) {
      const crewXpGain = Math.floor(finalXp * 0.5); // Crew gets 50% of job XP
      assignedCrew.xp += crewXpGain;

      // Check for crew level up
      while (assignedCrew.xp >= assignedCrew.xpToNext && assignedCrew.level < 10) {
        assignedCrew.xp -= assignedCrew.xpToNext;
        assignedCrew.level++;
        assignedCrew.xpToNext = Math.floor(assignedCrew.xpToNext * 1.3);

        // Increase crew bonuses by 10% per level
        Object.keys(assignedCrew.bonus).forEach(key => {
          if (key !== 'income') { // Don't scale passive income
            assignedCrew.bonus[key] = Math.round(assignedCrew.bonus[key] * 1.10 * 100) / 100;
          }
        });

        addNotification(`${assignedCrew.name} leveled up to ${assignedCrew.level}!`, 'levelup');
      }

      assignedCrew.onJob = false; // Free up crew member
      showMessage(`${assignedCrew.name} completed ${job.name}! Earned $${finalMoney}, gained ${crewXpGain} XP`, 'success');
    } else {
      showMessage(`${job.name} complete! Earned $${finalMoney} and ${finalXp} XP`, 'success');
    }

    // Add to history
    addToJobHistory({
      name: job.name,
      success: true,
      money: finalMoney,
      xp: finalXp,
      respect: job.respect,
      timestamp: Date.now(),
      type: 'normal'
    });

    // Add news item
    if (assignedCrew) {
      addNewsItem(`${assignedCrew.name} successfully completed "${job.name}" earning $${finalMoney.toLocaleString()}`, 'success');
    } else {
      addNewsItem(`You successfully completed "${job.name}" earning $${finalMoney.toLocaleString()}`, 'success');
    }
  } else {
    gameState.stats.jobsFailed += 1;

    // Free up assigned crew member on failure
    if (assignedCrew) {
      assignedCrew.onJob = false;
      showMessage(`${assignedCrew.name} failed ${job.name}! Better luck next time...`, 'error');
    } else {
      showMessage(`${job.name} failed! Better luck next time...`, 'error');
    }

    // Add to history
    addToJobHistory({
      name: job.name,
      success: false,
      money: 0,
      xp: 0,
      respect: 0,
      timestamp: Date.now(),
      type: 'normal'
    });
  }

  // Remove completed job from activeJobs
  const jobIndex = gameState.activeJobs.indexOf(activeJob);
  if (jobIndex > -1) {
    gameState.activeJobs.splice(jobIndex, 1);
  }

  checkAchievements();
  saveGame();
  render();
}

function recruitCrew(member) {
  if (gameState.player.money < member.cost) {
    showMessage('Not enough money!', 'error');
    return;
  }

  if (gameState.player.respect < member.respect) {
    showMessage(`You need ${member.respect} respect to recruit this person`, 'error');
    return;
  }

  gameState.player.money -= member.cost;

  // Add crew leveling properties and independent energy
  const crewMember = {
    ...member,
    level: 1,
    xp: 0,
    xpToNext: 100,
    onJob: false,
    energy: 100,
    maxEnergy: 100,
    lastEnergyUpdate: Date.now()
  };

  gameState.crew.push(crewMember);
  showMessage(`${member.name} joined your crew!`, 'success');
  checkAchievements();
  saveGame();
  render();
}

// Energy Recovery Activities
function doRecoveryActivity(activityType) {
  const activities = {
    quickRest: { energy: 5, cooldown: 30 * 60 * 1000, name: 'Quick Rest', cost: 0 },
    takeBreak: { energy: 15, cooldown: 90 * 60 * 1000, name: 'Take a Break', cost: 0 },
    fullRest: { energy: 30, cooldown: 180 * 60 * 1000, name: 'Full Rest', cost: 0 },
    luxuryRest: { energy: 75, cooldown: 360 * 60 * 1000, name: 'Luxury Rest', cost: 100, requiresProperty: true }
  };

  const activity = activities[activityType];
  if (!activity) return;

  // Check cooldown
  const lastUsed = gameState.energyRecovery[activityType];
  if (lastUsed) {
    const timeElapsed = Date.now() - lastUsed;
    if (timeElapsed < activity.cooldown) {
      const timeLeft = Math.ceil((activity.cooldown - timeElapsed) / 1000 / 60);
      showMessage(`${activity.name} on cooldown! ${timeLeft} minutes remaining.`, 'error');
      return;
    }
  }

  // Check if property is required
  if (activity.requiresProperty && gameState.properties.length === 0) {
    showMessage('You need to own a property to use Luxury Rest!', 'error');
    return;
  }

  // Check cost
  if (activity.cost > 0 && gameState.player.money < activity.cost) {
    showMessage(`Not enough money! ${activity.name} costs $${activity.cost}`, 'error');
    return;
  }

  // Apply recovery
  if (activity.cost > 0) {
    gameState.player.money -= activity.cost;
  }

  const energyGained = Math.min(activity.energy, gameState.player.maxEnergy - gameState.player.energy);
  gameState.player.energy = Math.min(gameState.player.maxEnergy, gameState.player.energy + activity.energy);

  gameState.energyRecovery[activityType] = Date.now();

  showMessage(`${activity.name} complete! Recovered ${energyGained} energy.`, 'success');
  saveGame();
  render();
}

function getRecoveryCooldown(activityType) {
  const activities = {
    quickRest: { cooldown: 30 * 60 * 1000 },
    takeBreak: { cooldown: 90 * 60 * 1000 },
    fullRest: { cooldown: 180 * 60 * 1000 },
    luxuryRest: { cooldown: 360 * 60 * 1000 }
  };

  const lastUsed = gameState.energyRecovery[activityType];
  if (!lastUsed) return null;

  const timeElapsed = Date.now() - lastUsed;
  const cooldown = activities[activityType].cooldown;

  if (timeElapsed >= cooldown) return null;

  const timeLeft = Math.ceil((cooldown - timeElapsed) / 1000 / 60);
  return timeLeft;
}

function buyEquipment(itemId) {
  // Find the item by ID from availableEquipment
  const item = availableEquipment.find(e => e.id === itemId);
  if (!item) {
    showMessage('Item not found!', 'error');
    return;
  }

  if (gameState.player.money < item.cost) {
    showMessage('Not enough money!', 'error');
    return;
  }

  gameState.player.money -= item.cost;
  gameState.equipment.push(item);
  showMessage(`Purchased ${item.name}!`, 'success');
  checkAchievements();
  saveGame();
  render();
}

function buyProperty(propertyId) {
  // Find the property by ID from availableProperties
  const property = availableProperties.find(p => p.id === propertyId);
  if (!property) {
    showMessage('Property not found!', 'error');
    return;
  }

  if (gameState.player.money < property.cost) {
    showMessage('Not enough money!', 'error');
    return;
  }

  gameState.player.money -= property.cost;
  gameState.properties.push(property);
  showMessage(`Acquired ${property.name}!`, 'success');
  checkAchievements();
  saveGame();
  render();
}

function toggleCategory(category) {
  gameState.expandedCategories[category] = !gameState.expandedCategories[category];
  render();
}

function checkAchievements() {
  achievementDefs.forEach(def => {
    if (!gameState.achievements.includes(def.id) && def.check()) {
      gameState.achievements.push(def.id);
      addNotification(`${def.icon} Achievement Unlocked: ${def.name}!`, 'achievement');
    }
  });
}

// Timers
setInterval(() => {
  const now = Date.now();
  let changed = false;

  // Player energy recovery
  const minutesPassed = Math.floor((now - gameState.player.lastEnergyUpdate) / 60000);

  if (minutesPassed > 0 && gameState.player.energy < gameState.player.maxEnergy) {
    const newEnergy = Math.min(gameState.player.maxEnergy, gameState.player.energy + minutesPassed);
    gameState.player.energy = newEnergy;
    gameState.player.lastEnergyUpdate = now;
    changed = true;
  }

  // Crew energy recovery
  gameState.crew.forEach(member => {
    if (!member.lastEnergyUpdate) member.lastEnergyUpdate = now;
    if (member.energy === undefined || member.energy === null) member.energy = 100;
    if (!member.maxEnergy) member.maxEnergy = 100;

    const crewMinutesPassed = Math.floor((now - member.lastEnergyUpdate) / 60000);
    if (crewMinutesPassed > 0 && member.energy < member.maxEnergy) {
      const newCrewEnergy = Math.min(member.maxEnergy, member.energy + crewMinutesPassed);
      member.energy = newCrewEnergy;
      member.lastEnergyUpdate = now;
      changed = true;
    }
  });

  if (changed) {
    saveGame();
    render();
  }
}, 10000);

setInterval(() => {
  const propertyIncomePerHour = gameState.properties.reduce((sum, prop) => sum + prop.income, 0);
  const crewIncomePerHour = gameState.crew.reduce((sum, member) => sum + (member.bonus.income || 0), 0);
  const totalIncomePerHour = propertyIncomePerHour + crewIncomePerHour;

  // This runs every minute, so divide hourly rate by 60 to get per-minute income
  const incomeThisMinute = Math.floor(totalIncomePerHour / 60);

  if (incomeThisMinute > 0) {
    gameState.player.money += incomeThisMinute;
    showMessage(`Passive income: $${incomeThisMinute} ($${totalIncomePerHour}/hr rate)`, 'success');
    saveGame();
    render();
  }
}, 60000);

// Update progress for all active jobs
setInterval(() => {
  if (gameState.activeJobs.length === 0) return;

  const now = Date.now();
  let needsFullRender = false;

  gameState.activeJobs.forEach(activeJob => {
    const elapsed = now - activeJob.startTime;
    const progress = Math.min((elapsed / activeJob.duration) * 100, 100);

    if (progress >= 100) {
      completeJob(activeJob);
      needsFullRender = true;
    } else {
      activeJob.progress = progress;
      // Don't call full render - only update if on jobs tab
      if (gameState.activeTab === 'jobs') {
        needsFullRender = true;
      }
    }
  });

  // Only render if on jobs tab OR if a job completed
  if (needsFullRender) {
    render();
  }
}, 1000); // 1000ms = 1 time per second

// Update energy recovery cooldowns every minute
setInterval(() => {
  // Check if any cooldowns need updating and we're on dashboard
  if (gameState.activeTab === 'dashboard') {
    const hasCooldowns = Object.values(gameState.energyRecovery).some(timestamp => timestamp !== null);
    if (hasCooldowns) {
      render();
    }
  }
}, 60000); // Check every minute

// Rendering Functions
function renderNotifications() {
  const container = document.getElementById('notifications');

  const colorClasses = {
    success: 'bg-green-950 border-green-500 text-green-300',
    error: 'bg-red-950 border-red-500 text-red-300',
    levelup: 'bg-purple-950 border-purple-500 text-purple-300',
    achievement: 'bg-yellow-950 border-yellow-500 text-yellow-300',
    info: 'bg-blue-950 border-blue-500 text-blue-300'
  };

  const icons = {
    success: '✓',
    error: '⚠️',
    levelup: '📈',
    achievement: '🏆',
    info: 'ℹ️'
  };

  const labels = {
    success: 'SUCCESS',
    error: 'FAILED',
    levelup: 'LEVEL UP',
    achievement: 'ACHIEVEMENT',
    info: 'INFO'
  };

  // Only update if notifications changed - check existing notification IDs
  const existingIds = Array.from(container.children).map(el => el.dataset.notificationId);
  const currentIds = gameState.notifications.map(n => n.id);

  // If IDs match, don't re-render (prevents flashing)
  if (existingIds.length === currentIds.length &&
      existingIds.every((id, i) => id == currentIds[i])) {
    return;
  }

  container.innerHTML = gameState.notifications.map(notification => {
    return `
      <div data-notification-id="${notification.id}" class="p-4 border-l-4 shadow-lg animate-slide-in-right ${colorClasses[notification.type] || colorClasses.info}">
        <div class="flex items-center gap-2">
          <span>${icons[notification.type]}</span>
          <span class="font-bold">${labels[notification.type]}</span>
        </div>
        <p class="mt-1 text-sm">&gt; ${notification.msg}</p>
      </div>
    `;
  }).join('');
}

function getPlayerTitle() {
  const level = gameState.player.level;
  if (level >= 50) return { title: 'Godfather', color: 'text-red-500', icon: '👑' };
  if (level >= 40) return { title: 'Don', color: 'text-red-400', icon: '💎' };
  if (level >= 30) return { title: 'Underboss', color: 'text-purple-400', icon: '⭐' };
  if (level >= 25) return { title: 'Capo', color: 'text-purple-300', icon: '🎖️' };
  if (level >= 20) return { title: 'Caporegime', color: 'text-blue-400', icon: '🏅' };
  if (level >= 15) return { title: 'Soldier', color: 'text-blue-300', icon: '⚔️' };
  if (level >= 10) return { title: 'Made Man', color: 'text-cyan-400', icon: '🔫' };
  if (level >= 5) return { title: 'Associate', color: 'text-green-400', icon: '🤝' };
  return { title: 'Nobody', color: 'text-gray-400', icon: '👤' };
}

function recalculateMaxEnergy() {
  // Start with base energy (100) + level bonuses (10 per level up)
  let baseEnergy = 100 + ((gameState.player.level - 1) * 10);

  // Add energy bonuses from crew
  let totalEnergyBonus = 0;
  gameState.crew.forEach(member => {
    if (member.bonus.energy) totalEnergyBonus += member.bonus.energy;
  });

  // Add energy bonuses from equipment
  gameState.equipment.forEach(item => {
    if (item.bonus && item.bonus.energy) totalEnergyBonus += item.bonus.energy;
  });

  // Set the new maxEnergy
  gameState.player.maxEnergy = baseEnergy + totalEnergyBonus;

  // Ensure current energy doesn't exceed maxEnergy
  if (gameState.player.energy > gameState.player.maxEnergy) {
    gameState.player.energy = gameState.player.maxEnergy;
  }
}

function renderPlayerStats() {
  // Recalculate maxEnergy before rendering
  recalculateMaxEnergy();

  // Calculate energy bonus from crew/equipment only (not including level bonuses)
  let crewEquipmentEnergyBonus = 0;
  gameState.crew.forEach(member => {
    if (member.bonus.energy) crewEquipmentEnergyBonus += member.bonus.energy;
  });
  gameState.equipment.forEach(item => {
    if (item.bonus && item.bonus.energy) crewEquipmentEnergyBonus += item.bonus.energy;
  });

  const stats = document.getElementById('playerStats');
  const heatColor = gameState.player.heat >= 80 ? 'text-red-500' : gameState.player.heat >= 50 ? 'text-red-400' : gameState.player.heat >= 20 ? 'text-orange-400' : 'text-yellow-400';
  const heatBg = gameState.player.heat >= 80 ? 'bg-red-600' : gameState.player.heat >= 50 ? 'bg-red-500' : gameState.player.heat >= 20 ? 'bg-orange-500' : 'bg-yellow-500';
  const playerTitle = getPlayerTitle();

  stats.innerHTML = `
    <div class="bg-zinc-900 p-3 border border-zinc-800">
      <div class="text-xs text-gray-400 uppercase">LVL ${gameState.player.level} ${playerTitle.icon}</div>
      <div class="text-lg font-bold ${playerTitle.color}">${playerTitle.title}</div>
      <div class="text-xs text-gray-500 mt-1">${gameState.player.xp}/${gameState.player.xpToNext} XP</div>
      <div class="w-full bg-zinc-800 h-1 mt-1">
        <div class="bg-yellow-600 h-1" style="width: ${(gameState.player.xp / gameState.player.xpToNext) * 100}%"></div>
      </div>
    </div>
    <div class="bg-zinc-900 p-3 border border-zinc-800">
      <div class="text-xs text-gray-400 uppercase">Cash</div>
      <div class="text-lg font-bold text-green-400">$${Math.floor(gameState.player.money).toLocaleString()}</div>
    </div>
    <div class="bg-zinc-900 p-3 border border-zinc-800">
      <div class="text-xs text-gray-400 uppercase">Rep</div>
      <div class="text-lg font-bold text-purple-400">${gameState.player.respect}</div>
    </div>
    <div class="bg-zinc-900 p-3 border border-zinc-800">
      <div class="text-xs text-gray-400 uppercase">Energy</div>
      <div class="text-lg font-bold text-cyan-400">${Math.floor(gameState.player.energy)}/${Math.floor(gameState.player.maxEnergy)}</div>
      ${crewEquipmentEnergyBonus > 0 || (gameState.player.level - 1) * 10 > 0 ? `<div class="text-xs text-gray-500">+${crewEquipmentEnergyBonus} gear, +${(gameState.player.level - 1) * 10} levels</div>` : ''}
      <div class="w-full bg-zinc-800 h-1 mt-1">
        <div class="bg-cyan-600 h-1" style="width: ${(gameState.player.energy / gameState.player.maxEnergy) * 100}%"></div>
      </div>
    </div>
    <div class="bg-zinc-900 p-3 border ${gameState.player.heat >= 80 ? 'border-red-500 animate-pulse' : 'border-zinc-800'} cursor-help" title="HEAT: Police attention level&#10;&#10;0-20: Safe&#10;20-50: Moderate risk&#10;50-80: High risk - increased job failures&#10;80-100: CRITICAL - raids possible!&#10;&#10;Heat decays 1 point per 5 minutes. Use Black Market bribes to reduce heat faster.">
      <div class="text-xs text-gray-400 uppercase">Heat 🚨${gameState.player.heat >= 80 ? ' ⚠️ CRITICAL' : gameState.player.heat >= 50 ? ' ⚠️ HIGH' : ''}</div>
      <div class="text-lg font-bold ${heatColor}">${gameState.player.heat}/100</div>
      <div class="w-full bg-zinc-800 h-1 mt-1">
        <div class="${heatBg} h-1" style="width: ${gameState.player.heat}%"></div>
      </div>
    </div>
    <div class="bg-zinc-900 p-3 border border-zinc-800 cursor-help" title="INTEL: Intelligence points used to unlock high-value advanced jobs. Gather intel through various covert operations.">
      <div class="text-xs text-gray-400 uppercase">Intel 🕵️</div>
      <div class="text-lg font-bold text-blue-400">${gameState.player.intel}</div>
    </div>
  `;
}

function renderNavigation() {
  const nav = document.getElementById('navTabs');
  const tabs = [
    { id: 'dashboard', icon: '📈', label: 'OVERVIEW' },
    { id: 'jobs', icon: '💼', label: 'JOBS' },
    { id: 'intel', icon: '🕵️', label: 'INTEL', locked: gameState.player.level < 3, unlockLevel: 3 },
    { id: 'advancedJobs', icon: '🎯', label: 'ADVANCED', locked: gameState.player.level < 5, unlockLevel: 5 },
    { id: 'warroom', icon: '⚔️', label: 'WAR ROOM', locked: gameState.player.level < 8, unlockLevel: 8 },
    { id: 'blackmarket', icon: '🎭', label: 'BLACK MARKET', locked: gameState.player.level < 6, unlockLevel: 6 },
    { id: 'crew', icon: '👥', label: 'CREW' },
    { id: 'equipment', icon: '🛒', label: 'GEAR' },
    { id: 'properties', icon: '🏢', label: 'FRONTS' }
  ];

  nav.innerHTML = tabs.map(tab => {
    const isLocked = tab.locked === true;
    const isActive = gameState.activeTab === tab.id;

    return `
      <button
        onclick="gameState.activeTab = '${tab.id}'; render();"
        ${isLocked ? 'disabled' : ''}
        class="flex items-center gap-2 px-4 py-2 font-bold transition uppercase text-sm border ${
          isLocked
            ? 'bg-zinc-950 text-gray-600 border-zinc-800 cursor-not-allowed opacity-60'
            : isActive
              ? 'bg-red-600 text-white border-red-500'
              : 'bg-zinc-900 text-gray-400 border-zinc-800 hover:bg-zinc-800 hover:text-gray-400'
        }"
        title="${isLocked ? `Unlocks at Level ${tab.unlockLevel}` : ''}"
      >
        <span>${tab.icon}</span>
        ${tab.label}
        ${isLocked ? ` 🔒` : ''}
      </button>
    `;
  }).join('');
}

function renderDashboard() {
  let html = '';

  // Empire Overview
  html += `
    <div class="bg-zinc-950 p-6 border-2 border-zinc-800 mb-4">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl">🏢</span>
        <h2 class="text-xl font-bold text-red-500 uppercase tracking-wide">// EMPIRE OVERVIEW</h2>
      </div>
      <div class="grid md:grid-cols-4 gap-4">
        <div class="bg-black p-4 border border-zinc-800">
          <div class="flex items-center gap-2 mb-2">
            <span>👥</span>
            <h3 class="font-bold text-yellow-500 text-sm uppercase">Crew</h3>
          </div>
          <p class="text-4xl font-bold text-white">${gameState.crew.length}</p>
          <p class="text-xs text-gray-400 uppercase mt-1">soldiers</p>
        </div>
        <div class="bg-black p-4 border border-zinc-800">
          <div class="flex items-center gap-2 mb-2">
            <span>🛒</span>
            <h3 class="font-bold text-yellow-500 text-sm uppercase">Arsenal</h3>
          </div>
          <p class="text-4xl font-bold text-white">${gameState.equipment.length}</p>
          <p class="text-xs text-gray-400 uppercase mt-1">items</p>
        </div>
        <div class="bg-black p-4 border border-zinc-800">
          <div class="flex items-center gap-2 mb-2">
            <span>🏢</span>
            <h3 class="font-bold text-yellow-500 text-sm uppercase">Fronts</h3>
          </div>
          <p class="text-4xl font-bold text-white">${gameState.properties.length}</p>
          <p class="text-xs text-gray-400 uppercase mt-1">laundering</p>
        </div>
        <div class="bg-black p-4 border border-zinc-800">
          <div class="flex items-center gap-2 mb-2">
            <span>🏆</span>
            <h3 class="font-bold text-yellow-500 text-sm uppercase">Achievements</h3>
          </div>
          <p class="text-4xl font-bold text-white">${gameState.achievements.length}/10</p>
          <p class="text-xs text-gray-400 uppercase mt-1">unlocked</p>
        </div>
      </div>
      ${gameState.properties.length > 0 ? `
        <div class="mt-4 p-4 bg-green-950 bg-opacity-30 border-l-4 border-green-600">
          <p class="text-green-400 font-bold uppercase text-sm">
            ► Passive Income: $${gameState.properties.reduce((sum, p) => sum + p.income, 0) + gameState.crew.reduce((sum, m) => sum + (m.bonus.income || 0), 0)}/hr
          </p>
        </div>
      ` : ''}
    </div>
  `;

  // Energy Recovery Activities
  const recoveryActivities = [
    { id: 'quickRest', name: 'Quick Rest', energy: 5, cooldown: 30, icon: '☕', cost: 0, requiresProperty: false, desc: 'Quick power nap' },
    { id: 'takeBreak', name: 'Take a Break', energy: 15, cooldown: 90, icon: '🍔', cost: 0, requiresProperty: false, desc: 'Grab some food and relax' },
    { id: 'fullRest', name: 'Full Rest', energy: 30, cooldown: 180, icon: '🛏️', cost: 0, requiresProperty: false, desc: 'Get a good sleep' },
    { id: 'luxuryRest', name: 'Luxury Rest', energy: 75, cooldown: 360, icon: '🏖️', cost: 100, requiresProperty: true, desc: 'Luxury spa day (any property)' }
  ];

  html += `
    <div class="bg-zinc-950 p-6 border-2 border-green-800 mb-4">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl">⚡</span>
        <h2 class="text-xl font-bold text-green-500 uppercase tracking-wide">// ENERGY RECOVERY</h2>
      </div>
      <p class="text-sm text-gray-400 mb-4">Take a break to recover energy. Each activity has a cooldown.</p>
      <div class="grid md:grid-cols-2 gap-3">
        ${recoveryActivities.map(activity => {
          const cooldownLeft = getRecoveryCooldown(activity.id);
          const isAvailable = cooldownLeft === null;
          const canAfford = activity.cost === 0 || gameState.player.money >= activity.cost;
          const hasProperty = !activity.requiresProperty || gameState.properties.length > 0;
          const canUse = isAvailable && canAfford && hasProperty;

          return `
            <button
              onclick="doRecoveryActivity('${activity.id}')"
              class="p-4 border-2 text-left transition ${
                canUse
                  ? 'bg-green-950 bg-opacity-30 border-green-600 hover:bg-green-900 hover:border-green-500'
                  : 'bg-zinc-900 border-zinc-700 opacity-50 cursor-not-allowed'
              }"
              ${!canUse ? 'disabled' : ''}
            >
              <div class="flex items-start gap-3">
                <span class="text-3xl">${activity.icon}</span>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold ${canUse ? 'text-green-400' : 'text-gray-500'} uppercase text-sm">${activity.name}</h3>
                    ${activity.requiresProperty ? '<span class="text-xs px-1 py-0.5 bg-purple-900 text-purple-300 border border-purple-700 rounded">PROPERTY</span>' : ''}
                  </div>
                  <p class="text-xs text-gray-400 mb-2">${activity.desc}</p>
                  <div class="flex items-center gap-4 text-xs">
                    <span class="${canUse ? 'text-green-400' : 'text-gray-500'} font-bold">+${activity.energy} ⚡</span>
                    ${activity.cost > 0 ? `<span class="${canAfford ? 'text-yellow-400' : 'text-red-400'} font-bold">$${activity.cost}</span>` : ''}
                    <span class="text-gray-500">${activity.cooldown} min cooldown</span>
                  </div>
                  ${!isAvailable ? `
                    <div class="mt-2 text-xs text-orange-400 font-bold">
                      ⏱️ ${cooldownLeft} minute${cooldownLeft > 1 ? 's' : ''} remaining
                    </div>
                  ` : ''}
                  ${!hasProperty && activity.requiresProperty ? `
                    <div class="mt-2 text-xs text-red-400 font-bold">
                      🏢 Requires property ownership
                    </div>
                  ` : ''}
                </div>
              </div>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Statistics
  const successRate = gameState.stats.jobsCompleted + gameState.stats.jobsFailed > 0
    ? Math.floor((gameState.stats.jobsCompleted / (gameState.stats.jobsCompleted + gameState.stats.jobsFailed)) * 100)
    : 0;
  
  // Calculate total bonuses from crew and equipment
  let totalSuccessBonus = 0;
  let totalMoneyBonus = 0;
  let totalXpBonus = 0;
  let totalEnergyBonus = 0;

  gameState.crew.forEach(member => {
    if (member.bonus.successRate) totalSuccessBonus += member.bonus.successRate;
    if (member.bonus.money) totalMoneyBonus += member.bonus.money;
    if (member.bonus.xp) totalXpBonus += member.bonus.xp;
    if (member.bonus.energy) totalEnergyBonus += member.bonus.energy;
  });

  gameState.equipment.forEach(item => {
    if (item.bonus && item.bonus.successRate) totalSuccessBonus += item.bonus.successRate;
    if (item.bonus && item.bonus.money) totalMoneyBonus += item.bonus.money;
    if (item.bonus && item.bonus.xp) totalXpBonus += item.bonus.xp;
    if (item.bonus && item.bonus.energy) totalEnergyBonus += item.bonus.energy;
  });

  // Convert to percentage for display
  const totalSuccessBonusPercent = (totalSuccessBonus * 100).toFixed(1);
    
  html += `
    <div class="bg-zinc-950 p-6 border-2 border-zinc-800 mb-4">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl">📈</span>
        <h3 class="text-lg font-bold text-red-500 uppercase">// CAREER STATISTICS</h3>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-black p-4 border border-zinc-800">
          <p class="text-sm text-gray-400 uppercase mb-2">Total Money Earned</p>
          <p class="text-3xl font-bold text-green-400">$${gameState.stats.totalMoneyEarned.toLocaleString()}</p>
        </div>
        <div class="bg-black p-4 border border-zinc-800">
          <p class="text-sm text-gray-400 uppercase mb-2">Jobs Completed</p>
          <p class="text-3xl font-bold text-blue-400">${gameState.stats.jobsCompleted}</p>
        </div>
        <div class="bg-black p-4 border border-zinc-800">
          <p class="text-sm text-gray-400 uppercase mb-2">Jobs Failed</p>
          <p class="text-3xl font-bold text-red-400">${gameState.stats.jobsFailed}</p>
        </div>
        <div class="bg-black p-4 border border-zinc-800">
          <p class="text-sm text-gray-400 uppercase mb-2">Success Rate</p>
          <p class="text-3xl font-bold text-purple-400">${successRate}%</p>
        </div>
      </div>
      
      ${totalSuccessBonus > 0 || totalMoneyBonus > 0 || totalXpBonus > 0 || totalEnergyBonus > 0 ? `
        <div class="mt-4 p-4 bg-yellow-950 bg-opacity-30 border-l-4 border-yellow-600">
          <h4 class="text-sm font-bold text-yellow-500 uppercase mb-3">// EQUIPMENT & CREW BONUSES</h4>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            ${totalSuccessBonus > 0 ? `
              <div class="bg-black p-3 border border-zinc-800">
                <p class="text-gray-400 uppercase mb-1">Success Rate Boost</p>
                <p class="text-xl font-bold text-yellow-400">+${totalSuccessBonusPercent}%</p>
              </div>
            ` : ''}
            ${totalMoneyBonus > 0 ? `
              <div class="bg-black p-3 border border-zinc-800">
                <p class="text-gray-400 uppercase mb-1">Money Boost</p>
                <p class="text-xl font-bold text-green-400">+${Math.floor(totalMoneyBonus * 100)}%</p>
              </div>
            ` : ''}
            ${totalXpBonus > 0 ? `
              <div class="bg-black p-3 border border-zinc-800">
                <p class="text-gray-400 uppercase mb-1">XP Boost</p>
                <p class="text-xl font-bold text-purple-400">+${Math.floor(totalXpBonus * 100)}%</p>
              </div>
            ` : ''}
            ${totalEnergyBonus > 0 ? `
              <div class="bg-black p-3 border border-zinc-800">
                <p class="text-gray-400 uppercase mb-1">Max Energy Boost</p>
                <p class="text-xl font-bold text-cyan-400">+${Math.round(totalEnergyBonus * 100) / 100}</p>
                <p class="text-xs text-gray-500 mt-1">(+${(gameState.player.level - 1) * 10} from levels)</p>
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  // Achievements
  html += `
    <div class="bg-zinc-950 p-6 border-2 border-zinc-800">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl">🏆</span>
        <h3 class="text-lg font-bold text-red-500 uppercase">// ACHIEVEMENTS (${gameState.achievements.length}/10)</h3>
      </div>
      <div class="grid md:grid-cols-2 gap-3">
        ${achievementDefs.map(def => {
          const unlocked = gameState.achievements.includes(def.id);
          return `
            <div class="p-4 border-2 transition ${
              unlocked
                ? 'bg-yellow-950 bg-opacity-30 border-yellow-600'
                : 'bg-zinc-900 border-zinc-800 opacity-50'
            }">
              <div class="flex items-center gap-3">
                <span class="text-3xl">${def.icon}</span>
                <div class="flex-1">
                  <h4 class="font-bold text-sm uppercase ${unlocked ? 'text-yellow-400' : 'text-gray-500'}">
                    ${def.name}
                  </h4>
                  <p class="text-xs text-gray-400 mt-1">${def.description}</p>
                  ${unlocked ? `
                    <div class="flex items-center gap-1 mt-2">
                      <span class="text-xs">✓</span>
                      <span class="text-xs text-green-500 font-bold uppercase">Unlocked</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  
  return html;
}

function renderJobs() {
  const totalSlots = 1 + gameState.crew.length; // 1 for player + all crew members
  const usedSlots = gameState.activeJobs.length;

  let html = '';

  // Active Jobs Section
  if (gameState.activeJobs.length > 0) {
    html += `
      <div class="bg-gradient-to-r from-cyan-950 to-cyan-900 border-2 border-cyan-500 p-4 mb-4">
        <h2 class="text-lg font-bold text-cyan-400 uppercase mb-3">⚡ ACTIVE JOBS (${usedSlots}/${totalSlots} slots)</h2>
        <div class="space-y-2">
          ${gameState.activeJobs.map(activeJob => {
            // Handle both regular jobs (activeJob.job) and advanced jobs (job data directly in activeJob)
            const job = activeJob.job || activeJob;
            const assignedTo = activeJob.assignedTo;
            const assignedName = assignedTo === 'player' ? 'You' : gameState.crew.find(c => c.id === assignedTo)?.name || 'Unknown';
            const assignedIcon = assignedTo === 'player' ? '👤' : (gameState.crew.find(c => c.id === assignedTo)?.role === 'elite' ? '👑' : gameState.crew.find(c => c.id === assignedTo)?.role === 'muscle' ? '💪' : gameState.crew.find(c => c.id === assignedTo)?.role === 'specialist' ? '🎯' : '🤝');

            // Calculate progress: regular jobs have .progress, advanced jobs need to calculate from startTime/endTime
            let progress;
            if (activeJob.progress !== undefined) {
              progress = activeJob.progress;
            } else if (activeJob.startTime && activeJob.endTime) {
              const elapsed = Date.now() - activeJob.startTime;
              const total = activeJob.endTime - activeJob.startTime;
              progress = Math.min(100, (elapsed / total) * 100);
            } else {
              progress = 0;
            }

            return `
              <div class="bg-black p-3 border border-cyan-600">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">${assignedIcon}</span>
                    <div>
                      <h3 class="font-bold text-white text-sm">${job.name}</h3>
                      <p class="text-xs text-gray-400">${assignedName} is working...</p>
                    </div>
                  </div>
                </div>
                <div class="w-full bg-zinc-800 h-2 border border-cyan-600">
                  <div class="bg-cyan-500 h-full transition-all duration-100" style="width: ${progress}%"></div>
                </div>
                <p class="text-xs text-cyan-400 mt-1">⚡ ${Math.floor(progress)}% Complete</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  const filteredJobs = jobs.filter(job => {
    if (gameState.jobFilter === 'available') return gameState.player.level >= job.minLevel;
    if (gameState.jobFilter === 'locked') return gameState.player.level < job.minLevel;
    return true;
  }).sort((a, b) => {
    if (gameState.jobSort === 'level') return a.minLevel - b.minLevel;
    if (gameState.jobSort === 'payout') return b.money[1] - a.money[1];
    if (gameState.jobSort === 'risk') {
      const riskOrder = { 'low': 1, 'medium': 2, 'high': 3, 'very high': 4, 'extreme': 5 };
      return (riskOrder[a.risk] || 0) - (riskOrder[b.risk] || 0);
    }
    return 0;
  });

  html += `
    <div class="bg-blue-950 bg-opacity-30 border-2 border-blue-800 p-4 mb-4">
      <div class="flex items-start gap-3">
        <span class="text-2xl">ℹ️</span>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-blue-400 uppercase mb-1">How Success Rates Work</h3>
          <p class="text-xs text-gray-400 leading-relaxed">
            Each job has a <span class="text-green-400">base success rate</span>. Your crew and equipment provide <span class="text-yellow-400">multiplicative bonuses</span> (e.g., two 5% bonuses = ×1.05 × 1.05 = ×1.1025, not +10%).
            Success rates are <span class="text-red-400">capped at 95%</span> - you can never guarantee success! Hover over success rates to see the breakdown.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-zinc-950 border-2 border-zinc-800 p-4 mb-4">
      <div class="flex flex-wrap gap-4 items-center justify-between">
        <div class="flex items-center gap-2">
          <span>🔍</span>
          <span class="text-sm font-bold text-gray-400 uppercase">Filter:</span>
          <div class="flex gap-2">
            <button onclick="gameState.jobFilter = 'all'; render();" 
              class="px-3 py-1 text-xs font-bold uppercase border transition ${
                gameState.jobFilter === 'all'
                  ? 'bg-yellow-600 text-black border-yellow-500'
                  : 'bg-zinc-900 text-gray-400 border-zinc-700 hover:bg-zinc-800'
              }">
              All (${jobs.length})
            </button>
            <button onclick="gameState.jobFilter = 'available'; render();" 
              class="px-3 py-1 text-xs font-bold uppercase border transition ${
                gameState.jobFilter === 'available'
                  ? 'bg-green-600 text-black border-green-500'
                  : 'bg-zinc-900 text-gray-400 border-zinc-700 hover:bg-zinc-800'
              }">
              Available (${jobs.filter(j => gameState.player.level >= j.minLevel).length})
            </button>
            <button onclick="gameState.jobFilter = 'locked'; render();" 
              class="px-3 py-1 text-xs font-bold uppercase border transition ${
                gameState.jobFilter === 'locked'
                  ? 'bg-red-600 text-black border-red-500'
                  : 'bg-zinc-900 text-gray-400 border-zinc-700 hover:bg-zinc-800'
              }">
              Locked (${jobs.filter(j => gameState.player.level < j.minLevel).length})
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span>↕️</span>
          <span class="text-sm font-bold text-gray-400 uppercase">Sort:</span>
          <div class="flex gap-2">
            <button onclick="gameState.jobSort = 'level'; render();" 
              class="px-3 py-1 text-xs font-bold uppercase border transition ${
                gameState.jobSort === 'level'
                  ? 'bg-yellow-600 text-black border-yellow-500'
                  : 'bg-zinc-900 text-gray-400 border-zinc-700 hover:bg-zinc-800'
              }">
              Level
            </button>
            <button onclick="gameState.jobSort = 'payout'; render();" 
              class="px-3 py-1 text-xs font-bold uppercase border transition ${
                gameState.jobSort === 'payout'
                  ? 'bg-green-600 text-black border-green-500'
                  : 'bg-zinc-900 text-gray-400 border-zinc-700 hover:bg-zinc-800'
              }">
              Payout
            </button>
            <button onclick="gameState.jobSort = 'risk'; render();" 
              class="px-3 py-1 text-xs font-bold uppercase border transition ${
                gameState.jobSort === 'risk'
                  ? 'bg-red-600 text-black border-red-500'
                  : 'bg-zinc-900 text-gray-400 border-zinc-700 hover:bg-zinc-800'
              }">
              Risk
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="space-y-2">
      ${filteredJobs.map(job => {
        // Handle both regular jobs (activeJob.job) and advanced jobs (job data directly in activeJob)
        const isActiveJob = gameState.activeJobs.some(activeJob => {
          const activeJobData = activeJob.job || activeJob;
          return activeJobData.id === job.id;
        });

        // Check if at least one slot is available (player or crew)
        const playerBusy = gameState.activeJobs.some(activeJob => activeJob.assignedTo === 'player');
        const availableCrew = gameState.crew.filter(c => !c.onJob);
        const hasAvailableSlot = !playerBusy || availableCrew.length > 0;

        // Check requirements
        const reqCheck = checkJobRequirements(job);

        // Check if player OR any available crew has enough energy
        const playerCanDo = !playerBusy && gameState.player.energy >= job.energy;
        const crewCanDo = availableCrew.some(crew => (crew.energy || 100) >= job.energy);
        const someoneHasEnergy = playerCanDo || crewCanDo;

        const canDoJob = gameState.player.level >= job.minLevel && someoneHasEnergy && hasAvailableSlot && reqCheck.met;

        return `
          <div class="bg-zinc-950 p-4 border border-zinc-800 ${gameState.player.level < job.minLevel ? 'opacity-40' : ''} ${isActiveJob ? 'bg-zinc-900' : ''}">
            <div class="flex flex-wrap gap-4 items-center justify-between">
              <div class="flex-1 min-w-[200px]">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-bold text-white text-sm">${job.name}</h3>
                </div>
                <p class="text-xs text-gray-400 mb-2">${job.description}</p>
                ${job.requirements && (job.requirements.crewType || job.requirements.vehicle) ? `
                  <div class="flex flex-wrap gap-1 mb-2">
                    ${job.requirements.crewType ? job.requirements.crewType.map(spec => {
                      const hasSpec = gameState.crew.some(m => m.specializations && m.specializations.includes(spec));
                      const specDescriptions = {
                        'violent': 'Violent Crew: Street Fighters, Enforcers, Hitmen. Recruit from MUSCLE category.',
                        'stealth': 'Stealth Crew: Cat Burglars, Safecrackers, Snipers. Recruit from SPECIALIST category.',
                        'financial': 'Financial Crew: Hackers, Accountants, Con Artists. Recruit from SPECIALIST/SUPPORT categories.',
                        'political': 'Political Crew: Lawyers, Corrupt Cops, Inside Men. Recruit from SUPPORT category.',
                        'transport': 'Transport Crew: Wheelman, Getaway Drivers, Smugglers. Recruit from SPECIALIST/SUPPORT categories.'
                      };
                      return `<span class="tooltip-wrapper">
                        <span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${getSpecializationColor(spec)} ${!hasSpec ? 'opacity-50' : ''} cursor-help">
                          ${getSpecializationIcon(spec)} ${spec} ${hasSpec ? '✓' : '✗'}
                        </span>
                        <span class="tooltip-content">${specDescriptions[spec] || 'Required crew type'}</span>
                      </span>`;
                    }).join('') : ''}
                    ${job.requirements.vehicle ? `<span class="tooltip-wrapper">
                      <span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${gameState.equipment.some(e => e.category === 'vehicle') ? 'bg-yellow-950 text-yellow-300 border-yellow-700' : 'bg-gray-950 text-gray-500 border-gray-800 opacity-50'} cursor-help">
                        🚗 Vehicle ${gameState.equipment.some(e => e.category === 'vehicle') ? '✓' : '✗'}
                      </span>
                      <span class="tooltip-content">Vehicle Required: Purchase a car, motorcycle, or other vehicle from the GEAR tab</span>
                    </span>` : ''}
                  </div>
                ` : ''}
                <div class="flex items-center gap-3">
                  ${gameState.player.level >= job.minLevel && !isActiveJob ? `
                    ${(() => {
                      // Calculate actual success rate with bonuses (additive)
                      let totalSuccessBonus = 0;
                      gameState.crew.forEach(member => {
                        if (member.bonus.successRate) totalSuccessBonus += member.bonus.successRate;
                      });
                      gameState.equipment.forEach(item => {
                        if (item.bonus && item.bonus.successRate) totalSuccessBonus += item.bonus.successRate;
                      });
                      const bonusedRate = job.successRate + totalSuccessBonus;
                      const finalRate = Math.min(0.95, bonusedRate);
                      const bonusPercent = (totalSuccessBonus * 100).toFixed(1);

                      return `<span class="tooltip-wrapper">
                        <span class="text-xs cursor-help ${finalRate >= 0.95 ? 'text-yellow-400' : bonusedRate > job.successRate ? 'text-green-400' : 'text-green-400'}">
                          ★ ${Math.floor(finalRate * 100)}% Success ${bonusPercent > 0 ? `(+${bonusPercent}%)` : ''}
                        </span>
                        <span class="tooltip-content">Base: ${Math.floor(job.successRate * 100)}% | Bonuses: +${bonusPercent}% | Final: ${Math.floor(finalRate * 100)}% (capped at 95%)</span>
                      </span>`;
                    })()}
                  ` : ''}
                  <div class="flex items-center gap-1 px-2 py-1 border text-xs uppercase font-bold ${getRiskColor(job.risk)}">
                    <span>${getRiskIcon(job.risk)}</span>
                    <span>${job.risk} Risk</span>
                  </div>
                </div>
                ${isActiveJob ? `
                  <div class="mt-2">
                    ${(() => {
                      const activeJob = gameState.activeJobs.find(aj => {
                        const activeJobData = aj.job || aj;
                        return activeJobData.id === job.id;
                      });
                      if (!activeJob) return '';

                      // Calculate progress for both job types
                      let progress;
                      if (activeJob.progress !== undefined) {
                        progress = activeJob.progress;
                      } else if (activeJob.startTime && activeJob.endTime) {
                        const elapsed = Date.now() - activeJob.startTime;
                        const total = activeJob.endTime - activeJob.startTime;
                        progress = Math.min(100, (elapsed / total) * 100);
                      } else {
                        progress = 0;
                      }

                      return `
                        <div class="w-full bg-zinc-800 h-2 border border-cyan-600">
                          <div class="bg-cyan-500 h-full transition-all duration-100" style="width: ${progress}%"></div>
                        </div>
                        <p class="text-xs text-cyan-400 mt-1">⚡ IN PROGRESS... ${Math.floor(progress)}%</p>
                      `;
                    })()}
                  </div>
                ` : ''}
              </div>
              
              <div class="text-center">
                <p class="text-green-400 font-bold text-lg">${job.money[0] === job.money[1] ? `$${job.money[0].toLocaleString()}` : `$${job.money[0].toLocaleString()}-${job.money[1].toLocaleString()}`}</p>
                <p class="text-xs text-gray-400">XP: +${job.xp}</p>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="text-center">
                  <div class="text-cyan-400 font-bold text-lg">${job.energy}</div>
                  <div class="text-xs text-gray-400">Energy</div>
                </div>
                <div class="text-center">
                  <div class="text-gray-300 font-bold text-lg">${Math.floor(job.duration / 1000)}s</div>
                  <div class="text-xs text-gray-400">Duration</div>
                </div>
                ${gameState.player.level < job.minLevel ? `
                  <div class="text-center px-3 py-1 bg-red-900 border border-red-700">
                    <div class="text-red-300 font-bold text-xs">LOCKED</div>
                    <div class="text-xs text-red-400">Need Lvl ${job.minLevel}</div>
                  </div>
                ` : ''}
              </div>
              
              <button
                onclick="doJob(${job.id})"
                ${!canDoJob ? 'disabled' : ''}
                class="px-6 py-3 font-bold text-sm uppercase border-2 transition ${
                  canDoJob
                    ? 'bg-yellow-600 hover:bg-yellow-500 text-black border-yellow-500 cursor-pointer'
                    : 'bg-zinc-900 text-zinc-700 border-zinc-800 cursor-not-allowed'
                }"
              >
                ${isActiveJob ? '⚡ WORKING' : '⚡ DO JOB'}
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  return html;
}

function renderCrew() {
  let html = '<div class="space-y-6">';
  
  // Your Crew
  html += '<div><h2 class="text-xl font-bold text-red-500 uppercase mb-4">// YOUR CREW</h2>';
  
  if (gameState.crew.length === 0) {
    html += `
      <div class="bg-zinc-950 p-8 border-2 border-zinc-800 text-center">
        <div class="mb-4">
          <span class="text-6xl">👤</span>
        </div>
        <p class="text-gray-400 uppercase text-sm">[ NO CREW - YOU'RE SOLO ]</p>
        <p class="text-xs text-gray-500 mt-2">Start recruiting below to boost your success rate</p>
      </div>
    `;
  } else {
    // Crew Summary Stats
    const crewByRole = {
      elite: gameState.crew.filter(m => m.role === 'elite').length,
      muscle: gameState.crew.filter(m => m.role === 'muscle').length,
      specialist: gameState.crew.filter(m => m.role === 'specialist').length,
      support: gameState.crew.filter(m => m.role === 'support').length
    };
    
    html += `
      <div class="bg-gradient-to-r from-zinc-950 to-zinc-900 p-4 border-2 border-yellow-600 mb-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 class="text-lg font-bold text-yellow-500 uppercase">► CREW STRENGTH: ${gameState.crew.length} MEMBERS</h3>
            <p class="text-xs text-gray-400 mt-1">Your organized crime family</p>
          </div>
          <div class="flex gap-4 text-sm font-mono">
            ${crewByRole.elite > 0 ? `<div class="text-center"><div class="text-xl text-red-500">👑</div><div class="text-xs text-gray-400">${crewByRole.elite} Elite</div></div>` : ''}
            ${crewByRole.muscle > 0 ? `<div class="text-center"><div class="text-xl">💪</div><div class="text-xs text-gray-400">${crewByRole.muscle} Muscle</div></div>` : ''}
            ${crewByRole.specialist > 0 ? `<div class="text-center"><div class="text-xl">🎯</div><div class="text-xs text-gray-400">${crewByRole.specialist} Specialist</div></div>` : ''}
            ${crewByRole.support > 0 ? `<div class="text-center"><div class="text-xl">🤝</div><div class="text-xs text-gray-400">${crewByRole.support} Support</div></div>` : ''}
          </div>
        </div>
      </div>
    `;
    
    const roleIcons = {
      elite: '👑',
      muscle: '💪',
      specialist: '🎯',
      support: '🤝'
    };

    const roleColors = {
      elite: 'border-red-600 bg-red-950',
      muscle: 'border-orange-600 bg-orange-950',
      specialist: 'border-blue-600 bg-blue-950',
      support: 'border-purple-600 bg-purple-950'
    };

    const roles = ['elite', 'muscle', 'specialist', 'support'];
    roles.forEach(role => {
      const roleMembers = gameState.crew.filter(m => m.role === role);
      if (roleMembers.length > 0) {
        const isExpanded = gameState.expandedCategories[role];
        html += `
          <div class="bg-zinc-950 border-2 ${roleColors[role]} bg-opacity-30 mb-3">
            <button onclick="toggleCategory('${role}')" class="w-full px-4 py-3 flex justify-between items-center hover:bg-opacity-50 ${roleColors[role]} transition">
              <div class="flex items-center gap-3">
                <span class="text-2xl">${roleIcons[role]}</span>
                <h3 class="text-sm font-bold text-yellow-500 uppercase">${role} (${roleMembers.length})</h3>
              </div>
              <span class="text-yellow-500 text-xl">${isExpanded ? '▼' : '►'}</span>
            </button>
            ${isExpanded ? `
              <div class="p-4 border-t-2 ${roleColors[role].split(' ')[0]}">
                <div class="grid md:grid-cols-3 gap-3">
                  ${roleMembers.map(member => `
                    <div class="bg-black p-4 border-l-4 ${member.onJob ? 'border-red-600' : 'border-green-600'} hover:border-green-400 transition relative">
                      <div class="absolute top-2 right-2 text-xl">${roleIcons[role]}</div>
                      <div class="flex items-start gap-2 mb-2">
                        <span class="${member.onJob ? 'text-red-500' : 'text-green-500'} text-sm">${member.onJob ? '⚠' : '●'}</span>
                        <div class="flex-1">
                          <div class="flex items-center gap-2 mb-1">
                            <h3 class="font-bold text-white uppercase text-sm">${member.name}</h3>
                            <span class="px-2 py-0.5 text-xs font-bold bg-purple-900 text-purple-300 border border-purple-700 rounded">LVL ${member.level}</span>
                          </div>
                          <p class="text-xs ${member.onJob ? 'text-red-400' : 'text-gray-400'} italic">${member.onJob ? '🔧 On a job...' : member.description}</p>
                          ${member.specializations && member.specializations.length > 0 ? `
                            <div class="flex flex-wrap gap-1 mt-2">
                              ${member.specializations.map(spec => {
                                const specDescriptions = {
                                  'violent': 'VIOLENT: Required for combat, shakedowns, and violent jobs',
                                  'stealth': 'STEALTH: Required for sneaky jobs, assassinations, and heists',
                                  'financial': 'FINANCIAL: Required for fraud, scams, and money operations',
                                  'political': 'POLITICAL: Required for corruption, blackmail, and influence jobs',
                                  'transport': 'TRANSPORT: Required for smuggling, deliveries, and vehicle-based jobs'
                                };
                                return `<span class="px-1.5 py-0.5 text-xs font-bold uppercase border rounded ${getSpecializationColor(spec)} cursor-help"
                                              title="${specDescriptions[spec] || spec.toUpperCase()}">
                                  ${getSpecializationIcon(spec)} ${spec}
                                </span>`;
                              }).join('')}
                            </div>
                          ` : ''}
                        </div>
                      </div>
                      ${!member.onJob ? `
                        <div class="w-full bg-zinc-800 h-1 mt-2">
                          <div class="bg-purple-600 h-1" style="width: ${(member.xp / member.xpToNext) * 100}%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">${member.xp}/${member.xpToNext} XP to level ${member.level + 1}</p>
                      ` : ''}
                      <div class="w-full bg-zinc-800 h-2 mt-2">
                        <div class="bg-cyan-600 h-2" style="width: ${((member.energy || 100) / (member.maxEnergy || 100)) * 100}%"></div>
                      </div>
                      <p class="text-xs text-cyan-400 mt-1">⚡ Energy: ${member.energy || 100}/${member.maxEnergy || 100}</p>
                      <div class="text-xs font-mono space-y-1 border-t border-zinc-900 pt-2 mt-2">
                        ${member.bonus.energy ? `<p class="text-cyan-400">▸ +${member.bonus.energy} MAX ENERGY</p>` : ''}
                        ${member.bonus.money ? `<p class="text-green-400">▸ +${Math.floor(member.bonus.money * 100)}% CASH</p>` : ''}
                        ${member.bonus.xp ? `<p class="text-purple-400">▸ +${Math.floor(member.bonus.xp * 100)}% XP</p>` : ''}
                        ${member.bonus.successRate ? `<p class="text-yellow-400">▸ +${(member.bonus.successRate * 100).toFixed(1)}% SUCCESS</p>` : ''}
                        ${member.bonus.income ? `<p class="text-green-500">▸ +$${member.bonus.income}/HR INCOME</p>` : ''}
                      </div>
                      ${member.combat ? `
                        <div class="mt-2 pt-2 border-t border-zinc-900">
                          <p class="text-xs text-gray-400 uppercase font-bold mb-1">⚔️ Combat Stats</p>
                          <div class="text-xs font-mono space-y-1">
                            <div class="flex justify-between items-center">
                              <span class="text-orange-400">Power:</span>
                              <span class="text-orange-300 font-bold">${Math.floor(member.combat.power)} <span class="text-gray-500 text-xs">(10 + ${((member.bonus.successRate || 0) * 1000).toFixed(0)})</span></span>
                            </div>
                            <div class="flex justify-between items-center">
                              <span class="${member.combat.health === member.combat.maxHealth ? 'text-green-400' : 'text-red-400'}">Health:</span>
                              <span class="${member.combat.health === member.combat.maxHealth ? 'text-green-300' : 'text-red-300'} font-bold">${member.combat.health}/${member.combat.maxHealth}</span>
                            </div>
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }
    });
    
    if (gameState.crew.some(member => member.bonus.income)) {
      const crewIncome = gameState.crew.reduce((sum, m) => sum + (m.bonus.income || 0), 0);
      html += `
        <div class="bg-green-950 bg-opacity-30 border-2 border-green-700 p-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">💰</span>
            <p class="text-green-400 font-bold text-sm font-mono">
              ► CREW PASSIVE INCOME: $${crewIncome}/HR
            </p>
          </div>
        </div>
      `;
    }
  }
  
  html += '</div>';
  
  // Recruit Section
  html += `
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-red-500 uppercase">// RECRUIT</h2>
        <div class="text-xs text-gray-400 font-mono">
          <span class="text-yellow-500">${availableCrew.filter(m => !gameState.crew.find(c => c.id === m.id)).length}</span> available to hire
        </div>
      </div>
  `;
  
  const roleIcons = {
    elite: '👑',
    muscle: '💪',
    specialist: '🎯',
    support: '🤝'
  };

  const roleColors = {
    elite: 'border-red-600 bg-red-950',
    muscle: 'border-orange-600 bg-orange-950',
    specialist: 'border-blue-600 bg-blue-950',
    support: 'border-purple-600 bg-purple-950'
  };

  const roleDescriptions = {
    elite: 'Rare, powerful, rule-breakers',
    muscle: 'Frontline enforcers and fighters',
    specialist: 'Growth, bonuses, and weird stuff',
    support: 'Money, logistics, and sustain'
  };

  const roleTaglines = {
    elite: 'Break the rules',
    muscle: 'Win jobs and survive mistakes',
    specialist: 'Level faster and unlock bonuses',
    support: 'Make money and sustain the crew'
  };

  const roleStats = {
    elite: {success: 2, cash: 2, xp: 2, energy: 2},
    muscle: {success: 3, cash: 0, xp: 1, energy: 2},
    specialist: {success: 1, cash: 0, xp: 3, energy: 0},
    support: {success: 1, cash: 3, xp: 0, energy: 2}
  };

  const badgeIcons = {
    enforcer: '💪',
    trainer: '🧠',
    earner: '💰',
    booster: '⭐',
    wildcard: '🎲'
  };

  const badgeColors = {
    enforcer: 'bg-orange-900 text-orange-300 border-orange-700',
    trainer: 'bg-blue-900 text-blue-300 border-blue-700',
    earner: 'bg-green-900 text-green-300 border-green-700',
    booster: 'bg-purple-900 text-purple-300 border-purple-700',
    wildcard: 'bg-red-900 text-red-300 border-red-700'
  };

  const roles = ['elite', 'muscle', 'specialist', 'support'];
  roles.forEach(role => {
    const roleMembers = availableCrew.filter(m => m.role === role && !gameState.crew.find(c => c.id === m.id));
    if (roleMembers.length > 0) {
      const isExpanded = gameState.expandedCategories[role];
      const stats = roleStats[role];
      const renderStars = (count) => '⭐'.repeat(count) + '☆'.repeat(3 - count);

      html += `
        <div class="bg-zinc-950 border-2 ${roleColors[role]} bg-opacity-20 mb-3">
          <button onclick="toggleCategory('${role}')" class="w-full px-4 py-3 flex justify-between items-center hover:bg-opacity-50 ${roleColors[role]} transition">
            <div class="flex items-center gap-3 flex-1">
              <span class="text-2xl">${roleIcons[role]}</span>
              <div class="text-left flex-1">
                <h3 class="text-sm font-bold text-yellow-500 uppercase">${role}</h3>
                <p class="text-xs text-gray-300 italic mb-1">"${roleTaglines[role]}"</p>
                <p class="text-xs text-gray-500">${roleDescriptions[role]}</p>
                <div class="flex gap-3 mt-2 text-xs font-mono">
                  ${stats.success > 0 ? `<span class="text-yellow-400">${renderStars(stats.success)} Success</span>` : ''}
                  ${stats.cash > 0 ? `<span class="text-green-400">${renderStars(stats.cash)} Cash</span>` : ''}
                  ${stats.xp > 0 ? `<span class="text-purple-400">${renderStars(stats.xp)} XP</span>` : ''}
                  ${stats.energy > 0 ? `<span class="text-cyan-400">${renderStars(stats.energy)} Energy</span>` : ''}
                </div>
              </div>
              <div class="text-xs text-gray-400 font-mono mr-2">
                ${roleMembers.length} available
              </div>
            </div>
            <span class="text-yellow-500 text-xl">${isExpanded ? '▼' : '►'}</span>
          </button>
          ${isExpanded ? `
            <div class="p-4 border-t-2 ${roleColors[role].split(' ')[0]}">
              <div class="grid md:grid-cols-3 gap-3">
                ${roleMembers.map(member => {
                  const canRecruit = gameState.player.money >= member.cost && gameState.player.respect >= member.respect;
                  const badge = member.roleBadge || 'booster';
                  return `
                    <div class="bg-black p-4 border border-zinc-800 hover:border-yellow-600 transition relative group">
                      <div class="absolute top-2 right-2 text-xl opacity-50 group-hover:opacity-100 transition">${roleIcons[role]}</div>
                      <div class="mb-2">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="px-2 py-0.5 text-xs font-bold uppercase border ${badgeColors[badge]} rounded">${badgeIcons[badge]} ${badge}</span>
                        </div>
                        <h3 class="font-bold text-yellow-400 uppercase text-sm">${member.name}</h3>
                        <p class="text-xs text-gray-400 mt-1 italic">${member.description}</p>
                        ${member.specializations && member.specializations.length > 0 ? `
                          <div class="flex flex-wrap gap-1 mt-2">
                            ${member.specializations.map(spec => `
                              <span class="px-1.5 py-0.5 text-xs font-bold uppercase border rounded ${getSpecializationColor(spec)} cursor-help"
                                    title="${spec.toUpperCase()}: Required for certain jobs">
                                ${getSpecializationIcon(spec)} ${spec}
                              </span>
                            `).join('')}
                          </div>
                        ` : ''}
                      </div>
                      <div class="text-xs font-mono space-y-1 mb-3">
                        <div class="flex justify-between bg-zinc-950 px-2 py-1 border border-zinc-900">
                          <span class="text-gray-400">COST:</span> 
                          <span class="text-green-400">$${member.cost.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between bg-zinc-950 px-2 py-1 border border-zinc-900">
                          <span class="text-gray-400">REP:</span> 
                          <span class="text-purple-400">${member.respect}</span>
                        </div>
                        <div class="border-t border-zinc-900 pt-2 mt-2 space-y-1">
                          ${member.bonus.energy ? `<p class="text-cyan-400">▸ +${member.bonus.energy} ENERGY</p>` : ''}
                          ${member.bonus.money ? `<p class="text-green-400">▸ +${Math.floor(member.bonus.money * 100)}% CASH</p>` : ''}
                          ${member.bonus.xp ? `<p class="text-purple-400">▸ +${Math.floor(member.bonus.xp * 100)}% XP</p>` : ''}
                          ${member.bonus.successRate ? `<p class="text-yellow-400">▸ +${(member.bonus.successRate * 100).toFixed(1)}% SUCCESS</p>` : ''}
                          ${member.bonus.income ? `<p class="text-green-500">▸ +$${member.bonus.income}/HR</p>` : ''}
                        </div>
                      </div>
                      <button
                        onclick='recruitCrew(${JSON.stringify(member).replace(/'/g, "\\'").replace(/"/g, "&quot;")})'
                        ${!canRecruit ? 'disabled' : ''}
                        class="w-full px-3 py-2 font-bold text-xs uppercase border transition ${
                          canRecruit
                            ? 'bg-red-700 hover:bg-red-600 text-white border-red-500 cursor-pointer hover:shadow-lg'
                            : 'bg-zinc-900 text-zinc-700 border-zinc-800 cursor-not-allowed'
                        }"
                      >
                        ${gameState.player.money < member.cost ? '💰 NEED CASH' : gameState.player.respect < member.respect ? '⭐ NEED REP' : '✓ HIRE'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }
  });
  
  html += '</div></div>';
  return html;
}

function renderEquipment() {
  let html = '<div class="space-y-6">';
  
  // Your Equipment
  html += '<div><h2 class="text-xl font-bold text-red-500 uppercase mb-4">// YOUR GEAR</h2>';
  
  if (gameState.equipment.length === 0) {
    html += '<div class="bg-zinc-950 p-8 border-2 border-zinc-800 text-center"><p class="text-gray-400 uppercase text-sm">[ NO EQUIPMENT - GOING IN EMPTY HANDED ]</p></div>';
  } else {
    const categories = ['weapon', 'explosive', 'protection', 'utility', 'documents', 'tech', 'vehicle', 'misc'];
    categories.forEach(cat => {
      const categoryItems = gameState.equipment.filter(item => item.category === cat);
      if (categoryItems.length > 0) {
        const isExpanded = gameState.expandedCategories[cat];
        html += `
          <div class="bg-zinc-950 border border-zinc-800 mb-3">
            <button onclick="toggleCategory('${cat}')" class="w-full px-4 py-3 flex justify-between items-center hover:bg-zinc-900 transition">
              <h3 class="text-sm font-bold text-yellow-500 uppercase">${cat}S (${categoryItems.length})</h3>
              <span class="text-yellow-500 text-xl">${isExpanded ? '▼' : '►'}</span>
            </button>
            ${isExpanded ? `
              <div class="p-4 border-t border-zinc-800">
                <div class="grid md:grid-cols-4 gap-3">
                  ${categoryItems.map(item => `
                    <div class="bg-black p-3 border border-zinc-800">
                      <div class="flex items-start gap-2 mb-2">
                        <span class="text-green-500 text-xs">✓</span>
                        <div class="flex-1">
                          <h3 class="font-bold text-white uppercase text-xs">${item.name}</h3>
                          <p class="text-xs text-gray-400 mt-1">${item.description}</p>
                        </div>
                      </div>
                      <div class="text-xs font-mono space-y-1 border-t border-zinc-900 pt-2">
                        ${item.bonus && item.bonus.energy ? `<p class="text-cyan-400">+${item.bonus.energy} ENERGY</p>` : ''}
                        ${item.bonus && item.bonus.money ? `<p class="text-green-400">+${Math.floor(item.bonus.money * 100)}% CASH</p>` : ''}
                        ${item.bonus && item.bonus.xp ? `<p class="text-purple-400">+${Math.floor(item.bonus.xp * 100)}% XP</p>` : ''}
                        ${item.bonus && item.bonus.successRate ? `<p class="text-yellow-400">+${(item.bonus.successRate * 100).toFixed(1)}% SUCCESS</p>` : ''}
                        ${item.bonus && item.bonus.respect ? `<p class="text-purple-400">+${item.bonus.respect} RESPECT</p>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }
    });
  }
  
  html += '</div>';
  
  // Black Market
  html += '<div><h2 class="text-xl font-bold text-red-500 uppercase mb-4">// BLACK MARKET</h2>';
  
  const categories = ['weapon', 'explosive', 'protection', 'utility', 'documents', 'tech', 'vehicle', 'misc'];
  categories.forEach(cat => {
    const categoryItems = availableEquipment.filter(e => e.category === cat && !gameState.equipment.find(eq => eq.id === e.id));
    if (categoryItems.length > 0) {
      const isExpanded = gameState.expandedCategories[cat];
      html += `
        <div class="bg-zinc-950 border border-zinc-800 mb-3">
          <button onclick="toggleCategory('${cat}')" class="w-full px-4 py-3 flex justify-between items-center hover:bg-zinc-900 transition">
            <h3 class="text-sm font-bold text-yellow-500 uppercase">${cat}S (${categoryItems.length} available)</h3>
            <span class="text-yellow-500 text-xl">${isExpanded ? '▼' : '►'}</span>
          </button>
          ${isExpanded ? `
            <div class="p-4 border-t border-zinc-800">
              <div class="grid md:grid-cols-4 gap-3">
                ${categoryItems.map(item => {
                  const canBuy = gameState.player.money >= item.cost;
                  return `
                    <div class="bg-black p-3 border border-zinc-800">
                      <div class="mb-2">
                        <h3 class="font-bold text-yellow-400 uppercase text-xs">${item.name}</h3>
                        <p class="text-xs text-gray-400 mt-1">${item.description}</p>
                      </div>
                      <div class="text-xs font-mono space-y-1 mb-2">
                        <p class="bg-zinc-950 px-2 py-1 border border-zinc-900">
                          <span class="text-gray-400">PRICE:</span> 
                          <span class="text-green-400 ml-1">$${item.cost.toLocaleString()}</span>
                        </p>
                        <div class="border-t border-zinc-900 pt-1">
                          ${item.bonus && item.bonus.energy ? `<p class="text-cyan-400">+${item.bonus.energy} ENERGY</p>` : ''}
                          ${item.bonus && item.bonus.money ? `<p class="text-green-400">+${Math.floor(item.bonus.money * 100)}% CASH</p>` : ''}
                          ${item.bonus && item.bonus.xp ? `<p class="text-purple-400">+${Math.floor(item.bonus.xp * 100)}% XP</p>` : ''}
                          ${item.bonus && item.bonus.successRate ? `<p class="text-yellow-400">+${(item.bonus.successRate * 100).toFixed(1)}% SUCCESS</p>` : ''}
                          ${item.bonus && item.bonus.respect ? `<p class="text-purple-400">+${item.bonus.respect} RESPECT</p>` : ''}
                        </div>
                      </div>
                      <button
                        onclick="buyEquipment(${item.id})"
                        ${!canBuy ? 'disabled' : ''}
                        class="w-full px-3 py-2 font-bold text-xs uppercase border ${
                          canBuy
                            ? 'bg-red-700 hover:bg-red-600 text-white border-red-500 cursor-pointer'
                            : 'bg-zinc-900 text-zinc-700 border-zinc-800 cursor-not-allowed'
                        }"
                      >
                        ${canBuy ? 'BUY' : 'TOO EXPENSIVE'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }
  });
  
  html += '</div></div>';
  return html;
}

function renderProperties() {
  let html = '<div class="space-y-6">';
  
  // Your Properties
  html += '<div><h2 class="text-xl font-bold text-red-500 uppercase mb-4">// YOUR FRONTS</h2>';
  
  if (gameState.properties.length === 0) {
    html += '<div class="bg-zinc-950 p-8 border-2 border-zinc-800 text-center"><p class="text-gray-400 uppercase text-sm">[ NO PROPERTIES - NOT LAUNDERING YET ]</p></div>';
  } else {
    const tiers = ['low', 'mid', 'high', 'premium'];
    tiers.forEach(tier => {
      const tierProps = gameState.properties.filter(prop => prop.tier === tier);
      if (tierProps.length > 0) {
        const isExpanded = gameState.expandedCategories[tier];
        html += `
          <div class="bg-zinc-950 border border-zinc-800 mb-3">
            <button onclick="toggleCategory('${tier}')" class="w-full px-4 py-3 flex justify-between items-center hover:bg-zinc-900 transition">
              <h3 class="text-sm font-bold text-yellow-500 uppercase">${tier}-TIER (${tierProps.length})</h3>
              <span class="text-yellow-500 text-xl">${isExpanded ? '▼' : '►'}</span>
            </button>
            ${isExpanded ? `
              <div class="p-4 border-t border-zinc-800">
                <div class="grid md:grid-cols-3 gap-3">
                  ${tierProps.map(prop => `
                    <div class="bg-black p-3 border-l-4 border-green-600">
                      <div class="flex justify-between items-start">
                        <div class="flex-1">
                          <h3 class="font-bold text-white uppercase text-sm">${prop.name}</h3>
                          <p class="text-xs text-gray-400 mt-1">${prop.description}</p>
                        </div>
                        <div class="text-right">
                          <p class="text-base text-green-400 font-bold font-mono">$${prop.income}/hr</p>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }
    });
    
    const propertyIncome = gameState.properties.reduce((sum, p) => sum + p.income, 0);
    const crewIncome = gameState.crew.reduce((sum, m) => sum + (m.bonus.income || 0), 0);
    
    html += `
      <div class="bg-green-950 bg-opacity-30 border-2 border-green-700 p-4">
        <p class="text-green-400 font-bold text-lg font-mono">► PROPERTY INCOME: $${propertyIncome}/HR</p>
        ${crewIncome > 0 ? `<p class="text-green-400 font-bold text-lg font-mono mt-1">► CREW INCOME: $${crewIncome}/HR</p>` : ''}
        <p class="text-green-500 font-bold text-xl font-mono mt-2 border-t border-green-800 pt-2">
          ► TOTAL PASSIVE: $${propertyIncome + crewIncome}/HR
        </p>
        <p class="text-xs text-gray-400 mt-2 uppercase">Auto-collected every minute</p>
      </div>
    `;
  }
  
  html += '</div>';
  
  // Available Properties
  html += '<div><h2 class="text-xl font-bold text-red-500 uppercase mb-4">// AVAILABLE FRONTS</h2>';
  
  const tiers = ['low', 'mid', 'high', 'premium'];
  tiers.forEach(tier => {
    const tierProps = availableProperties.filter(p => p.tier === tier && !gameState.properties.find(prop => prop.id === p.id));
    if (tierProps.length > 0) {
      const isExpanded = gameState.expandedCategories[tier];
      html += `
        <div class="bg-zinc-950 border border-zinc-800 mb-3">
          <button onclick="toggleCategory('${tier}')" class="w-full px-4 py-3 flex justify-between items-center hover:bg-zinc-900 transition">
            <h3 class="text-sm font-bold text-yellow-500 uppercase">${tier}-TIER (${tierProps.length} available)</h3>
            <span class="text-yellow-500 text-xl">${isExpanded ? '▼' : '►'}</span>
          </button>
          ${isExpanded ? `
            <div class="p-4 border-t border-zinc-800">
              <div class="grid md:grid-cols-3 gap-3">
                ${tierProps.map(property => {
                  const canBuy = gameState.player.money >= property.cost;
                  return `
                    <div class="bg-black p-3 border border-zinc-800">
                      <div class="mb-2">
                        <h3 class="font-bold text-yellow-400 uppercase text-sm">${property.name}</h3>
                        <p class="text-xs text-gray-400 mt-1">${property.description}</p>
                      </div>
                      <div class="text-xs font-mono space-y-1 mb-2">
                        <p class="bg-zinc-950 px-2 py-1 border border-zinc-900">
                          <span class="text-gray-400">COST:</span> 
                          <span class="text-green-400 ml-1">$${property.cost.toLocaleString()}</span>
                        </p>
                        <p class="bg-zinc-950 px-2 py-1 border border-zinc-900">
                          <span class="text-gray-400">INCOME:</span> 
                          <span class="text-green-400 font-bold ml-1">$${property.income.toLocaleString()}/HR</span>
                        </p>
                        <p class="bg-zinc-950 px-2 py-1 border border-zinc-900">
                          <span class="text-gray-400">ROI:</span> 
                          <span class="text-cyan-400 ml-1">${Math.floor(property.cost / property.income)}hr payback</span>
                        </p>
                      </div>
                      <button
                        onclick="buyProperty(${property.id})"
                        ${!canBuy ? 'disabled' : ''}
                        class="w-full px-3 py-2 font-bold text-xs uppercase border ${
                          canBuy
                            ? 'bg-red-700 hover:bg-red-600 text-white border-red-500 cursor-pointer'
                            : 'bg-zinc-900 text-zinc-700 border-zinc-800 cursor-not-allowed'
                        }"
                      >
                        ${canBuy ? 'ACQUIRE' : 'NEED MORE CASH'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }
  });
  
  html += '</div></div>';
  return html;
}

// Intel System Functions
function initializeIntelJobs() {
  if (!gameState.availableIntelJobs) {
    gameState.availableIntelJobs = [];
  }
  if (!gameState.activeIntelJobs) {
    gameState.activeIntelJobs = [];
  }

  // Generate 5 intel jobs if we don't have enough available
  if (gameState.availableIntelJobs.length < 5) {
    generateIntelJobs();
  }
}

function generateIntelJobs() {
  const playerLevel = gameState.player.level;

  // Filter jobs player can do based on level, excluding currently active jobs
  const activeJobIds = (gameState.activeIntelJobs || []).map(j => j.id);
  const eligibleJobs = intelJobs.filter(job =>
    job.minLevel <= playerLevel && !activeJobIds.includes(job.id)
  );

  if (eligibleJobs.length === 0) {
    gameState.availableIntelJobs = [];
    saveGame();
    render();
    showMessage('No intel operations available at your level!', 'error');
    return;
  }

  // Shuffle and pick up to 5 random jobs
  const shuffled = [...eligibleJobs].sort(() => Math.random() - 0.5);
  gameState.availableIntelJobs = shuffled.slice(0, Math.min(5, shuffled.length));

  saveGame();
  render();
  showMessage(`Generated ${gameState.availableIntelJobs.length} new intel operations!`, 'success');
}

function doIntelJob(jobId) {
  const job = gameState.availableIntelJobs.find(j => j.id === jobId);
  if (!job) {
    showMessage('Intel job not found!', 'error');
    return;
  }

  // Check if already on this job
  if (gameState.activeIntelJobs.some(aj => aj.id === jobId)) {
    showMessage('Already working on this operation!', 'error');
    return;
  }

  // Check energy
  if (gameState.player.energy < job.energy) {
    showMessage('Not enough energy!', 'error');
    return;
  }

  // Check requirements
  const reqCheck = checkJobRequirements(job);
  if (!reqCheck.met) {
    showMessage(reqCheck.missing.join(', '), 'error');
    return;
  }

  // Deduct energy
  gameState.player.energy -= job.energy;

  // Add to active jobs
  const activeJob = {
    ...job,
    startTime: Date.now(),
    endTime: Date.now() + job.duration,
    assignedTo: 'player'
  };

  gameState.activeIntelJobs.push(activeJob);

  // Start job timer
  setTimeout(() => {
    completeIntelJob(jobId);
  }, job.duration);

  showMessage(`Started: ${job.name}`, 'info');
  saveGame();
  render();
}

function completeIntelJob(jobId) {
  const activeJobIndex = gameState.activeIntelJobs.findIndex(j => j.id === jobId);
  if (activeJobIndex === -1) return;

  const job = gameState.activeIntelJobs[activeJobIndex];
  const success = Math.random() < job.successRate;

  // Remove from active jobs
  gameState.activeIntelJobs.splice(activeJobIndex, 1);

  // Remove from available jobs
  gameState.availableIntelJobs = gameState.availableIntelJobs.filter(j => j.id !== jobId);

  if (success) {
    // Calculate rewards
    const moneyEarned = Math.floor(job.money[0] + Math.random() * (job.money[1] - job.money[0]));
    const intelGained = Math.floor(job.intel[0] + Math.random() * (job.intel[1] - job.intel[0] + 1));

    gameState.player.money += moneyEarned;
    gameState.player.xp += job.xp;
    gameState.player.respect += job.respect;
    gameState.player.intel += intelGained;

    // Heat risk
    if (Math.random() < job.heatRisk) {
      const heatGain = Math.floor(Math.random() * 8) + 5;
      if (typeof modifyHeat === 'function') {
        modifyHeat(heatGain);
      } else {
        gameState.player.heat = Math.min(100, gameState.player.heat + heatGain);
      }
      showMessage(`✅ SUCCESS: ${job.name}! Earned $${moneyEarned.toLocaleString()}, ${intelGained} intel, ${job.xp} XP (but noticed!)`, 'success');
    } else {
      showMessage(`✅ SUCCESS: ${job.name}! Earned $${moneyEarned.toLocaleString()}, ${intelGained} intel, ${job.xp} XP`, 'success');
    }

    gameState.stats.jobsCompleted++;
    checkLevelUp();
    checkAchievements();
  } else {
    gameState.stats.jobsFailed++;

    // Failed jobs generate heat
    const heatGain = Math.floor(Math.random() * 12) + 8;
    if (typeof modifyHeat === 'function') {
      modifyHeat(heatGain);
    } else {
      gameState.player.heat = Math.min(100, gameState.player.heat + heatGain);
    }

    showMessage(`❌ FAILED: ${job.name}. Operation blown!`, 'error');
  }

  // Generate new job if we're below 5
  if (gameState.availableIntelJobs.length < 5) {
    generateIntelJobs();
  }

  saveGame();
  render();
}

function renderIntel() {
  initializeIntelJobs();

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'bg-green-950 text-green-400 border-green-700';
      case 'medium': return 'bg-yellow-950 text-yellow-400 border-yellow-700';
      case 'high': return 'bg-orange-950 text-orange-400 border-orange-700';
      case 'very high': return 'bg-red-950 text-red-400 border-red-700';
      default: return 'bg-gray-950 text-gray-400 border-gray-700';
    }
  };

  const getRiskIcon = (risk) => {
    switch(risk) {
      case 'low': return '●';
      case 'medium': return '▲';
      case 'high': return '◆';
      case 'very high': return '★';
      default: return '○';
    }
  };

  let html = `
    <div class="space-y-6 mt-6">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-950 to-indigo-950 p-6 border-2 border-blue-600">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-3xl font-bold text-blue-400 uppercase">🕵️ INTELLIGENCE OPERATIONS</h2>
            <p class="text-sm text-gray-400 mt-1">Information & Espionage • Unlocked at Level 3</p>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-400 uppercase">Current Intel</div>
            <div class="text-3xl font-bold text-blue-400">${gameState.player.intel}</div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4 mt-4">
          <div class="bg-black bg-opacity-50 p-3 border border-blue-800">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-lg">👁️</span>
              <h3 class="text-sm font-bold text-blue-300 uppercase">Surveillance</h3>
            </div>
            <p class="text-xs text-gray-400">Low-risk observation and tracking operations</p>
          </div>
          <div class="bg-black bg-opacity-50 p-3 border border-blue-800">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-lg">💻</span>
              <h3 class="text-sm font-bold text-blue-300 uppercase">Hacking</h3>
            </div>
            <p class="text-xs text-gray-400">Digital espionage and cyber operations</p>
          </div>
          <div class="bg-black bg-opacity-50 p-3 border border-blue-800">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-lg">📁</span>
              <h3 class="text-sm font-bold text-blue-300 uppercase">Secrets</h3>
            </div>
            <p class="text-xs text-gray-400">Uncover hidden information and leverage</p>
          </div>
        </div>
      </div>

      <!-- Heat System Explanation -->
      <div class="bg-zinc-900 p-4 border ${gameState.player.heat >= 50 ? 'border-red-600' : 'border-zinc-700'}">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xl">🚨</span>
          <h3 class="text-md font-bold text-red-400 uppercase">HEAT SYSTEM</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-yellow-400 font-bold mb-2">📊 HEAT LEVELS</p>
            <div class="space-y-1 text-gray-300">
              <div class="flex justify-between"><span class="text-green-400">0-20:</span> <span>Safe - No consequences</span></div>
              <div class="flex justify-between"><span class="text-yellow-400">20-50:</span> <span>Moderate - Slight risk</span></div>
              <div class="flex justify-between"><span class="text-orange-400">50-80:</span> <span>High - Increased failures</span></div>
              <div class="flex justify-between"><span class="text-red-400">80-100:</span> <span>CRITICAL - Raids likely!</span></div>
            </div>
          </div>
          <div class="bg-black p-3 border border-zinc-800">
            <p class="text-cyan-400 font-bold mb-2">🧊 HEAT MANAGEMENT</p>
            <div class="space-y-1 text-gray-300">
              <p>• <b>Natural Decay:</b> -1 heat per 5 minutes</p>
              <p>• <b>Black Market Bribes:</b> Fast reduction</p>
              <p>• <b>Failed Jobs:</b> Gain +5-8 heat</p>
              <p>• <b>High Heat = Higher failure rates</b></p>
            </div>
          </div>
        </div>
        <div class="mt-3 p-2 ${gameState.player.heat >= 80 ? 'bg-red-950 border-red-700' : gameState.player.heat >= 50 ? 'bg-orange-950 border-orange-700' : 'bg-zinc-950 border-zinc-800'} border text-center">
          <span class="text-xs font-bold uppercase ${gameState.player.heat >= 80 ? 'text-red-400' : gameState.player.heat >= 50 ? 'text-orange-400' : 'text-gray-400'}">
            Current Heat: ${gameState.player.heat}/100 ${gameState.player.heat >= 80 ? '⚠️ CRITICAL!' : gameState.player.heat >= 50 ? '⚠️ HIGH' : gameState.player.heat >= 20 ? '⚠️ MODERATE' : '✓ SAFE'}
          </span>
        </div>
      </div>

      <!-- Active Intel Jobs -->
      ${gameState.activeIntelJobs && gameState.activeIntelJobs.length > 0 ? `
        <div class="p-4 bg-gradient-to-r from-cyan-950 to-blue-950 border-2 border-cyan-500">
          <h3 class="text-lg font-bold text-cyan-400 uppercase mb-3">⏳ ACTIVE OPERATIONS</h3>
          <div class="space-y-2">
            ${gameState.activeIntelJobs.map(job => {
              const elapsed = Date.now() - job.startTime;
              const total = job.endTime - job.startTime;
              const progress = Math.min(100, (elapsed / total) * 100);
              const timeLeft = Math.max(0, job.endTime - Date.now());
              const secsLeft = Math.ceil(timeLeft / 1000);

              return `
                <div class="bg-black p-3 border border-cyan-600">
                  <div class="flex items-center justify-between mb-2">
                    <div>
                      <h4 class="text-sm font-bold text-cyan-300">${job.name}</h4>
                      <p class="text-xs text-gray-400">${job.description}</p>
                    </div>
                    <p class="text-xs text-cyan-400">⏱️ ${secsLeft}s left</p>
                  </div>
                  <div class="w-full bg-zinc-800 h-2 border border-cyan-600">
                    <div class="bg-gradient-to-r from-cyan-500 to-blue-400 h-full transition-all duration-100" style="width: ${progress}%"></div>
                  </div>
                  <p class="text-xs text-cyan-400 mt-1">⚡ ${Math.floor(progress)}% Complete</p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Available Intel Jobs -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-blue-500 uppercase">📋 Available Operations (${gameState.availableIntelJobs.length}/5)</h3>
          <button onclick="generateIntelJobs()" class="px-4 py-2 font-bold text-sm uppercase bg-blue-700 hover:bg-blue-600 text-white border border-blue-500">
            🔄 New Operations
          </button>
        </div>

        ${gameState.availableIntelJobs.length === 0 ? `
          <div class="p-8 text-center bg-zinc-900 border border-zinc-800">
            <p class="text-gray-400">No intelligence operations available.</p>
            <button onclick="generateIntelJobs()" class="mt-4 px-4 py-2 font-bold text-sm uppercase bg-blue-700 hover:bg-blue-600 text-white border border-blue-500">
              Generate Operations
            </button>
          </div>
        ` : `
          <div class="grid gap-4">
            ${gameState.availableIntelJobs.map(job => {
              const reqCheck = checkJobRequirements(job);
              const isActive = gameState.activeIntelJobs.some(aj => aj.id === job.id);

              return `
                <div class="p-4 bg-zinc-900 border-2 ${isActive ? 'border-cyan-700 opacity-60' : reqCheck.met ? 'border-blue-700' : 'border-zinc-800'}">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-1">
                        <h3 class="text-lg font-bold text-blue-400">${job.name}</h3>
                        <span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${getRiskColor(job.risk)}">
                          ${getRiskIcon(job.risk)} ${job.risk} RISK
                        </span>
                      </div>
                      <p class="text-sm text-gray-400">${job.description}</p>
                      <div class="flex gap-4 mt-2 text-xs">
                        <span class="text-green-400">💰 $${job.money[0]}-${job.money[1]}</span>
                        <span class="text-blue-400">🕵️ ${job.intel[0]}-${job.intel[1]} Intel</span>
                        <span class="text-purple-400">✨ ${job.xp} XP</span>
                        <span class="text-yellow-400">⭐ ${job.respect} Rep</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mb-3">
                    <div class="flex gap-4 text-xs text-gray-400">
                      <span>⚡ ${job.energy} Energy</span>
                      <span>⏱️ ${Math.floor(job.duration / 1000)}s</span>
                      <span class="text-green-400">★ ${Math.floor(job.successRate * 100)}% Success</span>
                      <span class="text-orange-400">🚨 ${Math.floor(job.heatRisk * 100)}% Heat Risk</span>
                    </div>
                  </div>

                  ${job.requirements && (job.requirements.crewType || job.requirements.vehicle) ? `
                    <div class="flex flex-wrap gap-1 mb-3">
                      ${job.requirements.crewType && Array.isArray(job.requirements.crewType) && job.requirements.crewType.length > 0 ? job.requirements.crewType.map(type => {
                        const hasType = gameState.crew.some(c => c.specializations && c.specializations.includes(type) && !c.onJob);
                        return `<span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${hasType ? 'bg-blue-950 text-blue-300 border-blue-700' : 'bg-gray-950 text-gray-500 border-gray-800 opacity-50'}">
                          ${type} ${hasType ? '✓' : '✗'}
                        </span>`;
                      }).join('') : ''}
                      ${job.requirements.vehicle ? `<span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${gameState.equipment.some(e => e.category === 'vehicle') ? 'bg-blue-950 text-blue-300 border-blue-700' : 'bg-gray-950 text-gray-500 border-gray-800 opacity-50'}">
                        🚗 Vehicle ${gameState.equipment.some(e => e.category === 'vehicle') ? '✓' : '✗'}
                      </span>` : ''}
                    </div>
                  ` : ''}

                  <button
                    onclick="doIntelJob(${job.id})"
                    ${!reqCheck.met || isActive ? 'disabled' : ''}
                    class="w-full px-4 py-2 font-bold text-sm uppercase transition ${
                      !reqCheck.met || isActive
                        ? 'bg-gray-800 text-gray-600 border border-gray-700 cursor-not-allowed'
                        : 'bg-blue-700 hover:bg-blue-600 text-white border border-blue-500'
                    }"
                  >
                    ${isActive ? '⏳ IN PROGRESS' : !reqCheck.met ? '🔒 REQUIREMENTS NOT MET' : '▶ START OPERATION'}
                  </button>

                  ${!reqCheck.met && !isActive && reqCheck.missing.length > 0 ? `
                    <p class="text-xs text-red-400 mt-2">Missing: ${reqCheck.missing.join(', ')}</p>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  return html;
}

// Add news to ticker
function addNewsItem(message, type = 'info') {
  if (!gameState.newsTickerItems) gameState.newsTickerItems = [];

  const icons = {
    info: '📰',
    success: '✅',
    warning: '⚠️',
    money: '💰',
    battle: '⚔️',
    territory: '🏴',
    crew: '👥',
    level: '⭐'
  };

  gameState.newsTickerItems.unshift({
    message,
    icon: icons[type] || '📰',
    timestamp: Date.now(),
    type
  });

  // Keep only last 20 items
  if (gameState.newsTickerItems.length > 20) {
    gameState.newsTickerItems = gameState.newsTickerItems.slice(0, 20);
  }

  renderHistorySidebar();
}

function renderHistorySidebar() {
  const sidebar = document.getElementById('historySidebar');
  if (!sidebar) return;

  if (!gameState.newsTickerItems) gameState.newsTickerItems = [];
  if (!gameState.jobHistory) gameState.jobHistory = [];

  const timeDisplay = (timestamp) => {
    const timeAgo = Math.floor((Date.now() - timestamp) / 1000);
    return timeAgo < 60 ? `${timeAgo}s ago` :
           timeAgo < 3600 ? `${Math.floor(timeAgo / 60)}m ago` :
           `${Math.floor(timeAgo / 3600)}h ago`;
  };

  // Combine news items and job history, sort by timestamp
  const allActivities = [
    ...gameState.newsTickerItems.map(item => ({
      type: 'news',
      timestamp: item.timestamp,
      data: item
    })),
    ...gameState.jobHistory.map(entry => ({
      type: 'job',
      timestamp: entry.timestamp,
      data: entry
    }))
  ].sort((a, b) => b.timestamp - a.timestamp);

  sidebar.innerHTML = `
    <div class="bg-zinc-950 border-2 border-red-600 p-4 sticky top-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">📡</span>
        <h3 class="text-md font-bold text-red-500 uppercase">ACTIVITY FEED</h3>
        <span class="ml-auto px-2 py-0.5 bg-red-900 text-red-300 text-xs font-bold border border-red-600 animate-pulse">LIVE</span>
      </div>

      ${allActivities.length > 0 ? `
        <div class="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          ${allActivities.map((activity, index) => {
            if (activity.type === 'news') {
              const item = activity.data;
              return `
                <div class="p-2 bg-black border-l-2 ${
                  item.type === 'success' ? 'border-green-600' :
                  item.type === 'warning' ? 'border-yellow-600' :
                  item.type === 'battle' ? 'border-red-600' :
                  item.type === 'territory' ? 'border-purple-600' :
                  item.type === 'level' ? 'border-yellow-500' :
                  'border-cyan-600'
                } ${index === 0 ? 'animate-fadeIn' : ''}">
                  <div class="flex gap-2">
                    <span class="text-sm">${item.icon}</span>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs text-gray-300 leading-relaxed">${item.message}</p>
                      <p class="text-xs text-gray-600 mt-1">${timeDisplay(item.timestamp)}</p>
                    </div>
                  </div>
                </div>
              `;
            } else {
              const entry = activity.data;
              return `
                <div class="p-2 bg-black border ${entry.success ? 'border-green-900' : 'border-red-900'}">
                  <div class="flex items-start gap-2">
                    <span class="text-sm">${entry.success ? '✅' : '❌'}</span>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-bold ${entry.success ? 'text-green-400' : 'text-red-400'} truncate" title="${entry.name}">${entry.name}</p>
                      <div class="flex gap-1 mt-1">
                        <span class="px-1 py-0.5 text-xs font-bold uppercase ${entry.type === 'advanced' ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-blue-950 text-blue-300 border border-blue-800'}">${entry.type}</span>
                      </div>
                      ${entry.success ? `
                        <div class="space-y-0.5 mt-1 text-xs">
                          <p class="text-green-400">💰 $${entry.money.toLocaleString()}</p>
                          <p class="text-cyan-400">⭐ ${entry.xp} XP</p>
                          ${entry.respect > 0 ? `<p class="text-purple-400">🎖️ ${entry.respect}</p>` : ''}
                        </div>
                      ` : `
                        <p class="text-xs text-red-400 mt-1">Failed</p>
                      `}
                      <p class="text-xs text-gray-500 mt-1">${timeDisplay(entry.timestamp)}</p>
                    </div>
                  </div>
                </div>
              `;
            }
          }).join('')}
        </div>
      ` : `
        <p class="text-xs text-gray-500 text-center py-4">No activity yet...</p>
      `}
    </div>
  `;
}

function render() {
  try {
    renderPlayerStats();
    renderNavigation();
    renderNotifications();
    renderHistorySidebar();

    const mainContent = document.getElementById('mainContent');

    switch(gameState.activeTab) {
      case 'dashboard':
        mainContent.innerHTML = renderDashboard();
        break;
      case 'jobs':
        mainContent.innerHTML = renderJobs();
        break;
      case 'intel':
        mainContent.innerHTML = renderIntel();
        break;
      case 'advancedJobs':
        mainContent.innerHTML = renderAdvancedJobs();
        break;
      case 'crew':
        mainContent.innerHTML = renderCrew();
        break;
      case 'equipment':
        mainContent.innerHTML = renderEquipment();
        break;
      case 'properties':
        mainContent.innerHTML = renderProperties();
        break;
      case 'warroom':
        mainContent.innerHTML = renderWarRoom();
        break;
      case 'blackmarket':
        mainContent.innerHTML = renderBlackMarket();
        break;
      default:
        mainContent.innerHTML = renderDashboard();
        gameState.activeTab = 'dashboard';
        break;
    }
  } catch (error) {
    console.error('Render error:', error);
    showMessage('Error rendering page: ' + error.message, 'error');
  }

  // Render crew assignment modal if open (only if it doesn't already exist)
  const modalShouldExist = gameState.crewAssignmentModal;
  const modalExists = document.getElementById('crewAssignmentModal');

  if (modalShouldExist && !modalExists) {
    renderCrewAssignmentModal();
  } else if (!modalShouldExist && modalExists) {
    modalExists.remove();
  }
}

function renderCrewAssignmentModal() {
  const job = gameState.crewAssignmentModal;
  const requirements = job.requirements || {};

  // Filter crew: must be available (not on job) AND have required specializations
  const availableCrew = gameState.crew.filter(c => {
    if (c.onJob) return false; // Skip if already working

    // If job has no crew requirements, any crew can do it
    if (!requirements.crewType || requirements.crewType.length === 0) return true;

    // Check if this crew member has at least ONE of the required specializations
    return requirements.crewType.some(reqType =>
      c.specializations && c.specializations.includes(reqType)
    );
  });

  const modalHTML = `
      <div class="bg-zinc-900 border-2 border-yellow-600 p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <h2 class="text-2xl font-bold text-yellow-500 uppercase mb-2">Assign Crew Member</h2>
        <p class="text-sm text-gray-400 mb-4">${job.name} - ${job.energy} Energy Required</p>
        ${requirements.crewType && requirements.crewType.length > 0 ? `
          <div class="flex flex-wrap gap-1 mb-3">
            <span class="text-xs text-gray-400">Requires:</span>
            ${requirements.crewType.map(spec => `
              <span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${getSpecializationColor(spec)}">
                ${getSpecializationIcon(spec)} ${spec}
              </span>
            `).join('')}
          </div>
        ` : ''}

        <div class="space-y-2 mb-4">
          <!-- Player option -->
          <button
            onclick='assignJob(${job.id}, null)'
            class="w-full bg-red-900 hover:bg-red-800 border border-red-600 p-4 text-left transition">
            <div class="flex items-center gap-3">
              <span class="text-2xl">👤</span>
              <div class="flex-1">
                <h3 class="font-bold text-yellow-400 uppercase">DO IT YOURSELF</h3>
                <p class="text-xs text-gray-400">You handle this job personally</p>
              </div>
            </div>
          </button>

          ${availableCrew.length === 0 ? `
            <div class="bg-zinc-950 p-4 border border-zinc-800 text-center">
              <p class="text-gray-500 text-sm">${requirements.crewType && requirements.crewType.length > 0 ? 'No qualified crew members available for this job.' : 'No crew members available. All crew are currently on jobs.'}</p>
            </div>
          ` : ''}

          ${availableCrew.map(crew => `
            <button
              onclick='assignJob(${job.id}, ${crew.id})'
              class="w-full bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-600 p-4 text-left transition">
              <div class="flex items-center gap-3">
                <span class="text-2xl">${crew.role === 'elite' ? '👑' : crew.role === 'muscle' ? '💪' : crew.role === 'specialist' ? '🎯' : '🤝'}</span>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold text-white uppercase text-sm">${crew.name}</h3>
                    <span class="px-2 py-0.5 text-xs font-bold bg-purple-900 text-purple-300 border border-purple-700 rounded">LVL ${crew.level}</span>
                  </div>
                  <p class="text-xs text-gray-400">${crew.description}</p>
                  ${crew.specializations && crew.specializations.length > 0 ? `
                    <div class="flex flex-wrap gap-1 mt-1">
                      ${crew.specializations.map(spec => `
                        <span class="px-1.5 py-0.5 text-xs font-bold uppercase border rounded ${getSpecializationColor(spec)}">
                          ${getSpecializationIcon(spec)} ${spec}
                        </span>
                      `).join('')}
                    </div>
                  ` : ''}
                  <div class="flex gap-2 mt-1 text-xs">
                    ${crew.bonus.successRate ? `<span class="text-yellow-400">+${(crew.bonus.successRate * 100).toFixed(1)}% Success</span>` : ''}
                    ${crew.bonus.xp ? `<span class="text-purple-400">+${Math.floor(crew.bonus.xp * 100)}% XP</span>` : ''}
                    ${crew.bonus.money ? `<span class="text-green-400">+${Math.floor(crew.bonus.money * 100)}% Cash</span>` : ''}
                  </div>
                  <div class="w-full bg-zinc-800 h-1 mt-2">
                    <div class="bg-purple-600 h-1" style="width: ${(crew.xp / crew.xpToNext) * 100}%"></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">${crew.xp}/${crew.xpToNext} XP</p>
                  <div class="w-full bg-zinc-800 h-2 mt-2">
                    <div class="bg-cyan-600 h-2" style="width: ${((crew.energy || 100) / (crew.maxEnergy || 100)) * 100}%"></div>
                  </div>
                  <p class="text-xs ${(crew.energy || 100) < job.energy ? 'text-red-400' : 'text-cyan-400'} mt-1">⚡ Energy: ${crew.energy || 100}/${crew.maxEnergy || 100} ${(crew.energy || 100) < job.energy ? '(Not enough!)' : ''}</p>
                </div>
              </div>
            </button>
          `).join('')}
        </div>

        <button
          onclick="closeCrewModal()"
          class="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 px-4 py-2 font-bold text-sm uppercase transition">
          CANCEL
        </button>
      </div>
  `;

  // Add modal to body
  const existing = document.getElementById('crewAssignmentModal');
  if (existing) existing.remove();

  const modalDiv = document.createElement('div');
  modalDiv.id = 'crewAssignmentModal';
  modalDiv.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
  modalDiv.innerHTML = modalHTML;
  document.body.appendChild(modalDiv);

  // Add click event to backdrop for closing
  modalDiv.addEventListener('click', (e) => {
    if (e.target === modalDiv) {
      closeCrewModal();
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Try to load saved game
  loadGame();
  render();
});