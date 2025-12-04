const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let width, height, columns, drops;

function resizeMatrix() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 18);
  drops = Array.from({ length: columns }, () => Math.random() * height / 18);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#00ff41';
  ctx.font = '16px "Share Tech Mono"';
  drops.forEach((y, i) => {
    const text = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
    const x = i * 18;
    ctx.fillText(text, x, y * 18);
    if (y * 18 > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i] += 1 + Math.random() * 0.5;
  });
  requestAnimationFrame(drawMatrix);
}

resizeMatrix();
window.addEventListener('resize', resizeMatrix);
requestAnimationFrame(drawMatrix);

const oracleStatus = document.getElementById('oracle-status');
const missionTitle = document.getElementById('mission-title');
const missionSub = document.getElementById('mission-sub');
const missionBadge = document.getElementById('mission-badge');
const missionBody = document.getElementById('mission-body');
const missionDifficulty = document.getElementById('mission-difficulty');
const missionTimer = document.getElementById('mission-timer');
const missionOracle = document.getElementById('mission-oracle');
const statsGrid = document.getElementById('stats-grid');
const debriefLog = document.getElementById('debrief-log');
const glitchOverlay = document.getElementById('glitch-overlay');

const profile = JSON.parse(localStorage.getItem('blackcell-profile') || 'null') || {
  observation: 48,
  intelligence: 52,
  cryptography: 40,
  stability: 50,
  decision: 50,
  readiness: 45,
  history: []
};

function saveProfile() {
  localStorage.setItem('blackcell-profile', JSON.stringify(profile));
}

