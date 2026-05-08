const { RequestLog } = require('../../models');

/**
 * Middleware PRE: registra en BD cada request.
 * - No bloquea la petición si falla el log.
 */
module.exports = async (req, res, next) => {
  try {
    // ip puede venir como string o estar vacía según proxy/red
    const ip = req.ip || req.headers['x-forwarded-for'] || null;

    await RequestLog.create({
      method: req.method,
      path: req.originalUrl,
      ip,
    });
  } catch (err) {
    // No bloqueamos la request si falla el logging
    console.error('Error guardando request log:', err.message || err);
  }

  next();
};