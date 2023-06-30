// Profile.js
import React from 'react';
import { Icon } from '@iconify/react';
import PersonalInfoCard from '../../../../widgets/UserPersonalInfoCard';
import InformationSection from '../../../../components/reusable/UserAccountInfo';
import userData from './UsersInfo.json';


const Guarantor = () => {

    const user = userData.users[1]; // Assuming you want to display the information for the first user

    const guarantorInformation = [
        { label: 'Full Name', value: user.guarantorInformation.fullName},
        { label: 'Phone Number', value: user.guarantorInformation.phoneNumber },
        { label: 'Gender', value: user.guarantorInformation.gender },
        { label: 'Email Address', value: user.guarantorInformation.email },
        { label: 'Residential Address', value: user.guarantorInformation.residentialAddress },
        { label: 'Occupation', value: user.guarantorInformation.occupation },        
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
