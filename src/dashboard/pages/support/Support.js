import { NavLink, Outlet } from 'react-router-dom';
import './support.css';

export default function Support() {

    return (
        <div className="my-5 p-4 mx-4 support">
            <h1>Loan Request Form</h1>
            <div className="support-nav">
                <div className="d-flex align-items-center justify-content-around w-25">
                    <NavLink className="" to="/dashboard/support/help">
                        Help
                    </NavLink>
                    <NavLink to="/dashboard/support/faq">
                        FAQs
                    </NavLink >
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}