class Address {
  constructor(street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
  }

  /**
   * Creates a deep copy of the Address object
   *
   * @return {*}
   * @memberof Address
   */
  deepCopy() {
    return new Address(this.street, this.city, this.country);
  }

  toString() {
    return `Address: ${this.street}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  /**
   * Creates a deep copy of the Person object
   *
   * @return {*}
   * @memberof Person
   */
  deepCopy() {
    return new Person(this.name, this.address.deepCopy());
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

    if (idx < 0) {
      return;
    }

    // Mark the type
    object["typeIndex"] = idx;

    // Iterate over the object properties
    // To find nested Types
    for (const key in object) {
      if (!object.hasOwnProperty(key) || object[key] === null) {
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

const diego = new Person(
  "Diego",
  new Address("123Az Main St", "Maracaibo", "Venezuela")
);

// Create DeepCopy for each nested object is a tedious task
const jalinson = diego.deepCopy();

jalinson.name = "Jalinson";
jalinson.address.street = "123B Main St";

console.log(diego.toString());
console.log(jalinson.toString());

// Copy through Serialization
const adrian = JSON.parse(JSON.stringify(diego));

adrian.name = "Adrian";
adrian.address.street = "123C Main St";

// The methods are lost. This will fail
// console.log(Adrian.toString());
// We just copy the values/properties
console.log(adrian.name);

// try a dedicated serializer
const s = new Serializer([Person, Address]); // pain point
const andres = s.clone(diego);

andres.name = "Andres";
andres.address.street = "123D Main St";

console.log(andres.toString());
