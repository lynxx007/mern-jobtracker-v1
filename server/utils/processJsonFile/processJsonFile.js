const fs = require('fs')
const Job = require('../../src/models/job.schema')
const path = require('path')
const { promisify } = require('util')


const processJsonFile = async () => {
    try {
        await Job.deleteMany()
        const dataFilePath = path.join(__dirname, '..', '..', 'data', 'MOCK_DATA.json')
        const readFileAsync = promisify(fs.readFile);
        const jsonData = await readFileAsync(dataFilePath, 'utf-8');
        const jobData = JSON.parse(jsonData);
        await Job.create(jobData)
        console.log('data imported');

    } catch (error) {
        console.log(error);

    }
}

module.exports = processJsonFile