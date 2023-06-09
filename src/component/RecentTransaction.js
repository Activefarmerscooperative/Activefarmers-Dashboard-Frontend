import React, { useState, useEffect } from "react";
import { GetTransactions } from '../utils/api/member';
import { useQuery } from 'react-query'
import {
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead, TableContainer, Paper
} from "@mui/material";

import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

const fetchTransactions = async (key) => {

    try {
        const res = await GetTransactions();
        return res

    } catch (error) {
        console.log(error)
        // toast.error(error.error);
    }
};

function RecentTransaction() {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

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
        setTransactions(data.filter(item => item.type === sortParams))
    }

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

                    <button onClick={() => { navigate("/dashboard/transactions"); }} className='btn view-all-btn'>
                        View All
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center table mt-3">

                <TableContainer component={Paper}>
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
                                                <Icon icon="material-symbols:circle-outline" style={{ width: "20px", height: "20px", color: `${color}`, fontWeight: "900" }} />
                                                <p className='my-0 mx-2' style={{ color: `${color}` }}>{row.item?.status}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell ><Icon icon="mdi:open-in-new" style={{
                                            color: " #FB9129", width: "20px", height: "20px"
                                        }} /></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>

    )
}

export default RecentTransaction