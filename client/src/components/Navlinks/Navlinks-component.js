import React from 'react'
import { links } from '../../utils/links/links'
import { NavLink } from 'react-router-dom'
export const Navlinks = ({ toggleSidebarHandler }) => {
    return (
        <div className='nav-links'>
            {links.map((link => {
                const { text, path, id, icon } = link
                return (
                    <NavLink to={path} className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"} key={id} onClick={toggleSidebarHandler} end>
                        <span className='icon'>{icon}</span>
                        {text}
                    </NavLink>
                )
            }))}
        </div>
    )
}
