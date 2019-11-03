// pages/home1/deviceInfo/deviceInfo.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
      deviceListOriginal: [],
      deviceListShow:[],
      roomNum:'',
      archNum:'',
      multiArray: [['B7'], ['133', '138', '231', '233', '238', '331', '333', '336', '338A', '338B']],
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
  //快速查找
  fastSearch: function () {
    var that = this
    if (that.data.archNum == '' ||that.data.roomNum == ''){
      wx.showModal({
        title: '提示',
        content: '请完整输入楼号和房号',
        showCancel:false
      })
    } else {
        var newArray = []
      var temp = that.data.deviceListOriginal
        temp.forEach(function(item,index){
          if (item.ArchNum == that.data.archNum){
            if (item.RoomNum == that.data.roomNum) {
              newArray.push(item)
            }
          }
        })
        that.setData({
          deviceListShow:newArray
        })
    }
  },
  //显示全部
  showAll:function(){
    this.setData({
      deviceListShow:this.data.deviceListOriginal,
      roomNum:'',
      archNum:''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({});
    const cont = db.collection('repair');
    // 创建一个变量来保存页面page示例中的this, 方便后续使用
    var _this = this;
    db.collection('repair').get({
      success: res => {
        this.setData({
          deviceListOriginal: res.data,
          deviceListShow:res.data
        })
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