
/*  多字段排序demo 
    时间排序参考：https://blog.csdn.net/qq_36061522/article/details/89552239
*/
let resChange = this.testArr.sort(function (a, b) {
    let str1 = a.name
    let str2 = b.name
    let date1 = a.time
    let date2 = b.time
    if (str1 === str2) {
        return date1 < date2 ? 1 : -1
    }
    return str1.localeCompare(str2)
})

console.log('sortChange---->',resChange)

testArr =
        [
            {
                name:'aaaa',
                time:'2019-04-26 10:53:10'
            },
            {
                name:'AAaa',
                time:'2019-04-26 10:53:19'
            },
            {
                name:'dc',
                time:'2019-04-26 10:51:19'
            },{
                name:'aass',
                time:'2019-04-26 11:04:32'
            },{
                name:'cccc',
                time:'2019-04-26 11:05:32'
            }
    
    ]