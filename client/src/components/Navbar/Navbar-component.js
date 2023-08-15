import React, { useContext, useState } from 'react'
import Wrapper from '../../assets/wrappers/Navbar'
import { AppContext } from '../../context/AppContext'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { Logo } from '../Logo/Logo'
export const Navbar = () => {
    const { toggleSidebar, logoutUser, user } = useContext(AppContext)
    const [showLogout, setShowLogout] = useState(false)
    const showLogoutHandler = () => {
        setShowLogout(!showLogout)
    }
    const logoutUserHandler = () => {
        logoutUser()
    }

    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggleSidebar}><FaAlignLeft /></button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>Dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button type='button' className='btn' onClick={showLogoutHandler}>
                        <FaUserCircle />
                        {user ? user.name : 'Bot'}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn' onClick={logoutUserHandler}>Logout</button>
                    </div>
                </div>
            </div>
        </Wrapper>

    )
}
