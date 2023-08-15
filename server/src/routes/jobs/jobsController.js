const { StatusCodes } = require('http-status-codes')
const Job = require('../../models/job.schema')
const checkPermissions = require('../../../utils/checkPermission/checkPermission')
const { default: mongoose } = require('mongoose')
const moment = require('moment')
/** --------------------------JOB MANAGER -------------------------- */

const createJob = async (req, res, next) => { // Function to create a job
    try {
        const { position, company } = req.body // Destructuring position and company from the request body
        if (!position || !company) { // Checking if position or company is missing
            throw new Error('Please provide all values!') // Throwing an error if position or company is missing
        }
        req.body.createdBy = req.user.userId // Adding the userId of the logged in user to the request body
        const job = await Job.create(req.body) // Creating a new job using the request body
        next() // Calling the next middleware function
        return res.status(StatusCodes.CREATED).json({ job }) // Returning the created job as a response
    } catch (error) {
        next(error) // Passing the error to the error handling middleware
    }
}
const getAllJobs = async (req, res, next) => {
    const { search, status, jobType, sort } = req.query
    const queryObj = {
        createdBy: req.user.userId
    }
    if (status !== 'all') {
        queryObj.status = status
    }
    if (jobType !== 'all') {
        queryObj.jobType = jobType
    }
    if (search) {
        queryObj.position = { $regex: search, $options: 'i' }
    }
    let result = Job.find(queryObj)
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    if (sort === 'a-z') {
        result = result.sort('position')
    }
    if (sort === 'z-a') {
        result = result.sort('-position')
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    const jobs = await result
    const totalJobs = await Job.countDocuments(queryObj)
    const numOfPages = Math.ceil(totalJobs / limit)
    return res.status(StatusCodes.OK).json({
        jobs,
        totalJobs,
        numOfPages
    })
}
const updateJob = async (req, res) => {
    const { id: jobId } = req.params
    const { company, position } = req.body
    if (!company || !position) {
        throw new Error('Please provide all values!')
    }
    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new Error(`No job with id ${jobId}`)
    }

    const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true
    })
    checkPermissions(req.user, job.createdBy)
    return res.status(StatusCodes.OK).json({ updateJob })
}
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params

    const job = await Job.findOneAndDelete({ _id: jobId })
    if (!job) {
        throw new Error(`No job with id ${jobId}`)
    }
    checkPermissions(req.user, job.createdBy)
    return res.status(StatusCodes.OK).json({ msg: "Job removed" })
}
const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ])
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }
    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: {
                        $year: '$createdAt'
                    },
                    month: {
                        $month: '$createdAt'
                    }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                '_id.year': -1,
                '_id.month': -1
            }
        },
        { $limit: 12 }
    ])
    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date, count }
    })
        .reverse()
    return res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
module.exports = {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    showStats
}