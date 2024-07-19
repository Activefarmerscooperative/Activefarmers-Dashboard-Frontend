import React, { useState, useEffect } from "react";
import {
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Paper,
    Box,
    TablePagination
} from "@mui/material";
import { Icon } from '@iconify/react';
import LoanDetails from "../../../../components/reusable/LoanDetailsModal";
import Modal from 'react-modal';
import { toast } from "react-toastify";
import { useQuery } from 'react-query'
import { LoanHistory } from "../../../../../utils/api/admin";

const userLoanHistory = async (key, user) => {
    if (!user) return
    try {
        let res = await LoanHistory(user)
        return res

    } catch (error) {
        console.log("not working")
        toast.error(error.error);
    }
};

function LoanTable({ userId }) {

    const [transactions, setTransactions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const { data, status } = useQuery(['userLoanHistory', userId], userLoanHistory);

    useEffect(() => {
      
        if (!data) return

        setTransactions(data.userLoans)
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    function openModal(transaction) {
        // console.log(transaction);
        setSelectedTransaction(transaction);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="transaction-history mt-5">

            <div className="d-flex justify-content-center table mt-3">

                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell>Action</TableCell>
                                <TableCell >Date</TableCell>
                                <TableCell >Amount(NGN)</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row) => {
                                let statusIcon = null;
                                let statusText = "";
                                let statusClassName = ""; // Default class for pending status

                                if (row.status === "Confirmed" && row.repaymentStatus === "Completed") {
                                    statusClassName = "paid-status";
                                    statusIcon = <Icon icon="material-symbols:circle-outline" className="active-icon" />;
                                    statusText = "Paid";
                                } else if (row.status === "Confirmed") {
                                    statusClassName = "active-status";
                                    statusIcon = <Icon icon="fontisto:radio-btn-active" className="active-icon" />;
                                    statusText = "Active";
                                } else if (row.status === "Rejected") {
                                    statusClassName = "rejected-status";
                                    statusIcon = <Icon icon="fontisto:radio-btn-active" className="rejected-icon" />;
                                    statusText = "Declined";
                                } else {
                                    statusIcon = <Icon icon="material-symbols:circle-outline" className={statusClassName} />;
                                    statusText = "Pending Request";
                                }
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">
                                            Loan Request
                                        </TableCell>
                                        <TableCell >
                                            {new Date(row.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </TableCell>
                                        <TableCell >{row.amount}</TableCell>
                                        <TableCell >
                                            <div className="d-flex align-items-center">
                                                {statusIcon}
                                                <p className={`mb-0 mx-2 ${statusClassName}`}>{statusText}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell><Icon icon="mdi:open-in-new" className={
                                            row.item?.status === "Paid"
                                                ? "paid-icon"
                                                : row.item?.status === "Active"
                                                    ? "pending-icon"
                                                    : "active-icon"
                                        } onClick={() => openModal(row)} /></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>



                    </Table>


                </TableContainer>

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

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
                shouldCloseOnOverlayClick={true}
                >
                <LoanDetails
                    closeModal={closeModal}
                    loanData={selectedTransaction} />

            </Modal>


        </div>

    )
}

export default LoanTable