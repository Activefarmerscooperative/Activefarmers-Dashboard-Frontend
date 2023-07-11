// Profile.js
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import PersonalInfoCard from '../../../../widgets/UserPersonalInfoCard';
import InformationSection from '../../../../components/reusable/UserAccountInfo';
import userData from './UsersInfo.json';


const Guarantor = ({ userData }) => {
    const [userInfo, setData] = useState()
    useEffect(() => {
        if (!userData.user) {
         
            setData(userData)
        } else {
            setData(userData?.user)
        }
    }, [userData])

    const guarantorInformation = [
        { label: 'Full Name', value: userInfo?.guarantor?.full_name },
        { label: 'Phone Number', value: userInfo?.guarantor?.phone },
        { label: 'Gender', value: userInfo?.guarantor?.gender },
        { label: 'Email Address', value: userInfo?.guarantor?.email },
        { label: 'Residential Address', value: userInfo?.guarantor?.address },
        { label: 'Occupation', value: userInfo?.guarantor?.occupation },
    ];


    return (
        <div className="">

            <div className="profile mx-2">


                <InformationSection title="Guarantor's Information" information={guarantorInformation} />


            </div>
        </div>
    );
};

export default Guarantor;
