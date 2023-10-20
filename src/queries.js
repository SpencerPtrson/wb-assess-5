import { Op } from 'sequelize';
import { Animal, Human } from './model.js';
// const { Animal, Human } = await import('./src/model.js'); // Used for node testing

// Get the human with the primary key 2
export const query1 = Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = Animal.findOne({
    where: { species: 'fish' }
});

// Get all animals belonging to the human with primary key 5
export const query3 = Animal.findAll({
    where: { humanId: 5 }
});

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = Animal.findAll({
    where: { birthYear: { [Op.gt]: 2015 } }
});

// Get all the humans with first names that start with "J"
export const query5 = Human.findAll({
    where: { fname: { [Op.startsWith]: 'J' } }
});

// Get all the animals who don't have a birth year
export const query6 = Animal.findAll({
    where: { birthYear: { [Op.is]: null } }
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = Animal.findAll({
    where: { species: { [Op.or]: ['fish', 'rabbit'] } }
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = Human.findAll({
    where: { email: { [Op.notLike]: '%gmail%' } }
});

// Continue reading the instructions before you move on!
// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
    const humans = await Human.findAll({ include: Animal }); // Get a list of humans with animal data included
    humans.forEach(async human => { // for every human, do this code
        console.log(human.getFullName()); // Print out full name
        human.animals.forEach(animal => {
            console.log(`-- ${animal.name}, ${animal.species}`); // Print out animal name + species
        })
    })
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
    const humans = new Set(); // Create new set of Humans
    const pets = await Animal.findAll({ // Find all animals who have a matching species, and include their owners
        include: Human,
        where: { species: species}
    });
    pets.forEach(pet => { // for every pet
        humans.add(pet.human.getFullName()); // add the owner's full name to the set
    });
    console.log(humans);
    return humans;
}