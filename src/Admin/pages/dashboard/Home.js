import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import StatisticCard from '../../widgets/StatisticCard'
import './dashboard.css';
import Tab from '../../widgets/Tab';


export default function Home() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCardSection = () => {
        setIsCollapsed(!isCollapsed);
    };

    // const data = require('../../components/data/Users.json');

    const tabs = [
        {
          name: 'Members',
         
        },
        {
          name: 'Borrowers',
          
        },
        {
          name: 'Loan Requests',
        },
        {
            name: 'Savings Withdrawal Request',
            
        },
      ];

    return(
        <div>
                    <div className="dashboard-body mt-5 pt-5 mx-3 px-3">
                        <div className="summary-section">
                            {!isCollapsed ? <p className='mb-4'> Welcome back Admin 1 to Active Farmers Cooperative Admin Dashboard</p> : ""}
                            <div className="d-flex align-items-center statistics ">
                                {!isCollapsed ? <div className={`d-flex justify-content-around cards-section ${isCollapsed ? "collapsed" : ""}`}>
                                    <StatisticCard title="Cooperative Balance" number={34000000} showIcon />
                                    <StatisticCard title="Members Savings" number={12650000} showIcon />
                                    <StatisticCard title="Loaned Out" number={13450000} showIcon />
                                    <StatisticCard title="Total Borrowers" number={350} />
                                    <StatisticCard title="Total Members" number={1024} />
                                </div> : <p className='mx-3 mb-0'> Welcome back Admin 1 to Active Farmers Cooperative Admin Dashboard</p>}

                                <div className="fold-up" onClick={toggleCardSection}>
                                    <Icon icon={isCollapsed ? "octicon:fold-up-24" : "octicon:fold-down-24"} />
                                </div>
                            </div>
                        </div>

                        <div className="tab-section mt-5">
                            {/* <Outlet /> */}
                        <Tab tabs={tabs} defaultTab="Members" />
                        </div>
                    </div>
                </div>
    )
}