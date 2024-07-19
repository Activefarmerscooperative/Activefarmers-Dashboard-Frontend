import React, { useState } from 'react';
import '../profile.css';
import Profile from './sidebar_content/Profile';
import { Icon } from '@iconify/react';
import Guarantor from './sidebar_content/Guarantor';
import PersonalInfoCard from '../../../widgets/UserPersonalInfoCard';
import Loan from './sidebar_content/Loan';
import SavingsWithdrawals from './sidebar_content/Witdrawal';
import { useLocation } from "react-router-dom";

export default function UserProfile() {
  const location = useLocation()

  const { data, tab } = location.state

  const [selectedComponent, setSelectedComponent] = useState(
    tab === "Loan Requests"||tab === "Borrowers" ? "loan" : tab === "Savings Withdrawal Request" ? "withdrawal" : 'profile'
  );
  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="user-profile admin-site mt-5 pt-3">
      <div className="sidebar m-3 ">
      < Icon icon="material-symbols:arrow-back-rounded" className="back-icon go-back mobile" onClick={goBack} />
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
          <h4 className='go-back desktop' onClick={goBack}>< Icon icon="material-symbols:arrow-back-rounded" className="back-icon" /> Back To Dashboard</h4>
          <div className='user-info-section py-3 my-3'>
            <PersonalInfoCard
              userData={data}
            />
            <hr />
            <div>
              {selectedComponent === 'profile' && <Profile userData={data} />}
              {selectedComponent === 'guarantor' && <Guarantor userData={data} />}
              {selectedComponent === 'loan' && <Loan userData={data} />}
              {selectedComponent === 'withdrawal' && <SavingsWithdrawals userData={data} />}
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}

