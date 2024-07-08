import { Icon } from '@iconify/react';
import './help.css'

export default function Help() {
    return (
        <div className="help ">
            <div className="row contact ">
                <div className="col-md-6">
                    <div className="d-flex flex-column  info">
                        <div className="email">

                            <Icon icon="material-symbols:mail-rounded" className='help-icons me-2' />
                            <div>
                                <p>Send us an email (we reply within 24hours)</p>
                                <p className='href'><a href="mailto:activefarmersinfo@gmail.com">activefarmersinfo@gmail.com</a></p>
                                
                            </div>

                        </div>

                        <div className="phone mt-5">
                            <Icon icon="material-symbols:call" className='help-icons me-2' />
                            <div>
                                <p>Tap the number to call </p>
                                <p className='href'><a href="tel:+2349024392982">09024392982 </a> {"|"}
                                    <a href="tel:+2348042736998"> 08042736998</a>
                                    </p>

                                <p className='span'>Phone lines are available between {<br />} 9:00 AM and 5:00 PM on weekdays</p>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="contact-form">
                        <p>Send us a message, we'll respond via email</p>
                        <form action="" className='mt-2 '>
                            <div className="row flex-column">
                                <div className="col-md-12"><input type="text" name="name" placeholder="Full Name" id="" /></div>
                                <div className="col-md-12"><input type="email" name="email" placeholder='Email Address' id="" /></div>
                                <div className="col-md-12"><textarea name="message" placeholder='Type message...' id="" cols="30" rows="10"></textarea></div>
                            </div>
                        </form>
                        <button className="btn my-4 ">
                            Submit
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}