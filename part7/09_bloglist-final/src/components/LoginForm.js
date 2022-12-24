import { useState } from 'react';
import { setNotification } from '../redux/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, removeUser } from "../redux/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginUser(username, password))
      .then(() => {
        dispatch(setNotification('Successfully logged in', 'success', 5000));
      })
      .catch(() => {
        dispatch(setNotification('Invalid username or password', 'error', 5000));
      })
      .finally(() => {
        setPassword('');
      });
  }

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(removeUser());
    setUsername('');

    dispatch(setNotification('Successfully logged out', 'warning', 5000));
  }

  return (
    <div className="login">
      <h2>Login</h2>

      {(user.token ?
        <div>Logged in as {user.username} <button className="logout-button" onClick={handleLogout} >Logout</button></div>
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
