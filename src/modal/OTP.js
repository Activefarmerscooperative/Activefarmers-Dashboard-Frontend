import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import Verify from "./Verified";
import { Icon } from '@iconify/react';
import "./modal.css";
import { VerifyOTP, ResendOTP } from "../utils/api/member"
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/reducers/jwtReducer'

// function OtpInputModal() {

//     const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//     const handleChange = (e, index) => {
//         const value = e.target.value;
//         setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
//         if (e.target.nextSibling) {
//             e.target.nextSibling.focus();
//         }
//     };
//     const handlePaste = (e) => {
//         e.preventDefault();
//         const value = e.clipboardData.getData("Text");
//         const otpArray = value.split("").slice(0, 6);
//         setOtp([...otpArray, ...otp.slice(otpArray.length)]);
//     };
// }

export default function OtpModal({ message }) {
    const dispatch = useDispatch()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false)

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

    async function handleSubmit() {

        let token = otp.slice(0, 6).join("");
        if (token[0] === " ") return toast.error("Please enter a valid token")
        const pinId = localStorage.getItem("termii_pinId")

        if (pinId === "null") return toast.error("Please enter a valid token")
        setIsLoading(true)

        try {
            await VerifyOTP({
                token,
                pinId
            });
            localStorage.removeItem("termii_pinId")
            openModal()

        } catch (error) {

            toast.error(error)
            toast.error(error.error)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }

    }
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleClick = () => {
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
            // navigate('/login/createpassword');
        }, 3000);
    };
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [countdown]);

    const handleResendOTP = async () => {

        try {
            setCountdown(94); // Set the initial countdown time (e.g., 01:34)
            setShowSnackbar(false); // Assuming you want to hide the snackbar when resending OTP
            const data = await ResendOTP()
            toast.success(data.message)
            localStorage.setItem("termii_pinId", data.pinId)
            // dispatch(setToken(data?.afcsToken))

        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className='otp-modal p-4 my-4'>
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
                            maxlength="1"
                        />
                    ))}
                </div>


                {isLoading && <center className="btn member-btn"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                {!isLoading && <button onClick={handleSubmit} className="btn btn-modal mt-5">Submit</button>}
                <p className="mt-3">
                    Yet to receive OTP?
                    {countdown > 0 ? (
                        <span style={{ color: "#FB9129", fontWeight: "600" }}>
                            {' '}
                            Resend OTP ({Math.floor(countdown / 60)
                                .toString()
                                .padStart(2, '0')}:
                            {Math.floor(countdown % 60).toString().padStart(2, '0')})
                        </span>
                    ) : (
                        <a href="#" style={{ color: "#FB9129", fontWeight: "600" }} onClick={handleResendOTP}>
                            {' '}
                            Resend OTP
                        </a>
                    )}
                </p>

            </div>
            <Modal
                isOpen={modalIsOpen}
                // onRequestClose={closeModal}
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
                shouldCloseOnOverlayClick={false}
                closeTimeoutMS={2000}
            >
                <Verify />
            </Modal>
        </div>
    )
}
