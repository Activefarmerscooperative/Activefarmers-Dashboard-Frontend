import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import './dashguarantor.css';
import { useQuery } from 'react-query'
import { toast } from "react-toastify";
import { BankDetails, BankList, GuarantorDetails, UpdateBankDetails, UpdateGuarantorDetails } from '../../../utils/api/member';
import { RotatingLines } from "react-loader-spinner";
import Modal from 'react-modal';
import ProfileUpdateModal from "../../../modal/ProfileUpdateModal";
import { useLocation, useNavigate } from 'react-router-dom';

const fetchData = async (key) => {

  try {
    const guarantor = await GuarantorDetails();
    const bank = await BankDetails();
    const bankList = await BankList()
    const res = await Promise.all([bank, guarantor, bankList]);
    return res

  } catch (error) {
    toast.error(error.error);
  }
};
const AccountGuarantor = ({ setToken }) => {
  const [editAccount, setEditAccount] = useState(false)
  const [editGuarantor, setEditGuarantor] = useState(false)
  const [bankDetails, setBankDetails] = useState({})
  const [guarantorDetails, setGuarantorDetails] = useState({})
  const [banks, setBanks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [guarantorLoading, setGuarantorLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
    setEditAccount(false);
    setEditGuarantor(false)
  }
  function closeModal() {
    setIsOpen(false);
  }



  // React query fetch data
  const { data, status } = useQuery(['fetchData'], fetchData)

  useEffect(() => {
    if (!data) return
    setBankDetails(data[0]?.bank_details || {})
    setGuarantorDetails(data[1]?.guarantor_details?.guarantor)
    setBanks(data[2]?.banks)
  }, [data])

  useEffect(() => {
    //If the request comes from withdrawal or Loan page
    //If the user has bank account already updated, redirect to profile pg.
    if (!data) return
    if (state) {
      if (data[0]?.bank_details) {
        // console.log(data[0]?.bank_details)
        navigate("/dashboard/profile", { replace: true })
      }
    }

  }, [data, location.state])

  const handleAccountChange = (e) => {
    const numberPattern = /^[0-9]*$/;
    const { name, value } = e.target;
    if (name === "accountNumber") {
      if (numberPattern.test(value)) {
        return setBankDetails({ ...bankDetails, [name]: value });

      } else {
        toast.error("Only numbers are allowed")
      }
    }
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const handleGuarantorChange = (e) => {

    const { name, value } = e.target;
    setGuarantorDetails({ ...guarantorDetails, [name]: value });
  }

  async function updateAccount() {

    if (!bankDetails?.bankName || !bankDetails?.accountNumber) return toast.error("All inputs are required.")
    if (!window.confirm("Are you sure you want to update your bank details?")) return
    setIsLoading(true)

    try {
      const data = await UpdateBankDetails({ ...bankDetails, accountNumber: `${bankDetails.accountNumber}` })
      toast.success(data.message)
      setEditAccount(false)
      localStorage.setItem("AFCS-token", data.token)
      setToken(data.token)
    } catch (error) {
      toast.error(error)
      toast.error(error?.error)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateGuarantor() {

    if (!guarantorDetails?.full_name || !guarantorDetails?.phone ||
      !guarantorDetails?.address || !guarantorDetails?.email || !guarantorDetails?.gender ||
      !guarantorDetails?.occupation) return toast.error("All inputs are required.")

    if (!window.confirm("Are you sure you want to update your guarantor details?")) return

    setGuarantorLoading(true)

    try {
      const data = await UpdateGuarantorDetails(guarantorDetails)
      toast.success(data.message)
      setEditGuarantor(false)
    } catch (error) {
      toast.error(error)
    } finally {
      setGuarantorLoading(false)
    }
  }




  return (
    <div className="my-5 p-4 guarantor-account">
      <h1>Account & Guarantor</h1>
      <div className="px-4 py-2 card guarantor-account-form">
        <div>
          <form action="" className="d-flex flex-column align-items-center">
            <p>Account Details</p>
            <div className="d-flex">
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Account Name</label>
                <input type="text" name="accountName" onChange={handleAccountChange} value={bankDetails?.accountName} disabled={!editAccount} placeholder="Enter account name" />
              </div>
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Bank Name</label>
                {/* Note this is because the bank list is passed as object */}
                <select name="" onChange={(e) => {
                  if (e.target.value === bankDetails?.bankName) return
                  const bank = JSON.parse(e.target.value)
                  setBankDetails({
                    ...bankDetails,
                    bankName: bank.name,
                    bankCode: bank.code
                  })

                }}
                  // value={console.log(banks?.filter(bank=>bank.code===bankDetails?.bankCode)[0]) } 
                  disabled={!editAccount}>
                  <option>{bankDetails?.bankName}</option>
                  {
                    banks?.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>)
                  }

                </select>
              </div>
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Account Number</label>
                <input type="text" name="accountNumber" value={bankDetails?.accountNumber} onChange={handleAccountChange} disabled={!editAccount} placeholder="0123456" />
              </div>
            </div>
          </form>
          <div className="d-flex">
            {
              !editAccount &&
              <button onClick={() => setEditAccount(true)} className="btn edit mx-4 my-5">
                Edit
              </button>
            }

            {editAccount && (
              <div>
                <>
                  {isLoading && <button className="btn mx-4 my-5"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></button>}
                  {!isLoading &&
                    <>
                      {!isLoading && <button onClick={
                        // () => setEditAccount(false)
                        openModal
                      } disabled={isLoading} className="btn discard mx-4 my-5">Discard Changes</button>}
                      <button onClick={updateAccount} disabled={isLoading} className="btn mx-4 my-5">Save</button>
                    </>}

                </>

              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <form action="" className="d-flex flex-column align-items-center">
            <p>Guarantor's Details</p>
            <div className="d-flex">
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Full Name</label>
                <input type="text" name="full_name" onChange={handleGuarantorChange} disabled={!editGuarantor} value={guarantorDetails?.full_name} placeholder="Joseph Ojih" />
              </div>
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Phone Number</label>
                <input type="tel" name="phone" value={guarantorDetails?.phone} onChange={handleGuarantorChange} disabled={!editGuarantor} placeholder="+2348123456789" />
              </div>
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Email Address</label>
                <input type="email" name="email" value={guarantorDetails?.email} onChange={handleGuarantorChange} disabled={!editGuarantor} placeholder="joe@yahoo.com" />
              </div>
            </div>
            <div className="d-flex mt-4">
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Residential Address</label>
                <input type="text" name="address" value={guarantorDetails?.address} onChange={handleGuarantorChange} disabled={!editGuarantor} placeholder="Airforce Base, Jimeta-Yola Adamawa" />
              </div>
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Occupation</label>
                <input type="text" name="occupation" onChange={handleGuarantorChange} value={guarantorDetails?.occupation} disabled={!editGuarantor} placeholder="FullStack Developer" />
              </div>
              <div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Gender</label>
                <select name="gender" value={guarantorDetails?.gender} onChange={handleGuarantorChange} disabled={!editGuarantor}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </form>
          <div className="d-flex">
            {
              !editGuarantor &&
              <button onClick={() => setEditGuarantor(true)} className="btn edit mx-4 my-5">
                Edit
              </button>
            }

            {editGuarantor && (
              <div>
                <>
                  {guarantorLoading && <button className="btn mx-4 my-5"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></button>}
                  {!guarantorLoading &&
                    <>
                      {!isLoading && <button onClick={
                        // () => setEditGuarantor(false)
                        openModal
                      } disabled={isLoading} className="btn mx-4 discard my-5">Discard Changes</button>}
                      <button onClick={updateGuarantor} disabled={isLoading} className="btn mx-4 my-5">Save</button>
                    </>}

                </>

              </div>
            )}
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
          base: 'profile-overlay-base',
          afterOpen: 'overlay-base_after-open',
          beforeClose: 'overlay-base_before-close'
        }}
        shouldCloseOnOverlayClick={false}
      >
        <ProfileUpdateModal
          closeModal={closeModal}
          closeModaltwo={closeModal}
        // loanData={loanData}
        />
      </Modal>
    </div>
  );
};

export default AccountGuarantor;
