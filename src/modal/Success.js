import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'

function Success() {
    const navigate = useNavigate();
    return (
        <div className='success-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center">
                <Icon icon="material-symbols:check-circle-outline-rounded" className="icon" />

                <h1>Membership registration successful</h1>
                <p>
                    You will receive a congratulatory email shortly, proceed to dashboard and explore better ways to new opportunities</p>
                <button onClick={() => { navigate("/dashboard"); }} className="btn btn-modal mt-5">Go to dashboard</button>
            </div>
        </div>
    )
}

export default Success