import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { Loading } from '../Loading/Loading'
import Wrapper from '../../assets/wrappers/JobsContainer'
import { Job } from '../Job/Job'
import { PageBtnContainer } from '../PageBtnContainer/PageBtnContainer'

export const JobsContainer = () => {
    const { jobs, getAllJobs, isLoading, page, totalJobs, search, searchStatus, numOfPages, searchType, sort } = useContext(AppContext)
    useEffect(() => {
        getAllJobs()
    }, [page, search, searchStatus, searchType, sort])
    if (isLoading) {
        return <Loading center />
    }
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}
