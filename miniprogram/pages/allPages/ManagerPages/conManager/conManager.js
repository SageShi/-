// pages/home1/notice/notice.js
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    original:'',
    id:'',
  },
  //未完成提示框
  showModal: function (error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //取消
  cancel:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  //提交修改
  finish:function(e){
    const temp = e.detail.value
    const params = temp.inputContent
    if (!this.WxValidate.checkForm(temp)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    wx.cloud.callFunction({
      name: 'updatePN',
      data: {
        id: this.data.id,
        pn:params,
      },
      success: res => {
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '修改失败'
        })
      }
    })
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      wx.cloud.database().collection("phone").get({
        success(res) {
          var pn = res.data[0].pn
          var id = res.data[0]._id
          that.setData({
            original: pn,
            id:id,
          })
        },
        fail(res) {
          wx.showModal({
            title: '警告',
            content: '获取通知数据失败',
            showCancel: false
          })
        }
      })
    this.initValidate()
  },
  //验证条件
  initValidate() {
        const rule = {
          inputContent: {
            required: true,
            rangelength: [11, 11],
          }
        }
        const message = {
          inputContent: {
            required: '请输入管理员电话',
            rangelength: '电话格式错误'
          }
        }
        this.WxValidate = new WxValidate(rule, message)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})