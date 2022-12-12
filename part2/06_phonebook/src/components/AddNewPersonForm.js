import {handleInputChange} from "../common";
import {useState} from "react";
import peopleService from "../services/peopleService";

const AddNewPersonForm = ({ people, setPeople, setNotification }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  
  const handleInputSubmit = (event) => {
    event.preventDefault();
    
    if(newName === '' || newNumber === '')
      return;
    
    const oldObject = people.find(x => x.name === newName)
    
    if(oldObject === undefined) {
      const newId = Math.max(...people.map(x => x.id)) + 1;
      const newObject = {name: newName, number: newNumber, id: newId}
  
      peopleService.create(newObject)
        .then(response => {
          if(JSON.stringify(response) === JSON.stringify(newObject))
            setPeople(people.concat(newObject));
          else  // Should never happen
            setPeople(people.concat(response));

          setNotification({message: 'Number successfully added', type: 'success'});
          setTimeout(() => setNotification({message: null, type: 'success'}), 5000);
        })
        .catch(error => {
          setNotification({message: `Unable to add new person: "${error.response.data.error}"`, type: 'error'});
          setTimeout(() => setNotification({message: null, type: 'error'}), 5000);
        });
    }
    else if(window.confirm("Person already exists. Replace it?")) {
      const newObject = {name: newName, number: newNumber, id: oldObject.id};
  
      peopleService.updateById(newObject.id, newObject)
        .then(response => {
          setPeople(people.map(x => x.id !== newObject.id ? x : response))

          setNotification({message: 'Number successfully replaced', type: 'success'});
          setTimeout(() => setNotification({message: null, type: 'success'}), 5000);
        })
        .catch(error => {
          setNotification({message: `Unable to add new person: "${error.response.data.error}"`, type: 'error'});
          setTimeout(() => setNotification({message: null, type: 'error'}), 5000);
        });
    }
  
    setNewName('');
    setNewNumber('');
  }
  
  return (
    <div>
      <h2>Add new person</h2>
      <form onSubmit={handleInputSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td><input value={newName} onChange={event => handleInputChange(event, setNewName)}/></td>
            </tr>
            <tr>
              <td>Number: </td>
              <td><input value={newNumber} onChange={event => handleInputChange(event, setNewNumber)}/></td>
            </tr>
            <tr>
              <td><button type="submit">Add</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AddNewPersonForm;
