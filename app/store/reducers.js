import { ADD_BLOG, DEL_BLOG, SET_FILTER, INIT_BLOGS, GET_BLOGS_PAGE_COUNT, USER_LOGIN, USER_LOGOUT, LIKE_BLOG, DISSLIKE_BLOG } from './actions';
import { combineReducers } from 'redux';
import { get_uuid } from '../utils/commUtils'

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
                tags: action.tags
            }, ...state]
        case DEL_BLOG:
            console.log('reducer id ->', action.id)
            return state.filter(blog => blog.id !== action.id) //遍历blog id，id不相等则保留，相等责备过滤掉
        case INIT_BLOGS:
            state = []
            action.blogArray.map(item => {
                state.push({
                    id: item._id,
                    title: item.title,
                    text: item.text,
                    htmlDom: item.htmlDom,
                    user: item.user,
                    avatarUrl: item.avatarUrl,
                    date: item.date,
                    likes: item.likes,
                    tags: item.tags
                })
            })
            return state
        case LIKE_BLOG:
            console.log('likeBlog running')
            let resState = []
            // issue 是否有简便写法?
            state.map(item => {
                if (item.id !== action.blogId) {
                    resState.push(item)
                }
                else {
                    resState.push(
                        //Object.assign(item, { likes: action.name })
                        {
                            id: item.id,
                            title: item.title,
                            text: item.text,
                            htmlDom: item.htmlDom,
                            user: item.user,
                            avatarUrl: item.avatarUrl,
                            date: item.date,
                            tags: item.tags,
                            likes: [...item.likes, action.name]
                        }
                    )
                }
            })
            return resState

        case DISSLIKE_BLOG:
            console.log('disslikeBlog running')
            let resDissState = []
            state.map(item => {
                if (item.id !== action.blogId) {
                    resDissState.push(item)
                }
                else {
                    resDissState.push({
                        id: item.id,
                        title: item.title,
                        text: item.text,
                        htmlDom: item.htmlDom,
                        user: item.user,
                        avatarUrl: item.avatarUrl,
                        date: item.date,
                        tags: item.tags,
                        likes: item.likes.filter(item => item !== action.name)
                    })
                }
            })
            return resDissState
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
function isLogin(state = { login: false, userName: null }, action) {
    switch (action.type) {
        case USER_LOGIN:
            return { login: action.flag, userName: action.userName }
        case USER_LOGOUT:
            return { login: action.flag, userName: null }
        default:
            return state
    }
}


const blogApp = combineReducers({
    filter,
    blogs,
    isLogin
})

export default blogApp;