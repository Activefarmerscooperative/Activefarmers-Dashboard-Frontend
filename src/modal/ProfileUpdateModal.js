
import { Icon } from '@iconify/react';
import "./modal.css"



import React from 'react'

function ProfileUpdateModal({closeModal, closeModaltwo, name}) {

    return (
        <div className='profile-update-modal p-4 my-4'>
            <div className="d-flex flex-column align-items-center add-savings-div">
                <Icon icon="solar:question-circle-bold" className="icon" />
                <div className="d-flex flex-column align-items-center mt-4">

                    <p>
                        Are you sure you want to discard changes made to profile details
                    </p>


                    <div className='d-flex'>
                    <button onClick={closeModal}  className="btn btn-modal mx-3 mt-5">Yes, discard</button>
                        <button onClick={closeModaltwo}  className="btn btn-modal mx-3 mt-5">No, go back</button>
                    </div>



                </div>

            </div>

        </div>
    )
}

export default ProfileUpdateModal;