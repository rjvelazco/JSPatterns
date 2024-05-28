const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const availableDrinks = Object.freeze({
    coffee: CoffeeFactory,
    tea: TeaFactory
});

class HotDrink {
    consume() { }
}

class Tea extends HotDrink {
    // Override the consume method 
    consume() {
        console.log('This tea is nice with lemon');
    }
}

class Coffee extends HotDrink {
    consume() {
        console.log('This coffee is delicious');
    }
}

class HotDrinkFactory {
    prepare(amount) { /* abstract */ }
}

class TeaFactory extends HotDrinkFactory {
    // Implement the prepare method
    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount}ml`);
        return new Tea(); // Customize the Tea object
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Grind some beans, boil water, pour ${amount}ml`);
        return new Coffee(); // Customize the Coffee object
    }
}   // The factory is responsible for creating the object

class HotDrinkMachine  {

    constructor() {
        this.factories = {};
        for (const drink in availableDrinks) {
            this.factories[drink] = new availableDrinks[drink]();
        };
    }

    interact(consumer) {
        rl.question('Please specify drink and amount ' + '(e.g., tea 50): ', answer => {
            const parts = answer.trim().split(' ');
            const name = parts[0];
            const amount = parseInt(parts[1]);
            const drink = this.factories[name].prepare(amount);
            rl.close();
            consumer(drink);
        })

    }

    // makeDrink(type) {
    //     switch (type) {
    //         case 'tea': return (new TeaFactory()).prepare(200);
    //         case 'coffee': return (new CoffeeFactory()).prepare(50);
    //         default: throw new Error('unsupported drink type');
    //     }
    // }
};


const machine = new HotDrinkMachine();

machine.interact((drink) => drink.consume());

// rl.question('Which drink would you like?', function(answer) {
//     const drink = machine.makeDrink(answer.trim());
//     drink.consume();
//     rl.close();
// });