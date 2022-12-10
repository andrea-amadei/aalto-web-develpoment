const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('body', (request, response) => {
  if(request.method === 'POST')
    return JSON.stringify(request.body);

  return '';
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


let persons = [
  {
    "id": getRandomInt(1_000_000),
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": getRandomInt(1_000_000),
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": getRandomInt(1_000_000),
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": getRandomInt(1_000_000),
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `);
})


app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if(person)
    response.json(person);
  else
    response.status(404).send('Not found');
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if(!person)
    response.status(404).send('Not found');

  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if(!body)
    return response.status(400).send('Body is missing');

  if(body.name === undefined || body.number === undefined)
    return response.status(400).send('Name or number missing');

  if(persons.find(person => person.name === body.name))
    return response.status(400).send('Name is not unique');

  const person = {
    id: getRandomInt(1_000_000),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person);
  response.json(person);
})


const port = process.env.PORT || "8080";
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
