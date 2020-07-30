import axios from 'axios'
// const domain = process.env.TAIPEI_API_DOMAIN||'https://data.taipei/api/v1/dataset'
const domain = process.env.TAIPEI_API_DOMAIN||'https://data.taipei/api/wisdomDraw/sheet'
export const findAllRetailMarket = async ({sortOrder,sortByColumn,limit,offset}) => {
    let response = {success:false,totalCount:0,datas:[]}
    try{
        let result = await axios.post(domain,{id:'f4f80730-df59-44f9-bfb8-32c136b1ae68',limit,offset,sortOrder,sortByColumn})
        if(result.data.success){
            response.success = true
            response.totalCount =  result.data.payload.totalCount
            response.datas = result.data.payload.searchResult
        }
    }catch(err){
        console.error(err)
    }
    return response
}