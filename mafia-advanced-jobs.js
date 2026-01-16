// Advanced Jobs System - Heat, Intel, and Dynamic Opportunities

// Heat Management Functions
function modifyHeat(amount) {
  gameState.player.heat = Math.max(0, Math.min(100, gameState.player.heat + amount));
  saveGame();
  render();

  if (amount > 0) {
    showMessage(`🚨 Heat increased by ${amount}! Now at ${gameState.player.heat}`, 'warning');
    if (gameState.player.heat >= 80) {
      showMessage('⚠️ WARNING: Heat is critically high! Police are watching!', 'error');
    }
  } else if (amount < 0) {
    showMessage(`🧊 Heat decreased by ${Math.abs(amount)}! Now at ${gameState.player.heat}`, 'success');
  }
}

function getHeatDecayRate() {
  // Heat naturally decays over time (1 point per 5 minutes)
  return 1 / (5 * 60 * 1000);
}

function updateHeatDecay() {
  // Passive heat decay
  if (gameState.player.heat > 0 && gameState.player.lastHeatUpdate) {
    const timePassed = Date.now() - gameState.player.lastHeatUpdate;
    const decayAmount = Math.floor(timePassed * getHeatDecayRate());
    if (decayAmount > 0) {
      gameState.player.heat = Math.max(0, gameState.player.heat - decayAmount);
    }
  }
  gameState.player.lastHeatUpdate = Date.now();
}

// Intel Management Functions
function gatherIntel(method) {
  const methods = {
    street: { name: 'Street Informants', cost: 300, energy: 10, duration: 20000, intel: [1, 2], heatRisk: 0.1, successRate: 0.85 },
    bribe: { name: 'Bribe Officials', cost: 800, energy: 20, duration: 40000, intel: [2, 4], heatRisk: 0.2, successRate: 0.75 },
    infiltrate: { name: 'Infiltrate Organization', cost: 1500, energy: 35, duration: 60000, intel: [3, 6], heatRisk: 0.35, successRate: 0.60 },
    hack: { name: 'Hack Systems', cost: 2500, energy: 50, duration: 90000, intel: [5, 10], heatRisk: 0.25, successRate: 0.50, requiresEquipment: true }
  };

  const selected = methods[method];
  if (!selected) {
    showMessage('Invalid intel gathering method', 'error');
    return;
  }

  // Check if this method is already active
  if (!gameState.activeIntelOps) gameState.activeIntelOps = [];
  if (gameState.activeIntelOps.some(op => op.method === method)) {
    showMessage('This intel operation is already in progress!', 'error');
    return;
  }

  if (gameState.player.money < selected.cost) {
    showMessage(`Not enough money (need $${selected.cost})`, 'error');
    return;
  }

  if (gameState.player.energy < selected.energy) {
    showMessage(`Not enough energy (need ${selected.energy})`, 'error');
    return;
  }

  if (selected.requiresEquipment && !gameState.equipment.some(e => e.category === 'tech')) {
    showMessage('Requires tech equipment to hack systems', 'error');
    return;
  }

  gameState.player.money -= selected.cost;
  gameState.player.energy -= selected.energy;

  // Add to active intel operations
  const opId = Date.now();
  const intelOp = {
    id: opId,
    method: method,
    name: selected.name,
    startTime: Date.now(),
    endTime: Date.now() + selected.duration,
    duration: selected.duration,
    settings: selected
  };

  if (!gameState.activeIntelOps) gameState.activeIntelOps = [];
  gameState.activeIntelOps.push(intelOp);

  showMessage(`${selected.name}: Gathering intel...`, 'info');
  saveGame();
  render();

  setTimeout(() => {
    // Remove from active ops
    gameState.activeIntelOps = gameState.activeIntelOps.filter(op => op.id !== opId);

    const success = Math.random() < selected.successRate;

    if (success) {
      const intelGained = Math.floor(Math.random() * (selected.intel[1] - selected.intel[0] + 1)) + selected.intel[0];
      gameState.player.intel += intelGained;

      // Heat risk
      if (Math.random() < selected.heatRisk) {
        const heatGain = Math.floor(Math.random() * 5) + 3;
        modifyHeat(heatGain);
        showMessage(`🕵️ SUCCESS: Gained ${intelGained} intel! Total: ${gameState.player.intel} (but you were noticed!)`, 'success');
      } else {
        showMessage(`🕵️ SUCCESS: Gained ${intelGained} intel! Total: ${gameState.player.intel}`, 'success');
      }
    } else {
      const heatGain = Math.floor(Math.random() * 8) + 5;
      modifyHeat(heatGain);
      showMessage(`❌ FAILED: Operation blown! No intel gathered, heat increased!`, 'error');
    }

    saveGame();
    render();
  }, selected.duration);
}

