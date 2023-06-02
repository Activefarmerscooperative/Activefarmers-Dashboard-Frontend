import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './login.css';
import { Icon } from '@iconify/react';
import { LoginMember } from "../../utils/api/member"




import { toast } from "react-toastify";


export default function LoginForm() {
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false)
    // const [user, setUser] = useState({
    //     email: "",
    //     password: "",

    // })

    // const handleChange = (e) => {

    //     const { name, value } = e.target;
    //     setUser({ ...user, [name]: value });
    // };

    // const validateForm = () => {
    //     let errors = {};

    //     if (!user.email) {
    //         errors.email = 'Email Address is required';
    //     } else if (!isValidEmail(user.email)) {
    //         errors.email = 'Invalid email format';
    //     }

    //     if (!user.password) {
    //         errors.password = 'Password is required';
    //     }

    //     return errors;
    // };

    // Helper functions for email and phone number validation
    // const isValidEmail = (email) => {
    //     // Regular expression for email validation
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };

    // async function handleSubmit(e) {
    //     e.preventDefault()

    //     // Validate the form inputs
    //     const errors = validateForm();


    //     // If form validation fails
    //     if (Object.keys(errors).length > 0) {
    //         const firstFieldName = Object.keys(errors)[0];
    //         toast.error(errors[firstFieldName]);
    //         return;
    //     }
    //     setIsLoading(true)
    //     try {
    //         const data = await LoginMember(user);
    //         localStorage.setItem("AFCS-token", data.token)
    //         toast.success(data.message);

    //         setIsLoading(false);
    //         navigate("/dashboard", { replace: true })
    //         // return data;
    //     } catch (error) {
    //         setIsLoading(false);
    //         toast.error(error.error);
    //     }

    // }

    return (
        <div className="login-form-page pt-3 px-5">
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

                <Outlet />

                {/* <div className="form mt-5 px-5 py-3">
                    <h1>Log In to Dashboard</h1>
                    Log in to your existing account
                    <form className='d-flex flex-column my-4 '>
                        <input type="email" name="email" placeholder='email' required value={user.email} onChange={handleChange} />

                        <input type="password" name="password" placeholder='password' required value={user.password} onChange={handleChange} />

                        <div className='d-flex align-items-center'>
                            <input type="checkbox" name="" id="" className='mx-2' />
                            Remember Me
                        </div>
                        {isLoading && <button className='login-btn mt-3'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button className='login-btn mt-3' onClick={handleSubmit}>Log In</button>}



                    </form>
                    <p>Forgotten Password? <a href="./forgotpassword/ForgottenPassword" style={{ color: "#FB9129", fontWeight: "600" }}> Reset Here </a></p>
                </div> */}
            </div>
        </div>
    )
}