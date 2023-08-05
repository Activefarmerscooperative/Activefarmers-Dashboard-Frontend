import { Icon } from '@iconify/react';
import '../modal.css';
import React, { useState } from 'react';
import { AddScheduledSavingCard } from '../../utils/api/member';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function SavingsPaymentMethod({ closeModal, data }) {
    const [isLoading, setIsLoading] = useState(false);

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


    return (
        <div className='add-savings-modal p-4 my-4'>
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
                                        <button className='btn change-card btn-modal mx-3'>Change Card</button>

                                        <button onClick={() => submitSavedCard('validate_card', data.data)} className='btn no btn-modal mx-3'>
                                            Yes
                                        </button>
                                    </>
                                }

                            </>
                        ) : (
                            <>
                                <button className='btn change-card btn-modal mx-3'>Cancel</button>
                                <button className='btn no btn-modal mx-3'>Yes</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SavingsPaymentMethod;
