import {useState} from "react";
import {handleInputChange} from "../common";
import peopleService from "../services/peopleService";

const PeopleList = ({ people, setPeople, setNotification }) => {
  const [search, setSearch] = useState('');
  
  const handleDelete = (personId) => {
    if(window.confirm("Delete person forever?"))
      peopleService.deleteById(personId)
        .then(() => {
          setPeople(people.filter(x => x.id !== personId));

          setNotification({message: 'Person successfully deleted', type: 'success'});
          setTimeout(() => setNotification({message: null, type: 'success'}), 5000);
        })
        .catch(error => {
          setNotification({message: `Unable to delete person ${personId}: "${error}"`, type: 'error'});
          setTimeout(() => setNotification({message: null, type: 'error'}), 5000);
        });
  }
  
  return (
    <div>
      <h2>People</h2>
      <div><b>Search:</b> <input value={search} onChange={event => handleInputChange(event, setSearch)}/></div>
      
      <table>
        <tbody>
          {people
            .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
            .map(x =>
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{x.number}</td>
                <td><button onClick={() => handleDelete(x.id)}>Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default PeopleList;
