import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './notifications.css'

const NotificationsPage = ({ notifications, markAllAsRead, handleDelete, handleMouseEnter, handleMouseLeave }) => {

  
  return (
    <div className="notifications-page mt-5 pt-5 ">
    <h1>All Notifications</h1>
    {/* {notifications && notifications.length > 0 ? (
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
            <div className="notification-title">{notification.title}</div>
            <div className="notification-message">{notification.message}</div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No notifications found.</p>
    )} */}
     <ul>
        {notifications.map(notification => (
          <li key={notification.id} className={`my-3 notification.read ? 'read' : 'unread' `}>
            <div className="notification-title">{notification.message}</div>
            <div className="notification-message">{notification.date}</div>
          </li>
          
        ))}
      </ul>
      <hr />
    <Link to="/admin/dashboard" className='backto-admin my-3'>Go back</Link>
  </div>
  );
};

export default NotificationsPage;
