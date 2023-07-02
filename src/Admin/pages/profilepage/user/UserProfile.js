import React, { useState } from 'react';
import '../profile.css';
import Profile from './sidebar_content/Profile';
import { Icon } from '@iconify/react';
import Guarantor from './sidebar_content/Guarantor';
import PersonalInfoCard from '../../../widgets/UserPersonalInfoCard';
import Loan from './sidebar_content/Loan';
import SavingsWithdrawals from './sidebar_content/Witdrawal';

export default function UserProfile() {
  const [selectedComponent, setSelectedComponent] = useState('profile');

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="user-profile mt-5 pt-3">
      <div className="sidebar m-3 ">
        <p className={selectedComponent === 'profile' ? 'active' : ''}
          onClick={() => handleComponentClick('profile')}>Profile</p>

        <p className={selectedComponent === 'guarantor' ? 'active' : ''}
          onClick={() => handleComponentClick('guarantor')}>Guarantor</p>

        <p className={selectedComponent === 'loan' ? 'active' : ''}
          onClick={() => handleComponentClick('loan')}>Loan</p>

        <p className={selectedComponent === 'withdrawal' ? 'active' : ''}
          onClick={() => handleComponentClick('withdrawal')}>Withdrawal</p>
      </div>
      <div className="content px-3">
        <div className='mx-3'>
          <h4 className='go-back' onClick={goBack}>< Icon icon="material-symbols:arrow-back-rounded" className="back-icon" /> Back To Dashboard</h4>
          <div className='user-info-section py-3 my-3'>
            <PersonalInfoCard />
            <hr />
            <div>
              {selectedComponent === 'profile' && <Profile />}
              {selectedComponent === 'guarantor' && <Guarantor />}
              {selectedComponent === 'loan' && <Loan />}
              {selectedComponent === 'withdrawal' && <SavingsWithdrawals />}
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}

