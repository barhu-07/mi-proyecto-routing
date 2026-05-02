'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habilidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Habilidad.belongsToMany(models.Personaje, {
    through: 'PersonajeHabilidad',
    foreignKey: 'habilidadId'
  });
}
  }
  Habilidad.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    incremento_ataque: DataTypes.INTEGER,
    incremento_defensa: DataTypes.INTEGER,
    incremento_estamina: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Habilidad',
  });
  return Habilidad;
};