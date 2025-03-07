import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import useToken, { tokenInfo } from '../../components/useToken';

async function loginUser(credentials) {
  fetch('http://127.0.0.1:8000/recipes/empty/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return fetch(global.config.accounts.loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    

 }


export default function Login() {
  const { setToken } = useToken();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if(token?.Status)      {
        setToken(token.token);
        localStorage.setItem('authToken', token.token);
        navigate("/");
      }
    
    if(!token.ok) {
      let errorMessage = '';
      for (const key in token) {
        errorMessage += `${key}: ${token[key]}<br />`;
      }
      setResponseMessage(errorMessage);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading">Log in</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="form-control" onChange={e => setUserName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
        <div
              className="response"
              dangerouslySetInnerHTML={{ __html: responseMessage }}
            ></div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
