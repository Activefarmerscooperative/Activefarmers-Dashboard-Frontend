
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../login.css';
import { ResetPassword } from "../../../utils/api/member";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import OtpModal from "../../../modal/OTP";
import Modal from 'react-modal';
import CreatePasswordSuccess from "../../../modal/CreatePasswordSuccess";





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
        <div className="login-page pt-3 px-5">
            <div className="form text-center mt-5 px-5 py-3">
                <h1>Create New Password</h1>
                Create new password to use for logging into your active farmers account, do not share your new password with anyone
                <form className='d-flex flex-column my-4 '>

                    <div className="my-2">
                        <input type="password" name="password" placeholder='password' required value={user.password} onChange={handleChange} />
                        <p className="text-end my-0 create">Both passwords must match</p>
                    </div>
                    <div className="my-2">
                        <input type="password" name="password" placeholder='password' required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                        <p className="text-end my-0 create">Both passwords must match</p>
                    </div>



                    
                    {isLoading && <button className='login-btn mt-3'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                    {!isLoading && <button className='login-btn mx-auto mt-3' onClick={handleSubmit}>Done</button>}



                </form>

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Enter OTP"
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
                    <CreatePasswordSuccess
                        message={message} />
                        {/* <OtpInputModal message={message} /> */}
                </Modal>
                
            </div>
        </div>
    )
}