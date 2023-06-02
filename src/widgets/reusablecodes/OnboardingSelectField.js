import React from "react";
import './reusable.css';

const OnboardingSelectField = ({ options, value, onChange, id, name }) => {
    return (
        <div className="onboarding-form-input">
            <select value={value} onChange={onChange} name={name}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>

    );
};

export default OnboardingSelectField;