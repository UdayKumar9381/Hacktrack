import React, { useState, useRef, useEffect } from 'react';
import "../loginpage/StudentLogin.css";

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(10 * 60); // 10 minutes
  const [otpExpiry, setOtpExpiry] = useState(false);
  const inputRefs = useRef([]);

  // Timer Management
  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer <= 0) {
      setOtpExpiry(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus(); // Auto-focus next field
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Go to previous input
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setOtpExpiry(false); // Reset OTP expiry
    try {
      const response = await fetch('http://localhost:5002/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: 'student' }),
      });

      if (response.ok) {
        setOtpSent(true);
        setTimer(10 * 60); // Reset timer
        alert('OTP sent to your email.');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
        alert('Please enter the complete 6-digit OTP');
        return;
    }

    setLoading(true);
    try {
        const response = await fetch('http://localhost:5002/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp: otpString, role: 'student' }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            // Store userEmail and studentId in localStorage
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("studentId", data.studentId); // Store studentId

            alert('OTP verified! Redirecting...');
            window.location.href = '/studentdashboard';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Verification failed. Please try again.');
    } finally {
        setLoading(false);
    }
};



  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>{!otpSent ? 'Student Login' : 'Enter OTP'}</h2>

        {!otpSent ? (
          <div>
            <label htmlFor="email">Email</label>
            <div className="email-container">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button onClick={handleSendOtp} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            <div className="signup-link">
              Don’t have an account? <a href="/signup">Sign up here</a>
            </div>
          </div>
        ) : (
          <div>
            {otpExpiry ? (
              <p className="expiry-message">OTP expired. Please request a new one.</p>
            ) : (
              <div>
                <div className="otp-input-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="otp-input"
                    />
                  ))}
                </div>
                <div className="timer">Time remaining: {formatTime(timer)}</div>
              </div>
            )}
            <button onClick={handleVerifyOtp} disabled={loading || otpExpiry}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
