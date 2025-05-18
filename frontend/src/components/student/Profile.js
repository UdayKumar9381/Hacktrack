import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
        collegeName: "",
        studentId: "",
        branch: "",
        dob: "",
        linkedin: "",
        profilePicture: "", // Added profile picture field
    });

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!userEmail) {
            navigate("/studentlogin");
            return;
        }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`http://localhost:5002/api/auth/user/${userEmail}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const userProfile = await response.json();
            
            if (userProfile) {
                setProfile({
                    fullName: userProfile.fullName || "",
                    email: userProfile.email || "",
                    phone: userProfile.phone || "",
                    collegeName: userProfile.collegeName || "",
                    studentId: userProfile.studentId || "",
                    branch: userProfile.branch || "",
                    dob: userProfile.dob ? userProfile.dob.split('T')[0] : "",
                    linkedin: userProfile.linkedin || "",
                    profilePicture: userProfile.profilePicture || "", 
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            alert("Error loading profile. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.size > 5 * 1024 * 1024) { // 2MB limit
            alert("File size must be under 2MB.");
            return;
        }
    
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            alert("Only JPG, PNG, and GIF formats are allowed.");
            return;
        }
    
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile({ ...profile, profilePicture: reader.result });
        };
        reader.readAsDataURL(file);
    };
    

    const handleUpdate = async () => {
        try {
            let profilePictureUrl = profile.profilePicture;
    
            if (imageFile) {
                const formData = new FormData();
                formData.append("profilePicture", imageFile);
    
                console.log("Uploading image...");
    
                const uploadResponse = await fetch("http://localhost:5002/api/auth/upload-profile-picture", {
                    method: "POST",
                    body: formData,
                });
    
                console.log("Upload response:", uploadResponse);
    
                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error("Upload error response:", errorText);
                    throw new Error(`Failed to upload image: ${errorText}`);
                }
    
                const uploadData = await uploadResponse.json();
                profilePictureUrl = uploadData.profilePictureUrl;
                console.log("Uploaded image URL:", profilePictureUrl);
            }
    
            console.log("Updating profile...");
            const response = await fetch(`http://localhost:5002/api/auth/update-profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...profile,
                    profilePicture: profilePictureUrl,
                    email: userEmail,
                }),
            });
    
            console.log("Profile update response:", response);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }
    
            setEditing(false);
            alert("Profile updated successfully!");
            fetchProfile();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile: " + error.message);
        }
    };
    

    if (loading) return <div className="profile-container">Loading profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-content">
                <h2>My Profile</h2>

                {/* Profile Picture */}
                <div className="profile-picture-container">
                <img 
    src={profile.profilePicture || "https://via.placeholder.com/150"} 
    alt="Profile" 
    className="profile-picture" 
    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
/>
                </div>

                {editing && (
                    <div className="form-group">
                        <label>Upload Profile Picture:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                )}

                <div className="profile-info">
                    {editing ? (
                        <>
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>College Name:</label>
                                <input type="text" name="collegeName" value={profile.collegeName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Student ID:</label>
                                <input type="text" name="studentId" value={profile.studentId} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Branch:</label>
                                <input type="text" name="branch" value={profile.branch} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn:</label>
                                <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} />
                            </div>
                            <div className="button-group">
                                <button onClick={handleUpdate}>Save Changes</button>
                                <button onClick={() => setEditing(false)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p><strong>Full Name:</strong> {profile.fullName}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Phone:</strong> {profile.phone}</p>
                            <p><strong>College Name:</strong> {profile.collegeName}</p>
                            <p><strong>Student ID:</strong> {profile.studentId}</p>
                            <p><strong>Branch:</strong> {profile.branch}</p>
                            <p><strong>Date of Birth:</strong> {profile.dob}</p>
                            <p><strong>LinkedIn:</strong> <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin}</a></p>
                            <div className="button-group">
                                <button onClick={() => setEditing(true)}>Edit Profile</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
