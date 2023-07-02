import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './forms.css';
import { Icon } from '@iconify/react';
import header from '../../assets/logol.png';

export default function Login() {
    const navigate = useNavigate();
    let location = useLocation();


    const [inputType, setInputType] = useState("true");
    const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");

    const toggleSavingsVisibility = () => {
        setInputType(inputType ? false : true);
        setSavingsIcon(!savingsIcon);
    };



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
                        <input type="email" name="email" placeholder="Email address" autoComplete="off" aria-autocomplete="none" />
                    </div>

                    <div className="d-flex align-items-center justify-content-between form-group my-4">
                        <input type={!inputType ? "text" : "password"} name="password" placeholder="@johndeo08" autoComplete="off" aria-autocomplete="none" />
                        <div onClick={toggleSavingsVisibility}>
                            <Icon icon={savingsIcon ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                        </div>
                    </div>
                </form>

                <div className="">

                    <button onClick={() => { navigate("/admin/dashboard"); }} className="btn login-btn my-3">Log In</button>
                </div>

                <p className="reset-password">Forgotten Password? <a href="">Reset Here</a></p>
            </div>  
            </center>
            
        </div>
    );
}
