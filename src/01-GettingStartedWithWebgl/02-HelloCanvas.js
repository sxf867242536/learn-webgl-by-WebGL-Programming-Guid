import { getWebGLContext } from './../../utils/cuon-utils'
function main () {
  // 获取canvas
  const canvas = document.querySelector('#example')
  // 获取WebGL绘图上下文
  const gl = getWebGLContext(canvas)
  if (!gl) {
    console.log('获取WebGL绘图上下文 失败')
    return
  }
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
}
main()
