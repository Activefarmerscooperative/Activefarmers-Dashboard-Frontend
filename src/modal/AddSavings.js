import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'
import PaymentMethod from "./PaymentMethod";

function AddSavings() {
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
        <a href="/dashboard/loan" className="d-flex align-items-center mx-5" >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Add Savings
        </a>
        <div className="d-flex flex-column align-items-center mt-4">
          <p>
            How much would you like to add to your savings?
          </p>
          <form action="" className="d-flex flex-column align-items-center">
            <input type="number" name="" placeholder="Add Amount" id="" />
            <select name=""
              id="contained-button-file">
              <option value="">Savings Category</option>
              <option value="regular">Regular Savings</option>
              <option value="project">Project Savings</option>
              <option value="Pilgrimage">Pilgrimage Savings</option>
              <option value="pikin">My Pikin Savings</option>
            </select>
          </form>
          <button onClick={openModal} className="btn btn-modal mt-5">Next</button>
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
        <PaymentMethod />
      </Modal>
    </div>
  )
}

export default AddSavings