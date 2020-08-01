const Schedule = require('../components/schedule')
const util = require('../common/utils')
const path = require('path')
const taskFolderPath = "./task"
let filePath = path.join(__dirname, taskFolderPath)
let taskFiles = util.recFindByExt(filePath, 'js')
let schedule = new Schedule()
taskFiles.forEach(elem => {
    let objs = require(elem)
    for (let key in objs) {
        let obj = objs[key]
        schedule.add({ timer: obj.schedule, runner: obj.runner });
    }
})
module.exports = schedule
