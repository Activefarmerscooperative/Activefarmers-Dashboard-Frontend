import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './login.css';
import { Icon } from '@iconify/react';
// import { LoginMember } from "../../utils/api/member"
// import { toast } from "react-toastify";


export default function LoginForm() {
    const navigate = useNavigate();

    return (
        <div className="login-form-page pt-3 px-5">
            <div className=''>
                <div className="d-flex align-items-center justify-content-between">
                    <a href="/" className="d-flex align-items-center mx-5" >
                        <Icon icon="material-symbols:arrow-back-rounded" style={{ fontSize: "20px", margin: "0 5px" }} />
                        Back to Homepage
                    </a>

                    <div className='text '>
                        Don't have an account yet?
                        <button className='btn register-link-btn mx-3' onClick={() => { navigate("/register"); }}>Register</button>
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    )
}