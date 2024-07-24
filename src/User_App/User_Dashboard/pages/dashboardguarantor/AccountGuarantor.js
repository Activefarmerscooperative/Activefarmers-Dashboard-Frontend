import React, { useState, useEffect } from "react";
import './dashguarantor.css';
import { useQuery } from 'react-query'
import { toast } from "react-toastify";
import { BankDetails, BankList, GuarantorDetails, UpdateBankDetails, UpdateGuarantorDetails } from '../../../../utils/api/member';
import { RotatingLines } from "react-loader-spinner";
import Modal from 'react-modal';
import ProfileUpdateModal from "../../../../modal/ProfileUpdateModal";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'

const fetchData = async (key) => {

  try {
    const guarantor = await GuarantorDetails();
    const bank = await BankDetails();
    const bankList = await BankList()
    const res = await Promise.all([bank, guarantor, bankList]);
    return res

  } catch (error) {
    toast.error(error.error);
    // toast.error(error);
  }
};
const AccountGuarantor = ({ setToke }) => {
  const dispatch = useDispatch()
  const [editAccount, setEditAccount] = useState(false)
  const [editGuarantor, setEditGuarantor] = useState(false)
  const [bankDetails, setBankDetails] = useState({})
  const [guarantorDetails, setGuarantorDetails] = useState({})
  const [banks, setBanks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [guarantorLoading, setGuarantorLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState('');

  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();


  function openModal(actionType) {
    setIsOpen(true);
    setModalActionType(actionType);
  }

  function closeModal() {
    setIsOpen(false);
    setEditAccount(false);
    setEditGuarantor(false)

  }


  // React query fetch data
  const { data, status } = useQuery(['fetchData'], fetchData)

  useEffect(() => {
    if (!data) return;
    console.log("Fetched data:", data);
    setBankDetails(data[0]?.bank_details || {});
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
        console.log("Account number input:", value);
        return setBankDetails({ ...bankDetails, [name]: value });

      } else {
        toast.error("Only numbers are allowed")
      }
    }
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const handleGuarantorChange = (e) => {

    const { name, value } = e.target;
    console.log("Guarantor details input:", { [name]: value });
    setGuarantorDetails({ ...guarantorDetails, [name]: value });
  }

  async function updateAccount() {

    // if (!window.confirm("Are you sure you want to update your bank details?")) return
    // if (!updateData) return
    setIsLoading(true)

    try {
      const data = await UpdateBankDetails({ ...bankDetails, accountNumber: `${bankDetails.accountNumber}` })
      toast.success(data.message)
      closeModal()
      // localStorage.setItem("AFCS-token", data.token)
      dispatch(setToken(data?.token))
      setToke(data.token)
    } catch (error) {
      // toast.error(error)
      toast.error(error?.error)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateGuarantor() {

    setIsLoading(true)

    try {
      console.log("Updating guarantor details:", guarantorDetails);
      const data = await UpdateGuarantorDetails(guarantorDetails)
      toast.success(data.message);
      closeModal();
      localStorage.setItem("AFCS-token", data.token)
      setToken(data.token);

    } catch (error) {
      // toast.error(error)
      toast.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  function confirmUpdate(type) {
    if (type === "Account") {
      if (!bankDetails?.bankName || !bankDetails?.accountNumber || !bankDetails?.accountName) return toast.error("All inputs are required.");

      openModal('save');
    } else {
      if (!guarantorDetails?.full_name || !guarantorDetails?.phone ||
        !guarantorDetails?.address || !guarantorDetails?.email || !guarantorDetails?.gender ||
        !guarantorDetails?.occupation) {
        return toast.error("All inputs are required.");

      }
      openModal('save');
    }

  }





  return (
    <div className="px-4 guarantor-account">
      <h1>Account & Guarantor</h1>
      <div className="px-4 py-2  guarantor-account-form">

        <form action="" >
          <div>
            <p>Account Details</p>
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="form-group d-flex flex-column mx-3">
                  <label htmlFor="">Account Name</label>
                  <input type="text" name="accountName" onChange={handleAccountChange} value={bankDetails?.accountName} disabled={!editAccount} placeholder="Type Account Name..." />
                </div>
              </div>

              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3 ">
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
              </div></div>


              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Account Number</label>
                <input type="text" name="accountNumber" value={bankDetails?.accountNumber} onChange={handleAccountChange} disabled={!editAccount} placeholder="Type account Number..." />
              </div></div>

            </div>
            <div className="d-flex">
              {
                !editAccount &&
                <button onClick={() => setEditAccount(true)} className="btn edit mx-3 my-4">
                  Edit
                </button>
              }

              {editAccount && (
                <div>
                  <>
                    {isLoading && <button className="btn mx-3 my-4"><RotatingLines width="15" strokeColor="#1B7B44" strokeWidth="3" /></button>}
                    {!isLoading &&
                      <>
                        {!isLoading && <button onClick={
                          // () => setEditAccount(false)
                          // openModal
                          () => openModal('discard')
                        } disabled={isLoading} className="btn discard mx-3 my-4">Discard Changes</button>}
                        <button onClick={(e) => {
                          e.preventDefault()
                          confirmUpdate("Account")
                        }} disabled={isLoading} className="btn mx-3 my-4 ">Save</button>
                      </>}

                  </>

                </div>
              )}
            </div>
          </div>



          <div className="mt-5">

            <p>Guarantor's Details</p>
            <div className="row">
              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Full Name</label>
                <input type="text" name="full_name" onChange={handleGuarantorChange} disabled={!editGuarantor} value={guarantorDetails?.full_name} placeholder="Type Full Name.." />
              </div></div>


              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Phone Number</label>
                <input type="tel" name="phone" value={guarantorDetails?.phone} onChange={handleGuarantorChange} disabled={!editGuarantor} placeholder="Type Phone..." />
              </div></div>


              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Email Address</label>
                <input type="email" name="email" value={guarantorDetails?.email} onChange={handleGuarantorChange} disabled={!editGuarantor} placeholder="Type  Email..." />
              </div></div>

              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Residential Address</label>
                <input type="text" name="address" value={guarantorDetails?.address} onChange={handleGuarantorChange} disabled={!editGuarantor} placeholder="Type Address..." />
              </div></div>

              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Guarantor's Occupation</label>
                <input type="text" name="occupation" onChange={handleGuarantorChange} value={guarantorDetails?.occupation} disabled={!editGuarantor} placeholder="Type Occupation..." />
              </div></div>

              <div className="col-md-4 col-sm-6"><div className="form-group d-flex flex-column mx-3">
                <label htmlFor="">Gender</label>
                <select name="gender" value={guarantorDetails?.gender} onChange={handleGuarantorChange} disabled={!editGuarantor}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              </div>

            </div>
            <div className="d-flex">
              {
                !editGuarantor &&
                <button onClick={() => setEditGuarantor(true)} className="btn edit mx-3 my-4">
                  Edit
                </button>
              }

              {editGuarantor && (
                <div>
                  <>
                    {!guarantorLoading &&
                      <>
                        {!isLoading && <button onClick={
                          // () => setEditGuarantor(false)
                          () => openModal('discard')
                        } disabled={isLoading} className="btn mx-3 discard my-4">Discard Changes</button>}
                        <button onClick={(e) => {
                          e.preventDefault();
                          confirmUpdate("Guarantor")
                        }} disabled={isLoading} className="btn mx-3 my-4 save">Save</button>
                      </>}

                  </>

                </div>
              )}
            </div>

          </div>
        </form>


      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}

        contentLabel="Example Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
        shouldCloseOnOverlayClick={true}
      >
        <ProfileUpdateModal
          closeModal={closeModal}
          closeModaltwo={closeModal}
          actionType={modalActionType}
          updateAction={editAccount ? updateAccount : updateGuarantor}
          isLoading={isLoading}
        // loanData={loanData}
        />
      </Modal>
    </div>
  );
};

export default AccountGuarantor;
