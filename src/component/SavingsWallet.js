import React, { useState, useEffect } from "react";
import { GetWallet } from '../utils/api/member';
import { useQuery } from 'react-query'
import { Icon } from '@iconify/react';
import AddSavings from "../modal/AddSavings";
import Modal from 'react-modal';
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const fetchData = async (key) => {

  try {
    const res = await GetWallet();
    return res

  } catch (error) {
    toast.error(error?.error);
  }
};

function SavingsWallet({ openSavingsModal, setOpenSavingsModal, setSavingsCategory }) {
  //openSavingsModal comes from dashboardHome
  //setSavingsCategory comes from withdrawal page.

  const [savingsVisibility, setSavingsVisibility] = useState({});
  const [wallet, setWallet] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  // React query fecth data
  const { data, status } = useQuery(['fetchData'], fetchData)

  useEffect(() => {
    if (openSavingsModal) {
      openModal()
    }
  }, [openSavingsModal])


  useEffect(() => {
    if (!data) return
    setWallet(data.savingsWallet?.categories)
    if (setSavingsCategory)
      setSavingsCategory(data.savingsWallet?.categories)
  }, [data])

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    if (openSavingsModal) {
      setOpenSavingsModal(false)
    }
    setSelectedCategory(null)
    setIsOpen(false);
  }
  const toggleSavingsVisibility = (wallet) => {
    setSavingsVisibility((prevState) => ({
      ...prevState,
      [wallet]: !prevState[wallet]
    }));
  };


  return (
    <div className="category-  d-flex align-items-center">
      {
        status === "loading" && <div className="px-3 card pikin">
          <center style={{ height: '100', overflow: 'hidden' }} className=""><RotatingLines width="20" /></center>
        </div>
      }

      {
        wallet?.map(item => <div className="px-3 card my-savings" key={item._id}>

          <p className='text-start savings-title'>{item.category}</p>

          <div className="  d-flex align-items-center justify-content-between">

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
            <p onClick={() => {
              setSelectedCategory(item.category)
              openModal()
            }}>Add Savings</p>
          </div>
        </div>)
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
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
      >
        <AddSavings
          closeModal={closeModal}
          selectedCategory={selectedCategory}
          wallet={wallet}
        />
      </Modal>
    </div>
  )
}

export default SavingsWallet