const { Personaje, Habilidad } = require('../../models');

// GET /api/personajes?nombre=...
exports.list = async (req, res, next) => {
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
          through: { attributes: ['nivel'] },
        },
      ],
    });

    res.status(200).json(personajes);
  } catch (err) {
    next(err);
  }
};

// GET /api/personajes/:id
exports.show = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [
        {
          model: Habilidad,
          through: { attributes: ['nivel'] },
        },
      ],
    });

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(200).json(personaje);
  } catch (err) {
    next(err);
  }
};

// POST /api/personajes
exports.create = async (req, res, next) => {
  try {
    const nuevo = await Personaje.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

// GET /api/personajes/:id/habilidades
exports.listHabilidades = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [Habilidad],
    });

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(200).json(personaje.Habilidads);
  } catch (err) {
    next(err);
  }
};

// PUT /api/personajes/:id
exports.update = async (req, res, next) => {
  try {
    const [updated] = await Personaje.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    const personaje = await Personaje.findByPk(req.params.id, {
      include: [
        {
          model: Habilidad,
          through: { attributes: ['nivel'] },
        },
      ],
    });

    res.status(200).json(personaje);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/personajes/:id
exports.remove = async (req, res, next) => {
  try {
    const eliminado = await Personaje.destroy({
      where: { id: req.params.id },
    });

    if (!eliminado) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// POST /api/personajes/:id/habilidades
exports.addHabilidad = async (req, res, next) => {
  try {
    const { habilidadId, nivel } = req.body;

    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    await personaje.addHabilidad(habilidadId, { through: { nivel } });
    const habilidades = await personaje.getHabilidads();

    res.status(201).json(habilidades);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/personajes/:idP/habilidades/:idH
exports.removeHabilidad = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.idP);
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    await personaje.removeHabilidad(req.params.idH);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};