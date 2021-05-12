/**
 * 截取中文字符串 ， 超过长度使用省略号显示
 * @param {*} str  字符串
 * @param {*} len  截取长度
 * @returns
 */
export function subStrCn(str, len) {
  var reg = /[\u4e00-\u9fa5]/g, //专业匹配中文
    slice = str.substring(0, len),
    chineseCharNum = ~~(slice.match(reg) && slice.match(reg).length),
    realen = slice.length * 2 - chineseCharNum;
  return str.substr(0, realen) + (realen < str.length ? "..." : "");
}
