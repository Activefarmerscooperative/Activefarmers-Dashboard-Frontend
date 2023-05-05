import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';


export default function LandingPage() {
    const navigate = useNavigate();
    // function handleClick() {
    //     navigate("/verifyemail");
    // }
    return (
        <div className="landing-page" id="root">
            <div className="p-4">
               <a  href="https://active-farmers-website.netlify.app/" target="_blank" rel="noreferrer" className="d-flex align-items-center mx-5" >
               <Icon  icon="material-symbols:arrow-back-rounded" style={{fontSize: "20px", margin: "0 5px"}}/>
                Back to Homepage
                </a> 
                <div className="d-flex flex-column align-items-center my-5">
                    <h1>Active Farmers{<br />}Cooperative System</h1>
                    <div className="d-flex align-items-center my-4 py-4">
                        <button className="btn admin" style={{backgroundColor: "#0D9068"}} >Admin Login</button>
                        <button className="btn member" style={{backgroundColor: "#555555"}} onClick={()=>{navigate("/login");}}>Member Login</button>
                        <button className="btn register" style={{backgroundColor: "#FB9129"}} onClick={()=>{navigate("/register");}}>Register</button>
                    </div>
                </div>
            </div>
           
        </div>
    )
}