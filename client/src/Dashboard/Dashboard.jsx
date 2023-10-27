import React from 'react'
import './Dashboard.css'
import SideNavBar from '../Layouts/SideNavBar'

const Dashboard = () => {

  return (
    <div className='dashboard-container'>
      <h1 className='text-[1.5rem] font-bold'>Welcome To Dashboard!!</h1>

      <div className="dash-blogs-container">
        <div className="no-blogs">
          <h1 className='text-[2rem] text-gray-400'>No Blocks Yet!!</h1>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
