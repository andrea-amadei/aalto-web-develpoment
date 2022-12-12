const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log(`Connecting to ${url}`);

mongoose
  .connect(url)
  .then(result => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.log(error.message))


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [3, 'Name must be at least 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    minLength: [8, 'Number must be at least 8 characters long'],
    validate: {
      validator: number => {

        const splitNumber = number.split('-');

        if(splitNumber.length > 2)
          return false;

        if(splitNumber.length === 2 && (splitNumber[0].length > 3 || splitNumber[0].length < 2))
          return false;

        return true;
      },
      message: props =>
        `${props.value} is not a valid number`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Person', personSchema);
