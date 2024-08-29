import React from 'react';
import './request.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import iconImage from './icon4.jpg';

const Request = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const reqData = {
      universityno: formData.get('UniversityNo'),
      name: formData.get('Name'),
      email: formData.get('Email'),
      company: formData.get('Company'),
      note: formData.get('Note')
    };
    

    console.log('Submitting data:', reqData);

    try {
      const response = await axios.post('http://localhost:8081/done', reqData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request');
    }
  };

  return (
    <div>
      <div className="navbar">
        <a className="head" href="#interview-insights">
          <img className="icon" src={iconImage} width="50" height="32" alt="Interview Insights" />
          Interview Insights
        </a>

        <Link to="/" className="active">
          Home
        </Link>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Link to="/write" className='button3'>
          Write Article
        </Link>
        <div className="containerrr">
          <form onSubmit={handleSubmit}>
            <p className="head">Request an article</p>
            <div className="info">
              <label htmlFor="UniversityNo"><b>University no:</b></label>
              <input type="text" className="input" placeholder="Enter no" name="UniversityNo" required /><br /><br />
              
              <label htmlFor="Name"><b>Your Name:</b></label>
              <input type="text" className="input" placeholder="Enter Your Name" name="Name" required /><br /><br />
              
              <label htmlFor="Email"><b>Your Email:</b></label>
              <input type="text" className="input" placeholder="Enter Email" name="Email" required /><br /><br />
              
              <label htmlFor="Company"><b>Company Name:</b></label>
              <input type="text" className="input" placeholder="Enter Company Name" name="Company" required /><br /><br />
              
              <label htmlFor="Note"><b>Personal Note:</b></label>
              <input type="text" className="input" placeholder="Enter Personal Note" name="Note" required /><br /><br />
              
              <input className="button1" type="submit" value="Done" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Request;
