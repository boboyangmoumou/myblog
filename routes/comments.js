const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const CommentModel = require('../models/comments')
router.post('/',checkLogin, function (req, res, next){
  // res.send('创建留言')
  const author = req.session.user._id
  const postId = req.fields.postId
  const content = req.fields.content

  // 校验参数
  try {
    if(!content.length){
      throw new Error('请添加内容')
    }
  } catch (e){
    req.flash('error','e.message')
    return res.redirect('back')
  }

  const comment = {
    postId : postId,
    content : content,
    author : author
  }
  CommentModel.create(comment)
    .then(function(){
      req.flash('success', '留言成功')
      res.redirect('back')
    })
})

// GET /comments/:commentId/remove 删除留言
router.get( '/:commentId/remove', checkLogin, function(req, res, next){
  // res.send('删除留言')
  const commentId = req.params.commentId
  const author = req.session.user._Id
  CommentModel.getCommentById(commentId)
      .then(function(comment){
          if(!comment){
            throw new Error('留言不存在')
          }
          // if(comment.author.toString() !== author.toString()){
          //   throw new Error('没有权限删除')
          // }
        CommentModel.delCommentById(commentId)
            .then(function(){
              req.flash('success','删除留言成功')
              res.redirect('back')
            })
            .catch(next)
      })

})
module.exports = router
