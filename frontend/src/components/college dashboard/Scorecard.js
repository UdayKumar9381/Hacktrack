import React, { useState, useEffect } from 'react';
import './Scorecard.css';

const Scorecard = ({ setRegistrationsCount }) => {
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [messages, setMessages] = useState({});
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/registration/registrations');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
        setStudentCount(data.length);
        setRegistrationsCount(data.length); // Pass the count to the parent
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleScoreChange = (studentId, value) => {
    // Ensure value is numeric and between 0-100
    const numValue = value === '' ? '' : Number(value);
    if (value === '' || (!isNaN(numValue) && numValue >= 0 && numValue <= 100)) {
      setScores({
        ...scores,
        [studentId]: value
      });

      // Clear any previous message when the user changes the score
      setMessages({
        ...messages,
        [studentId]: ''
      });
    }
  };

  const handleSubmitScore = async (studentId) => {
    console.log("Submitting score for:", studentId, scores[studentId]); // Debugging

    if (!studentId || scores[studentId] === undefined) {
      alert("Invalid student ID or score");
      return;
    }

    // Log the student data being sent
    const student = students.find(s => s._id === studentId);
    console.log("Student Data:", student);

    try {
      const response = await fetch('http://localhost:5002/api/registration/update-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, score: Number(scores[studentId]) }),
      });

      const result = await response.json();
      console.log("Server Response:", result); // Debugging

      if (!response.ok) {
        console.error("Error:", result.message);
        alert("Error: " + result.message);
        return;
      }

      alert("Score updated successfully");
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("Failed to update score");
    }
  };

  return (
    <div className="scorecard">
      <h2>Hackathon Registration Details</h2>

      {/* Display the count of registered students */}
      <div className="student-count">
        <strong>Total Registered Members:</strong> {studentCount}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Year</th>
            <th>Branch</th>
            <th>Email</th>
            <th>Hackathon</th>
            <th>College</th>
            <th>Organisation</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.rollno}</td>
                <td>{student.yearOfStudy}</td>
                <td>{student.branch}</td>
                <td>{student.email}</td>
                <td>{student.hackathonName}</td>
                <td>{student.collegeName}</td>
                <td>{student.organisation}</td>
                <td>
                  <input
                    type="text"
                    value={scores[student._id] || ''}
                    onChange={(e) => handleScoreChange(student._id, e.target.value)}
                    placeholder="0-100"
                    className="score-input"
                  />
                </td>
                <td>
                  <div className="action-cell">
                    <button
                      onClick={() => handleSubmitScore(student._id)}
                      disabled={submitting[student._id]}
                      className="submit-button-individual"
                    >
                      {submitting[student._id] ? 'Saving...' : 'Save'}
                    </button>
                    {messages[student._id] && (
                      <span className={`message-inline ${messages[student._id].includes('Error') ? 'error' : 'success'}`}>
                        {messages[student._id]}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No registrations found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Scorecard;