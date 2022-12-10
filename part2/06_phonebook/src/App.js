import {useEffect, useState} from 'react'
import PeopleList from "./components/PeopleList";
import AddNewPersonForm from "./components/AddNewPersonForm";
import peopleService from "./services/peopleService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({message: null, type: 'error'});
  
  useEffect(() => {
    peopleService.getAll()
      .then(response => setPersons(response))
      .catch(() => {
        console.log("Unable to fetch data from server!");

        setNotification({message: 'Unable to fetch data from server', type: 'error'});
        setTimeout(() => setNotification({message: null, type: 'error'}), 5000);
      });
  }, []);
  
  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification.message} type={notification.type} />

      <AddNewPersonForm people={persons} setPeople={setPersons} setNotification={setNotification} />
      <PeopleList people={persons} setPeople={setPersons} setNotification={setNotification} />
    </div>
  )
}

export default App;
