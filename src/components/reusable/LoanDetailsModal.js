import React, { useState, useEffect } from "react";

import "./reusable.css";


function LoanDetails({ closeModal, loanData }) {
    
    

    return (
        <div className='loan-summary-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center loan-summary-div">
                <div className="text-center">
                    <h2 className="mb-0">Loan Details</h2>

                </div>

                <div className="d-flex flex-column align-items-center  mt-3">
                    <ul className="loan-info d-flex flex-column">
               
                        <><li className='d-flex align-items-center  my-2'>
                                <p>
                                    Loan Amount: </p>

                                <span> 111 NGN</span>

                            </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Interest Rate: </p>

                                    <span>15%</span>
                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Period: </p>

                                    <span>2</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Total Amount Payable: </p>

                                    <span>e</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment per month: </p>

                                    <span> eee NGN</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Date: </p>

                                    <span>ddd</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Repayment Method: </p>

                                    <span>fff</span>

                                </li><li className='d-flex align-items-center my-2'>
                                    <p>
                                        Status: </p>

                                    <span className="status mx-auto">d</span>

                                </li></>



                    </ul>



                    <div>

                        <button onClick={closeModal} className="btn btn-modal mx-3">Return to List</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default LoanDetails