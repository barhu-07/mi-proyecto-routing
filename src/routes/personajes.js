const express = require('express');
const { personajes, habilidades } = require('../data/datosJuego');

const router = express.Router();

router.get('/', (req, res) => {
  const { nombre, tipo } = req.query;
  let resultado = personajes;

  if (nombre) {
    const n = nombre.toLowerCase();
    resultado = resultado.filter(p => p.nombre.toLowerCase().includes(n));
  }

  if (tipo) {
    resultado = resultado.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase());
  }

  res.status(200).json(resultado);
});


router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const personaje = personajes.find(p => p.id === id);

  if (!personaje) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  res.status(200).json(personaje);
});

router.post('/', (req, res) => {
  const nuevo = { id: personajes.length + 1, ...req.body };
  personajes.push(nuevo);

  res.status(201).json(nuevo);
});

router.get('/:id/habilidades', (req, res) => {
  const id = Number(req.params.id);
  const personaje = personajes.find(p => p.id === id);

  if (!personaje) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  const suyas = habilidades.filter(h => personaje.habilidades.includes(h.id));

  res.status(200).json(suyas);
});

// DELETE /api/personajes/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = personajes.findIndex(p => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Personaje no encontrado error 404' });
  }

  personajes.splice(indice, 1);

  res.status(204).send();
});

module.exports = router;