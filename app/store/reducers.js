import { ADD_BLOG, DEL_BLOG, SET_FILTER } from './actions';
import { combineReducers } from 'redux';

//blogs列表
function blogs(state = [], action) {
    switch (action.type) {
        case ADD_BLOG:
            return [...state, {
                // id: action.id,
                text: action.text
            }]
        case DEL_BLOG:
            return state.filter(blog => blog.index !== action.index) //遍历blog id，id不相等则保留，相等责备过滤掉
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