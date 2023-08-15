import React, { useContext } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { AppContext } from '../../context/AppContext'
import { Alert } from '../../components/Alert/Alert'
import { FormRow } from '../../components/FormRow/FormRow'
import { FormRowSelect } from '../../components/FormRowSelect/FormRowSelect'
export const AddJob = () => {
    const { isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        createJob,
        clearValues,
        isLoading,
        editJob } = useContext(AppContext)

    const handleJobInput = e => {
        const name = e.target.name
        const value = e.target.value
        handleChange(name, value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (!position || !company || !jobLocation) {
            displayAlert()
            return
        }
        if (isEditing) {
            editJob()
            return
        }
        createJob()
    }
    const handleClear = (e) => {
        e.preventDefault()
        clearValues()
    }
    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                {showAlert && <Alert />}

                <div className='form-center'>
                    <FormRow type='text' name='position' value={position} handleChange={handleJobInput} />
                    <FormRow type='text' name='company' value={company} handleChange={handleJobInput} />
                    <FormRow type='text' name='jobLocation' value={jobLocation} handleChange={handleJobInput} />
                    <FormRowSelect labelText='type' name='jobType' value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />
                    <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions} />
                    <div className='btn-container'>
                        <button className='btn btn-block submit-btn' disabled={isLoading} type='submit' onClick={handleSubmit}>submit</button>
                        <button className='btn btn-block clear-btn' onClick={handleClear}>clear</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}
