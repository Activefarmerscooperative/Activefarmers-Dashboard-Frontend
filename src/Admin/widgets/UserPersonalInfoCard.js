import profileimage from '../assets/team1.png';
import StatisticCard from './StatisticCard';

export default function PersonalInfoCard() {
    return (
        <div>
            <div className="d-flex  personal-info px-3 ">
                <img src={profileimage} alt="" />
                <div className="names mx-3">
                    <h4>Kadwama Lazarus</h4>
                    <p>Member| Borrower| Saver</p>
                    <p>Female</p>
                </div>
                <div className='account-info mx-3'>
                    <p> <span>Date Joined:</span> 17th June 2023</p>
                    <p><span>Category:</span> Non-Farmer</p>
                    <p><span>Age:</span> 24 Years</p>
                </div>
                <div className="d-flex mx-3">
                    <StatisticCard title="Total Savings" number={5500} />
                    <StatisticCard title="Loan Amount" number={500} />
                </div>
            </div>
        </div>
    )
}