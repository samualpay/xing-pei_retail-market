import axios from 'axios'
const domain = '/api'
export const findAllRetailMarket = async ({ sortOrder, sortByColumn, limit, offset }) => {
    let url = `${domain}/v1/retailMarkets`
    let response = { success: false, totalCount: 0, datas: [] }
    try {
        let result = await axios.get(url, { params: { limit, offset, sortOrder, sortByColumn } })
        if (result.data.Status === 1) {
            response.success = true
            response.totalCount = result.data.Data.totalCount
            response.datas = result.data.Data.datas
        } else {
            console.warn(result.data)
        }
    } catch (err) {
        console.error(err)
    }
    return response
}