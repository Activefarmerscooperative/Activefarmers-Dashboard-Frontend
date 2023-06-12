import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query'
import { BankDetails } from '../utils/api/member';
import { toast } from "react-toastify";

const fetchBankDetails = async (key) => {
    try {

        const res = await BankDetails()
        return res

    } catch (error) {
        toast.error(error?.error);
    }
};
const PaymentAccount = ({ withdrawalData, setWithdrawalData }) => {
    const [bankAccount, setBankAccount] = useState("")
    const navigate = useNavigate();
    // React query fecth data
    const { data, status } = useQuery(['fetchBankDetails'], fetchBankDetails)

    useEffect(() => {
        if (!data) return
        setBankAccount(data.bank_details)
    }, [data])


    function handleChange(e) {
        const { name, value } = e.target;
        if (value === "New") {
            navigate("/dashboard/guarantor")
        } else if(withdrawalData) {
            setWithdrawalData({ ...withdrawalData, [name]: value });
        }
    }

    return (

        <select name="paymentMethod" id="" className='' onChange={handleChange}>
            <option value="">Payment Method</option>
            <option value={bankAccount?.accountNumber}>{bankAccount?.accountNumber} - {bankAccount?.bankName} ({bankAccount?.accountName})</option>
            <option value="New">Add another account</option>
        </select>
    )
}

export default PaymentAccount