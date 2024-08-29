import React, { useState } from 'react';
import './write.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import iconImage from './icon4.jpg';

function Write() {
    const [italic, setItalic] = useState(false);
    const [bold, setBold] = useState(false);
    const navigate = useNavigate();

    const toggleItalic = () => {
        const textInput = document.getElementById('textInput');
        textInput.classList.toggle('italic');
        setItalic(italic);
    };

    const toggleBold = () => {
        const textInput = document.getElementById('textInput');
        textInput.classList.toggle('bold');
        setBold(bold);
    };

    const undo = () => {
        document.execCommand('undo');
    };

    const redo = () => {
        document.execCommand('redo');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = {
            universityNo: formData.get('ID'),
            title: formData.get('Title'),
            name: formData.get('YourName'),
            companyName: formData.get('CompanyName'),
            email: formData.get('EmailForVerification'),
            experience: formData.get('Experience'),
        };

        console.log('Submitting data:', data); // Log the data being submitted

        try {
            const response = await axios.post('http://localhost:8081/submit', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message);
            navigate('/'); // Redirect to the main page after successful submission
        } catch (error) {
            console.error('Error submitting experience:', error);
            alert('Error submitting experience');
        }
    };

    const handleCancel = () => {
        navigate('/'); // Redirect to the main page when cancel is clicked
    };

    return (
        <div>
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

            <Link to="/request" className='button3'>Request article</Link>

            <div className="containerr">
                <form onSubmit={handleSubmit}>
                    <h1 className="heading"> Write your interview Experience</h1>
                    <label htmlFor="ID"><b>University No:</b></label>
                    <input type="text" className="input" placeholder="University No:" name="ID" required /><br /><br />

                    <label htmlFor="Title"><b>Suitable Title:</b></label>
                    <input type="text" className="input" placeholder="Enter Title" id="Title" name="Title" required /><br /><br />

                    <label htmlFor="YourName"><b>Your Name:</b></label>
                    <input type="text" className="input" placeholder="Enter Your Name" id="YourName" name="YourName" required /><br /><br />

                    <label className="inputlc" htmlFor="CompanyName"><b>Company Name:</b></label>
                    <input type="text" className="inputc" placeholder="Enter Company Name" id="CompanyName" name="CompanyName" required /><br /><br />

                    <label className="inputec" htmlFor="EmailForVerification"><b>Email Acc:</b></label>
                    <input type="email" className="inpute" placeholder="Enter Your Email for verification" name="EmailForVerification" required /><br /><br />

                    <h2 className="h2">Share your experience here</h2>
                    <div className="toolbar">
                        <button type="button" id="italicButton" onClick={toggleItalic}><i className={`fas fa-italic ${italic ? 'active' : ''}`}></i></button>
                        <button type="button" id="boldButton" onClick={toggleBold}><i className={`fas fa-bold ${bold ? 'active' : ''}`}></i></button>
                        <button type="button" onClick={undo}><i className="fas fa-undo"></i></button>
                        <button type="button" onClick={redo}><i className="fas fa-redo"></i></button>
                    </div>

                    <textarea id="textInput" placeholder="Type your message here..." name="Experience" required></textarea>
            
                    <input className="button4" type="submit" value="Submit" />
                    <input className="button5" type="button" value="Cancel" onClick={handleCancel} />
                </form>
            </div>
        </div>
    );
}

export default Write;
