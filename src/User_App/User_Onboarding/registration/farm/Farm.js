import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./farm.css"
import { confirmTokenIsValid, AddFarm } from "../../../../utils/api/member"
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function Farm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [farm, setFarm] = useState({
        farmingExperience: "",
        farmSize: "",
        cropTypes: "",
        farmAddress: "",
    })

    useEffect(() => {
        // Check if user can access this page info on component mount.
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function confirmToken() {
            try {
                const data = await confirmTokenIsValid(signal)
                if (data.user.membershipType !== "Farmer") navigate("/register/guarantor", { replace: true });
            } catch (error) {
                toast.error("Un-Authorized");
                navigate("/register/guarantor", { replace: true })
            }
        }
        confirmToken()

        return () => {
            abortController.abort(); // Cancel the request on component unmount
        };
    }, [])

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFarm({ ...farm, [name]: value });
    };

    const validateForm = () => {
        let errors = {};

        if (!farm.farmingExperience) {
            errors.farmingExperience = 'farmingExperience is required';
        }

        if (!farm.farmSize) {
            errors.firstname = 'Farm Size is required';
        }

        if (!farm.cropTypes) {
            errors.email = 'Crop Types is required';
        }

        if (!farm.farmAddress) {
            errors.phone = 'Farm Address is required';
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
            const data = await AddFarm(farm);

            toast.success(data.message)
            localStorage.setItem("AFCS-token", data.token)

            setIsLoading(false);
            navigate("/register/guarantor", { replace: true })

        } catch (error) {

            setIsLoading(false);
            toast.error(error);
        }

    }

    return (
        <div className="farm px-5 py-2">
            <div className="d-flex flex-column align-items-center py-3 my-2">
                <h1>Farm Details</h1>
                <p>Please complete this form to the best of your ability providing all correct and relevant details about your farming experience and farm details</p>

                <div className="d-flex flex-column align-items-center form ">

                    <form className=" d-flex align-items-center justify-content-center my-5">
                        <div>
                            <input type="number" name="farmingExperience" value={farm.farmingExperience} onChange={handleChange} placeholder="Years of Experience" min="0" />

                            <input type="text" name="cropTypes" value={farm.cropTypes} placeholder="Crop Type(s)" onChange={handleChange} />
                        </div>
                        <div>
                            <input type="number" name="farmSize" value={farm.farmSize} placeholder="Farm Size (Hectares)" onChange={handleChange} min="0" />
                            <input type="text" name="farmAddress" value={farm.farmAddress} onChange={handleChange} placeholder="Farm Address" />
                        </div>
                    </form>
                    {isLoading && <center className="btn member-btn"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></center>}
                    {!isLoading && <button onClick={handleSubmit} disabled={isLoading} className="btn member-btn">Submit</button>}

                </div>
            </div>
        </div>
    )
}