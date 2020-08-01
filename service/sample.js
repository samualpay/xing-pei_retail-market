const sampleDao = require('../dal/db/sample')
const SampleResponseModel = require('../responseModel/sample')
module.exports.findAll = async () => {
    let rawDatas = await sampleDao.findAll()
    return {
        list: rawDatas.map(elem => {
            return new SampleResponseModel(elem)
        })
    }
}