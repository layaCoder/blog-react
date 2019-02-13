/**
 * api
 * @type {object}
 */

export default {
    // textApi: {
    //     name: 'textApi',
    //     devUrl: 'api/Handler/AjaxTestHandler.ashx?mod=40&&PCS_AreaID=3'
    // },
    blogList: {
        name: 'blogList',
        devUrl: 'api/get/blogList',
        // devUrl: 'https://blogsev.serveo.net/get/blogList'
    },
    userLogin: {
        name: 'login',
        devUrl: 'api/get/userLogin',
        // devUrl: 'https://blogsev.serveo.net/get/userLogin'
    },
    saveAvatar: {
        name: 'saveAvatar',
        devUrl: 'api/post/saveAvatar',
        // devUrl: 'https://blogsev.serveo.net/post/saveAvatar'
    },
    saveBlog: {
        name: 'saveBlog',
        devUrl: 'api/post/saveBlog',
        //  devUrl: 'https://blogsev.serveo.net/post/saveBlog'
    },
    blogInfoOnMongoose: {
        name: 'blogInfoOnMongoose',
        devUrl: 'api/get/blogInfoOnMongoose',
        // devUrl: 'https://blogsev.serveo.net/get/blogInfoOnMongoose'
    },
    changePassword: {
        name: 'changePassword',
        devUrl: 'api/post/changePassword',
        //devUrl: 'https://blogsev.serveo.net/post/changePassword'
    },
    deleteBlog: {
        name: 'deleteBlog',
        devUrl: 'api/post/deleteBlog',
        // devUrl: 'https://blogsev.serveo.net/post/deleteBlog'
    },
    likeBlogItem: {
        name: 'likeBlogItem',
        devUrl: 'api/post/likeBlogItem'
    }
}