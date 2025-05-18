import React, { useState, useEffect } from "react";
import axios from "axios";
import "./view-submissions.css";

const ViewSubmissions = ({ setSubmissionsCount }) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [filters, setFilters] = useState({
    email: "",
    organizationName: "",
  });
  const [error, setError] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/hackathon/submissions");
        setSubmissions(response.data.data);
        setFilteredSubmissions(response.data.data);
        setSubmissionCount(response.data.data.length);
        setSubmissionsCount(response.data.data.length); // Pass the count to the parent
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setError("Failed to fetch submissions. Please try again later.");
      }
    };

    fetchSubmissions();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters
  useEffect(() => {
    const filtered = submissions.filter((submission) => {
      const matchesEmail = submission.email
        ?.toLowerCase()
        .includes(filters.email.toLowerCase());
      const matchesOrganization = submission.organizationName
        ?.toLowerCase()
        .includes(filters.organizationName.toLowerCase());
      return matchesEmail && matchesOrganization;
    });
    setFilteredSubmissions(filtered);
    setSubmissionCount(filtered.length); // Update the count based on filtered results
  }, [filters, submissions]);

  return (
    <div className="view-submissions">
      <h2>Hackathon Submissions</h2>

      {/* Display error message if API call fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Display the count of submissions */}
      <div className="submission-count">
        <strong>Total Submissions:</strong> {submissionCount}
      </div>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="organizationName"
          placeholder="Filter by Organization"
          value={filters.organizationName}
          onChange={handleFilterChange}
        />
      </div>

      {/* Table to display submissions */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Hackathon Name</th>
            <th>Project Title</th>
            <th>Description</th>
            <th>GitHub Link</th>
            <th>Documentation</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.length > 0 ? (
            filteredSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.Name}</td> {/* ✅ Fixed casing */}
                <td>{submission.email}</td>
                <td>{submission.organizationName}</td>
                <td>{submission.hackathonName}</td>
                <td>{submission.projectTitle}</td>
                <td>{submission.description}</td>
                <td>
                  <a href={submission.githubLink} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </td>
                <td>
                  {submission.document ? (
                    <>
                      <a
                        href={`http://localhost:5002/uploads/${submission.document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </a>
                      <br />
                      <a
                        href={`http://localhost:5002/uploads/${submission.document}`}
                        download={submission.document} // Ensures correct download behavior
                      >
                        Download Document
                      </a>
                    </>
                  ) : (
                    "No document uploaded"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No submissions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSubmissions;