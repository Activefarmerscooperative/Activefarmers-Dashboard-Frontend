import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './login.css';
import { Icon } from '@iconify/react';
// import { LoginMember } from "../../utils/api/member"
// import { toast } from "react-toastify";


export default function LoginForm() {
    const navigate = useNavigate();

    return (
        <div className="login-form-page px-5">
            <div className='reg-header'> 
                <div className="d-flex align-items-center justify-content-between reg-header-content ">
                    <a href="/" className="d-flex align-items-center" >
                        <Icon icon="material-symbols:arrow-back-rounded" style={{ fontSize: "20px", margin: "0 5px" }} />
                        Back to Homepage
                    </a>

                    <div className='text '>
                        Don't have an account yet?
                        <button className='btn register-link-btn mx-1' onClick={() => { navigate("/register"); }}>Register</button>
                    </div>
                </div>

              
            </div>  
            <Outlet />
        </div>
    )
}