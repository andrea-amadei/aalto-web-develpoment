import { useState } from 'react';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [notification, setNotification] = useState({ message: null, type: 'error' });
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      <LoginForm setNotification={setNotification} token={token} setToken={setToken} />
      <BlogList token={token} setNotification={setNotification} />
    </div>
  )
}

export default App
