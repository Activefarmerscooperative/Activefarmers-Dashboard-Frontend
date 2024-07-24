import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import "./modal.css"
import { AddSaving } from "../utils/api/member"

import React from 'react'
import PaymentMethod from "./PaymentMethod";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function AddSavings({ selectedCategory, wallet,closeModal }) {
  const [savingCat, setSavingCat] = useState([])
  const [savingsData, setSavingsData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showCustom, setShowCustom] = useState(false)

  useEffect(() => {
    setSavingCat(wallet?.map(item => item?.category))
  }, [wallet])

  useEffect(() => {
    setSavingsData({ ...savingsData, category: selectedCategory })
  }, [savingCat])

  const handleChange = (e) => {

    const { name, value } = e.target;
    if (value === "Custom") {
      setSavingsData({ ...savingsData, [name]: value });
      setShowCustom(true)
    } else if (name === "newCategory") {
      setSavingsData({ ...savingsData, [name]: value });
    } else if (name === "category") {
      setShowCustom(false)
      setSavingsData({ ...savingsData, [name]: value, newCategory: null });
    } else {
      setSavingsData({ ...savingsData, [name]: value });
    }

  };

  const addSavings = async () => {
    if (!savingsData.amount || !savingsData.category) return toast.error("Please enter all values.")
    if (savingsData.category === "Custom" && !savingsData.newCategory) return toast.error("Please enter all values.")
    setIsLoading(true)
    try {

      const { data, message } = await AddSaving(savingsData);
      toast.success(`${message} Opening payment window, do not close the page.`)
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
    <div className='add-savings-modal p-4' id='AddSavings'>
      <div className="d-flex flex-column add-savings-div">
        <p onClick={closeModal} className="d-flex align-items-center mx-2" >
          <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
          Add Savings
        </p>
        <div className="d-flex flex-column align-items-center mt-4">
          <p className="w-auto text-wrap">
            How much would you like to add to your savings?
          </p>
          <form action="" className="d-flex flex-column align-items-center">
            <input type="number" value={savingsData?.amount} onChange={handleChange} name="amount" placeholder="Add Amount" min="0" required />
            <select name="category"
              value={savingsData?.category} onChange={handleChange}
              id="contained-button-file">
              <option value="" required>Savings Category</option>
              {
                savingCat?.map((item, i) => <option key={i} value={item}>{item}</option>)
              }
              <option value="Custom" required>Add New Category</option>
            </select>
            {//Show this input when user selects custom category
              showCustom && <input type="text" value={savingsData?.newCategory} onChange={handleChange} name="newCategory" placeholder="Enter new savings category" />
            }

          </form>
          {isLoading && <center className="btn mt-5"><RotatingLines width="15" strokeColor="#1B7B44" strokeWidth="3" /></center>}
          {!isLoading && <button onClick={addSavings} className="btn btn-modal mt-5">Next</button>}


        </div>

      </div>

    </div>
  )
}

export default AddSavings