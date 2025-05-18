import React, { useState } from "react";
import './Participations.css'


const Participation = () => {
    const [email, setEmail] = useState("");
    const [participations, setParticipations] = useState([]);
    const [error, setError] = useState("");

    const fetchParticipation = async () => {
        setError("");
        setParticipations([]);
    
        if (!email) {
            setError("Please enter an email.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5002/api/participation/${email}`);
            const data = await response.json();
    
            if (data.status === "Success") {
                setParticipations(data.data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Error fetching participation details. Try again later.");
        }
    };
    

    return (
        <div className="container">
            <h2>Participation Details</h2>

            <div className="input-container">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={fetchParticipation}>Search</button>
            </div>

            {error && <p className="error">{error}</p>}

            {participations.length > 0 && (
                <table className="participation-table">
                    <thead>
                        <tr>
                            <th>Hackathon Name</th>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Year</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participations.map((entry) => (
                            <tr key={entry._id}>
                                <td>{entry.hackathonName}</td>
                                <td>{entry.name}</td>
                                <td>{entry.rollno}</td>
                                <td>{entry.yearOfStudy}</td>
                                <td>{entry.branch}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Participation;