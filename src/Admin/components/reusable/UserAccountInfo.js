import React from 'react';

const InformationSection = ({ title, information }) => {
  return (
    <div className='px-3 my-4'>
      <p className='h6'>{title}</p>
      <div className="  mt-3 personalinfo-user">
        {information.map((item, index) => (
          <p className='d-flex flex-column info ' key={index}>
            <span>{item.label}</span>
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InformationSection;
