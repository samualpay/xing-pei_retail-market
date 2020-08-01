"user strict";
const sampleService = require('../../service/sample')

exports.Sample = {
	method: 'get',
	path: '/v1/samples',
	middlewares: [],
	runner: async function () {
		let result = await sampleService.findAll()
		return result
	}
}