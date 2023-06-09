import React, { useState, useEffect } from "react";
import { GetWallet } from '../utils/api/member';
import { useQuery } from 'react-query'
import { Icon } from '@iconify/react';

const fetchData = async (key) => {

    try {
        const res = await GetWallet();
        return res

    } catch (error) {
        console.log(error)
        // toast.error(error.error);
    }
};

function SavingsWallet() {
    const [savingsInputType, setSavingsInputType] = useState("false");
    const [savingsIcon, setSavingsIcon] = useState("mdi:eye-off");
    const [toggleWalletVisibility, setToggleWalletVisibility] = useState("")
    const toggleSavingsVisiblity = () => {
        setSavingsInputType(savingsInputType ? false : true);
        setSavingsIcon(!savingsIcon);
    };
    const [wallet, setWallet] = useState([])
    // React query fecth data
    const { data, status } = useQuery(['fetchData'], fetchData)

    useEffect(() => {
        if (!data) return
        setWallet(data.savingsWallet?.categories)
    }, [data])

    return (
        <div className="form-group d-flex align-items-center">
            {
                wallet?.map(item => <div className="px-3 card my-savings">

                    <p className='text-start savings-title'>{item.category.name}</p>

                    <form action="" >
                        <div className="form-group d-flex align-items-center">
                            <input
                                type={
                                    (item._id === toggleWalletVisibility && savingsInputType) ? "text" : "text"
                                }
                                name="savings"
                                id="savings"
                                value={`${item.amount} NGN`}
                                placeholder='' />
                            <div onClick={() => toggleSavingsVisiblity(item._id)}>
                                <Icon icon={savingsIcon ? "mdi:eye" : "mdi:eye-off"} className='eye-icon' />
                            </div>

                        </div>
                    </form>

                </div>)
            }
        </div>
    )
}

export default SavingsWallet