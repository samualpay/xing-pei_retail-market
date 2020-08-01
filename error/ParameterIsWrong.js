class ParameterIsWrong extends Error {
    constructor(msg = '') {
        super("传入参数错误")
        this.isCustom = true
        this.httpStatus = 400
        this.status = -200002
        this.msgList = {
            'zh': `传入参数错误[${msg}]`,
            'en': `parameter is wrong[${msg}]`
        }
    }
}
module.exports = ParameterIsWrong