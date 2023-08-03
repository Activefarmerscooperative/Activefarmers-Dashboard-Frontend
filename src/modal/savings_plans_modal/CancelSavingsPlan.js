
import { Icon } from '@iconify/react';
import "../modal.css";
import React from 'react';
import paymentCardImage from '../../assets/creditcard.png'

function CancelSavingsPlan({ closeModal }) {



    return (
        <div className='add-savings-modal p-4 my-5 savings-plan' >
            <div className="d-flex flex-column add-savings-div">

                <div className="d-flex flex-column align-items-center mt-4">
                    <h4>
                        Cancel Scheduled Savings
                    </h4>
                    <span>Monthly automatic savings deduction of 50,000 will be stopped once you cancel. Are you sure you want to cancel your scheduled savings?</span>

                    <div className="d-flex mt-5 continue-saving">
                        <button onClick={closeModal} className="btn change-card btn-modal mx-3">No</button>
                        <button className="btn no btn-modal mx-3">Yes</button>         </div>



                </div>

            </div>

        </div>
    )
}

export default CancelSavingsPlan