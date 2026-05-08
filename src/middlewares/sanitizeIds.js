/**
 * Middleware POST (sanitización): elimina de cualquier respuesta JSON
 * las keys que terminen en "_id".
 */

function stripIdSuffixes(data) {
  if (Array.isArray(data)) return data.map(stripIdSuffixes);

  if (data && typeof data === 'object') {
    const cleaned = {};

    for (const [key, value] of Object.entries(data)) {
      if (key.endsWith('_id')) continue;
      cleaned[key] = stripIdSuffixes(value);
    }

    return cleaned;
  }

  return data;
}

module.exports = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    try {
      return originalJson(stripIdSuffixes(body));
    } catch (err) {
      // Si algo falla al sanitizar, no rompemos la respuesta
      return originalJson(body);
    }
  };

  next();
};
