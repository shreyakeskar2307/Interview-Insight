const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1',
    database: 'iig'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to fetch all data from the `write` table
app.get('/getdata', (req, res) => {
    const sql = 'SELECT * FROM `write`';
    
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

// Endpoint to submit an experience entry
app.post('/submit', (req, res) => {
    const { universityNo, title, name, companyName, email, experience } = req.body;
    console.log('Received data:', req.body); // Log the incoming data

    const sql = 'INSERT INTO `write` (ID, Title, CompanyName, YourName, EmailforVarification, Experience) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(sql, [universityNo, title, companyName, name, email, experience], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json({ message: 'Experience submitted successfully!' });
    });
});

// Endpoint to handle the 'done' form submission
app.post('/done', (req, res) => {
    const { universityno, name, email, company, note } = req.body;  // Ensure these keys match what the frontend sends
    console.log('Received data:', req.body); // Log the incoming data

    const sql = 'INSERT INTO `request` (UniversityNo, Name, Email, Company, Note) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(sql, [universityno, name, email, company, note], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json({ message: 'Request submitted successfully!' });
    });
});

// Start the server and listen on port 8081
app.listen(8081, () => {
    console.log('Server is listening on port 8081');
});
