const logger = require("./logger");
const jwt = require("jsonwebtoken");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  }

  next(error);
}

const extractToken = (request, response, next) => {
  const authorization = request.get('Authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    request.token = authorization.substring(7);
  else
    request.token = null;

  next();
}

const extractUser = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if(!decodedToken.id)
      return response.status(401).json({ error: 'Token is invalid' });

    request.user = {id: decodedToken.id, username: decodedToken.username };
  } else {
    request.user = null;
  }

  next();
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  extractToken,
  extractUser
}
