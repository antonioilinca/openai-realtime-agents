import { Snake } from './snake.js';
import { FoodManager } from './food.js';
import { PowerUpManager } from './powerups.js';
import { UIManager } from './ui.js';

/** Lightweight event bus for decoupled communication */
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, handler) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(handler);
  }

  emit(event, payload) {
    (this.listeners[event] || []).forEach((handler) => handler(payload));
  }
}

/** Particle burst used on pickups and power events */
class ParticleSystem {
  constructor(ctx, cellSize) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.particles = [];
  }

  spawn(position, color) {
    for (let i = 0; i < 14; i += 1) {
      this.particles.push({
        x: position.x * this.cellSize + this.cellSize / 2,
        y: position.y * this.cellSize + this.cellSize / 2,
        radius: Math.random() * this.cellSize * 0.3 + 2,
        life: Math.random() * 0.5 + 0.4,
        vx: (Math.random() - 0.5) * 240,
        vy: (Math.random() - 0.5) * 240,
        color
      });
    }
  }

  update(dt) {
    this.particles = this.particles.filter((particle) => {
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 30 * dt;
      return particle.life > 0;
    });
  }

  draw() {
    this.particles.forEach((particle) => {
      this.ctx.globalAlpha = Math.max(0, particle.life * 1.5);
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });
  }
}

