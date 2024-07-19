import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../login.css';
import { LoginMember } from "../../../../utils/api/member";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'
import Modal from 'react-modal';
import OtpModal from "../../../../modal/OTP";


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [inputType, setInputType] = useState("true");
    const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");

    const toggleSavingsVisiblity = () => {
        setInputType(inputType ? false : true);
        setSavingsIcon(!savingsIcon);
    };

    const [user, setUser] = useState({
        phone: "",
        password: "",

    })

    const handleChange = (e) => {

        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!user.phone) {
            errors.email = 'Phone number is required';
        }

        if (!user.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    // Helper functions for email and phone number validation
    // const isValidEmail = (email) => {
    //     // Regular expression for email validation
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };
    const isValidPhoneNumber = (phone) => {
        // Regular expression for phone number validation
        const phoneRegex = /^\+\d+$/;
        return phoneRegex.test(phone);
    };

    async function handleSubmit(e) {
        e.preventDefault()

        // Validate the form inputs
        const errors = validateForm();


        // If form validation fails
        if (Object.keys(errors).length > 0) {
            const firstFieldName = Object.keys(errors)[0];
            toast.error(errors[firstFieldName]);
            return;
        }

        setIsLoading(true)
        let phone = user.phone;
        let password = user.password;
        if (!isValidPhoneNumber(phone)) {
            const firstCharacter = phone.charAt(0);

            if (firstCharacter === "0") {
                phone = "+234" + phone.substring(1);
            }
            // errors.email = 'Invalid email format';
        }
        try {
            const data = await LoginMember({ phone, password });
            // localStorage.setItem("AFCS-token", data.token)
            dispatch(setToken(data?.token))
            toast.success(data.message);

            setIsLoading(false);
            console.log("login data", data)

            navigate("/dashboard", { replace: true })
            // return data;
        } catch (error) {
            setIsLoading(false);
            toast.error(error)
            toast.error(error?.error);

            const errorMessage = error.message;
            console.log("login error message:", errorMessage);
            if (
                errorMessage ===
                `Enter the verification code sent to ${phone} in order to verify your account`
            ) {
                setErrorMessage(errorMessage)
                localStorage.setItem("AFCS-token", error.afcsToken)
                setModalIsOpen(true);
            }

        }

    }
    function closeModal() {
        setModalIsOpen(false);
    }
    return (
        <div className="login-page mt-2 d-flex justify-content-center">

            <div className="d-flex align-items-center flex-column form">
                <h1 className="text-nowrap text-center">Log In to Dashboard</h1>
                Log in to your existing account
                <form className='d-flex flex-column my-4 '>
                    <input type="tel" name="phone" className="email-input" placeholder='Enter phone number e.g: 08012345678' value={user.phone} onChange={handleChange} autocomplete="on" required />


                    <div className="d-flex align-items-center  password mt-2">
                        <input type={!inputType ? "text" : "password"} name="password" placeholder='password' required value={user.password} onChange={handleChange} className="my-2" />

                        <div onClick={toggleSavingsVisiblity} className="float-right">
                            <Icon icon={savingsIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                        </div>

                    </div>


                    <div className='d-flex align-items-center mt-2'>
                        <input type="checkbox" name="" id="" className='mx-2' />
                        Remember Me
                    </div>
                    {isLoading && <button className='login-button mt-4'><RotatingLines width="15" strokeColor="#FFF" strokeWidth="3" /></button>}
                    {!isLoading && <button className='login-button mt-4' onClick={handleSubmit}>Log In</button>}



                </form>
                <p>Forgotten Password? <a href="/login/forgotpassword" style={{ color: "#FB9129", fontWeight: "600" }}> Reset Here </a></p>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="custom-modal"
                overlayClassName="custom-overlay"
                contentLabel="Example Modal"
            >
                <OtpModal message={errorMessage} />
            </Modal>
        </div>
    )
}