import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"
import LoanSuccessful from './LoanSuccessful';
import { CancelLoan, ValidateCard, ValidateSavedCard } from "../utils/api/member"
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function AddCardRequest({ message }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    async function handleValidateCard() {
        try {
            setIsLoading(true)
            const { data, message } = await ValidateCard()
            toast.success(`${message} Opening payment window, do not close the page.`)
            window.location.replace(data.authorization_url);
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error)
            toast.error(error?.error)
        }
    }

    async function handleValidateSavedCard() {
        try {
            setIsLoading(true)
            const { data, message } = await ValidateSavedCard()
            openModal()

        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error)
            toast.error(error?.error)
        }
    }

    async function handleCancelLoan() {
        try {
            setIsLoading(true)
            const { message } = await CancelLoan()
            toast.success(message)
        } catch (error) {
            console.log(error)
            toast.error(error)
            toast.error(error?.error)
        }
    }

    return (
        <div className='loan-success-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center add-savings-div">
                <Icon icon="material-symbols:credit-card" color="#0d9068" className="icon" />

                <div className="d-flex flex-column align-items-center mt-4">
                    {
                        !message &&
                        <>
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

                            <div className='d-flex align-items-start justify-content-around'>
                                <button className="btn btn-modal mt-4" onClick={handleCancelLoan}>Cancel Loan</button>

                                {isLoading && <center className="btn btn-modal mt-4"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                                {!isLoading && <button className="btn btn-modal mt-4" onClick={handleValidateCard}>Continue</button>}
                            </div>
                        </>

                    }

                    {/* The user have a saved card */}
                    {
                        message &&
                        <>
                            <p>{message}</p>

                            <p style={{ fontSize: "13px", width: "400px", fontWeight: "400" }}>
                                Please note: We will deduct 50 naira to confirm your card's validity and credit back to your savings account with us
                            </p>

                            <div className='d-flex align-items-start justify-content-around'>
                                <button className="btn btn-modal mt-4" onClick={handleCancelLoan} disabled={isLoading}>Cancel Loan</button>

                                {isLoading && <center className="btn btn-modal mt-4 ml-2"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                                {!isLoading && <button className="btn btn-modal mt-4 ml-2" onClick={handleValidateSavedCard}>Continue</button>}
                                <button className="btn btn-modal mt-4 ml-2" onClick={handleValidateCard} disabled={isLoading}>Add another Card</button>
                            </div>
                        </>

                    }


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