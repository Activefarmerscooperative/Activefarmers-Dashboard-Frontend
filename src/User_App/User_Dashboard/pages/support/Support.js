import React, { useState } from 'react';
import Help from './help/Help';
import Faqs from './faq/Faq';
import './support.css';

export default function Support() {

    /*Function for tab change */
    const [activeTab, setActiveTab] = useState(1);
    function handleTabClick(tabIndex) {
        setActiveTab(tabIndex);
    }

    return (
        <div className="my-5 p-4 mx-4 support">
            <h1>Support</h1>
            <div>
                <div className="support-tab my-5">
                    <div className=" d-flex align-items-center  w-25">
                        <div
                            className={activeTab === 1 ? "tab-item active" : "tab-item"}
                            onClick={() => handleTabClick(1)}
                        >
                            Help
                        </div>
                        <div
                            className={activeTab === 2 ? "tab-item active" : "tab-item"}
                            onClick={() => handleTabClick(2)}
                        >
                            FAQs
                        </div>
                    </div>

                </div>

                <div className="tab-content">
                    {activeTab === 1 && <div><Help /></div>}
                    {activeTab === 2 && <div><Faqs /></div>}
                </div>
            </div>









        </div>
    )
}