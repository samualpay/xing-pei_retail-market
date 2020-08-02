var express = require('express')
const path = require('path')
const swaggerUi = require('swagger-ui-express')

const apiFolderPath = "../api"
const swaggerDocument = require('../swagger/index')
const { recFindByExt } = require('../common/utils')
const error = require('../error')
const responseFormatter = require('../common/responseFormatter')
const logMiddleware = require('../middleware/log')

const router = express.Router()
function baseRouterHandler(api) {
  return async (req, res, next) => {
    try {
      let result = await api.runner(req, res, next)
      if (result != null) {
        res.send(responseFormatter.encodeSuccessResult(result, res.logger));
      }
    } catch (err) {
      next(err)
    }
    res.logger.info('API_END')
  }
}
function loadApis(apis) {
  for (let apiKey in apis) {
    let api = apis[apiKey]
    router[api.method](api.path, logMiddleware(apiKey), ...(api.middlewares || []), baseRouterHandler(api))
  }
}

filePath = path.join(__dirname, apiFolderPath)
let apiFiles = recFindByExt(filePath, 'js')
apiFiles.forEach(elem => {
  loadApis(require(elem))
})
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// router.get('/StatusCode', function (req, res) {
//   let language = req.query.lang || 'zh'
//   let keys = Object.keys(error)
//   let list = keys.map(key => {
//     let obj = {}
//     obj.code = error[key].status || -1
//     obj.msg = (error[key]['msgList'][language]) ? error[key]['msgList'][language] : ''
//     return obj
//   })
//   res.render('status_code', { 'title': "Status Code", 'list': list })
// })
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.use(function (req, res, next) {
  next(error.routerError)
});
router.use(function (err, req, res, next) {
  if (Object.prototype.hasOwnProperty.call(err, 'isCustom')) {
    let language = req.headers.language || 'zh'
    let customError = responseFormatter.encodeErrorResult(err, language)
    res.status(err.httpStatus)
    res.send(customError)
    res.logger.console.warn('API WRONG');
  } else {
    res.status(500);
    res.send(responseFormatter.encodeSystemResult(err));
    res.logger.error('API ERROR 500', { stack: err.stack })
  }

});

module.exports = router;
