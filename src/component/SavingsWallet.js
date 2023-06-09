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
    const [savingsVisibility, setSavingsVisibility] = useState({});
    const toggleSavingsVisibility = (wallet) => {
        setSavingsVisibility((prevState) => ({
          ...prevState,
          [wallet]: !prevState[wallet]
        }));
      };


    const [wallet, setWallet] = useState([])
    // React query fecth data
    const { data, status } = useQuery(['fetchData'], fetchData)

    useEffect(() => {
        if (!data) return
        console.log(data)
        setWallet(data.savingsWallet?.categories)
    }, [data])

    return (
        <div className="category-form-group d-flex align-items-center">
            {/* {
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
            } */}

{
              wallet?.map(item => <div className="px-3 card my-savings" key={item._id}>

                <p className='text-start savings-title'>{item.category.name}</p>

                  <div className="form-group d-flex align-items-center justify-content-between">

                    {savingsVisibility[item._id] ? (
                      // <input
                      //   type="text"
                      //   name="savings"
                      //   id="savings"
                      //   value={`${item.amount} NGN`}
                      //   placeholder=""
                      //   readOnly
                      // />
                      <span className="savings-value">{`${item.amount} NGN`}</span>
                    ) : (
                      <span className="hidden-input">********</span>
                    )}


                    <div onClick={() => toggleSavingsVisibility(item._id)}>
                      <Icon
                        icon={savingsVisibility[item._id] ? "mdi:eye" : "mdi:eye-off"}
                        className="eye-icon"
                      />
                      {/* <Icon icon={savingsIcon[item._id] ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' /> */}
                    </div>

                  </div>
                <div className="">
                  <p >Add Savings</p>
                </div>
              </div>)
            }
        </div>
    )
}

export default SavingsWallet