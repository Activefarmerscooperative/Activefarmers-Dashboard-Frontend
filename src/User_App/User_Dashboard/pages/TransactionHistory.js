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
        <div className="transaction-history mt-5 px-1">
            <div className=" top-nav">
                <h1 >< Icon icon="material-symbols:arrow-back-rounded" onClick={goBack} className="add-icon" /> Transactions History</h1>
                <div className="d-flex mt-5 top-nav-btn">
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
                            {/* <hr />
                            <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' /> */}
                        </label>
                    </div>


                    {/* <div className=" dropdown-container">
                        <div className=" d-flex align-items-center justify-content-center dropdown-header" onClick={handleToggle}>
                            <span className="">Sort By</span>
                            <div className="d-flex align-items-center sort">
                                <hr />
                                <div className={`arrow ${isOpen ? 'open' : ''}`}>
                                     <Icon icon= {isOpen ? "iconamoon:arrow-up-2-light" : "iconamoon:arrow-down-2-light"} />
                                    
                                </div>
                            </div>

                        </div>
                        <div className={`dropdown-content ${isOpen ? 'show' : ''}`} onChange={(e) => handleSort(e.target.value)}>
                            <span >Savings</span>
                            <span>Withdrawal</span>
                            <span>Loan</span>
                        </div>
                    </div> */}

                    <div className="d-flex align-items-center justify-content-center download-icon mx-3">
                        <Icon icon="material-symbols:download-rounded" className='icon' />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center table mt-3">

                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell></TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell >Date</TableCell>
                                <TableCell >Amount(NGN)</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row) => {
                                let color = (row.item?.status === "Pending") ? "#FB9129" : "#0D9068"
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell><input type="checkbox" name="" id="" style={{ borderColor: "#D7D7D7" }} /></TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.type}
                                        </TableCell>
                                        <TableCell >
                                            {new Date(row.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </TableCell>
                                        <TableCell >{row.amount}</TableCell>
                                        <TableCell >
                                            <div className="d-flex align-items-center">
                                                {(row.item?.status === "Pending") ? <Icon icon="solar:record-broken" rotate={1} style={{ width: "25px", height: "25px", fontWeight: "900", color: `${color}` }} /> : <Icon icon="material-symbols:circle-outline" style={{ width: "25px", height: "25px", color: `${color}`, fontWeight: "900" }} />}
                                                {/* <Icon icon="material-symbols:circle-outline" style={{ width: "20px", height: "20px", color: `${color}`, fontWeight: "900" }} /> */}
                                                <p className='my-0 mx-2' style={{ color: `${color}` }}>{row.item?.status}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell ><Icon icon="mdi:open-in-new" onClick={() => openModal(row)} style={{
                                            color: " #FB9129", width: "20px", height: "20px"
                                        }} /></TableCell>
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
                {/* <LoanRequestSummary
               closeModal={closeModal} 
                loanData={selectedTransaction} /> */}

                {modalIsOpen && selectedTransaction && (
                    <>
                        {selectedTransaction.type === "loan" && (
                            <LoanRequestSummary closeModal={closeModal} loanData={selectedTransaction} />
                        )}

                        {selectedTransaction.type === "withdrawal" && (
                            <SavingsWithdrawalSummary closeModal={closeModal} withdrawalData={selectedTransaction} />
                        )}
                    </>
                )}

            </Modal>
        </div>

    )
}

export default TransactionHistory