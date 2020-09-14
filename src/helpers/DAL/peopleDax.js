const Person = require('../../models/Person');

const MockDb = require('../../database/MockDb');

const peopleDbFile = 'mockDatabases/mockPeople.json';

class PeopleDax {
  constructor() {
    /** 
     * Would typically instantiate a connection to the people database here.
     * Not necessary here since we are mocking the database with a simple JSON object
     */

    this._peopleDb = new MockDb(peopleDbFile);
  }

  /**
   * Adds a new Person object to the mock people database
   * 
   * @param {Person} person
   * @returns id
   */
  async addPerson(person) {
    const id = await this._peopleDb.create(person);

    return id;
  }

  /**
   * Function returns all people from mock people database
   */
  async getAllPeople() {
    const peopleData = await this._peopleDb.query();

    // Only return a list of people's names with their IDs
    const people = peopleData.map(personJson => { 
      // Marshall people json into people model classes
      const person = new Person(personJson);

      return { fullName: person.getFullName(), id: person.id }; 
    });

    return people;
  }

  /**
   * Returns the person object associated with personId from mock people database
   * 
   * @param {String} personId 
   */
  async getPerson(personId) {
    const personJson = await this._peopleDb.query(personId);

    return new Person(personJson);
  }

  /**
   * Removes a person object from the mock people database
   * 
   * @param {String} personId 
   */
  async removePerson(personId) {
    await this._peopleDb.delete(personId);
  }

  /**
   * Updates a person in people DB
   * 
   * @param {Person} person 
   */
  async updatePerson(person) {
    await this._peopleDb.update(person);
  }
}

const peopleDax = new PeopleDax();

module.exports = peopleDax;
