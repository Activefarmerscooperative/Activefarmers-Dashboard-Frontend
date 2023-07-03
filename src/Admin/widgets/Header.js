import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import header from '../assets/logol.png';
import { Icon } from '@iconify/react';


export default function Header() {
    const navigate = useNavigate();
    let location = useLocation();
    const [formMode, setFormMode] = useState("login");

    const handleFormToggle = () => {
        setFormMode(formMode === "login" ? "register" : "login");
    };
    return (
        <div>


            <div className="header-section">
                <div className="d-flex align-items-center justify-content-between header-components">
                    <div className='d-flex align-items-center'>
                        <img src={header} alt="" />
                        <h1>AFC Admin Dashboard</h1>
                    </div>

                    <div>
                        {location.pathname === "/dashboard" ? <div className="d-flex align-items-center justify-content-around header-buttons">
                            <Icon icon="mdi:eye" className='eye-icon' />
                            <Icon icon="mdi:eye-off" className='eye-icon' />
                        </div> :
                            <div className="d-flex align-items-center header-buttons">
                                <p className="mx-2 mb-0">
                                    {formMode === "login"
                                        ? " Don't have an account?"
                                        : "Already have an account? "}
                                </p>


                                <div className="" onClick={handleFormToggle}>
                                    {formMode === "login" ? <button className='btn signup-btn' >Register</button> : <button className='btn signup-btn' >Login</button>}
                                </div>

                            </div>
                        }



                    </div>

                </div>
            </div>














        </div>
    )
}