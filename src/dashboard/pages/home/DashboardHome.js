import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query'
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import './home.css';
import { MyLoan } from '../../../utils/api/member';
import RecentTransaction from "../../../component/RecentTransaction";
import SavingsWallet from "../../../component/SavingsWallet";
import {
  useLocation
} from "react-router-dom";

const fetchLoan = async (key) => {

  try {

    const res = await MyLoan()
    return res

  } catch (error) {
    console.log(error)
    toast.error(error?.error);
  }
};

export default function DashboardHome({ user }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loanInputType, setLoanInputType] = useState("false");
  const [myLoan, setMyLoan] = useState({});
  const [loanIcon, setLoanIcon] = useState("mdi:eye-off");
  const location = useLocation();
  // React query fecth data
  const { data, status } = useQuery(['fetchLoan'], fetchLoan)
  const newUser = location.state;

  useEffect(() => {

    if (!data) return
    setMyLoan(data.myLoan)

  }, [data, newUser])



  const toggleLoanVisibility = () => {
    setLoanInputType(loanInputType ? false : true);
    setLoanIcon(!loanIcon);
  };

  function createData(id, action, date, amount, status) {
    return { id, action, date, amount, status };
  }


  return (
    <div className='my-5 px-4 user-dashboard-home'>
      <div className=''>
        <h1>Dashboard</h1>

        {
          user?.regCompletePercent < 100 && (
            <div className="user-home-welcome py-3 px-4">
              {newUser && <h4>Welcome to your dashboard !</h4>}
              <p>Your profile is {user?.regCompletePercent}% completed. Visit the account settings tab to complete your profile </p>
            </div>
          )}



        <div className="savings my-4">
          <div className="d-flex align-items-center">
            <div className="px-3 card loan">
              <div className="d-flex align-items-center justify-content-between">
                <p className='savings-title'>My Loan</p>
                <p>(0) </p>
              </div>
              <div className="  d-flex align-items-center justify-content-between">

                {loanInputType ? (
                  <span className="savings-value">{`${myLoan?.amount || 0} NGN`}</span>
                ) : (
                  <span className="hidden-input ">*********</span>
                )}
                <div onClick={toggleLoanVisibility}>
                  <Icon
                    icon={loanIcon ? "mdi:eye" : "mdi:eye-off"}
                    className="eye-icon"
                  />
                </div>

              </div>
              <div className="">
                <p >View loan</p>
              </div>
            </div>
            <SavingsWallet
              openSavingsModal={modalIsOpen}
              setOpenSavingsModal={setIsOpen}
            />


            <button className='d-flex align-items-center justify-content-center btn addsaving-btn' onClick={() => setIsOpen(true)} >
              <Icon icon="material-symbols:add-circle-outline-rounded" className='add-icon me-2' />
              Add Savings
            </button>
          </div>
        </div>


        <div className="transaction-history mt-5">
          <RecentTransaction />
        </div>

      </div>

    </div>

  )
}