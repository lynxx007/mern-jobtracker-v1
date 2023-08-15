const express = require('express')
const { createJob, getAllJobs, deleteJob, updateJob, showStats } = require('./jobsController')
const jobsRouter = express.Router()
jobsRouter.route('/')
    .post(createJob)
    .get(getAllJobs)

jobsRouter.route('/stats')
    .get(showStats)

jobsRouter.route('/:id')
    .delete(deleteJob)
    .patch(updateJob)

module.exports = jobsRouter