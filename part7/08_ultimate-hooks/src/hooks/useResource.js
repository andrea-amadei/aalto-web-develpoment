import {useEffect, useState} from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const asyncGetAll = async () => (await axios.get(baseUrl)).data;

  const asyncCreate = async newResource => (await axios.post(baseUrl, newResource)).data;

  useEffect(() => {
    asyncGetAll()
      .then(response => setResources(response))
      .catch(error => {
        setResources([]);
        console.log(error);
      })
  }, []);

  const create = (newResource) => {
    asyncCreate(newResource)
      .then(response => setResources(resources.concat(response)))
      .catch(error => console.log(error))
  }

  return [
    resources,
    { create }
  ]
}

export default useResource;
