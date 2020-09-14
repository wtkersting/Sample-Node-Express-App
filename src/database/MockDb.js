const fs = require('fs');
const { NotFoundError } = require('../helpers/errors');

/**
 * Mock DB class simulating a class forming a database connection.
 * 
 * For sake of keeping everything local, you can pass filepath and this class will
 * read and write to that file.
 */
class MockDb {
  constructor(dbFilePath) {
    this._dbFilePath = dbFilePath;
    this._mockDb = JSON.parse(fs.readFileSync(dbFilePath));
  }

  /**
   * Creates a new entry in db
   * 
   * @param {Object} entry 
   */
  async create(entry) {
    if (!entry.id) {
      throw new Error('Entry must include an id');
    }
    if (this._mockDb[entry.id]) {
      throw new Error(`Entry already exists with id ${entry.id}`);
    }

    this._mockDb[entry.id] = entry;
    this._writeDb();
  }

  /**
   * Deletes the db entry with associated id
   * 
   * @param {String} id 
   */
  async delete(id) {
    if (this._mockDb[id]) {
      delete this._mockDb[id];

      this._writeDb();
    } else {
      throw new NotFoundError(`No entry for ${id}`);
    }
  }

  /**
   * Queries the DB object for any entry with an ID
   * 
   * @param {String} id - Optional ID to query DB by
   */
  async query(id) {
    // If no id passed, assume querying all
    if (!id) {
      return Object.values(this._mockDb);
    }

    if (this._mockDb[id]) {
      return this._mockDb[id];
    } else {
      throw new NotFoundError(`No entry for ${id}`);
    }
  }

  /**
   * Updates an existing entry in db
   * 
   * @param {Object} entry 
   */
  async update(entry) {
    if (!entry.id) {
      throw new Error('Entry must include an id');
    }

    if (!this._mockDb[entry.id]) {
      throw new NotFoundError(`No entry to update for id ${entry.id}`);
    }

    this._mockDb[entry.id] = entry;
    this._writeDb();
  }

  /**
   * Simulates updating a database
   * 
   * writes to the "database" file
   */
  _writeDb() {
    fs.writeFileSync(this._dbFilePath, JSON.stringify(this._mockDb));
  }
}

module.exports = MockDb;
