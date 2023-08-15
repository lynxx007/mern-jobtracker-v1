import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Wrapper from '../../assets/wrappers/SearchContainer'
import { FormRow } from '../FormRow/FormRow'
import { FormRowSelect } from '../FormRowSelect/FormRowSelect'

export const SearchContainer = () => {
    const { isLoading, search, searchStatus, statusOptions, searchType, sort, sortOptions, jobTypeOptions, handleChange, clearFilters } = useContext(AppContext)
    const handleSearch = e => {
        const name = e.target.name
        const value = e.target.value
        handleChange(name, value)
        if (isLoading) return
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilters()

    }
    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                <div className='form-center'>
                    <FormRow type='text' name='search' value={search} handleChange={handleSearch}></FormRow>
                    <FormRowSelect labelText='job status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]}></FormRowSelect>
                    <FormRowSelect labelText='job type' name='searchType' value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]}></FormRowSelect>
                    <FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions}></FormRowSelect>
                    <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>clear filters</button>
                </div>
            </form>
        </Wrapper>
    )
}
