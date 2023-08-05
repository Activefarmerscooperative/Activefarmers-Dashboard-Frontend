import React, { useState, useEffect } from "react";

import "./reusable.css";
import { RotatingLines } from "react-loader-spinner";
import AutoTransaction from '../data/AutoTransaction';

function AutoTransactionModal({ closeModal, autoTransactionData }) {
    // const [isLoading, setIsLoading] = useState(false)
    // const [rejectionReason, setRejectionReason] = useState(null)
    // const [step, setStep] = useState(1)


    return (
        <div className='loan-summary-modal p-4 my-4'>

            <div className="d-flex flex-column align-items-center loan-summary-div">
                <div className="text-center">

                    <h2 className="mb-0">{autoTransactionData.action}</h2>

                </div>

                <div className="d-flex flex-column align-items-center  mt-3">
                    <ul className="loan-info d-flex flex-column">
                        <>


                            <li className='d-flex align-items-center my-2'>
                                {autoTransactionData.action === "Loan Deduction Transaction" && <p>Loan deduction Amount :</p>}
                                {autoTransactionData.action === "Scheduled Savings Transaction" && <p>Monthly Savings Amount :</p>}


                                <span> {autoTransactionData.amount} NGN</span>

                            </li>

                            <li className='d-flex align-items-center my-2'>
                                <p>
                                    Deduction Date: </p>

                                <span>{new Date(autoTransactionData?.date).toDateString()}</span>

                            </li>
                            {autoTransactionData.action === "Loan Deduction Transaction" && <li className='d-flex align-items-center my-2'>
                                <p>
                                    Withdrawal Date: </p>

                                <span>{new Date(autoTransactionData?.date).toDateString()}</span>

                            </li>}
                            <li className='d-flex align-items-center my-2'>
                                <p>
                                    Status: </p>


                                <div className="d-flex flex-column">
                                    <span className={`status mx-auto ${autoTransactionData.item.status === "Successful"
                                                    ? "success-icon"
                                                    : "failed-icon"
                                            }`}>
                                        {autoTransactionData.item.status}
                                    </span>
                                    {autoTransactionData.item.status === "Failed" && <span>Insufficient funds</span>}

                                </div>

                            </li>
                            <li className="d-flex">
                                {autoTransactionData.user} {autoTransactionData.number}
                            </li>
                        </>
                    </ul>

                    <div className="">


                        <button className="btn btn-modal mx-3">View Profile</button>


                    </div>

                </div>
            </div>



        </div>
    )
}

export default AutoTransactionModal