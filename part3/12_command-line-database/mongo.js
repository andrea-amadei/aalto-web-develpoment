const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit();
}

const password = process.argv[2]

const url = `mongodb+srv://andrea:${password}@freecluster.ol9cfmk.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema);

mongoose.connect(url);

if(process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      console.log('Phonebook:');

      if (result.length === 0)
        console.log('Empty');
      else
        result.forEach(person => console.log(`${person.name} ${person.number}`));
    })
    .catch(error => console.log(`Unable to retrieve data: ${error}`))
    .finally(() => {
      mongoose.connection.close();
      process.exit();
    });

} else {
  const name = process.argv[3];
  const number = process.argv[4];

  if(name === undefined || name === '' || number === undefined || number === '') {
    console.log('Invalid name or number');
    process.exit();
  }

  const person = new Person({ name, number });
  person.save()
    .then(result => console.log('Person saved successfully'))
    .catch(error => console.log(`Unable to retrieve data: ${error}`))
    .finally(() => {
      mongoose.connection.close();
      process.exit();
    });
}
