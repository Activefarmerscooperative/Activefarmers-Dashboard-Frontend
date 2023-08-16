import React, { useState } from "react";
import { Icon } from "@iconify/react";
import profileImage from "../../../../assets/team1.png";
// import Snackbar from "./Snackbar";
import "./admin.css";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [address, setAddress] = useState("123 Main St, City");
  const [emailaddress, setEmailAddress] = useState("ladyglow@gmai.com");
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState("Super Admin");
  const [profilePicture, setProfilePicture] = useState(profileImage);
  //   const [showSnackbar, setShowSnackbar] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // setShowSnackbar(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-profile-page mt-5 pt-5">
      <h1>Admin 1 Account</h1>
      Set your account settings below
      <div className="tabs mt-3">
        <div className="tab active">Profile</div>
        <div className="tab">Password</div>
      </div>
      <div className="content mt-3 mx-auto">
        {isEditing ? (
          <form className="edit-profile d-flex flex-column align-items-center">
            <div className="profile-picture">
              <label htmlFor="profile-picture-upload">
                <img src={profilePicture} alt="Profile" className="image-preview" />
                <div className="camera-icon">
                  <Icon icon="ant-design:camera-filled" />
                </div>
              </label>
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <div className="input-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="input-field">
                <label htmlFor="emailaddress">Email Address</label>
                <input
                  type="email"
                  id="emailaddress"
                  value={emailaddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
              </div>
              <div className="input-field">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div className="input-field">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            </div>

            <button type="button" className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          </form>
        ) : (
          <div className="d-flex flex-column profile-info  ">
            {/* <div className="profile-picture d-flex flex-column align-items-end "> */}
              <div className="edit-icon ms-auto" onClick={handleEdit}>
                <Icon icon="ant-design:edit-filled" />
              </div>
              <div className="mt-3">
                <img src={profilePicture} alt="Profile" className="image-preview" />
              </div>


            {/* </div> */}
            <div className="admin-profile-data">
              <div className="d-flex info">
                <div className="field">
                  <span className="label">Full Name</span> {name}
                </div>
                <div className="field">
                  <span className="label">Phone Number</span> {phoneNumber}
                </div>
                <div className="field">
                  <span className="label">Email Address</span> {emailaddress}
                </div>

              </div>
              <div className="d-flex info">
                <div className="field">
                  <span className="label">Gender</span> {gender}
                </div>
                <div className="field">
                  <span className="label">Role</span> {role}
                </div>
                <div className="field">
                  <span className="label">Home Address</span> {address}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
      {/* {showSnackbar && (
        <Snackbar
          message="Changes saved successfully"
          onClose={() => setShowSnackbar(false)}
        />
      )} */}
    </div>
  );
}
