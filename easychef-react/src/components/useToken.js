import { useState } from 'react';



export function tokenInfo() {
  const isLoggedIn = () => {
    if(!global.config.accounts.enableAuth) return true;

    const tokenString = localStorage.getItem('token');
    return tokenString != null && tokenString !== "";
  };

  return {
    isLoggedIn: isLoggedIn,
  }
}

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}