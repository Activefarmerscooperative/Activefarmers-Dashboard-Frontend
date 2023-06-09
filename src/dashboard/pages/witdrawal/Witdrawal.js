import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './witdrawal.css';
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import SavingsWallet from '../../../component/SavingsWallet';
import SelectSavingscat from "../../../component/SelectSavingscat";
import { WithdrawalRequest } from "../../../utils/api/member"

export default function WitdrawalForm() {
    const navigate = useNavigate();
    const [withdrawalData, setWithdrawalData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target;
        setWithdrawalData({ ...withdrawalData, [name]: value });
    };

    async function handleSubmit() {
        if (!withdrawalData.amount || !withdrawalData.category) return toast.error("Please enter all values.")
        setIsLoading(true)
        try {
            const { message } = await WithdrawalRequest(withdrawalData);
            toast.success(`${message}`)
            navigate("/dashboard/home", { replace: true })
        } catch (error) {
            if (error) {
                console.log(error)

                toast.error(error?.message)
                toast.error(error?.error)

            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="my-5 px-5 withdrawal-form">
            <h1>Savings Withdrawal Form</h1>
            <SavingsWallet />

            <p className="note my-4">Withdrawal amount can not be more than savings balance. </p>
            <div className="withdrawal-input-form mt-5">
                <form action="">
                    <div className="d-flex flex-column ">
                        <div className='d-flex '>
                            <input type="number" value={withdrawalData?.amount} onChange={handleChange} name="amount" placeholder='Withdrawal Amount' min="0" required />

                            <SelectSavingscat
                                value={withdrawalData?.category}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className=''>
                            <select name="repaymethod" id="" className=''>
                                <option value="">Payment Method</option>
                                <option value="">Instant (my account)</option>
                            </select>
                            <div name="" id="" className='d-none'></div>
                        </div>

                    </div>
                </form>
            </div>

            <p className="note mt-5 ">
                Lorem ipsum dolor sit amet consectetur. Turpis posuere donec ipsum lectus cursus. Pellentesque tellus ornare id neque. Rutrum fringilla molestie lao
            </p>

            {isLoading && <center className="btn next-btn mt-5"><RotatingLines width="20px" strokeColor="#1B7B44" strokeWidth="3" /></center>}
            {!isLoading && <button onClick={handleSubmit} className="btn next-btn mt-5">Submit</button>}

        </div>
    )
}