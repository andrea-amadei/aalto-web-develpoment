import Notification from './components/Notification';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdotesReducer';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AnecdoteList from './views/AnecdoteList';
import AnecdoteForm from './views/AnecdoteForm';
import Navbar from './components/Navbar';
import FullAnecdote from './views/FullAnecdote';
import Footer from './components/Footer';
import About from "./views/About";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app">
      <Router>
        <Notification />

        <h1>Software Anecdotes</h1>
        <Navbar />

        <Routes>
          <Route path="/" element={<AnecdoteList />} />
          <Route path="/create" element={<AnecdoteForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes/:id" element={<FullAnecdote />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App