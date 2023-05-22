import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import { Icon } from '@iconify/react';
import { LoginMember } from "../../utils/api/member"
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
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
            localStorage.setItem("AFCS-token", data.token)
            toast.success(data.message);

            setIsLoading(false);
            navigate("/dashboard", { replace: true })
            // return data;
        } catch (error) {
            setIsLoading(false);
            toast.error(error)
            toast.error(error.error);
        }

    }

    return (
        <div className="login-page pt-3 px-5">
            <div className=''>
                <div className="d-flex align-items-center justify-content-between">
                    <a href="/" className="d-flex align-items-center mx-5" >
                        <Icon icon="material-symbols:arrow-back-rounded" style={{ fontSize: "20px", margin: "0 5px" }} />
                        Back to Homepage
                    </a>

                    <div className='text '>
                        Don't have an account yet?
                        <button className='mx-3' onClick={() => { navigate("/register"); }}>Register</button>
                    </div>
                </div>

                <div className="form mt-5 px-5 py-3">
                    <h1>Log In to Dashboard</h1>
                    Log in to your existing account
                    <form className='d-flex flex-column my-4 '>
                        <input type="tel" name="phone" placeholder='Enter phone number e.g: 08012345678' required value={user.phone} onChange={handleChange} />

                        <input type="password" name="password" placeholder='password' required value={user.password} onChange={handleChange} />

                        <div className='d-flex align-items-center'>
                            <input type="checkbox" name="" id="" className='mx-2' />
                            Remember Me
                        </div>
                        {isLoading && <button className='login-btn mt-3'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button className='login-btn mt-3' onClick={handleSubmit}>Log In</button>}



                    </form>
                    <p>Forgottrn Password? <a href="" style={{ color: "#FB9129", fontWeight: "600" }}> Reset Here </a></p>
                </div>
            </div>
        </div>
    )
}