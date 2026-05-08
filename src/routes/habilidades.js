const express = require('express');

const ctrl = require('../controllers/habilidades.controller');

const router = express.Router();

// GET /api/habilidades?orden=estamina
router.get('/', ctrl.list);

// GET /api/habilidades/:id
router.get('/:id', ctrl.show);

// PUT /api/habilidades/:id
router.put('/:id', ctrl.update);

module.exports = router;