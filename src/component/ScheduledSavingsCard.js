import React, { useState, useEffect } from "react";
import { GetScheduledSavings, GetWallet } from '../utils/api/member';
import { useQuery } from 'react-query'
import { Icon } from '@iconify/react';
import AddSavings from "../modal/AddSavings";
import Modal from 'react-modal';
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";



function ScheduledSavingsCards({ data }) {
    const [savingsVisibility, setSavingsVisibility] = useState({});
    const [wallet, setWallet] = useState(data)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);




    return (
        <div className="list-of-wallets  d-flex align-items-center">


            {
                wallet?.map(item => <div className="px-3 card my-savings" key={item._id}>

                    <p className='text-start savings-title'>{item.category}</p>
                    <p>Deduction Day: {new Date(item.scheduledDate).getDay()} of every month.</p>

                    <div className="  d-flex align-items-center justify-content-between">

                        <span className="savings-value">{`${item.amount} NGN`}</span>


                    </div>
                    {/* <div className="">
                        <p onClick={() => {
                            // setSelectedCategory(item.category)

                        }}>Add Savings</p>
                    </div> */}
                </div>)
            }

        </div>
    )
}

export default ScheduledSavingsCards