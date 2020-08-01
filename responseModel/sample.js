// response model for api
class Sample {
    constructor(data) {
        data = data || {}
        this.id = data.id || -1
        this.name = data.name || ''
    }
}
module.exports = Sample