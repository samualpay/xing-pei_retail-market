const RetailMarketItemResponseModel = require('./retailMarketItem')
class RetailMarkets {
    constructor(datas, totalCount) {
        this.datas = datas.map(elem => (new RetailMarketItemResponseModel(elem)))
        this.totalCount = totalCount || 0
    }
}
module.exports = RetailMarkets