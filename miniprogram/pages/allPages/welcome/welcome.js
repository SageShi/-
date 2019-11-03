// miniprogram/pages/welcome.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
    data: {
      avatarUrl: './user-unlogin.png',
      userInfo: { },
      logged: false,
      takeSession: false,
      requestResult: '',

      Identity:[{name:'学生端'},
      {name:'教师端'}],

      choose:'',
      managerList: []
    },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              console.log(res.userInfo)
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  app.globalData.openid = res.result.openid
                  app.globalData.avatarUrl = this.data.userInfo.avatarUrl
                },
                fail: err => {
                  wx.showModal({
                    title: '警告',
                    content: '获取用户微信数据失败',
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  //处理事件“tab”
  radio: function (e) { 
  },

  // 选框选择,获取用户选择的单选框的值
  radioChange: function (e) {
    this.setData({
      choose: e.detail.value
    })
    console.log(this.data.choose)
  },

  

  //按钮点击事件，查表
  checkIn: function (e) {
    const db = wx.cloud.database({});
    const table = db.collection('manager');

    //点击教师端，缓存管理员列表
    if(this.data.choose=='教师端')
    {   
     table.get({
        success: res => {
          this.data.managerList=res.data
        },
      }) ;

      //检查是否在管理员列表中
      var temp = this.data.managerList;
      var have=false;
      var forend=false;
      for (var i = 0; i < temp.length; ++i) {
        if (temp[i].wxid == app.globalData.openid) {//在管理员列表中
          have=true;
          app.globalData.isManager = true;  //将是否为管理员的全局变量设为真
          wx.switchTab({
            url: '/pages/index/index'}) ;   
            forend=true;
            break;     
        }
        if(i==temp.length-1)forend=true;
      }
      //不在列表中
      if (forend&&!have) {
        wx.showToast({
        icon: 'none',
        title: '无此权限'})
        }
    }   
    else  //点击学生端
    {
      app.globalData.isManager = false;//将是否为管理员的全局变量设为假
      wx.switchTab({
        url: '/pages/index/index'
      })
     
    }
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