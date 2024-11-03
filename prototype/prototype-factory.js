class Address {
  constructor(suite, streetAddress, city) {
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }

  toString() {
    return `Suite ${this.suite}, ${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name} and I live at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor(types = []) {
    this.types = types;
  }

  // Finds the type
  markRecursive(object) {
    // Find the type
    const idx = this.types.findIndex((t) => t.name === object.constructor.name);

    if (idx === -1) {
      return;
    }

    // Mark the type
    object["typeIndex"] = idx;

    // Iterate over the object properties
    // To find nested Types
    for (const key in object) {
      if (!object.hasOwnProperty(key) || object[key] == null) {
        continue;
      }

      this.markRecursive(object[key]);
    }
  }

  reconstructRecursive(object) {
    if (!object.hasOwnProperty("typeIndex")) {
      return object;
    }

    // Get the type
    const type = this.types[object.typeIndex];

    // Create a new object
    const obj = new type();

    // Iterate over the object properties
    // To find nested Types
    for (const key in object) {
      if (!object.hasOwnProperty(key) || object[key] === null) {
        continue;
      }

      obj[key] = this.reconstructRecursive(object[key]);
    }

    // Delete mark
    delete obj.typeIndex;

    return obj;
  }

  clone(object) {
    this.markRecursive(object);
    const objectStr = JSON.stringify(object);
    const copy = JSON.parse(objectStr);

    return this.reconstructRecursive(copy);
  }
}


class EmployeeFactory
{
  static _newEmployee(proto, name, suite)
  {
    let copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name, suite)
  {
    return this._newEmployee(
      EmployeeFactory.main, name, suite
    );
  }

  static newAuxOfficeEmployee(name, suite)
  {
    return this._newEmployee(
      EmployeeFactory.aux, name, suite
    );
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address(null, '123 East Dr', 'London'));
EmployeeFactory.aux = new Employee(null, new Address(null, '200 London Road', 'Oxford'));

let john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 222);

console.log(john.toString());
console.log(jane.toString());