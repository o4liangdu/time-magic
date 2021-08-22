/**
 * @Author: liangdo
 * @Date: 2021-05-22 10:44:09
 * @description: 时间转化成指定格式的字符串（精确到秒）
 * @param {*} 时间 格式字符串
 * @return {*} string
 */
exports.formatTime = function(time, cFormat) {
    if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * @Author: liangdo
 * @Date: 2021-05-22 10:44:09
 * @description: 获得输入时间距现在时间的长短描述
 * @param {*} 时间字符串或时间戳 格式字符串
 * @return {*} string
 */
exports.getDescription = function(time, option) {
  time = +time
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000
  if(diff > 0){
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
  }
  if(diff < 0){
    if (diff > -30) {
      return '刚刚'
    } else if (diff > -3600) {
      return Math.ceil(-diff / 60) + '分钟后'
    } else if (diff > -3600 * 24) {
      return Math.ceil(-diff / 3600) + '小时后'
    } else if (diff > -3600 * 24 * 2) {
      return '1天后'
    }
  }
  if (option) {
    return formatTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}