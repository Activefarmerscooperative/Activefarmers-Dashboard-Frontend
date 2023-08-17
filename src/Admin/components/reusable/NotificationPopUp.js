import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import { GetNotifications } from '../../../utils/api/admin';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import moment  from 'moment/moment';

const fetchNotificationData = async () => {
  try {
    const res = await GetNotifications()
    return res
  } catch (error) {
    toast.error(error)
  }
}
Modal.setAppElement('#root'); // Set the root element for react-modal

const NotificationPopUp = ({ markAllAsRead, onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([])
  const [deleteIconVisible, setDeleteIconVisible] = useState(Array(notifications?.length).fill(false));

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
  // React query fetch data
  const { data, status } = useQuery(['fetchNotificationData'], fetchNotificationData)

  useEffect(() => {
    if (!data) return
    setNotifications(data)
  }, [data])


  const displayedNotifications = notifications?.slice(0, 5);
  return (
    <Modal isOpen={true} onRequestClose={onClose} contentLabel="notification pop-up">
      <div className="notification-header px-4 py-2">
        <button className="mark-all-btn" disabled={!notifications?.some(notification => !notification.read)} onClick={markAllAsRead}>
          Mark all as read
        </button>
        <button className="close-btn" onClick={onClose}>
          <Icon icon="iconoir:cancel" />
        </button>
      </div>
      <div className="notifications-container p-3">
        {/* {notifications.map(notification => ( */}
        {displayedNotifications.map((notification, index) => (
          <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>

            <div className="notification-content">
              <div className="notification-title">{notification.type === "Registration" ? "New user just signed up with Active Farmers Cooperative" :
                notification.type === "Withdrawal" ? `New savings withdrawal request from ${notification?.user?.firstname} ${notification?.user?.surname}` :
                  notification.type === "Loan" ? `New loan request from ${notification?.user?.firstname} ${notification?.user?.surname}` : ""}</div>
              <div className="notification-message">{moment(notification?.createdAt).fromNow()}</div>
            </div>
            {/* <div className="notification-dot" onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}>
              {deleteIconVisible[index] && (
                <button className="delete-icon" onClick={() => handleDelete(notification.id)}>
                  <Icon icon="iconoir:cancel" />
                </button>
              )}
            </div> */}
            <div className={`notification-dot ${markAllAsRead ? "read" : "unread"}`}>
              <div
                className=""
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {deleteIconVisible[index] && (
                  <button onClick={() => handleDelete(notification.id)}>
                    <Icon icon="iconoir:cancel" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="footer">
        <div onClick={() => { navigate("/admin/dashboard/notifications",{state:notifications}); onClose(); }}> See all notifications ({notifications.length})</div>


      </div>
    </Modal>
  );
};

export default NotificationPopUp;
