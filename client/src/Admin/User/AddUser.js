import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'
import './adduser.css'

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellNumber: '',
    age: ''
  });
  const [error, setError] = useState({  name: '',
  email: '',
  cellNumber: '',
  age: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '' }); // Reset error message for the field
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}

    // Field should not be empty 
    if(!formData.name.trim()){
      validationErrors.name = "Name is required"
    }else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      validationErrors.name = "Name should contain only characters and spaces";
    }
    if(!formData.email.trim()){
      validationErrors.email = "Email is required"
    }else if(!/^[a-zA-Z]+[a-zA-Z0-9]*@(yahoo|gmail)\.(com|net|org)$/i.test(formData.email)){
      validationErrors.email = "Email pattern is not followed"
    }
  
    if(!formData.cellNumber.trim()){
      validationErrors.cellNumber = "Cell# is required"
    }else if(parseInt(formData.cellNumber)<0){
      validationErrors.cellNumber = 'Cell Number must be non-negative values'
    }else if(formData.cellNumber.length < 9 || formData.cellNumber.length > 13) {
      validationErrors.cellNumber = 'Cell number length must be between 9 and 13';
    }    // Cell number should contain only numbers
    else if (!/^\d+$/.test(formData.cellNumber)) {
      validationErrors.cellNumber = 'Cell number should contain only numbers';
      return;
    }

    if(!formData.age.trim()){
      validationErrors.age = "Age is required"
    }else if(parseInt(formData.age) < 18 || parseInt(formData.age) > 60){
      validationErrors.age = 'Age must be between 18 and 60'
    }
   
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    

     // Check if the email already exists
  try {
    const response = await fetch('/users'); // Assuming this is the endpoint to get user data
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    const existingEmail = userData.find(user => user.email === formData.email);
    if (existingEmail) {
      validationErrors.email = 'User with this email already exists';
    }
  } catch (error) {
    console.error('Error:', error);
    setError({ general: 'Failed to validate email' });
    return;
  }

  // Set validation errors and handle form submission
  if (Object.keys(validationErrors).length > 0) {
    setError(validationErrors);
    return;
  }

  // If no validation errors, proceed with form submission
  try {
    const response = await fetch('/user/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    // Reset form data on success
    setFormData({
      name: '',
      email: '',
      cellNumber: '',
      age: ''
    });
    alert('User added successfully');
    navigate('/users')
  } catch (error) {
    console.error('Error:', error);
    setError({ general: 'Failed to add user' });
  }
};
  
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
           <div className="container">
      <h2>Add User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <br/>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={error.name ? 'error' : ''}/>
        {error.name && <p className= 'span1'>{error.name}</p>}
        </div>


        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <br/>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={error.email ? 'error' : ''}/>
          {error.email && <p className= 'span1'>{error.email}</p>}
        </div>


        <div className="form-group">
          <label htmlFor="cellNumber">Cell#:</label>
          <br/>
          <input type="text" id="cellNumber" name="cellNumber" value={formData.cellNumber} onChange={handleChange} required className={error.cellNumber ? 'error' : ''} />
          {error.cellNumber && <p className= 'span1'>{error.cellNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <br/>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required className={error.age ? 'error' : ''} />
          {error.age && <p className= 'span1'>{error.age}</p>}
        </div>

        <div className='btncontrol'>
        <button className= 'btn1 'type="submit" >Submit</button>
        </div>
      </form>
    </div>
        </div>
    </div>
  )
}

export default AddUser
