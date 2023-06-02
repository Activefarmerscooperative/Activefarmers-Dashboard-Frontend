import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { confirmTokenIsValid } from "../utils/api/member"
import Modal from 'react-modal';
import TransactionSuccessful from "../modal/TransactionSuccessful";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [urlParams, setSearchParams] = useSearchParams();
  const [paymentRef, setPaymentRef] = useState("")

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
  }, [])

  return (
    <div className='dashboard'>
      {
        open && <div className="d-flex">
          <Sidebar
            user={user}
          />
          <Outlet />
        </div>
      }
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
    </div>
  )
}

export default Dashboard