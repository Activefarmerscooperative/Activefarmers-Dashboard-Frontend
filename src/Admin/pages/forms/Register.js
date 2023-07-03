import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './forms.css';
import { Icon } from '@iconify/react';




export default function Register() {
    const navigate = useNavigate();


    return (

        <div className="d-flex justify-content-center my-3 p-2">
            <div className="d-flex flex-column align-items-center register-form px-5 py-3">
                <h1>Register as an Admin</h1>
                <p>Please complete this form to the best of your ability providing all relevant details. Please note that your application will go through confirmation prior to processing. </p>

                <form action="" className="d-flex ">
                    <div className="mx-3">
                        <div className="form-group my-4">
                            <input type="text" name="surname" placeholder="Surname" autoComplete="off" aria-autocomplete="none" />
                        </div>
                        <div className="form-group my-4">
                            <input type="email" name="email" placeholder="Email address" autoComplete="off" aria-autocomplete="none" />
                        </div>
                        <div className="form-group my-4">
                            <select name="gender" autoComplete="off" aria-autocomplete="none">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                        </div>
                        <div className="form-group my-4">
                            <select name="gender" autoComplete="off" aria-autocomplete="none">
                                <option value="">Membership Category</option>
                                <option value="male">Admin</option>
                                <option value="female">Super Admin</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center justify-content-between form-group my-4">
                            <input type="password" name="password" placeholder="Password" autoComplete="password" />
                        </div>
                    </div>

                    <div className="mx-3">
                        <div className="form-group my-4">
                            <input type="text" name="fname" placeholder="First Name" autoComplete="off" aria-autocomplete="none" />
                        </div>
                        <div className="form-group my-4">
                            <input type="tel" name="phone" placeholder="Phone Number" autoComplete="off" aria-autocomplete="none" />
                        </div>

                        <div className="form-group my-4">
                            <select name="location" autoComplete="off" aria-autocomplete="none">
                                <option value="">Location</option>
                                <option value="male">Guyuk</option>
                                <option value="female">Numan</option>
                                <option value="female">Michika</option>
                            </select>
                        </div>
                        <div className="form-group my-4">
                            <input type="text" name="address" autoComplete="off" placeholder="Home address" aria-autocomplete="none" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between form-group my-4">
                            <input type="password" name="confirmpassword" placeholder="Confirm Password" autoComplete="confirm password" aria-autocomplete="none" />
                        </div>
                    </div>
                </form>

                <div className="">
                    <button onClick={() => { navigate("/admin/login"); }} className="btn login-btn my-3">Create Account</button>
                </div>
            </div>
        </div>

    )
}

