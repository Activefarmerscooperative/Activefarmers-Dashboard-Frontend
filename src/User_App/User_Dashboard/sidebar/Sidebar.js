// import React, { Component } from 'react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './sidebar.css'
import profile from '../../../assets/profile.jpg'
import { useNavigate } from "react-router-dom";
import { UpdateProfilePhoto } from "../../../utils/api/member"
import { toast } from 'react-toastify';



function Sidebar({ user, setToken }) {

    const [image, setImage] = useState(user.image || null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState("dashboard");
    const navigate = useNavigate();


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


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleAccordion = (index) => {
        if (index === activeIndex) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };
    const closeDropdown = () => {
        setActiveIndex(null);
    };

    function logOut() {
        localStorage.clear()
        navigate("/", { replace: true })
    }

    //Hamburger Toggling
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    };


    return (
        <div className='sidebar-user'>
            <div className='my-3 d-flex flex-column sidebar-user-content'>
                <div className=' px-4 profile-info mb-3 '>
                    <label htmlFor="image-upload" className="profile-img-container">
                        <img
                            src={image || user.image || profile}
                            alt=""
                            className="profile-img mb-2"

                        />
                        <button className="btn camera" onClick={() => document.getElementById('image-upload').click()}>
                            <Icon icon="heroicons-solid:camera" className='camera-icon' />
                        </button>
                        <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </label>
                    <p>{user?.surname} {user?.firstname}</p>
                    <p>ID: {user.reference}</p>
                </div>

                <ul className="sidebar-user-menu p-0 desktop">
                    <li onClick={() => closeDropdown()}>
                        <NavLink className="link active-link dashboard ps-3" to="/dashboard/home" >
                            <Icon icon="ic:round-space-dashboard" className='sidebar-icon' />
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <div
                            className={`ps-3 dropdown-title  ${activeIndex === 0 ? 'active' : ''}`}
                            onClick={() => toggleAccordion(0)}
                        >
                            <Icon icon="ph:git-pull-request-fill" className='sidebar-icon' />
                            Request Forms
                            <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' />

                        </div>
                        {activeIndex === 0 && (
                            <div>
                                <NavLink className="link ps-4" to="/dashboard/witdrawal">
                                    <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                    Saving Withdrawal
                                </NavLink>
                                <NavLink className="link ps-4" to="/dashboard/loan">
                                    <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                    Loan Request
                                </NavLink>
                            </div>
                        )}
                    </li>

                    <li>
                        <div
                            className={` ps-3 dropdown-title  ${activeIndex === 1 ? 'active' : ''}`}
                            onClick={() => toggleAccordion(1)}
                        >
                            <Icon icon="mdi:user" className='sidebar-icon' />
                            Account Settings
                            <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' />

                        </div>
                        {activeIndex === 1 && (
                            <div className="">
                                <NavLink className="link ps-4" to="/dashboard/profile">
                                    <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                    Profile Update
                                </NavLink>
                                <NavLink className="link ps-4" to="/dashboard/guarantor">
                                    <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                    Account & Guarantor
                                </NavLink>
                                <NavLink className="link ps-4" to="/dashboard/schedule-savings">
                                    <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                    Schedule Savings
                                </NavLink>
                            </div>
                        )}

                    </li>

                    <li onClick={() => closeDropdown()}>
                        <NavLink className="link ps-3" to="/dashboard/support" >
                            <Icon icon="material-symbols:help" className='sidebar-icon' />
                            Help & Support
                        </NavLink>
                    </li>

                    <li onClick={() => closeDropdown()}>
                        <NavLink className="link ps-3 " to="/dashboard/terms">
                            <Icon icon="bi:info-circle" className='sidebar-icon' />
                            Terms & Conditions
                        </NavLink>
                    </li>

                    <li>
                        <div className="logout ps-3" onClick={logOut}>
                            <Icon icon="bx:log-out-circle" className='sidebar-icon' />
                            Log Out
                        </div>
                    </li>
                </ul>

                <div className="admin hamburger-icon" onClick={handleClick}>
                    <Icon
                        icon={clicked ? "jam:close" : "ci:menu-alt-02"}
                        className={clicked ? "close" : "bar"}
                    />
                </div>


                {clicked ? (

                <ul className="sidebar-user-menu p-0 mobile" >
                    <li>
                        <NavLink className="link active-link dashboard " to="/dashboard/home" >
                            
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <div>
                            <NavLink className="link " to="/dashboard/witdrawal">
                                
                                Saving Withdrawal
                            </NavLink>
                            <NavLink className="link " to="/dashboard/loan">
                                
                                Loan Request
                            </NavLink>
                        </div>

                    </li>

                    <li>
                        <div className="">
                            <NavLink className="link " to="/dashboard/profile">
                                
                                Profile Update
                            </NavLink>
                            <NavLink className="link " to="/dashboard/guarantor">
                                
                                Account & Guarantor
                            </NavLink>
                            <NavLink className="link " to="/dashboard/schedule-savings">
                                
                                Schedule Savings
                            </NavLink>
                        </div>


                    </li>

                    <li>
                        <NavLink className="link " to="/dashboard/support" >
                            
                            Help & Support
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="link  " to="/dashboard/terms">
                            
                            Terms & Conditions
                        </NavLink>
                    </li>

                    <li>
                        <div className="logout " onClick={logOut}>
                          
                            Log Out
                        </div>
                    </li>
                </ul>
                ): null}



            </div>
        </div>
    )
}

export default Sidebar;