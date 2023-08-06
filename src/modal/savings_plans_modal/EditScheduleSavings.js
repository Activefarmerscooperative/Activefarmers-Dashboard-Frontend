import React, { useState } from "react";
import { Icon } from '@iconify/react';
import "../modal.css";
import Modal from 'react-modal';
import SavingsPaymentMethod from './SavingsPaymentMethod';

function EditScheduleSavings({closeModal}) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal () {
        setIsOpen(true);
    };
    function onCloseModal() {
        setIsOpen(false);
    }



    return (
        <div className='add-savings-modal p-4 my-4' >
            <div className="d-flex flex-column add-savings-div">
                <p onClick={closeModal} className="d-flex align-items-center mx-5" >
                    <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
                    Edit Scheduled Savings
                </p>
                <div className="d-flex flex-column align-items-center mt-4">
                    <p>
                        Schedule monthly savings into your cooperative account
                    </p>
                    <span>You can cancel scheduled savings at anytime</span>
                    <form action="" className="d-flex flex-column align-items-center">
                        <input type="number" name="amount" placeholder="50,000" min="0" required />
                        <input type="text" name="newCategory" placeholder="07/22/23" />
                    </form>
                    <button className="btn btn-modal mt-5" onClick={openModal}>Next</button>


                </div>

            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={onCloseModal}
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

                <SavingsPaymentMethod
                    closeModal={onCloseModal} />



            </Modal>

        </div>
    )
}

export default EditScheduleSavings