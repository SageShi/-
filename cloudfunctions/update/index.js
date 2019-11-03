// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const testDB = cloud.database()
const _ = testDB.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await testDB.collection('advice').doc(event.id).update({
    data: {
      Support:_.inc(1)
    }
  })
}