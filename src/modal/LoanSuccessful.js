
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'

function LoanSuccessful() {
  
    return (
        <div className='loan-success-modal p-4 my-5'>
            <div className="d-flex flex-column align-items-center add-savings-div">
                <Icon icon="ep:success-filled" className="icon" />
                <div className="d-flex flex-column align-items-center mt-4">
                    <p>
                    Loan request successfully submitted!
                    </p>
                    <p style={{ fontSize: "13px", width: "400px", fontWeight: "400" }}>
                    Your loan request has been received and is being processed,
you'll receive a confirmation email/text from us soon and approved loan will reflect on your dashboard
                    </p>


                    <a href="/dashboard">
                        <button className="btn btn-modal mt-5">Back to Dashboard</button>
                    </a>

                </div>

            </div>
        </div>
    )
}

export default LoanSuccessful