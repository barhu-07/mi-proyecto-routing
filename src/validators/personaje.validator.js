const { body, param, validationResult } = require('express-validator');

// Reglas para POST /api/personajes
// (Ajusta nombres de campos si tu modelo usa otros.)
const createPersonajeRules = [
  body('nombre')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('El campo nombre es obligatorio')
    .isString()
    .withMessage('El campo nombre debe ser un texto')
    .isLength({ max: 100 })
    .withMessage('El campo nombre debe tener máximo 100 caracteres'),

  body('descripcion')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('El campo descripcion es obligatorio')
    .isString()
    .withMessage('El campo descripcion debe ser un texto')
    .isLength({ max: 500 })
    .withMessage('El campo descripcion debe tener máximo 500 caracteres'),

  body('tipo')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('El campo tipo es obligatorio')
    .isString()
    .withMessage('El campo tipo debe ser un texto')
    .isIn(['guerrero', 'maga', 'elfo', 'asesino'])
    .withMessage('El tipo debe ser: guerrero, maga, elfo o asesino'),
];

// Reglas para PUT /api/personajes/:id
const updatePersonajeRules = [
  param('id')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('El parámetro id es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El id debe ser un entero positivo'),

  // Para PUT dejamos campos opcionales, pero si vienen deben cumplir formato.
  body('nombre')
    .optional()
    .isString()
    .withMessage('El campo nombre debe ser un texto')
    .isLength({ max: 100 })
    .withMessage('El campo nombre debe tener máximo 100 caracteres'),

  body('descripcion')
    .optional()
    .isString()
    .withMessage('El campo descripcion debe ser un texto')
    .isLength({ max: 500 })
    .withMessage('El campo descripcion debe tener máximo 500 caracteres'),

  body('tipo')
    .optional()
    .isIn(['guerrero', 'maga', 'elfo', 'asesino'])
    .withMessage('El tipo debe ser: guerrero, maga, elfo o asesino'),
];

// Manejador de errores (convención en el documento)
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createPersonajeRules,
  updatePersonajeRules,
  handleValidationErrors,
};

