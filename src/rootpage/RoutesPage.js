
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";

//Routes
import FormPage from "../pages/forms/Form";
import Login from "../pages/forms/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import RootLayout from "./RootLayout";
import UserProfile from "../pages/profilepage/user/UserProfile";
import Home from "../pages/dashboard/Home";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<FormPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} >
            <Route path="/dashboard" element={<Home />} />
                <Route path="/dashboard/userprofile" element={<UserProfile />} />
            </Route>

        </Route>
    )
)

function RoutesPage() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}
export default RoutesPage;
