import React from "react";

import "./modal.css"

function LoanRequestSummary({ closeModal, loanData }) {
    if (!loanData) {
        console.log(loanData);
        return null; // Render nothing if loanData is not available
    }

    const { amount, interestRate, repaymentPeriod, totalAmountPayable, repaymentPerMonth, repaymentDate, payment_method, status } = loanData;

    return (
        <div className='loan-summary-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center loan-summary-div">
                <div className="text-center">
                    <h2 className="mb-0">Transaction Details</h2>
                    Loan Request

                </div>

                <div className="d-flex flex-column align-items-center  mt-3">
                    <ul className="ps-0 loan-info d-flex flex-column">
                        {loanData && (
                        <><li className='d-flex align-items-center  my-2'>
                                <p>
                                    Loan Amount: </p>

                                <span> {loanData.amount} NGN</span>

                            </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Interest Rate: </p>

                                    <span>15%</span>
                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Period: </p>

                                    <span>{loanData.item.repaymentPeriod}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Total Amount Payable: </p>

                                    <span>{totalAmountPayable}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment per month: </p>

                                    <span> {repaymentPerMonth} NGN</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Date: </p>

                                    <span>{repaymentDate}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Method: </p>

                                    <span>{loanData.item.repaymentMethod}</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Status: </p>

                                    <span className="status mx-auto">{loanData.item.status}</span>

                                </li></>

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