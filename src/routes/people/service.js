const peopleDax = require('../../helpers/DAL/peopleDax');

/**
 * Returns an array of all people from People Database
 */
async function getAllPeople() {
  const people = await peopleDax.getAllPeople();
  return people;
}

module.exports.getAllPeople = getAllPeople;
