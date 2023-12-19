import React, { useState } from 'react';
import './App.css';



const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    Lname: '',
    age: '',
    email: '',
    Batch: '6-7 AM',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can handle form submission logic here
    try {
      // Make a POST request to the backend API
      const response = await fetch('http://localhost:5000/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Handle the response from the backend
      if (data.success) {
        alert('Enrollment successful!');
      } else {
        alert('Enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  
  return (
    <div className="main">
    <div className="register">
        <h2>Register Here</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">First Name :</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your First Name"
            value={formData.name}
            onChange={handleChange}
          />
          <br /><br />
          <label htmlFor="Lname">Last Name :</label>
          <br />
          <input
            type="text"
            name="Lname"
            id="Lname"
            placeholder="Enter Your Last Name"
            value={formData.Lname}
            onChange={handleChange}
          />
          <br /><br />
          <label htmlFor="Age">Age :</label>
          <br />
          <input
            type="number"
            name="age"
            id="age"
            placeholder="How old are You?"
            value={formData.age}
            onChange={handleChange}
          />
          <br /><br />
          <label htmlFor="Email">Email :</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Valid Email"
            value={formData.email}
            onChange={handleChange}
          />
          <br /><br />
          <label htmlFor="Batch">Batch:</label>
          <br />
          <select
            name="Batch"
            id="Batch"
            value={formData.Batch}
            onChange={handleChange}
          >
            <option value="6-7 AM">6-7 AM</option>
            <option value="7-8 AM">7-8 AM</option>
            <option value="8-9 AM">8-9 AM</option>
            <option value="5-6 PM">5-6 PM</option>
          </select>
          <div className="gender">
            <label>Gender :</label>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="Male"
                onChange={handleChange}
              />
              <span>Male</span>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="female"
                value="Female"
                onChange={handleChange}
              />
              <span>Female</span>
            </div>
          </div>
          <button type="submit" className="submit-btn" onClick={handleSubmit}> 
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
