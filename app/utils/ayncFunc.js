/*
@以async await方式封装axios
*/
import axios from 'axios'
const qs = require('qs')

export async function getData(url, data) {
    try {
        let res = await axios.get(url, { params: data })
        res = res.data
        return new Promise((resolve) => {
            // if (res.code === 0) {
            //     resolve(res)
            // } else {
            //     resolve(res)
            // }
            resolve(res)
        })
    } catch (err) {
        console.log(err)
    }
}

export async function postData(url, data) {
    try {
        let res = await axios.post(url, qs.stringify(data))
        console.log('server res=>', res)
        res = res.data
        return new Promise((resolve, reject) => {
            // if (res.code === 0) {
            //     resolve(res)
            // } else {
            //     reject(res)
            // }
            resolve(res)
        })
    } catch (err) {
        console.log(err)
    }
}

