import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { Alert } from '../../components/Alert/Alert'
import { FormRow } from '../../components/FormRow/FormRow'

export const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading, hideAlert } = useContext(AppContext)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)
    const handleSubmit = e => {
        e.preventDefault()
        if (!name || !email || !lastName || !location) {
            displayAlert()
            setTimeout(hideAlert, 3000)
            return
        }
        updateUser(name, email, lastName, location)

    }
    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile</h3>
                {showAlert && <Alert />}
                {/* name */}
                <div className='form-center'>
                    <FormRow type='text' name='name' value={name} handleChange={(e) => setName(e.target.value)}></FormRow>
                    <FormRow labelText='last name' type='text' name='lastName' value={lastName} handleChange={(e) => setLastName(e.target.value)}></FormRow>
                    <FormRow type='email' name='email' value={email} handleChange={(e) => setEmail(e.target.value)}></FormRow>
                    <FormRow type='text' name='location' value={location} handleChange={(e) => setLocation(e.target.value)}></FormRow>
                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}
