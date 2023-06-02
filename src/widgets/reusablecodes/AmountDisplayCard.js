import React from "react";
import { Icon } from '@iconify/react';
import './reusable.css'

const AmountDisplayCard = ({ inputType, value, name, title, loanIcon, superscriptext, subscriptext, onClick  }) => {
    return (
        <div className="display-amount-input">
            {/* <input
                value={value}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
            /> */}

            <div className="px-3 card loan">
                <div className="d-flex align-items-center justify-content-between">
                    <p className='savings-title'>{title}</p>
                    <p>{superscriptext}</p>
                </div>
                <form action="" >
                    <div className="form-group d-flex align-items-center">
                        <input
                            type={{ inputType } ? "text" : "password"}
                            name={name}
                            id={name}
                            value={value } />
                        <div onClick={onClick}>
                            <Icon icon={{ loanIcon } ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                        </div>

                    </div>
                </form>
                <div className="">
                    <p >{subscriptext}</p>
                </div>
            </div>












        </div>
    );
};

export default AmountDisplayCard;
