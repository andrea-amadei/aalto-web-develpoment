import {useEffect, useState} from 'react'
import axios from "axios";
import PeopleList from "./components/PeopleList";
import AddNewPersonForm from "./components/AddNewPersonForm";
import peopleService from "./services/peopleService";

const App = () => {
  const [persons, setPersons] = useState([]);
  
  const resetFields = () => {
    // setNewName('');
    // setNewNumber('');
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
  
  useEffect(() => {
    peopleService.getAll()
      .then(response => setPersons(response))
      .catch(() => console.log("Unable to fetch data from server!"));
  }, []);
  
  return (
    <div>
      <h1>Phonebook</h1>
      
      <AddNewPersonForm people={persons} setPeople={setPersons} />
      <PeopleList people={persons} setPeople={setPersons} />
    </div>
  )
}

export default App;
