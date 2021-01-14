'use strict'

export let isPhone = /^(13[0-9]|14[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9]|16[5-8]|19[0-9])\d{8}$/

export let isIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

export default function luhnCheck(bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1) // 取出最后一位（与luhn进行比较）
  var first15Num = bankno.substr(0, bankno.length - 1) // 前15或18位
  var newArr = new Array()
  for (var i = first15Num.length - 1; i > -1; i--) {
    // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  var arrJiShu = new Array() // 奇数位*2的积 <9
  var arrJiShu2 = new Array() // 奇数位*2的积 >9
  var arrOuShu = new Array() // 偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {
      if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2)
      else arrJiShu2.push(parseInt(newArr[j]) * 2)
    } else {
      arrOuShu.push(newArr[j])
    }
  }
  var jishu_child1 = new Array() // 奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = new Array() // 奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
  }

  var sumJiShu = 0 // 奇数位*2 < 9 的数组之和
  var sumOuShu = 0 // 偶数位数组之和
  var sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
  }
  // 计算总和
  sumTotal =
    parseInt(sumJiShu) +
    parseInt(sumOuShu) +
    parseInt(sumJiShuChild1) +
    parseInt(sumJiShuChild2)

  // 计算luhn值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10
  var luhn = 10 - k

  if (lastNum == luhn) {
    return true
  } else {
    return false
  }
}
