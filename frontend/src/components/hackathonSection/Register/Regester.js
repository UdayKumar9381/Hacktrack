// import React, { useState } from 'react';
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Regester.css';

// function Regester() {
//   const [formData, setFormData] = useState({
//     name: '',
//     rollno: '',
//     yearOfStudy: '',
//     branch: '',
//     email: '',
//     hackathonName: '' // Added hackathonName field
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const navigate = useNavigate();

//   const handleApplyClick = () => {
//     navigate('/register-list');
//   };

//   const handleSubmit = () => {
//     if (!formData.hackathonName) {
//       alert('Please enter a Hackathon Name');
//       return;
//     }

//     Axios.post('http://localhost:5002/api/registration/register', formData)
//       .then((response) => {
//         alert('Registration successful');
//         console.log(response);
//         setFormData({ name: '', rollno: '', yearOfStudy: '', branch: '', email: '', hackathonName: '' });
//       })
//       .catch((error) => {
//         console.error('Registration error:', error);
//         if (error.response) {
//           alert(`Registration failed: ${error.response.data.message || 'Unknown error'}`);
//         } else if (error.request) {
//           alert('No response from server. Check your network or server status.');
//         } else {
//           alert(`Request error: ${error.message}`);
//         }
//       });
//   };
  
//   return (
//     <div className="containerr">
//       <h1>REGISTRATION</h1>
//       <label htmlFor="name">Name: </label>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />
//       <br /><br />

//       <label htmlFor="rollno">Roll Number: </label>
//       <input
//         type="text"
//         name="rollno"
//         value={formData.rollno}
//         onChange={handleChange}
//         required
//       />
//       <br /><br />

//       <label htmlFor="yearOfStudy">Year of Study: </label>
//       <select
//         name="yearOfStudy"
//         value={formData.yearOfStudy}
//         onChange={handleChange}
//         required
//       >
//         <option value="">Select Year</option>
//         <option value="Btech 1st year">Btech 1st year</option>
//         <option value="Btech 2nd year">Btech 2nd year</option>
//         <option value="Btech 3rd year">Btech 3rd year</option>
//         <option value="Btech 4th year">Btech 4th year</option>
//       </select>
//       <br /><br />

//       <label htmlFor="branch">Branch: </label>
//       <input
//         type="text"
//         name="branch"
//         value={formData.branch}
//         onChange={handleChange}
//         required
//       />
//       <br /><br />

//       <label htmlFor="email">Email: </label>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <br /><br />

//       <label htmlFor="hackathonName">Hackathon Name: </label>
//       <input
//         type="text"
//         name="hackathonName"
//         value={formData.hackathonName}
//         onChange={handleChange}
//         required
//       />
//       <br /><br />
//     </div>
//   );
// }

// export default Regester;
