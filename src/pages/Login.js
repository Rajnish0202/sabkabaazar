import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import "../styleSheets/login.css";

const auth = getAuth();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentUser", JSON.stringify(result));
      // console.log(result);
      toast.success("Login Successfull");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login Failed ! Email or Password not matched");
    }
  };

  return (
    <div className='loginContainer'>
      <div className='loginTopContainer'></div>

      <div className='loginrow'>
        <div className='left-col'>
          <lottie-player
            src='https://assets5.lottiefiles.com/packages/lf20_tiulipe2.json'
            background='transparent'
            speed='1'
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className='right-col'>
          <div className='login_form'>
            <h2>Login</h2>
            <hr />

            <input
              type='email'
              className='form-control'
              placeholder='email...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control'
              placeholder='password...'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className='loginbtn' onClick={login}>
              Login
            </button>

            <Link to='/register' className='register'>
              Click Here to register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
