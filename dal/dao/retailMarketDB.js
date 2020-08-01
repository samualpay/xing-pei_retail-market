const retailMarketModel = require('../mongo/model/retailMarket')

module.exports.bulkCreate = async (docs) => {
    let rawDatas = await retailMarketModel.insertMany(docs)
    return rawDatas
}
module.exports.deleteMany = async (conditions = {}) => {
    let rawData = await retailMarketModel.deleteMany(conditions)
    return rawData
}

module.exports.findAll = async ({ sort, limit, offset }) => {
    let rawData = await retailMarketModel.find({}).sort(sort).skip(offset).limit(limit).exec()
    return rawData
}
module.exports.findById = async (id) => {
    let rawData = await retailMarketModel.findOne({
        '_id': id
    }).exec()
    return rawData
}
module.exports.count = async (conditions = {}) => {
    let count = await retailMarketModel.countDocuments(conditions).exec()
    return count
}