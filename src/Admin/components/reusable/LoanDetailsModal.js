import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import "./reusable.css";
import { approveLoan, declineLoan } from "../../../utils/api/admin";
import { toast } from "react-toastify";

function LoanDetails({ closeModal, loanData }) {
    const [isLoading, setIsLoading] = useState(false)
    const [rejectionReason, setRejectionReason] = useState(null)
    const [step, setStep] = useState(1)

    const amountPayable = parseFloat(((loanData?.amount || 0) * 1.15).toFixed(2))
    const monthlyPayment = parseFloat((amountPayable / (loanData?.repaymentPeriod || 1)).toFixed(2))


    async function declineLoanRequest(loanId) {
        setIsLoading(true)
        try {
            const { message } = await declineLoan(loanId, { rejectionReason })
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

    async function approveLoanRequest(loanId) {
        if (!window.confirm("Are you sure you want to approve loan request?")) return

        setIsLoading(true)
        try {
            const { message } = await approveLoan(loanId)
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
                        <h2 className="mb-0">Loan Details</h2>

                    </div>

                    <div className="d-flex flex-column align-items-center  mt-3">
                        <ul className="loan-info d-flex flex-column">

                            <><li className='d-flex align-items-center  my-2'>
                                <p>
                                    Loan Amount: </p>

                                <span> {loanData?.amount} NGN</span>

                            </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Interest Rate: </p>

                                    <span>15%</span>
                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Period: </p>

                                    <span>{loanData?.repaymentPeriod}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Total Amount Payable: </p>

                                    <span>{amountPayable}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment per month: </p>

                                    <span> {monthlyPayment} NGN</span>

                                </li>
                                {/* <li className='d-flex align-items-center my-2'>
                                <p>
                                    Repayment Date: </p>

                                <span>ddd</span>

                            </li> */}
                                <li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Method: </p>

                                    <span>{loanData?.repaymentMethod}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Status: </p>

                                    <span className="status mx-auto">
                                        {(loanData?.status === "Confirmed" && loanData?.repaymentStatus === "Completed") ? "Paid" :
                                            loanData?.status === "Confirmed" ? "Active" :
                                                loanData?.status === "Rejected" ? "Declined" : "Pending"}
                                    </span>

                                </li></>



                        </ul>



                        <div className="d-flex align-items-center justify-content-even">

                            {
                                loanData.status === "Confirmed" || loanData.status === "Rejected" ?
                                    <>
                                        <button onClick={() => closeModal()} className="btn btn-modal mx-3">Back to List</button>
                                    </> :
                                    <>
                                        {isLoading && <button className='btn btn-modal mx-3'><RotatingLines width="15" strokeColor="#FFF" strokeWidth="3" /></button>}
                                        {!isLoading && <>
                                            <button onClick={() => setStep(2)} className="btn btn-modal edit mx-3">Decline Loan</button>
                                            <button onClick={() => approveLoanRequest(loanData._id)} className="btn btn-modal mx-3">Approve Loan</button>
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
                        {isLoading && <button className='btn btn-modal mx-3'><RotatingLines width="15" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <>
                            <button onClick={() => setStep(1)} className="btn btn-modal mx-3">Go Back</button>
                            <button onClick={() => declineLoanRequest(loanData._id)} className="btn btn-modal mx-3">Submit</button>
                        </>}

                    </div>
                </div>
            }
        </div>
    )
}

export default LoanDetails