import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"
import { FetchSavingsCategory } from "../utils/api/general"
import { AddSaving } from "../utils/api/member"

import React from 'react'
import PaymentMethod from "./PaymentMethod";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function AddSavings() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [savingCat, setSavingCat] = useState([])
  const [savingsData, setSavingsData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    // Fetch location info on component mount.
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchSavingsCategory({ signal })

    return () => {
      abortController.abort(); // Cancel the request on component unmount
    };
  }, [])

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  
  const fetchSavingsCategory = async (signal) => {
    try {
      const data = await FetchSavingsCategory(signal);
      setSavingCat(data.savingsCategory);
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }
  };
  const handleChange = (e) => {

    const { name, value } = e.target;
    setSavingsData({ ...savingsData, [name]: value });
  };

  const addSavings = async () => {
    if (!savingsData.amount || !savingsData.category) return toast.error("Please enter all values.")
    setIsLoading(true)
    try {
      const {data, message} = await AddSaving(savingsData);
      toast.success(`${message} Opening payment window`)
      window.location.replace(data.authorization_url);
    } catch (error) {
      if (error) {
        setIsLoading(false)
        toast.error(error.message)
        console.log(error)
      }
    }
  };

  return (
    <div className='add-savings-modal p-4 my-4' id='AddSavings'>
      <div className="d-flex flex-column add-savings-div">
        <a href="/dashboard" className="d-flex align-items-center mx-5" >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Add Savings
        </a>
        <div className="d-flex flex-column align-items-center mt-4">
          <p>
            How much would you like to add to your savings?
          </p>
          <form action="" className="d-flex flex-column align-items-center">
            <input type="number" value={savingCat?.amount} onChange={handleChange} name="amount" placeholder="Add Amount" min="0" required />
            <select name="category"
              value={savingCat?.category} onChange={handleChange}
              id="contained-button-file">
              <option value="" required>Savings Category</option>
              {
                savingCat?.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
              }
            </select>
          </form>
          {isLoading && <center className="btn member-btn"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
          {!isLoading && <button onClick={addSavings} className="btn btn-modal mt-5">Next</button>}


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