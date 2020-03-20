// pages/home1/repair/repair.js
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    multiArray: [['B7'], ['133', '138', '231', '233', '238', '331', '333', '336', '338A', '338B']],
    repairForm: {
      archNum: 'B7',
      roomNum: '133',
      mechaNum: '',
      description: '',
    },
    adviceForm: {
      archNum: 'B7',
      roomNum: '133',
      content: '',
    },
    noticeForm: {
      archNum: 'B7',
      roomNum: '133',
      notice: '',
      type: '',
    },
    check: false,
    isManager: false,
  },
  /**
   * 教师端相关
   */
  //验证
  initValidateM() {
    const rules = {
      type: {
        required: true
      },
      notice: {
        required: true,
        maxlength: 500
      }
    }
    const messages = {
      mechaNum: {
        required: '请输入通知类型',
      },
      description: {
        required: '请输入通知内容',
        maxlength: '不要超过500个字'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //重置
  resetNData() {
    this.setData({
      noticeForm: {
        archNum: 'B7',
        roomNum: '133',
        notice: '',
      },
    })
  },
  // 提交表单
  noticeClick: function (e) {
    const params = e.detail.value
    this.onAddNotice(params)
  },
  //数据库
  /**
* 数据库函数-通知
*/
  onAddNotice: function (params) {
    var myDate = new Date();//获取系统当前时间
    const db = wx.cloud.database()
    db.collection('notice').add({
      data: {
        ArchNum: this.data.noticeForm.archNum,
        RoomNum: this.data.noticeForm.roomNum,
        Type: params.type,
        Notice: params.notice,

        Year: myDate.getFullYear(),
        Month: myDate.getMonth() + 1,
        Date: myDate.getDate(),
        Hours: myDate.getHours(),
        Minutes: myDate.getMinutes(),

        Holder: app.globalData.name,
        HolderAvatarUrl: app.globalData.avatarUrl
      },
      success: res => {
        wx.showToast({
          title: '新增通知成功',
        })
        this.resetRData()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增通知失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  /**
   * 选择器
   */
  bindMultiPickerChange: function (e) {
    this.data.repairForm.archNum = this.data.multiArray[0][e.detail.value[0]],
      this.data.repairForm.roomNum = this.data.multiArray[1][e.detail.value[1]],
      this.setData({
        repairForm: this.data.repairForm
      })
  },
  bindMultiPickerChange1: function (e) {
    this.data.adviceForm.archNum = this.data.multiArray[0][e.detail.value[0]],
      this.data.adviceForm.roomNum = this.data.multiArray[1][e.detail.value[1]],
      this.setData({
        adviceForm: this.data.adviceForm
      })
  },
  bindMultiPickerChange2: function (e) {
    this.data.noticeForm.archNum = this.data.multiArray[0][e.detail.value[0]],
      this.data.noticeForm.roomNum = this.data.multiArray[1][e.detail.value[1]],
      this.setData({
      noticeForm: this.data.noticeForm
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isManager: app.globalData.isManager
    })
    if (this.data.isManager) {
      this.initValidateM()
    } else {
      this.initValidate(this.data.currentData)
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    if (this.data.isManager) {
      this.initValidateM()
    } else {
      this.initValidate(this.data.currentData)
    }
  },
  //表单验证
  initValidate(flag) {
    if (flag == 0) {
      const rules = {
        mechaNum: {
          required: true,
          digits: true,
        },
        description: {
          required: true,
          maxlength: 100
        }
      }
      const messages = {
        mechaNum: {
          required: '请输入机器号',
          digits: '请输入数字',
        },
        description: {
          required: '请输入具体描述',
          maxlength: '不要超过100个字'
        }
      }
      this.WxValidate = new WxValidate(rules, messages)
    } else {
      const rules = {
        content: {
          required: true,
          minlength: 10
        }
      }
      const messages = {
        content: {
          required: '请输入建议内容',
          minlength: '建议内容不少于10字'
        }
      }
      this.WxValidate = new WxValidate(rules, messages)
    }
  },
  //未完成提示框
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //重置表单
  resetRData() {
    this.setData({
      repairForm: {
        archNum: 'B7',
        roomNum: '133',
        mechaNum: '',
        description: '',
      }
    })
  },
  resetAData() {
    this.setData({
      adviceForm: {
        archNum: 'B7',
        roomNum: '133',
        content: '',
      }
    })
  },
  /**
  * 点击按钮
  */
  repairClick: function (e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.onAddRepair(params)
  },
  adviceClick: function (e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.onAddAdvice(params)
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    if (that.data.currentData == 0) {
      that.initValidate(0)
    } else {
      that.initValidate(1)
    }
  },
  //捕捉匿名
  //通过判断改变状态时value值是否为空来来判断是否被选中 
  //有值代表选中  为空代表没有选中 
  nonName: function (e) {
    if (e.detail.value == '') {
      this.data.check = false
    }
    else {
      this.data.check = true
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
  * 数据库函数-报修
  */
  onAddRepair: function (params) {
    if (app.globalData.studentdocid != '') {
      var myDate = new Date();//获取系统当前时间
      const db = wx.cloud.database()
      db.collection('repair').add({
        data: {
          ArchNum: this.data.repairForm.archNum,
          RoomNum: this.data.repairForm.roomNum,
          MechaNum:params.mechaNum,
          Description: params.description,

          Year: myDate.getFullYear(),
          Month: myDate.getMonth() + 1,
          Date: myDate.getDate(),
          Hours: myDate.getHours(),
          Minutes: myDate.getMinutes(),

          Holder: app.globalData.name,
          Holderid: app.globalData.studentdocid,
          HolderAvatarUrl: app.globalData.avatarUrl,

          createTime: db.serverDate() //添加该字段用于排序
        },
        success: res => {
          wx.showToast({
            title: '新增记录成功',
          })
          this.resetRData()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先完善学生信息',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../firstSetting/firstSetting',
            })
          }
        }
      })
    }
  },

  /**
    * 数据库函数-建议
    */
  onAddAdvice: function (params) {
    if (app.globalData.studentdocid != '') {
      var holderid = '匿名用户'
      var holderAvatarUrl = 'icon/user-unlogin.png'
      if (!this.data.check) {
        holderid = app.globalData.name
        holderAvatarUrl = app.globalData.avatarUrl
      }
      var myDate = new Date();//获取系统当前时间
      const db = wx.cloud.database()
      db.collection('advice').add({
        data: {
          ArchNum: this.data.adviceForm.archNum,
          RoomNum: this.data.adviceForm.roomNum,
          Subject: params.subject,
          Content: params.content,
          Support: 0,
          Oppose: 0,
          View: 0,

          Year: myDate.getFullYear(),
          Month: myDate.getMonth() + 1,
          Date: myDate.getDate(),
          Hours: myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours(),
          Minutes: myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes(),

          Holder: holderid,
          Holderid: app.globalData.studentdocid,
          HolderAvatarUrl: holderAvatarUrl
        },
        success: res => {
          wx.showToast({
            title: '新增记录成功',
          })
          this.resetAData()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先完善学生信息',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../firstSetting/firstSetting',
            })
          }
        }
      })
    }
  }
})