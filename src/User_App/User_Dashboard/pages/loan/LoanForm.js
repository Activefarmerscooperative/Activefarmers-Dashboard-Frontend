import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import './loan.css';
import LoanSummary from '../../../../modal/LoanSummary';
import { toast } from "react-toastify";
import SavingsWallet from '../../../../component/SavingsWallet';
import PaymentAccount from "../../../../component/PaymentAccount";


export default function LoanForm({ user }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [loanData, setLoanData] = useState({})

    useEffect(() => {
        if (user.regCompletePercent < 100) {
            toast.info(`Your profile is ${user.regCompletePercent}% completed. Please complete your profile to be eligible for Loan.`)
            navigate("/dashboard/guarantor", { state: { requestTab: true }, replace: true })
        }
    }, [user])
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
        if (!loanData.amount || !loanData.repaymentMethod || !loanData.repaymentPeriod || !loanData.paymentMethod || loanData.paymentMethod === "") return toast.error("All values are required.")
        openModal()
    }


    return (
        <div className="py-2 px-4 loan-form">
            <h1>Loan Request Form</h1>
            <div className="savings-wallet-category">

                <SavingsWallet />
            </div>
            <p className="note mt-4">Please note that Loan request can not exceed five times (5X)  your savings, you’re eligible for a maximum loan of up to 450,000 NGN </p>
            <div className="loan-input-form my-3">
                <form>
                    <div className="row">
                        <div className='col-md-6 col-sm-6'><input type="number" name="amount" value={loanData?.amount} onChange={handleChange} placeholder='Loan Amount' /></div>
                        <div className='col-md-6 col-sm-6'><select name="repaymentMethod" value={loanData?.repaymentMethod} onChange={handleChange}>
                            <option value="">Repayment Method</option>
                            <option value="Savings">From Savings</option>
                            <option value="">From Bank account (mandate form)</option>
                            <option value="Card">From account (Saved Debit Card)</option>
                        </select></div>
                        <div className='col-md-6 col-sm-6'><PaymentAccount

                            withdrawalData={loanData}
                            setWithdrawalData={setLoanData} /></div>
                        <div className='col-md-6 col-sm-6'><select name="repaymentPeriod" value={loanData?.repaymentPeriod} onChange={handleChange}>
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
                        </select></div>

                    </div>
                </form>
                <p className="note mt-4 ">
                    NB: This loan is granted at the rate of 15% and subject to ability to repay within maximum of 12 months. Loan deduction will commence a month after loan approval
                </p>

                <button onClick={nextPage} className='btn submit-btn my-3'>
                    Next
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
                shouldCloseOnOverlayClick={true}>
                <LoanSummary
                    closeModal={closeModal}
                    loanData={loanData}
                />
            </Modal>



        </div>
    )
}