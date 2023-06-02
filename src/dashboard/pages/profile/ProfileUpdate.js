import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import './profile.css';
import { useQuery } from 'react-query'
import { MemberDetails, UpdateUserDetails, UpdateOccupationDetails, UpdateNextOfKinDetails } from '../../../utils/api/member';
import { fetchAllStates } from '../../../utils/api/general';
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const fetchData = async (key) => {

    try {
        const user = await MemberDetails();
        const states = await fetchAllStates();
        // const bankList = await BankList()
        const res = await Promise.all([user, states]);
        return res

    } catch (error) {
        toast.error(error);
    }
};

const ProfileUpdate = () => {
    const [inputDisabled, setInputDisabled] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showButton1, setShowButton1] = useState(true);
    const [editUser, setEditUser] = useState(false)
    const [editOccupation, setEditOccupation] = useState(false)
    const [editNextKin, setEditNextKin] = useState(false)
    const [userData, setUserData] = useState({})
    const [occupationData, setOccupationData] = useState({})
    const [nextKinData, setNextKinData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState([])

    // React query fecth data
    const { data, status } = useQuery(['fetchData'], fetchData)

    useEffect(() => {
        if (!data) return

        setUserData(data[0])
        setOccupationData(data[0]?.occupation)
        setNextKinData(data[0]?.nextOfKin)
        setLocation(data[1]?.states)
    }, [data])
    useEffect(() => {
        console.log(userData)
    }, [userData])

    const enableInputs = () => {
        setInputDisabled(false);
        setIsClicked(true);
        setShowButton(!showButton);
    };

    const changeButton = () => {
        setShowButton1(false);
    };

    const buttonStyle = {
        width: '180px',
        height: '50px',
        backgroundColor: isClicked ? '#FFFFFF' : '#FB9129',
        color: isClicked ? '#FB9129' : '#fff',
        fontSize: '20px',
        border: '2px solid #FB9129',
    };
    // Please move all styles to the style sheet
    const acoountButtonStyle = {
        width: '180px',
        height: '50px',
        backgroundColor: editUser ? '#FFFFFF' : '#FB9129',
        color: editUser ? '#FB9129' : '#fff',
        fontSize: '20px',
        border: '2px solid #FB9129',
    };
    const buttonText = isClicked ? 'Discard Changes' : 'Edit Profile';

    async function updateUser(e) {
        e.preventDefault()
        if (!userData?.surname || !userData?.firstname || !userData?.phone ||
            !userData.email || !userData.location || !userData.gender || !userData.address
        ) return toast.error("All inputs are required.")
        if (!window.confirm("Are you sure you want to update your details?")) return
        setIsLoading(true)

        try {
            const data = await UpdateUserDetails({
                surname: userData.surname,
                firstname: userData.firstname,
                phone: userData.phone,
                email: userData.email,
                DOB: userData.DOB,
                location: userData.location._id || userData.location,
                gender: userData.gender,
                address: userData.address
            })
            toast.success(data.message)
            setEditUser(false)
        } catch (error) {
            toast.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUserChange = (e) => {

        const { name, value } = e.target;
        if (name === "location") {
            let user = userData
            user.location._id = JSON.parse(value)._id
            user.location.name = JSON.parse(value).name
            setUserData(user);
        } else {
            setUserData({ ...userData, [name]: value });
        }

    };

    const handleOccupationChange = (e) => {

        const { name, value } = e.target;
        setOccupationData({ ...occupationData, [name]: value });

    };

    const handleNextKinChange = (e) => {
        const { name, value } = e.target;
        setNextKinData({ ...nextKinData, [name]: value });

    };

    async function updateUserOccupation(e) {
        e.preventDefault()
        if (!occupationData?.occupation || !occupationData?.salary || !occupationData?.workLevel ||
            !occupationData?.companyName
        ) return toast.error("All inputs are required.")
        if (!window.confirm("Are you sure you want to update your details?")) return

        setIsLoading(true)

        try {
            const data = await UpdateOccupationDetails(occupationData)
            toast.success(data.message)
            setEditOccupation(false)
        } catch (error) {
            toast.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function updateNextOfKin(e) {
        e.preventDefault()
        if (!nextKinData?.full_name || !nextKinData?.relationship || !nextKinData?.address ||
            !nextKinData?.phone
        ) return toast.error("All inputs are required.")
        if (!window.confirm("Are you sure you want to update your Next of Kin details?")) return

        setIsLoading(true)

        try {
            const data = await UpdateNextOfKinDetails(nextKinData)
            toast.success(data.message)
            setEditNextKin(false)
        } catch (error) {
            toast.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="my-5 p-4 profile-update">
            <h1>Profile Update</h1>

            <div className="px-4 py-2 card profile-form">
                <form className="d-flex flex-column align-items-center">
                    <div className="personal-info-section">
                        <p>Personal Details</p>
                        <div className="d-flex">
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">First Name</label>
                                <input type="text" name="firstname" onChange={handleUserChange} value={userData.firstname} disabled={!editUser} placeholder="Kadwama" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="surname" onChange={handleUserChange} value={userData.surname} disabled={!editUser} placeholder="Lazarus" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Email Address</label>
                                <input type="email" name="email" onChange={handleUserChange} value={userData.email} disabled={!editUser} placeholder="kadwamalazarus@gmail.com" />
                            </div>
                        </div>
                        <div className="d-flex mt-4">
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Gender</label>
                                <select name="gender" disabled={!editUser} onChange={handleUserChange} value={userData.gender} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Date of birth</label>
                                <input type="date" name="DOB" disabled={!editUser} onChange={handleUserChange} value={userData.DOB} placeholder="22 July 1985" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Phone Number</label>
                                <input type="tel" name="phone" disabled placeholder="08104046671" value={userData.phone} />
                            </div>
                        </div>
                        <div className="d-flex mt-4 me-auto">
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="address">Home Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    disabled={!editUser}
                                    value={userData.address}
                                    placeholder="Jimeta-Yola, barracks road, Yola Adamawa"
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="location">Location</label>
                                <select required name="location" onChange={handleUserChange} disabled={!editUser} value={userData?.location?._id}>
                                    <option value={userData?.location?._id}>{userData?.location?.name}</option>
                                    {
                                        location?.map(item => <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>)
                                    }

                                </select>
                            </div>
                        </div>
                        <div className="d-flex">
                            {
                                !editUser &&
                                <button onClick={() => setEditUser(true)} style={acoountButtonStyle} className="btn mx-4 my-5">
                                    Edit
                                </button>
                            }

                            {editUser && (
                                <div>
                                    <>
                                        {isLoading && <button className="btn mx-4 my-5"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></button>}
                                        {!isLoading &&
                                            <>
                                                {!isLoading && <button onClick={() => setEditUser(false)} disabled={isLoading} className="btn mx-4 my-5">Discard Changes</button>}
                                                <button onClick={updateUser} disabled={isLoading} className="btn mx-4 my-5">Save</button>
                                            </>}

                                    </>

                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 occupation-info-section">
                        <p>Occupation Details</p>
                        <div className="d-flex">
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Occupation</label>
                                <input type="text" name="occupation" value={occupationData?.occupation} onChange={handleOccupationChange} disabled={!editOccupation} placeholder="UI/UX Designer" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor=""> Salary(Monthly)</label>
                                <input type="number" name="salary" value={occupationData?.salary} onChange={handleOccupationChange} disabled={!editOccupation} placeholder="1,200,000" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Work Level/Grade</label>
                                <input type="text" name="workLevel" value={occupationData?.workLevel} onChange={handleOccupationChange} disabled={!editOccupation} placeholder="Grade 7" />
                            </div>
                        </div>
                        <div className="d-flex mt-4">
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Ministry (Company Name)</label>
                                <input type="text" name="companyName" value={occupationData?.companyName} onChange={handleOccupationChange} disabled={!editOccupation} placeholder="Discovery Hub Labondo" />
                            </div>
                            {/* <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="last name" disabled={!editUser} placeholder="Lazarus" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Email Address</label>
                                <input type="email" name="email" disabled={!editUser} placeholder="kadwamalazarus@gmail.com" />
                            </div> */}
                        </div>

                        <div className="d-flex">
                            {
                                !editOccupation &&
                                <button onClick={() => setEditOccupation(true)} style={acoountButtonStyle} className="btn mx-4 my-5">
                                    Edit
                                </button>
                            }

                            {editOccupation && (
                                <div>
                                    <>
                                        {isLoading && <button className="btn mx-4 my-5"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></button>}
                                        {!isLoading &&
                                            <>
                                                {!isLoading && <button onClick={() => setEditOccupation(false)} disabled={isLoading} className="btn mx-4 my-5">Discard Changes</button>}
                                                <button onClick={updateUserOccupation} disabled={isLoading} className="btn mx-4 my-5">Save</button>
                                            </>}

                                    </>

                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 nok-info-section">
                        <p>Next Kin</p>
                        <div className="d-flex">
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Name of Next of Kin</label>
                                <input type="text" name="full_name" value={nextKinData?.full_name} onChange={handleNextKinChange} disabled={!editNextKin} placeholder="Fred Lazarus" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Relationship</label>
                                <input type="text" name="relationship" value={nextKinData?.relationship} onChange={handleNextKinChange} disabled={!editNextKin} placeholder="Sibling" />
                            </div>
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Home Address</label>
                                <input type="text" name="address" value={nextKinData?.address} onChange={handleNextKinChange} disabled={!editNextKin} placeholder="Jimeta-Yola, barracks road, Yola Adamawa" />
                            </div>
                        </div>
                        <div className="d-flex mt-4 me-auto">
                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Phone Number</label>
                                <input type="tel" name="phone" value={nextKinData?.phone} onChange={handleNextKinChange} disabled={!editNextKin} placeholder="08104046671" />
                            </div>

                            <div className="form-group d-flex flex-column mx-3">
                                <label htmlFor="">Email Address</label>
                                <input type="email" name="email" value={nextKinData?.email} onChange={handleNextKinChange} disabled={!editNextKin} placeholder="kadwamalazarus@gmail.com" />
                            </div>
                        </div>

                        <div className="d-flex">
                            {
                                !editNextKin &&
                                <button onClick={() =>
                                    setEditNextKin(true)
                                } style={acoountButtonStyle} className="btn mx-4 my-5">
                                    Edit
                                </button>
                            }

                            {editNextKin && (
                                <div>
                                    <>
                                        {isLoading && <button className="btn mx-4 my-5"><RotatingLines width="30" strokeColor="#1B7B44" strokeWidth="3" /></button>}
                                        {!isLoading &&
                                            <>
                                                {!isLoading && <button onClick={() => setEditNextKin(false)} disabled={isLoading} className="btn mx-4 my-5">Discard Changes</button>}
                                                <button onClick={updateNextOfKin} disabled={isLoading} className="btn mx-4 my-5">Save</button>
                                            </>}

                                    </>

                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdate;
