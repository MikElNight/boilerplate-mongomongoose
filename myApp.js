require('dotenv').config();
var mongoose = require('mongoose');

/****************************************************/
// connect to mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
/****************************************************/
// Assign Mongoose Schema to a variable
const Schema = mongoose.Schema;
// Create Person schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
// Create Person model from the schema
const Person = mongoose.model("Person", personSchema);
/****************************************************/
// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const luisFonseca = new Person( {name: "Luis", age: "40", favoriteFoods: "[Bolonhesa, Frango assado, Peixe grelhado]"} );
  luisFonseca.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
/****************************************************/
// Create Many Records with model.create()
let arrayOfPeople = [
  {name: "Ruth", age: "36", favoriteFoods: "[Tofu a braz, Feijoada veggie]"},
  {name: "Tony", age: "54", favoriteFoods: "[Arroz de pato, solha gralhada]"},
  {name: "Cid", age: "62", favoriteFoods: "[Cozido, Rancho, Moelas]"}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    else done(null, people);
  });
};
/****************************************************/

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};
/****************************************************/
/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
