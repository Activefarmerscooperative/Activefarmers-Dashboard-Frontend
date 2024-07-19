import { Outlet, useNavigate } from "react-router-dom";
import "./registration.css";
import { Icon } from '@iconify/react';

import React from 'react'

function Registration() {
    const navigate = useNavigate();
    return (
        <div className="registration  px-5">
            <div className="reg-header">
                <div className="d-flex align-items-center justify-content-between reg-header-content">
                    <a href="/" className="d-flex align-items-center " >
                        <Icon icon="material-symbols:arrow-back-rounded" style={{ fontSize: "20px", margin: "0 5px" }} />
                        Back to Homepage
                    </a>

                    <div className='text '>
                        have an account?
                        <button className='mx-1' onClick={() => { navigate("/login"); }}>Login</button>
                    </div>
                </div>
            </div>

            {/* <div > */}
                <Outlet />
            {/* </div> */}
        </div>
    )
}

export default Registration