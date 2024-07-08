import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './adminforms.css';
import { fetchAllStates, fetchAllLga } from "../../../utils/api/general"
import { RegisterAdmin } from "../../../utils/api/admin"
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [location, setLocation] = useState([])
    const [lga, setLga] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [member, setMember] = useState({
        surname: "",
        firstname: "",
        email: "",
        phone: "",
        isoCode: "+234",
        gender: "",
        location: "",
        lga: "",
        address: "",
        password: "",
        membershipType: ""
    })

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
    const fetchLga = async (signal) => {
        try {
            const data = await fetchAllLga(signal);
            setLga(data.lgas);
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
        fetchLga({ signal })

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

        if (!member.lga) {
            errors.lga = 'lga is required';
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
            const data = await RegisterAdmin(member);
            console.log(data)
            localStorage.setItem("AFCS-token", data.afcsToken)
            toast.success("Registration Successful. Please contact the Management for Approval.")
            setMember({
                surname: "",
                firstname: "",
                email: "",
                phone: "",
                isoCode: "+234",
                gender: "",
                location: "",
                lga: "",
                address: "",
                password: "",
                membershipType: ""
            })
            setConfirmPass("")
            setIsLoading(false);

            // return data;
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            toast.error(error);
        }

    }

    return (

        <div className="d-flex px-5 py-2  member ">
            <div className="member-content d-flex flex-column align-items-center p-3">
                <h1>Register as an Admin</h1>

                <div className="d-flex flex-column align-items-center ">
                    <p>Please complete this form to the best of your ability providing all relevant details. Please note that your application will go through confirmation prior to processing. </p>
                    <form className=" row custom-gutter text-center">

                        <div className="col-md-6">
                            <input type="text" name="surname" required value={member.surname} onChange={handleChange} placeholder="Surname" />
                        </div>
                        <div className="col-md-6">
                            <input required type="text" name="firstname" onChange={handleChange} value={member.firstname} placeholder="Firstname" />
                        </div>
                        
                        <div className="col-md-6">
                            <input type="email" name="email" required value={member.email} onChange={handleChange} placeholder="Email Address" />
                        </div>
                        <div className="col-md-6">
                            <input required type="tel" name="phone" value={member.phone} onChange={handleChange} placeholder="Phone Number e.g:+2348123456789" />
                        </div>
                        <div className="col-md-6">
                            <select name="gender" value={member.gender} required onChange={handleChange}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                        </div>
                        <div className="col-md-6">
                            <select required name="location" value={member.location} onChange={handleChange} className="">
                                <option value="">Location</option>
                                {
                                    location.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select required name="lga" value={member.lga} onChange={handleChange} className="">
                                <option value="">Local Goverment</option>
                                {
                                    lga.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                            <input required type="text" name="address" onChange={handleChange} value={member.address} placeholder="Home Address" />
                        </div>
                        <div className="col-md-6">
                            <select required name="membershipType" value={member.membershipType} onChange={handleChange}>
                                <option value="">Membership Category</option>
                                <option value="admin">Admin</option>

                            </select>
                        </div>
                        <div className="col-md-6">
                            <input autocomplete="new-password" required type="password" name="password" onChange={handleChange} value={member.password} placeholder="Password" />
                        </div>
                        <div className="col-md-6">
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

                </div>
                <div className="">
                    {isLoading && <center className="btn member-btn mx-auto mt-3"><RotatingLines width="15" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                    {!isLoading && <button onClick={handleSubmit} disabled={isLoading} className="btn member-btn mx-auto mt-3">Create Account</button>}

                </div>
            </div>
        </div>

    )
}

