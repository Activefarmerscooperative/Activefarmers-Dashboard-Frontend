// import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import OtpInput from 'react-otp-input';
import Modal from 'react-modal';
import Verify from "./Verified";
import { Icon } from '@iconify/react';
import "./modal.css";



import React from 'react'

export default function OtpModal() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    // const navigate = useNavigate();
    // const [code, setCode] = useState("");

    // const handleChange = (code) => setCode(code);
    
    return(
        <div className='otp-modal p-4 my-5'>
            <div className="d-flex flex-column align-items-center">
                <Icon icon="ph:password-light" className="icon" />
                <p>
                    You will receive a congratulatory email shortly, proceed to dashboard and explore better ways to new opportunities
                </p>
                {/* <OtpInput
                    className="otp-input my-5 py-3"
                    value={code}
                    onChange={handleChange}
                    numInputs={6}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    inputStyle={{
                        border: "1px solid #BBC2D9",
                        borderRadius: "10px",
                        width: "60px",
                        height: "60px",
                        fontSize: "18px",
                        caretColor: "#141414",
                        margin: "0 30px"
                    }}
                    focusStyle={{
                        border: "1px solid #141414",
                        outline: "none"
                    }}
                /> */}
                <button onClick={openModal} className="btn btn-modal mt-5">Submit</button>
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
                   <Verify />
                </Modal>
        </div>
    )
}
