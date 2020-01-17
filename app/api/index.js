/**
 * api
 * @type {object}
 */

export default {
    //获取blog列表
    blogList: {
        name: 'blogList',
        devUrl: 'api/get/blogList',
    },
    singleBlogItem: {
        name: 'singleBlogItem',
        devUrl: 'api/get/singleBlogItem'
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
    },
    //保存头像
    saveAvatar: {
        name: 'saveAvatar',
        devUrl: 'api/post/saveAvatar',
    },
    //保存Blog
    saveBlog: {
        name: 'saveBlog',
        devUrl: 'api/post/saveBlog',
    },
    //测试mongoose
    blogInfoOnMongoose: {
        name: 'blogInfoOnMongoose',
        devUrl: 'api/get/blogInfoOnMongoose',
    },
    //修改密码
    changePassword: {
        name: 'changePassword',
        devUrl: 'api/post/changePassword',
    },
    //删除单条blog
    deleteBlog: {
        name: 'deleteBlog',
        devUrl: 'api/post/deleteBlog',
    },
    //点赞
    likeBlogItem: {
        name: 'likeBlogItem',
        devUrl: 'api/post/likeBlogItem',
    },
    //取消点赞
    disslikeBlogItem: {
        name: 'disslikeBlogItem',
        devUrl: 'api/post/disslikeBlogItem'
    },
    //保存blog回复
    saveBlogReply: {
        name: 'saveBlogReply',
        devUrl: 'api/post/saveBlogReply',
    },
    //获取单条博客htmlDom
    getBlogHtmlDom: {
        name: 'getBlogHtmlDom',
        devUrl: 'api/get/blogHtmlDom'
    },
    saveBlogImage: {
        name: 'saveBlogImage',
        devUrl: 'api/post/saveBlogImage'
    },
    getWhatsHot: {
        name: 'getWhatsHot',
        devUrl: 'api/get/whatsHot'
    },
    saveBoardMsg: {
        name: '/post/messageBoardData',
        devUrl: 'api/users/post/messageBoardData'
    },
    getMsgList: {
        name: 'get/msgList',
        devUrl: 'api/users/get/msgList'
    },
    // 保存 留言板回复
    saveMsgReply: {
        name: 'saveMsgReply',
        devUrl: 'api/users/post/saveMsgReply'
    }

}