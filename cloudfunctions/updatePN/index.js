// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const testDB = cloud.database()
const _ = testDB.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var newpn = event.pn
  await testDB.collection('phone').doc(event.id).update({
    data: {
      pn:newpn
    }
  })
}