import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"
import LoanSuccessful from './LoanSuccessful';
import { LoanRequest } from "../utils/api/member"
import { toast } from "react-toastify";
import AddCardRequest from './AddCardRequest';

function LoanSummary({ closeModal, loanData }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
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

  console.log("LoanData Loan Summary", loanData)

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
      const { message } = await LoanRequest(loanData);
      toast.success(`${message}`)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      if (error.status === "success") {
        // toast.error(error?.message)
        handleOpen()
      }else if(error.status === "validate_card"){
        // toast.error(error?.message)
        setMessage(error?.message)
        handleOpen()
      }
      toast.error(error)
      toast.error(error?.error)
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    window.history.go(-1);
  };
  
  return (
    <div className='loan-summary-modal p-3'>
      <div className="d-flex flex-column loan-summary-div">
        <div onClick={goBack} className="back-to d-flex  align-items-center " >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Loan Request Summary
        </div>
        <div className="d-flex flex-column align-items-center mb-2">
          <ul className="loan-info my-3 p-0">
            <li className='d-flex align-items-center my-3'>
              <p>Loan Amount:</p>
              
              <span>{loanData.amount} NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Interest Rate :</p>
              
              <span>
                15%</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Period  :</p>
              
              <span>
                {loanData.repaymentPeriod} months</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Amount payable :</p>
              
              <span>
                {(Number(loanData.amount) * 0.15) + Number(loanData.amount)} NGN</span>

            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment per month :</p>
              
              <span>
                {Math.ceil(((Number(loanData.amount) * 0.15) + Number(loanData.amount)) / (loanData.repaymentPeriod)).toLocaleString({ style: 'currency' })} NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Start Date :</p>
              
              <span>
                {/* {rePaymentStart} */}
              </span>

            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Method :</p>
              
              <span>{loanData.repaymentMethod === "Card" ? "Saved Debit card" : loanData.repaymentMethod}</span>
            </li>
          </ul>


          <div className='d-flex align-items-start justify-content-around'>

            <button onClick={closeModal} className="btn btn-modal edit my-2 mx-3">Edit Loan</button>

            <div>
              {isLoading && <center className="btn btn-modal my-2 mx-3"><RotatingLines width="15" strokeColor="#1B7B44" strokeWidth="3" /></center>}
              {!isLoading && <button onClick={handleSubmit} className="btn btn-modal my-2 mx-3">Submit</button>}
              <p className='agree text-center '>By clicking submit, you have read our {<br />} <a href="">terms and conditions</a>  and agree to it</p>
            </div>

          </div>

        </div>

        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={handleClose}
          contentLabel="Example Modal"
          className="custom-modal"
          overlayClassName="custom-overlay"
          shouldCloseOnOverlayClick={true}
        >
          <AddCardRequest 
          message = {message}
          handleClose={handleClose}
          />
        </Modal>

      </div>
    </div>
  )
}

export default LoanSummary