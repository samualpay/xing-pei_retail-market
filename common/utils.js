"user strict";
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const recFindByExt = (base, ext, files, result) => {
    files = files || fs.readdirSync(base)
    result = result || []

    files.forEach(
        function (file) {
            var newbase = path.join(base, file)
            if (fs.statSync(newbase).isDirectory()) {
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
            }
            else {
                if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
                    result.push(newbase)
                }
            }
        }
    )
    return result
}
module.exports.recFindByExt = recFindByExt
module.exports.generatUUIDV1 = function () {
    return uuid.v1()
}