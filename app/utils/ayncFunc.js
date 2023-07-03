import axios from 'axios'
const qs = require('qs')

export async function getData(url, data) {
    try {
        let res = await axios.get(url, { params: data })
        if (res.code !== 0) {
            throw new Error(res.msg)
        }
        return res
    } catch (err) {
        console.warn(err)
    }
}


export async function postData(url, data) {
    try {
        let res = await axios.post(url, qs.stringify(data))
        if (res?.data) return res
        else throw new Error(res.msg)
    } catch (err) {
        console.warn(err)
    }
}
