import React from 'react'
import '../Dashboard/Dashboard.css'
import SideNavbar from './SideNavbar';
import { Outlet, useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();
    const logoutHandeler = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div className='Dashboard-main-contener'>
            <div className="Dashboard-contener">
                <SideNavbar />

                <div className="main-contener">
                    <div className="main-top-bar">

                        <div className="logo-contener">
                            <img className='profile-logo' src={localStorage.getItem('imageUrl')} alt="profile logo" />
                        </div>
                        <div className='profile-contener'>
                            <h2 className='profile-name'>{localStorage.getItem('fullName')}</h2>
                            <button className='profile-btn' onClick={logoutHandeler}>Logout</button>
                        </div>
                    </div>
                    <div className="outlet-area">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;