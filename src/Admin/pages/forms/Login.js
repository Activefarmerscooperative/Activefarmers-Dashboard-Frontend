import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './adminforms.css';
import { Icon } from '@iconify/react';
import header from '../../assets/logol.png';
import { LoginAdmin } from "../../../utils/api/admin";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/reducers/jwtReducer'


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    let location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const [inputType, setInputType] = useState("true");
    const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");

    const toggleSavingsVisibility = () => {
        setInputType(inputType ? false : true);
        setSavingsIcon(!savingsIcon);
    };

    const [admin, setAdmin] = useState({
        email: "",
        password: "",

    })


    const handleChange = (e) => {

        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!admin.email) {
            errors.email = 'Email is required';
        }
        if (!isValidEmail(admin.email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!admin.password) {
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

        // errors.email = 'Invalid email format';

        try {
            const data = await LoginAdmin(admin);
            // localStorage.setItem("AFCS-token", data.token)
            dispatch(setToken(data?.token))
            toast.success(data.message);

            setIsLoading(false);
            navigate("/admin/dashboard", { replace: true })
            // return data;
        } catch (error) {
            setIsLoading(false);
            toast.error(error)
            toast.error(error?.error);
        }

    }

    return (
      
            
            <div className=" login-page mt-4 d-flex justify-content-center px-5">
                <div className="d-flex flex-column  align-items-center login-form">
                    <h1 className="text-nowrap text-center">Admin Login</h1>
                    Login with your admin credentials

                    <form action="" className="d-flex flex-column my-4">
                        <input type="email" name="email" placeholder="Email address" required value={admin.email} onChange={handleChange} autoComplete="new-email" className="email-input" />


                        <div className="d-flex align-items-center justify-content-between password mt-2">
                            <input type={!inputType ? "text" : "password"} name="password" placeholder='password' required value={admin.password} onChange={handleChange} autoComplete="new-password" className="my-2" />
                            <div onClick={toggleSavingsVisibility} className="float-right">
                                <Icon icon={savingsIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                            </div>
                        </div>



                        {isLoading && <button className='login-button mt-4 mx-auto'><RotatingLines width="15" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button className='login-button mt-4 mx-auto' onClick={handleSubmit}>Log In</button>}


                    </form>             

                    <p className="reset-password">Forgotten Password? <a href="" >Reset Here</a></p>
                </div>
            </div>

        
    );
}
