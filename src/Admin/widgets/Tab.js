import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query'
import { Icon } from '@iconify/react';
import './widgets.css';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, TablePagination } from '@mui/material';
import { Members, Borrowers, LoanRequests, WithdrawalRequest, AutoTransactions } from "../../utils/api/admin"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AutoTransaction from '../components/data/AutoTransaction';
import WithdrawalDetails from '../components/reusable/WithdrawalDetails';
import Modal from 'react-modal';
import AutoTransactionModal from '../components/reusable/AutoTransactionModal';
import DatePicker from "react-datepicker";

const getData = async (key, tab) => {
    let res;
    try {
        if (tab === "Members") {
            res = await Members();
        } else if (tab === "Borrowers") {
            res = await Borrowers();
        } else if (tab === "Loan Requests") {
            res = await LoanRequests();
        } else if (tab === "Auto Transactions") {
            res = await AutoTransactions()
        } else {
            res = await WithdrawalRequest();
        }
        return res

    } catch (error) {
        toast.error(error.error);
    }
};
const Tab = ({ tabs, defaultTab }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // React query fetch data
    const { data, status } = useQuery(['getData', activeTab], getData)
    const [showData, setShowData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [autoTransaction, setAutoTransaction] = useState([])
    const [filter, setFilter] = useState("")
    const [startDate, setStartDate] = useState(new Date())

    function openModal(transactions) {
        // console.log(transaction);
        setSelectedTransaction(transactions);
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (!data) return

        let dataArray = []

        if (activeTab === "Members") {
            for (let i = 0; i < data.length; i++) {
                dataArray = [...dataArray, {
                    SN: i + 1,
                    photo: <img className='headshot' src={data[i].photo} />,
                    name: `${data[i].surname} ${data[i].firstname}`,
                    email: data[i].email,
                    phone: data[i].phone,
                    joined: new Date(data[i].createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    category: data[i].membershipType,
                    location: `${data[i].address} ${data[i].location.name}`,
                    gender: data[i].gender

                }]

            }

            setShowData(dataArray)

        } else if (activeTab === "Borrowers") {

            for (let i = 0; i < data.length; i++) {
                dataArray = [...dataArray, {
                    SN: i + 1,
                    photo: <img className='headshot' src={data[i].user.photo} />,
                    name: `${data[i].user.surname} ${data[i].user.firstname}`,
                    email: data[i].user.email,
                    phone: data[i].user.phone,
                    joined: new Date(data[i].user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    category: data[i].user.membershipType,
                    location: `${data[i].user.address} ${data[i].user.location.name}`,
                    gender: data[i].user.gender

                }]

            }

            setShowData(dataArray)
        } else if (activeTab === "Auto Transactions") {
            setAutoTransaction(data?.results)

        } else {

            for (let i = 0; i < data.length; i++) {
                dataArray = [...dataArray, {
                    SN: i + 1,
                    amount: data[i].amount,
                    savings: data[i].savings,
                    name: `${data[i].user.surname} ${data[i].user.firstname}`,
                    joined: new Date(data[i].user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    phone: data[i].user.phone,
                    category: data[i].user.membershipType,
                    location: `${data[i].user.address} ${data[i].user.location.name}`,
                    gender: data[i].user.gender

                }]

            }
            setShowData(dataArray)
        }
    }, [data])

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

        let tableHeaders, tableData;

        switch (tabName) {
            case 'Members':
                tableHeaders = ['S/N', 'Headshot', 'Name', 'Email Address', 'Phone Number', 'Joined On', 'Category', 'Location', 'Gender'];
                tableData = showData
                break;
            case 'Borrowers':
                tableHeaders = ['S/N', 'Headshot', 'Name', 'Email Address', 'Phone Number', 'Joined On', 'Category', 'Location', 'Gender'];
                tableData = showData
                break;
            case 'Loan Requests':
                tableHeaders = ['S/N', 'Loan Amount', 'Savings Balance', 'Borrower', 'Joined On', 'Phone Number', 'Category', 'Location', 'Gender'];
                tableData = showData
                break;
            case 'Savings Withdrawal Request':
                tableHeaders = ['S/N', 'Request Amount', 'Savings Balance', 'Member', 'Joined On', 'Phone Number', 'Category', 'Location', 'Gender'];
                tableData = showData
                break;
            case 'Auto Transactions':
                tableHeaders = ['S/N', 'Action', 'User', 'Number', 'Amount', 'Date', 'Time', 'Status', 'View'];
                tableData = showData
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
                        {
                            tabName !== "Auto Transactions" &&
                            <TableBody>
                                {/* {tableData.map((row) => ( */}
                                {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <TableRow key={row.id} style={{ cursor: "pointer" }} onClick={(e) => navigate('/admin/dashboard/userprofile', { state: { data: data[i], tab: tabName } })} >
                                            {Object.values(row).map((cellValue, index) => (
                                                <TableCell className={tableHeaders === "Location" ? "" : "location-cell"} key={index}>{cellValue}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        }

                        {tabName === "Auto Transactions" &&
                            <TableBody>
                                {/* {tableData.map((row) => ( */}
                                {autoTransaction?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((transactions, index) => (
                                        <TableRow key={index.id} >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{transactions.type}</TableCell>
                                            <TableCell>{transactions.user.firstname} {transactions.user.surname}</TableCell>
                                            <TableCell>{transactions?.user.phone}</TableCell>
                                            <TableCell>{transactions?.amount}</TableCell>
                                            <TableCell>{new Date(transactions?.createdAt).toDateString()}</TableCell>
                                            <TableCell>{new Date(transactions?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</TableCell>
                                            <TableCell className='d-flex align-items'><Icon icon="ic:outline-circle" className={
                                                transactions.status === "Successful"
                                                    ? "success-icon"
                                                    : "failed-icon"
                                            } />
                                                <p className={
                                                    transactions.status === "Successful"
                                                        ? "success-icon"
                                                        : "failed-icon"
                                                }>{transactions.status}</p>
                                            </TableCell>

                                            <TableCell><Icon icon="mdi:open-in-new" className="pending-icon" onClick={() => openModal(transactions)} /></TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>}
                    </Table>

                </TableContainer>
                <Box display="flex" alignItems="center" justifyContent="flex-end" py={1}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tabName !== "Auto Transactions" ? tableData?.length : autoTransaction?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </div >


        );
    };

    useEffect(() => {
        if (!filter) {
            handleFilter("")
        }
    }, [filter])

    function handleFilter(params) {

        if (filter === "type" && params) {
            setAutoTransaction(data?.results.filter(item => item.type === params))
        } else if (filter === "date") {

            const filteredData = data?.results.filter(item => {
                const createdAtDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
                return params && createdAtDate === params.setHours(0, 0, 0, 0);
            });
            setAutoTransaction(filteredData)
        } else {
            setAutoTransaction(data?.results)
        }

    }

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
                {
                    activeTab !== "Auto Transactions" ?
                        <div className='d-flex sorting-button'>
                            <button className="btn d-flex align-items-center search">
                                <Icon icon="eva:search-outline" />
                                <input type="search" placeholder='Search' />
                            </button>
                            {/* <button className="btn d-flex align-items-center filter">
                                <Icon icon="clarity:filter-line" color="#0d9068" />
                                Filter Members
                            </button> */}
                        </div> :
                        <div className='d-flex sorting-button'>
                            <select className=" filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="">Filter</option>
                                <option value="type">Transaction Type</option>
                                <option value="date">Date</option>
                            </select>
                            {
                                filter === "type" ?
                                    <select className=" filter" onChange={(e) => handleFilter(e.target.value)}>
                                        <option value="">Select transaction type</option>
                                        <option value="LoanDeduction">LoanDeduction</option>
                                        <option value="SavingsDeduction">SavingsDeduction</option>
                                    </select> :
                                    filter === "date" ?
                                        <DatePicker selected={startDate} onChange={(date) => {
                                            setStartDate(date)
                                            handleFilter(date)
                                        }} className=" filter" /> :
                                        null
                            }
                        </div>
                }


                {/* <div className='d-flex table-button'>
                    <button className="btn d-flex align-items-center add-member">
                        <Icon icon="basil:add-solid" />
                        Add Member
                    </button>
                    <button className='btn d-flex align-items-center export-list'>
                        <Icon icon="mingcute:file-export-fill" />
                        Export List
                    </button>
                </div> */}


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

            <Modal
                isOpen={modalIsOpen}
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

                <AutoTransactionModal
                    closeModal={closeModal}
                    autoTransactionData={selectedTransaction}
                />

            </Modal>
        </div>
    );
};

export default Tab;