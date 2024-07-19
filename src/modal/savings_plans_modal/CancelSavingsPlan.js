
import { Icon } from '@iconify/react';
import "../modal.css";
import React from 'react';
import paymentCardImage from '../../assets/creditcard.png'
import { toast } from 'react-toastify';
import { CancelScheduledSavingPlan } from '../../utils/api/member';
import { RotatingLines } from 'react-loader-spinner';
import { useState } from 'react';

function CancelSavingsPlan({ activeSavings, closeModal }) {
    const [isLoading, setIsLoading] = useState(false)

    async function cancelSavingsPlan() {
        if (!window.confirm(`Are you sure you want to cancel ${activeSavings?.category} savings plan?`)) return
        try {
            setIsLoading(true)
            const { message } = await CancelScheduledSavingPlan(activeSavings._id)
            toast.success(message)
            closeModal()
        } catch (error) {
            console.log(error)
            toast.error(error)
            toast.error(error?.error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='add-savings-modal p-4 my-5 savings-plan' >
            <div className="d-flex flex-column add-savings-div">

                <div className="d-flex flex-column align-items-center mt-4">
                    <h4>
                        Cancel {activeSavings?.category} Scheduled Savings
                    </h4>
                    <span>Monthly automatic savings deduction of {activeSavings?.amount} will be stopped once you cancel. Are you sure you want to cancel your scheduled savings?</span>

                    <div className="d-flex mt-5 continue-saving">
                        {isLoading && <center className="btn mx-3"><RotatingLines width="15" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                        {!isLoading && <>
                            <button onClick={closeModal} className="btn change-card btn-modal mx-3">No</button>
                            <button className="btn no btn-modal mx-3" onClick={cancelSavingsPlan}>Yes</button>
                        </>}

                    </div>



                </div>

            </div>

        </div>
    )
}

export default CancelSavingsPlan