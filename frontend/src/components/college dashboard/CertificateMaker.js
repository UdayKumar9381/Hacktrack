import React, { useState, useEffect } from 'react';
import CertificateSample from './CertificateSample';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CertificateMaker = () => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [hackathonName, setHackathonName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("template1"); // Default template
  const navigate = useNavigate();

  const handleGenerateCertificate = async () => {
    try {
      setLoading(true);
      const certificateUrl = "generated-certificate-url"; // Replace with actual URL
      const response = await axios.post("https://hacktrack-rggs.onrender.com/api/certificates/create", {
        studentId,
        studentName,
        course,
        hackathonName,
        template, // Include the selected template
        certificateUrl,
      });
      alert(response.data.message || "Certificate created successfully!");
      navigate("/certificatedetails");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save certificate");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-container" style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px"
    }}>
      <div className="form-preview-container" style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        {/* Form Section */}
        <div className="form-section" style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ borderBottom: "2px solid #1a5cb0", paddingBottom: "10px", color: "#1a5cb0" }}>Create Certificate</h2>
          
          <div className="form-fields" style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
            <input 
              type="text" 
              placeholder="Student ID" 
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px"
              }}
            />
            <input 
              type="text" 
              placeholder="Student Name" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px"
              }}
            />
            <input 
              type="text" 
              placeholder="Course" 
              value={course} 
              onChange={(e) => setCourse(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px"
              }}
            />
            <input
              type="text"
              placeholder="Hackathon Name (Optional)"
              value={hackathonName}
              onChange={(e) => setHackathonName(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px"
              }}
            />
            
            {/* Template Selection Dropdown */}
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px"
              }}
            >
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
              <option value="template3">Template 3</option>
            </select>
            
            <div className="button-container" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button 
                onClick={() => setShowPreview(true)}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#3a7fd5",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  flex: 1
                }}
              >
                Preview
              </button>
              
              <button 
                onClick={handleGenerateCertificate}
                disabled={loading || !studentId || !studentName || !course}
                style={{
                  padding: "12px 20px",
                  backgroundColor: loading ? "#aaa" : "#1a5cb0",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  flex: 1
                }}
              >
                {loading ? "Generating..." : "Generate & Save"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        {showPreview && (
          <div className="preview-section" style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ color: "#1a5cb0" }}>Certificate Preview</h2>
              <button 
                onClick={handlePrint}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#d4af37",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Print
              </button>
            </div>
            
            <div className="certificate-preview" style={{ margin: "0 auto" }}>
            <CertificateSample  
  studentName={studentName || "Student Name"} 
  course={course || "Course Name"} 
  studentId={studentId || "Student ID"}
  hackathonName={hackathonName}
  date={new Date().toLocaleDateString()}
  template={template} // Pass the selected template
/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateMaker;