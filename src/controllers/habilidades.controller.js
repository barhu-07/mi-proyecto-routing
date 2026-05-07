const { habilidades } = require('../data/datosJuego');

// GET /api/habilidades?orden=estamina
const list = (req, res) => {
  const { orden } = req.query;
  let resultado = [...habilidades];

  if (orden === 'estamina') {
    resultado.sort((a, b) => b.incremento_estamina - a.incremento_estamina);
  }

  res.status(200).json(resultado);
};

// GET /api/habilidades/:id
const show = (req, res) => {
  const id = Number(req.params.id);
  const habilidad = habilidades.find((h) => h.id === id);

  if (!habilidad) {
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  res.status(200).json(habilidad);
};

// PUT /api/habilidades/:id
const update = (req, res) => {
  const id = Number(req.params.id);
  const indice = habilidades.findIndex((h) => h.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Habilidad no encontrada error 404' });
  }

  const {
    nombre,
    descripcion,
    incremento_ataque,
    incremento_defensa,
    incremento_estamina,
  } = req.body;

  if (
    !nombre ||
    !descripcion ||
    incremento_ataque === undefined ||
    incremento_defensa === undefined ||
    incremento_estamina === undefined
  ) {
    return res
      .status(400)
      .json({ error: 'Faltan campos obligatorios, error 400' });
  }

  const habilidadActualizada = {
    id,
    nombre,
    descripcion,
    incremento_ataque,
    incremento_defensa,
    incremento_estamina,
  };

  habilidades[indice] = habilidadActualizada;

  res.status(200).json(habilidadActualizada);
};

module.exports = {
  list,
  show,
  update,
};

