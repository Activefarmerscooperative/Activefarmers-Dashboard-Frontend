import React, { useState, useEffect } from "react";
import {
  Route, Routes,
  useNavigate,
  useSearchParams,
  useLocation
} from "react-router-dom";
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { confirmTokenIsValid } from "../../utils/api/member"
import Modal from 'react-modal';
import TransactionSuccessful from "../../modal/TransactionSuccessful";
import WitdrawalForm from "../User_Dashboard/pages/witdrawal/Witdrawal";
import DashboardHome from "./pages/home/DashboardHome";
import LoanForm from "./pages/loan/LoanForm";
import ProfileUpdate from "./pages/profile/ProfileUpdate";
import Support from "./pages/support/Support";
import AccountGuarantor from "./pages/dashboardguarantor/AccountGuarantor";
import TransactionHistory from "./pages/TransactionHistory";
import { toast } from "react-toastify";
import ScheduleSavings from "./pages/schedule_savings/ScheduleSavings";
import { useDispatch } from 'react-redux'
import { setToken } from '../../redux/reducers/jwtReducer'

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [urlParams, setSearchParams] = useSearchParams();
  const [paymentRef, setPaymentRef] = useState("")
  const [token, setToke] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {

    // Check if user can access this page info on component mount.
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function confirmToken() {
      const reference = urlParams.get("reference");

      if (reference) {
        dispatch(setToken(localStorage.getItem("AFCS-t")));
      }
      localStorage.removeItem("AFCS-t")
      try {

        const data = await confirmTokenIsValid(signal)

        setUser(data.user)
        if (data.user.regCompletePercent < 70) {
          toast.success("Please provide the following information to complete your registration.")
          // navigate("/register/guarantor", { replace: true })
          navigate("/dashboard", { replace: true })
        }
        setOpen(true)

        if (!reference) {
          return;
        }
        setPaymentRef(reference)
        openModal()
      } catch (error) {
        navigate("/login", { replace: true })
      }
    }
    confirmToken()

    return () => {
      abortController.abort(); // Cancel the request on component unmount
    };
  }, [token])



  return (
    <div className='dashboard'>
      { //SetToken is used to update user reg percent from token
        open &&
        <>
          <div className="d-flex">
            <Sidebar className="sidebar"
              setToken={setToken}
              user={user}
            />
            <div className="content" style={{ marginLeft: "250px", width: "-webkit-fill-available" }}>
              <Routes>
                <Route path="" element={<DashboardHome user={user} setToke={setToke} />} />
                <Route path="home" element={<DashboardHome user={user} setToke={setToke} />} />
                <Route path="witdrawal" element={<WitdrawalForm user={user} />} />
                <Route path="loan" element={<LoanForm user={user} />} />
                <Route path="profile" element={<ProfileUpdate setToke={setToke} />} />
                <Route path="support" element={<Support />} />
                <Route path="guarantor" element={<AccountGuarantor setToke={setToke} />} />{/*setToke is not a mistake*/}
                <Route path="transactions" element={<TransactionHistory />} />
                <Route path="schedule-savings" element={<ScheduleSavings />} />

              </Routes>
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
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={2000}
          >
            <TransactionSuccessful
              reference={paymentRef}
              closeModal={closeModal}
            />
          </Modal>
        </>
      }

    </div>
  )
}

export default Dashboard