// Advanced Job Generation
function generateAdvancedJobs() {
  const numJobs = Math.min(3, Math.floor(gameState.player.level / 3) + 1); // 1-3 jobs based on level
  const newJobs = [];

  // Separate intel jobs from regular jobs
  const intelJobs = advancedJobTemplates.filter(j => j.intelCost);
  const regularJobs = advancedJobTemplates.filter(j => !j.intelCost);

  for (let i = 0; i < numJobs; i++) {
    let template;

    // Ensure at least one intel job if generating 2+ jobs and player level >= 5
    if (i === 0 && numJobs >= 2 && gameState.player.level >= 5 && intelJobs.length > 0) {
      // First job has 60% chance to be intel job
      if (Math.random() < 0.6) {
        template = intelJobs[Math.floor(Math.random() * intelJobs.length)];
      } else {
        template = advancedJobTemplates[Math.floor(Math.random() * advancedJobTemplates.length)];
      }
    } else {
      // Random selection from all jobs
      template = advancedJobTemplates[Math.floor(Math.random() * advancedJobTemplates.length)];
    }

    const expiresIn = Math.floor(Math.random() * 60 * 60 * 1000) + (30 * 60 * 1000); // 30min - 1.5hr

    newJobs.push({
      ...JSON.parse(JSON.stringify(template)),
      id: Date.now() + i,
      expiresAt: Date.now() + expiresIn,
      category: 'advanced'
    });
  }

  gameState.advancedJobs = newJobs;
  gameState.lastAdvancedJobRefresh = Date.now();
  saveGame();
  render();
  showMessage(`🎯 ${numJobs} new advanced opportunities available!`, 'success');
}

function checkAdvancedJobExpiry() {
  const now = Date.now();
  const expiredJobs = gameState.advancedJobs.filter(job => job.expiresAt <= now);

  if (expiredJobs.length > 0) {
    gameState.advancedJobs = gameState.advancedJobs.filter(job => job.expiresAt > now);
    saveGame();
    render();
    showMessage(`⏰ ${expiredJobs.length} advanced job(s) expired`, 'warning');
  }
}

function checkAdvancedJobRequirements(job) {
  const missing = [];

  // Check heat limit
  if (job.maxHeat && gameState.player.heat > job.maxHeat) {
    missing.push(`Heat must be ≤ ${job.maxHeat} (currently ${gameState.player.heat})`);
  }

  // Check intel cost
  if (job.intelCost && gameState.player.intel < job.intelCost) {
    missing.push(`${job.intelCost} intel needed (have ${gameState.player.intel})`);
  }

  // Check minimum crew count
  if (job.minCrew && gameState.crew.filter(c => !c.onJob).length < job.minCrew) {
    missing.push(`${job.minCrew} available crew members needed`);
  }

  // Check crew specializations
  const reqCheck = checkJobRequirements(job);
  if (!reqCheck.met) {
    missing.push(...reqCheck.missing);
  }

  return {met: missing.length === 0, missing};
}

