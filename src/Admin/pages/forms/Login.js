import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './forms.css';
import { Icon } from '@iconify/react';
import header from '../../assets/logol.png';
import { LoginAdmin } from "../../../utils/api/admin";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function Login() {
    const navigate = useNavigate();
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
            localStorage.setItem("AFCS-token", data.token)
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
        <div >
            {location.pathname === "/login"
                ? <div className="header-section">
                    <div className="d-flex align-items-center justify-content-between header-components">
                        <div className='d-flex align-items-center'>
                            <img src={header} alt="" />
                            <h1>AFC Admin Dashboard</h1>
                        </div>

                        <div className="d-flex align-items-center header-buttons">
                            <p className="mx-2 mb-0">

                                Already have an account?
                            </p>


                            <div className="">
                                <button className='btn signup-btn' >login</button>
                            </div>

                        </div>
                    </div> </div> : null
            }
            <center className=" my-3 p-2">
                <div className="d-flex flex-column  align-items-center login-form p-3">
                    <h1>Admin Login</h1>
                    <p> Login with your admin credentials</p>

                    <form action="">
                        <div className="form-group my-4">
                            <input type="email" name="email" placeholder="Email address" required value={admin.email} onChange={handleChange} autoComplete="off" aria-autocomplete="none" />
                        </div>

                        <div className="d-flex align-items-center justify-content-between form-group my-4">
                            <input type={!inputType ? "text" : "password"} name="password" placeholder='password' required value={admin.password} onChange={handleChange} className="my-2" />
                            <div onClick={toggleSavingsVisibility}>
                                <Icon icon={savingsIcon ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                            </div>
                        </div>
                    </form>

                    <div className="">

                        {isLoading && <button className='login-btn mt-5'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button className='login-btn mt-5' onClick={handleSubmit}>Log In</button>}


                    </div>

                    <p className="reset-password">Forgotten Password? <a href="">Reset Here</a></p>
                </div>
            </center>

        </div>
    );
}
