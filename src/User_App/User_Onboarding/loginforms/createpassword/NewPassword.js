
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../login.css';
import { ResetPassword } from "../../../../utils/api/member";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
// import OtpModal from "../../../modal/OTP";
import Modal from 'react-modal';
import CreatePasswordSuccess from "../../../../modal/CreatePasswordSuccess";





export default function CreateNewPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [user, setUser] = useState({
        password: "",

    })
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!user.password) {
            errors.password = 'Password is required';
        } else if (user.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (user.password !== user.confirmpassword) {
            errors.confirmPass = 'Passwords do not match';
        }

        return errors;
    };


    async function handleSubmit(e) {
        e.preventDefault()

        const errors = validateForm();
        setIsLoading(true)
        try {
            const data = await ResetPassword(user);
            setIsLoading(false);
            openModal()
        } catch (error) {
            setIsLoading(false);
            toast.error(error.error);
        }

    }
    return (
        <div className="login-page mt-3 d-flex justify-content-center">
            <div className="form text-center d-flex align-items-center flex-column">
                <h1 className="text-nowrap text-center">Create New Password</h1>
                Create new password to use for logging into your active farmers account, do not share your new password with anyone
                <form className='d-flex flex-column my-4 '>


                    <input type="password" name="password" placeholder='password' required value={user.password} onChange={handleChange} className="email-input" />


                    <div className="d-flex flex-column my-2">
                        <input type="password" name="password" placeholder='password' required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="email-input" />
                        {confirmPass !== '' && !user.password.startsWith(confirmPass) && (
                            <p className="password-match">Password and Confirm Password do not match.</p>
                        )}
                    </div>




                    {isLoading && <button className='login-button mt-4 mx-auto'><RotatingLines width="15" strokeColor="#FFF" strokeWidth="3" /></button>}
                    {!isLoading && <button className='login-button mt-4 mx-auto' onClick={handleSubmit}>Done</button>}



                </form>

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    contentLabel="Example Modal"
                    shouldCloseOnOverlayClick={true}
                >
                    <CreatePasswordSuccess
                        message={message} />
                    {/* <OtpInputModal message={message} /> */}
                </Modal>

            </div>
        </div>
    )
}