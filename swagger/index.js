
const fs = require("fs")
const path = require('path')
function loadFilesObject(subPath) {
    let result = {}
    normalizedPath = path.join(__dirname, subPath);
    fs.readdirSync(normalizedPath).forEach(function (file) {
        let item = require(path.join(__dirname, subPath, file))
        let keys = Object.keys(item)
        keys.forEach(elem => {
            result[elem] = item[elem]
        })
    });
    return result
}
let obj = {
    "swagger": "2.0",
    "info": {
        "description": "API Document",
        "version": "1.0.0",
        "title": "XING PEI RETAIL MARKET API"
    },
    "basePath": "/api",
    // "externalDocs": {
    //     "description": "Status Code",
    //     "url": "/api/StatusCode"
    // },
    "paths": {},
    "definitions": {}
}
obj.definitions = loadFilesObject("models")
obj.paths = loadFilesObject("apis")
module.exports = obj