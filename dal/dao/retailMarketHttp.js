const axios = require('axios')
const domain = 'https://data.taipei/api/wisdomDraw/sheet'
module.exports.findAllRetailMarket = async ({ sortOrder, sortByColumn, limit, offset }) => {
    let response = { success: false, totalCount: 0, datas: [] }
    let result = await axios.default.post(domain, { id: 'f4f80730-df59-44f9-bfb8-32c136b1ae68', limit, offset, sortOrder, sortByColumn })
    if (result.data.success) {
        response.success = true
        response.totalCount = result.data.payload.totalCount
        response.datas = result.data.payload.searchResult
    }
    return response
}