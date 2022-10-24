import {useEffect, useState} from 'react'
import axios from "axios";

const handleInputChange = (event, setter) => {
  setter(event.target.value);
}

const Filter = ({ search, setSearch }) =>
  <div>search: <input value={search} onChange={event => handleInputChange(event, setSearch)}/></div>

const AddNewPerson = ({ newName, setNewName, newNumber, setNewNumber, handleInputSubmit }) =>
  <form onSubmit={handleInputSubmit}>
    <div>name: <input value={newName} onChange={event => handleInputChange(event, setNewName)}/></div>
    <div>number: <input value={newNumber} onChange={event => handleInputChange(event, setNewNumber)}/></div>
    <div><button type="submit">Add</button></div>
  </form>

const ShowPersons = ({ persons, search }) =>
  <ul>
    {persons.filter(x => search === '' || x.name.toLowerCase() === search.toLowerCase()).map(x => <li key={x.id}>{x.name} {x.number}</li>)}
  </ul>

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  
  const resetFields = () => {
    setNewName('');
    setNewNumber('');
  }
  
  const addPerson = (name, number) => {
    if(name === '' || number === '')
      return;
    
    if(persons.map(x => x.name).indexOf(name) !== -1) {
      alert(`"${name}" is already added to phonebook`);
      return;
    }
    
    const newPerson = {
      id: persons.length + 1,
      name: name,
      number: number
    }
    
    setPersons(persons.concat(newPerson));
    resetFields();
  }
  
  const handleInputSubmit = (event) => {
    event.preventDefault();
    addPerson(newName, newNumber);
  }
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
      .catch(() => console.log("Unable to fetch data from server!"));
  }, []);
  
  return (
    <div>
      <h1>Phonebook</h1>
  
      <h2>Filter</h2>
      <Filter search={search} setSearch={setSearch} />
      
      <h2>Add new person</h2>
      <AddNewPerson
        newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber}
        handleInputSubmit={handleInputSubmit}
      />
      
      <h2>Numbers</h2>
      <ShowPersons persons={persons} search={search} />
      
    </div>
  )
}

export default App;
