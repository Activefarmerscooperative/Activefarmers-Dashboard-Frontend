// import React, { Component } from 'react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './sidebar.css'
import profile from '../../assets/profile.jpg'
import { useNavigate } from "react-router-dom";
import { UpdateProfilePhoto } from "../../utils/api/member"
import { toast } from 'react-toastify';
function Sidebar({ user, setToken }) {

    const [image, setImage] = useState(user.image || null);

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setImage(imageUrl);
            const data = new FormData();
            data.append("uploaded_file", selectedImage);
            try {
                const result = await UpdateProfilePhoto(data)
                localStorage.setItem("AFCS-token", result.token)
                setToken(result.token)
                toast.success(result?.message)
            } catch (error) {
                console.log(error)
                toast.error(error)
            }


        }
    };

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (index === activeIndex) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    function logOut() {
        localStorage.clear()
        navigate("/", { replace: true })
    }


    return (
        <div className='sidebar'>
            <div className='my-3 d-flex flex-column'>
                <div className='d-flex flex-column align-items-start px-4 mt-4 profile-info  '>
                    <label htmlFor="image-upload" className="profile-img-container">
                        <img
                            src={image || user.image || profile}
                            alt=""
                            className="profile-img mb-2"

                        />
                        <button className="btn camera" onClick={() => document.getElementById('image-upload').click()}>
                            <Icon icon="heroicons-solid:camera" className='camera-icon' />
                        </button>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                    {/* <img src={user.image || profile} alt="" className="profile-img mb-2" /> */}
                    <p>{user?.surname} {user?.firstname}</p>
                    <p>ID: {user.reference}</p>
                </div>

                <div>
                    <ul className="menu p-0 mt-4">
                        <li>
                            <NavLink className="link active-link px-4" to="/dashboard/home">
                                <Icon icon="ic:round-space-dashboard" className='sidebar-icon' />
                                Dashboard
                            </NavLink>
                        </li>

                        <li>
                            <div
                                className={`px-4 dropdown-title  ${activeIndex === 0 ? 'active' : ''}`}
                                onClick={() => toggleAccordion(0)}
                            >
                                <Icon icon="ph:git-pull-request-fill" className='sidebar-icon' />
                                Request Forms
                                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' />

                            </div>
                            {activeIndex === 0 && (
                                <div>
                                    <NavLink className="link px-5" to="/dashboard/witdrawal">
                                        <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                        Saving Withdrawal
                                    </NavLink>
                                    <NavLink className="link px-5" to="/dashboard/loan">
                                        <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                        Loan Request
                                    </NavLink>
                                </div>
                            )}
                        </li>

                        <li>
                            <div
                                className={` px-4 dropdown-title  ${activeIndex === 1 ? 'active' : ''}`}
                                onClick={() => toggleAccordion(1)}
                            >
                                <Icon icon="mdi:user" className='sidebar-icon' />
                                Account Settings
                                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' />

                            </div>
                            {activeIndex === 1 && (
                                <div className="">
                                    <NavLink className="link px-5" to="/dashboard/profile">
                                        <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                        Profile Update
                                    </NavLink>
                                    <NavLink className="link px-5" to="/dashboard/guarantor">
                                        <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                        Account & Guarantor
                                    </NavLink>
                                </div>
                            )}

                        </li>
                        <li>
                            <NavLink className="link px-4" to="/dashboard/support">
                                <Icon icon="material-symbols:help" className='sidebar-icon' />
                                Help & Support
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="link px-4 " to="/dashboard/terms">
                                <Icon icon="bi:info-circle" className='sidebar-icon' />
                                Terms & Conditions
                            </NavLink>
                        </li>
                        <li>
                            <div className="logout px-4" onClick={logOut}>
                                <Icon icon="bx:log-out-circle" className='sidebar-icon' />
                                Log Out
                            </div>
                        </li>
                    </ul>

                </div>


            </div>
        </div>
    )
}

export default Sidebar;