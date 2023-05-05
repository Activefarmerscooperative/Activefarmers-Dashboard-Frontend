import { useNavigate } from "react-router-dom";
import "./farm.css"

export default function Farm() {
    const navigate = useNavigate();
    return(
        <div className="farm px-5 py-2">
            <div className="d-flex flex-column align-items-center py-3 my-2">
                <h1>Farm Details</h1>
                <p>Please complete this form to the best of your ability providing all correct and relevant details about your farming experience and farm details</p>
                
                <div className="d-flex flex-column align-items-center form ">
                    
                    <form action="" method="post" className=" d-flex align-items-center justify-content-center my-5">
                        <div>
                            <input type="text" name="yearsexp" id="" placeholder="Years of Experience" />
                            <input type="text" name="croptype" id="" placeholder="Crop Type(s)" />
                        </div>
                        <div>
                            <input type="text" name="farmsize" id="" placeholder="Farm Size (Hectares)" />
                            <input type="text" name="farmaddress" id="" placeholder="Farm Address" />
                        </div>
                    </form>
                    <button onClick={()=>{navigate("/register/guarantor");}} className="btn farm-btn">Next</button>
                </div>
            </div>
        </div>
    )
}