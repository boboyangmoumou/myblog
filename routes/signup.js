const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /siginup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.send('注册页')
})
// POST /siginup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
  res.send('注册')
})

module.exports = router
