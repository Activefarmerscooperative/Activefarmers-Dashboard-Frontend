import React from "react";
import './reusable.css';

const DashboardSelectField = ({ options, value, onChange }) => {
    return (
        <div className="dashboard-form-input">
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>

    );
};

export default DashboardSelectField;