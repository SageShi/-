// miniprogram/pages/allPages/detail/detail.js
const app = getApp()
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 5 //每页显示多少数据 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    adviceItem:{},
    commentList:[],
    commentListShow: [],
    newComment:'',
    sIcon:"icon/support.png",
    oIcon:"icon/oppose.png",
    support:0,
    oppose:0,
    loadMore: false,
    loadAll: false
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
    // comment.where(
    //   {AdviceId: options.id}
    // ).get({
    //   success:res => {
    //     this.setData({
    //       commentList:res.data
    //     })
    //   }
    // })
    //保证第二次点进来之后的正常加载
    currentPage = 0;
    this.data.commentList = [];
    this.commentListShow = [];
    this.data.loadMore = false;
    this.data.loadAll = false;
    this.getData()
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log("上拉触底事件")
    let that = this
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });
      //加载更多，这里做下延时加载
      setTimeout(function () {
        that.getData()
      }, 300)
    }
  },

  //访问网络,请求数据  
  getData() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    console.log(currentPage)
    //云数据的请求
    wx.cloud.database().collection("comment").orderBy('createTime', 'desc')              //时间逆序
      .skip(currentPage * pageSize) //从第几个数据开始
      .limit(pageSize)
      .get({
        success(res) {
          if (res.data && res.data.length > 0) {
            console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到dataList里  
            let list = that.data.commentListShow.concat(res.data)
            that.setData({
              commentList: list, //获取数据数组    
              commentListShow: list,
              loadMore: false //把"上拉加载"的变量设为false，显示  
            });
            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }
          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
        },
        fail(res) {
          console.log("请求失败", res)
          that.setData({
            loadAll: false,
            loadMore: false
          });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})