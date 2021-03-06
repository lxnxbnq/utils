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
export const toFixed = number => (Math.round(number * 100 * 10) / 10);

// 选择文本框中的部分文本
export const selectText = (textbox, startIndex, endIndex) => {
  if (textbox.setSelectionRange) {
    textbox.setSelectionRange(textbox, startIndex, endIndex)
  } else if(typeof textbox.createTextRange === 'function') {
      const range = textbox.createTextRange();
      range.collapse(true);
      range.moveStart('character', startIndex);
      range.moveEnd('character', endIndex - startIndex);
      range.select();
  }
  textbox.focus();
}

// 转义字符
export function htmlDecodeByRegExp (str){
  let s = "";
  if(str.length == 0) return "";
  s = str.replace(/&amp;/g,"&");
  s = s.replace(/&lt;/g,"<");
  s = s.replace(/&gt;/g,">");
  s = s.replace(/&nbsp;/g," ");
  s = s.replace(/&#39;/g,"\'");
  s = s.replace(/&quot;/g,"\"");
  return s;
}

// 小数精度运算： formatFloat(运算操作， 精确到几位小数)
export function formatFloat(f, digit) {
  // Math.pow(指数，幂指数)
  var m = Math.pow(10, digit);
  // Math.round（） 四舍五入
  return Math.round(f * m) / m;
}

// 获取数据类型
// 如：
// typeStr(10) -> "Number"
// typeStr('test') -> "String"
// typeStr(function f(){}) -> "Function"
// typeStr([]) -> "Array"
// typeStr({}) -> "Object"
const typeStr = (data) => Object.prototype.toString.call(data).replace(/\[\w+\s(\w+)\]/, "$1")

// 对象/数组深拷贝
function deepClone(data) {
  let copy;
  if (typeStr(data) === 'Object') {
    copy = {};
    for (var key in data) {
      if (hasOwnProperty.call(data, key)) {
        if (typeStr(data[key]) !== 'Object' && typeStr(data[key]) !== 'Array') {
          copy[key] = data[key];
        } else {
          copy[key] = deepClone(data[key])
        }
      }
    }
  } else if (typeStr(data) === 'Array') {
    copy = [];
    for( var i = 0; i < data.length; i++ ) {
      if (typeStr(data[i]) !== 'Object' && typeStr(data[i]) !== 'Array') {
        copy.push(data[i])
      } else {
        copy.push(deepClone(data[i]))
      }
    }
  } else {
    return data;
  }
  return copy;
}

// 当需要下载的图片为接口返回的流时，且接口需要认证
let filename = 'default';
let extra = '';
export const download = (url: string, options: any = {}): void => {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      Authorization: localStorage && localStorage.getItem('token')
    },
    ...options
  };
  fetch(url, defaultOptions)
    .then(res => {
      const fileHeader = res.headers.get('content-disposition');
      if (fileHeader) {
        const ascllFileName = fileHeader.split('=')[1].split('.')[0];
        extra = fileHeader.split('=')[1].split('.')[1];

        filename = decodeURI(ascllFileName);
      }
      return res.blob();
    })
    .then(blob => URL.createObjectURL(blob))
    .then(downloadUrl => {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${filename}.${extra}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};
