class RouterError extends Error {
    constructor(){
        super("URL错误")
        this.isCustom = true
        this.httpStatus = 404
        this.status = -200005
        this.msgList = {
            'zh': 'URL错误',
            'en': 'URL wrong'
        }
    }
}
module.exports = RouterError