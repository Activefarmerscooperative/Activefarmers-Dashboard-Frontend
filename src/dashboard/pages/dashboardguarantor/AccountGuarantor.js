import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import './dashguarantor.css';







export default class AccountGuarantor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputDisabledAccount: true,
            inputDisabledGuarantor: true,
            isAccountButtonClicked: false,
            isGuarantorButtonClicked: false,
            showAccountButton: false,
            showGuarantorButton: false,
            showAccountButton1: true,
            showGuarantorButton1: true
            // buttonText: 'Edit Profile',

        };
    }



    enableAccountInputs = () => {
        this.setState({ inputDisabledAccount: false });
        this.setState({ isAccountButtonClicked: true });
        this.setState({ showAccountButton: !this.state.showAccountButton });

        // this.setState({ buttonText: 'Discard Changes' });
    }
    enableGurantorInputs = () => {
        this.setState({ inputDisabledGuarantor: false });
        this.setState({ isGuarantorButtonClicked: true });
        this.setState({ showGuarantorButton: !this.state.showGuarantorButton });

        // this.setState({ buttonText: 'Discard Changes' });
    }
    changeAccountButton = () => {
        this.setState({ showAccountButton1: false });

    }
    changeGuarantorButton = () => {
        this.setState({ showGuarantorButton1: false });

    }


    render() {
        const acoountButtonStyle = {
            width: '180px',
            height: '50px',
            backgroundColor: this.state.isAccountButtonClicked ? '#FFFFFF' : '#FB9129',
            color: this.state.isAccountButtonClicked  ? '#FB9129' : '#fff',
            fontSize: '20px',
            border: '2px solid #FB9129',

        };
        const guarantorButtonStyle = {
            width: '180px',
            height: '50px',
            backgroundColor: this.state.isGuarantorButtonClicked ? '#FFFFFF' : '#FB9129',
            color: this.state.isGuarantorButtonClicked ? '#FB9129' : '#fff',
            fontSize: '20px',
            border: '2px solid #FB9129',

        };
        const accountButtonText = this.state.isAccountButtonClicked ? 'Discard Changes' : 'Edit Account';
        const guarantorButtonText = this.state.isGuarantorButtonClicked ? 'Discard Changes' : 'Edit Guarantor';

        return (
            <div className="my-5 p-4 guarantor-account">
                <h1>Account & Guarantor</h1>

                <div className="px-4 py-2 card guarantor-account-form">


                    <div>
                        <form action="" className='d-flex flex-column align-items-center' >
                            <p>Account Details</p>
                            <div className='d-flex'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Account Name</label>
                                    <input type="text" name="guarantorname" id="" disabled={this.state.inputDisabledAccount} placeholder='Kadwama Lazaru Deborah' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Bank Name</label>
                                    <select name="" id="" disabled={this.state.inputDisabledAccount} placeholder='Female'>
                                        <option value="unity">Unity Bank</option>
                                        <option value="gtb">Guarantee Trust Bank</option>
                                        <option value="ubs">United Bank for Africa</option>
                                        <option value="fb">First Bank</option>
                                    </select>

                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Account Number</label>
                                    <input type="number" name="acctnum" id="" disabled={this.state.inputDisabledAccount} placeholder='0026733379' />
                                </div>

                            </div>
                        </form>
                        <div className='d-flex'>
                            <button onClick={this.enableAccountInputs} style={acoountButtonStyle} className='btn mx-4 my-5'>{accountButtonText}</button>

                            {this.state.showAccountButton && (
                                <div>
                                    {this.state.showAccountButton1 ? (
                                        <button className='btn mx-4 my-5' onClick={this.changeAccountButton}>Save Changes</button>
                                    ) : (
                                        <button className=' d-flex align-items-center btn mx-4 my-5 profile-saved' >
                                            <Icon icon="material-symbols:check-small-rounded" className='btn-icon' />
                                            <p>
                                                Account changes saved successfully
                                            </p>
                                        </button>
                                    )}
                                </div>

                            )}
                        </div>
                    </div>



                    <div className='mt-5'>
                        <form action="" className='d-flex flex-column align-items-center' >
                            <p>Guarantor's Details</p>
                            <div className='d-flex'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Guarantor's Full Name</label>
                                    <input type="text" name="guarantorname" id="" disabled={this.state.inputDisabledGuarantor} placeholder='Joseph Ojih' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Guarantor's Phone Number</label>
                                    <input type="tel" name="gphone" id="" disabled={this.state.inputDisabledGuarantor} placeholder='0813747684939' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Guarantor's Email Address</label>
                                    <input type="email" name="email" id="" disabled={this.state.inputDisabledGuarantor} placeholder='joe@yahoo.com' />
                                </div>

                            </div>
                            <div className='d-flex mt-4'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Guarantor's Residential  Address</label>
                                    <input type="text" name="gaddress" id="" disabled={this.state.inputDisabledGuarantor} placeholder='Airforce Base, Jimeta-Yola Adamawa' />

                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Guarantor's Occupation</label>
                                    <input type="text" name="company" id="" disabled={this.state.inputDisabledGuarantor} placeholder="FullStack Developer" />

                                </div>

                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Gender</label>
                                    <select name="" id="" disabled={this.state.inputDisabledGuarantor} >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>

                                </div>
                            </div>
                        </form>
                        <div className='d-flex'>
                            <button onClick={this.enableGurantorInputs} style={guarantorButtonStyle} className='btn mx-4 my-5'>{guarantorButtonText}</button>

                            {this.state.showGuarantorButton && (
                                <div>
                                    {this.state.showGuarantorButton1 ? (
                                        <button className='btn mx-4 my-5' onClick={this.changeGuarantorButton}>Save Changes</button>
                                    ) : (
                                        <button className=' d-flex align-items-center btn mx-4 my-5 profile-saved' >
                                            <Icon icon="material-symbols:check-small-rounded" className='btn-icon' />
                                            <p>
                                                Guarantor changes saved successfully
                                            </p>
                                        </button>
                                    )}
                                </div>

                            )}
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}