import { Icon } from '@iconify/react';
import '../modal.css';
import React, { useState } from 'react';
import { AddScheduledSavingCard, ValidateCardForScheduledSavings } from '../../utils/api/member';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function SavingsPaymentMethod({ closeModal, data }) {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1)

    const submitSavedCard = async (type, id) => {

        setIsLoading(true);
        try {
            const result = await AddScheduledSavingCard(type, id);
            toast.success(result.message)
            closeModal()
            // console.log(data);
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Error using saved card');
        } finally {
            setIsLoading(false);
        }
    };

    function changeCard() {
        setStep(2)
    }

    async function handleValidateCard(type, id) {
        try {
            setIsLoading(true)
            const { data, message } = await AddScheduledSavingCard(type, id)
            toast.success(`${message} Opening payment window, do not close the page.`)
            window.location.replace(data.authorization_url);
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error)
            toast.error(error?.error)
        }
    }

    return (
        <div className='add-savings-modal p-4 my-4'>
            {
                step === 1 &&
                <div className='d-flex flex-column add-savings-div'>
                    <p onClick={closeModal} className='d-flex align-items-center mx-5'>
                        <Icon icon='material-symbols:arrow-back-rounded' className='add-icon' />
                        Savings Payment Method
                    </p>
                    <div className='d-flex flex-column align-items-center mt-4'>
                        <p>{data.status === 'validate_card' ? 'Continue with saved card' : 'Add Card Details'}</p>

                        <form action='' className='d-flex flex-column align-items-center '>
                            {data.message}
                        </form>

                        <div className='d-flex mt-5 continue-saving'>
                            {data.status === 'validate_card' ? (
                                <>
                                    {isLoading && <center className="btn mt-5"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                                    {
                                        !isLoading &&
                                        <>
                                            <button onClick={changeCard} className='btn change-card btn-modal mx-3'>Change Card</button>

                                            <button onClick={() => submitSavedCard('validate_card', data.data)} className='btn no btn-modal mx-3'>
                                                Yes
                                            </button>
                                        </>
                                    }

                                </>
                            ) : (
                                <>
                                    <button className='btn change-card btn-modal mx-3'>Cancel</button>
                                    <button onClick={changeCard} className='btn no btn-modal mx-3'>Yes</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            }
            {
                step === 2 &&
                <div className="d-flex flex-column align-items-center mt-4">
                    {
                        <>
                            <p>
                                Add Card For Scheduled Savings Deduction.
                            </p>
                            <p style={{ fontSize: "13px", width: "400px", fontWeight: "400" }}>
                                To enable scheduled savings, you need to add details of your valid debit card, your card needs to meet this criteria:
                            </p>

                            <ul className='addcard-info'>
                                <li>Ensure your card's expiry date is not within the next 12 months (1year)</li>
                                <li>Ensure you are adding either your salary card or an active card with previous transaction history to qualify for a loan</li>
                                <li>We will deduct 50 naira to confirm your card's validity and credit back to your savings account with us</li>
                            </ul>

                            <div className='d-flex align-items-start justify-content-around'>
                                {isLoading && <center className="btn btn-modal mt-4"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                                {!isLoading && <button className="btn btn-modal mt-4" >Cancel Request</button>}
                                {!isLoading && <button className="btn btn-modal mt-4" onClick={() => handleValidateCard("Add new card", data.data)} >Continue</button>}
                            </div>
                        </>

                    }


                </div>
            }

        </div>
    );
}

export default SavingsPaymentMethod;
