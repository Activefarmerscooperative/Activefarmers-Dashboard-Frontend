import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'

function CreatePasswordSuccess() {
    const navigate = useNavigate();
    return (
        <div className='password-changed-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center">
                <Icon icon="ep:success-filled" color="#0d9068" className="icon my-5" />

                <h5>Password changed successfully!</h5>
                <p>
                    Proceed to login, remember to use your new password</p>
                <button onClick={() => { navigate("/login"); }} className="btn btn-modal mt-5">Login</button>
            </div>
        </div>
    )
}

export default CreatePasswordSuccess