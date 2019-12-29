// pages/home1/document/document.js
const app = getApp()
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 5 //每页显示多少数据 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
    noticeListShow: [],
    imgList: [
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    isManager:false,
    phoneNumber: '',
    loadMore: false,
    loadAll: false
  },
  //打电话
  callManager:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber
    })
  },
  wechatClick:function()
  {
    wx.navigateTo({
      url: "/pages/allPages/connection/connection",
    })
  },
  //获取广告图
  getImages() {
    let that = this;
    let imgArr = [];
    wx.cloud.database().collection("advertises").get({
      success(res) {
        that.setData({
          imgList: res.data
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },
  //获取通知列表
  getNotice() {
    // let that = this;
    // let imgArr = [];
    // wx.cloud.database().collection("notice").get({
    //   success(res) {
    //     that.setData({
    //       noticeList: res.data
    //     })
    //   },
    //   fail(res) {
    //     wx.showModal({
    //       title: '警告',
    //       content: '获取通知数据失败',
    //       showCancel:false
    //     })
    //   }
    // })
  },
  //获取电话
  getPhoneNumber(){
    let that = this;
    wx.cloud.database().collection("phone").get({
      success(res) {
        var pn = res.data[0].pn
        that.setData({
          phoneNumber:pn
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
  },
  //回到顶部
  onTop: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  //跳转到对应功能
  onJumpTap: function (e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
  },
  //广告栏跳转到对应文档
  toDoc:function(e){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://xiaochengxu-o6nj9.7869-xiaochengxu-o6nj9-1259225399/' + e.currentTarget.dataset.fileid,
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath),
          wx.openDocument({
            filePath: res.tempFilePath,
            success: function (res) {
              wx.hideLoading()
            }
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImages()
    //this.getNotice()
    this.getPhoneNumber()
    this.setData({
      isManager:app.globalData.isManager
    })
    //保证第二次点进来之后的正常加载
    currentPage = 0;
    this.data.noticeList = [];
    this.noticeListShow = [];
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
    wx.cloud.database().collection("notice").orderBy('createTime', 'desc')              //时间逆序
      .skip(currentPage * pageSize) //从第几个数据开始
      .limit(pageSize)
      .get({
        success(res) {
          if (res.data && res.data.length > 0) {
            console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到dataList里  
            let list = that.data.noticeListShow.concat(res.data)
            that.setData({
              noticeList: list, //获取数据数组    
              noticeListShow: list,
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getImages()
    //this.getNotice()
    this.getPhoneNumber()
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