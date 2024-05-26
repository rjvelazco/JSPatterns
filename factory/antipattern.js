CoordinateSystem = {
  cartesion: 0,
  polar: 11,
};

class Point {
  /**
   * Unmanteinable constructor
   * Breaks the Open/Closed Principle
   */
  constructor(a, b, cs = CoordinateSystem.cartesion) {
      switch (cs) {
          case CoordinateSystem.cartesion:
              this.x = a;
              this.y = b;
              break;
          case CoordinateSystem.polar:
              this.x = a * Math.cos(b);
              this.y = a * Math.sin(b);
              break;
      }
  }

  /**
   * Multi `Constructor` are not allowed in JavaScript
   */
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  constructor(rho, theta) {
      this.x = rho * Math.cos(theta);
      this.y = rho * Math.sin(theta);
  }
}
