/**
 * Factory: A component responsible solely for the wholesale (not piecewise) creation of objects.
 * 
 * A factory is just a separate class or a separate component which takes
 * on the responsibility of creating objects of a particular type.
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get factory() {
    return PointFactory;
  }
}

class PointFactory {
  /**
   *
   *
   * @static
   * @param {*} x
   * @param {*} y
   * @return {*} 
   * @memberof Point
   */
  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  /**
   *
   * 
   * @static
   * @param {*} rho 
   * @param {*} theta 
   * @returns 
   */
  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}


const p1 = Point.factory.newCartesianPoint(2, 3);
const p2 = Point.factory.newPolarPoint(5, Math.PI / 2);

console.log(p1);
console.log(p2);
