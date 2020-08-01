const LoggerHandler = require('../components/loggerHandler')
const util = require('../common/utils')

module.exports = function (apiKey) {
	return function (req, res, next) {
		try {
			let requestId = util.generatUUIDV1().replace(/-/g, '')
			let logger = new LoggerHandler({ requestId })
			res.logger = logger
			let method = req.method
			let originalUrl = req.originalUrl
			let headers = req.headers
			let params = req.params
			let query = req.query
			let clientIp = req.clientIp
			let body = req.body
			let fields = Object.assign({ apiKey, method, originalUrl, clientIp }, headers, query, params, body)
			logger.info('API_START', fields)
			next()
		} catch (err) {
			next(err)
		}
	}
}
