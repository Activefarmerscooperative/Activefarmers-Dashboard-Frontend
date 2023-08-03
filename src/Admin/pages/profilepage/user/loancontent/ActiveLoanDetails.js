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
        let res = await UserLoan(user)

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
    const [loanDetails, setLoanDetails] = useState(null)
    const [repaymentData, setRepaymentData] = useState([])
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
        if (!data) return
        if (!data.userLoan) return
        setLoanDetails(data.userLoan)
        setRepaymentData([...data.userLoan?.repayment].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
    }, [data]);

    const amountPayable = parseFloat(((loanDetails?.amount || 0) * 1.15).toFixed(2))
    const monthlyPayment = parseFloat((amountPayable / (loanDetails?.repaymentPeriod || 1)).toFixed(2))
    const repayment = parseFloat(!loanDetails?.repayment[0] ? 0 : loanDetails?.repayment?.reduce((total, currentRepayment) => total + currentRepayment.amount, 0))
    // console.log(loanDetails?.amountPaid)
    const outstandingBalance = (amountPayable - repayment)
    const startDate = loanDetails?.createdAt
    var options = { day: 'numeric', month: 'long', year: 'numeric' };

    useEffect(() => {
        if (loanDetails) {
            let dateObj = new Date(startDate);

            // Add 1 month to the createdAt date
            dateObj.setMonth(dateObj.getMonth() + 1);

            // Set hours, minutes, seconds, and milliseconds to 0
            dateObj.setHours(0, 0, 0, 0);

            // Get the date without time using toLocaleDateString()
            let formattedDate = dateObj.toLocaleDateString('en-US', options);
            setPaymentStart(formattedDate);

            dateObj = new Date(startDate);
            const originalMonth = dateObj.getMonth();

            dateObj.setMonth(dateObj.getMonth() + loanDetails?.repaymentPeriod);

            // Check if the year changed after adding months
            const newMonth = dateObj.getMonth();
            if (newMonth < originalMonth) {
                dateObj.setFullYear(dateObj.getFullYear() + 1);
            }

            // Set hours, minutes, seconds, and milliseconds to 0
            dateObj.setHours(0, 0, 0, 0);

            // Get the date without time using toLocaleDateString()
            formattedDate = dateObj.toLocaleDateString('en-US', options);
            setRepaymentEnd(formattedDate);
        }

    }, [loanDetails]);


    useEffect(() => {
        if (repaymentData[0]) {
            let dateObj = new Date(repaymentData[repaymentData.length - 1].timestamp)

            // Add 1 month to the createdAt date
            dateObj.setMonth(dateObj.getMonth() + 1);

            // Set hours, minutes, seconds, and milliseconds to 0
            dateObj.setHours(0, 0, 0, 0);

            // Get the date without time using toLocaleDateString()
            let formattedDate = dateObj.toLocaleDateString('en-US', options);
            setNextPayment(formattedDate);
        }
    }, [repaymentData])

    const activeLoan = [
        { label: 'Loan Amount', value: formatAmountWithCommas(loanDetails?.amount || 0) },
        { label: 'Repayment Period', value: formatAmountWithCommas(loanDetails?.repaymentPeriod || 0) },
        { label: 'Repayment Start Date', value: rePaymentStart },
        { label: 'Repayment End Date', value: rePaymentEnd },
        { label: 'Amount Payable', value: formatAmountWithCommas(amountPayable) },
        { label: 'Repayment Per Month Payable', value: formatAmountWithCommas(monthlyPayment) },
        { label: 'Amount Paid', value: formatAmountWithCommas(repayment) },
        { label: 'Outstanding Balance', value: formatAmountWithCommas(outstandingBalance) },
        { label: 'Next Payment  Date', value: nextPayment },

    ];

    return (
        <div>
            <div className="loan">

                <div className="d-flex justify-content-between mt-3 personalinfo-user">
                    {
                        !loanDetails && <h6>No Active Loan</h6>
                    }
                    {
                        loanDetails && <>
                            {activeLoan.map((item, index) => (
                                <p className='d-flex flex-column info  me-5 mt-3' key={index}>
                                    <span>{item.label}</span>
                                    {item.value}
                                </p>
                            ))}
                        </>
                    }

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

                            {

                                repaymentData?.map((loan, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{"Loan Repayment"}</TableCell>
                                        <TableCell>{formatDate(loan.timestamp)}</TableCell>
                                        <TableCell>{formatAmountWithCommas(loan.amount)}</TableCell>
                                        <TableCell>{loan?.paymentMethod}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}