const express = require('express');
const { Usuario, Perfil, Personaje } = require('../../models');

const router = express.Router();

// GET /api/usuarios/:id/personajes
router.get('/:id/personajes', async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: {
        model: Perfil,
        include: Personaje
      }
    });
    if (!usuario || !usuario.Perfil) {
      return res.status(404).json({ error: 'Usuario o perfil no encontrado' });
    }
    res.status(200).json(usuario.Perfil.Personajes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
