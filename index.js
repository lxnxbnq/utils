// 将图片二进制流转成base64
export function convertBinaryToBase64(originFileObj, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(originFileObj);
}

// 浏览器复制
export function copy(text) {
  text = text || '';
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  if (document.execCommand('Copy')) {
    document.execCommand('Copy')
  }
  document.body.removeChild(input)
}


/*
 * formatMoney(s,type)
 * 功能：金额按千位逗号分隔
 * 参数：s，需要格式化的金额数值.
 * 参数：type,判断格式化后的金额是否需要小数位.
 * 返回：返回格式化后的数值字符串.
 */

export function formatMoney(s: number, type?: number): string {
  s = Number.parseFloat(`${s}`);
  let isNegative = false;
  if (s < 0) {
    isNegative = true;
    s = -s;
  }
  // if (/[^0-9\.]/.test(s)) return '0.00';
  let newString = s.toString().replace(/^(\d*)$/, '$1.');
  newString = `${newString}00`.replace(/(\d*\.\d\d)\d*/, '$1');
  newString = newString.replace('.', ',');
  const re = /(\d)(\d{3},)/;
  while (re.test(newString)) newString = newString.replace(re, '$1,$2');
  newString = newString.replace(/,(\d\d)$/, '.$1');
  if (type == 0) {
    const a = newString.split('.');
    if (a[1] == '00') {
      newString = a[0];
    }
  }
  if (isNegative) {
    return `-${newString}`;
  }
  return newString;
}

// 保留一位小数
export const toFixed = (number: number) => (Math.round(number * 1000) / 10);
