const mongoose = require('mongoose')
mongoose.pluralize(null)
const Schema = mongoose.Schema
const retailMarket = new Schema({
    '_id': {
        type: Number,
        required: true,
        unique: true
    },
    ' 平均(元 / 公斤)': {
        type: String,
        required: true
    },
    ' 品名': {
        type: String,
        required: true
    },
    ' 種類': {
        type: String,
        required: true
    },
    ' 市場': {
        type: String,
        required: true
    },
    '日期': {
        type: String,
        required: true,
        index: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('retailMarket', retailMarket)