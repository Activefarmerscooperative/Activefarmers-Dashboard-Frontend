import React, { useState, useEffect } from 'react';
import '../../profile.css'
import ActiveLoanDetails from '../loancontent/ActiveLoanDetails';
import LoanTable from '../loancontent/LoanTable';
import loanData from "../../../../components/data/LoanTransaction.json";
//import userData from './UsersInfo.json';


const LoanPage = (userData) => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeStatusCount, setActiveStatusCount] = useState(0);
    const [userId, setUserId] = useState("")
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
      console.log(userData)
      if(userData.userData.user){
        setUserId(userData.userData.user._id)
      }else{
        setUserId(userData.userData._id)
      }
    }, [userData])
    
    useEffect(() => {
        // setTransactions(loanData);
        const countActiveStatus = loanData.filter((item) => item.item?.status === 'Active').length;
        setActiveStatusCount(countActiveStatus);
    }, [loanData]);

    return (
        <div>
            <div className="mx-3">
                <div className="d-flex align-items-center justify-content-around tab-headers">
                    <div
                        className={`tab-header text-nowrap ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => handleTabClick(0)}
                    >
                        Active Loan Details
                    </div>
                    <div
                        className={`px-2 tab-header text-nowrap ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => handleTabClick(1)}
                    >
                        Loan Tab
                        {activeStatusCount !== 0 ? <sup className="notification mx-1">{activeStatusCount}</sup> : null}

                    </div>
                </div>
                <div className="tab-content">
                    {activeTab === 0 && (
                        <div className='p-2'>
                            <ActiveLoanDetails Id={userId} />
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div>
                            <div className="p-2"><LoanTable userId={userId} /></div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default LoanPage;
