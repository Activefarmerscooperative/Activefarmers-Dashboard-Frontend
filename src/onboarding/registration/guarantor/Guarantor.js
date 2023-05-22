import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Success from "../../../modal/Success";
import "./guarantor.css";
import { confirmTokenIsValid, AddGuarantor } from "../../../utils/api/member"
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function Guarantor() {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [guarantor, setGuarantor] = useState({
        full_name: "",
        address: "",
        email: "",
        phone: "",
        gender: "",
        occupation: ""
    })

    useEffect(() => {
        // Check if user can access this page info on component mount.
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function confirmToken() {
            try {
                await confirmTokenIsValid(signal)
            } catch (error) {
                toast.error("Un-Authorized");
                navigate("/register", { replace: true })
            }
        }
        confirmToken()

        return () => {
            abortController.abort(); // Cancel the request on component unmount
        };
    }, [])

    const handleChange = (e) => {

        const { name, value } = e.target;
        setGuarantor({ ...guarantor, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!guarantor.full_name) {
            errors.full_name = "Guarantor's name is required";
        }

        if (!guarantor.address) {
            errors.address = 'Guarantor address is required';
        }

        if (!guarantor.email) {
            errors.email = 'Email Address is required';
        }

        if (!guarantor.phone) {
            errors.phone = 'Phone Number is required';
        }
        if (!guarantor.gender) {
            errors.phone = 'Gender is required';
        }
        if (!guarantor.occupation) {
            errors.phone = 'Occupation is required';
        }

        return errors;
    };

    async function handleSubmit(e) {
        e.preventDefault()

        // Validate the form inputs
        const errors = validateForm();


        // If form validation fails
        if (Object.keys(errors).length > 0) {
            const firstFieldName = Object.keys(errors)[0];
            toast.error(errors[firstFieldName]);
            return;
        }
        setIsLoading(true)
        try {
            const data = await AddGuarantor(guarantor);
            toast.success(data.message)
            openModal()
            // localStorage.setItem("AFCS-token", data.afcsToken)

            setIsLoading(false);
            navigate("/register/guarantor", { replace: true })

        } catch (error) {

            setIsLoading(false);
            toast.error(error);
        }

    }

    return (
        <div className="guarantor px-5 py-2">
            <div className="d-flex flex-column align-items-center py-3 my-4 guarantor-content">
                <h1 className="my-3">Guarantor's Details</h1>
                <p>Please complete this form to the best of your ability providing all relevant details about your guarantor</p>
                <div className="d-flex flex-column align-items-center form">

                    <form action="" method="post" className=" d-flex align-items-center justify-content-center my-5">
                        <div>
                            <input type="text" name="full_name" onChange={handleChange} value={guarantor.full_name} placeholder="Guarantor's Full Name" />
                            <input type="email" name="email" onChange={handleChange} value={guarantor.email} placeholder="Guarantor's Email Address" />
                            <select name="gender" onChange={handleChange} value={guarantor.gender}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <input type="text" name="address" value={guarantor.address} onChange={handleChange} placeholder="Guarantor's Address" />
                            <input type="tel" name="phone" value={guarantor.phone} onChange={handleChange} placeholder="Guarantor's Number e.g:+23487654321" />
                            <input type="text" name="occupation" value={guarantor.occupation} onChange={handleChange} placeholder="Guarantors Occupation" />
                        </div>
                    </form>
                    <div className="d-flex">
                        {/* <button onClick={() => { navigate("/register/farm"); }} className="mx-4 btn guarantor-btn prev">Previous</button> */}
                        {isLoading && <center className="btn member-btn"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                        {!isLoading && <button onClick={handleSubmit} disabled={isLoading} className="btn member-btn">Submit</button>}

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