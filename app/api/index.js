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
        devUrl: 'api/get/blogList'
    },
    userLogin: {
        name: 'login',
        devUrl: 'api/get/userLogin'
    },
    saveAvatar: {
        name: 'saveAvatar',
        devUrl: 'api/post/saveAvatar'
    },
    saveBlog: {
        name: 'saveBlog',
        devUrl: 'api/post/saveBlog'
    },
    blogInfoOnMongoose: {
        name: 'blogInfoOnMongoose',
        devUrl: 'api/get/blogInfoOnMongoose'
    },
    changePassword: {
        name: 'changePassword',
        devUrl: 'api/post/changePassword'
    },
    deleteBlog: {
        name: 'deleteBlog',
        devUrl: 'api/post/deleteBlog'
    }
}