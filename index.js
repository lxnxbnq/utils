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
