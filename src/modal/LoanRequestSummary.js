import React from "react";

import "./modal.css"

function LoanRequestSummary({ closeModal, loanData }) {
    if (!loanData) {
        return null; // Render nothing if loanData is not available
    }
    console.log("Loan Data:", loanData);

    const amount = loanData.amount
    const interestRate = "15%";
    const repaymentPeriod = loanData.item.repaymentPeriod

    const interestAmount = (amount * (parseFloat(interestRate.replace("%", "")))) / 100;
    const totalAmountPayable = amount + interestAmount;
    const repaymentPerMonth = totalAmountPayable / repaymentPeriod;



    return (
        <div className='loan-summary-modal p-4'>
            <div className="d-flex flex-column align-items-center loan-summary-div">
                <div className="text-center">
                    <h2 className="mb-0">Transaction Details</h2>
                    <p className="fw-bold fs-5">
                        Loan Request
                    </p>
                </div>

                <div className="d-flex flex-column align-items-center  mt-3">
                    <ul className="loan-info d-flex flex-column p-0">
                        {loanData && (
                            <>
                                <li className='d-flex align-items-center  my-2'>
                                    <p> Loan Amount: </p>
                                    <span> {amount} NGN</span>
                                </li>
                                <li className='d-flex align-items-center my-2'>
                                    <p> Interest Rate: </p>
                                    <span>15%</span>
                                </li>
                                <li className='d-flex align-items-center my-2'>
                                    <p> Repayment Period: </p>
                                    <span>{repaymentPeriod} Month(s)</span>
                                </li>
                                <li className='d-flex align-items-center my-2'>
                                    <p> Total Amount Payable: </p>
                                    <span>{totalAmountPayable} NGN</span>
                                </li>
                                <li className='d-flex align-items-center my-2'>
                                    <p> Repayment per month: </p>
                                    <span> {Math.round(repaymentPerMonth)}  NGN</span>
                                </li>
                                <li className='d-flex align-items-center my-2'>
                                    <p> Repayment Date: </p>
                                    <span></span>
                                </li>
                                <li className='d-flex align-items-center my-2'>
                                    <p> Repayment Method: </p>
                                    <span>{loanData.item.repaymentMethod}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p> Status: </p>
                                    <span className="status mx-auto">{loanData.item.paymentStatus}</span>
                                </li>
                            </>
                        )}
                    </ul>


                    <div>
                        <button onClick={closeModal} className="btn btn-modal mx-3">Return to List</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoanRequestSummary