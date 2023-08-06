
import { Icon } from '@iconify/react';
import "../modal.css";
import React from 'react';

function ScheduleSavingsPlans({closeModal}) {

   

    return (
        <div className='add-savings-modal p-4 my-4' onRequestClose={closeModal}>
            <div className="d-flex flex-column add-savings-div">
                <p onClick={closeModal} className="d-flex align-items-center mx-5" >
                    <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
                    Scheduled Savings
                </p>
                <div className="d-flex flex-column align-items-center mt-4">
                    <p>
                    Schedule monthly savings into your cooperative account
                    </p>
                    <span>You can cancel scheduled savings at anytime</span>
                    <form action="" className="d-flex flex-column align-items-center">
                        <input type="number" name="amount" placeholder="Amount to save" min="0" required />
                        <input type="number" name="savingStartDate" placeholder="Start date" />
                    </form>
                    <button  className="btn btn-modal mt-5">Next</button>


                </div>

            </div>

        </div>
    )
}

export default ScheduleSavingsPlans