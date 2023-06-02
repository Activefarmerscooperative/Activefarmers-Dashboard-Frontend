import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'
import LoanSuccessful from './LoanSuccessful';
import AddCardRequest from './AddCardRequest';

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
    <div className='loan-summary-modal p-4 my-4'>
      <div className="d-flex flex-column loan-summary-div">
        <a href="/dashboard/loan" className="back-to d-flex  align-items-center mx-5" >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Loan Request Summary
        </a>
        <div className="d-flex flex-column align-items-center mb-2">
          <ul className="loan-info my-3">
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
                15%</span>
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
                230,000 NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment per month :</p>
              <hr />
              <span>
                57,000 NGN</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Start Date :</p>
              <hr />
              <span>
                5th June - 5th November 2023</span>
            </li>
            <li className='d-flex align-items-center my-3'>
              <p>
                Repayment Method :</p>
              <hr />
              <span>
                Saved debit card</span>
            </li>
          </ul>


          <div className='d-flex align-items-start justify-content-around'>
            <a href="">
              <button onClick={() => { navigate("/dashboard/loan"); }} className="btn btn-modal mt-4 mx-5">Edit Loan</button>
            </a>

            <div className='d-flex flex-column align-items-center mt-4 mx-5'>
              <button onClick={openModal} className="btn btn-modal ">Submit</button>
              <p className='agree text-center mt-2 '>By clicking submit, you have read our {<br />} <a href="">terms and conditions</a>  and agree to it</p>
            </div>


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
        <AddCardRequest />
      </Modal>

    </div>
  )
}

export default LoanSummary