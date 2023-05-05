import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'

function Verify() {
    const navigate = useNavigate();
    return (
        <div className='success-modal p-4 my-5'>
            <div className="d-flex flex-column align-items-center">
                <Icon icon="material-symbols:check-circle-outline-rounded" className="icon" />

                <h1>OTP Verification Successful</h1>
                <p>
                Please proceed to complete membership registration  form and get started on our cooperative
                </p>
                <button onClick={() => { navigate("/register/farm"); }} className="btn btn-modal mt-5">Complete Registration</button>
            </div>
        </div>
    )
}

export default Verify