function doAdvancedJob(jobId) {
  const job = gameState.advancedJobs.find(j => j.id === jobId);
  if (!job) {
    showMessage('Job not found', 'error');
    return;
  }

  // Check if job expired
  if (job.expiresAt <= Date.now()) {
    showMessage('This opportunity has expired', 'error');
    gameState.advancedJobs = gameState.advancedJobs.filter(j => j.id !== jobId);
    render();
    return;
  }

  // Check requirements
  const reqCheck = checkAdvancedJobRequirements(job);
  if (!reqCheck.met) {
    showMessage(`Missing requirements: ${reqCheck.missing.join(', ')}`, 'error');
    return;
  }

  // Check energy
  if (gameState.player.energy < job.energy) {
    showMessage(`Not enough energy (need ${job.energy}, have ${gameState.player.energy})`, 'error');
    return;
  }

  // Spend intel if required
  if (job.intelCost) {
    gameState.player.intel -= job.intelCost;
  }

  // Deduct energy
  gameState.player.energy -= job.energy;

  // Mark job as active (DON'T remove it from the list)
  const jobIndex = gameState.advancedJobs.findIndex(j => j.id === jobId);
  gameState.advancedJobs[jobIndex].isActive = true;
  gameState.advancedJobs[jobIndex].startTime = Date.now();
  gameState.advancedJobs[jobIndex].endTime = Date.now() + job.duration;

  // Add to active jobs for tracking
  const activeJob = {
    ...job,
    assignedTo: 'player',
    startTime: Date.now(),
    endTime: Date.now() + job.duration
  };

  gameState.activeJobs.push(activeJob);

  saveGame();
  render();
  showMessage(`Starting: ${job.name} - ${job.desc}`, 'info');

  // Set completion timer
  setTimeout(() => completeAdvancedJob(job.id), job.duration);
}

function completeAdvancedJob(jobId) {
  const activeJobIndex = gameState.activeJobs.findIndex(j => j.id === jobId);
  if (activeJobIndex === -1) return;

  const job = gameState.activeJobs[activeJobIndex];
  const bonuses = calculateJobBonuses();
  const finalSuccessRate = Math.min(0.95, job.successRate + bonuses.successRate);
  const success = Math.random() < finalSuccessRate;

  // Remove from active jobs
  gameState.activeJobs.splice(activeJobIndex, 1);

  // Remove the job from advanced jobs list now that it's complete
  gameState.advancedJobs = gameState.advancedJobs.filter(j => j.id !== jobId);

  if (success) {
    // Calculate rewards with bonuses
    const moneyEarned = Math.floor((job.money[0] + Math.random() * (job.money[1] - job.money[0])) * (1 + bonuses.money));
    const xpEarned = Math.floor(job.xp * (1 + bonuses.xp));

    gameState.player.money += moneyEarned;
    gameState.player.xp += xpEarned;
    gameState.player.respect += job.respect;
    gameState.stats.totalMoneyEarned += moneyEarned;
    gameState.stats.jobsCompleted++;

    // Apply heat changes
    if (job.heatGain) {
      modifyHeat(job.heatGain);
    } else if (job.heatReduction) {
      modifyHeat(-job.heatReduction);
    }

    // Add to history
    addToJobHistory({
      name: job.name,
      success: true,
      money: moneyEarned,
      xp: xpEarned,
      respect: job.respect,
      timestamp: Date.now(),
      type: 'advanced'
    });

    showMessage(`✅ SUCCESS: ${job.name}! Earned $${moneyEarned.toLocaleString()}, ${xpEarned} XP, ${job.respect} respect`, 'success');

    // Check for level up
    checkLevelUp();
    checkAchievements();

    // Generate new jobs if this was the last advanced job
    if (gameState.advancedJobs.filter(j => !j.isActive).length === 0) {
      setTimeout(() => generateAdvancedJobs(), 2000);
    }
  } else {
    gameState.stats.jobsFailed++;

    // Failed jobs still generate some heat
    if (job.heatGain) {
      modifyHeat(Math.floor(job.heatGain * 0.5));
    }

    // Add to history
    addToJobHistory({
      name: job.name,
      success: false,
      money: 0,
      xp: 0,
      respect: 0,
      timestamp: Date.now(),
      type: 'advanced'
    });

    showMessage(`❌ FAILED: ${job.name}. Better luck next time.`, 'error');
  }

  saveGame();
  render();
}

