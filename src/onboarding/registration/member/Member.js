// import React, {useState} from "react";
// import { useState } from "react";
import { useState } from 'react';
import Modal from 'react-modal';
import OtpModal from "../../../modal/OTP";
import "./member.css";



export default function Member() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="member px-5 py-2">
            <div className="d-flex flex-column align-items-center py-3 my-2">
                <h1>Register as a memeber</h1>
                <span>Create an account to join our cooperative as a member</span>
                <div className="d-flex flex-column align-items-center form mt-5 ">
                    <p>Please complete this form to the best of your ability providing all relevant details. Please note that your application will go through confirmation prior to processing. </p>
                    <form action="" method="post" className=" d-flex align-items-center justify-content-center mb-4">
                        <div>
                            <input type="text" name="surname" id="" placeholder="Surname" />
                            <input type="email" name="email" id="" placeholder="Email Address" />
                            <select name="gender" id="">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select name="membership" id="">
                                <option value="">Membership catgory</option>
                                <option value="male">Farmer</option>
                                <option value="female">Non-farmer</option>
                            </select>
                            <input type="password" name="password" id="" placeholder="Password" />
                        </div>
                        <div>
                            <input type="text" name="firstname" id="" placeholder="Firstname" />
                            <input type="tel" name="phone" id="" placeholder="Phone Number" />
                            <select name="location" id="">
                                <option value="">Location</option>
                                <option value="adamawa">Adamawa</option>
                                <option value="taraba">Taraba</option>
                                <option value="abuja">Abuja</option>
                            </select>
                            <input type="text" name="address" id="" placeholder="Home Address" />
                            <input type="password" name="confirmpass" id="" placeholder="Confirm Password" />
                        </div>
                    </form>
                    <button onClick={openModal} className="btn member-btn">Create Account</button>

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
                    <OtpModal />
                </Modal>
            </div>
        </div>
    )
}