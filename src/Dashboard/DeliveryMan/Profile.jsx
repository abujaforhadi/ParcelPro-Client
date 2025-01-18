import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";

const Profile = () => {
  const { userDB } = useContext(AuthContext); 
  console.log(userDB);
  const [formData, setFormData] = useState({
    displayName: userDB?.displayName || "",
    email: userDB?.email || "",
    photoURL: userDB?.photoURL || "",
    role: userDB?.role || "",
    contact: userDB?.contact || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/userupdate/${userDB._id}`, 
        formData // Data to update
      );
      alert("Profile updated successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
