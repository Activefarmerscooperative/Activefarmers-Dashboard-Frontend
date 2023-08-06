import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import profileImage from "../../../../assets/team1.png";
// import Snackbar from "./Snackbar";
import { GetUserDetails, UpdateUserDetails, UpdateProfilePicture } from "../../../../../utils/api/admin.js"
import { useQuery } from 'react-query'
import { toast } from "react-toastify";
import "./admin.css";

const getUserDetails = async (key, tab) => {
    try {
        let userDetails = await GetUserDetails()       
        return userDetails
        console.log(userDetails)

    } catch (error) {
        console.log("not working")
        const errorr = "not working"
        toast.error(error.error);
    }
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("012345678900");
  const [address, setAddress] = useState("123 Main St, City");
  const [emailaddress, setEmailAddress] = useState("ladyglow@gmai.com");
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState("Super Admin");
  const [profilePicture, setProfilePicture] = useState(profileImage);
  //   const [showSnackbar, setShowSnackbar] = useState(false);
  const { data, status } = useQuery("userDetails", getUserDetails);
  useEffect(() =>{
    if (data) {
      const fullName = data.firstname + " " + data.surname;
      setName(fullName);
      setPhoneNumber(data.phone)
      setAddress(data.address)
      setEmailAddress(data.email)
      setGender(data.gender)
      setRole(data.adminType)
    }
  },[data]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Display an error message to the user for invalid file type
      toast.error("Invalid file type. Please select a valid image (JPEG, PNG, or GIF).");
    }

      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsEditing(false);
    const userDetails = {
      surname: name.split(" ")[1],
      firstname: name.split(" ")[0],
      phone: phoneNumber,
      address: address,
      gender: gender,
    };
    const data = new FormData();
    data.append(`profilePicture`, profilePicture);

    try {
      const data = await UpdateUserDetails(userDetails);
      const profilePicRes = await UpdateProfilePicture(profilePicture);
      toast.success("Admin Profile Updated");

    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="admin-profile-page my-5 py-5">
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
                  onChange={(e) => setEmailAddress(e.target.value)} disabled
                />
              </div>
              <div className="input-field">
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
              </div>
              <div className="input-field">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} disabled/>
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
          <div className="d-flex flex-column profile-info ">
            {/* <div className="profile-picture d-flex flex-column align-items-end "> */}
              <div className="edit-icon ms-auto" onClick={handleEdit}>
                <Icon icon="ant-design:edit-filled" />
              </div>
              <div className="mt-3">
                <img src={profilePicture} alt="Profile" className="image-preview" />
              </div>


            {/* </div> */}
            <div>
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
