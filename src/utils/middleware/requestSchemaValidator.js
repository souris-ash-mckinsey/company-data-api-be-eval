const requestSchemaValidator = (options) => async (req, res, next) => {
  try {
    const method = req.method;
    if (options[method] !== undefined) {
      for await (let validation of options[req.method]) {
        const toValidate = validation.type === 'body' 
          ? req.body
          : (validation.type === 'params' 
            ? req.params 
            : (validation.type === 'query' ? req.query : req.body)
          );
        await validation.schema.validateAsync(toValidate);
      }
    }
  } catch(err) {
    res.status(400);
    res.json({
      error: err.message
    });
    return;
  }

  next();
};

module.exports = { requestSchemaValidator };