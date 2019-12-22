// miniprogram/pages/allPages/ManagerPages/docManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    dataList: [],
    listButtons: [
      {
        type: 'warn',
        text: '删除',
      }],
    searchWord: "",
    //是否弹出弹窗
    showModal: false,
    videoVid: '',
    videoName: '',
    uploadFileName: '',
  },
  /**
   * 转换tab
   */
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
      that.getData(e.target.dataset.current)
    }
  },
  /**
   * 获取对应资料
   */
  getData:function(flag) {
      if (flag == 0){
        this.getVedio()
      } else if (flag == 1) {
        this.getDoc()
      } else {
        this.getAd()
      }
  },
  getVedio(){
    const db = wx.cloud.database({})
    const vedio = db.collection('videos')
    vedio.get({
      success: res => {
        this.setData({
          dataList: res.data
        })
      }
    })
  },
  getDoc(){
    const db = wx.cloud.database({})
    const doc = db.collection('fileID')
    doc.get({
      success: res => {
        this.setData({
          dataList: res.data
        })
      }
    })
  },
  getAd(){
    const db = wx.cloud.database({})
    const ad = db.collection('advertises')
    ad.get({
      success: res => {
        this.setData({
          dataList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getVedio()
  },
    //滑动删除视频
  vSlideButtonTap(e) {
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '注意',
      content: '你确定要删除该视频？',
      success: function (res) {
        if (res.confirm) {
          that.deleteVideo(id)
        }
      }
    })
  },
  deleteVideo: function (ID) {
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        id: ID,
        collection: 'videos'
      },
      complete: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
    })
  },
  //滑动删除文档
  dSlideButtonTap(e) {
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '注意',
      content: '你确定要删除该文件？',
      success: function (res) {
        if (res.confirm) {
          that.deleteDoc(id)
        }
      }
    })
  },
  deleteDoc: function (ID) {
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        id: ID,
        collection: 'fileID'
      },
      complete: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
    })
  },
  //点击进入视频或文档页面
  clickVideo: function (e) {
    var vid = e.currentTarget.dataset.vid;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/allPages/videoPlay/videoPlay?vid=' + vid + '&id' + id
    })
  },
  clickDoc: function (e) {
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
  //总的上传
  upload: function () {
    var flag = this.data.currentData
    if (flag == 0) {
      this.videoUpload()
    } else if (flag == 1) {
      this.fileUpload()
    } else {
      //这里写首页上传
    }
  },
  //视频上传页面
  videoUpload: function (e) {
    this.setData({
      showModal: true
    })
  }, 
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
  },
  onConfirm: function () {
    const db = wx.cloud.database()
    db.collection('videos').add({
      data: {
        vid: this.data.videoVid,
        name: this.data.videoName
      },
      success: res => {
        wx.showToast({
          title: '上传成功',
        })
        this.resetData()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '上传失败'
        })
      }
    })

    this.hideModal();

    this.refresh()
  },
  inputVid: function (e) {
    this.data.videoVid = e.detail.value
  },
  inputName: function (e) {
    this.data.videoName = e.detail.value
  },
//文件上传页面
  fileUpload: function (e) {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        var filename = res.tempFiles[0].name
        console.info(filename);
        that.setData({ uploadFileName: filename });

        wx.cloud.uploadFile({
          cloudPath: filename,
          filePath: res.tempFiles[0].path, // 文件路径
          success: res => {
            const db = wx.cloud.database()
            db.collection('fileID').add({
              data: {
                fileid: that.data.uploadFileName
              },
              success: res => {
                that.refresh()
              }
            })
            wx.showToast({
              title: '上传成功',
            })

          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '上传失败'
            })
            console.log(filename)
          }
        })
      }
    })
  }, 
  //搜索
  searchInput: function (e) {
    this.setData({ searchWord: e.detail.value })
  },
  //关键字搜索
  searchNotice: function (e) {
    var flag = this.data.currentData
    if (flag == 0) {
      this.searchV()
    } else if (flag == 1) {
      this.searchD()
    } else {
      //这个可以是搜索广告栏那里
    }
  },
  searchV:function(e) {
    const db = wx.cloud.database({});
    // 数据库正则对象（正则表达式查询）
    db.collection('videos').where({
      name: db.RegExp({
        regexp: this.data.searchWord,
        options: 'i',
      })
    }).get({
      success: res => {
        this.setData({
          videoList: res.data
        })
        console.log(res.data)
      },
      fail: function (res) {
        console.log("not found")
      }
    })
  },
  searchD: function (e) {
    const db = wx.cloud.database({});
    // 数据库正则对象（正则表达式查询）
    db.collection('fileID').where({
      fileid: db.RegExp({
        regexp: this.data.searchWord1,
        options: 'i',
      })
    }).get({
      success: res => {
        this.setData({
          fileIDList: res.data
        })
      },
      fail: function (res) {
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

  },
})