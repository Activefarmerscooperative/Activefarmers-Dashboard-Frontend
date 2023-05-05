// import React, { Component } from 'react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './sidebar.css'
import profile from '../../assets/profile.jpg'


function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    


        return (
            <div className='sidebar'>
                <div className='my-2 d-flex flex-column'>
                    <div className='d-flex flex-column align-items-start px-4 mb-3 profile-info  '>
                        <img src={profile} alt="" className="profile-img mb-2" />
                        <p>Kadwama Lazarus</p>
                        <p>ID: 3290339300</p>
                    </div>

                    <ul className="menu p-0 mt-4">
                        <li>
                            <NavLink className="link active-link px-4" to="/dashboard/home">
                                <Icon icon="ic:round-space-dashboard" className='sidebar-icon' />
                                Dashboard
                            </NavLink>
                        </li>

                        <li>
                            
                            <div className='link-title px-4 mt-2'>
                                <Icon icon="ph:git-pull-request-fill" className='sidebar-icon' />
                                Request Forms
                                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' />
                            </div>

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
                        </li>

                        <li>
                            <div className='link-title px-4 mt-2'>
                                <Icon icon="mdi:user" className='sidebar-icon' />
                                Account Settings
                                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' />
                            </div>

                            <div>
                                <NavLink className="link px-5" to="/dashboard/profile">
                                    <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                    Profile Update
                                </NavLink>
                                <NavLink className="link px-5" to="/dashboard/guarantor">
                                    <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                                    Account & Guarantor
                                </NavLink>
                            </div>

                        </li>
                    </ul>

                    <ul className='p-0 mt-0'>
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
                            <NavLink className="link px-4" to="/">
                                <Icon icon="bx:log-out-circle" className='sidebar-icon' />
                                Log Out
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }

export default Sidebar;