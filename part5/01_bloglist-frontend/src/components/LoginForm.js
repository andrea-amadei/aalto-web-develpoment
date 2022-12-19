import { useState } from 'react';
import login from '../services/login';

const LoginForm = ({ setNotification, token, setToken }) => {

  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    login
      .login(username, password)
      .then((response) => {
        setToken(response.token);
        setUsername(response.username);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('id', response.id);

        setNotification({ message: 'Successfully logged in', type: 'success' });
        setTimeout(() => setNotification({ message: null, type: 'error' }), 5000);
      })
      .catch(() => {
        setNotification({ message: 'Invalid username or password', type: 'error' });
        setTimeout(() => setNotification({ message: null, type: 'error' }), 5000);
      });

    setPassword('');
  }

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');

    setToken('');
    setUsername('');

    setNotification({ message: 'Successfully logged out', type: 'warning' });
    setTimeout(() => setNotification({ message: null, type: 'error' }), 5000);
  }

  return (
    <div className="login">
      <h2>Login</h2>

      {(token ?
        <div>Logged in as {username} <button className="logout-button" onClick={handleLogout} >Logoout</button></div>
        :
        <form onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td><input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
              </tr>
              <tr>
                <td>
                  <input className="login-button" type="submit" value="Login" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