// Auto-refresh advanced jobs every 30 minutes
function checkAdvancedJobRefresh() {
  if (!gameState.lastAdvancedJobRefresh) {
    gameState.lastAdvancedJobRefresh = Date.now();
  }

  const timeSinceRefresh = Date.now() - gameState.lastAdvancedJobRefresh;
  const refreshInterval = 30 * 60 * 1000; // 30 minutes

  if (timeSinceRefresh >= refreshInterval) {
    generateAdvancedJobs();
  }
}

// Render Advanced Jobs Tab
function renderAdvancedJobs() {
  const timeRemaining = (time) => {
    const mins = Math.floor(time / 60000);
    return mins < 60 ? `${mins}min` : `${Math.floor(mins / 60)}h ${mins % 60}min`;
  };

  return `
    <div class="space-y-6 mt-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-red-600">🎯 ADVANCED OPERATIONS</h2>
          <p class="text-sm text-gray-400">Time-limited opportunities • Unlocked at Level 5</p>
        </div>
        <button onclick="generateAdvancedJobs()" class="px-4 py-2 font-bold text-sm uppercase bg-purple-700 hover:bg-purple-600 text-white border border-purple-500">
          🔄 Refresh Jobs
        </button>
      </div>

      <!-- Advanced Jobs -->
      <div class="space-y-4">
        ${gameState.advancedJobs.length === 0 ? `
          <div class="p-8 text-center bg-zinc-900 border border-zinc-800">
            <p class="text-gray-400">No advanced opportunities currently available.</p>
            <p class="text-sm text-gray-500 mt-2">New jobs appear every 30 minutes or when you complete one.</p>
            <button onclick="generateAdvancedJobs()" class="mt-4 px-4 py-2 font-bold text-sm uppercase bg-purple-700 hover:bg-purple-600 text-white border border-purple-500">
              Generate Jobs Now
            </button>
          </div>
        ` : gameState.advancedJobs.map(job => {
          const reqCheck = checkAdvancedJobRequirements(job);
          const timeLeft = job.expiresAt - Date.now();
          const isExpired = timeLeft <= 0;
          const isActive = job.isActive;
          const progressPercent = isActive ? Math.min(100, ((Date.now() - job.startTime) / (job.endTime - job.startTime)) * 100) : 0;
          const jobTimeLeft = isActive ? Math.max(0, job.endTime - Date.now()) : 0;

          return `
            <div class="p-4 bg-zinc-900 border-2 ${isActive ? 'border-green-700' : isExpired ? 'border-gray-800 opacity-50' : reqCheck.met ? 'border-yellow-700' : 'border-zinc-800'}">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h3 class="text-lg font-bold ${isActive ? 'text-green-400' : 'text-yellow-400'}">${job.name} ${isActive ? '⏳ IN PROGRESS' : ''}</h3>
                  <p class="text-sm text-gray-400">${job.desc}</p>
                  ${isActive ? `<p class="text-xs text-green-400 mt-1">⏱️ ${timeRemaining(jobTimeLeft)} remaining</p>` : isExpired ? `<p class="text-xs text-red-400 mt-1">⏰ EXPIRED</p>` : `<p class="text-xs text-orange-400 mt-1">⏰ Expires in ${timeRemaining(timeLeft)}</p>`}
                </div>
                <div class="flex items-center gap-1 px-2 py-1 border text-xs uppercase font-bold ${getRiskColor(job.risk)}">
                  <span>${getRiskIcon(job.risk)}</span>
                  <span>${job.risk}</span>
                </div>
              </div>

              ${isActive ? `
                <div class="mb-3">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-gray-400">Progress</span>
                    <span class="text-green-400">${Math.floor(progressPercent)}%</span>
                  </div>
                  <div class="w-full bg-zinc-800 h-3 border border-zinc-700">
                    <div class="bg-gradient-to-r from-green-600 to-green-400 h-full transition-all duration-1000" style="width: ${progressPercent}%"></div>
                  </div>
                </div>
              ` : ''}

              <!-- Requirements & Rewards -->
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p class="text-xs text-gray-400 uppercase mb-1">Requirements</p>
                  <div class="space-y-1">
                    <p class="text-xs text-gray-300">⚡ ${job.energy} Energy</p>
                    <p class="text-xs text-gray-300">⏱️ ${Math.floor(job.duration / 1000)}s duration</p>
                    ${job.intelCost ? `<p class="text-xs ${gameState.player.intel >= job.intelCost ? 'text-blue-400' : 'text-red-400'}">🕵️ ${job.intelCost} Intel ${gameState.player.intel >= job.intelCost ? '✓' : '✗'}</p>` : ''}
                    ${job.maxHeat ? `<p class="text-xs ${gameState.player.heat <= job.maxHeat ? 'text-green-400' : 'text-red-400'}">🚨 Heat ≤ ${job.maxHeat} ${gameState.player.heat <= job.maxHeat ? '✓' : '✗'}</p>` : ''}
                    ${job.minCrew ? `<p class="text-xs ${gameState.crew.filter(c => !c.onJob).length >= job.minCrew ? 'text-green-400' : 'text-red-400'}">👥 ${job.minCrew}+ crew ${gameState.crew.filter(c => !c.onJob).length >= job.minCrew ? '✓' : '✗'}</p>` : ''}
                  </div>
                </div>
                <div>
                  <p class="text-xs text-gray-400 uppercase mb-1">Rewards</p>
                  <div class="space-y-1">
                    <p class="text-xs text-green-400">💰 $${job.money[0].toLocaleString()} - $${job.money[1].toLocaleString()}</p>
                    <p class="text-xs text-cyan-400">⭐ ${job.xp} XP</p>
                    <p class="text-xs text-purple-400">🎖️ ${job.respect} Respect</p>
                    <p class="text-xs text-green-400">★ ${Math.floor(job.successRate * 100)}% Success Rate</p>
                    ${job.heatGain ? `<p class="text-xs text-orange-400">🚨 +${job.heatGain} Heat</p>` : ''}
                    ${job.heatReduction ? `<p class="text-xs text-blue-400">🧊 -${job.heatReduction} Heat</p>` : ''}
                  </div>
                </div>
              </div>

              <!-- Crew Requirements -->
              ${job.requirements.crewType || job.requirements.vehicle ? `
                <div class="flex flex-wrap gap-1 mb-3">
                  ${job.requirements.crewType ? job.requirements.crewType.map(spec => {
                    const hasSpec = gameState.crew.some(m => m.specializations && m.specializations.includes(spec));
                    return `<span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${getSpecializationColor(spec)} ${!hasSpec ? 'opacity-50' : ''}">
                      ${getSpecializationIcon(spec)} ${spec} ${hasSpec ? '✓' : '✗'}
                    </span>`;
                  }).join('') : ''}
                  ${job.requirements.vehicle ? `<span class="px-2 py-0.5 text-xs font-bold uppercase border rounded ${gameState.equipment.some(e => e.category === 'vehicle') ? 'bg-yellow-950 text-yellow-300 border-yellow-700' : 'bg-gray-950 text-gray-500 border-gray-800 opacity-50'}">
                    🚗 Vehicle ${gameState.equipment.some(e => e.category === 'vehicle') ? '✓' : '✗'}
                  </span>` : ''}
                </div>
              ` : ''}

              <!-- Action Button -->
              ${!isActive ? `
                <button
                  onclick="doAdvancedJob(${job.id})"
                  ${!reqCheck.met || isExpired ? 'disabled' : ''}
                  class="w-full px-4 py-2 font-bold text-sm uppercase transition ${
                    !reqCheck.met || isExpired
                      ? 'bg-gray-800 text-gray-600 border border-gray-700 cursor-not-allowed'
                      : 'bg-red-700 hover:bg-red-600 text-white border border-red-500'
                  }"
                >
                  ${isExpired ? '⏰ EXPIRED' : !reqCheck.met ? '🔒 REQUIREMENTS NOT MET' : '▶ START OPERATION'}
                </button>

                ${!reqCheck.met && !isExpired && reqCheck.missing.length > 0 ? `
                  <p class="text-xs text-red-400 mt-2">Missing: ${reqCheck.missing.join(', ')}</p>
                ` : ''}
              ` : `
                <div class="p-3 bg-green-950 border border-green-800 text-center">
                  <p class="text-sm text-green-400 font-bold">🔄 Operation in progress...</p>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Initialize on page load
if (gameState.advancedJobs === undefined) {
  gameState.advancedJobs = [];
  gameState.lastAdvancedJobRefresh = null;
}

if (gameState.player.heat === undefined) {
  gameState.player.heat = 0;
  gameState.player.intel = 0;
  gameState.player.lastHeatUpdate = Date.now();
}

// Check for completed advanced jobs (important after page refresh)
function checkAdvancedJobCompletion() {
  const now = Date.now();
  const completedJobs = [];

  gameState.advancedJobs.forEach(job => {
    if (job.isActive && job.endTime && job.endTime <= now) {
      completedJobs.push(job.id);
    }
  });

  completedJobs.forEach(jobId => {
    completeAdvancedJob(jobId);
  });
}

// Check for completed intel operations (important after page refresh)
function checkIntelOpCompletion() {
  if (!gameState.activeIntelOps) return;

  const now = Date.now();
  const completedOps = [];

  gameState.activeIntelOps.forEach(op => {
    if (op.endTime && op.endTime <= now) {
      completedOps.push(op);
    }
  });

  completedOps.forEach(op => {
    // Remove from active ops
    gameState.activeIntelOps = gameState.activeIntelOps.filter(o => o.id !== op.id);

    // Complete the operation
    const selected = op.settings;
    const success = Math.random() < selected.successRate;

    if (success) {
      const intelGained = Math.floor(Math.random() * (selected.intel[1] - selected.intel[0] + 1)) + selected.intel[0];
      gameState.player.intel += intelGained;

      if (Math.random() < selected.heatRisk) {
        const heatGain = Math.floor(Math.random() * 5) + 3;
        modifyHeat(heatGain);
        showMessage(`🕵️ ${op.name} completed! Gained ${intelGained} intel (but noticed!)`, 'success');
      } else {
        showMessage(`🕵️ ${op.name} completed! Gained ${intelGained} intel!`, 'success');
      }
    } else {
      const heatGain = Math.floor(Math.random() * 8) + 5;
      modifyHeat(heatGain);
      showMessage(`❌ ${op.name} failed! Heat increased!`, 'error');
    }
  });

  if (completedOps.length > 0) {
    saveGame();
  }
}

// Update loop - check every minute
setInterval(() => {
  updateHeatDecay();
  checkAdvancedJobExpiry();
  checkAdvancedJobRefresh();
  checkAdvancedJobCompletion();
  checkIntelOpCompletion();
}, 60000);

// Update progress bars every second for active jobs and intel ops
setInterval(() => {
  const hasActiveJobs = gameState.advancedJobs.some(j => j.isActive);
  const hasActiveIntel = gameState.activeIntelOps && gameState.activeIntelOps.length > 0;

  if (hasActiveJobs || hasActiveIntel) {
    checkAdvancedJobCompletion(); // Check if any jobs completed
    checkIntelOpCompletion(); // Check if any intel ops completed
    render();
  }
}, 1000);

// Initial check
updateHeatDecay();
checkAdvancedJobExpiry();
checkAdvancedJobCompletion(); // Check on load for jobs that completed during page close
checkIntelOpCompletion(); // Check on load for intel ops that completed
if (gameState.player.level >= 5 && gameState.advancedJobs.length === 0) {
  generateAdvancedJobs();
}
