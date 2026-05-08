require('dotenv').config();

const express = require('express');
const { sequelize } = require('../models');

const personajesRouter = require('./routes/personajes');
const habilidadesRouter = require('./routes/habilidades');
const usuariosRouter = require('./routes/usuarios');

const requestLogger = require('./middlewares/requestLogger');
const sanitizeIds = require('./middlewares/sanitizeIds');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middlewares transversales
app.use(requestLogger); // PRE - logging
app.use(sanitizeIds); // POST - sanitización de respuestas

app.use('/api/personajes', personajesRouter);
app.use('/api/habilidades', habilidadesRouter);
app.use('/api/usuarios', usuariosRouter);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de errores (MUY IMPORTANTE)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Conexión + servidor
(async () => {
  await sequelize.authenticate();
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
})();