import { useState } from 'react';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import TransactionSuccessful from './TransactionSuccessful';
import "./modal.css"



import React from 'react'

function PaymentMethod() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className='add-savings-modal p-4 my-4'>
      <div className="d-flex flex-column add-savings-div">
        <a href="/dashboard" className="d-flex align-items-center mx-5" >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Add Savings
        </a>
        <div className="d-flex flex-column align-items-center mt-4">
          <p>
            Select Payment Method to add savings
          </p>

          <div className="payment-methods">
            <div className="d-flex align-items-center pay-option">
              <Icon icon="material-symbols:credit-card" className="payment-icon" />
              <p>Card Payment {<br />} <span>Add money with your debit card</span></p>
            </div>
            <div className="d-flex align-items-center pay-option">
              <Icon icon="mdi:bank" className="payment-icon" />
              <p>Card Payment {<br />} <span>Add money with your debit card</span></p>
            </div>
            <div className="d-flex align-items-center pay-option">
              <Icon icon="ph:hash-bold" className="payment-icon" />
              <p>Card Payment {<br />} <span>Add money with your debit card</span></p>
            </div>
          </div>

          <button onClick={openModal} className="btn btn-modal mt-2">Next</button>
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
        <TransactionSuccessful />
      </Modal>
    </div>
  )
}

export default PaymentMethod