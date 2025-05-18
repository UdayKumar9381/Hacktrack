import React from "react";
import "./HackathonCard.css";

function HackathonCard({ 
  title, 
  description, 
  image, 
  startDate, 
  endDate, 
  location, 
  collegeName, 
  duration, 
  status, 
  onEdit, 
  onDelete 
}) {
  return (
    <div className="hackathon-card">
      <img src={image} alt={title} className="hackathon-image" />
      <div className="hackathon-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <p><strong>Start:</strong> {new Date(startDate).toLocaleString()}</p>
        <p><strong>End:</strong> {new Date(endDate).toLocaleString()}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>College/Company:</strong> {collegeName}</p>
        {duration && <p><strong>Duration:</strong> {duration} days</p>}
        {status && <p><strong>Status:</strong> {status}</p>}

        {/* Render buttons only if onEdit and onDelete are provided */}
        {(onEdit || onDelete) && (
          <div className="button-group">
            {onEdit && <button className="edit-button" onClick={onEdit}>Edit</button>}
            {onDelete && <button className="delete-button" onClick={onDelete}>Delete</button>}
          </div>
        )}
      </div>
    </div>
  );
}

export default HackathonCard;
