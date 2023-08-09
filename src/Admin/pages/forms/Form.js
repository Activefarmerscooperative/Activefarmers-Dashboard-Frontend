import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import './forms.css'
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
        <>
            <div className="header-section container-fluid admin-form">
                <div className="d-flex align-items-center justify-content-between header-components">
                    <div className='d-flex align-items-center'>
                        <img src={header} alt="" onClick={() => { navigate("/admin/dashboard"); }}  />
                        <h1>AFC Admin Dashboard</h1>
                    </div>

                    <div className="d-flex align-items-center header-buttons">
                        <p className="mx-2 mb-0">
                            {formMode === "login"
                            ? " Don't have an account?"
                            : "Already have an account? "}
                        </p>
                        

                            <div className="" onClick={handleFormToggle}>
                            {formMode === "login" ? <button className='btn signup-btn' >Register</button> : <button className='btn signup-btn' >Login</button>}
                            </div>
                        
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-5">
                {formMode === "login" ? <Login /> : <Register />}
            </div>
        </>

    )
}