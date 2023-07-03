import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './widgets.css';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, TablePagination } from '@mui/material';


const Tab = ({ tabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderTable = (tabName) => {
        const data = require('../components/data/Users.json');
        let tableHeaders, tableData;

        switch (tabName) {
            case 'Members':
                tableHeaders = ['S/N', 'Headshot', 'Name', 'Email Address', 'Phone Number', 'Joined On', 'Category', 'Location', 'Gender'];
                tableData = data.members;
                break;
            case 'Borrowers':
                tableHeaders = ['S/N', 'Headshot', 'Name', 'Email Address', 'Phone Number', 'Joined On', 'Category', 'Location', 'Gender'];
                tableData = data.borrowers;
                break;
            case 'Loan Requests':
                tableHeaders = ['S/N', 'Loan Amount', 'Savings Balance', 'Borrower', 'Joined On', 'Phone Number', 'Category', 'Location', 'Gender'];
                tableData = data.loanRequests;
                break;
            case 'Savings Withdrawal Request':
                tableHeaders = ['S/N', 'Request Amount', 'Savings Balance', 'Member', 'Joined On', 'Category', 'Location', 'Gender'];
                tableData = data.savingsWithdrawalRequests;
                break;
            default:
                return null;
        }

        // const tableRowCount = tableData.length;
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map((header) => (
                                    <TableCell key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {tableData.map((row) => ( */}
                            {tableData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.id}>
                                        {Object.values(row).map((cellValue, index) => (
                                            <TableCell key={index}>{cellValue}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                </TableContainer> 
                <Box display="flex" alignItems="center" justifyContent="flex-end" py={1}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </div>


        );
    };

    return (
        <div>
            <div className="tab-header">
                <div className=" d-flex align-items-center justify-content-between">
                    {tabs.map((tab) => (
                        <div
                            key={tab.name}
                            className={`tab-item ${activeTab === tab.name ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.name)}
                        >
                            {tab.name}
                        </div>
                    ))}


                </div>
            </div>

            <div className=" d-flex align-items-center justify-content-between px-3 my-4">
                <div className='d-flex sorting-button'>
                    <button className="btn d-flex align-items-center search">
                        <Icon icon="eva:search-outline" />
                        <input type="search" placeholder='Search' />
                    </button>
                    <button className="btn d-flex align-items-center filter">
                        <Icon icon="clarity:filter-line" color="#0d9068" />
                        Filter Members
                    </button>
                </div>

                <div className='d-flex table-button'>
                    <button className="btn d-flex align-items-center add-member">
                        <Icon icon="basil:add-solid" />
                        Add Member
                    </button>
                    <button className='btn d-flex align-items-center export-list'>
                        <Icon icon="mingcute:file-export-fill" />
                        Export List
                    </button>
                </div>


            </div>
            <div className="tab-content mt-3 ">
                {tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`tab-pane ${activeTab === tab.name ? 'active' : ''}`}
                    >
                        {renderTable(tab.name)}
                        {/* {tab.content} */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tab;