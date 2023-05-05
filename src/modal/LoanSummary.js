import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'
import LoanSuccessful from './LoanSuccessful';

function LoanSummary() {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
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
              <span>200,000 NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Interest Rate :</p>
              <hr />
              <span>
                6%</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Period  :</p>
              <hr />
              <span>
                Four (4) months</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Amount payable :</p>
              <hr />
              <span>
                212,000 NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Start Date :</p>
              <hr />
              <span>
                5th June 2023</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Method :</p>
              <hr />
              <span>
                Saved debit card</span>
            </li>
          </ul>


          <div>
            <a href="">
              <button onClick={() => { navigate("/dashboard/loan"); }} className="btn btn-modal my-2 mx-3">Edit Loan</button>
            </a>

            <button onClick={openModal} className="btn btn-modal my-2 mx-3">Submit</button>

          </div>

        </div>

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
        closeTimeoutMS={2000}
      >
        <LoanSuccessful />
      </Modal>

    </div>
  )
}

export default LoanSummary