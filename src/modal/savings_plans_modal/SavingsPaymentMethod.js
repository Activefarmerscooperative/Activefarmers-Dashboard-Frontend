
import { Icon } from '@iconify/react';
import "../modal.css";
import React from 'react';
import paymentCardImage from '../../assets/creditcard.png'

function SavingsPaymentMethod({closeModal}) {

   

    return (
        <div className='add-savings-modal p-4 my-4' >
            <div className="d-flex flex-column add-savings-div">
                <p onClick={closeModal} className="d-flex align-items-center mx-5" >
                    <Icon icon="material-symbols:arrow-back-rounded" className="add-icon" />
                    Savings Payment Method
                </p>
                <div className="d-flex flex-column align-items-center mt-4">
                    <p>
                    Continue with saved card?
                    </p>
                    <form action="" className="d-flex flex-column align-items-center ">
                       
                        <input type="number" name="SavingsPaymentMethod" placeholder="234***************019" />
                        <div className='ms-auto'>Verve Card <img src={paymentCardImage} alt="" /></div>
                    </form>

                    <div className="d-flex mt-5 continue-saving">
                    <button  className="btn change-card btn-modal mx-3">Change Card</button>
           <button  className="btn no btn-modal mx-3">Yes</button>         </div>
                    


                </div>

            </div>

        </div>
    )
}

export default SavingsPaymentMethod