"use strict";
module.exports = {
    encodeSuccessResult: (data) => {
        let res = {
            'Status': 1,
            'ErrMsg': "",
            'Data': data
        };
        return res;
    },
    encodeErrorResult: (err, language) => {
        let res = {
            'Status': err.status,
            'ErrMsg': err.msgList[language],
            'Data': {}
        };
        return res;
    },
    encodeSystemResult: (err) => {
        let data = {}
        if (err.stack) {
            if (process.env.IS_DEBUG == 'true') {
                data = { msg: err.stack };
            }
        }
        let res = {
            'Status': 500,
            'ErrMsg': 'System error',
            'Data': data
        };
        return res;
    }
}
