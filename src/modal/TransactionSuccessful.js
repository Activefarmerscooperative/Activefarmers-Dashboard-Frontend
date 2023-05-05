import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'

function TransactionSuccessful() {
    const navigate = useNavigate();
    return (
        <div className='transaction-success-modal p-4 my-5'>
            <div className="d-flex flex-column align-items-center add-savings-div">
                <Icon icon="ep:success-filled" className="icon" />
                <div className="d-flex flex-column align-items-center mt-4">
                    <p>
                        Transaction Successful!
                    </p>
                    <p style={{ fontSize: "13px" }}>Your added savings will reflect on your dashboard</p>

                    <p><span>NGN 50,000 - Regular Savings</span></p>

                    <a href="/dashboard">
                        <button className="btn btn-modal mt-5">Back to Dashboard</button>
                    </a>

                </div>

            </div>
        </div>
    )
}

export default TransactionSuccessful