const { fetchDataLimit } = require('../config')
const { findAllRetailMarket } = require('../dal/dao/retailMarketHttp')
const { logger } = require('../module')
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
async function saveAllDataInfoDB(datas) {

}
module.exports.fetchAllDataFromTaipeiApi = fetchAllDataFromTaipeiApi