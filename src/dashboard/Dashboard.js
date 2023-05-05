import React from 'react'
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='dashboard'>
        <div className="d-flex">
          <Sidebar />
          <Outlet />
        </div>
    </div>
  )
}

export default Dashboard