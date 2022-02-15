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
// Use model.find() to Search records from Database
const findPeopleByName = (personName, done) => {
  Person.find(/*conditions*/{name: personName}, /*callback*/function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
/****************************************************/
// Use model.findOne() to Return a Single Matching Document from Database
const findOneByFood = (food, done) => {
  Person.findOne(/*conditions*/{favoriteFoods: food}, /*callback*/function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
/****************************************************/
// Use model.findById() to Search Database record from unique "_id"
const findPersonById = (personId, done) => {
  Person.findById(/*conditions*/{_id: personId}, /*callback*/function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
/****************************************************/
// Use .findById() method to find a person by _id and then UPDATE and SAVE new data
const findEditThenSave = (personId, done) => {
  Person.findById(/*conditions*/{_id: personId}, /*callback*/function(err, personFound) {
    if (err) return console.log(err);
    // Use array.push() method to add "hamburger" to the list of the person's favoriteFoods
    personFound.favoriteFoods.push("hamburger");
    // save() the updated Person.
    personFound.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  });
};
/****************************************************/
// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(/*conditions*/{name: personName}, /*update*/{age: 20}, /*options*/{new: true}, /*callback*/(err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  });
};
/****************************************************/
// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(/*conditions*/{_id: personId}, /*callback*/function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
/****************************************************/
// Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(/*conditions*/{name: nameToRemove}, /*callback*/function(err, response) {
    if (err) return console.log(err);
    done(null, response);
  });
};
/****************************************************/
const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  // using .find() without the callback function, allows to define the query without executing it (it will be executed later with the ".exec()"
  Person.find(/*conditions*/{favoriteFoods: foodToSearch})
  // sort by Name
  .sort({name: 'asc'}) // 1 for ascending / -1 for descending
  // limit to 2 Documents
  .limit(2)
  // hide "age" field
  .select('-age')    // .select(-age)
  // execute query
  .exec(function(err, searchResult) {done(err, searchResult)})
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
