'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const usuarios = Array.from({ length: 5 }).map(() => ({
      nombre: faker.internet.username(),   // ✔️ corregido
      correo: faker.internet.email(),
      contrasena: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Usuarios', usuarios, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
