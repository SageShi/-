// pages/home1/document/document.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [
      {
        host:'管理员',
        content: '无法开机',
        date: '2019-8-15'
      },
      {
        host: '管理员',
        content: '无法开机jfjajfiodsjiofjdsfiojasdiofjdsiofjiosadfjioasdfjiodsfjiodfjiodsfjioasfjoiasfdjoiadfssjiodsfjiosdfjoidsfiodsfjodsfjiodsfjiodsfjiodsfjiofjoisdjfoiasjfio',
        date: '2019-8-15'
      },
      {
        host: '管理员',
        content: '无法开机',
        date: '2019-8-15'
      },
      {
        host: '管理员',
        content: '无法开机',
        date: '2019-8-15'
      },
      {
        host: '管理员',
        content: '无法开机',
        date: '2019-8-15'
      },
      {
        host: '管理员',
        content: '无法开机test',
        date: '2019-8-15'
      }
    ]
  },

  onJumpTap: function (e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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