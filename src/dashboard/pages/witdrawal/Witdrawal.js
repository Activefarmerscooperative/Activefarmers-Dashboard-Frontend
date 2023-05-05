import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import './witdrawal.css';

export default function WitdrawalForm() {

    const [savingsInputType, setSavingsInputType] = useState("false");
    const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");

    const toggleSavingsVisiblity = () => {
        setSavingsInputType(savingsInputType ? false : true);
        setSavingsIcon(!savingsIcon);
    };


    return (
        <div className="my-5 px-5 witdrawal-form">
            <h1>Savings Witdrawal Form</h1>

            <div className="px-3 card savings-bal">

                <p className='text-start savings-title'>Savings Balance</p>

                <form action="" >
                    <div className="form-group d-flex align-items-center">
                        <input
                            type={savingsInputType ? "text" : "password"}
                            name="savings"
                            id="savings"
                            value={"90,000 NGN"}
                            placeholder='' />
                        <div onClick={toggleSavingsVisiblity}>
                            <Icon icon={savingsIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                        </div>

                    </div>
                </form>
            </div>
            <p className="note my-4">Please note that Loan request can not exceed two times of your savings </p>
            <div className="witdrawal-input-form mt-5">
                <form action="">
                    <div className="d-flex flex-column ">
                        <div className='d-flex '>
                            <input type="number" name="loan" placeholder='Withdrawal Amount' id="" />

                            <select name="repaymethod" id="">
                                <option value="">Purpose</option>
                                <option value="Personal">Personal</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>
                        <div className='mx-5'>
                            <select name="repaymethod" id="" className='mx-1'>
                                <option value="">Repayment Method</option>
                                <option value="">Instant (my account)</option>
                            </select>
                            <select name="" id="" className='d-none'></select>
                        </div>

                    </div>
                </form>
            </div>

            <p className="note mt-5 ">
                Lorem ipsum dolor sit amet consectetur. Turpis posuere donec ipsum lectus cursus. Pellentesque tellus ornare id neque. Rutrum fringilla molestie lao
            </p>

            <button className='btn next-btn mt-5'>
                Submit
            </button>
        </div>
    )
}