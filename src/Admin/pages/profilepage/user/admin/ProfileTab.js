import React, { useState } from "react";
import { Icon } from "@iconify/react";
import './admin.css'
import defaultImage from "../../../../assets/team1.png"; // Replace this with your default profile image

export default function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(defaultImage); // Replace this with the default image URL or Blob
  const [formData, setFormData] = useState({
    name: "John Doe",
    phoneNumber: "1234567890",
    emailaddress: "ladyglow@gmai.com",
    gender: "Male",
    role: "User", address: "123 Main St",
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSaveChanges = () => {
    // Here you can save the form data and show the success snackbar.
    setEditing(false);
  };

  return (
    <div className="profile-tab">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={image}
            alt="Profile"
            className={`profile-image ${editing ? "editable" : ""}`}
          />
          {editing && (
            <label htmlFor="image-upload" className="edit-image-icon">
              <Icon icon="ant-design:camera-filled" />
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
        {editing ? (
          <h2>Edit Profile</h2>
        ) : (
          <div className="profile-info">
            <h2>{formData.name}</h2>
            <p>{formData.phoneNumber}</p>
            <p>{formData.emailaddress}</p>
            <p>{formData.gender}</p>
            <p>{formData.role}</p>
            <p>{formData.address}</p>
          </div>
        )}
      </div>
      {editing ? (
        <div className="form-container">
          {/* Add your form input fields here */}
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      ) : (
        <div className="edit-icon-container" onClick={handleEditClick}>
          <Icon icon="clarity:edit-solid" className="edit-icon" />
        </div>
      )}
    </div>
  );
}
