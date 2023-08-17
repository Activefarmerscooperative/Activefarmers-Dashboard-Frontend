import React, { useState } from "react";
import { Icon } from "@iconify/react";
import profileImage from "../../../../assets/team1.png";
import { UpdateAdminProfilePhoto, UpdateAdminInfo } from '../../../../../utils/api/admin';
// import Snackbar from "./Snackbar";
import "./admin.css";

export default function ProfilePage({setToken}) {
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

  const handleSave = async () => {
    setIsEditing(false);
    // setShowSnackbar(true);

    // Prepare the updated user information object
    const updatedAdminInfo = {
      name,
      phoneNumber,
      emailaddress,
      gender,
      role,
      address,
    };

    try {
      // Call the API function to update the user's information
      // Replace 'UpdateUserInfo' with the actual API function that updates user information
      await UpdateAdminInfo(updatedAdminInfo);

      // Update the local state with the new information
      setName(updatedAdminInfo.name);
      setPhoneNumber(updatedAdminInfo.phoneNumber);
      setEmailAddress(updatedAdminInfo.emailaddress);
      setGender(updatedAdminInfo.gender);
      setRole(updatedAdminInfo.role);
      setAddress(updatedAdminInfo.address);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setProfilePicture(e.target.result);
  //   };
  //   reader.readAsDataURL(file);
  // };
  const [image, setImage] = useState(profileImage || null);

// const handleImageUpload = async (event) => {
//   console.log("Image upload function called");
//   const selectedImage = event.target.files[0];
  
//   if (selectedImage) {
//     const imageData = new FormData();
//     imageData.append("profilePicture", selectedImage);

//     try {
//       await UpdateAdminProfilePhoto(imageData); // Call the API function to update the profile picture on the server
//       const imageUrl = URL.createObjectURL(selectedImage);
//       setImage(imageUrl); // Update the image state to show the new image
//       // You might need to handle the token update logic as needed here
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

  const handleImageUpload = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
        const imageUrl = URL.createObjectURL(selectedImage);
        setImage(imageUrl);
        const data = new FormData();
        data.append("uploaded_file", selectedImage);
        try {
            const result = await UpdateAdminProfilePhoto(data)
            localStorage.setItem("AFCS-token", result.token)
            setToken(result.token)
        } catch (error) {
            console.log(error)
        }
    }
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
                <img src={image || profilePicture} alt="Profile" className="image-preview" />
                <div className="camera-icon" onClick={() => document.getElementById('profile-picture-upload').click()}>
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
              <img src={image} alt="Profile" className="image-preview" />
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
