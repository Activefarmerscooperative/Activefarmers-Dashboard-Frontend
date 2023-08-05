import React, { useState, useEffect } from "react";
import savingsPlansData from "./SavingsPlanData";
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
import { GetScheduledSavings } from "../../../../utils/api/member";

const fetchScheduledSavings = async (key) => {

    try {
        const res = await GetScheduledSavings();
        return res

    } catch (error) {
        toast.error(error?.error);
    }
};
export default function ScheduleSavings() {
    const [loanInputType, setLoanInputType] = useState("false");
    const [loanIcon, setLoanIcon] = useState("mdi:eye-off");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalData, setModalData] = useState({})
    const [savingsData, setSavingsData] = useState([])
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

    const openModal = (modalType, info) => () => {
        console.log("yeah")
        setIsOpen(true);
        setModalType(modalType);
        setModalData(info)
    };

    function closeModal() {
        setIsOpen(false);
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
                                <button onClick={openModal('addSavingsPlans')} className="schedule-savings-btn btn mt-5">
                                    Schedule Savings
                                </button>
                            </div>
                        </div> :
                        <ScheduledSavingsCards
                            data={savingsData}
                        />
            }




            <div className="schedule-savings-list">
                <p>
                    This is history of your scheduled saving, 50,000 is deducted from your account on 30th of every month
                </p>

                <div className="d-flex justify-content-evenly align-items-center">
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
                                {savingsPlansData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="edit-savings-plans-section">
                        <div className="total-schedule-savings my-4">
                            <div className="p-3 card loan">
                                <div className="d-flex flex-column">
                                    <p className='savings-title'>Total scheduled savings</p>
                                    {loanInputType ? (
                                        <span className="savings-value"> 450,000 NGN</span>
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

                        <div className="edit-savings savings-plan-link mt-3" onClick={openModal('edit')}>
                            <h5 className="edit-savings">
                                Edit Savings
                                <Icon icon="fluent:ios-arrow-24-filled" />
                            </h5>
                            <p>Change your scheduled savings date and amount</p>
                        </div>
                        <div className="change-savings-card savings-plan-link mt-3" onClick={openModal('changeCard')}>
                            <h5 className="edit-savings">
                                Change savings card
                                <Icon icon="fluent:ios-arrow-24-filled" />
                            </h5>
                            <p>Change the card your scheduled savings will be deducted from</p>
                        </div>
                        <div className="cancel-savings savings-plan-link mt-3" onClick={openModal('cancelPlan')}>
                            <h5 className="edit-savings">
                                Cancel savings
                                <Icon icon="fluent:ios-arrow-24-filled" />
                            </h5>
                            <p>Cancel your scheduled savings</p>
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
                    closeModal={closeModal} />}
                {modalType === "handleCard" && <SavingsPaymentMethod
                    closeModal={closeModal}
                    data={modalData}
                />}

                {modalType === "cancelPlan" && <CancelSavingsPlan
                    closeModal={closeModal} />}

            </Modal>

        </div>
    )
}