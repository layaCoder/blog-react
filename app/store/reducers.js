import { ADD_BLOG, DEL_BLOG, SET_FILTER, INIT_BLOGS } from './actions';
import { combineReducers } from 'redux';
import { get_uuid } from '../utils/commUtils'

//blogs列表
function blogs(state = [], action) {
    switch (action.type) {
        case ADD_BLOG:
            return [...state, {
                id: get_uuid(),
                title: action.title,//博客标题
                text: action.text,//记录无html标签的纯文本，在blogList中显示
                htmlDom: action.htmlDom,//记录带html标签的文本，展示具体blog
                user: action.user,
                avatarUrl: action.avatarUrl,//用户头像url
            }]
        case DEL_BLOG:
            return state.filter(blog => blog.index !== action.index) //遍历blog id，id不相等则保留，相等责备过滤掉
        case INIT_BLOGS:
            state = []
            action.blogArray.map(item => {
                state.push({
                    id: item.id,
                    title: 'some title',
                    text: 'some text',
                    htmlDom: '<strong>some htmlDom</strong>',
                    user: 'some user',
                    avatarUrl: ' some avatarUrl'
                })
            })
            return state
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

const blogApp = combineReducers({
    filter,
    blogs
})

export default blogApp;