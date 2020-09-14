
class Person {
  constructor(person) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.height = person.height;

    // Optional parameters
    this.favoriteColor = person.favoriteColor || null;
    this.email = person.email || null;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = Person;
