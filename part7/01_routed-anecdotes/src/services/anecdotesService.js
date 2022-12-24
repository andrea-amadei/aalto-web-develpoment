import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const randomId = () => (1_000_000 * Math.random()).toFixed(0);

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

export const createNew = async (content, author) => {
  const newObject = { content, author, id: randomId(), votes: 0 };
  const response = await axios.post(baseUrl, newObject);

  return response.data;
}

export const addVote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`,
    { ...anecdote, votes: anecdote.votes + 1 });

  return response.data;
}

const anecdotesService = { getAll, createNew, addVote };
export default anecdotesService;
