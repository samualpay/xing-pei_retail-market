const classPath = 'middleware/paramProcess.js'
function processParam(param, reqParam) {
	if (param.properties) {
		let keys = Object.keys(param.properties)
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			if (Object.prototype.hasOwnProperty.call(reqParam, key)) {
				if (param.properties[key].type != typeof reqParam[key]) {
					let result = null
					if (param.properties[key].type == 'number' && reqParam[key]) {
						result = Number(reqParam[key])
						if (!isNaN(result)) {
							reqParam[key] = result
						}
					}
					if (param.properties[key].type == 'array' && reqParam[key]) {
						result = JSON.parse(reqParam[key])
						reqParam[key] = result
					}
					if (param.properties[key].type == 'boolean' && typeof reqParam[key] === 'string') {
						reqParam[key] = (reqParam[key] == 'true') ? true : reqParam[key]
						reqParam[key] = (reqParam[key] == 'false') ? false : reqParam[key]
					}
				}
			}
			if (param.properties[key].default != null) {
				reqParam[key] = reqParam[key] || param.properties[key].default
			}
		}
	}
}
exports.paramProcess = function ({ query, headers, params }) {
	return function (req, res, next) {
		try {
			if (query) {
				processParam(query, req.query)
			}
			if (headers) {
				processParam(headers, req.headers)
			}
			if (params) {
				processParam(params, req.params)
			}
			next()
		} catch (err) {
			next(err)
		}
	}

}
