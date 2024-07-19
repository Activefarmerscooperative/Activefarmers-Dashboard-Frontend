import React, { useState, useEffect } from "react";
import { GetTransactions } from '../utils/api/member';
import { useQuery } from 'react-query'
import Modal from 'react-modal';
import {
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead, TableContainer, Paper
} from "@mui/material";
import { saveAs } from 'file-saver'; 
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from "react-router-dom";

import LoanRequestSummary from "../modal/LoanRequestSummary";
import SavingsWithdrawalSummary from "../modal/SavingsWithdrawalSummary";

const fetchTransactions = async (key) => {

    try {
        const res = await GetTransactions();
        return res

    } catch (error) {
        // toast.error(error.error);
    }
};

function RecentTransaction() {

    const location = useLocation();
    const navigate = useNavigate();

   

    const [isOpen, setIsOpen] = useState(false);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    function openModal(transaction) {
        console.log("transactions:", transaction);
        console.log("transactions status:", transaction.item.status);
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const [transactions, setTransactions] = useState([])

    // React query fecth data
    const { data, status } = useQuery(['fetchTransactions'], fetchTransactions)

    useEffect(() => {
        if (!data) return
        setTransactions(data)
    }, [data])

    function handleSort(sortParams) {
        if (sortParams === "All") {
            return setTransactions(data)
        }
        setTransactions(data?.filter(item => item.type === sortParams))
    }


    const handleDownload = () => {
        // Convert the table data to CSV format
        const csv = transactions.map(row => {
            // Exclude the icon and modal trigger cells
            return [
                row.type,
                new Date(row.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                row.amount,
                row.item?.status
            ].join(',');
        }).join('\n');

        // Create a Blob with the CSV data
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

        // Save the Blob as a file
        saveAs(blob, 'transactions.csv');
    };





    return (
        <>
            <div className="d-flex align-items-center justify-content-between top-nav">
                <p>Recent Transaction</p>
                <div className="d-flex top-nav-btn">
                    <div className='d-flex align-items-center justify-content-between sort px-2 mx-2'>
                        <label htmlFor="contained-button-file" className='d-flex align-items-center'>
                            <select name="" onChange={(e) => handleSort(e.target.value)}
                                id="contained-button-file">
                                <option value="All">Sort By</option>
                                {/* <option value="">all</option> */}
                                <option value="savings">Savings</option>
                                <option value="withdrawal">Withdrawal</option>
                                <option value="loan">Loan</option>
                            </select>
                        </label>
                    </div>

                    <div className="d-flex align-items-center justify-content-center download-icon mx-3">
                        <Icon icon="material-symbols:download-rounded" className='icon' onClick={handleDownload} />
                    </div>

                    {/* <button onClick={() => { navigate("/dashboard/transactions"); }} className='btn view-all-btn'>
                        View All
                    </button> */}
                    { !(location.pathname === "/dashboard/transactions") ? <button onClick={() => navigate("/dashboard/transactions")} className='btn view-all-btn'>
                            View All
                        </button> : ""}

                </div>
            </div>
            <div className="d-flex justify-content-center table mt-3">

                <TableContainer component={Paper} className="table-container">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell >Date</TableCell>
                                <TableCell >Amount(NGN)</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions?.map((row) => {
                                let color = (row.item?.status === "Pending") ? "#FB9129" :
                                    (row.item?.status === "Rejected") ? "#FF0000" : "#0D9068";
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell ><input type="checkbox" name="" id="" style={{ borderColor: "#D7D7D7" }} /></TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.type}
                                        </TableCell>
                                        <TableCell >
                                            {new Date(row.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </TableCell>
                                        <TableCell >{row.amount}</TableCell>
                                        <TableCell >
                                            <div className="d-flex align-items-center">
                                                <Icon icon="material-symbols:circle-outline" style={{ width: "20px", height: "20px", color: `${color}`, fontWeight: "900" }} />
                                                <p className='my-0 mx-2' style={{ color: `${color}` }}>{row.item?.status}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell >
                                            <Icon icon="mdi:open-in-new" onClick={() => openModal(row)} style={{
                                                color: `${color}`, width: "20px", height: "20px", cursor: "pointer"
                                            }} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    shouldCloseOnOverlayClick={true}
                >
                    {modalIsOpen && selectedTransaction && (
                        <>
                            {selectedTransaction.type === "loan" ? (
                                <LoanRequestSummary closeModal={closeModal} loanData={selectedTransaction} />
                            ) : <SavingsWithdrawalSummary
                                closeModal={closeModal}
                                transactionData={selectedTransaction}
                                type={selectedTransaction.type}
                            />}
                        </>
                    )}

                </Modal>
            </div>
        </>

    )
}

export default RecentTransaction