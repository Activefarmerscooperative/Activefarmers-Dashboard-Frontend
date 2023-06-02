import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../login.css';
import { Icon } from '@iconify/react';

export default function LoginOtpVerify() {

    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowSnackbar(true); 
        setTimeout(() => {
          setShowSnackbar(false);
          navigate('/login/createpassword'); 
        }, 3000); 
      };





    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const handleChange = (e, index) => {
        const value = e.target.value;
        setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
        if (e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const value = e.clipboardData.getData("Text");
        const otpArray = value.split("").slice(0, 6);
        setOtp([...otpArray, ...otp.slice(otpArray.length)]);
    };







    return (
        <div className="login-page pt-3 px-5">
            <div className=''>

                <div className="form d-flex flex-column align-items-center mt-5 px-5 pt-3">
                    <h1>OTP Verification</h1>
                    A One Time Pin (OTP) has been sent to your registered phone number, kindly input the pin below
                    <form className='d-flex flex-column my-5'>
                        <div className="otp-input">
                            {otp.map((digit, index) => (
                                <input
                                    type="number"
                                    key={index}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onPaste={handlePaste}
                                    maxLength={1}
                                />
                            ))}
                        </div>




                        {/* {isLoading && <button className='login-btn'><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></button>}
                        {!isLoading && <button className='login-btn mt-4 mx-auto' onClick={handleClick} >Verify OTP</button>} */}
                        <button className='login-btn mt-4 mx-auto' onClick={handleClick} >Verify OTP</button>

                    </form>
                    {showSnackbar ? <button className=' d-flex align-items-center btn mx-4 profile-saved' >
                       <p>Verification Successful</p><Icon icon="clarity:success-standard-line" className='btn-icon' />
                       </button> 
                        : <p>Yet to receive OTP?<a href="" style={{ color: "#FB9129", fontWeight: "600" }}> Resend OTP (01:34)</a></p>}

                </div>
            </div>
        </div>
    )
}