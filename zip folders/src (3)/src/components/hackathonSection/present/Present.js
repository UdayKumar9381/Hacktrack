import React, { useState, useEffect } from 'react';
import './Present.css';
import { useNavigate } from 'react-router-dom';

function HackathonCard({ title, themes, participants, poster }) {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        navigate('/regester');
    };

    return (
        <div className="hackathon-card">
            <div className="hackathon-poster" style={{ backgroundImage: `url(${poster})` }}>
                {/* Poster dynamically set via inline style */}
            </div>
            <div className="hackathon-content">
                <h2 className="hackathon-title">{title}</h2>
                <p className="hackathon-participants">👥 {participants} participants</p>
                <button className="apply-button" onClick={handleApplyClick}>Apply now</button>
            </div>
        </div>
    );
}

function Present() {
    const [hackathons, setHackathons] = useState([
        {
            title: "Build the New Internet",
            themes: ["BLOCKCHAIN"],
            participants: "1000+",
            poster: "poster.jpg",
        },
        {
            title: "BuildTheFlow",
            themes: ["MACHINE LEARNING"],
            participants: "100+",
            poster: "poster.jpg",
        },
        {
            title: "HealthTech Sprint",
            themes: ["HEALTH"],
            participants: "500+",
            poster: "poster.jpg",
        },
        {
            title: "AI Innovation Day",
            themes: ["AI"],
            participants: "800+",
            poster: "poster.jpg",
        },
        {
            title: "GreenTech Hack",
            themes: ["ENVIRONMENT"],
            participants: "300+",
            poster: "poster.jpg",
        },
        {
            title: "Open Source Future",
            themes: ["OPEN SOURCE"],
            participants: "1200+",
            poster: "poster.jpg",
        },
    ]);

    // Simulate daily updates using useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            const newHackathon = {
                title: `Hackathon ${new Date().toLocaleDateString()}`,
                themes: ["NEW"],
                participants: `${Math.floor(Math.random() * 500) + 100}+`,
                poster: "/images/new.jpg",
            };
            setHackathons((prev) => [...prev, newHackathon]);
        }, 24 * 60 * 60 * 1000); // Update once a day

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className="hackathon-container">
            <div className="header">
                <h1 className="main-heading">Present Hackathons</h1>
            </div>

            <div className="hackathon-cards">
                {hackathons.map((hackathon, index) => (
                    <HackathonCard key={index} {...hackathon} />
                ))}
            </div>
        </div>
    );
}

export default Present;