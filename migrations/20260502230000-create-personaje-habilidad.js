'use strict';

/**
 * Migration for the join table PersonajeHabilidad (many-to-many between Personaje and Habilidad)
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PersonajeHabilidad', {
      personajeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Personajes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      habilidadId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Habilidads',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      nivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PersonajeHabilidad');
  }
};
