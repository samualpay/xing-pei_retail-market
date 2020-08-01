const retailMarketModel = require('../mongo/model/retailMarket')

module.exports.bulkCreate = async (docs) => {
    let rawDatas = await retailMarketModel.insertMany(docs)
    return rawDatas
}