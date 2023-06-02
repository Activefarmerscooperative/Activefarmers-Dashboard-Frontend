import { useState } from 'react';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'
import LoanSuccessful from './LoanSuccessful';

function AddCardRequest() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className='loan-success-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center add-savings-div">
                <Icon icon="material-symbols:credit-card" color="#0d9068" className="icon" />
                <div className="d-flex flex-column align-items-center mt-4">
                    <p>
                        Add Card to request for a loan
                    </p>
                    <p style={{ fontSize: "13px", width: "400px", fontWeight: "400" }}>
                        To send a loan request, you need to add details of your valid debit card, your card needs to meet this criteria:
                    </p>

                    <ul className='addcard-info'>
                        <li>Ensure your card's expiry date is not within the next 12 months (1year)</li>
                        <li>Ensure you are adding either your salary card or an active card with previous transaction history to qualify for a loan</li>
                        <li>We will deduct 50 naira to confirm your card's validity and credit back to your savings account with us</li>
                    </ul>


                    {/* <a href="/dashboard"> */}
                        <button className="btn btn-modal mt-4" onClick={openModal}>Next</button>
                    {/* </a> */}

                </div>

            </div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className={{
                    base: 'modal-base',
                    afterOpen: 'modal-base_after-open',
                    beforeClose: 'modal-base_before-close'
                }}
                overlayClassName={{
                    base: 'overlay-base',
                    afterOpen: 'overlay-base_after-open',
                    beforeClose: 'overlay-base_before-close'
                }}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={2000}
            >
                <LoanSuccessful />
            </Modal>



        </div>
    )
}

export default AddCardRequest