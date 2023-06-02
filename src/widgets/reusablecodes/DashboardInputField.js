import React from "react";
import './reusable.css'

const DashboardInputField = ({value,type, name, id,  placeholder }) => {
  return (
    <div className="dashboard-form-input">
      <input
      value={value}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}        
      />
    </div>
  );
};

export default DashboardInputField;
