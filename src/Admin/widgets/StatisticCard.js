import React, { useState } from "react";
import { Icon } from "@iconify/react";
import './widgets.css'

const StatisticCard = ({ title, number, showIcon, member }) => {
    const [visible, setVisible] = useState(true);

    const toggleVisibility = () => {
        setVisible(!visible);
    };
    const formattedNumber = number?.toLocaleString("en-NG", {
        useGrouping: true,
        maximumFractionDigits: 0,
    });

    return (
        <div className="d-flex flex-column justify-content-center statistic-card py-2 ">
            <div className="card-content">
                {showIcon && (
                    <div className="toggle-icon" onClick={toggleVisibility}>
                        <Icon icon={visible ? "mdi:eye" : "mdi:eye-off"} />
                    </div>
                )}
                <div className="my-2">
                    {visible ? <span>{formattedNumber} {(showIcon || member) && "NGN"}</span> : <span>*****</span>}
                </div>

                <p>{title}</p>
            </div>
        </div>
    );
};

export default StatisticCard;
