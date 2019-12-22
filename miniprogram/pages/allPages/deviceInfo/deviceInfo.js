// pages/home1/deviceInfo/deviceInfo.js
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 5 //每页显示多少数据 
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
      loadMore:false,
      loadAll:false
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
    if(currentPage == 1) {
  this.setData({
    loadMore: true, //把"上拉加载"的变量设为true，显示  
    loadAll: false //把“没有数据”设为false，隐藏  
  })
    }
    console.log(currentPage)
//云数据的请求
    wx.cloud.database().collection("repair").orderBy('createTime', 'desc')              //时间逆序
  .skip(currentPage * pageSize) //从第几个数据开始
  .limit(pageSize)
  .get({
    success(res) {
      if (res.data && res.data.length > 0) {
        console.log("请求成功", res.data)
        currentPage++
        //把新请求到的数据添加到dataList里  
        let list = that.data.deviceListShow.concat(res.data)
        that.setData({
          deviceListOriginal: list, //获取数据数组    
          deviceListShow:list,
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
    //保证第二次点进来之后的正常加载
    currentPage=0;
    this.data.deviceListOriginal=[];
    this.deviceListShow=[];
    this.data.loadMore=false;
    this.data.loadAll= false;
    this.getData()
  },
  onTop:function(){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
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