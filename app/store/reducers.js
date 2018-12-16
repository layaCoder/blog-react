import { ADD_BLOG, DEL_BLOG, SET_FILTER } from './actions';
import { combineReducers } from 'redux';

function blogs(state = [1, 2, 3], action) {
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

function filter(state = 'init', action) {
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