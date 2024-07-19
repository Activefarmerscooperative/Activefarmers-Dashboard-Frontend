
// import "./modal.css"

// function SavingsWithdrawalSummary({ closeModal, withdrawalData }) {
//     if (!withdrawalData) {
//         return null; 
//     }
//     console.log("Withdrawal Data:", withdrawalData);

    
//     const withdrawalDate = new Date(withdrawalData.item.createdAt).toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric'
//     });
//     return (
//         <div className='loan-summary-modal p-4 my-4'>
//             <div className="d-flex flex-column align-items-center loan-summary-div">
//                 <div className="text-center">
//                     <h2>Transaction Details</h2>
//                     <p className="fw-bold fs-5">
//                         Savings Withdrawal
//                     </p>


//                 </div>

//                 <div className="d-flex flex-column align-items-center mb-2">
//                     <ul className="loan-info my-3">
//                         {withdrawalData && (
//                             <><li className='d-flex align-items-center my-4'>
//                                 <p>
//                                     Withdrawal Amount: </p>

//                                 <span>{withdrawalData.amount}</span>

//                             </li>
//                                 <li className='d-flex align-items-center my-4'>
//                                     <p>
//                                         Savings Category: </p>

//                                     <span>{withdrawalData.item.category}</span>
//                                 </li>
//                                 <li className='d-flex align-items-center my-4'>
//                                     <p>
//                                         Withdrawal Date: </p>

//                                     <span>
//                                         {withdrawalDate}
//                                     </span>

//                                 </li>
//                                 <li className='d-flex align-items-center my-4'>
//                                     <p>
//                                         Status: </p>

//                                     <span className="status mx-auto">
//                                         {withdrawalData.item.status}
//                                     </span>

//                                 </li>

//                                 {(withdrawalData.item.status === "Rejected") ? <li className='d-flex align-items-center my-4'>
//                                     <p>
//                                         Reason: </p>

//                                     <span className="">
//                                         {withdrawalData.item.rejectionReason}
//                                     </span> </li> : ""}

//                             </>
//                         )}
//                     </ul>



//                     <div>

//                         <button onClick={closeModal} className="btn btn-modal my-2 mx-3">Return to List</button>
//                     </div>

//                 </div>


//             </div>
//         </div>
//     )
// }

// export default SavingsWithdrawalSummary





import React from "react";
import "./modal.css";

function TransactionSummary({ closeModal, transactionData, type }) {
    if (!transactionData) {
        return null; // Render nothing if transactionData is not available
    }

    console.log("Transaction Data:", transactionData);

    // Extracting the date from the createdAt string and converting it to the desired format
    const transactionDate = new Date(transactionData.item.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className='loan-summary-modal p-4'>
            <div className="d-flex flex-column align-items-center loan-summary-div">
                <div className="text-center">
                    <h2>Transaction Details</h2>
                    <p className="fw-bold fs-5">
                        {type === "withdrawal" ? "Savings Withdrawal" : "Savings Summary"}
                    </p>
                </div>

                <div className="d-flex flex-column align-items-center mb-2">
                    <ul className="loan-info my-3 p-0">
                        {transactionData && (
                            <>
                                <li className='d-flex align-items-center my-4'>
                                    <p>
                                        {type === "withdrawal" ? "Withdrawal Amount" : "Savings Amount"}: </p>

                                    <span>{transactionData.amount}</span>
                                </li>
                                <li className='d-flex align-items-center my-4'>
                                    <p>
                                        {type === "withdrawal" ? "Savings Category" : "Withdrawal Date"}: </p>

                                    <span>{type === "withdrawal" ? transactionData.item.category : transactionDate}</span>
                                </li>
                                <li className='d-flex align-items-center my-4'>
                                    <p>
                                        Status: </p>

                                    <span className="status mx-auto">
                                        {transactionData.item.status}
                                    </span>
                                </li>

                                {type === "withdrawal" && transactionData.item.status === "Rejected" && (
                                    <li className='d-flex align-items-center my-4'>
                                        <p>
                                            Reason: </p>

                                        <span className="">
                                            {transactionData.item.rejectionReason}
                                        </span>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>

                    <div>
                        <button onClick={closeModal} className="btn btn-modal my-2 mx-3">Return to List</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionSummary;