/** Procedural level manager generates obstacles based on level */
class LevelManager {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.level = 1;
    this.obstacles = [];
    this.transitionTimer = 0;
    this.sceneIndex = 0;
    this.scenes = [
      { id: 'desert', colors: ['#241d0c', '#f7971e'], stars: 0 },
      { id: 'neon', colors: ['#090014', '#ff00c3'], stars: 16 },
      { id: 'forest', colors: ['#04280f', '#0ddf8c'], stars: 6 },
      { id: 'space', colors: ['#020823', '#071952'], stars: 28 }
    ];
  }

  reset() {
    this.level = 1;
    this.obstacles = [];
    this.sceneIndex = 0;
    this.transitionTimer = 0;
  }

  /** Increase level difficulty */
  advanceLevel(score) {
    const nextLevel = Math.floor(score / 120) + 1;
    if (nextLevel !== this.level) {
      this.level = nextLevel;
      this.generateObstacles();
      this.transitionTimer = 2;
      this.sceneIndex = (this.sceneIndex + 1) % this.scenes.length;
    }
  }

  /** Create random obstacles with safe border */
  generateObstacles() {
    this.obstacles = [];
    const obstacleCount = Math.min(8 + this.level * 2, 32);
    for (let i = 0; i < obstacleCount; i += 1) {
      const x = Math.floor(Math.random() * (this.gridSize - 6)) + 3;
      const y = Math.floor(Math.random() * (this.gridSize - 6)) + 3;
      this.obstacles.push({ x, y });
    }
  }

  draw(ctx, cellSize, lighting) {
    ctx.save();
    this.obstacles.forEach((ob) => {
      ctx.fillStyle = `rgba(255,255,255,${0.05 * lighting})`;
      ctx.fillRect(ob.x * cellSize + 6, ob.y * cellSize + 6, cellSize - 12, cellSize - 12);
      ctx.strokeStyle = `rgba(0,255,179,${0.6 * lighting})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(ob.x * cellSize + 6, ob.y * cellSize + 6, cellSize - 12, cellSize - 12);
    });
    ctx.restore();
  }

  getScene() {
    return this.scenes[this.sceneIndex];
  }
}

/** Audio manager handles synthwave loop and fx */
class AudioManager {
  constructor() {
    this.context = null;
    this.musicGain = null;
    this.fxGain = null;
    this.master = 0.6;
    this.enabled = !!window.AudioContext;
  }

  init() {
    if (!this.enabled || this.context) return;
    this.context = new AudioContext();
    this.musicGain = this.context.createGain();
    this.fxGain = this.context.createGain();
    this.musicGain.gain.value = 0.4;
    this.fxGain.gain.value = 0.7;
    this.musicGain.connect(this.context.destination);
    this.fxGain.connect(this.context.destination);
    this.createMusicLoop();
  }

  createMusicLoop() {
    if (!this.context) return;
    const oscillator = this.context.createOscillator();
    const lfo = this.context.createOscillator();
    const lfoGain = this.context.createGain();
    lfo.frequency.value = 0.2;
    lfoGain.gain.value = 80;
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 220;
    oscillator.connect(this.musicGain);
    oscillator.start();
    lfo.start();
    this.musicOsc = oscillator;
  }

  setMusicVolume(value) {
    if (this.musicGain) this.musicGain.gain.value = value;
  }

  setFxVolume(value) {
    if (this.fxGain) this.fxGain.gain.value = value;
  }

  playFx(pitch = 440, duration = 0.2) {
    if (!this.context) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = 'triangle';
    osc.frequency.value = pitch;
    gain.gain.value = 0.6;
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.fxGain);
    osc.start();
    osc.stop(this.context.currentTime + duration);
  }
}

/** Tracks combos based on pickup cadence */
class ComboTracker {
  constructor() {
    this.multiplier = 1;
    this.timer = 0;
    this.peak = 1;
  }

  reset() {
    this.multiplier = 1;
    this.timer = 0;
    this.peak = 1;
  }

  registerPickup() {
    this.multiplier = Math.min(5, this.multiplier + 0.25);
    this.timer = 3;
    this.peak = Math.max(this.peak, this.multiplier);
  }

  update(dt) {
    if (this.timer > 0) {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.multiplier = 1;
      }
    }
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 32;
    this.cellSize = this.canvas.width / this.gridSize;
    this.events = new EventEmitter();
    this.levelManager = new LevelManager(this.gridSize);
    this.food = new FoodManager({ gridSize: this.gridSize, cellSize: this.cellSize, ctx: this.ctx });
    this.powerUps = new PowerUpManager();
    this.ui = new UIManager();
    this.audio = new AudioManager();
    this.combo = new ComboTracker();
    this.state = {
      running: false,
      lastTime: 0,
      score: 0,
      level: 1,
      ghost: false,
      slowFactor: 1,
      message: 'Swipe or use arrow keys to move.',
      multiplayer: false
    };
    this.skins = {
      classic: { name: 'Classic Neon', colors: ['#00ffb3', '#17f7ff'], glow: '#00ffb3', unlockScore: 0 },
      ember: { name: 'Solar Ember', colors: ['#ff9f1c', '#ff3c00'], glow: '#ff3c00', unlockScore: 150 },
      aurora: { name: 'Aurora Drift', colors: ['#17f7ff', '#8e2de2'], glow: '#8e2de2', unlockScore: 280 },
      void: { name: 'Quantum Void', colors: ['#f5f5f5', '#111111'], glow: '#f5f5f5', unlockScore: 420 }
    };
    this.snake = new Snake({ gridSize: this.gridSize, cellSize: this.cellSize, ctx: this.ctx, skins: this.skins });
    this.particles = new ParticleSystem(this.ctx, this.cellSize);
    this.backgroundTime = 0;
    this.touchStart = null;
    this.leaderboard = this.loadLeaderboard();
    this.setupUI();
    this.bindControls();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  setupUI() {
    this.ui.on((action, payload) => {
      switch (action) {
        case 'start':
          this.startGame();
          break;
        case 'resume':
          this.resume();
          break;
        case 'restart':
        case 'replay':
          this.startGame();
          break;
        case 'main':
          this.stop();
          this.ui.showMenu('main-menu');
          break;
        case 'skins':
          this.ui.renderSkins(this.skins, this.state.score);
          this.ui.showMenu('skins-menu');
          break;
        case 'leaderboard':
          this.ui.updateLeaderboard(this.leaderboard);
          this.ui.showMenu('leaderboard-menu');
          break;
        case 'settings':
          this.ui.setSettings({
            musicVolume: this.audio.musicGain?.gain.value ?? 0.4,
            fxVolume: this.audio.fxGain?.gain.value ?? 0.7,
            multiplayer: this.state.multiplayer
          });
          this.ui.showMenu('settings-menu');
          break;
        case 'about':
          this.ui.showMenu('about-menu');
          break;
        case 'back':
          this.ui.showMenu('main-menu');
          break;
        case 'share':
          navigator.clipboard?.writeText(`I scored ${this.state.score} in Neon Serpent!`).catch(() => {});
          break;
        case 'select-skin':
          this.snake.setSkin(payload);
          this.ui.showMenu('main-menu');
          break;
        default:
          break;
      }
    });

    const { music, fx, multiplayer } = this.ui.getSettingsControls();
    music.addEventListener('input', () => this.audio.setMusicVolume(Number(music.value)));
    fx.addEventListener('input', () => this.audio.setFxVolume(Number(fx.value)));
    multiplayer.addEventListener('change', () => {
      this.state.multiplayer = multiplayer.checked;
      this.state.message = multiplayer.checked
        ? 'Multiplayer arena is experimental. Invite a friend soon!'
        : 'Swipe or use arrow keys to move.';
      this.ui.setMessage(this.state.message);
    });
  }

  bindControls() {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          this.snake.setDirection(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          this.snake.setDirection(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          this.snake.setDirection(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          this.snake.setDirection(1, 0);
          break;
        case 'Escape':
          this.pause();
          break;
        default:
          break;
      }
    });

    this.canvas.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      this.touchStart = { x: touch.clientX, y: touch.clientY };
    });
    this.canvas.addEventListener('touchmove', (event) => {
      if (!this.touchStart) return;
      const touch = event.touches[0];
      const dx = touch.clientX - this.touchStart.x;
      const dy = touch.clientY - this.touchStart.y;
      if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.snake.setDirection(Math.sign(dx), 0);
        } else {
          this.snake.setDirection(0, Math.sign(dy));
        }
        this.touchStart = null;
      }
    });

    document.querySelectorAll('#touch-controls .touch-button').forEach((button) => {
      button.addEventListener('click', () => {
        const dir = button.dataset.direction;
        if (dir === 'up') this.snake.setDirection(0, -1);
        if (dir === 'down') this.snake.setDirection(0, 1);
        if (dir === 'left') this.snake.setDirection(-1, 0);
        if (dir === 'right') this.snake.setDirection(1, 0);
      });
    });

    this.canvas.addEventListener('click', () => this.audio.init(), { once: true });
  }

  startGame() {
    this.audio.init();
    this.state.running = true;
    this.state.score = 0;
    this.state.level = 1;
    this.state.message = 'Collect food, chain combos, avoid walls!';
    this.combo.reset();
    this.snake.reset();
    this.food.reset();
    this.powerUps.reset();
    this.levelManager.reset();
    this.particles.particles = [];
    this.ui.hideMenus();
    this.ui.setMessage(this.state.message);
  }

  pause() {
    if (!this.state.running) return;
    this.state.running = false;
    this.ui.showMenu('pause-menu');
  }

  resume() {
    if (this.state.running) return;
    this.state.running = true;
    this.ui.hideMenus();
  }

  stop() {
    this.state.running = false;
  }

  loop(timestamp) {
    const dt = Math.min(0.05, (timestamp - this.state.lastTime) / 1000 || 0);
    this.state.lastTime = timestamp;
    this.update(dt);
    this.draw(dt);
    requestAnimationFrame(this.loop);
  }

  update(dt) {
    if (!this.state.running) return;

    const adjustedDt = dt * this.state.slowFactor;
    this.combo.update(adjustedDt);
    this.backgroundTime += adjustedDt;

    const moved = this.snake.update(adjustedDt);
    if (this.snake.hitWall) {
      if (this.state.ghost) {
        this.snake.hitWall = false;
        this.snake.alive = true;
      } else {
        this.gameOver();
        return;
      }
    }
    if (moved) {
      this.checkCollisions();
    }

    const forbidden = [...this.snake.segments, ...this.levelManager.obstacles];
    this.food.update(adjustedDt, forbidden);
    this.powerUps.update(adjustedDt, {
      snake: this.snake,
      food: this.food,
      gridSize: this.gridSize,
      forbidden,
      canvasCtx: this.ctx,
      cellSize: this.cellSize,
      events: this.events,
      state: this.state
    });
    this.particles.update(adjustedDt);
    this.levelManager.advanceLevel(this.state.score);

    this.ui.updateHud({
      score: this.state.score,
      level: this.levelManager.level,
      combo: this.combo,
      powerUps: this.powerUps.getActivePowerUps(),
      message: this.state.message
    });
  }

  checkCollisions() {
    const head = this.snake.segments[0];
    const collided = this.levelManager.obstacles.some((ob) => ob.x === head.x && ob.y === head.y);
    if (collided && !this.state.ghost) {
      this.gameOver();
      return;
    }

    if (this.snake.collidedWithSelf() && !this.state.ghost) {
      this.gameOver();
      return;
    }

    const consumed = this.food.consume(head);
    if (consumed) {
      this.combo.registerPickup();
      const gain = Math.floor(consumed.value * this.combo.multiplier);
      this.state.score += gain;
      this.snake.grow(1);
      this.audio.playFx(620, 0.15);
      this.particles.spawn(head, consumed.color);
    }

    const power = this.powerUps.consume(head, {
      snake: this.snake,
      food: this.food,
      gridSize: this.gridSize,
      forbidden: [...this.snake.segments, ...this.levelManager.obstacles],
      canvasCtx: this.ctx,
      cellSize: this.cellSize,
      events: this.events,
      state: this.state
    });
    if (power) {
      this.audio.playFx(320, 0.4);
      this.particles.spawn(head, '#ffffff');
      this.state.message = `${power.label} activated!`;
    }
  }

  draw() {
    const scene = this.levelManager.getScene();
    const cycle = (Math.sin(this.backgroundTime * 0.1) + 1) / 2;
    const lighting = 0.6 + cycle * 0.4;
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, scene.colors[0]);
    gradient.addColorStop(1, scene.colors[1]);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // overlay stars for space theme
    if (scene.stars > 0) {
      this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (let i = 0; i < scene.stars; i += 1) {
        const x = (i * 97 + Math.sin(this.backgroundTime + i) * 120) % this.canvas.width;
        const y = (i * 53 + Math.cos(this.backgroundTime * 0.8 + i) * 90) % this.canvas.height;
        this.ctx.fillRect(x, y, 2, 2);
      }
    }

    this.levelManager.draw(this.ctx, this.cellSize, lighting);
    this.food.draw(lighting);
    this.powerUps.draw({ canvasCtx: this.ctx, cellSize: this.cellSize }, lighting);
    this.snake.draw(lighting);
    this.particles.draw();

    // day/night overlay glow
    this.ctx.fillStyle = `rgba(0,0,0,${0.2 + (1 - cycle) * 0.3})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOver() {
    this.state.running = false;
    this.ui.showSummary({ score: this.state.score, level: this.levelManager.level, comboPeak: this.combo.peak });
    this.saveLeaderboardEntry({ name: 'Player', score: this.state.score });
    this.snake.alive = false;
    this.snake.hitWall = false;
    this.audio.playFx(180, 0.5);
  }

  loadLeaderboard() {
    try {
      return JSON.parse(localStorage.getItem('neon-serpent-leaderboard')) || [];
    } catch (error) {
      console.warn('Leaderboard unavailable', error);
      return [];
    }
  }

  saveLeaderboardEntry(entry) {
    this.leaderboard.push(entry);
    this.leaderboard = this.leaderboard.sort((a, b) => b.score - a.score).slice(0, 20);
    localStorage.setItem('neon-serpent-leaderboard', JSON.stringify(this.leaderboard));
  }
}

// bootstrap game when DOM is ready
window.addEventListener('load', () => {
  new Game();
});
