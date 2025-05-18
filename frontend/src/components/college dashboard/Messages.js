import React, { useEffect, useState } from "react";
import "./Messages.css"; // Import the CSS file

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5002/api/contact/messages") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="messages-container">
      <h2>📩 Contact Messages</h2>
      {loading ? (
        <p className="loading">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="no-messages">No messages found.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Messages;
