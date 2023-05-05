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
import Login from '../onboarding/login/Login';
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
import Faq from "../dashboard/pages/support/faq/Faq";
import Help from "../dashboard/pages/support/help/Help";
import AccountGuarantor from "../dashboard/pages/dashboardguarantor/AccountGuarantor";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<LandingPage />} ></Route>
      <Route path="/login" element={<Login />} />
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
        <Route path="/dashboard/support" element={<Support />} >
        <Route path="/dashboard/support" element={<Help />} />
          <Route path="/dashboard/support/help" element={<Help />} />
          <Route path="/dashboard/support/faq" element={<Faq />} />
        </Route>
        <Route path="/dashboard/guarantor" element={<AccountGuarantor />} />
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
