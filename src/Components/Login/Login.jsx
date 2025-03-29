import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert('Please fill out all fields');
      return;
    }



    axios.post('http://localhost:4200/user/login', {
      email: email,
      password: password
    })
      .then(res => {
        setLoading(false);
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('fullName', res.data.fullName)
        localStorage.setItem('imageUrl', res.data.imageUrl)
        localStorage.setItem('imageId', res.data.imageId)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
        toast.success('Login successfully...')
        // console.log('Signup successful:', res.data);
      })
      .catch(err => {
        setLoading(false)
        toast.error('Something is wrong.....')
        console.error('Error during signup:', err.response.data);
      });
  };



  return (
    <>
      <div className='Signup-page'>
        <div className='sighnup-box'>

          <div className="Signup-left">
            <img className='Signup-logo' src={require('../../Assets/logo-management.png')} alt="Signup-logo" />
            <h1 className='Signup-left-h1'>Institute Management App </h1>
            <p>Handel the Institute easy way....</p>
          </div>
          <div className="Signup-right">
            <h1>Login  Your Account</h1>
            <hr />
            <form onSubmit={submitHandler} className='signup-form' action="">
              <input value={email}
                onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" required />
              <input value={password}
                onChange={e => setPassword(e.target.value)} placeholder='Password' type="password" required />
              <button type='submit'>{isLoading && <FontAwesomeIcon icon={faSpinner} spin pulse />}SUBMIT</button>
              <Link className='moveto' to='/signup'>Create New Account</Link>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
