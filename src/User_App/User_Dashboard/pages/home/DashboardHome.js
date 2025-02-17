import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query'
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import './home.css';
import { MyLoan } from '../../../../utils/api/member';
import RecentTransaction from "../../../../component/RecentTransaction";
import SavingsWallet from "../../../../component/SavingsWallet";
import {
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";
import profile from '../../../../assets/profile.jpg';
import { UpdateProfilePhoto } from "../../../../utils/api/member"
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'



export default function DashboardHome({ user, setToke }) {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loanInputType, setLoanInputType] = useState("false");
  const [myLoan, setMyLoan] = useState({});
  const [loanIcon, setLoanIcon] = useState("mdi:eye-off");
  const location = useLocation();
  const [image, setImage] = useState(user.image || null);
  const dispatch = useDispatch()

  const fetchLoan = async (key) => {

    try {

      const res = await MyLoan()
      return res

    } catch (error) {
      toast.error(error?.error);
      navigate("/login", { replace: true })
    }
  };


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

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
      const data = new FormData();
      data.append("uploaded_file", selectedImage);
      try {
        const result = await UpdateProfilePhoto(data)
        // localStorage.setItem("AFCS-token", result.token)
        dispatch(setToken(result?.token))
        setToke(result.token)
        toast.success(result?.message)
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
    }
  };




  return (
    <div className='px-3 py-2 user-dashboard-home'>
      <div className=''>

        <div className="user-info-summary d-flex">
          <h1>Dashboard</h1>


          <div className='px-2 profile-info mobile profile-info'>
            <label htmlFor="image-upload" className="profile-img-container">
              <img
                src={image || user.image || profile}
                alt=""
                className="profile-img mb-2"

              />
              <button className="btn camera" onClick={() => document.getElementById('image-upload').click()}>
                <Icon icon="heroicons-solid:camera" className='camera-icon' />
              </button>
              <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
            <div className="user-info-summary-text d-flex"><p>{user?.surname} {user?.firstname} </p> {" "}<p> ID: {user.reference}</p></div>

          </div>
        </div>




        {
          user?.regCompletePercent < 100 && (
            <NavLink to="/dashboard/profile">
              <div className="user-home-welcome py-3 px-4 "
                // onClick={() => {
                //   console.log("Navigating to profile");
                //   navigate("/dashboard/profile");
                // }}
              >
                {newUser && <h4>Welcome to your dashboard !</h4>}
                <p>Your profile is {user?.regCompletePercent}% completed. Visit the account settings tab to complete your profile </p>
              </div>
            </NavLink>

          )}

        <div className="savings my-4">
          <div className="d-flex align-items-center user-dashboard-header">
            <div className="savings-wallet-category">

              <div className="px-3 card">
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
                      icon={loanIcon ? "mdi:eye-off" : "mdi:eye"}
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
            </div>

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