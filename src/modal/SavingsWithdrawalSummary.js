
import "./modal.css"

function SavingsWithdrawalSummary({ closeModal, withdrawalData }) {
    if (!withdrawalData) {
        return null; // Render nothing if loanData is not available
    }

    return (
        <div className='loan-summary-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center loan-summary-div">
                <div className="text-center">
                    <h2>Transaction Details</h2>
                  Savings Withdrawal
                        
                </div>

                <div className="d-flex flex-column align-items-center mb-2">
                    <ul className="loan-info my-3">
                    {withdrawalData && (
                        <><li className='d-flex align-items-center my-4'>
                            <p>
                                Withdrawal Amount: </p>

                            <span>{withdrawalData.amount}</span>

                        </li>
                        <li className='d-flex align-items-center my-4'>
                            <p>
                                Savings Category: </p>

                            <span>{withdrawalData.item.category}</span>
                        </li>
                        <li className='d-flex align-items-center my-4'>
                            <p>
                                Withdrawal Date: </p>

                            <span>
                                
                            </span>

                        </li>
                        <li className='d-flex align-items-center my-4'>
                            <p>
                                Status: </p>

                            <span className="status mx-auto">
                           {withdrawalData.item.status}
                            </span>

                        </li>
                        </>
                    )}
                    </ul>



                    <div>

                        <button onClick={closeModal} className="btn btn-modal my-2 mx-3">Return to List</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default SavingsWithdrawalSummary