function updateProfileUI() {
  statsGrid.innerHTML = '';
  const entries = [
    ['Observation Index', profile.observation],
    ['Intelligence Quotient Simulation', profile.intelligence],
    ['Cryptography Level', profile.cryptography],
    ['Psychological Stability', profile.stability],
    ['Decision-Making Quality', profile.decision],
    ['Field Readiness Score', profile.readiness]
  ];
  entries.forEach(([label, value]) => {
    const el = document.createElement('div');
    el.className = 'stat';
    el.innerHTML = `<label>${label}</label><span>${value.toFixed(1)}</span>`;
    statsGrid.appendChild(el);
  });
  debriefLog.innerHTML = '';
  profile.history.slice(-6).reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.title} — ${item.score.toFixed(1)}% | ${item.oracle}`;
    debriefLog.appendChild(li);
  });
}

updateProfileUI();

function pulseOracle(text) {
  oracleStatus.textContent = text;
  missionOracle.textContent = `"${text}"`;
}

function glitch(duration = 650) {
  glitchOverlay.style.opacity = 0.3;
  glitchOverlay.innerHTML = '<div class="glitch"></div>';
  setTimeout(() => {
    glitchOverlay.style.opacity = 0;
    glitchOverlay.innerHTML = '';
  }, duration);
}

function randomOracleComment(score) {
  const pool = [
    'Precision noted. Continue escalation.',
    'Emotionally neutral. Maintain that.',
    'Deviation detected. Correct course.',
    'Adaptive capability rising.',
    'Cognitive strain within tolerance.',
    'Signal: your intuition is converging.',
    'Anomaly minimization in progress.'
  ];
  if (score > 85) return 'Exceptional clarity. ORACLE-9 approves.';
  if (score < 45) return 'Instability observed. Recalibrate mind.';
  return pool[Math.floor(Math.random() * pool.length)];
}

function adjustProfile(results) {
  const { accuracy, reaction, load, stability, domain } = results;
  const delta = ((accuracy - 50) + (70 - reaction)) / 100;
  const impact = Math.max(Math.min(delta, 5), -5);
  if (domain === 'observation') profile.observation = clamp(profile.observation + impact, 0, 100);
  if (domain === 'intelligence') profile.intelligence = clamp(profile.intelligence + impact, 0, 100);
  if (domain === 'cryptography') profile.cryptography = clamp(profile.cryptography + impact, 0, 100);
  if (domain === 'stability') profile.stability = clamp(profile.stability + impact, 0, 100);
  if (domain === 'decision') profile.decision = clamp(profile.decision + impact, 0, 100);
  profile.readiness = clamp((profile.observation + profile.intelligence + profile.cryptography + profile.stability + profile.decision) / 5, 0, 100);
  profile.history.push({ title: currentMission.title, score: accuracy, oracle: randomOracleComment(accuracy) });
  saveProfile();
  updateProfileUI();
}

function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

const menus = {
  start: () => beginRandomMission(),
  training: () => setMission({ title: 'Training Room', sub: 'Controlled simulations for calibration.', badge: 'training', body: renderTrainingRoom }),
  archives: () => setMission({ title: 'Blackcell Archives', sub: 'Recovered intel fragments for study.', badge: 'archives', body: renderArchives }),
  settings: () => setMission({ title: 'System Settings', sub: 'Interface calibrations and API linking.', badge: 'settings', body: renderSettings }),
  exit: () => setMission({ title: 'Exit Protocol', sub: 'Session will remain encrypted locally.', badge: 'logout', body: renderExit })
};

document.querySelectorAll('#menu-panel .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    menus[action]();
    glitch();
  });
});

let currentMission = {};

function setMission({ title, sub, badge, difficulty = 'adaptive', body }) {
  currentMission = { title, difficulty, badge };
  missionTitle.textContent = title;
  missionSub.textContent = sub;
  missionBadge.textContent = badge;
  missionDifficulty.textContent = difficulty;
  missionBody.innerHTML = '';
  body(missionBody);
}

function beginRandomMission() {
  const missions = [microObservation, behavioralAnalysis, cryptanalysisChallenge, agentDecision, surveillanceTracking, cognitivePressure];
  const next = missions[Math.floor(Math.random() * missions.length)];
  next();
}

function createResultBlock(results) {
  const box = document.createElement('div');
  box.className = 'mission-result';
  box.innerHTML = `<h4>Debrief</h4>
    <ul>
      <li>Accuracy: ${results.accuracy.toFixed(1)}%</li>
      <li>Reaction Time: ${results.reaction.toFixed(1)}s</li>
      <li>Cognitive Load: ${results.load.toFixed(1)}%</li>
      <li>Stability Score: ${results.stability.toFixed(1)}%</li>
      <li>Oracle: ${results.oracle}</li>
    </ul>`;
  return box;
}

function concludeMission(results) {
  adjustProfile(results);
  missionBody.appendChild(createResultBlock(results));
  missionOracle.textContent = `"${results.oracle}"`;
  missionBadge.textContent = 'complete';
  missionTimer.textContent = 'logged';
  glitch(850);
}

function startTimer(duration, onTick, onEnd) {
  let remaining = duration;
  onTick(remaining);
  const id = setInterval(() => {
    remaining -= 1;
    onTick(remaining);
    if (remaining <= 0) {
      clearInterval(id);
      onEnd();
    }
  }, 1000);
  return () => clearInterval(id);
}

function microObservation() {
  const glyphs = '0123456789ABCDEF≡∴∆λπΩψΦ'.split('');
  const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
  setMission({
    title: 'Micro-Observation Test',
    sub: 'Flash visual memory calibration.',
    badge: 'observation',
    difficulty: 'rapid',
    body: container => {
      const tpl = document.getElementById('micro-template').content.cloneNode(true);
      const flash = tpl.querySelector('.flash');
      const options = tpl.querySelector('.micro-options');
      const start = performance.now();
      flash.textContent = glyph;
      pulseOracle('Focus. Capture the glyph.');
      setTimeout(() => { flash.textContent = '??'; }, 1200);
      const candidates = [...new Set([glyph, ...Array.from({ length: 3 }, () => glyphs[Math.floor(Math.random() * glyphs.length)])])].slice(0,4).sort(() => Math.random() - 0.5);
      candidates.forEach(c => {
        const b = document.createElement('button');
        b.className = 'btn';
        b.textContent = c;
        b.addEventListener('click', () => {
          const end = performance.now();
          const correct = c === glyph;
          const reaction = (end - start) / 1000;
          const accuracy = correct ? 100 : 25;
          concludeMission({ accuracy, reaction, load: 35 + Math.random() * 15, stability: correct ? 80 : 50, oracle: randomOracleComment(accuracy), domain: 'observation' });
        });
        options.appendChild(b);
      });
      container.appendChild(tpl);
    }
  });
}

function behavioralAnalysis() {
  const scenarios = [
    { cue: 'Subject micro-frown lasting 200ms when mission risk mentioned.', intents: ['masking fear', 'genuine disagreement', 'neutral stress', 'calculating response'], correct: 0 },
    { cue: 'Upper lip raise with narrowed eyes.', intents: ['contempt', 'joy', 'surprise', 'boredom'], correct: 0 },
    { cue: 'Rapid blink rate decrease, shallow nod.', intents: ['agreement without commitment', 'outright rejection', 'sleepiness', 'shock'], correct: 0 }
  ];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  setMission({
    title: 'Behavioral Analysis',
    sub: 'Decode the micro-expression.',
    badge: 'psyops',
    difficulty: 'adaptive',
    body: container => {
      const tpl = document.getElementById('decision-template').content.cloneNode(true);
      tpl.querySelector('.scenario-text').textContent = scenario.cue;
      const options = tpl.querySelector('.options');
      const start = performance.now();
      scenario.intents.forEach((intent, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = intent;
        btn.addEventListener('click', () => {
          const reaction = (performance.now() - start) / 1000;
          const correct = idx === scenario.correct;
          const accuracy = correct ? 96 : 40;
          concludeMission({ accuracy, reaction, load: 55 + Math.random() * 20, stability: correct ? 78 : 60, oracle: randomOracleComment(accuracy), domain: 'stability' });
        });
        options.appendChild(btn);
      });
      container.appendChild(tpl);
    }
  });
}

function cryptanalysisChallenge() {
  const sequences = [
    { pattern: '3, 9, 27, 81, ?', answer: '243' },
    { pattern: 'QX, RU, TY, VA, ?', answer: 'XZ' },
    { pattern: '2, 3, 5, 7, 11, ?', answer: '13' },
    { pattern: '█ ░ █ █ ░ ░ █ ░', question: 'Count black cells', answer: '5' }
  ];
  const puzzle = sequences[Math.floor(Math.random() * sequences.length)];
  setMission({
    title: 'Cryptanalysis Challenge',
    sub: 'Decode the sequence before the trace.',
    badge: 'crypto',
    difficulty: 'escalating',
    body: container => {
      const tpl = document.getElementById('sequence-template').content.cloneNode(true);
      const grid = tpl.querySelector('.sequence-grid');
      const input = tpl.querySelector('[data-role="answer"]');
      const submit = tpl.querySelector('[data-role="submit"]');
      const replay = tpl.querySelector('[data-role="replay"]');
      const data = (puzzle.pattern || puzzle.question).split(' ');
      data.forEach(cell => {
        const c = document.createElement('div');
        c.className = 'cell';
        c.textContent = cell;
        grid.appendChild(c);
      });
      const start = performance.now();
      let stopTimer;
      stopTimer = startTimer(25, t => missionTimer.textContent = `${t}s`, () => submit.click());
      replay.addEventListener('click', () => {
        pulseOracle('Replaying cipher frame...');
        grid.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 600 });
      });
      submit.addEventListener('click', () => {
        stopTimer && stopTimer();
        const reaction = (performance.now() - start) / 1000;
        const accuracy = input.value.trim().toUpperCase() === puzzle.answer.toUpperCase() ? 100 : 35;
        concludeMission({ accuracy, reaction, load: 60 + Math.random() * 20, stability: 70, oracle: randomOracleComment(accuracy), domain: 'cryptography' });
      });
      container.appendChild(tpl);
    }
  });
}

function agentDecision() {
  const scenarios = [
    {
      text: 'Two assets compromised. Extract one quietly or both loudly?',
      options: [
        { label: 'Extract one quietly, preserve cover.', weight: 85 },
        { label: 'Extract both loudly, risk exposure.', weight: 45 },
        { label: 'Delay extraction, gather intel.', weight: 70 }
      ]
    },
    {
      text: 'Intercepted transmission mentions "Project Helix". Pursue now or trace source?',
      options: [
        { label: 'Trace source silently.', weight: 90 },
        { label: 'Direct pursuit now.', weight: 55 },
        { label: 'Ignore; set honeypot.', weight: 75 }
      ]
    }
  ];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  setMission({
    title: 'Agent Decision Scenario',
    sub: 'Assess tactical and moral pathways.',
    badge: 'decision',
    difficulty: 'moral calculus',
    body: container => {
      const tpl = document.getElementById('decision-template').content.cloneNode(true);
      tpl.querySelector('.scenario-text').textContent = scenario.text;
      const options = tpl.querySelector('.options');
      const start = performance.now();
      scenario.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => {
          const reaction = (performance.now() - start) / 1000;
          const accuracy = opt.weight;
          concludeMission({ accuracy, reaction, load: 50 + Math.random() * 18, stability: 75, oracle: randomOracleComment(accuracy), domain: 'decision' });
        });
        options.appendChild(btn);
      });
      container.appendChild(tpl);
    }
  });
}

function surveillanceTracking() {
  const total = 16;
  const targetCells = new Set();
  while (targetCells.size < 5) targetCells.add(Math.floor(Math.random() * total));
  setMission({
    title: 'Tracking & Surveillance',
    sub: 'Follow target blips without losing them.',
    badge: 'tracking',
    difficulty: 'stealth',
    body: container => {
      const tpl = document.getElementById('sequence-template').content.cloneNode(true);
      const grid = tpl.querySelector('.sequence-grid');
      grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
      tpl.querySelector('[data-role="replay"]').style.display = 'none';
      tpl.querySelector('[data-role="answer"]').placeholder = 'Enter observed targets (e.g., 1,5,9)';
      const submit = tpl.querySelector('[data-role="submit"]');
      const input = tpl.querySelector('[data-role="answer"]');
      const start = performance.now();
      for (let i = 0; i < total; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = i + 1;
        grid.appendChild(cell);
      }
      const flashTargets = () => {
        targetCells.forEach(idx => {
          const c = grid.children[idx];
          c.animate([{ background: 'rgba(0,255,65,0.8)', color: '#000' }, { background: 'rgba(0,255,65,0.05)', color: '#c8ffc7' }], { duration: 800, iterations: 1 });
        });
      };
      flashTargets();
      let stopTimer = startTimer(20, t => missionTimer.textContent = `${t}s`, () => submit.click());
      submit.addEventListener('click', () => {
        stopTimer && stopTimer();
        const reaction = (performance.now() - start) / 1000;
        const guesses = input.value.split(/[,\s]+/).map(v => parseInt(v.trim(), 10)).filter(Number.isFinite);
        const correct = guesses.filter(g => targetCells.has(g - 1)).length;
        const accuracy = Math.max(0, Math.min(100, (correct / targetCells.size) * 100));
        concludeMission({ accuracy, reaction, load: 58 + Math.random() * 22, stability: 72, oracle: randomOracleComment(accuracy), domain: 'observation' });
      });
      container.appendChild(tpl);
    }
  });
}

function cognitivePressure() {
  const problems = [
    { q: 'If 7=42 and 3=12, what is 5?', a: '20' },
    { q: 'Path A success 0.6, Path B 0.45 but intel gain x1.4. Choose?', a: 'A' },
    { q: 'Mirror code of 194 is ___?', a: '491' }
  ];
  const p = problems[Math.floor(Math.random() * problems.length)];
  setMission({
    title: 'Cognitive Pressure Test',
    sub: 'Logic under time compression.',
    badge: 'pressure',
    difficulty: 'timed',
    body: container => {
      const prompt = document.createElement('div');
      prompt.className = 'scenario-text';
      prompt.textContent = p.q;
      const input = document.createElement('input');
      input.className = 'input';
      input.placeholder = 'Submit response';
      const submit = document.createElement('button');
      submit.className = 'btn';
      submit.textContent = 'Commit Answer';
      const start = performance.now();
      let stopTimer = startTimer(15, t => missionTimer.textContent = `${t}s`, () => submit.click());
      submit.addEventListener('click', () => {
        stopTimer && stopTimer();
        const reaction = (performance.now() - start) / 1000;
        const accuracy = input.value.trim().toUpperCase() === p.a.toUpperCase() ? 100 : 50;
        concludeMission({ accuracy, reaction, load: 75, stability: 65, oracle: randomOracleComment(accuracy), domain: 'intelligence' });
      });
      container.append(prompt, input, submit);
    }
  });
}

function renderTrainingRoom(container) {
  const info = document.createElement('p');
  info.className = 'scenario-text';
  info.textContent = 'Select a specific protocol to rehearse. Metrics will not degrade stability.';
  const list = document.createElement('div');
  list.className = 'options';
  const options = [
    ['Micro-Observation', microObservation],
    ['Behavioral Analysis', behavioralAnalysis],
    ['Cryptanalysis', cryptanalysisChallenge],
    ['Decision Scenario', agentDecision],
    ['Surveillance Tracking', surveillanceTracking],
    ['Cognitive Pressure', cognitivePressure]
  ];
  options.forEach(([label, fn]) => {
    const b = document.createElement('button');
    b.className = 'btn hollow';
    b.textContent = label;
    b.addEventListener('click', fn);
    list.appendChild(b);
  });
  container.append(info, list);
}

function renderArchives(container) {
  const info = document.createElement('div');
  info.className = 'scenario-text';
  info.innerHTML = 'Encrypted dossiers recovered from field ops.<br>Use them as mental warm-up.';
  const snippets = [
    '"Subject-Δ decoded 12 ciphers before the trace hit 50%."',
    '"Agent-Theta survived pressure chamber by slowing heartbeat to 42 bpm."',
    '"Blackcell Prototype used ORACLE-7; empathy layer caused cascade."'
  ];
  const ul = document.createElement('ul');
  ul.className = 'history';
  snippets.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    ul.appendChild(li);
  });
  container.append(info, ul);
}

function renderSettings(container) {
  const info = document.createElement('p');
  info.className = 'scenario-text';
  info.textContent = 'Link Google AI Studio Vision for optional visual analysis. Provide API key to activate.';
  const input = document.createElement('input');
  input.className = 'input';
  input.placeholder = 'Enter Google AI Studio API Key (stored locally)';
  input.value = localStorage.getItem('blackcell-api-key') || '';
  const save = document.createElement('button');
  save.className = 'btn';
  save.textContent = 'Store Key';
  save.addEventListener('click', () => {
    localStorage.setItem('blackcell-api-key', input.value.trim());
    pulseOracle('API key stored locally.');
  });
  const upload = document.createElement('input');
  upload.type = 'file';
  upload.accept = 'image/*';
  upload.className = 'input';
  upload.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const key = localStorage.getItem('blackcell-api-key');
    if (!key) { alert('Provide API key first.'); return; }
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      const payload = { contents: [{ parts: [{ text: 'Analyze for surveillance anomalies.' }, { inline_data: { data: base64, mime_type: file.type } }], role: 'user' }], generationConfig: { temperature: 0.2 } };
      pulseOracle('Sending frame to Vision model...');
      try {
        const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + encodeURIComponent(key), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(' ') || 'No response';
        missionOracle.textContent = `"${text}"`;
      } catch (err) {
        missionOracle.textContent = '"Vision request failed. Check network."';
      }
    };
    reader.readAsDataURL(file);
  });
  container.append(info, input, save, upload);
}

function renderExit(container) {
  const info = document.createElement('p');
  info.className = 'scenario-text';
  info.textContent = 'Session encrypted. You may close window; data resides locally within this terminal.';
  const btn = document.createElement('button');
  btn.className = 'btn hollow';
  btn.textContent = 'Purge Local Profile';
  btn.addEventListener('click', () => {
    localStorage.removeItem('blackcell-profile');
    location.reload();
  });
  container.append(info, btn);
}

setTimeout(() => pulseOracle('ORACLE-9 online. Choose your directive.'), 700);
