// let retailMarketService = require('./service/retailMarket')
let retailMarketDBDao = require('./dal/dao/retailMarketDB')
require('./dal/mongo/connection')
async function test() {
    // let result = await retailMarketService.fetchAllDataFromTaipeiApi({})
    // console.log(result.length)
    let objs = [
        {
            _id: 98,
            ' 平均(元 / 公斤)': '45.00',
            ' 品名': '青江白菜                                          ',
            ' 市場': '士東',
            '日期': '2019-01-18',
            ' 種類': '蔬菜'
        }
        , {
            _id: 99,
            ' 平均(元 / 公斤)': '45.00',
            ' 品名': '青江白菜                                          ',
            ' 市場': '士東',
            '日期': '2019-01-17',
            ' 種類': '蔬菜'
        }]
    let docs = await retailMarketDBDao.bulkCreate(objs)
    console.log(docs)
}
test()