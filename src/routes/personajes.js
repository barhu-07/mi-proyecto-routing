const express = require('express');
const { Personaje, Habilidad } = require('../../models');

const router = express.Router();

// GET /api/personajes
router.get('/', async (req, res, next) => {
  try {
    const { nombre } = req.query;

    const where = {};

    if (nombre) {
      where.nombre = nombre;
    }

    const personajes = await Personaje.findAll({
      where,
      include: [
        {
          model: Habilidad,
          through: { attributes: ['nivel'] }
        }
      ]
    });

    res.status(200).json(personajes);
  } catch (err) {
    next(err);
  }
});


// GET /api/personajes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [
        {
          model: Habilidad,
          through: { attributes: ['nivel'] }
        }
      ]
    });

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(200).json(personaje);
  } catch (err) {
    next(err);
  }
});


// POST /api/personajes
router.post('/', async (req, res, next) => {
  try {
    const nuevo = await Personaje.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
});

// PUT /api/personajes/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { nombre, descripcion, ataque, defensa, estamina } = req.body;

    if (
      nombre === undefined ||
      descripcion === undefined ||
      ataque === undefined ||
      defensa === undefined ||
      estamina === undefined
    ) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    await personaje.update({ nombre, descripcion, ataque, defensa, estamina });
    res.status(200).json(personaje);
  } catch (err) {
    next(err);
  }
});

// POST /api/personajes/:id/habilidades
router.post('/:id/habilidades', async (req, res, next) => {
  try {
    const { habilidadId, nivel } = req.body;

    if (!habilidadId || nivel === undefined) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    const habilidad = await Habilidad.findByPk(habilidadId);
    if (!habilidad) {
      return res.status(404).json({ error: 'Habilidad no encontrada' });
    }

    const asociada = await personaje.hasHabilidad(habilidad);
    if (asociada) {
      return res.status(409).json({ error: 'El personaje ya tiene esa habilidad' });
    }

    await personaje.addHabilidad(habilidad, { through: { nivel } });
    res.status(201).json({ ...habilidad.toJSON(), nivel });
  } catch (err) {
    next(err);
  }
});

// GET /api/personajes/:id/habilidades
router.get('/:id/habilidades', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [Habilidad]
    });

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(200).json(personaje.Habilidads);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/personajes/:id/habilidades/:idH
router.delete('/:id/habilidades/:idH', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    const habilidad = await Habilidad.findByPk(req.params.idH);
    if (!habilidad) {
      return res.status(404).json({ error: 'Habilidad no encontrada' });
    }

    const asociada = await personaje.hasHabilidad(habilidad);
    if (!asociada) {
      return res.status(404).json({ error: 'Habilidad no asociada al personaje' });
    }

    await personaje.removeHabilidad(habilidad);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// DELETE /api/personajes/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const eliminado = await Personaje.destroy({
      where: { id: req.params.id }
    });

    if (!eliminado) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;