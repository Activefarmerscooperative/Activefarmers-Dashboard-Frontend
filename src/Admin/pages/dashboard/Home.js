import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useQuery } from 'react-query'

import { Icon } from '@iconify/react';
import StatisticCard from '../../widgets/StatisticCard'
import './dashboard.css';
import Tab from '../../widgets/Tab';
import { TotalSavings, MembersCount, BorrowersCount,TotalLoans } from "../../../utils/api/admin"

const fetchData = async (key, tab) => {
    let res;
    try {
        let savings = await TotalSavings()
        let loans = await TotalLoans()
        let borrowers = await BorrowersCount()
        let members = await MembersCount()
        const res = Promise.all([savings,loans,borrowers,members])
        return res

    } catch (error) {
        toast.error(error.error);
    }
};


export default function Home() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [stat, setSTat] = useState([])

    const toggleCardSection = () => {
        setIsCollapsed(!isCollapsed);
    };

    // React query fetch data
    const { data, status } = useQuery(['fetchData'], fetchData)

    useEffect(() => {
    if(!data) return
    setSTat(data)
    }, [data])
    


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

    return (
        <div>
            <div className="dashboard-body mt-5 pt-5 mx-3 px-3">
                <div className="summary-section">
                    {!isCollapsed ? <p className='mb-4'> Welcome back Admin 1 to Active Farmers Cooperative Admin Dashboard</p> : ""}
                    <div className="d-flex align-items-center statistics ">
                        {!isCollapsed ? <div className={`d-flex justify-content-around cards-section ${isCollapsed ? "collapsed" : ""}`}>
                            <StatisticCard title="Cooperative Balance" number={34000000} showIcon />
                            <StatisticCard title="Members Savings" number={stat[0]} showIcon />
                            <StatisticCard title="Loaned Out" number={stat[1]} showIcon />
                            <StatisticCard title="Total Borrowers" number={stat[2]} />
                            <StatisticCard title="Total Members" number={stat[3]} />
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