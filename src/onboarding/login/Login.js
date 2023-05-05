import { useNavigate } from "react-router-dom";
import './login.css';
import { Icon } from '@iconify/react';

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="login-page pt-3 px-5">
            <div className=''>
                <div className="d-flex align-items-center justify-content-between">
                    <a href="/" className="d-flex align-items-center mx-5" >
                        <Icon icon="material-symbols:arrow-back-rounded" style={{ fontSize: "20px", margin: "0 5px" }} />
                        Back to Homepage
                    </a>

                    <div className='text '>
                        Don't have an account yet?
                        <button className='mx-3' onClick={()=>{navigate("/register");}}>Register</button>
                    </div>
                </div>

                <div className="form mt-5 px-5 py-3">
                    <h1>Log In to Dashboard</h1>
                    Log in to your existing account
                    <form action="" className='d-flex flex-column my-4 '>
                        <input type="email" name="email" placeholder='email' id="" />

                        <input type="password" name="password" placeholder='password' id="" />
                        
                        <div className='d-flex align-items-center'>
                            <input type="checkbox" name="" id="" className='mx-2' />
                            Remember Me
                        </div>

                        <button className='login-btn mt-3' onClick={() => { navigate("/dashboard"); }}>Log In</button>                      

                    </form>
                    <p>Forgottrn Password? <a href="" style={{color: "#FB9129", fontWeight: "600"}}> Reset Here </a></p> 
                </div>
            </div>
        </div>
    )
}