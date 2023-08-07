import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import "../modal.css";
import DatePicker from "react-datepicker";

function ScheduleSavingsPlans({ closeModal, selectedCategory }) {

    const [savingsData, setSavingsData] = useState({});
    const [savingCat, setSavingCat] = useState([]);
    const [showCustom, setShowCustom] = useState(false)
  

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

    const [startDate, setStartDate] = useState(new Date());
   
    return (
        <div className='add-savings-modal p-4 my-4' onRequestClose={closeModal}>
            <div className="d-flex flex-column add-savings-div">
                <p onClick={closeModal} className="d-flex align-items-center mx-5" >
                    <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
                    Scheduled Savings
                </p>
                <div className="d-flex flex-column align-items-center mt-4">
                    <p>
                        Schedule monthly savings into your cooperative account
                    </p>
                    <span>You can cancel scheduled savings at anytime</span>
                    <form action="" className="d-flex flex-column align-items-center">
                        <input type="number" name="amount" placeholder="Amount to save" min="0" required />
                        <select name="category"
                            value={savingsData?.category} onChange={handleChange}
                            id="contained-button-file">
                            <option value="" required>Savings Category</option>
                            {
                                savingCat?.map((item, i) => <option key={i} value={item}>{item}</option>)
                            }
                            <option value="Custom" required>Add New Category</option>
                        </select>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </form>
                    <button className="btn btn-modal mt-5">Next</button>


                </div>

            </div>

        </div>
    )
}

export default ScheduleSavingsPlans