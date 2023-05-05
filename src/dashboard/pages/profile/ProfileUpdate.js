import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import './profile.css';







export default class ProfileUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputDisabled: true,
            isClicked: false,
            showButton: false,
            showButton1: true
            // buttonText: 'Edit Profile',

        };
    }



    enableInputs = () => {
        this.setState({ inputDisabled: false });
        this.setState({ isClicked: true });
        this.setState({ showButton: !this.state.showButton });

        // this.setState({ buttonText: 'Discard Changes' });
    }
    changeButton = () => {
        this.setState({ showButton1: false });

    }


    render() {
        const buttonStyle = {
            width: '180px',
            height: '50px',
            backgroundColor: this.state.isClicked ? '#FFFFFF' : '#FB9129',
            color: this.state.isClicked ? '#FB9129' : '#fff',
            fontSize: '20px',
            border: '2px solid #FB9129',

        };

        const buttonText = this.state.isClicked ? 'Discard Changes' : 'Edit Profile';

        return (
            <div className="my-5 p-4 profile-update">
                <h1>Profile Update</h1>

                <div className="px-4 py-2 card profile-form">
                    <form action="" className='d-flex flex-column align-items-center' >

                        <div>
                            <p>Personal Details</p>
                            <div className='d-flex'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" name="fname" id="" disabled={this.state.inputDisabled} placeholder='Kadwama' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" name="lname" id="" disabled={this.state.inputDisabled} placeholder='Lazarus' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Email Address</label>
                                    <input type="email" name="email" id="" disabled={this.state.inputDisabled} placeholder='kadwamalazarus@gmail.com' />
                                </div>
                            </div>
                            <div className='d-flex mt-4'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Gender</label>
                                    <select name="" id="" disabled={this.state.inputDisabled}>
                                        <option value="Male">Female</option>
                                        <option value="Female">Male</option>
                                    </select>

                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Date of birth</label>
                                    <input type="date" name="" id="" disabled={this.state.inputDisabled} placeholder='22 July 1985' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="tel" name="" id="" disabled={this.state.inputDisabled} placeholder='08104046671' />
                                </div>
                            </div>
                            <div className='d-flex mt-4 me-auto'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Home Address</label>
                                    <input type="text" name="address" id="" disabled={this.state.inputDisabled} placeholder='Jimeta-Yola, barracks road, Yola Adamawa' />

                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Location</label>
                                    <select name="" id="" disabled={this.state.inputDisabled}>
                                        <option value="yn">Adamawa, Yola North</option>
                                        <option value="ys">Adamawa, Yola South</option>
                                        <option value="numan">Adamawa, Numan</option>
                                        <option value="girei">Adamawa, Girei</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <p>Occupation Details</p>
                            <div className='d-flex'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Occupation</label>
                                    <input type="text" name="occupation" id="" disabled={this.state.inputDisabled} placeholder='UI/UX Designer' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor=""> Salary(Monthly)</label>
                                    <input type="number" name="salary" id="" disabled={this.state.inputDisabled} placeholder='1,200,000' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Work Level/Grade</label>
                                    <input type="text" name="grade" id="" disabled={this.state.inputDisabled} placeholder='Grade 7' />
                                </div>
                            </div>
                            <div className='d-flex mt-4'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Ministry (Company Name)</label>
                                    <input type="text" name="company" id="" disabled={this.state.inputDisabled} placeholder="Discovery Hub Labondo" />

                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" name="last name" id="" disabled={this.state.inputDisabled} placeholder='Lazarus' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Email Address</label>
                                    <input type="email" name="email" id="" disabled={this.state.inputDisabled} placeholder='kadwamalazarus@gmail.com' />
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <p>Next Kin</p>
                            <div className='d-flex'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Name of Next of Kin</label>
                                    <input type="text" name="namekin" id="" disabled={this.state.inputDisabled} placeholder='Fred Lazarus' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Relationship</label>
                                    <input type="text" name="kinrelationship" id="" disabled={this.state.inputDisabled} placeholder='Sibling' />
                                </div>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Home Address</label>
                                    <input type="text" name="address" id="" disabled={this.state.inputDisabled} placeholder='Jimeta-Yola, barracks road, Yola Adamawa' />

                                </div>

                            </div>
                            <div className='d-flex mt-4 me-auto'>
                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="tel" name="" id="" disabled={this.state.inputDisabled} placeholder='08104046671' />
                                </div>

                                <div className="form-group d-flex flex-column mx-3">
                                    <label htmlFor="">Email Address</label>
                                    <input type="email" name="email" id="" disabled={this.state.inputDisabled} placeholder='kadwamalazarus@gmail.com' />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='d-flex'>
                        <button onClick={this.enableInputs} style={buttonStyle} className='btn mx-4 my-5'>{buttonText}</button>

                        {this.state.showButton && (
                            <div>
                                {this.state.showButton1 ? (
                                    <button className='btn mx-4 my-5' onClick={this.changeButton}>Save Changes</button>
                                ) : (
                                    <button className=' d-flex align-items-center btn mx-4 my-5 profile-saved' >
                                        <Icon icon="material-symbols:check-small-rounded"  className='btn-icon' />
                                        <p>
                                        Profile changes saved successfully
                                        </p>
                                    </button>
                                )}
                            </div>

                        )}
                    </div>

                </div>
            </div>
        )
    }
}