import React, { useState, useEffect } from "react";
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { confirmTokenIsValid } from "../utils/api/member"
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  useEffect(() => {
    // Check if user can access this page info on component mount.
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function confirmToken() {
      try {
        const data = await confirmTokenIsValid(signal)
        setUser(data.user)
        setOpen(true)
      } catch (error) {
        navigate("/login", { replace: true })
      }
    }
    confirmToken()

    return () => {
      abortController.abort(); // Cancel the request on component unmount
    };
  }, [])

  return (
    <div className='dashboard'>
      {
        open && <div className="d-flex">
          <Sidebar
            user={user}
          />
          <Outlet />
        </div>
      }

    </div>
  )
}

export default Dashboard