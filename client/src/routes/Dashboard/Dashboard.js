import React from 'react'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Outlet } from 'react-router-dom'
import { SmallSidebar } from '../../components/SmallSidebar/SmallSidebar-component'
import { BigSidebar } from '../../components/Bigsidebar/BigSidebar-component'
import { Navbar } from '../../components/Navbar/Navbar-component'


export const Dashboard = () => {
    return (
        <Wrapper>
            <main className='dashboard'>
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}
