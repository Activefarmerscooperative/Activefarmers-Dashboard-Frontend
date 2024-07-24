import { useState, useEffect } from 'react';
import profileimage from '../assets/team1.png';
import { useQuery } from 'react-query'
import StatisticCard from './StatisticCard';
import { MemberLoan, MemberSavings } from "../../utils/api/admin"
import { toast } from "react-toastify";

const userStat = async (key, user) => {
    if (!user) return
    try {
        let savings = await MemberSavings(user)
        let loan = await MemberLoan(user)
        const res = Promise.all([savings, loan])
        return res

    } catch (error) {
        toast.error(error.error);
    }
};

export default function PersonalInfoCard({ userData }) {
    const [userInfo, setData] = useState();
    const [stat, setSTat] = useState([]);
    const [showAcceptButton, setShowAcceptButton] = useState(false);

    useEffect(() => {
        if (userData && userData.regCompletePercent && parseFloat(userData.regCompletePercent) < 150) {
            setShowAcceptButton(true);
        } else {
            setShowAcceptButton(false);
        }
    }, [userData]);


    // React query fetch data
    const { data, status } = useQuery(['userStat', userInfo?._id], userStat)
    useEffect(() => {
        if (!data) return
        setSTat(data)
    }, [data])

    useEffect(() => {
        if (!userData.user) {
            setData(userData)
        } else {
            setData(userData.user)
        }
    }, [userData])

    return (
        <div className='d-flex flex-column'>
            <div className="d-flex  personal-info px-3 ">
                <div className="d-flex users-personal-info">
                    <img src={userInfo?.photo} alt="" />
                    <div className="d-flex align-items-center users-personal-data">
                        <div className="names mx-3">
                            <h4>{userInfo?.surname} {userInfo?.firstname}</h4>
                            <p>Member| Borrower| Saver</p>
                            <p><span>Gender:</span> {userInfo?.gender}</p>
                            <p><span>Registration Status:</span> {userInfo?.regCompletePercent} %</p>
                        </div>
                        <div className='account-info mx-3'>
                            <p> <span>Date Joined:</span> {new Date(userInfo?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p><span>Category:</span> {userInfo?.membershipType}</p>
                            <p><span>Age:</span> {Math.floor(Math.abs(new Date() - new Date(userInfo?.DOB)) / (1000 * 60 * 60 * 24 * 365.25))} Years</p>
                        </div>
                    </div>

                </div>

                <div className="d-flex mx-3 profile-stat-card">
                    <StatisticCard title="Total Savings" number={stat[0]} member={true} />
                    <StatisticCard title="Loan Amount" number={stat[1]} member={true} />
                </div>
            </div>
            <div className='accept-btn'>
                {showAcceptButton && <button className='btn'>Accept</button>}
                {/* Other components */}
            </div>

            <hr />
        </div>
    )
}