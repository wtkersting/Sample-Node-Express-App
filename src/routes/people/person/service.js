const uuid = require('uuid');

const Person = require('../../../models/Person');

const peopleDax = require('../../../helpers/DAL/peopleDax');

/**
 * Adds a person object to the people DB
 * 
 * @param {Object} personJson
 */
async function createPerson(personJson) {
  // Assign id to a new person at creation
  const id = uuid.v4();
  console.log(`uuid: ${id}`);
  
  personJson.id = id;

  await peopleDax.addPerson(new Person(personJson));

  return id;
}

/**
 * Returns a person object for a given personId
 * 
 * @param {String} personId 
 */
async function getPerson(personId) {
  const person = await peopleDax.getPerson(personId);

  return person;
}

/**
 * Removes person with personId from people DB
 * 
 * @param {String} personId 
 */
async function removePerson(personId) {
  await peopleDax.removePerson(personId);
}

/**
 * Updates a person in the people DB
 * 
 * @param {String} personId 
 * @param {Object} personJson 
 */
async function updatePerson(personJson) {
  const person = new Person(personJson);

  await peopleDax.updatePerson(person);
}

module.exports.createPerson = createPerson;
module.exports.getPerson = getPerson;
module.exports.removePerson = removePerson;
module.exports.updatePerson = updatePerson;
