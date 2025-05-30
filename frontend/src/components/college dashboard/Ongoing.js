import { useEffect, useState } from "react";
import "./ongoing.css";

const StudentList = () => {
    const [users, setUsers] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});

    useEffect(() => {
        fetch("https://hacktrack-rggs.onrender.com/api/auth/users")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const handleFileChange = (event, userId) => {
        const file = event.target.files[0];
        setSelectedFiles((prevFiles) => ({
            ...prevFiles,
            [userId]: file,
        }));
    };

    const handleUpload = async (userId) => {
        const file = selectedFiles[userId];
        if (!file) {
            alert("Please select a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);

        try {
            const response = await fetch("https://hacktrack-rggs.onrender.com/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert("File uploaded successfully!");
            } else {
                alert("File upload failed: " + result.error);
            }
        } catch (error) {
            alert("Network error occurred while uploading.");
        }
    };

    if (users.length === 0) {
        return <p>Loading user details...</p>;
    }

    return (
        <div>
            <h2>Student Details</h2>
            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>College Name</th>
                        <th>Student ID</th>
                        <th>Branch</th>
                        <th>Upload File</th>
                        <th>Submit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.email}>
                                <td>{index + 1}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.collegeName}</td>
                                <td>{user.studentId}</td>
                                <td>{user.branch}</td>
                                <td>
                                    <input type="file" onChange={(e) => handleFileChange(e, user.studentId)} />
                                </td>
                                <td>
                                    <button onClick={() => handleUpload(user.studentId)}>Submit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No registered students found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
