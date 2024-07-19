import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import "../modal.css";
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import SavingsPaymentMethod from './SavingsPaymentMethod';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify"
import { RotatingLines } from "react-loader-spinner";
import { EditScheduledSaving } from "../../utils/api/member";

function EditScheduleSavings({ closeModal, activeSavings }) {
  const [savingsData, setSavingsData] = useState({
    date: activeSavings?.scheduledDate,
    category: activeSavings?.category,
    amount: activeSavings?.amount
  })
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  function openModal() {
    setIsOpen(true);
  };
  function onCloseModal() {
    setIsOpen(false);
  }


  const handleChange = (e) => {

    const { name, value } = e.target;
    setSavingsData({ ...savingsData, [name]: value });

  };

  const editScheduledSavings = async () => {
    if (!window.confirm("Are you sure you want to update this scheduled savings to your account?")) return
    if (!savingsData.amount || !savingsData.category || !savingsData.date) return toast.error("Please enter all values.")
    setIsLoading(true)
    try {

      const { status, message } = await EditScheduledSaving(activeSavings._id, savingsData);

      setIsLoading(false)
      toast.success(message)
      closeModal()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error(error)
      toast.error(error.error)


    }
  };
  return (
    <div className='add-savings-modal px-2 py-3 my-4' >
      <div className="d-flex flex-column add-savings-div">
        <p onClick={closeModal} className="d-flex align-items-center mx-5" >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Edit Scheduled Savings
        </p>
        <div className="d-flex flex-column align-items-center mt-4">
          <p className="text-wrap">
            Schedule monthly savings into your cooperative account
          </p>
          <span>You can cancel scheduled savings at anytime</span>
          <form action="" className="d-flex flex-column align-items-center">
            <input type="number" name="amount" min="0" onChange={handleChange} required value={savingsData?.amount} />

            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            {/* <input type="text" name="newCategory" placeholder="07/22/23" /> */}
            <select name="date" value={savingsData?.date} onChange={handleChange}>
              <option value="">Select Day of month for deduction</option>
              {Array.from({ length: 30 }, (_, index) => index + 1).map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </form>
          <div className='d-flex align-items-start justify-content-around'>
            {isLoading && <center className="btn btn-modal mt-4 mx-2"><RotatingLines width="15" strokeColor="#1B7B44" strokeWidth="3" /></center>}
            {!isLoading && <button className="btn btn-modal mt-4 mx-2" onClick={closeModal}>Cancel</button>}
            {!isLoading && <button className="btn btn-modal mt-4 mx-2" onClick={editScheduledSavings} >Update</button>}
          </div>

        </div>

      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onCloseModal}
        contentLabel="Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={2000}
      >

        <SavingsPaymentMethod
          closeModal={onCloseModal} />



      </Modal>

    </div>
  )
}

export default EditScheduleSavings