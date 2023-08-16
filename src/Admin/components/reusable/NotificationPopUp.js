import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { Icon } from '@iconify/react';

Modal.setAppElement('#root'); // Set the root element for react-modal

const NotificationPopUp = ({ notifications, setNotifications, markAllAsRead, onClose }) => {
  const navigate = useNavigate();
  const [deleteIconVisible, setDeleteIconVisible] = useState(Array(notifications.length).fill(false));

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



  const displayedNotifications = notifications.slice(0, 5);
  
  return (
    <Modal isOpen={true} onRequestClose={onClose} contentLabel="notification pop-up">
      <div className="notification-header px-4 py-2">
        <button className="mark-all-btn" disabled={!notifications.some(notification => !notification.read)} onClick={markAllAsRead}>
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

            <div className="notification-content" onClick={() =>  {navigate("/admin/dashboard/notifications"); onClose();}}>
              <div className="notification-title">{notification.message}</div>
              <div className="notification-message">{notification.date}</div>
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
        <div onClick={() => { navigate("/admin/dashboard/notifications"); onClose(); }}> See all notifications ({notifications.length})</div>


      </div>
    </Modal>
  );
};

export default NotificationPopUp;
