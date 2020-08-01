const { fetchDataLimit } = require('../config')
const retailMarketDBDao = require('../dal/dao/retailMarketDB')
const { findAllRetailMarket } = require('../dal/dao/retailMarketHttp')
const { logger } = require('../module')
const RetailMarketsResponseModel = require('../responseModel/retailMarkets')
const RetailMarketItemResponseModel = require('../responseModel/retailMarketItem')
async function fetchAllDataFromTaipeiApi({ offset = 0 }) {
    let { success, totalCount, datas } = await findAllRetailMarket({ sortOrder: 'asc', sortByColumn: '_id', limit: fetchDataLimit, offset })
    if (success) {
        let nextOffset = offset + datas.length
        logger.info(`${nextOffset}/${totalCount}`, { func: 'fetchAllDataFromTaipeiApi' })
        if (nextOffset >= totalCount) {
            return datas
        } else {
            let nextDatas = await fetchAllDataFromTaipeiApi({ offset: nextOffset })
            return [...datas, ...nextDatas]
        }
    } else {
        return []
    }
}
async function refreshDatasAtDB(datas) {
    await retailMarketDBDao.deleteMany()
    logger.info('deleteMany end', { func: 'refreshDatasAtDB' })
    await retailMarketDBDao.bulkCreate(datas)
    logger.info('bulkCreate end', { func: 'refreshDatasAtDB' })
}
module.exports.syncDatas = async () => {
    let datas = await fetchAllDataFromTaipeiApi({})
    await refreshDatasAtDB(datas)
}

module.exports.findAll = async ({ sortOrder, sortByColumn, limit, offset }) => {
    let sort = { [sortByColumn]: (sortOrder === 'desc') ? -1 : 1 }
    let [rawDatas, totalCount] = await Promise.all([retailMarketDBDao.findAll({ sort, limit, offset }), retailMarketDBDao.count()])
    let result = new RetailMarketsResponseModel(rawDatas, totalCount)
    return result
}

module.exports.findById = async (id) => {
    let rawData = await retailMarketDBDao.findById(id)
    return new RetailMarketItemResponseModel(rawData)
}

