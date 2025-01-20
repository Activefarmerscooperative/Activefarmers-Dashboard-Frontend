import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import React from "react";
import './landingpage.css';
import { useQuery } from "react-query";
import { wakeServer } from "../utils/api/general";
import { toast } from "react-toastify";

const wakeTheServer = async () => {
  try {
    const res = await wakeServer()
    return res
  } catch (error) {
    toast.error(error)
  }
}

export default function LandingPage() {
  const navigate = useNavigate();

  // React query fetch data
  // const { data, status } = useQuery(['wake server'], wakeTheServer)
  // console.log("hello data", data)
  return (
    <div className="landing-page" id="root">
      <div className="">
        <a href="https://active-farmers-website.netlify.app/" target="_blank" rel="noreferrer" className="back-to-homepage" >
          <Icon icon="material-symbols:arrow-back-rounded" style={{ fontSize: "20px", margin: "0 5px" }} />
          Back to Homepage
        </a>
        <div className="d-flex flex-column align-items-center justify-content-between center-content">
          <h1>Active Farmers{<br />}Cooperative System</h1>
          <div className="d-flex align-items-center mt- button-element">
            <button className="btn member" style={{ backgroundColor: "#555555" }} onClick={() => { navigate("/login"); }}>Member Login</button>
            <button className="btn register" style={{ backgroundColor: "#FB9129" }} onClick={() => { navigate("/register"); }}>Register</button>
          </div>
        </div>
      </div>

    </div>
  )
}