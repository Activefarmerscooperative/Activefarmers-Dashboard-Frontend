import React, { useState, useEffect } from "react";
import { GetTransactions } from '../../../utils/api/member';
import { useQuery } from 'react-query'
import {
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead, TableContainer, Paper, Box, TablePagination
} from "@mui/material";
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import LoanRequestSummary from "../../../modal/LoanRequestSummary";
import SavingsWithdrawalSummary from "../../../modal/SavingsWithdrawalSummary";
import RecentTransaction from "../../../component/RecentTransaction";

const fetchTransactions = async (key) => {

    try {
        const res = await GetTransactions("All");
        return res

    } catch (error) {
        console.log(error)
        // toast.error(error.error);
    }
};

function TransactionHistory({ closeModal }) {

    const [transactions, setTransactions] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);


    // React query fecth data
    const { data, status } = useQuery(['fetchTransactions'], fetchTransactions)

    useEffect(() => {
        if (!data) return
        console.log(data)
        setTransactions(data)
    }, [data])

    function handleSort(sortParams) {
        if (sortParams === "All") {
            return setTransactions(data)
        }
        setTransactions(data.filter(item => item.type === sortParams))
    }
    function openModal(transaction) {
        // console.log(transaction);
        setSelectedTransaction(transaction);
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const goBack = () => {
        window.history.go(-1);
    };

    return (
        <div className="transaction-history mt-5 px-3">
            <div className=" top-nav">
                <h1 >< Icon icon="material-symbols:arrow-back-rounded" onClick={goBack} className="add-icon" /> Transactions History</h1>
               
            </div>
            <div className="transaction-history mt-5">
                <RecentTransaction />
            </div>

            <Box display="flex" alignItems="center" justifyContent="flex-end" py={1}>
                <TablePagination

                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>




        </div>

    )
}

export default TransactionHistory