import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./modal.css"
import { ValidatePayment } from "../utils/api/member";
import { RotatingLines } from "react-loader-spinner";
import { throttle } from 'lodash';

function TransactionSuccessful({ reference, closeModal }) {
    const navigate = useNavigate();
    const [message, setMessage] = useState()
    const [payment, setPayment] = useState({
        loading: true,
        error: false,
        success: false
    })
    const [run, setRun] = useState(true)

    useEffect(() => {

        async function validatePayment(ref) {
            if (!ref) return

            try {
                const data = await ValidatePayment({ reference })
                if (data.status === "success") {
                    setPayment({
                        ...payment,
                        loading: false,
                        success: true
                    })
                    setMessage(data.message)
                }
                console.log(data)
            } catch (error) {
                console.log(error)
                setPayment({
                    ...payment,
                    loading: false,
                    error: true
                })
            }

        }
        validatePayment(reference)
    }, [])


    return (
        <div className='transaction-success-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center add-savings-div">

                {
                    payment.loading && <>
                        <center className=""><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>
                        <div className="d-flex flex-column align-items-center mt-4">
                            <p>
                                ...Loading. Please do not close this page!
                            </p>


                        </div>
                    </>
                }
                {
                    payment.success && <>
                        <Icon icon="ep:success-filled" className="icon" />
                        <div className="d-flex flex-column align-items-center mt-4">
                            <p>
                                Transaction Successful!
                            </p>
                            {/* <p style={{ fontSize: "13px" }}>Your added savings will reflect on your dashboard</p> */}

                            <p><span>{message}</span></p>

                            <Link to={"/dashboard"} onClick={closeModal}>
                                <button className="btn btn-modal mt-5">Back to Dashboard</button>
                            </Link>

                        </div>
                    </>
                }
                {
                    payment.error && <>
                        <Icon icon="ep:success-filled" className="icon" />
                        <div className="d-flex flex-column align-items-center mt-4">
                            <p>
                                Transaction Failed!
                            </p>
                            {/* <p style={{ fontSize: "13px" }}>Your added savings will reflect on your dashboard</p> */}

                            <Link to="/dashboard" onClick={closeModal}>
                                <button className="btn btn-modal mt-5">Back to Dashboard</button>
                            </Link>

                        </div>
                    </>
                }


            </div>
        </div>
    )
}

export default TransactionSuccessful