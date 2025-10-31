/**
 * Snake class encapsulates movement, growth, collision, and skin rendering logic.
 * The snake moves across a virtual grid and is rendered on the canvas using
 * neon gradients that adapt to the active skin and lighting conditions.
 */
export class Snake {
  /**
   * @param {object} options - configuration for the snake
   * @param {number} options.gridSize - total columns on the board
   * @param {number} options.cellSize - rendered size of each cell in pixels
   * @param {CanvasRenderingContext2D} options.ctx - drawing context
   * @param {object} options.skins - metadata about available skins
   */
  constructor({ gridSize, cellSize, ctx, skins }) {
    this.ctx = ctx;
    this.gridSize = gridSize;
    this.cellSize = cellSize;
    this.skins = skins;
    this.reset();
  }

  /** Reset the snake to its initial state for a fresh run */
  reset() {
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.speed = 8;
    this.baseSpeed = 8;
    this.segments = [
      { x: Math.floor(this.gridSize / 4), y: Math.floor(this.gridSize / 2) },
      { x: Math.floor(this.gridSize / 4) - 1, y: Math.floor(this.gridSize / 2) },
      { x: Math.floor(this.gridSize / 4) - 2, y: Math.floor(this.gridSize / 2) }
    ];
    this.pendingGrowth = 0;
    this.alive = true;
    this.skinId = 'classic';
    this.colorCycle = 0;
    this.allowWrap = false;
    this.hitWall = false;
  }

  /**
   * Update the snake movement and handle growth.
   * @param {number} dt - delta time in seconds
   * @returns {boolean} whether a new cell was entered (used to tick game logic)
   */
  update(dt) {
    if (!this.alive) return false;
    const distancePerSecond = this.speed;
    this.movementAccumulator = (this.movementAccumulator || 0) + distancePerSecond * dt;

    if (this.movementAccumulator < 1) return false;

    // apply latest direction queued from controls
    this.direction = { ...this.nextDirection };
    this.movementAccumulator -= 1;

    let targetX = this.segments[0].x + this.direction.x;
    let targetY = this.segments[0].y + this.direction.y;

    if (!this.allowWrap) {
      if (targetX < 0 || targetX >= this.gridSize || targetY < 0 || targetY >= this.gridSize) {
        this.alive = false;
        this.hitWall = true;
        return true;
      }
    } else {
      targetX = this.wrapIndex(targetX);
      targetY = this.wrapIndex(targetY);
    }

    const newHead = {
      x: targetX,
      y: targetY
    };

    this.segments.unshift(newHead);

    if (this.pendingGrowth > 0) {
      this.pendingGrowth -= 1;
    } else {
      this.segments.pop();
    }

    this.colorCycle = (this.colorCycle + 1) % 360;
    return true;
  }

  /**
   * Convert raw input direction into grid change while preventing 180° turns.
   * @param {number} x - horizontal direction delta
   * @param {number} y - vertical direction delta
   */
  setDirection(x, y) {
    if (-x === this.direction.x && -y === this.direction.y) return;
    this.nextDirection = { x, y };
  }

  /** Enable or disable wrap mode */
  setWrapMode(enabled) {
    this.allowWrap = enabled;
  }

  /** Grow the snake by the provided amount */
  grow(amount = 1) {
    this.pendingGrowth += amount;
  }

  /** Increase the snake movement speed temporarily */
  boost(multiplier) {
    this.speed = this.baseSpeed * multiplier;
  }

  /** Reset the snake movement speed back to the base value */
  normalizeSpeed() {
    this.speed = this.baseSpeed;
  }

  /** @returns {boolean} whether the snake collided with itself */
  collidedWithSelf() {
    const [head, ...body] = this.segments;
    return body.some((segment) => segment.x === head.x && segment.y === head.y);
  }

  /**
   * Check if the snake's head matches a given coordinate.
   * @param {{x:number,y:number}} coord - coordinate to check
   */
  headMatches(coord) {
    const head = this.segments[0];
    return head.x === coord.x && head.y === coord.y;
  }

  /**
   * Switch the active skin based on an identifier.
   * @param {string} skinId - key of the skin to apply
   */
  setSkin(skinId) {
    if (this.skins[skinId]) {
      this.skinId = skinId;
    }
  }

  /** Utility to wrap around the grid horizontally or vertically */
  wrapIndex(value) {
    if (value < 0) return this.gridSize - 1;
    if (value >= this.gridSize) return 0;
    return value;
  }

  /**
   * Render the snake using gradients and glow effects.
   * @param {number} lighting - global lighting intensity used to modulate brightness
   */
  draw(lighting = 1) {
    const skin = this.skins[this.skinId];
    const gradientColors = skin.colors;
    const ctx = this.ctx;

    this.segments.forEach((segment, index) => {
      const x = segment.x * this.cellSize;
      const y = segment.y * this.cellSize;

      const gradient = ctx.createLinearGradient(x, y, x + this.cellSize, y + this.cellSize);
      gradientColors.forEach((color, i) => {
        const stop = i / Math.max(1, gradientColors.length - 1);
        gradient.addColorStop(stop, this.applyLighting(color, lighting));
      });

      ctx.fillStyle = gradient;
      ctx.shadowBlur = 16;
      ctx.shadowColor = `${skin.glow}`;
      ctx.fillRect(x + 2, y + 2, this.cellSize - 4, this.cellSize - 4);

      if (index === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(x + this.cellSize * 0.35, y + this.cellSize * 0.25, this.cellSize * 0.1, this.cellSize * 0.1);
        ctx.fillRect(x + this.cellSize * 0.55, y + this.cellSize * 0.25, this.cellSize * 0.1, this.cellSize * 0.1);
      }
    });

    ctx.shadowBlur = 0;
  }

  /** Apply lighting multiplier to a hex color */
  applyLighting(hex, multiplier) {
    const value = parseInt(hex.replace('#', ''), 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    const apply = (channel) => Math.min(255, Math.floor(channel * multiplier));
    return `rgb(${apply(r)}, ${apply(g)}, ${apply(b)})`;
  }
}
