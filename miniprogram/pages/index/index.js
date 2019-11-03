//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    school:'',
    major:'',
    studentId:'',
    name:'',
    grade:'',
    uclass:'',
    id:'',
  },
  onLoad: function() {
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
                  this.getStudentInfo()
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
  //获取学生表该学生信息
  getStudentInfo:function(){
    const db = wx.cloud.database({});
    var _this = this;
    db.collection('student').where({
      _openid:app.globalData.openid
    }).get({
      success: res => {
        if(res.data.length != 0){
          this.setData({
            school: res.data[0].School,
            major: res.data[0].Major,
            studentId: res.data[0].StudentId,
            name: res.data[0].Name,
            grade: res.data[0].Grade,
            uclass: res.data[0].Uclass,
            id:res.data[0]._id,
          })
          app.globalData.name = this.data.name
          app.globalData.studentdocid = this.data.id
        }
        else{
          wx.showModal({
            title: '提示',
            content: '请尽快完善学生信息',
            success: function(res) {
              if(res.confirm) {
                wx.navigateTo({
                  url: '../allPages/firstSetting/firstSetting',
                })
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    this.getStudentInfo()
  },
  //跳转
  toName:function(){
      wx.navigateTo({
        url: '../allPages/setting/setting?org=' + this.data.name + '&type=name&inputType=text'
      })
    },
  toStudentId: function () {
    wx.navigateTo({
      url: '../allPages/setting/setting?org=' + this.data.studentId + '&type=studentId&inputType=number'
    })
  },
  toSchool: function () {
    wx.navigateTo({
      url: '../allPages/setting/setting?org=' + this.data.school + '&type=school&inputType=text'
    })
  },
  toMajor: function () {
    wx.navigateTo({
      url: '../allPages/setting/setting?org=' + this.data.major + '&type=major&inputType=text'
    })
  },
  toGrade: function () {
    wx.navigateTo({
      url: '../allPages/setting/setting?org=' + this.data.grade + '&type=grade&inputType=number'
    })
  },
  toClass: function () {
    wx.navigateTo({
      url: '../allPages/setting/setting?org=' + this.data.uclass + '&type=uclass&inputType=number'
    })
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
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

})
