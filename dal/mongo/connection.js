const mongoose = require('mongoose')
const { logger } = require('../../module')
let mongoConnectionUrl = process.env.MONGODB_URI || 'mongodb://root:root@localhost:27017/admin';
mongoose.connect(mongoConnectionUrl)
mongoose.Promise = global.Promise
const db = mongoose.connection
let isConnected = false
let response = { db, isConnected }
db.on('connected', () => {
    logger.info('Mongoose connection success')
    response.isConnected = true
})
db.on('error', (err) => {
    logger.error('Mongoose on error', err)
    response.isConnected = false
})
db.on('disconnected', () => {
    logger.info('Mongoose connection disconnected')
    response.isConnected = true
})
process.on('SIGINT', () => {
    if (db) {
        db.close(() => {
            logger.info("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        })
    }
})
module.exports = response