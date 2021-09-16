const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express();

const compiler = webpack(WebpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
//simple
router.get('/simple/get', (req, res) => {
  res.json({
    msg: `hello world`
  })
})
router.post('/simple/post', (req, res) => {
  console.log(req.body);
  res.json({
    msg: `post`
  })
})

//base
router.get('/base/get', function (req, res) {
  res.json(req.query)
})
router.post('/base/post', function (req, res) {
  res.json(req.body)
})
app.use(router)

const port = process.env.port || 7070
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
})