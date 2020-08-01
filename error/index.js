const RouterError = require('./RouterError')
const ParameterIsWrong = require('./ParameterIsWrong')
module.exports = {
    routerError: new RouterError(),
    parameterIsWrong: new ParameterIsWrong()
}