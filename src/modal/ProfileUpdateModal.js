
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'

function ProfileUpdateModal({closeModal, closeModaltwo, actionType}) {
    // const discardText = "Are you sure you want to discard changes made to profile details";
    // const saveText = "Are you sure you want to save changes made to profile details";
    // const yesButtonText = isSaveClicked ? "Yes, save" : "Yes, discard";
    // const noButtonText = isSaveClicked ? "Cancel" : "No, go back";
    
    const isDiscardAction = actionType === "discard";
    return (
        <div className='profile-update-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center add-savings-div">
                <Icon icon="solar:question-circle-bold" className="icon" />
                <div className="d-flex flex-column align-items-center mt-4">

                    <p>
                    {isDiscardAction
              ? "Are you sure you want to discard changes made to profile details"
              : "Are you sure you want to save changes made to profile details"}
         
                        {/* Are you sure you want to discard changes made to profile details */}
                    </p>


                    <div className='d-flex'>
                    <button onClick={closeModal}  className="btn btn-modal mx-3 mt-5">{isDiscardAction ? "Yes, discard" : "Yes, save"}</button>
                        <button onClick={closeModaltwo}  className="btn btn-modal mx-3 mt-5">{isDiscardAction ? "No, go back" : "Cancel"}</button>
                    </div>



                </div>

            </div>

        </div>
    )
}

export default ProfileUpdateModal;