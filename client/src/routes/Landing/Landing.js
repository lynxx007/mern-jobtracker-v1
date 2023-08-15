import React, { useContext } from 'react'
import Wrapper from '../../assets/wrappers/LandingPage'
import Main from '../../assets/images/main.svg'
import { Logo } from '../../components/Logo/Logo'
import { Link, Navigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'


export const Landing = () => {
    const { user } = useContext(AppContext)
    return (
        <>
            {user && <Navigate to='/' />}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className='container page'>
                    <div className='info'>
                        <h1>job <span>tracking</span> app</h1>
                        <p>Laborum labore ex magna aliquip nostrud duis esse anim reprehenderit dolor excepteur ullamco aliqua. Aliqua reprehenderit minim mollit culpa deserunt sunt cillum sit exercitation mollit fugiat. Nisi tempor eu sint exercitation est sit deserunt exercitation nisi aliquip veniam laborum consequat consequat. Ipsum commodo exercitation elit cupidatat non fugiat tempor ex consectetur amet aliqua proident anim amet.</p>
                        <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                    </div>
                    <img src={Main} alt='job hunt' className='img main-img' />
                </div>
            </Wrapper>
        </>
    )
}
