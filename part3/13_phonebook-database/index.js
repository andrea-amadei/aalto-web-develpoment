require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const Person = require('./database');


const app = express();

morgan.token('body', (request) => {
  if(request.method === 'POST' || request.method === 'PUT')
    return JSON.stringify(request.body);

  return '';
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}


app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));


// Info endpoint
app.get('/info', (request, response, next) => {
  Person
    .find({})
    .then(result => {

      response.send(`
        <p>Phonebook has info for ${result.length} people</p>
        <p>${new Date()}</p>
      `);

    })
    .catch(error => next(error));
})


// GET /persons
app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(result => response.json(result))
    .catch(error => next(error));
})

// GET /persons/:id
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person
    .findById(id)
    .then(result => {

      if(result)
        response.json(result);
      else
        response.status(404).send({ error: 'ID not found' });

    })
    .catch(error => next(error));
})

// DELETE /persons/:id
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person
    .findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(error => next(error));
})

// PUT /persons/:id
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const body = request.body

  if(!body)
    return response.status(400).send({ error: 'Body is missing' });

  if(body.name === undefined || body.number === undefined)
    return response.status(400).send({ error: 'Name or number missing' });

  const person = {
    name: body.name,
    number: body.number,
  };

  Person
    .findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then(result => response.json(result))
    .catch(error => next(error));
})

// POST /persons
app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if(!body)
    return response.status(400).send({ error: 'Body is missing' });

  if(body.name === undefined || body.number === undefined)
    return response.status(400).send({ error: 'Name or number missing' });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(result => response.json(result))
    .catch(error => next(error));
})


app.use(errorHandler);
app.use(unknownEndpoint);


const port = process.env.PORT || '8080';
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
