import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../styleSheets/register.css";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const auth = getAuth();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // console.log(result);
      toast.success("Registraction Successfull");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      console.log(error);
      toast.error("Registraction Failed ! Already Exist");
    }
  };

  return (
    <div className='registerContainer'>
      <div className='topContainer'></div>

      <div className='row'>
        <div className='left-col'>
          <lottie-player
            className='animation'
            src='https://assets9.lottiefiles.com/packages/lf20_yr6zz3wv.json'
            background='transparent'
            speed='1'
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className='right-col'>
          <div className='register_form'>
            <h2>Register</h2>
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
            <input
              type='password'
              className='form-control'
              placeholder='Confirm password...'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button className='btn' onClick={register}>
              Register
            </button>

            <Link to='/login' className='login'>
              Click Here to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
