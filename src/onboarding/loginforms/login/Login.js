
import React, { useState} from "react";
import {useNavigate } from "react-router-dom";
import '../login.css';
import { LoginMember } from "../../../utils/api/member";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";





export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",

    })

    const handleChange = (e) => {

        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!user.email) {
            errors.email = 'Email Address is required';
        } else if (!isValidEmail(user.email)) {
            errors.email = 'Invalid email format';
        }

        if (!user.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    // Helper functions for email and phone number validation
    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
            const data = await LoginMember(user);
            localStorage.setItem("AFCS-token", data.token)
            toast.success(data.message);

            setIsLoading(false);
            navigate("/dashboard", { replace: true })
            // return data;
        } catch (error) {
            setIsLoading(false);
            toast.error(error.error);
        }
        
    }
    return (
        <div className="login-page pt-3 px-5">
            <div>
                 <div className="form mt-3 px-5 py-3">
                    <h1>Log In to Dashboard</h1>
                    Log in to your existing account
                    <form className='d-flex flex-column my-4 '>
                        <input type="email" name="email" placeholder='email' required value={user.email} onChange={handleChange} className="my-2" />

                        <input type="password" name="password" placeholder='password' required value={user.password} onChange={handleChange} className="my-2" />

                        <div className='d-flex align-items-center mt-2'>
                            <input type="checkbox" name="" id="" className='mx-2' />
                            Remember Me
                        </div>
                        {isLoading && <button className='login-btn mt-5'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button className='login-btn mt-5' onClick={handleSubmit}>Log In</button>}



                    </form>
                    <p>Forgotten Password? <a href="/login/forgotpassword" style={{ color: "#FB9129", fontWeight: "600" }}> Reset Here </a></p>
                </div>
            </div>
           
        </div>
    )
}