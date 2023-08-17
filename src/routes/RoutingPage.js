// import { Children } from "react";
import {
  createBrowserRouter,
  Route,
  // Router,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


//Onboarding Routes
import LandingPage from '../User_App/LandingPage';
import Login from '../User_App/User_Onboarding/loginforms/login/Login';
import Registration from "../User_App/User_Onboarding/registration/Registration";
import Member from '../User_App/User_Onboarding/registration/member/Member';
import Farm from '../User_App/User_Onboarding/registration/farm/Farm';
import Guarantor from '../User_App/User_Onboarding/registration/guarantor/Guarantor';

//Dashboard Routes
import Dashboard from "../User_App/User_Dashboard/Dashboard";

import LoginForm from "../User_App/User_Onboarding/loginforms/LoginForms";
import ForgottenPassword from "../User_App/User_Onboarding/loginforms/forgotpassword/ForgottenPassword";
import LoginOtpVerify from "../User_App/User_Onboarding/loginforms/otpverify/LoginOtpVerify";
import CreateNewPassword from "../User_App/User_Onboarding/loginforms/createpassword/NewPassword";
import RootLayout from "../Admin/rootpage/RootLayout";
import FormPage from "../Admin/pages/forms/Form";
import AdminLogin from "../Admin/pages/forms/Login";
import AdminDashboard from "../Admin/pages/dashboard/Dashboard";
import Home from "../Admin/pages/dashboard/Home";
import UserProfile from "../Admin/pages/profilepage/user/UserProfile";
import NotificationsPage from "../Admin/pages/notification/NotificationsPage";


import notificationData from '../Admin/components/data/notificationsData'
import ProfilePage from "../Admin/pages/profilepage/user/admin/AdminProfile";
const notifications = notificationData;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<LandingPage />} ></Route>
      <Route path="/login" element={<LoginForm />}>
        <Route path="" element={<Login />} />
        <Route path="/login/forgotpassword" element={<ForgottenPassword />} />
        <Route path="/login/otp" element={<LoginOtpVerify />} />
        <Route path="/login/createpassword" element={<CreateNewPassword />} />
      </Route>
      <Route path="/register" element={<Registration />} >
        <Route path="/register" element={<Member />} />
        <Route path="/register/member" element={<Member />} />
        <Route path="/register/farm" element={<Farm />} />
        <Route path="/register/guarantor" element={<Guarantor />} />
      </Route>
      <Route path="/admin" element={<RootLayout />}>
        <Route index element={<FormPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<Home />} />
          <Route path="/admin/dashboard/profile" element={<ProfilePage  />} />
          <Route path="/admin/dashboard/userprofile" element={<UserProfile />} />
          <Route path="/admin/dashboard/notifications" element={<NotificationsPage notifications={notifications.notifications} />} />
        </Route>
        
      </Route>
      <Route path="dashboard/*" element={<Dashboard />} />
    </Route>
  )
)

function RoutingPage({ user }) {
  return (
    <div>

      <RouterProvider router={router} context={{ user }} />
    </div>
  )
}
export default RoutingPage;
