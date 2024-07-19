import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import './adminforms.css'
import header from '../../assets/logol.png';
import Login from "../../pages/forms/Login";
import Register from "./Register";

export default function FormPage() {
    const navigate = useNavigate();
    const [formMode, setFormMode] = useState("login");

    const handleFormToggle = () => {
        setFormMode(formMode === "login" ? "register" : "login");
    };



    return (

        <div className=" admin-form px-5">
            <div className="header-section  d-flex align-items-center justify-content-between header-components">
                <div className='d-flex align-items-center'>
                    <img src={header} alt="" onClick={() => { navigate("/admin/dashboard"); }} />
                    <h1>AFC Admin Dashboard</h1>
                </div>

                <div className="text ">
                    {formMode === "login"
                        ? " Don't have an account?"
                        : "Already have an account? "
                    }

                    <div className="" onClick={handleFormToggle}>
                        {formMode === "login" ? <button className='btn register-link-btn mx-1' >Register</button> : <button className='btn register-link-btn mx-1' >Login</button>}
                    </div>

                </div>
            </div>
            {formMode === "login" ? <Login /> : <Register />}
        </div>





    )
}