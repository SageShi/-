//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    school:'',
    major:'',
    studentId:'',
    name:'',
    grade:'',
    uclass:'',
    id:'',
    isManager: false,
  },
  onLoad: function() {
    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      userInfo: app.globalData.userInfo,
      isManager:app.globalData.isManager
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
  //学生信息修改跳转
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
})
