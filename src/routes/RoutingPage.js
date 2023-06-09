// import { Children } from "react";
import {
  createBrowserRouter,
  Route,
  // Router,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


//Onboarding Routes
import LandingPage from '../onboarding/LandingPage';
import Login from '../onboarding/loginforms/login/Login';
import Registration from "../onboarding/registration/Registration";
import Member from '../onboarding/registration/member/Member';
import Farm from '../onboarding/registration/farm/Farm';
import Guarantor from '../onboarding/registration/guarantor/Guarantor';

//Dashboard Routes
import Dashboard from "../dashboard/Dashboard";
import DashboardHome from "../dashboard/pages/home/DashboardHome";
import WitdrawalForm from "../dashboard/pages/witdrawal/Witdrawal";
import LoanForm from "../dashboard/pages/loan/LoanForm";
import ProfileUpdate from "../dashboard/pages/profile/ProfileUpdate";
import Support from "../dashboard/pages/support/Support";
import AccountGuarantor from "../dashboard/pages/dashboardguarantor/AccountGuarantor";
import LoginForm from "../onboarding/loginforms/LoginForms";
import ForgottenPassword from "../onboarding/loginforms/forgotpassword/ForgottenPassword";
import LoginOtpVerify from "../onboarding/loginforms/otpverify/LoginOtpVerify";
import CreateNewPassword from "../onboarding/loginforms/createpassword/NewPassword";
import TransactionHistory from "../dashboard/pages/TransactionHistory";


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
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/home" element={<DashboardHome />} />
        <Route path="/dashboard/witdrawal" element={<WitdrawalForm />} />
        <Route path="/dashboard/loan" element={<LoanForm />} />
        <Route path="/dashboard/profile" element={<ProfileUpdate />} />
        <Route path="/dashboard/support" element={<Support />} />
        <Route path="/dashboard/guarantor" element={<AccountGuarantor />} />
        <Route path="/dashboard/transactions" element={<TransactionHistory />} />
      </Route>
    </Route>
  )
)

function RoutingPage() {
  return (
    <div>

      <RouterProvider router={router} />
    </div>
  )
}
export default RoutingPage;
