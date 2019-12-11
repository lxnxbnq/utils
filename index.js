// 将图片二进制流转成base64
export function convertBinaryToBase64(originFileObj, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(originFileObj);
}