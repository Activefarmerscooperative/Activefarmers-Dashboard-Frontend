// Profile.js
import React from 'react';
import { Icon } from '@iconify/react';
import PersonalInfoCard from '../../../../widgets/UserPersonalInfoCard';
import InformationSection from '../../../../components/reusable/UserAccountInfo';
import userData from './UsersInfo.json';


const Profile = () => {

  const user = userData.users[0]; // Assuming you want to display the information for the first user

  const personalInfoData = [
    { label: 'First Name', value: user.personalInfo.firstName },
    { label: 'Last Name', value: user.personalInfo.lastName },
    { label: 'Email Address', value: user.personalInfo.email },
    { label: 'Phone Number', value: user.personalInfo.phoneNumber },
  ];

  const addressInfoData = [
    { label: 'State', value: user.addressInfo.state },
    { label: 'Origin LGA', value: user.addressInfo.originLGA },
    { label: 'Residence LGA', value: user.addressInfo.residenceLGA },
    { label: 'Residential Address', value: user.addressInfo.residentialAddress },
  ];

  const occupationInfoData = [
    { label: 'Job Title', value: user.occupationInfo.jobTitle },
    { label: 'Monthly Income', value: user.occupationInfo.monthlyIncome },
    { label: 'Account Number', value: user.occupationInfo.accountNumber },
    { label: 'Company/Ministry Name', value: user.occupationInfo.companyName },
    { label: 'Work Grade/Level', value: user.occupationInfo.workGrade },
  ];

  const nextOfKinData = [
    { label: 'Full Name', value: user.nextOfKin.fullName },
    { label: 'Phone Number', value: user.nextOfKin.phoneNumber },
    { label: 'Relationship', value: user.nextOfKin.relationship },
    { label: 'Email Address', value: user.nextOfKin.email },
    { label: 'Residential Address', value: user.nextOfKin.residentialAddress },
  ];

 
  return (
    <div className="">

      <div className="profile mx-2">
       
          <div>
            <InformationSection title="Personal Information" information={personalInfoData} />
            <InformationSection title="Address Information" information={addressInfoData} />
            <InformationSection title="Occupation Information" information={occupationInfoData} />
            <InformationSection title="Next of Kin" information={nextOfKinData} />
          </div>
      </div>
    </div>
  );
};

export default Profile;
