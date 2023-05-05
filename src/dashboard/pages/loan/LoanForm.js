import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import './loan.css';
import LoanSummary from '../../../modal/LoanSummary';

export default function LoanForm() {

    const [savingsInputType, setSavingsInputType] = useState("false");
    const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");
    const [modalIsOpen, setIsOpen] = useState(false);

    const toggleSavingsVisiblity = () => {
        setSavingsInputType(savingsInputType ? false : true);
        setSavingsIcon(!savingsIcon);
    };



    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className="my-5 px-5 loan-form">
            <h1>Loan Request Form</h1>

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
            <div className="loan-input-form mt-5">
                <form action="">
                    <div className="d-flex">
                        <div>
                            <input type="number" name="loan" placeholder='Loan Amount' id="" />
                            <select name="repaymethod" id="">
                                <option value="">Repayment Method</option>
                                <option value="">Instant (my account)</option>
                            </select>
                        </div>
                        <div>
                            <select name="repaymethod" id="">
                                <option value="">Purpose</option>
                                <option value="Personal">Personal</option>
                                <option value="Family">Family</option>
                            </select>
                            <select name="repaymethod" id="">
                                <option value="">Repayment Period (in months) </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>
                </form>
                <p className="note mt-5 ">
                    This loan is granted at the rate of 6% and subject to ability to repay within 12 months. The loan is granted at the rate of 6 percent per annum This loan is granted at the rate of 6% and subject to ability to repay within 12 months. The loan is granted at the rate of 6 percent per annum
                </p>

                <button onClick={openModal} className='btn next-btn mt-5'>
                    Next
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className={{
                    base: 'modal-base',
                    afterOpen: 'modal-base_after-open',
                    beforeClose: 'modal-base_before-close'
                }}
                overlayClassName={{
                    base: 'overlay-base',
                    afterOpen: 'overlay-base_after-open',
                    beforeClose: 'overlay-base_before-close'
                }}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={2000}>
                <LoanSummary />
            </Modal>



        </div>
    )
}