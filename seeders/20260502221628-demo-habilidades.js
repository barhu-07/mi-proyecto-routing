'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const habilidades = Array.from({ length: 5 }).map(() => ({
      nombre: faker.word.noun(),
      descripcion: faker.lorem.sentence(),
      incremento_ataque: faker.number.int({ min: 0, max: 5 }),
      incremento_defensa: faker.number.int({ min: 0, max: 5 }),
      incremento_estamina: faker.number.int({ min: 0, max: 5 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Habilidads', habilidades, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habilidads', null, {});
  }
};
