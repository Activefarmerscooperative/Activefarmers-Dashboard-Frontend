import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Modal from 'react-modal';
import Success from "../../../modal/Success";
import "./guarantor.css";

export default function Guarantor() {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className="guarantor px-5 py-2">
            <div className="d-flex flex-column align-items-center py-3 my-4 guarantor-content">
                <h1 className="my-3">Guarantor's Details</h1>
                <p>Please complete this form to the best of your ability providing all relevant details about your guarantor</p>
                <div className="d-flex flex-column align-items-center form">

                    <form action="" method="post" className=" d-flex align-items-center justify-content-center my-5">
                        <div>
                            <input type="text" name="name" id="" placeholder="Guarantor's Name" />
                            <input type="email" name="email" id="" placeholder="Guarantor's Email Address" />
                            <select name="gender" id="">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <input type="text" name="address" id="" placeholder="Guarantor's Address" />
                            <input type="tel" name="phone" id="" placeholder="Guarantor's Number" />
                            <input type="text" name="occupation" id="" placeholder="Guarantors Occupation" />
                        </div>
                    </form>
                    <div className="d-flex">
                        <button onClick={() => { navigate("/register/farm"); }} className="mx-4 btn guarantor-btn prev">Previous</button>
                        <button onClick={openModal} className="mx-4 btn guarantor-btn submit">Submit</button>
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
                    shouldCloseOnOverlayClick={true}
                    closeTimeoutMS={2000}
                >
                    <Success />
                </Modal>
            </div>
        </div>
    )
}