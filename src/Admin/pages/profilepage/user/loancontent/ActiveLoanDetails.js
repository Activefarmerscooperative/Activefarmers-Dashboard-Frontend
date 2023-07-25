import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, TablePagination } from '@mui/material';
//import userData from '../sidebar_content/UsersInfo.json';
import { toast } from "react-toastify";
import { UserLoan } from "../../../../../utils/api/admin.js"
import { LoanHistory } from "../../../../../utils/api/admin.js"
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query'

const userLoan = async (key, user) => {
    if (!user) return
    try {
        let loan = await UserLoan(user)
        let loanHistory = await LoanHistory(user)
        const res = Promise.all([loan, loanHistory])        
        return res

    } catch (error) {
        console.log("not working")
        toast.error(error.error);
    }
};

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function formatAmountWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ActiveLoanDetails(userData) {
    const [loanDetails, setLoanDetails] = useState([])
    const [loanData, setLoanData] = useState([])
    const [userInfo, setData] = useState()
    const [sTat, setSTat] = useState([])
    const [stat, setStat] = useState([])
    const [createdAt, setCreatedAt] = useState("")
    const [rePaymentStart, setPaymentStart] = useState("")
    const [nextPayment, setNextPayment] = useState("")
    const [rePaymentEnd, setRepaymentEnd] = useState("")
    const id = userData?.Id
    const { data, status } = useQuery(['userLoan', id], userLoan);
    useEffect(() => {
        if (data) {
            const loans = data[0]
            const loansHistory = data[1]

            if (loans) {
                const { message, userLoan } = loans;
                setSTat(message);
                setLoanDetails(userLoan);
            }
            if (loansHistory) {
                const { message, userLoans } = loansHistory;
                setStat(message);
                setLoanData(userLoans);
            }
        }
    }, [data]);
    const amountPayable = parseFloat(((loanDetails?.amount || 0)*1.15).toFixed(2))
    const monthlyPayment = parseFloat((amountPayable / (loanDetails?.repaymentPeriod || 1)).toFixed(2))
    const outstandingBalance = (amountPayable - (loanDetails?.amountPaid || 0))
    const startDate = loanDetails?.createdAt
    var options = { day: 'numeric', month: 'long', year: 'numeric' };

    useEffect(() => {
        if (loanDetails){
            const dateObj = new Date(startDate);
            const startsDate = dateObj.toLocaleString('en-US', options)
            setCreatedAt(startsDate)
        }
    },[loanDetails])

    useEffect(() => {
        if (loanDetails) {
            let currentDate = new Date(startDate);
            if (currentDate.getMonth() === 11) { // December has index 11
                // Increment the year
                currentDate.setFullYear(currentDate.getFullYear() + 1);
            }
            // Add one month to the current date
            currentDate.setMonth(currentDate.getMonth() + 1);
            // Format the date string
        
            var dateString = currentDate.toLocaleString('en-US', options);
            setPaymentStart(dateString)
        }
    }, [loanDetails, startDate])

    useEffect(() => {
        if (loanDetails) {
            let dayObj = new Date(startDate);
            let currentDate = new Date();

            if (currentDate.getMonth() === 11) { // December has index 11
            // Increment the year
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            }

            // Add one month to the current date
            currentDate.setMonth(currentDate.getMonth() + 1);

            // Set the day to the day (date) it was created
            currentDate.setDate(dayObj.getDate());

            // Format the date string
            var dateString = currentDate.toLocaleString('en-US', options);
            setNextPayment(dateString);
        }
    }, [loanDetails, startDate]);

    useEffect(() => {
        if (loanDetails) {
            let currentDate = new Date(startDate);
            // Add one year to the start date
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            // Format the date string
        
            var dateString = currentDate.toLocaleString('en-US', options);
            setRepaymentEnd(dateString)
        }
    }, [loanDetails, startDate])

    const activeLoan = [
        { label: 'Loan Amount', value: formatAmountWithCommas(loanDetails?.amount || 0) },
        { label: 'Repayment Period', value: formatAmountWithCommas(loanDetails?.repaymentPeriod || 0) },
        { label: 'Repayment Start Date', value: formatAmountWithCommas(rePaymentStart) },
        { label: 'Repayment End Date', value: formatAmountWithCommas(rePaymentEnd) },
        { label: 'Amount Payable', value: formatAmountWithCommas(amountPayable) },
        { label: 'Repayment Per Month Payable', value: formatAmountWithCommas(monthlyPayment) },
        { label: 'Amount Paid', value: formatAmountWithCommas("1000") },
        { label: 'Outstanding Balance', value: formatAmountWithCommas("179000") },
        { label: 'Next Payment  Date', value: formatAmountWithCommas(nextPayment) },

    ];
    
    return (
        <div>
            <div className="loan">

                <div className="d-flex justify-content-between mt-3 personalinfo-user">
                    {activeLoan.map((item, index) => (
                        <p className='d-flex flex-column info  me-5 mt-3' key={index}>
                            <span>{item.label}</span>
                            {item.value}
                        </p>
                    ))}
                </div>
                <div className="mt-5">
                    <p className="h6">Repayment Breakdown</p>
                    <Table className='mt-3'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Method</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loanData.map((loan, index) => (
                                <TableRow key={index}>
                                    <TableCell>{loan.action || "Loan Repayment"}</TableCell>
                                    <TableCell>{formatDate(loan.createdAt)}</TableCell>
                                    <TableCell>{formatAmountWithCommas(loan.amount)}</TableCell>
                                    <TableCell>{loan.repaymentMethod}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}