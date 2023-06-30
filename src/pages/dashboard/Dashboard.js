
import { useNavigate, Outlet } from "react-router-dom";
import { Icon } from '@iconify/react';
import header from '../../assets/logol.png';
import './dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="">
            <div className=" d-flex flex-column dashboard">
                <div className="header-section">
                    <div className="d-flex align-items-center justify-content-between header-components">
                        <div className='d-flex align-items-center'>
                            <img src={header} alt="" />
                            <h1>AFC Admin Dashboard</h1>
                        </div>

                        <div className="d-flex align-items-center justify-content-around header-buttons">
                            <Icon icon="clarity:notification-line" className='mx-3' />
                            <Icon onClick={() => { navigate("/dashboard/userprofile"); }} icon="solar:user-outline" className='mx-3' />
                        </div>
                    </div>
                </div>

                <div>
                    <Outlet />
                </div>


            </div>

        </div>
    )
}