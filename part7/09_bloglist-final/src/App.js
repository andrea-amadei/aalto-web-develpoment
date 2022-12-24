import { useEffect } from 'react';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import { initializeBlogs } from './redux/blogsReducer';
import { useDispatch } from 'react-redux';
import { initializeUser } from "./redux/userReducer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersPage from "./components/UsersPage";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Router>
        <Notification />
        <Navbar />

        <LoginForm />

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
