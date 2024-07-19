import React, { useState, useEffect } from "react";
// import { useState } from "react";
import Modal from 'react-modal';
import OtpModal from "../../../../modal/OTP";
import "./member.css";
import { fetchAllStates } from "../../../../utils/api/general"
import { RegisterMember } from "../../../../utils/api/member"
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';

export default function Member() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [location, setLocation] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [selectedValue, setSelectedValue] = useState("");

    const [inputType, setInputType] = useState("true");
    const [confirmInputType, setConfirmInputType] = useState("true");
    const [passwordIcon, setPasswordIcon] = useState("mdi:eye-off");
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("mdi:eye-off");

    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const togglePasswordVisiblity = () => {
        setInputType(inputType ? false : true);
        setPasswordIcon(!passwordIcon);
    };


    const toggleConfirmPasswordVisiblity = () => {
        setConfirmInputType(confirmInputType ? false : true);
        setConfirmPasswordIcon(!confirmPasswordIcon);
    };

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
        setSelectedValue(e.target.value);

        // if (name === "email") {
        //     if (!isValidEmail(value)) {
        //         setEmailError("Invalid email format");
        //     } else {
        //         setEmailError("");
        //     }
        // }

        // if (name === "phone") {
        //     if (!isValidPhoneNumber(value)) {
        //         setPhoneError("Invalid phone number format");
        //     } else {
        //         setPhoneError("");
        //     }
        // }
        if (name === "email" && !emailError) {
            setEmailError("");
        }

        if (name === "phone" && !phoneError) {
            setPhoneError("");
        }
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            if (!isValidEmail(value)) {
                setEmailError("Invalid email format");
            } else {
                setEmailError("");
            }
        }

        if (name === "phone") {
            if (!isValidPhoneNumber(value)) {
                setPhoneError("Invalid phone number format");
            } else {
                setPhoneError("");
            }
        }
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
        const phoneRegex = /^\+234\d{10}$/;
        // const phoneRegex = /^(?:\+?234)?(?:[789][01]\d{8}|[789][01]\d{7})$/;
        // const phoneRegex = /^(?:\+234|0)?[789]\d{9}$/;

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
            console.log(data)
            localStorage.setItem("AFCS-token", data.afcsToken)
            localStorage.setItem("termii_pinId", data.pinId)
            setMessage(data.message)
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
        <div className="member px-5 py-2 d-flex">
            <div className="member-content d-flex flex-column align-items-center py-3">
                <h1>Register as a member</h1>
                <span>Create an account to receive  join our cooperative as a member</span>
                <div className="d-flex flex-column align-items-center mt-5 ">

                    <p>Please complete this form to the best of your ability providing all relevant details. Please note that your application will go through confirmation prior to processing. </p>
                    <form className=" row custom-gutter text-center">

                        <div className="col-md-6">
                            <input type="text" name="surname" required value={member.surname} onChange={handleChange} placeholder="Type Surname..." />
                        </div>
                        <div className="col-md-6">
                            <input required type="text" name="firstname" onChange={handleChange} value={member.firstname} placeholder="Type Firstname..." />
                        </div>
                        <div className="col-md-6">
                            <input type="email" name="email" required value={member.email} onChange={handleChange} onBlur={handleBlur} placeholder="Type Email..." className={isValidEmail(member.email) ? "valid" : "invalid"} />
                            
                        </div>
                        <div className="col-md-6">
                            <input required type="tel" name="phone" value={member.phone} onChange={handleChange} onBlur={handleBlur} placeholder="Type Phone with +234..." className={isValidPhoneNumber(member.phone) ? "valid" : "invalid"} />
                            
                        </div>
                        <div className="col-md-6 my-0 py-0">
{emailError && <p className="validation-error my-0 float-start ms-5 text-danger">{emailError}</p>}
                        </div>
                        <div className="col-md-6 my-0">
                            {phoneError && <p className="validation-error my-0 me-5 text-danger float-end">{phoneError}</p>}
                        </div>
                        <div className="col-md-6">
                            <select name="gender" value={member.gender} required onChange={handleChange} className={selectedValue ? "selected" : ""}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select required name="location" value={member.location} onChange={handleChange} className={selectedValue ? "selected" : ""}>
                                <option value="">Location</option>
                                {
                                    location.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                                }

                            </select>
                        </div>
                        <div className="col-md-6">
                            <input required type="text" name="address" onChange={handleChange} value={member.address} placeholder="Type Address..." />
                        </div>
                        <div className="col-md-6">
                            <select required name="membershipType" value={member.membershipType} onChange={handleChange} className={selectedValue ? "selected" : ""}>
                                <option value="">Membership category</option>
                                <option value="Farmer">Farmer</option>
                                <option value="Non-Farmer">Non-Farmer</option>
                            </select>
                        </div>

                        {/* <div className="col-md-6">
                            <input autocomplete="new-password" required type="password" name="password" onChange={handleChange} value={member.password} placeholder="Password" />
                        </div> */}

                        <div className="col-md-6 ">
                            <div className="d-flex align-items-center  password">
                                <input
                                    type={!inputType ? "text" : "password"}
                                    name="password"
                                    placeholder='Type password here...'
                                    required value={member.password} onChange={handleChange} />

                                <div onClick={togglePasswordVisiblity} className="icon-div">
                                    <Icon icon={passwordIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                                </div>

                            </div>

                        </div>



                        <div className="col-md-6 ">
                            <div className="password d-flex align-items-center">
                                <input
                                    required
                                    // type="password" 
                                    type={!confirmInputType ? "text" : "password"}
                                    name="confirmpass"
                                    value={confirmPass}
                                    onChange={(e) => {
                                        setConfirmPass(e.target.value);
                                        // if (member.password.startsWith(e.target.value)) {
                                        //     // Password and Confirm Password match
                                        //     // You can clear any previous error message if needed
                                        // } else {
                                        //     // Password and Confirm Password don't match
                                        //     // Display error message and set text color to red
                                        // }
                                    }}
                                    placeholder="Type Confirm Password"
                                />
                                <div onClick={toggleConfirmPasswordVisiblity} className="icon-div">
                                    <Icon icon={confirmPasswordIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                                </div>
                            </div>


                        </div>
                        <div className="">
                            {confirmPass !== '' && !member.password.startsWith(confirmPass) && (
                                <p className="password-match">Password and Confirm Password do not match.</p>
                            )}
                        </div>

                    </form>
                    <div className="d-flex justify-content-center">
                        {isLoading && <center className="btn member-btn mx-auto mt-3"><RotatingLines width="15" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                        {!isLoading && <button onClick={handleSubmit} disabled={isLoading} className="btn member-btn mx-auto mt-3">Create Account</button>}
                    </div>

                </div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    contentLabel="Example Modal"
                    // shouldCloseOnOverlayClick={true}
                // closeTimeoutMS={2000}
                >
                    <OtpModal
                        message={message} />
                    {/* <OtpInputModal message={message} /> */}
                </Modal>
            </div>
        </div>
    )
}