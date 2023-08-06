import React, { useState, useEffect } from "react";

import "./reusable.css";
import { RotatingLines } from "react-loader-spinner";
import { approveWithdrawal, declineWithdrawal } from "../../../utils/api/admin";
import { toast } from "react-toastify";

function WithdrawalDetails({ closeModal, withdrawalData }) {
    const [isLoading, setIsLoading] = useState(false)
    const [rejectionReason, setRejectionReason] = useState(null)
    const [step, setStep] = useState(1)

    async function declineWithdrawalRequest(withdrawalId) {
        setIsLoading(true)
        try {
            const { message } = await declineWithdrawal(withdrawalId, { rejectionReason })
            toast.success(message)
            closeModal()
        } catch (error) {
            console.log(error)
            toast.error(error)
            toast.error(error.error)
        } finally {
            setIsLoading(false)
        }

    }

    async function approveWithdrawalRequest(withdrawalId) {
        if (!window.confirm("Are you sure you want to approve withdrawal request?")) return

        setIsLoading(true)
        try {
            const { message } = await approveWithdrawal(withdrawalId)
            toast.success(message)
            closeModal()
        } catch (error) {
            console.log(error)
            toast.error(error)
            toast.error(error.error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='loan-summary-modal p-4 my-4'>
            {
                step === 1 &&
                <div className="d-flex flex-column align-items-center loan-summary-div">
                    <div className="text-center">
                        <h2 className="mb-0">Savings Withdrawals</h2>

                    </div>

                    <div className="d-flex flex-column align-items-center  mt-3">
                        <ul className="loan-info d-flex flex-column">
                            <>
                                <li className='d-flex align-items-center  my-2'>
                                    <p>
                                        Withdrawal Amount: </p>

                                    <span> {withdrawalData?.amount} NGN</span>

                                </li>

                                <li className='d-flex align-items-center my-2'>
                                    <p>Withdrawal Category: </p>

                                    <span>{withdrawalData?.category}</span>

                                </li>

                                <li className='d-flex align-items-center my-2'>
                                    <p>
                                        Withdrawal Date: </p>

                                    <span>{new Date(withdrawalData?.createdAt).toDateString()}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Status: </p>

                                    <span className="status mx-auto">
                                        {withdrawalData?.status}
                                    </span>

                                </li>
                            </>
                        </ul>

                        <div className="d-flex align-items-center justify-content-even">

                            {
                                withdrawalData.status === "Confirmed" || withdrawalData.status === "Rejected" ?
                                    <>
                                        <button onClick={() => closeModal()} className="btn btn-modal mx-3">Back to List</button>
                                    </> :
                                    <>
                                        {isLoading && <button className='login-btn mt-5'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                                        {!isLoading && <>
                                            <button onClick={() => setStep(2)} className="btn btn-modal mx-3">Decline Withdrawal</button>
                                            <button onClick={() => approveWithdrawalRequest(withdrawalData._id)} className="btn btn-modal mx-3">Approve Withdrawal</button>
                                        </>}</>
                            }


                        </div>

                    </div>
                </div>
            }
            {
                step === 2 &&
                <div className="d-flex flex-column align-items-center loan-summary-div">
                    <div className="text-center">
                        <h2 className="mb-0">Enter Rejection Reason</h2>

                    </div>
                    <textarea id="myTextArea" rows="5" cols="50" onChange={(e) => setRejectionReason(e.target.value)}></textarea>
                    <div className="d-flex align-items-center justify-content-even">
                        {isLoading && <button className='login-btn mt-5'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <>
                            <button onClick={() => setStep(1)} className="btn btn-modal mx-3">Go Back</button>
                            <button onClick={() => declineWithdrawalRequest(withdrawalData._id)} className="btn btn-modal mx-3">Submit</button>
                        </>}

                    </div>
                </div>
            }

        </div>
    )
}

export default WithdrawalDetails