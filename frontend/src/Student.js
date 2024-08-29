import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css'
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import Webpage from './webpage';
import iconImage from './icon4.jpg';
import gifImage from './gif3.gif';
import Linkify from 'react-linkify';//it will detect the link

function Navbar() {
  return (
    <div className="navbar">
      <a className="head" href="#interview insights">
      <img className="icon" src={iconImage} width="50" height="32" alt="Interview Insights" />
        Interview Insights
      </a>
      <a className="active" href="http://localhost:3000/">Home</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      <input type="text" placeholder="Search.." />
    </div>
  );
}

function Container() {
  return (
    <div className="container">
      <div className="gif">
        <img src={gifImage} alt="Gif" />
      </div>
      <p className="note1">"Sometime you WIN, Sometime you LEARN"<br /></p>
      <p className="note2">Welcome Achiever...!<br /></p>
      <p className="note">
        This is an experience sharing platform. It is developed for everyone to read and share encounters of various interviews.
      </p>
                <Link to="/write" className='button2'>
                    Write Article
                </Link>
      <Link to="/request" className='button2'>
      Request article
                </Link>
    </div>
  );
}

// Student Component
function Student() {
  const [student, setStudent] = useState([]); // Initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getData");
      setStudent(response.data); // Assuming response.data is an array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to handle "Read More" button click
  const handleReadMore = (experience) => {
    setSelectedExperience(experience);
  };


    return (
        <div className="app-container">
            <Navbar />
            {selectedExperience ? (
                <div className="selected-experience">
                    <h2 className="head">Selected Experience</h2>
                    {/*{ <p className="content">{selectedExperience}</p> }*/}
                    <Linkify>
                        <p className="content" style={{ whiteSpace: 'pre-wrap' }}>{selectedExperience}</p>
                    </Linkify>
                    <button className="btn-secondary" onClick={() => setSelectedExperience(null)}>Back</button>
                </div>
            ) : (
        <div className="content">
          <Container />
        <div className="student-section">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="card-container-wrapper">
              <div className="card-container">
                <h2 className="h2">All Articles...</h2>
                {student.map((data, i) => (
                  <div className="card" key={i}>
                    <h2>{data.Title}</h2>
                    <p>{data.CompanyName}</p>
                    <p>{data.YourName}</p>
                    <button className="btn-primary" onClick={() => handleReadMore(data.Experience)}>Read More</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
}

export default Student;



