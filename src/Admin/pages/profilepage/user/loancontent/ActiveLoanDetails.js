import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, TablePagination } from '@mui/material';
import userData from '../sidebar_content/UsersInfo.json';



export default function ActiveLoanDetails() {
    const user = userData.users[0]; // Assuming you want to display the information for the first user
    const activeLoan = [
        { label: 'Loan Amount', value: user.activeLoan.amount },
        { label: 'Repayment Period', value: user.activeLoan.repaymentPeriod },
        { label: 'Repayment Start Date', value: user.activeLoan.repaymentStartDate },
        { label: 'Repayment End Date', value: user.activeLoan.repaymentEndDate },
        { label: 'Amount Payable', value: user.activeLoan.amountPayable },
        { label: 'Repayment Per Month Payable', value: user.activeLoan.repaymentPerMonthPayable },
        { label: 'Amount Paid', value: user.activeLoan.amountPaid },
        { label: 'Outstanding Balance', value: user.activeLoan.outstandingBalance },
        { label: 'Next Payment  Date', value: user.activeLoan.nextPaymentDate },


    ];
    const loanData = [
        { id: 1, action: 'Loan Repayment', date: '12 June, 2023', amount: 34500, method: 'Card withdrawal' },
        { id: 2, action: 'Loan Repayment', date: '12 December, 2023', amount: 35500, method: 'Savings withdrawal' },
        // Add more loan data here
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
                            {loanData.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell>{loan.action}</TableCell>
                                    <TableCell>{loan.date}</TableCell>
                                    <TableCell>{loan.amount}</TableCell>
                                    <TableCell>{loan.method}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}