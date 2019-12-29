// miniprogram/pages/allPages/detail/detail.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    adviceItem:{},
    commentList:[],
    newComment:'',
    sIcon:"icon/support.png",
    oIcon:"icon/oppose.png",
    support:0,
    oppose:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    const db = wx.cloud.database({})
    const advice = db.collection('advice')
    const comment = db.collection('comment')
    //获取该条建议
    advice.where(
     { _id: options.id}
    ).get({
      success:res => {
        this.setData({
          adviceItem: res.data[0],
          support:res.data[0].Support,
          oppose:res.data[0].Oppose,
        })
      }
    })
    // 增加查看人数
    wx.cloud.callFunction({
      name: 'view',
      data:{
        id: this.data.id
      }
    })
    // 加载评论表
    comment.where(
      {AdviceId: options.id}
    ).get({
      success:res => {
        this.setData({
          commentList:res.data
        })
      }
    })
  },
  //回到顶部
  onTop: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  // 添加新评论
  addComment:function() {
    if (app.globalData.studentdocid != '') {
      const db = wx.cloud.database({})
      const comment = db.collection('comment')
      var myDate = new Date();//获取系统当前时间
      comment.add({
        data: {
          Holder: app.globalData.name,
          Holderid: app.globalData.studentdocid,
          HolderAvatarUrl: app.globalData.avatarUrl,
          Content: this.data.newComment,
          AdviceId: this.data.id,
          Year: myDate.getFullYear(),
          Month: myDate.getMonth() + 1,
          Date: myDate.getDate(),
          Hours: myDate.getHours(),
          Minutes: myDate.getMinutes()
        },
        success: function (res) {
          wx.showToast({
            title: '评论成功',
            duration: 2000
          })
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
  //实时获取表单值
  updataComment:function(e){
    this.setData({
      newComment:e.detail.value
    })
  },
  //点赞或点倒赞
  addSupport: function (e) {
    if (this.data.sIcon === "icon/support.png"&&this.data.oIcon !== "icon/oppose-s.png") {
      const temp = this.data.support + 1
      wx.cloud.callFunction({
        name: 'update',
        data: {
          id: this.data.id
        },
        complete: res => {
          this.setData({
            sIcon: "icon/support-s.png",
            support: temp
          })
        },
      })
    }
  },
  addOppose: function (e) {
    const temp = e.currentTarget.dataset.id
    if (this.data.oIcon === "icon/oppose.png"&&this.data.sIcon !== "icon/support-s.png") {
      const temp = this.data.oppose + 1
      wx.cloud.callFunction({
        name: 'oppose',
        data: {
          id: this.data.id
        },
        complete: res => {
          this.setData({
            oIcon: "icon/oppose-s.png",
            oppose:temp
          })
        },
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