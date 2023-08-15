import React, { useContext, useEffect, useState } from 'react'
import Wrapper from '../../assets/wrappers/RegisterPage'
import { Logo } from '../../components/Logo/Logo'
import { FormRow } from '../../components/FormRow/FormRow'
import { Alert } from '../../components/Alert/Alert'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}
export const Register = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState(initialState)
    const { isLoading, showAlert, displayAlert, hideAlert, registerUser, user, loginUser } = useContext(AppContext)

    const toggleMember = () => {
        setValue({ ...value, isMember: !value.isMember })
    }
    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const { name, email, password, isMember } = value

        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            setTimeout(hideAlert, 3000)
            return
        }
        if (isMember) {
            loginUser(email, password)
        } else {
            registerUser(name, email, password)
        }

    }
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                hideAlert()
                navigate('/')
            }, 3000)

        }
    }, [user, navigate])

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={handleSubmit}>
                <Logo />
                <h3>{value.isMember ? "Login" : "Register"}</h3>
                {showAlert && <Alert />}
                {!value.isMember && (
                    <FormRow type='text' name="name" value={value.name} handleChange={handleChange} />
                )}
                <FormRow type='email' name="email" value={value.email} handleChange={handleChange} />
                <FormRow type='password' name="password" value={value.password} handleChange={handleChange} />
                <button type='submit' className='btn btn-block' disabled={isLoading}>sign in</button>
                <p>
                    {value.isMember ? "Not a member yet ?" : "Already a member ?"}
                    <button type='button' onClick={toggleMember} className='member-btn'>{value.isMember ? "Register" : "Login"}</button>
                </p>
            </form>
        </Wrapper>
    )
}
