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
  const [savingsInputType, setSavingsInputType] = useState(false);
  const [pikinInputType, setPikinInputType] = useState("false");
  const [loanIcon, setLoanIcon] = useState("mdi:eye-off");
  const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");
  const [pikinIcon, setPikinIcon] = useState("mdi:eye-off");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [wallet, setWallet] = useState([])
  const [toggleWalletVisibility, setToggleWalletVisibility] = useState("")

  // React query fecth data
  const { data, status } = useQuery(['fetchData'], fetchData)

  useEffect(() => {
    if (!data) return
    console.log(data)
    setWallet(data[0]?.savingsWallet?.categories)
  }, [data])



  const toggleLoanVisiblity = () => {
    setLoanInputType(loanInputType ? false : true);
    setLoanIcon(!loanIcon);
  };
  const toggleSavingsVisiblity = (wallet) => {
    setToggleWalletVisibility(wallet)
    setSavingsInputType(!savingsInputType);
    setSavingsIcon(!savingsIcon);
  };
  // const togglePikinVisiblity = () => {
  //   setPikinInputType(pikinInputType ? false : true);
  //   setPikinIcon(!pikinIcon);
  // };


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
    createData(1, 'Savings witdrawal', '12 Jun, 2023', 120000,),
    createData(2, 'Loan request', '18 June, 2023', 750000,),
    createData(3, 'Savings witdrawal', '09 Aug, 2023', 78000,),
    createData(4, 'Loan request', '11 Nov, 2023', 230000,),
    createData(5, 'Savings witdrawal', '23 Nov, 2023', 200000,),
    createData(6, 'Savings witdrawal', '1 Dec, 2023', 150000,),
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

            {
              status === "loading" && <div className="px-3 card pikin">
                <center style={{ height: '100', overflow: 'hidden' }} className=""><RotatingLines width="100" height="100" strokeColor="#1B7B44" strokeWidth="3" /></center>
              </div>
            }

            {
              wallet?.map(item => <div className="px-3 card my-savings">

                <p className='text-start savings-title'>{item.category.name}</p>

                <form action="" >
                  <div className="form-group d-flex align-items-center">
                    <input
                      type={
                        (item._id === toggleWalletVisibility && savingsInputType) ? "text" : "password"
                      }
                      name="savings"
                      id="savings"
                      value={`${item.amount} NGN`}
                      placeholder='' />
                    <div onClick={() => toggleSavingsVisiblity(item._id)}>
                      <Icon icon={savingsIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                    </div>

                  </div>
                </form>
                <div className="">
                  <p >Add Savings</p>
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