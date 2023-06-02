import React from "react";
import './reusable.css'

const OnboardingInputField = ({value,type, name, id,  placeholder, onChange }) => {
  return (
    <div className="onboarding-form-input">
      <input
      value={value}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}        
      />
    </div>
  );
};

export default OnboardingInputField;
