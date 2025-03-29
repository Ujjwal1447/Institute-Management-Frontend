import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the actual file to send

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !email || !phone || !password) {
      alert('Please fill out all fields');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('image', imageFile); // Append the actual image file

    axios.post('http://localhost:4200/user/signup', formData)
      .then(res => {
        setLoading(false)
        navigate('/login')
        toast.success('Account created successfully...')
        console.log('Signup successful:', res.data);
      })
      .catch(err => {
        setLoading(false)
        toast.error('Something is wrong.....')
        console.error('Error during signup:', err.response.data);
      });
  };

  // Handle image preview and store the file
  const fileHandler = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Store the file to send in the form
    setImage(URL.createObjectURL(file)); // Create preview
  };

  return (
    <>
      <div className='Signup-page'>
        <div className='sighnup-box'>

          <div className="Signup-left">
            <img className='Signup-logo' src={require('../../Assets/logo-management.png')} alt="Signup-logo" />
            <h1 className='Signup-left-h1'>Institute Management App </h1>
            <p>Lerarn Coding easy way....</p>
          </div>
          <div className="Signup-right">
            <h1>Creat Your Account</h1>
            <hr />


            <form onSubmit={submitHandler} className='signup-form' action="">
              <input value={fullName}
                onChange={e => setFullName(e.target.value)} placeholder='Institute Full Name' type="text" required />
              <input value={email}
                onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" required />
              <input value={phone}
                onChange={e => setPhone(e.target.value)} placeholder='Phone' type="text" required />
              <input value={password}
                onChange={e => setPassword(e.target.value)} placeholder='Password' type="password" required />

              <input onChange={fileHandler} type="file" />

              {image && <img className='Institute-logo' src={image} alt="Select Institute Logo" />}
              <button type='submit'>{isLoading && <FontAwesomeIcon icon={faSpinner} spin pulse />}SUBMIT</button>
              <Link className='moveto' to='/login'>Alredy have Account</Link>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Signup;
