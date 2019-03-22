/**
 * api
 * @type {object}
 */

export default {
    // textApi: {
    //     name: 'textApi',
    //     devUrl: 'api/Handler/AjaxTestHandler.ashx?mod=40&&PCS_AreaID=3'
    // },

    //获取blog列表
    blogList: {
        name: 'blogList',
        devUrl: 'api/get/blogList',
        //devUrl: 'https://blogsev.serveo.net/get/blogList'
        // devUrl: 'http://39.105.188.13:2000/get/blogList'
    },
    blogListByTag: {
        name: 'blogListByTag',
        devUrl: 'api/get/blogListByTag'
    }
    ,
    blogListBySearch: {
        name: 'blogListBySearch',
        devUrl: 'api/get/blogListBySearch'
    },
    //用户登录
    userLogin: {
        name: 'login',
        devUrl: 'api/get/userLogin',
        //devUrl: 'https://blogsev.serveo.net/get/userLogin'
        // devUrl: 'http://39.105.188.13:2000/get/userLogin'
    },
    //保存头像
    saveAvatar: {
        name: 'saveAvatar',
        devUrl: 'api/post/saveAvatar',
        //devUrl: 'https://blogsev.serveo.net/post/saveAvatar'
        // devUrl: 'http://39.105.188.13:2000/post/saveAvatar'
    },
    //保存Blog
    saveBlog: {
        name: 'saveBlog',
        devUrl: 'api/post/saveBlog',
        //devUrl: 'https://blogsev.serveo.net/post/saveBlog'
        // devUrl: 'http://39.105.188.13:2000/post/saveBlog',

    },
    //测试mongoose
    blogInfoOnMongoose: {
        name: 'blogInfoOnMongoose',
        devUrl: 'api/get/blogInfoOnMongoose',
        //devUrl: 'https://blogsev.serveo.net/get/blogInfoOnMongoose'
        // devUrl: 'http://39.105.188.13:2000/get/blogInfoOnMongoose',

    },
    //修改密码
    changePassword: {
        name: 'changePassword',
        devUrl: 'api/post/changePassword',
        //devUrl: 'https://blogsev.serveo.net/post/changePassword'
        // devUrl: 'http://39.105.188.13:2000/post/changePassword',


    },
    //删除单条blog
    deleteBlog: {
        name: 'deleteBlog',
        devUrl: 'api/post/deleteBlog',
        //devUrl: 'https://blogsev.serveo.net/post/deleteBlog'
        // devUrl: 'http://39.105.188.13:2000/post/deleteBlog',

    },
    //点赞
    likeBlogItem: {
        name: 'likeBlogItem',
        devUrl: 'api/post/likeBlogItem',
        //devUrl: 'https://blogsev.serveo.net/post/likeBlogItem'
        // devUrl: 'http://39.105.188.13:2000/post/likeBlogItem'

    },
    //取消点赞
    disslikeBlogItem: {
        name: 'disslikeBlogItem',
        devUrl: 'api/post/disslikeBlogItem'
        //devUrl: 'https://blogsev.serveo.net/post/disslikeBlogItem'
        // devUrl: 'http://39.105.188.13:2000/post/disslikeBlogItem'

    },
    //保存blog回复
    saveBlogReply: {
        name: 'saveBlogReply',
        devUrl: 'api/post/saveBlogReply',
        //devUrl:'https://blogsev.serveo.net/post/saveBlogReply'
        // devUrl: 'http://39.105.188.13:2000/post/saveBlogReply',

    },
    //获取单条博客htmlDom
    getBlogHtmlDom: {
        name: 'getBlogHtmlDom',
        devUrl: 'api/get/blogHtmlDom'
    },
    saveBlogImage: {
        name: 'saveBlogImage',
        devUrl: 'api/post/saveBlogImage'
    }
}