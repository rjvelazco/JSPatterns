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
}

const diego = new Person(
  "Diego",
  new Address("123 Main St", "Maracaibo", "Venezuela")
);

// Create DeepCopy for each nested object is a tedious task
const jalinson = diego.deepCopy();

jalinson.name = "Jalinson";
jalinson.address.street = "123B Main St";

console.log(diego.toString());
console.log(jalinson.toString());
