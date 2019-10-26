import { ADD_BLOG, DEL_BLOG, SET_FILTER, INIT_BLOGS, USER_LOGIN, USER_LOGOUT, LIKE_BLOG, DISSLIKE_BLOG, SAVE_REPLY, HAS_MORE_BLOG_ITEM, IS_SHOW_LOADING } from './actions';
import { combineReducers } from 'redux';

//blogs列表
function blogs(state = [], action) {
    switch (action.type) {
        case ADD_BLOG:
            return [{
                id: action.id, //mongodb返回objectId
                title: action.title,//博客标题
                text: action.text,//记录无html标签的纯文本，在blogList中显示
                htmlDom: action.htmlDom,//记录带html标签的文本，展示具体blog
                user: action.user, //用户名
                avatarUrl: action.avatarUrl,//用户头像url
                likes: [], //likes 字段添加空数组
                tags: action.tags,
                replys: [], // replys 字段添加空数组
                diyTags: action.diyTags
            }, ...state]
        case DEL_BLOG:
            return state.filter(blog => blog.id !== action.id) //遍历blog id，id不相等则保留，相等责备过滤掉
        case INIT_BLOGS:
            if (action.firstTime) {
                state = []  //如果是首次加载则将数组清空，否则为懒加载，继续在数组后面push
            }
            // state = []  屏蔽掉刷新state，实现下拉懒加载
            action.blogArray.map(item => {
                state.push({
                    id: item._id,
                    title: item.title,
                    text: item.text,
                    htmlDom: item.htmlDom,
                    //htmlDom: '', //不加载htmlDom，节省资源
                    user: item.user,
                    avatarUrl: item.avatarUrl,
                    date: item.date,
                    likes: item.likes,
                    tags: item.tags,
                    replys: item.replys,
                    diyTags: item.diyTags
                })
            })
            return state
        case LIKE_BLOG:
            state.forEach(item => {
                if (item.id === action.blogId) {
                    item.likes = [...item.likes, action.name]
                }
            })
            return state
        case DISSLIKE_BLOG:
            state.forEach(item => {
                if (item.id === action.blogId) {
                    let likesArray = item.likes.filter(userName => userName !== action.name)
                    item.likes = likesArray
                }
            })
            return state
        // TODO: update code style like [like & disslike]
        case SAVE_REPLY:
            let resReplyState = []
            state.map(item => {
                if (item.id !== action.blogId) {
                    resReplyState.push(item)
                }
                else {
                    let newItem = Object.assign({}, item, { replys: [...item.replys, { id: action.id, blogId: action.blogId, replyText: action.replyText, user: action.user, avatarUrl: action.avatarUrl }] })
                    resReplyState.push(newItem)
                }
            })
            return resReplyState
        default: return state
    }
}



//blog列表过滤器，分为 all , frontend ,lifeStyle
function filter(state = 'all', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.filter
        default:
            return state
    }
}

//记录用户是否登录
function isLogin(state = { login: false, userName: null, avatarUrl: null }, action) {
    switch (action.type) {
        case USER_LOGIN:
            return { login: action.flag, userName: action.userName, avatarUrl: action.avatarUrl }
        case USER_LOGOUT:
            return { login: action.flag, userName: null, avatarUrl: null }
        default:
            return state
    }
}

function hasMoreData(state = true, action) {
    switch (action.type) {
        case HAS_MORE_BLOG_ITEM:
            return action.flag
        default:
            return state
    }
}


function showLoading(state = false, action) {
    switch (action.type) {
        case IS_SHOW_LOADING:
            return action.bool
        default:
            return state
    }
}


const blogApp = combineReducers({
    filter,
    blogs,
    isLogin,
    hasMoreData,
    showLoading
})

export default blogApp;