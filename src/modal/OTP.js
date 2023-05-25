import React, { useState } from "react";
import Modal from 'react-modal';
import Verify from "./Verified";
import { Icon } from '@iconify/react';
import "./modal.css";

function OtpInputModal() {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const handleChange = (e, index) => {
        const value = e.target.value;
        setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
        if (e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const value = e.clipboardData.getData("Text");
        const otpArray = value.split("").slice(0, 6);
        setOtp([...otpArray, ...otp.slice(otpArray.length)]);
    };
}

export default function OtpModal({ message }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const handleChange = (e, index) => {
        const value = e.target.value;
        setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
        if (e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const value = e.clipboardData.getData("Text");
        const otpArray = value.split("").slice(0, 6);
        setOtp([...otpArray, ...otp.slice(otpArray.length)]);
    };
  
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className='otp-modal p-4 my-5'>
            <div className="d-flex flex-column align-items-center">
                <Icon icon="ph:password-light" className="icon" />
                <p>
                    {message}
                </p>
                <div className="otp-input">
                    {otp.map((digit, index) => (
                        <input
                            type="number"
                            key={index}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onPaste={handlePaste}
                            maxLength={1}
                        />
                    ))}
                </div>



                <button onClick={openModal} className="btn btn-modal mt-5">Submit</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
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
                <Verify />
            </Modal>
        </div>
    )
}
