import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import './loan.css';
import LoanSummary from '../../../modal/LoanSummary';
import { toast } from "react-toastify";
import SavingsWallet from '../../../component/SavingsWallet';


export default function LoanForm() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [ loanData, setLoanData] = useState({})


    const handleChange = (e) => {

        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    function nextPage() {
        if (!loanData.amount || !loanData.repaymentMethod || !loanData.repaymentPeriod) return toast.error("All values are required.")
        openModal()
    }


    return (
        <div className="my-5 px-5 loan-form">
            <h1>Loan Request Form</h1>
            <SavingsWallet />
            <p className="note my-4">Please note that Loan request can not exceed five times (5X)  your savings, you’re eligible for a maximum loan of up to 450,000 NGN </p>
            <div className="loan-input-form mt-5">
                <form>
                    <div className="d-flex">
                        <div>
                            <input type="number" name="amount" value={loanData?.amount} onChange={handleChange} placeholder='Loan Amount' />
                            <select name="repaymentMethod" value={loanData?.repaymentMethod} onChange={handleChange}>
                                <option value="">Repayment Method</option>
                                <option value="Savings">From Savings</option>
                                <option value="">From Bank account (mandate form)</option>
                                <option value="Card">From account (Saved Debit Card)</option>
                            </select>
                        </div>
                        <div>
                            <select name="paymentMethod">
                                <option value="">Payment Method</option>
                                <option value="">Instant (my account)</option>
                            </select>
                            <select name="repaymentPeriod" value={loanData?.repaymentPeriod} onChange={handleChange}>
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
                NB: This loan is granted at the rate of 15% and subject to ability to repay within maximum of 12 months. Loan deduction will commence a month after loan approval
                </p>

                <button onClick={nextPage} className='btn next-btn mt-5'>
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
                <LoanSummary
                    closeModal={closeModal}
                    loanData={loanData}
                />
            </Modal>



        </div>
    )
}