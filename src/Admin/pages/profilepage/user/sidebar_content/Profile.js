// Profile.js
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import PersonalInfoCard from '../../../../widgets/UserPersonalInfoCard';
import InformationSection from '../../../../components/reusable/UserAccountInfo';
import userData from './UsersInfo.json';


const Profile = ({ userData }) => {
  const [userInfo, setData] = useState()
  useEffect(() => {
    if (!userData.user) {
    
      setData(userData)
    } else {
      setData(userData?.user)
    }
  }, [userData])


  const personalInfoData = [
    { label: 'First Name', value: userInfo?.firstname },
    { label: 'Last Name', value: userInfo?.surname },
    { label: 'Email Address', value: userInfo?.email },
    { label: 'Phone Number', value: userInfo?.phone },
  ];

  const addressInfoData = [
    { label: 'State', value: userInfo?.location?.name },
    // { label: 'Origin LGA', value: user.addressInfo.originLGA },
    // { label: 'Residence LGA', value: user.addressInfo.residenceLGA },
    { label: 'Residential Address', value: userInfo?.address },
  ];

  const occupationInfoData = [
    { label: 'Job Title', value: userInfo?.occupation?.occupation },
    { label: 'Monthly Income', value: userInfo?.occupation?.salary },
    { label: 'Company/Ministry Name', value: userInfo?.occupation?.companyName },
    { label: 'Work Grade/Level', value: userInfo?.occupation?.workLevel },
  ];

  const nextOfKinData = [
    { label: 'Full Name', value: userInfo?.nextOfKin?.full_name },
    { label: 'Phone Number', value: userInfo?.nextOfKin?.phone },
    { label: 'Relationship', value: userInfo?.nextOfKin?.relationship },
    { label: 'Email Address', value: userInfo?.nextOfKin?.email },
    { label: 'Residential Address', value: userInfo?.nextOfKin?.address },
  ];


  return (
    <div className="">

      <div className="profile mx-2">

        <div>
          <InformationSection title="Personal Information" information={personalInfoData} />
          <InformationSection title="Address Information" information={addressInfoData} className="users-address" />
          <InformationSection title="Occupation Information" information={occupationInfoData} />
          <InformationSection title="Next of Kin" information={nextOfKinData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
