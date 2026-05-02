'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const personajes = Array.from({ length: 5 }).map(() => ({
      nombre: faker.person.firstName(),
      descripcion: faker.lorem.sentence(),
      ataque: faker.number.int({ min: 5, max: 15 }),
      defensa: faker.number.int({ min: 5, max: 15 }),
      estamina: faker.number.int({ min: 5, max: 15 }),
      perfilId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Personajes', personajes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personajes', null, {});
  }
};
