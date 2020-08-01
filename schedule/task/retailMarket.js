const retailMarketService = require('../../service/retailMarket')
module.exports.syncDatas = {
    schedule: '0 0 * * * *',
    runner: async function () {
        retailMarketService.syncDatas()
    }
}