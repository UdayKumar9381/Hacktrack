import { useEffect, useState } from "react";
import "./Certifications.css";

const StudentDashboardCertificate = () => {
    const [certificates, setCertificates] = useState([]);
    const studentId = localStorage.getItem("studentId"); // Get studentId from localStorage

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await fetch(`http://localhost:5002/api/files/${studentId}`);
                const data = await response.json();
                if (response.ok) {
                    setCertificates(data);
                } else {
                    console.error("Error fetching certificates:", data.error);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };
        fetchCertificates();
    }, [studentId]);

    if (certificates.length === 0) {
        return <p>No certificates found.</p>;
    }

    return (
        <div>
            <h2>My Certificates</h2>
            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Certificate Name</th>
                        <th>File Type</th>
                        <th>File Size</th>
                        <th>Upload Date</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.map((certificate, index) => (
                        <tr key={certificate.filename}>
                            <td>{index + 1}</td>
                            <td>{certificate.originalName}</td>
                            <td>{certificate.fileType}</td>
                            <td>{(certificate.fileSize / 1024).toFixed(2)} KB</td>
                            <td>{new Date(certificate.uploadDate).toLocaleDateString()}</td>
                            <td>
                                <a href={`http://localhost:5002/api/download/${certificate.filename}`} download>
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboardCertificate;