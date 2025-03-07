import React from 'react';
import '../Login/Login.css';
import { Link } from 'react-router-dom';



const SignupSuccess = () => {



  return (
    <div className="login-page">
    <div className="login-form" >
      <h2 className="login-heading">Sign Up Successful</h2>
      <div >
            <span>Click <Link to="/login">HERE</Link> to login.</span>
          </div>
    </div>
  </div>

  );
};

export default SignupSuccess;
