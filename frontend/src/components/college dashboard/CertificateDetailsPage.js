import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CertificateSample from './CertificateSample';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateDetailsPage = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get("https://hacktrack-rggs.onrender.com/api/certificates");
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  // Function to handle downloading certificate with design
  const handleDownload = (certId) => {
    const certificateCard = document.getElementById(`certificate-${certId}`);

    if (certificateCard) {
      html2canvas(certificateCard, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // Allow cross-origin images (if any)
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Create a PDF in A4 size
        const imgWidth = 190; // Width of the image in the PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`${certId}_certificate.pdf`); // Save the PDF
      });
    }
  };

  // Limit the certificates to 9 for a 3x3 grid
  const displayedCertificates = certificates.slice(0, 9);

  return (
    <div className="certificate-list-container" style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: "20px" 
    }}>
      <h2 style={{ 
        borderBottom: "2px solid #1a5cb0", 
        paddingBottom: "10px", 
        color: "#1a5cb0",
        marginBottom: "20px" 
      }}>
        Certificate List
      </h2>
      
      {displayedCertificates.length === 0 ? (
        <p className="no-certificates" style={{ 
          textAlign: "center", 
          padding: "40px", 
          backgroundColor: "#f9f9f9",
          borderRadius: "8px" 
        }}>
          No certificates found.
        </p>
      ) : (
        <div className="certificate-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
          gap: "15px" 
        }}>
          {displayedCertificates.map((cert) => (
            <div 
              id={`certificate-${cert._id}`} // Unique ID for each certificate card
              className="certificate-card" 
              key={cert._id}
              style={{
                backgroundColor: "white",
                borderRadius: "6px",
                padding: "12px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                border: "1px solid #ddd",
                transition: "transform 0.2s",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                fontSize: "14px",
              }}
            >
              {/* Render the CertificateSample with the correct template */}
              <CertificateSample 
                studentName={cert.studentName} 
                studentId={cert.studentId}
                course={cert.course} 
                hackathonName={cert.hackathonName} 
                date={new Date(cert.date).toLocaleDateString()} 
                template={cert.template} // Pass the template prop
              />
              
              {/* Blue accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "6px",
                height: "100%",
                backgroundColor: "#1a5cb0"
              }}></div>
              
              {/* Gold accent */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "15px",
                height: "25px",
                borderRadius: "0 0 0 25px",
                backgroundColor: "#d4af37"
              }}></div>

              {/* Download Button */}
              <button 
                onClick={() => handleDownload(cert._id)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "#1a5cb0",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateDetailsPage;