import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Icon } from '@iconify/react';
import header from '../../assets/logol.png';
import './dashboard.css';
import '../notification/notifications.css'
import NotificationPopUp from '../../components/reusable/NotificationPopUp';
// import NotificationsPage from './NotificationsPage';
import notificationsData from '../../components/data/notificationsData';

export default function Dashboard() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(notificationsData.notifications);
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false);
  const [deleteIconVisible, setDeleteIconVisible] = useState(Array(notifications?.length).fill(false));


  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => {
      return {
        ...notification,
        read: true
      };
    });
    setNotifications(updatedNotifications);
  };

  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const handleMouseEnter = (index) => {
    const updatedDeleteIconVisible = [...deleteIconVisible];
    updatedDeleteIconVisible[index] = true;
    setDeleteIconVisible(updatedDeleteIconVisible);
  };

  const handleMouseLeave = (index) => {
    const updatedDeleteIconVisible = [...deleteIconVisible];
    updatedDeleteIconVisible[index] = false;
    setDeleteIconVisible(updatedDeleteIconVisible);
  };







  return (
    <div className="">
      <div className=" d-flex flex-column dashboard">
        <div className="header-section container-fluid">
          <div className="d-flex align-items-center justify-content-between header-components">
            <div className='d-flex align-items-center'>
              <img src={header} alt="" onClick={() => { navigate("/admin/dashboard"); }} />
              <h1>AFC Admin Dashboard</h1>
            </div>

            <div className="d-flex align-items-center justify-content-around header-buttons">
              <Icon icon="clarity:notification-line" className='mx-3' onClick={() => setShowNotificationPopUp(true)} />
              {/* <Icon onClick={() => { navigate("/admin/dashboard/profile"); }} icon="solar:user-outline" className='mx-3' /> */}

              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <Icon icon="solar:user-outline" className='mx-3' />
                </button>
                <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenuButton">
                  <li onClick={() => navigate("/admin/dashboard/profile")} className="dropdown-item">View Profile</li>
                  <li onClick={() => navigate("/admin")} className="dropdown-item">Logout</li>
                </ul>
              </div>


            </div>
          </div>
        </div>

        <div>
          <Outlet notifications={notifications} markAllAsRead={markAllAsRead} handleDelete={handleDelete} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        </div>
      </div>
      {showNotificationPopUp && (
        <NotificationPopUp
          notifications={notifications}
          setNotifications={setNotifications}
          markAllAsRead={markAllAsRead}
          onClose={() => setShowNotificationPopUp(false)}
          onDelete={handleDelete}
        />

      )}

    </div>
  )
}