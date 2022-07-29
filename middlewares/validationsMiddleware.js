const validation = (schema) => async (req, res, next) => {
  try {
    const body = req.body;
    const a = await schema.validate(body);
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.errors[0] });
  }
};

module.exports = validation;
