"user strict";
const retailMarketService = require('../../service/retailMarket')
const paramMiddleware = require('../../middleware/param')
exports.GetRetailMarkets = {
	method: 'get',
	path: '/v1/retailMarkets',
	middlewares: [
		paramMiddleware({
			query: {
				properties: {
					sortOrder: {
						type: 'string',
						enum: ['asc', 'desc'],
						default: 'asc'
					},
					sortByColumn: {
						type: 'string',
						enum: ['_id', '日期'],
						default: '_id'
					},
					limit: {
						type: 'number',
						default: 10,
						max: 100
					},
					offset: {
						type: 'number',
						default: 0
					}
				}
			}
		})
	],
	runner: async function (req) {
		let sortOrder = req.query.sortOrder
		let sortByColumn = req.query.sortByColumn
		let limit = req.query.limit
		let offset = req.query.offset
		let result = await retailMarketService.findAll({ sortOrder, sortByColumn, limit, offset })
		return result
	}
}

exports.GetRetailMarketById = {
	method: 'get',
	path: '/v1/retailMarkets/:id',
	middlewares: [
		paramMiddleware({
			params: {
				required: ['id'],
				properties: {
					id: {
						type: 'number'
					}
				}
			}
		})
	],
	runner: async function (req) {
		let id = req.params.id
		let result = await retailMarketService.findById(id)
		return result
	}
}