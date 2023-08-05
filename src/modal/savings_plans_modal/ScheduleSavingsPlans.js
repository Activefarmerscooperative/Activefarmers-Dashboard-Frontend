
import { Icon } from '@iconify/react';
import "../modal.css";
import React, { useEffect, useState } from 'react';
import { AddScheduledSaving, SavingsCategory } from '../../utils/api/member';
import { toast } from "react-toastify"
import { RotatingLines } from "react-loader-spinner";
import SavingsPaymentMethod from './SavingsPaymentMethod';

function ScheduleSavingsPlans({ openModal, closeModal }) {
    const [savingCat, setSavingCat] = useState([])
    const [savingsData, setSavingsData] = useState({
        date: new Date(),
        category: "",
        newCategory: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showCustom, setShowCustom] = useState(false)
    const [step, setStep] = useState(1)
    const [modalData, setModalData] = useState({})


    async function fetchCategory(params) {
        try {
            const data = await SavingsCategory()
            setSavingCat(data.savingsCategories)
        } catch (error) {
            console.log(error)
            toast.error(error)
            toast.error(error?.error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])



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

    const addScheduledSavings = async () => {
        if (!window.confirm("Are you sure you want to add a scheduled savings to your account?")) return
        if (!savingsData.amount || !savingsData.category || !savingsData.date) return toast.error("Please enter all values.")
        if (savingsData.category === "Custom" && !savingsData.newCategory) return toast.error("Please enter all values.")
        setIsLoading(true)
        try {

            const { status, message,data } = await AddScheduledSaving(savingsData);
            console.log(data)
            setIsLoading(false)
            setStep(2)
            setModalData({ status, message,data })
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
            console.log(error)

        }
    };


    return (
        <>
            {step === 1 &&
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
                                <input type="number" value={savingsData?.amount} onChange={handleChange} name="amount" placeholder="Amount to save" min="0" required />
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
                            {isLoading && <center className="btn mt-5"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                            {!isLoading && <button onClick={addScheduledSavings} className="btn btn-modal mt-5">Next</button>}
                        </div>

                    </div>

                </div>}
            {
                step === 2 && <SavingsPaymentMethod
                    closeModal={closeModal}
                    data={modalData}
                />
            }
        </>

    )
}

export default ScheduleSavingsPlans