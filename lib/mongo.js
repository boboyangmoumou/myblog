const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
  name: {type: 'string', required: true},
  password: { type: 'string', required: true},
  avatar: {type: 'string', required: true},
  gender: {type: 'string',enum: ['m', 'f', 'x'], default: 'x'},
  bio: {type: 'string', required: true}
})
exports.User.index({name: 1}, {unique: true}).exec() //根据用户名进行查找用户，用户名全局唯一

const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据id生成创建时间
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results;
  },
  afterFindOne: function (result){
    if(result){
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result;
  }
})

exports.Post = mongolass.model('Post', {
  author: {type: Mongolass.Types.ObjectId,required: true},
  title: {type: 'string', require: true},
  pv: {type: 'number', default: 0},
  content: {type: 'string', require: true}
})
exports.Post.index({author: 1,_id:-1}).exec() //按时间顺序查看文章列表

exports.Comment = mongolass.model('Comment', {
  author: {type: Mongolass.Types.ObjectId,requird: true},
  content: {type: 'string',requird:true},
  postId: {type: Mongolass.Types.ObjectId, require: true}
})
exports.Comment.index({postId:1,_id:1}).exec() //通过文章id获取评论，并且按留言创建时间升序