
import React, { useEffect,useState } from 'react';
import { Link} from 'react-router-dom'; // Assuming you're using React Router
import './notifications.css'
import moment  from 'moment/moment';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { GetNotifications } from '../../../utils/api/admin';

const fetchNotificationData = async () => {
  try {
    const res = await GetNotifications()
    return res
  } catch (error) {
    toast.error(error)
  }
}
const NotificationsPage = ({ markAllAsRead, handleDelete, handleMouseEnter, handleMouseLeave }) => {
  const [notifications, setNotifications] = useState([])
  // React query fetch data
  const { data, status } = useQuery(['fetchNotificationData'], fetchNotificationData)

  useEffect(() => {
    if (!data) return
    setNotifications(data)
  }, [data])


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
        {notifications?.map(notification => (
          <li key={notification.id} className={`my-3 notification.read ? 'read' : 'unread' `}>
            <div className="notification-title">{notification.type === "Registration" ? "New user just signed up with Active Farmers Cooperative" :
              notification.type === "Withdrawal" ? `New savings withdrawal request from ${notification?.user?.firstname} ${notification?.user?.surname}` :
                notification.type === "Loan" ? `New loan request from ${notification?.user?.firstname} ${notification?.user?.surname}` : ""}</div>
            <div className="notification-message">{moment(notification?.createdAt).fromNow()}</div>
          </li>

        ))}
      </ul>
      <hr />
      <Link to="/admin/dashboard" className='backto-admin my-3'>Go back</Link>
    </div>
  );
};

export default NotificationsPage;
