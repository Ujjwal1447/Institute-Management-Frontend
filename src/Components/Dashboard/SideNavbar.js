import React from 'react'
import './Dashboard.css'
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


const SideNavebar = () => {
    const location = useLocation();
    return (
        <div className="nav-contener">
            <div className="brand-contener">

                <div className="logo-contener">
                    <img className='profile-logo' src={require('../../Assets/az-logo.png')} alt="profile logo" />
                </div>
                <div className="profile-contain">
                    <h2 className="brand-name">AcademyZone</h2>
                    <p className='para-sidebar'>Managed the Easy Way...</p>
                </div>
            </div>
            <div className="manu-container">
                <Link to='/dashboard/home' className={location.pathname === '/dashboard/home' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-house"></i> Home</Link>
                <Link to='/dashboard/courses' className={location.pathname === '/dashboard/courses' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-book"></i> All Courses</Link>
                <Link to='/dashboard/add-course' className={location.pathname === '/dashboard/add-course' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-book"></i> Add Course</Link>
                <Link to='/dashboard/student' className={location.pathname === '/dashboard/student' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-graduation-cap"></i> All Students</Link>
                <Link to='/dashboard/add-student' className={location.pathname === '/dashboard/add-student' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-graduation-cap"></i> Add Student</Link>
                <Link to='/dashboard/collect-fee' className={location.pathname === '/dashboard/collect-fee' ? 'menu-active-link' : 'menu-link'}><i className="fa-regular fa-money-bill-1"></i> Collect Fee</Link>
                <Link to='/dashboard/payment-history' className={location.pathname === '/dashboard/payment-history' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-money-bill"></i> Payment History</Link>
            </div>
            <div className='contact-us'>
                <p><i className="fa-solid fa-address-card"></i> contact us</p>
                <p><i className="fa-solid fa-phone"></i> 7250704162</p>

            </div>
        </div>
    )
}

export default SideNavebar;