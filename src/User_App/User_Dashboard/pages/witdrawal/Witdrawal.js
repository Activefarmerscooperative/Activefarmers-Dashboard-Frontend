import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './witdrawal.css';
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import SavingsWallet from '../../../../component/SavingsWallet';
import SelectSavingscat from "../../../../component/SelectSavingscat";
import { WithdrawalRequest } from "../../../../utils/api/member"
import PaymentAccount from "../../../../component/PaymentAccount";

export default function WitdrawalForm({ user }) {
    const navigate = useNavigate();
    const [withdrawalData, setWithdrawalData] = useState({})
    const [savingsCategory, setSavingsCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user.regCompletePercent < 100) {
            toast.info(`Your profile is ${user.regCompletePercent}% completed. Please complete your profile to be eligible for Withdrawal.`)
            navigate("/dashboard/guarantor", { state: { requestTab: true }, replace: true })
        }
    }, [user])


    const handleChange = (e) => {

        const { name, value } = e.target;
        setWithdrawalData({ ...withdrawalData, [name]: value });
    };

    async function handleSubmit() {

        if (!withdrawalData.amount || !withdrawalData.category || !withdrawalData.paymentMethod || withdrawalData.paymentMethod === "") return toast.error("Please enter all values.")
        if (!window.confirm("Are you sure you want to submit withdrawal request?")) return
        setIsLoading(true)
        try {
            const { message } = await WithdrawalRequest(withdrawalData);
            toast.success(`${message}`)
            navigate("/dashboard/home", { replace: true })
        } catch (error) {
            if (error) {
                console.log(error)
                toast.error(error)
                toast.error(error?.message)
                toast.error(error?.error)

            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="my-4 px-4 withdrawal-form">
            <h1>Savings Withdrawal Form</h1>
            <div className="savings-wallet-category">

                <SavingsWallet
                    setSavingsCategory={setSavingsCategory}
                />
            </div>


            <p className="note my-4">Withdrawal amount can not be more than savings balance. </p>
            <div className="withdrawal-input-form mt-5">
                <form action="">
                    <div className="d-flex flex-column ">
                        <div className='d-flex '>
                            <input type="number" value={withdrawalData?.amount} onChange={handleChange} name="amount" placeholder='Withdrawal Amount' min="0" required />

                            <SelectSavingscat
                                value={withdrawalData?.category}
                                handleChange={handleChange}
                                savingsCategory={savingsCategory}
                            />
                        </div>
                        <div className=''>
                            <PaymentAccount
                                withdrawalData={withdrawalData}
                                setWithdrawalData={setWithdrawalData}
                            />
                        </div>

                    </div>
                </form>
            </div>

            <p className="note mt-5 ">
                {/* Lorem ipsum dolor sit amet consectetur. Turpis posuere donec ipsum lectus cursus. Pellentesque tellus ornare id neque. Rutrum fringilla molestie lao */}
            </p>

            {isLoading && <center className="btn next-btn mt-5"><RotatingLines width="20px" strokeColor="#1B7B44" strokeWidth="3" /></center>}
            {!isLoading && <button onClick={handleSubmit} className="btn next-btn mt-5">Submit</button>}

        </div>
    )
}