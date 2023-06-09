import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useQuery } from 'react-query'
import { RotatingLines } from "react-loader-spinner";
import { Icon } from '@iconify/react';
import './home.css';
import AddSavings from '../../../modal/AddSavings';
import { GetWallet } from '../../../utils/api/member';
import RecentTransaction from "../../../component/RecentTransaction";

const fetchData = async (key) => {

  try {
    const wallet = await GetWallet();
    // const bankList = await BankList()
    const res = await Promise.all([wallet]);
    return res

  } catch (error) {
    console.log(error)
    // toast.error(error.error);
  }
};

export default function DashboardHome() {

  const [loanInputType, setLoanInputType] = useState("false");
  const [loanIcon, setLoanIcon] = useState("mdi:eye-off");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [wallet, setWallet] = useState([])
  const [savingsVisibility, setSavingsVisibility] = useState({});

  // React query fecth data
  const { data, status } = useQuery(['fetchData'], fetchData)

  useEffect(() => {
    if (!data) return
    console.log(data)
    setWallet(data[0]?.savingsWallet?.categories)
  }, [data])



  const toggleLoanVisibility = () => {
    setLoanInputType(loanInputType ? false : true);
    setLoanIcon(!loanIcon);
  };
  // const toggleSavingsVisibility = (wallet) => {
  //   setToggleWalletVisibility(wallet);
  //   setSavingsInputType((prevState) => ({
  //     ...prevState,
  //     [wallet]: !prevState[wallet]
  //   }));
  //   setSavingsIcon((prevState) => ({
  //     ...prevState,
  //     [wallet]: !prevState[wallet]
  //   }));
  //   // setSavingsInputType(!savingsInputType);
  //   // setSavingsIcon(!savingsIcon);
  // };
  const toggleSavingsVisibility = (wallet) => {
    setSavingsVisibility((prevState) => ({
      ...prevState,
      [wallet]: !prevState[wallet]
    }));
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function createData(id, action, date, amount, status) {
    return { id, action, date, amount, status };
  }

  const rows = [
    createData(1, 'Savings withdrawal', '12 Jun, 2023', 120000,),
    createData(2, 'Loan request', '18 June, 2023', 750000,),
    createData(3, 'Savings withdrawal', '09 Aug, 2023', 78000,),
    createData(4, 'Loan request', '11 Nov, 2023', 230000,),
    createData(5, 'Savings withdrawal', '23 Nov, 2023', 200000,),
    createData(6, 'Savings withdrawal', '1 Dec, 2023', 150000,),
  ];


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
                <div className="form-group d-flex align-items-center justify-content-between">
                  {/* <input
                    type={loanInputType ? "text" : "password"}
                    name="loan"
                    id="loan"
                    value={"0.00 NGN"}
                    placeholder='' />
                  <div onClick={toggleLoanVisibility}>
                    <Icon icon={loanIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                  </div> */}
                  {loanInputType ? (
                    <span className="savings-value">0.00 NGN</span>
                  ) : (
                    <span className="hidden-input">*********</span>
                  )}
                  <div onClick={toggleLoanVisibility}>
                    <Icon
                      icon={loanIcon ? "mdi:eye" : "mdi:eye-off"}
                      className="eye-icon"
                    />
                  </div>

                </div>
              <div className="">
                <p >Repayment starts : -/--/--</p>
              </div>
            </div>

            {
              status === "loading" && <div className="px-3 card pikin">
                <center style={{ height: '100', overflow: 'hidden' }} className=""><RotatingLines width="20" /></center>
              </div>
            }

            {
              wallet?.map(item => <div className="px-3 card my-savings" key={item._id}>

                <p className='text-start savings-title'>{item.category.name}</p>

                  <div className="form-group d-flex align-items-center justify-content-between">

                    {savingsVisibility[item._id] ? (
                      // <input
                      //   type="text"
                      //   name="savings"
                      //   id="savings"
                      //   value={`${item.amount} NGN`}
                      //   placeholder=""
                      //   readOnly
                      // />
                      <span className="savings-value">{`${item.amount} NGN`}</span>
                    ) : (
                      <span className="hidden-input">********</span>
                    )}


                    <div onClick={() => toggleSavingsVisibility(item._id)}>
                      <Icon
                        icon={savingsVisibility[item._id] ? "mdi:eye" : "mdi:eye-off"}
                        className="eye-icon"
                      />
                      {/* <Icon icon={savingsIcon[item._id] ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' /> */}
                    </div>

                  </div>
                <div className="">
                <p onClick={() => openModal(item.category.name)}>Add Savings</p>
                </div>
                
              </div>)
            }


            <button className='d-flex align-items-center justify-content-around btn addsaving-btn' onClick={openModal} >
              <Icon icon="material-symbols:add-circle-outline-rounded" className='add-icon' />
              Add Savings
            </button>
          </div>
        </div>


        <div className="transaction-history mt-5">
          <RecentTransaction />
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