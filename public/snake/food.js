/**
 * FoodManager is responsible for spawning food pellets, combos, and managing
 * their visual representation. It also supports magnet attraction and particle
 * burst triggers.
 */
export class FoodManager {
  /**
   * @param {object} options
   * @param {number} options.gridSize - grid dimension used for spawn positions
   * @param {number} options.cellSize - pixel size for rendering
   * @param {CanvasRenderingContext2D} options.ctx - draw context
   */
  constructor({ gridSize, cellSize, ctx }) {
    this.gridSize = gridSize;
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.items = [];
    this.spawnInterval = 4;
    this.spawnTimer = 0;
  }

  /** Reset internal state */
  reset() {
    this.items = [];
    this.spawnTimer = 0;
  }

  /**
   * Step internal timers and spawn new food if required.
   * @param {number} dt - delta time in seconds
   * @param {Array<{x:number,y:number}>} forbidden - cells to avoid (snake + obstacles)
   */
  update(dt, forbidden) {
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = this.spawnInterval;
      this.spawnFood(forbidden);
    }
  }

  /** Spawn a food pellet in a random free cell */
  spawnFood(forbidden) {
    const maxAttempts = 50;
    for (let i = 0; i < maxAttempts; i += 1) {
      const pos = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };
      if (!forbidden.some((cell) => cell.x === pos.x && cell.y === pos.y)) {
        this.items.push({
          ...pos,
          value: 10,
          comboWindow: 3,
          aliveTime: 0,
          color: this.randomColor()
        });
        break;
      }
    }
  }

  /**
   * Attract nearby food towards a magnet origin.
   * @param {{x:number,y:number}} origin - magnet center
   */
  attract(origin) {
    this.items.forEach((item) => {
      const dx = origin.x - item.x;
      const dy = origin.y - item.y;
      item.x += Math.sign(dx) * Math.min(0.25, Math.abs(dx) * 0.08);
      item.y += Math.sign(dy) * Math.min(0.25, Math.abs(dy) * 0.08);
    });
  }

  /** Remove a food item matching the provided coordinate */
  consume(coord) {
    const index = this.items.findIndex((item) => Math.floor(item.x) === coord.x && Math.floor(item.y) === coord.y);
    if (index >= 0) {
      return this.items.splice(index, 1)[0];
    }
    return null;
  }

  /** Draw each food pellet with neon glow */
  draw(lighting = 1) {
    this.items.forEach((item) => {
      const x = item.x * this.cellSize;
      const y = item.y * this.cellSize;
      const radius = this.cellSize * 0.35;
      const gradient = this.ctx.createRadialGradient(
        x + this.cellSize / 2,
        y + this.cellSize / 2,
        radius * 0.2,
        x + this.cellSize / 2,
        y + this.cellSize / 2,
        radius
      );
      const color = this.applyLighting(item.color, lighting);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, color);
      this.ctx.fillStyle = gradient;
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 16;
      this.ctx.beginPath();
      this.ctx.arc(x + this.cellSize / 2, y + this.cellSize / 2, radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  /** Utility to convert a color by lighting multiplier */
  applyLighting(hex, multiplier) {
    const value = parseInt(hex.replace('#', ''), 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    const apply = (channel) => Math.min(255, Math.floor(channel * multiplier));
    return `rgb(${apply(r)}, ${apply(g)}, ${apply(b)})`;
  }

  /** Generate a random vibrant color */
  randomColor() {
    const palette = ['#ff3c00', '#00ffb3', '#17f7ff', '#ff9f1c', '#ff5370'];
    return palette[Math.floor(Math.random() * palette.length)];
  }
}
