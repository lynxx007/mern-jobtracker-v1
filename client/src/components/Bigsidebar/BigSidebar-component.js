import React, { useContext } from 'react'
import Wrapper from '../../assets/wrappers/BigSidebar'
import { AppContext } from '../../context/AppContext'
import { Logo } from '../Logo/Logo'
import { Navlinks } from '../Navlinks/Navlinks-component'

export const BigSidebar = () => {
    const { showSidebar } = useContext(AppContext)
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className='content'>
                    <header><Logo /></header>
                    <Navlinks />
                </div>
            </div>
        </Wrapper>

    )
}
