// pages/home1/notice/notice.js
const app = getApp()
import WxValidate from '../../allPages/utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    disableornot:true,
    newItem:'',
    original:'',
    id:'',
    inputType:'',
  },
  //未完成提示框
  showModal: function (error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //取消
  cancel:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  //提交修改
  finish:function(e){
    const temp = e.detail.value
    const params = temp.inputContent
    if (!this.WxValidate.checkForm(temp)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    const db = wx.cloud.database({})
    const col = db.collection('student')
    const doc = col.doc(this.data.id)
    switch(this.data.type){
      case 'name':
        doc.update({
          data: {
            Name: params
          },
          success: res => {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '修改失败'
            })
          }
        }
        );
        break;
      case 'studentId':
        doc.update({
          data: {
            StudentId: params
          },
          success: res => {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '修改失败'
            })
          }
        });
        break;
      case 'school':
        doc.update({
          data: {
            School: params
          },
          success: res => {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '修改失败'
            })
          }
        });
        break;
      case 'major':
        doc.update({
          data: {
            Major: params
          },
          success: res => {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '修改失败'
            })
          }
        });
        break;
      case 'grade':
        doc.update({
          data: {
            Grade: params
          },
          success: res => {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '修改失败'
            })
          }
        });
        break;
      case 'uclass':
        doc.update({
          data: {
            Uclass: params
          },
          success: res => {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '修改失败'
            })
          }
        });
        break;
    }
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      original: options.org,
      type:options.type,
      id: app.globalData.studentdocid,
      newItem: options.org,
      inputType:options.inputType
    })
    this.initValidate(options.type)
  },
  initValidate(flag) {
    switch (flag) {
      case 'name':
      const rule1 = {
        inputContent: {
          required: true,
          rangelength: [2, 4],
        }
      }
      const message1 = {
        inputContent: {
          required: '请输入姓名',
          rangelength: '请输入2~4位汉字'
        }
      }
        this.WxValidate = new WxValidate(rule1, message1)
        break;
      case 'studentId':
        const rule2 = {
          inputContent: {
            required: true,
            rangelength: [12, 12],
          }
        }
        const message2 = {
          inputContent: {
            required: '请输入学号',
            rangelength: '学号格式错误'
          }
        }
        this.WxValidate = new WxValidate(rule2, message2)
        break;
      case 'school':
        const rule3 = {
          inputContent: {
            required: true,
          }
        }
        const message3 = {
          inputContent: {
            required: '请输入学院',
          }
        }
        this.WxValidate = new WxValidate(rule3, message3)
        break;
      case 'major':
        const rule4 = {
          inputContent: {
            required: true,
          }
        }
        const message4 = {
          inputContent: {
            required: '请输入专业',
          }
        }
        this.WxValidate = new WxValidate(rule4, message4)
        break;
      case 'grade':
        const rule5 = {
          inputContent: {
            required: true,
            digits: true,
            rangelength: [4, 4]
          }
        }
        const message5 = {
          inputContent: {
            required: '请输入年级',
            digits: '请以数字形式输入年级（入学年份）',
            rangelength: '年级应为4位数字（入学年份）'
          }
        }
        this.WxValidate = new WxValidate(rule5, message5)
        break;
      case 'uclass':
        const rule6 = {
          inputContent: {
            digits: true,
            rangelength: [1, 2]
          }
        }
        const message6 = {
          inputContent: {
            digits: '请以数字形式输入班级',
            rangelength: '班级应为1~2位数字'
          }
        }
        this.WxValidate = new WxValidate(rule6, message6)
        break;
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