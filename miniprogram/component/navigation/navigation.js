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
                    "img": "icon/device.png",
                    "name": "设备管理",
                    "path": "/pages/allPages/deviceInfo/deviceInfo"
                },
                {
                    "img": "icon/video.png",
                    "name": "视频学习",
                    "path": "/pages/allPages/video/video"
                },
                {
                    "img": "icon/doc.png",
                    "name": "文档学习",
                    "path": "/pages/allPages/document/document"
                },
                {
                    "img": "icon/advice.png",
                    "name": "机房建议",
                    "path": "/pages/allPages/advice/advice"
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
