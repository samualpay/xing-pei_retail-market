
function mergePropsAndOptions(props, options) {
    return Object.assign({}, props, options)
}
class LoggerHandler {
    constructor(props = {}) {
        this.props = props
    }
    debug(msg, options) {
        console.debug(msg, mergePropsAndOptions(this.props, options))
    }
    info(msg, options) {
        console.log(msg, mergePropsAndOptions(this.props, options))
    }
    warn(msg, options) {
        console.warn(msg, mergePropsAndOptions(this.props, options))
    }
    error(msg, options) {
        console.error(msg, mergePropsAndOptions(this.props, options))
    }
}
module.exports = LoggerHandler