import React, { useState, useEffect } from "react";
import {
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead, TableContainer, Paper, Box, TablePagination
} from "@mui/material";
import { Icon } from '@iconify/react';
import LoanDetails from "../../../../components/reusable/LoanDetailsModal";
import Modal from 'react-modal';
import { withdrawalHistory } from "../../../../../utils/api/admin.js";
import { toast } from "react-toastify";
import { useQuery } from 'react-query'
import WithdrawalDetails from "../../../../components/reusable/WithdrawalDetails";



const withDrawal = async (key, user) => {
    if (!user) return
    try {
        let withdrawals = await withdrawalHistory(user)
        return withdrawals

    } catch (error) {
        toast.error(error.error);
    }
};

function SavingsWithdrawals(userData) {
    const [transactions, setTransactions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [userInfo, setData] = useState()
    const id = userInfo?.userData?._id
    const [stat, setSTat] = useState([])
    // React query fetch data
    const { data: withdrawals, status } = useQuery(['withDrawal', id], withDrawal);

    useEffect(() => {
        if (withdrawals) {
            const { message, userWithdrawals } = withdrawals;
            setSTat(message); // Set status to the message
            setTransactions(userWithdrawals);
        }
    }, [withdrawals]);

    useEffect(() => {
        if (!userData.user) {
            setData(userData)
        } else {

            setData(userData.user)
        }
    }, [userData])


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
        <div className="transaction-history mt-5 px-4">

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
                            {transactions?.map((row) => {
                                let statusIcon = null;
                                let statusText = "";
                                let statusClassName = "pending-status"; // Default class for pending status

                                if (row.status === "Confirmed") {
                                    statusClassName = "paid-status";
                                    statusIcon = <Icon icon="material-symbols:circle-outline" className={statusClassName} />;
                                    statusText = "Successful";
                                } else if (row.status === "Rejected") {
                                    statusClassName = "rejected-status";
                                    statusIcon = <Icon icon="material-symbols:circle-outline" className={statusClassName} />;
                                    statusText = "Rejected";
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
                                            Withdrawal Request
                                        </TableCell>
                                        <TableCell >
                                            {new Date(row.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </TableCell>
                                        <TableCell >{row.amount}</TableCell>
                                        <TableCell >
                                            <div className="d-flex align-items-center">
                                                {statusIcon}
                                                <p className={
                                                    row.status === "Confirmed"
                                                        ? "paid-status"
                                                        : row.status === "Rejected" ? "rejected-status" : "pending-status"
                                                }>{statusText}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell><Icon icon="mdi:open-in-new" className={
                                            row.status === "Confirmed"
                                                ? "paid-icon"
                                                : row.status === "Rejected" ? "rejected-icon" : "pending-icon"
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
                    count={transactions?.length}
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
                className={{
                    base: 'modal-base',
                    afterOpen: 'modal-base_after-open',
                    beforeClose: 'modal-base_before-close'
                }}
                overlayClassName={{
                    base: 'overlay-base',
                    afterOpen: 'overlay-base_after-open',
                    beforeClose: 'overlay-base_before-close'
                }}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={2000}>

                <WithdrawalDetails
                    closeModal={closeModal}
                    withdrawalData={selectedTransaction} />

            </Modal>
        </div>
    )
}
export default SavingsWithdrawals