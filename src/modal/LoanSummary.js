import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"
import LoanSuccessful from './LoanSuccessful';
import { LoanRequest } from "../utils/api/member"
import { toast } from "react-toastify";

function LoanSummary({ closeModal, loanData }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [rePaymentStart, setPaymentStart] = useState("")

  useEffect(() => {
    // Set The Repayment Date
    // Get current date
    let currentDate = new Date();
    // Check if it's December
    if (currentDate.getMonth() === 11) { // December has index 11
      // Increment the year
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    // Add one month to the current date
    currentDate.setMonth(currentDate.getMonth() + 1);
    // Format the date string
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    var dateString = currentDate.toLocaleString('en-US', options);
    setPaymentStart(dateString)
  }, [loanData])


  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }

  async function handleSubmit() {
    if (!loanData.amount || !loanData.repaymentPeriod || !loanData.repaymentMethod) return toast.error("Please enter all values.")
    setIsLoading(true)
    try {
      await LoanRequest(loanData);
      // toast.success(`${message}`)
      handleOpen()
    } catch (error) {
      console.log(error)
      if (error.status === "success") {
        toast.error(error?.message)
        navigate("/dashboard/guarantor", { replace: true })
      }
      toast.error(error)
      toast.error(error?.error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className='loan-summary-modal p-4 my-5'>
      <div className="d-flex flex-column loan-summary-div">
        <a href="/dashboard" className="d-flex align-items-center mx-5" >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Add Savings
        </a>
        <div className="d-flex flex-column align-items-center mt-3">
          <ul className="loan-info my-2">
            <li className='d-flex align-items-center my-3'>
              <p>Loan Amount:</p>
              <hr />
              <span>{loanData.amount} NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Interest Rate :</p>
              <hr />
              <span>
                15%</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Period  :</p>
              <hr />
              <span>
                {loanData.repaymentPeriod} months</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Amount payable :</p>
              <hr />
              <span>
                {(Number(loanData.amount) * 0.15) + Number(loanData.amount)} NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Start Date :</p>
              <hr />
              <span>
                {rePaymentStart}
              </span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Method :</p>
              <hr />
              <span>{loanData.repaymentMethod === "Card" ? "Saved Debit card" : loanData.repaymentMethod}</span>
            </li>
          </ul>


          <div>
            <button onClick={closeModal} className="btn btn-modal my-2 mx-3">Edit Loan</button>

            {isLoading && <center className="btn btn-modal my-2 mx-3"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
            {!isLoading && <button onClick={handleSubmit} className="btn btn-modal my-2 mx-3">Submit</button>}

          </div>

        </div>

      </div>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={handleClose}
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
        // shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
      >
        <LoanSuccessful />
      </Modal>

    </div>
  )
}

export default LoanSummary