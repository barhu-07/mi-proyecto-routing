const express = require('express');
const { Usuario, Perfil, Personaje, Habilidad } = require('../../models');

const router = express.Router();

// GET /api/usuarios/:id/personajes
router.get('/:id/personajes', async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            include: {
                model: Perfil,
                include: {
                    model: Personaje,
                    include: [
                        {
                            model: Habilidad,
                            through: { attributes: ['nivel'] }
                        }
                    ]
                }
            }
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const personajes = usuario.Perfil ? usuario.Perfil.Personajes : [];
        res.status(200).json(personajes);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
