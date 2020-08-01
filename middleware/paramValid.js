const error = require('../error')
function checkParam(param, reqParam) {
	if (param.required && param.required.length > 0) {
		for (let i = 0; i < param.required.length; i++) {
			if (!Object.prototype.hasOwnProperty.call(reqParam, param.required[i]) || reqParam[param.required[i]] == null) {
				throw error.parameterIsWrong
			}
		}
	}
	if (param.properties) {
		let keys = Object.keys(param.properties)
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			if (Object.prototype.hasOwnProperty.call(reqParam, key)) {
				if (param.properties[key].type == 'array') {
					if (reqParam[key].constructor != Array) {
						throw error.parameterIsWrong
					}
				} else if (param.properties[key].type != typeof reqParam[key]) {
					throw error.parameterIsWrong
				}
				if (param.properties[key].enum && param.properties[key].enum.length > 0) {
					let enums = param.properties[key].enum
					if (!enums.includes(reqParam[key])) {
						throw error.parameterIsWrong
					}
				}
				if (param.properties[key].max) {
					let max = param.properties[key].max
					if (max < reqParam[key]) {
						throw error.parameterIsWrong
					}
				}
				if (param.properties[key].min) {
					let min = param.properties[key].min
					if (min > reqParam[key]) {
						throw error.parameterIsWrong
					}
				}
			}
		}
	}
}
exports.paramValid = function ({ query, headers, body, params }) {
	return async function (req, res, next) {
		try {
			if (query) {
				checkParam(query, req.query)
			}
			if (headers) {
				checkParam(headers, req.headers)
			}
			if (body) {
				checkParam(body, req.body)
			}
			if (params) {
				checkParam(params, req.params)
			}
			next()
		} catch (err) {
			next(err)
		}
	}
}

