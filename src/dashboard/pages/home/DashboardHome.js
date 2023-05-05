import React, { useState } from 'react';
import Modal from 'react-modal';
// import { DataGrid } from '@mui/x-data-grid';
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead, TableContainer, Paper
} from "@mui/material";

import { Icon } from '@iconify/react';
import './home.css';
import AddSavings from '../../../modal/AddSavings';

export default function DashboardHome() {

  const [loanInputType, setLoanInputType] = useState("false");
  const [savingsInputType, setSavingsInputType] = useState("false");
  const [pikinInputType, setPikinInputType] = useState("false");
  const [loanIcon, setLoanIcon] = useState("mdi:eye-off");
  const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");
  const [pikinIcon, setPikinIcon] = useState("mdi:eye-off");
  const [modalIsOpen, setIsOpen] = useState(false);


  const toggleLoanVisiblity = () => {
    setLoanInputType(loanInputType ? false : true);
    setLoanIcon(!loanIcon);
  };
  const toggleSavingsVisiblity = () => {
    setSavingsInputType(savingsInputType ? false : true);
    setSavingsIcon(!savingsIcon);
  };
  const togglePikinVisiblity = () => {
    setPikinInputType(pikinInputType ? false : true);
    setPikinIcon(!pikinIcon);
  };


  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function createData(
    id: "",
    action: string,
    date: number,
    amount: number,
    status: number,
  ) {
    return { id, action, date, amount, status };
  }

  const rows = [
    createData(1, 'Savings witdrawal', '12 Jun, 2023', 120000,),
    createData(2, 'Loan request', '18 June, 2023', 750000,),
    createData(3, 'Savings witdrawal', '09 Aug, 2023', 78000,),
    createData(4, 'Loan request', '11 Nov, 2023', 230000,),
    createData(5, 'Savings witdrawal', '23 Nov, 2023', 200000,),
    createData(6, 'Savings witdrawal', '1 Dec, 2023', 150000,),
  ];


  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 50 },
  //   { field: 'action', headerName: 'Action', width: 200 },
  //   { field: 'date', headerName: 'Date', width: 130 },
  //   { field: 'amount', headerName: 'Amount(NGN)', width: 130 },
  //   { field: 'status', headerName: 'Status', width: 130 },
  //   { field: 'view', headerName: 'View', width: 130, }
  // ];

  // const rows = [
  //   { id: 1, action: 'Savings witdrawal', date: '12 Jun, 2023', amount: 120000,  },
  //   { id: 2, action: 'Loan request', date: '18 June, 2023', amount: 750000,  },
  //   { id: 3, action: 'Savings witdrawal', date: '09 Aug, 2023', amount: 78000,  },
  //   { id: 4, action: 'Loan request', date: '11 Nov, 2023', amount: 230000,  },
  //   { id: 5, action: 'Savings witdrawal', date: '23 Nov, 2023', amount: 200000,  },
  //   { id: 6, action: 'Savings witdrawal', date: '1 Dec, 2023', amount: 150000,  },
  // ];

  return (
    <div className='my-5 px-5 home'>
      <div className=''>
        <h1>Dashboard</h1>
        <div className="welcome py-3 px-4">
          <h4>Welcome to your dashboard !</h4>
          <p>Lorem ipsum dolor sit amet consectetur. Turpis posuere donec ipsum lectus cursus. Pellentesque tellus ornare id neque. Rutrum fringilla </p>
        </div>


        <div className="savings my-4">
          <div className="d-flex align-items-center">
            <div className="px-3 card loan">
              <div className="d-flex align-items-center justify-content-between">
                <p className='savings-title'>My Loan</p>
                <p>(0) </p>
              </div>
              <form action="" >
                <div className="form-group d-flex align-items-center">
                  <input
                    type={loanInputType ? "text" : "password"}
                    name="loan"
                    id="loan"
                    value={"0.00 NGN"}
                    placeholder='' />
                  <div onClick={toggleLoanVisiblity}>
                    <Icon icon={loanIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                  </div>

                </div>
              </form>
              <div className="">
                <p >Repayment starts : -/--/--</p>
              </div>
            </div>
            <div className="px-3 card my-savings">

              <p className='text-start savings-title'>My Savings</p>

              <form action="" >
                <div className="form-group d-flex align-items-center">
                  <input
                    type={savingsInputType ? "text" : "password"}
                    name="savings"
                    id="savings"
                    value={"90,000 NGN"}
                    placeholder='' />
                  <div onClick={toggleSavingsVisiblity}>
                    <Icon icon={savingsIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                  </div>

                </div>
              </form>
              <div className="">
                <p >Add Savings</p>
              </div>
            </div>
            <div className="px-3 card pikin">
              <p className='text-start savings-title'>My Pikin</p>
              <form action="" >
                <div className="form-group d-flex align-items-center">
                  <input
                    type={pikinInputType ? "text" : "password"}
                    name="pikin"
                    id="pikin"
                    value={"12,000 NGN"}
                    placeholder='' />
                  <div onClick={togglePikinVisiblity}>
                    <Icon icon={pikinIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                  </div>

                </div>
              </form>
              <div className="">
                <p >Add Savings</p>
              </div>
            </div>

            <button className='d-flex align-items-center justify-content-around btn addsaving-btn' onClick={openModal} >
              <Icon icon="material-symbols:add-circle-outline-rounded" className='add-icon' />
              Add Savings
            </button>
          </div>
        </div>


        <div className="transaction-history mt-5">
          <div className="d-flex align-items-center justify-content-between top-nav">
            <p>Recent Transaction</p>
            <div className="d-flex top-nav-btn">
              <div className='d-flex align-items-center justify-content-between sort px-2 mx-2'>


                <label htmlFor="contained-button-file" className='d-flex align-items-center'>
                  <select name=""
                    id="contained-button-file">
                    <option value="">sort by</option>
                    <option value="regular">Regular Savings</option>
                    <option value="project">Project Savings</option>
                    <option value="Pilgrimage">Pilgrimage Savings</option>
                    <option value="pikin">My Pikin Savings</option>
                  </select><hr />
                  <Icon icon="material-symbols:keyboard-arrow-down-rounded" className='arrow-icon' />
                </label>
              </div>

              <div className="d-flex align-items-center justify-content-center download-icon mx-3">
                <Icon icon="material-symbols:download-rounded" className='icon' />
              </div>
              <button className='btn view-all-btn'>
                View All
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center table mt-3">
            {/* <div style={{ }}> */}
            {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[5]}
                
                checkboxSelection

              /> */}

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
                  {rows.map((row) => (
                    <TableRow
                      key={row.action}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell><input type="checkbox" name="" id="" style={{ borderColor: "#D7D7D7" }} /></TableCell>
                      <TableCell component="th" scope="row">
                        {row.action}
                      </TableCell>
                      <TableCell >{row.date}</TableCell>
                      <TableCell >{row.amount}</TableCell>
                      <TableCell >
                        <div className="d-flex align-items-center">
                          <Icon icon="material-symbols:circle-outline" style={{ width: "20px", height: "20px", color: " #0D9068", fontWeight: "900" }} />
                          <p className='my-0 mx-2' style={{ color: " #0D9068" }}>Done</p>
                        </div>
                      </TableCell>
                      <TableCell ><Icon icon="mdi:open-in-new" style={{
                        color: " #FB9129", width: "20px", height: "20px"
                      }} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>














            {/* </div> */}
          </div>
        </div>

      </div>
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
        closeTimeoutMS={2000}
      >
        <AddSavings />
      </Modal>
    </div>
  )
}