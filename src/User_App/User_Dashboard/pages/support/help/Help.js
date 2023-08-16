import { Icon } from '@iconify/react';
import './help.css'

export default function Help() {
    return (
        <div className="help p-3 m-3">
            <div className="d-flex justify-content-around contact ">
                <div className="d-flex flex-column  info">
                    <div className="email">
                        <div className="d-flex mb-3">
                            <Icon icon="material-symbols:mail-rounded" className='help-icons' />
                            <p>Send us an email (we reply within 24hours)</p>

                        </div>
                        <a href="mailto:activefarmersinfo@gmail.com">activefarmersinfo@gmail.com</a>
                    </div>

                    <div className="phone d-flex flex-column mt-5">
                        <div className="d-flex align-items-start mt-5 mb-3 phone-instruction">
                            <Icon icon="material-symbols:call" className='help-icons' />
                            <p>Tap the number to call {<br />} <span>Phone lines are available between {<br />} 9:00 AM and 5:00 PM on weekdays</span></p>
                        </div>
                        <div className='d-flex flex-column'>
                            <a href="tel:+2349024392982">09024392982</a>
                        <a href="tel:+2348042736998">08042736998</a>
                        </div>
                        
                    </div>
                </div>
                <div className="contact-form">
                    <p>Send us a message, we'll respond via email</p>
                    <form action="" className='d-flex flex-column '>
                        <input type="text" name="name" placeholder="Full Name" id="" />
                        <input type="email" name="email" placeholder='Email Address' id="" />
                        <textarea name="message" placeholder='Type message...' id="" cols="30" rows="10"></textarea>
                    </form>
                    <div className='email-button'>
                        <button className="btn my-4">
                        Submit
                    </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}