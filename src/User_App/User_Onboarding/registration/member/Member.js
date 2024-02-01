import React, { useState, useEffect } from "react";
// import { useState } from "react";
import Modal from 'react-modal';
import OtpModal from "../../../../modal/OTP";
import "./member.css";
import { fetchAllStates } from "../../../../utils/api/general"
import { RegisterMember } from "../../../../utils/api/member"
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'

export default function Member() {
    const dispatch = useDispatch()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [location, setLocation] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [member, setMember] = useState({
        surname: "",
        firstname: "",
        email: "",
        phone: "",
        isoCode: "+234",
        gender: "",
        location: "",
        address: "",
        password: "",
        membershipType: ""
    })

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }


    const fetchState = async (signal) => {
        try {
            const data = await fetchAllStates(signal);
            setLocation(data.states);
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    };

    useEffect(() => {

        // Fetch location info on component mount.
        const abortController = new AbortController();
        const signal = abortController.signal;
        fetchState({ signal })

        return () => {
            abortController.abort(); // Cancel the request on component unmount
        };
    }, [])

    const handleChange = (e) => {

        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!member.surname) {
            errors.surname = 'Surname is required';
        }

        if (!member.firstname) {
            errors.firstname = 'Firstname is required';
        }

        if (!member.email) {
            errors.email = 'Email Address is required';
        } else if (!isValidEmail(member.email)) {
            errors.email = 'Invalid email format';
        }

        if (!member.phone) {
            errors.phone = 'Phone Number is required';
        } else if (!isValidPhoneNumber(member.phone)) {
            const firstCharacter = member.phone.charAt(0);
            if (firstCharacter === "0") {
                member.phone = "+234" + member.phone.substring(1);
            }
            // errors.phone = 'Invalid phone number format';
        }

        if (!member.location) {
            errors.location = 'Location is required';
        }

        if (!member.password) {
            errors.password = 'Password is required';
        } else if (member.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (member.password !== confirmPass) {
            errors.confirmPass = 'Passwords do not match';
        }

        return errors;
    };

    // Helper functions for email and phone number validation
    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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
        try {
            const data = await RegisterMember(member);
            // localStorage.setItem("AFCS-token", data.afcsToken)
            localStorage.setItem("termii_pinId", data.pinId)
            dispatch(setToken(data?.afcsToken))
            setMessage(`${data.message}. May take up to a minute.`)
            openModal()
            setMember({
                surname: "",
                firstname: "",
                email: "",
                phone: "",
                isoCode: "+234",
                gender: "",
                location: "",
                address: "",
                password: "",
                membershipType: ""
            })
            setConfirmPass("")
            setIsLoading(false);

            // return data;
        } catch (error) {

            setIsLoading(false);
            toast.error(error);
        }

    }





    // Get all input elements with the "asterisk-placeholder" class
    const inputElements = document.getElementsByClassName('asterisk-placeholder');

    // Iterate over the input elements
    Array.from(inputElements).forEach((input) => {
        const placeholderText = input.getAttribute('placeholder');

        // Modify the placeholder by adding an asterisk and setting its color to red
        input.setAttribute('placeholder', `${placeholderText} *`);
        input.style.color = 'red';
    });





    return (
        <div className="member px-5 py-2">
            <div className="d-flex flex-column align-items-center py-3 my-2">
                <h1>Register as a member</h1>
                <span>Create an account to join our cooperative as a member</span>
                <div className="d-flex flex-column align-items-center form mt-5 ">
                    <p>Please complete this form to the best of your ability providing all relevant details. Please note that your application will go through confirmation prior to processing. </p>
                    <form className=" d-flex align-items-start justify-content-center mb-4">
                        <div>
                            <input type="text" name="surname" required value={member.surname} onChange={handleChange} placeholder="Surname" />
                            <input type="email" name="email" required value={member.email} onChange={handleChange} placeholder="Email Address" />
                            <select name="gender" value={member.gender} required onChange={handleChange}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <select required name="membershipType" value={member.membershipType} onChange={handleChange}>
                                <option value="">Membership category</option>
                                <option value="Farmer">Farmer</option>
                                <option value="Non-Farmer">Non-Farmer</option>
                            </select>
                            <input autocomplete="new-password" required type="password" name="password" onChange={handleChange} value={member.password} placeholder="Password" />
                        </div>

                        <div>
                            <input required type="text" name="firstname" onChange={handleChange} value={member.firstname} placeholder="Firstname" />
                            <input required type="tel" name="phone" value={member.phone} onChange={handleChange} placeholder="Phone Number e.g:+2348123456789" />
                            <select required name="location" value={member.location} onChange={handleChange} className="">
                                <option value="">Location</option>
                                {
                                    location.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                                }

                            </select>
                            <input required type="text" name="address" onChange={handleChange} value={member.address} placeholder="Home Address" />

                            <div className="mx-0">
                                <input required type="password" name="confirmpass" value={confirmPass} onChange={(e) => {
                                    setConfirmPass(e.target.value);
                                    if (member.password.startsWith(e.target.value)) {
                                        // Password and Confirm Password match
                                        // You can clear any previous error message if needed
                                    } else {
                                        // Password and Confirm Password don't match
                                        // Display error message and set text color to red
                                    }
                                }}
                                    placeholder="Confirm Password" />
                                {confirmPass !== '' && !member.password.startsWith(confirmPass) && (
                                    <p className="password-match">Password and Confirm Password do not match.</p>
                                )}
                            </div>



                        </div>
                    </form>
                    {isLoading && <center className="btn member-btn"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                    {!isLoading && <button onClick={handleSubmit} disabled={isLoading} className="btn member-btn mx-auto mt-3">Create Account</button>}


                </div>
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
                    shouldCloseOnOverlayClick={false}
                    closeTimeoutMS={2000}
                >
                    <OtpModal
                        message={message} />
                    {/* <OtpInputModal message={message} /> */}
                </Modal>
            </div>
        </div>
    )
}