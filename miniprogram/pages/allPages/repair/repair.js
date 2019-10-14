// pages/home1/repair/repair.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    multiArray: [['B7'], ['133','138','231']],
    archNum:'B7',
    roomNum:'133',
    mechaNum:'',
    subject:'',
    description:'',
    content:''
  },
  /**
   * 选择器
   */
  bindMultiPickerChange: function (e) {
    this.setData({
      archNum: this.data.multiArray[0][e.detail.value[0]],
      roomNum: this.data.multiArray[1][e.detail.value[1]]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  },
  //电脑号输入
  mechaNumInput:function(e){
    this.setData({
      mechaNum: e.detail.value
    })
  },

  //学科输入
  subjectInput: function (e) {
    this.setData({
      subject: e.detail.value
    })
  },

  //坏设备描述
  descriptionInput:function(e)
  {
    this.setData({
      description: e.detail.value
    })
  }, 

  //建议输入
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
  * 点击按钮
  */
  repairClick: function () {
     this.onAddRepair()
  },
 
  adviceClick: function () {
    this.onAddAdvice()
  },

  /**
  * 数据库函数-报修
  */
  onAddRepair: function () {
    var myDate = new Date();//获取系统当前时间

    const db = wx.cloud.database()
    db.collection('repair').add({
      data: {
        ArchNum: this.data.archNum,
        RoomNum: this.data.roomNum,
        MechaNum: this.data.mechaNum,
        Description: this.data.description,

        Year: myDate.getFullYear(),
        Month: myDate.getMonth()+1,
        Date: myDate.getDate(),
        Hours: myDate.getHours(),
        Minutes: myDate.getMinutes()
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          ArchNum: this.data.archNum,
          RoomNum: this.data.roomNum,
          MechaNum: this.data.mechaNum,
          Description: this.data.description,

          Year: myDate.getFullYear(),
          Month: myDate.getMonth()+1,
          Date: myDate.getDate(),
          Hours: myDate.getHours(),
          Minutes: myDate.getMinutes()
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录: ', ArchNum, RoomNum, MechaNum, Description)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

/**
  * 数据库函数-建议
  */
onAddAdvice: function () {
  var myDate = new Date();//获取系统当前时间

  const db = wx.cloud.database()
  db.collection('advice').add({
    data: {
      ArchNum: this.data.archNum,
      RoomNum: this.data.roomNum,
      Subject: this.data.subject,
      Content: this.data.content,

      Year: myDate.getFullYear(),
      Month: myDate.getMonth()+1,
      Date: myDate.getDate(),
      Hours: myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours(),
      Minutes: myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
    },
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      this.setData({
        ArchNum: this.data.archNum,
        RoomNum: this.data.roomNum,
        Subject: this.data.subject,
        Content: this.data.content,

        Year: myDate.getFullYear(),
        Month: myDate.getMonth()+1,
        Date: myDate.getDate(),
        Hours: myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours(),
        Minutes: myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
      })
      wx.showToast({
        title: '新增记录成功',
      })
      console.log('[数据库] [新增记录] 成功，记录: ', ArchNum, RoomNum, Subject, Content)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }
  })
}
})