import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

const Scoreboard = () => {
    const [scoreData, setScoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    // Fetch student score data
    useEffect(() => {
      const fetchScore = async () => {
        try {
          // Retrieve email or studentId from localStorage
          const email = localStorage.getItem('userEmail');
          const studentId = localStorage.getItem('studentId');
  
          if (!email && !studentId) {
            throw new Error('No email or student ID found in localStorage');
          }
  
          // Fetch score data from the backend
          const response = await fetch(
            `http://localhost:5002/api/registration/student-score?${email ? `email=${email}` : `studentId=${studentId}`}`
          );
  
          if (!response.ok) {
            throw new Error('Failed to fetch score data');
          }
  
          const data = await response.json();
          setScoreData(data);
        } catch (error) {
          console.error('Error fetching score:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchScore();
    }, []);
  
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
  
    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="student-dashboard">
          <h1>🏆 Your Hackathon Score</h1>
          {scoreData ? (
            <table className="score-table">
              <thead>
                <tr>
                  <th>Hackathon</th>
                  <th>Email</th>
                  <th>Organization</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{scoreData.hackathonName}</td>
                  <td>{scoreData.email}</td>
                  <td>{scoreData.organisation}</td>
                  <td>{scoreData.score}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No score data found.</p>
          )}
        </div>
      );
    };

export default Scoreboard;