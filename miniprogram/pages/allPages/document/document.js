// pages/home1/document/document.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchWord:""
  },
  clickDoc:function(e){
    /*var src = e.currentTarget.dataset.vedio // e.currentTarget
    wx.navigateTo({
      url: '../video/video?src='+src
    })*/
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
    const db = wx.cloud.database({});
    const cont = db.collection('fileID');
    // 创建一个变量来保存页面page示例中的this, 方便后续使用
    var _this = this;
    db.collection('fileID').get({
      success: res => {
        this.setData({
          fileIDList: res.data
        })
      }
    })
  },
  searchInput:function(e)
  {
    this.setData({searchWord:e.detail.value})
  },

//关键字搜索
  searchNotice: function (e) {
    const db = wx.cloud.database({});
  // 数据库正则对象（正则表达式查询）
    db.collection('fileID').where({
    fileid: db.RegExp({
      regexp: this.data.searchWord,
      options: 'i',
      })
      }).get({
        success: res => {
          this.setData({
            fileIDList: res.data
          })
      },
      fail:function(res)
      {
        console.log("not found")
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