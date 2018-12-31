export const ADD_BLOG = 'ADD_BLOG'
export const DEL_BLOG = 'DEL_BLOG'
export const SET_FILTER = 'SET_FILTER'

//博客列表的filter类型
export const filterTypes = {
    SHOW_ALL: 'SHOW_ALL',
    FRONT_END: 'FRONT_END',
    LIFE_STYLE: 'LIFE_STYLE'
}


//添加个人博客
export const addBlog = (title, text, htmlDom) => {
    return {
        type: ADD_BLOG,
        title,
        text,
        htmlDom
    }
}

//
export const delBlog = (index) => {
    return {
        type: DEL_BLOG,
        index
    }
}

//设置博客list filter
export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter
    }
}


