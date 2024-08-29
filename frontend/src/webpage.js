import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Webpage() {
    const [webpage, setWebpage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/webpage");
                setWebpage(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/request" className='btn btn-success mb-3'>
                    Add +
                </Link>
                {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>YourName</th>
                                <th>EmailforVarification</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(webpage) && webpage.length > 0 ? (
                                webpage.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.YourName}</td>
                                        <td>{data.EmailforVarification}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No student data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Webpage;
