import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const add = (title, author, url, userId, token) => {
  const request = axios.post(baseUrl,
    { title, author, url, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return request.then(response => response.data);
}

const setLikes = (blogId, likes) => {
  const request = axios.put(baseUrl + '/' + blogId, { likes: likes });
  return request.then(response => response.data);
}

const remove = (blogId, token) => {
  const request = axios.delete(baseUrl + '/' + blogId,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return request.then(response => response.data);
}

const exports = { getAll, add, setLikes, remove };
export default exports;
