// pages/home1/deviceInfo/deviceInfo.js
Page({

  /**
   * 页面的初始数据
   */
 /* data: {
    currentData: 0,
    deviceList: [
      {
        building: 'B5',
        room: '233',
        device: '23',
        content: '无法开机',
        date: '2019-8-15'
      },
      {
        building: 'B5',
        room: '233',
        device: '23',
        content: '无法开机jfjajfiodsjiofjdsfiojasdiofjdsiofjiosadfjioasdfjiodsfjiodfjiodsfjioasfjoiasfdjoiadfssjiodsfjiosdfjoidsfiodsfjodsfjiodsfjiodsfjiodsfjiofjoisdjfoiasjfio',
        date: '2019-8-15'
      },
      {
        building: 'B5',
        room: '233',
        device: '23',
        content: '无法开机',
        date: '2019-8-15'
      },
      {
        building: 'B5',
        room: '233',
        device: '23',
        content: '无法开机',
        date: '2019-8-15'
      },
      {
        building: 'B5',
        room: '233',
        device: '23',
        content: '无法开机',
        date: '2019-8-15'
      }
    ]
  },*/

    data: {
      book_list: []
    },
    
  //快速查找
  searchNotice: function () {
    console.log('success')
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
        console.log(res.data[3]);

        this.setData({
          deviceList: res.data
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