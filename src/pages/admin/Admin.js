import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import '../../assets/utils/utils.css';

function Admin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'awla786' && password === 'dbms123') {
      navigate('/adminpanel');
    } else {
      console.log('Invalid username or password');
      setIsWrongPassword(!isWrongPassword);
    }
  };

  return (
    <div className="Admin bg-img flex-all-center">
      <form className="form" onSubmit={handleLogin} autoComplete='off'>
        <p className="form-title">Admin Panel</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
          />
        </div>
        <button type='submit' className="submit">LOGIN</button>
        {isWrongPassword && <div className='errorPrompt'>Invalid Credentials</div>}
      </form>
    </div>
  );
}

export default Admin;
