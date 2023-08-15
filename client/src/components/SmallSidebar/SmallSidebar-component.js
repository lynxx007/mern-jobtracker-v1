import React, { useContext } from 'react'
import Wrapper from '../../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { Logo } from '../Logo/Logo'
import { AppContext } from '../../context/AppContext'
import { Navlinks } from '../Navlinks/Navlinks-component'

export const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useContext(AppContext)
    const toggleSidebarHandler = () => {
        toggleSidebar()
    }
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className='content'>
                    <button className='close-btn' onClick={toggleSidebarHandler}><FaTimes /></button>
                    <header><Logo /></header>
                    <Navlinks toggleSidebarHandler={toggleSidebarHandler} />
                </div>
            </div>
        </Wrapper>
    )
}
