// component/navigation/navigation.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        info: [
            [
                {
                    "img": "icon/doc.png",
                    "name": "资料管理",
                    "path": "/pages/allPages/ManagerPages/docManager/docManager"
                },
                {
                    "img": "icon/apply.png",
                    "name": "申请管理",
                  "path": "/pages/allPages/ManagerPages/applyManager/applyManager"
                },
                {
                    "img": "icon/connect.png",
                    "name": "联系管理",
                    "path": "/pages/allPages/ManagerPages/conManager/conManager"
                }
            ],
            [
              {
                "img": "icon/advice.png",
                "name": "建议管理",
                "path": "/pages/allPages/ManagerPages/advManager/advManager"
              },
              {
                "img": "icon/device.png",
                "name": "报修管理",
                "path": "/pages/allPages/ManagerPages/repairManager/repairManager"
              },
              {
                "img": "icon/notice.png",
                "name": "通知管理",
                "path": "/pages/allPages/ManagerPages/noticeManager/noticeManager"
              }
            ]
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onJumpTap: function (e) {
            var next = e.currentTarget.dataset.path;
            console.log(next)
            wx.navigateTo({
              url: next
            })
        }
    }
})
