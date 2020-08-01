// let retailMarketService = require('./service/retailMarket')
let retailMarketDBDao = require('./dal/dao/retailMarketDB')
// require('./dal/mongo/connection')
async function test() {
    // await retailMarketService.syncDatas()
    let rawDatas = await retailMarketDBDao.findAll({ sort: { '日期': 1 }, limit: 5, offset: 0 })
    console.log(rawDatas)
    console.log('end')
}
test()