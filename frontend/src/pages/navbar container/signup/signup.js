import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../signup/signup.css';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [collegeCode, setCollegeCode] = useState(''); // Added missing state
    const [studentId, setStudentId] = useState('');
    const [branch, setBranch] = useState('');
    const [dob, setDob] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!fullName || !email || !phone || !collegeName || !collegeCode || !studentId || !branch || !dob || !linkedin) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5002/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, phone, collegeName, collegeCode, studentId, branch, dob, linkedin }),
            });

            if (response.ok) {
                alert('Signup successful! Please login.');
                setFullName('');
                setEmail('');
                setPhone('');
                setCollegeName('');
                setCollegeCode(''); // Reset state
                setStudentId('');
                setBranch('');
                setDob('');
                setLinkedin('');
            } else {
                const errorData = await response.json();
                alert(`Signup failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('Error during signup: ' + error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>

            <h2 className="signup-heading">Sign Up</h2>

            <form
                className="signup-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignup();
                }}
            >
                <input className="signup-input" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input className="signup-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="signup-input" type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input className="signup-input" type="text" placeholder="College Name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} required />
                <input className="signup-input" type="text" placeholder="College Code" value={collegeCode} onChange={(e) => setCollegeCode(e.target.value)} required />
                <input className="signup-input" type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                <input className="signup-input" type="text" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                <input className="signup-input" type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
                <input className="signup-input" type="text" placeholder="LinkedIn Profile Link" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} required />

                <button className="signup-button" type="submit">Sign Up</button>
            </form>

            <p className="signup-login-text">
                Already have an account? <span onClick={() => navigate('/studentlogin')} className="signup-login-link">Login here</span>
            </p>
        </div>
    );
}

export default Signup;
