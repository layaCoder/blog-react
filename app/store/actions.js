export const ADD_BLOG = 'ADD_BLOG'
export const DEL_BLOG = 'DEL_BLOG'
export const SET_FILTER = 'SET_FILTER'
export const INIT_BLOGS = 'INIT_BLOGS'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export const LIKE_BLOG = 'LIKE_BLOG'
export const DISSLIKE_BLOG = 'DISSLIKE_BLOG'

export const SAVE_REPLY = 'SAVE_REPLY'

//初始化 blogs数组
export const initBlogs = (blogArray, firstTime) => {
    return {
        type: INIT_BLOGS,
        blogArray,
        firstTime
    }
}


//博客列表的filter类型
export const filterTypes = {
    SHOW_ALL: 'SHOW_ALL',
    FRONT_END: 'FRONT_END',
    LIFE_STYLE: 'LIFE_STYLE'
}


//添加个人博客
export const addBlog = (id, title, text, htmlDom, user, avatarUrl, tags) => {
    return {
        type: ADD_BLOG,
        id,
        title,
        text,
        htmlDom,
        user,
        avatarUrl,
        tags,
    }
}

//
export const delBlog = (id) => {
    return {
        type: DEL_BLOG,
        id
    }
}

//设置博客list filter
export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter
    }
}

export const userLogin = (flag, userName, avatarUrl) => {
    return {
        type: USER_LOGIN,
        flag,
        userName,
        avatarUrl
    }
}
export const userLogout = (flag) => {
    return {
        type: USER_LOGOUT,
        flag
    }
}

export const likeBlog = (blogId, name) => {
    return {
        type: LIKE_BLOG,
        blogId,
        name
    }
}

export const disslikeBlog = (blogId, name) => {
    return {
        type: DISSLIKE_BLOG,
        blogId,
        name
    }
}

export const saveReply = (id, blogId, replyText, user, avatarUrl) => {
    return {
        type: SAVE_REPLY,
        id,
        blogId,
        replyText,
        user,
        avatarUrl
    }
}

