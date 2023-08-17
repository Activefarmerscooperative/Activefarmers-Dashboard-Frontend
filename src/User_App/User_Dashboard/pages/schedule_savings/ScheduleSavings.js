import React, { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, TablePagination } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import './schedulesavings.css'
import EditScheduleSavings from "../../../../modal/savings_plans_modal/EditScheduleSavings";
import SavingsPaymentMethod from "../../../../modal/savings_plans_modal/SavingsPaymentMethod";
import ScheduleSavingsPlans from "../../../../modal/savings_plans_modal/ScheduleSavingsPlans";
import CancelSavingsPlan from "../../../../modal/savings_plans_modal/CancelSavingsPlan";
import { useQuery } from 'react-query'
import ScheduledSavingsCards from "../../../../component/ScheduledSavingsCard";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { GetScheduledSavingCard, GetScheduledSavings } from "../../../../utils/api/member";
import SavingsWallet from "../../../../component/SavingsWallet";
import ScheduleSavingsWallet from "../../../../component/ScheduleSavingsWallet";

const fetchScheduledSavings = async (key) => {

    try {
        const res = await GetScheduledSavings();
        return res

    } catch (error) {
        toast.error(error?.error);
    }
};

export default function ScheduleSavings({ wallet }) {
    const [loanInputType, setLoanInputType] = useState("false");
    const [loanIcon, setLoanIcon] = useState("mdi:eye-off");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalData, setModalData] = useState({})
    const [savingsData, setSavingsData] = useState([])
    const [activeWallet, setActiveWallet] = useState(null);
    // React query fecth data
    const { data, status } = useQuery(['fetchScheduledSavings'], fetchScheduledSavings)

    useEffect(() => {
        if (!data) return
        setSavingsData(data.scheduledSavings)
    }, [data])


    const toggleLoanVisibility = () => {
        setLoanInputType(loanInputType ? false : true);
        setLoanIcon(!loanIcon);
    };

    const openModal = (modalType, info) => {
        if (modalType === "addSavingsPlans" || activeWallet) {
            setIsOpen(true);
            setModalType(modalType);
            setModalData(info);
        }
    };


    function closeModal() {
        setIsOpen(false);
    }
    const suffix = (d) => (d > 3 && d < 21) || d % 10 > 3 ? 'th' : ['st', 'nd', 'rd'][d % 10 - 1] || 'th';

    // console.log(filteredData)

    async function getScheduledSavingsCard(id) {
        if (!activeWallet) return toast.error("Please click on a scheduled savings to change card details.")
        try {
            toast.info("Fetching Card Please wait")
            const data = await GetScheduledSavingCard(id)
            console.log(data)
            openModal("changeCard", data)
        } catch (error) {
            console.log(error)
            toast.error(error)
            toast.error(error?.error)
        }
    }

    return (
        <div className="schedule-savings-page my-3 px-3">
            <h1>Schedule Savings</h1>
            {
                status === "loading" ? <div className="px-3 card pikin">
                    <center style={{ height: '100', overflow: 'hidden' }} className=""><RotatingLines width="20" /></center>
                </div> :
                    savingsData.length === 0 ?
                        <div className="empty-schedule-savings">
                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                <Icon icon="fluent:savings-20-filled" hFlip={true} className='savings-icon' />
                                <p>No Scheduled Savings</p>
                                <span>You currently do not have a scheduled savings plan, click on the button below to start</span>
                                <button onClick={() => openModal('addSavingsPlans')} className="schedule-savings-btn btn mt-5">
                                    Schedule Savings
                                </button>
                            </div>
                        </div> :
                        <div className="savings-wallet-category my-4">
                            <ScheduleSavingsWallet setActiveWallet={setActiveWallet} savingsPlansData={savingsData} />
                        </div>
            }

            <div className="">
                {

                    activeWallet &&
                    <p>
                        This is history of your scheduled saving, {activeWallet?.amount} is deducted from your account on {activeWallet.scheduledDate}{suffix(activeWallet.scheduledDate)} of every month
                    </p>
                }

                <div className="d-flex justify-content-evenly align-items-start schedule-savings-list">
                    <div className="schedule-savings-history ">
                        <h3 className="history-title">History</h3>
                        <Table className=''>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {savingsPlansData.map((item, index) => ( */}

                                {activeWallet && activeWallet.savings?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{new Date(item?.createdAt).toDateString()}</TableCell>
                                        <TableCell>{item?.amount}</TableCell>
                                        <TableCell>{item?.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="edit-savings-plans-section">
                        <div className="total-schedule-savings mb-4">
                            <div className="p-3 card loan">
                                <div className="d-flex flex-column">
                                    <p className='savings-title'>Total scheduled savings in {activeWallet?.category} category</p>
                                    {loanInputType ? (
                                        <span className="savings-value"> {activeWallet && activeWallet?.savings?.reduce((total, { amount }) => total + amount, 0)} 0 NGN</span>
                                    ) : (
                                        <span className="hidden-input ">*********</span>
                                    )}
                                    <div onClick={toggleLoanVisibility} className="ms-auto">
                                        <Icon
                                            icon={loanIcon ? "mdi:eye-off" : "mdi:eye"}
                                            className="eye-icon"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="savings-edit-links">
                        <div className="edit-savings savings-plan-link mt-3" onClick={() => openModal('addSavingsPlans')}>
                            <p className="edit-savings">
                                Add Savings
                                <Icon icon="fluent:ios-arrow-24-filled" />
                            </p>
                            <p>Add a new scheduled savings with date, amount and your wallet category</p>
                        </div>
                        <div className="edit-savings savings-plan-link mt-3" onClick={() => openModal('edit')}>
                            <p className="edit-savings">
                                Edit Savings
                                <Icon icon="fluent:ios-arrow-24-filled" />
                            </p>
                            <p>Change your scheduled savings date and amount</p>
                        </div>
                        <div className="change-savings-card savings-plan-link mt-3" onClick={() => getScheduledSavingsCard(activeWallet?._id)}>
                            <p className="edit-savings">
                                Change savings card
                                <Icon icon="fluent:ios-arrow-24-filled" />
                            </p>
                            <p>Change the card your scheduled savings will be deducted from</p>
                        </div>
                        <div className="cancel-savings savings-plan-link mt-3" onClick={() => openModal('cancelPlan')}>
                            <p className="edit-savings">
                                Cancel savings
                                <Icon icon="fluent:ios-arrow-24-filled" />
                            </p>
                            <p>Cancel your scheduled savings</p>
                        </div>
                        </div>
                        

                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Modal"
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
                {modalType === "addSavingsPlans" && <ScheduleSavingsPlans
                    closeModal={closeModal}
                    openModal={openModal}
                />}
                {modalType === "edit" && <EditScheduleSavings
                    activeSavings={activeWallet}
                    closeModal={closeModal} />}
                {modalType === "changeCard" && <SavingsPaymentMethod

                    closeModal={closeModal}
                    data={modalData}
                />}

                {modalType === "cancelPlan" && <CancelSavingsPlan
                   activeSavings={activeWallet}
                    closeModal={closeModal} />}

            </Modal>

        </div>
    )
}