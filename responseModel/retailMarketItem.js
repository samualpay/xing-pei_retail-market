class RetailMarketItem {
    constructor(data) {
        data = data || {}
        this._id = data._id || -1
        this[' 平均(元 / 公斤)'] = data[' 平均(元 / 公斤)'] || ''
        this[' 品名'] = data[' 品名'] || ''
        this[' 市場'] = data[' 市場'] || ''
        this['日期'] = data['日期'] || ''
        this[' 種類'] = data[' 種類'] || ''
    }
}
module.exports = RetailMarketItem