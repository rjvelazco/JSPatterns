class Person {
    // Address
    streetAddress = '';
    postcode = '';
    city = '';

    // Employment
    companyName = '';
    position = '';
    annualIncome = '';

    toString() {
        return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n`
        + `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
    }
}

class PersonBuilder {
    person;

    constructor(person = new Person()) {
        this.person = person;
    }

    get lives() {
        return new PersonAddressBuilder(this.person);
    }

    get works() {
        return new PersonJobBuilder(this.person);
    }

    build() {
        return this.person;
    }
}

class PersonJobBuilder extends PersonBuilder {

    // Same as not calling the constructor at all.
    // Because we are passing all the params to the `super` function
    constructor(persona) {
        super(persona);
    }

    at(companyName) {
        this.person.companyName = companyName;
        return this;
    }

    asA(position) {
        this.person.position = position;
        return this;
    }

    earning(annualIncome) {
        this.person.annualIncome = annualIncome;
        return this;
    }

}

class PersonAddressBuilder extends PersonBuilder {

    // constructor(persona) {
    //     super(persona);
    // }

    at(streetAddress) {
        this.person.streetAddress = streetAddress;
        return this;
    }

    withPostcode(postcode) {
        this.person.postcode = postcode; 

        return this;
    }

    in(city) {
        this.person.city = city;

        return this;
    }
}

const pb = new PersonBuilder();
const person = pb
                .lives.at('123 London Road').in('London').withPostcode("1234")
                .works.at('Fabrikam').asA('Engineer').earning(123000)
                .build();

console.log(person);