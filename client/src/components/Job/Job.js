import React, { useContext } from 'react'
import moment from 'moment'
import { AppContext } from '../../context/AppContext'
import Wrapper from '../../assets/wrappers/Job'
import { Link } from 'react-router-dom'
import { JobInfo } from '../JobInfo/JobInfo'
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
export const Job = ({ company, createdAt, _id, position, jobLocation, jobType, status }) => {
    const { setEditJob, deleteJob } = useContext(AppContext)
    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{company}</h5>
                    <h5>{date}</h5>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link className='btn edit-btn' to='/add-job' onClick={() => setEditJob(_id)}>Edit</Link>
                        <button type='button' className='btn delete-btn' onClick={() => deleteJob(_id)}>Delete</button>
                    </div>
                </footer>
            </div>
        </Wrapper>


    )
}
