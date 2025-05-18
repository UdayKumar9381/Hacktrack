import React, { useState, useEffect } from 'react';
import './host.css';

const OrganisersData = ({ setOrganisersCount }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("All");
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchUserCount();
  }, ); // Ensure the effect runs only once on mount

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/hoster/hoster');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/hoster/hoster/count');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserCount(data.count);
      setOrganisersCount(data.count); // Pass the count to the parent component
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Get unique organizations for the filter dropdown
  const getUniqueOrganizations = () => {
    const organizations = users.map(user => user.college);
    return ["All", ...new Set(organizations)];
  };

  // Handle Organization Filter Change
  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOrganization(selectedValue);

    if (selectedValue === "All") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.college === selectedValue);
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="host-container">
      <h2>Hackathon Organisers</h2>

      {/* Display total registered users */}
      <div className="user-count">
        <strong>Total Registered Members:</strong> {userCount}
      </div>

      {/* Organization Filter Dropdown */}
      <div className="filter-container">
        <label>Filter by Organization:</label>
        <select value={selectedOrganization} onChange={handleFilterChange}>
          {getUniqueOrganizations().map((org, index) => (
            <option key={index} value={org}>{org}</option>
          ))}
        </select>
      </div>

      {/* Table inside a rectangular container */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.college}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganisersData;
