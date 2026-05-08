const express = require('express');

const ctrl = require('../controllers/personajes.controller');
const {
  createPersonajeRules,
  updatePersonajeRules,
  handleValidationErrors,
} = require('../validators/personaje.validator');

const router = express.Router();

// GET /api/personajes
router.get('/', ctrl.list);

// GET /api/personajes/:id
router.get('/:id', ctrl.show);

// POST /api/personajes
router.post(
  '/',
  createPersonajeRules,
  handleValidationErrors,
  ctrl.create
);

// GET /api/personajes/:id/habilidades
router.get('/:id/habilidades', ctrl.listHabilidades);

// DELETE /api/personajes/:id
router.delete('/:id', ctrl.remove);

// PUT /api/personajes/:id
router.put(
  '/:id',
  updatePersonajeRules,
  handleValidationErrors,
  ctrl.update
);

// POST /api/personajes/:id/habilidades
router.post('/:id/habilidades', ctrl.addHabilidad);

// DELETE /api/personajes/:idP/habilidades/:idH
router.delete('/:idP/habilidades/:idH', ctrl.removeHabilidad);

module.exports = router;