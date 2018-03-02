const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx

router.get('/', function (req,res, next){
  res.send('主页')
})
// POST /post/create 发表一篇文章
router.post('/create',checkLogin,function(req, res, next) {
  res.send('发表文章')
})
// 发表文章页
router.get('/create',checkLogin,function(req, res, next) {
  res.send('发表文章页')
})
// GET /posts/:postId 单独一片的文章页
router.post('/:postId', function(req, res, next) {
  res.send('文章详情页')
})
// GET /post/:postId/edit 更新文章页
router.get('/:postId/edit',checkLogin,function(req,res,next){
  res.rend('更新文章页')
})

// POST /post/: postId/edit 更新一片文章
router.post('/:postId/edit', checkLogin,function(req, res, next){
  res.send('更新文章')
})
// GET /post/:postId/edit 更新一篇文章
router.get('/:postId/edit', checkLogin, function(req, res, next){
  res.send('删除文章')
})
module.exports = router
