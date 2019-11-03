// pages/home1/notice/notice.js
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      school: '',
      major: '',
      studentId: '',
      name: '',
      grade: '',
      myclass: '',
    }
  },
  //表单验证
  initValidate() {
    const rules = {
      name: {
        required: true,
        rangelength: [2, 4],
      },
      studentId: {
        required: true,
        rangelength: [12,12],
      },
      school: {
        required: true,
      },
      major: {
        required: true,
      },
      grade: {
        required: true,
        digits:true,
        rangelength:[4,4]
      },
      mycalss:{
        digits:true,
        rangelength:[1,2]
      },
    }
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '请输入2~4位汉字'
      },
      studentId: {
        required: '请输入学号',
        rangelength: '学号格式错误'
      },
      school: {
        required: '请输入学院',
      },
      major: {
        required: '请输入专业',
      },
      grade: {
        required: '请输入年级',
        digits: '请以数字形式输入年级（入学年份）',
        rangelength: '年级应为4位数字（入学年份）'
      },
      myclass: {
        digits: '请以数字形式输入班级',
        rangelength: '班级应为1~2位数字'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit: function (e) {
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
      }
      this.finalSubmit(params)
  },
  //未完成提示框
  showModal: function(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //提交函数
  finalSubmit:function(params){
    const db = wx.cloud.database()
    db.collection('student').add({
      data: {
        Name: params.name,
        StudentId: params.studentId,
        School: params.school,
        Major: params.major,
        Grade: params.grade,
        Uclass: params.myclass,
      },
      success: res => {
        wx.showToast({
          title: '上传资料成功',
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index',
          })
        },2000)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '上传资料失败'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
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