import React, { useState, useEffect } from "react";
import {
  Route, Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { confirmTokenIsValid } from "../utils/api/member"
import Modal from 'react-modal';
import TransactionSuccessful from "../modal/TransactionSuccessful";
import WitdrawalForm from "../dashboard/pages/witdrawal/Witdrawal";
import DashboardHome from "./pages/home/DashboardHome";
import LoanForm from "./pages/loan/LoanForm";
import ProfileUpdate from "./pages/profile/ProfileUpdate";
import Support from "./pages/support/Support";
import AccountGuarantor from "./pages/dashboardguarantor/AccountGuarantor";
import TransactionHistory from "./pages/TransactionHistory";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [urlParams, setSearchParams] = useSearchParams();
  const [paymentRef, setPaymentRef] = useState("")
  const [token, setToken] = useState(false)

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
      try {
        const data = await confirmTokenIsValid(signal)

        setUser(data.user)
        if (data.user.regCompletePercent < 70) {
          toast.success("Please provide the following information to complete your registration.")
          navigate("/register/guarantor", { replace: true })
        }
        setOpen(true)
        const reference = urlParams.get("reference");
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
            <Sidebar
              setToken={setToken}
              user={user}
            />
            <Routes>
              <Route path="" element={<DashboardHome />} />
              <Route path="home" element={<DashboardHome />} />
              <Route path="witdrawal" element={<WitdrawalForm user={user} />} />
              <Route path="loan" element={<LoanForm user={user} />} />
              <Route path="profile" element={<ProfileUpdate setToken={setToken} />} />
              <Route path="support" element={<Support />} />
              <Route path="guarantor" element={<AccountGuarantor setToken={setToken} />} />
              <Route path="transactions" element={<TransactionHistory />} />

            </Routes>


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
            />
          </Modal>
        </>
      }

    </div>
  )
}

export default Dashboard