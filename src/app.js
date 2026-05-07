require('dotenv').config();

const express = require('express');
const { sequelize } = require('../models');

const requestLogger = require('./middleware/requestLogger');
const sanitizeIds = require('./middleware/sanitizeIds');


const personajesRouter = require('./routes/personajes');
const habilidadesRouter = require('./routes/habilidades');
const usuariosRouter = require('./routes/usuarios');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(requestLogger);
app.use(sanitizeIds);

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