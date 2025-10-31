/**
 * Power-up system provides modular buffs with timed effects. Each power-up
 * exposes hooks for activation, update, and cleanup so they can influence the
 * snake or game state seamlessly.
 */
export class PowerUpManager {
  constructor() {
    this.active = [];
    this.pool = ['speed', 'ghost', 'magnet', 'slow'];
    this.spawnCooldown = 12;
    this.timer = this.spawnCooldown;
  }

  /** Remove all state between runs */
  reset() {
    this.active = [];
    this.timer = this.spawnCooldown;
  }

  /**
   * Attempt to spawn a new power-up and update active ones.
   * @param {number} dt - delta time in seconds
   * @param {object} ctx - shared game context (snake, food, arena, etc.)
   */
  update(dt, ctx) {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = this.spawnCooldown + Math.random() * 6;
      this.spawn(ctx);
    }

    this.active = this.active.filter((power) => {
      power.update(dt, ctx);
      if (power.remaining <= 0) {
        power.deactivate(ctx);
        return false;
      }
      return true;
    });
  }

  /**
   * Spawn a power-up in the arena if there is free space.
   * @param {object} ctx - shared game context
   */
  spawn(ctx) {
    const type = this.pool[Math.floor(Math.random() * this.pool.length)];
    const power = createPowerUp(type);
    if (!power) return;
    const maxAttempts = 40;
    for (let i = 0; i < maxAttempts; i += 1) {
      const pos = {
        x: Math.floor(Math.random() * ctx.gridSize),
        y: Math.floor(Math.random() * ctx.gridSize)
      };
      const collision = ctx.forbidden.some((cell) => cell.x === pos.x && cell.y === pos.y);
      if (!collision) {
        power.position = pos;
        this.active.push(power);
        ctx.events.emit('powerup-spawn', power);
        break;
      }
    }
  }

  /** Attempt to consume a power-up at the provided position */
  consume(coord, ctx) {
    const index = this.active.findIndex((power) => power.position && power.position.x === coord.x && power.position.y === coord.y);
    if (index >= 0) {
      const [power] = this.active.splice(index, 1);
      power.activate(ctx);
      ctx.events.emit('powerup-activate', power);
      this.active.push(power); // re-add to track timer for duration
      return power;
    }
    return null;
  }

  /** Draw spawned power-ups */
  draw(ctx, lighting = 1) {
    const { cellSize, canvasCtx } = ctx;
    this.active.forEach((power) => {
      if (!power.position || power.remaining <= 0) return;
      const x = power.position.x * cellSize;
      const y = power.position.y * cellSize;
      canvasCtx.save();
      canvasCtx.translate(x + cellSize / 2, y + cellSize / 2);
      canvasCtx.fillStyle = power.getColor(lighting);
      canvasCtx.shadowColor = power.getGlow();
      canvasCtx.shadowBlur = 18;
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, -cellSize * 0.35);
      for (let i = 1; i < 6; i += 1) {
        const angle = (i / 5) * Math.PI * 2;
        const radius = cellSize * 0.35 * (i % 2 === 0 ? 0.6 : 1);
        canvasCtx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      canvasCtx.closePath();
      canvasCtx.fill();
      canvasCtx.restore();
    });
  }

  /** Provide UI representation of active power-ups */
  getActivePowerUps() {
    return this.active
      .filter((power) => power.remaining > 0 && !power.position)
      .map((power) => ({
        id: power.id,
        label: power.label,
        remaining: power.remaining,
        duration: power.duration
      }));
  }
}

/** Base class for common power-up behavior */
class PowerUp {
  constructor({ id, label, duration }) {
    this.id = id;
    this.label = label;
    this.duration = duration;
    this.remaining = duration;
    this.position = null;
  }

  activate(ctx) {
    this.remaining = this.duration;
    this.position = null;
    this.onActivate(ctx);
  }

  update(dt, ctx) {
    if (!this.position) {
      this.remaining -= dt;
      this.onUpdate(dt, ctx);
    }
  }

  deactivate(ctx) {
    this.onDeactivate(ctx);
  }

  getColor(lighting) {
    return this.color;
  }

  getGlow() {
    return this.glow;
  }

  // Hooks to be implemented by subclasses
  onActivate() {}
  onUpdate() {}
  onDeactivate() {}
}

class SpeedBoost extends PowerUp {
  constructor() {
    super({ id: 'speed', label: 'Speed Boost', duration: 6 });
    this.color = 'rgba(255, 60, 0, 0.9)';
    this.glow = '#ff3c00';
  }

  onActivate(ctx) {
    ctx.snake.boost(1.6);
  }

  onDeactivate(ctx) {
    ctx.snake.normalizeSpeed();
  }
}

class GhostMode extends PowerUp {
  constructor() {
    super({ id: 'ghost', label: 'Ghost Mode', duration: 5 });
    this.color = 'rgba(23, 247, 255, 0.9)';
    this.glow = '#17f7ff';
  }

  onActivate(ctx) {
    ctx.state.ghost = true;
    ctx.snake.setWrapMode(true);
    ctx.snake.hitWall = false;
  }

  onDeactivate(ctx) {
    ctx.state.ghost = false;
    ctx.snake.setWrapMode(false);
  }
}

class Magnet extends PowerUp {
  constructor() {
    super({ id: 'magnet', label: 'Magnet', duration: 7 });
    this.color = 'rgba(0, 255, 179, 0.9)';
    this.glow = '#00ffb3';
  }

  onUpdate(dt, ctx) {
    ctx.food.attract(ctx.snake.segments[0]);
  }
}

class SlowMotion extends PowerUp {
  constructor() {
    super({ id: 'slow', label: 'Slow Motion', duration: 6 });
    this.color = 'rgba(142, 45, 226, 0.9)';
    this.glow = '#8e2de2';
  }

  onActivate(ctx) {
    ctx.state.slowFactor = 0.55;
  }

  onDeactivate(ctx) {
    ctx.state.slowFactor = 1;
  }
}

/** Factory helper used by the manager */
function createPowerUp(type) {
  switch (type) {
    case 'speed':
      return new SpeedBoost();
    case 'ghost':
      return new GhostMode();
    case 'magnet':
      return new Magnet();
    case 'slow':
      return new SlowMotion();
    default:
      return null;
  }
}
