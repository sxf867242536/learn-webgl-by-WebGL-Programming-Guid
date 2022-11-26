import { getWebGLContext, initShaders } from './../../utils/cuon-utils'
// 顶点着色器 声明attribute变量
// attribute 存储限定符 必须是全局变量 格式：存储限定符 类型 变量名
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position; //设置坐标
  }
`
// 片元着色器

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
`
// function getRandomRGBColor () {
//   return [Math.random(), Math.random(), Math.random()]
// }
function main () {
  // 获取canvas
  const canvas = document.querySelector('#example')
  // 获取WebGL绘图上下文
  const gl = getWebGLContext(canvas)
  if (!gl) {
    console.log('获取WebGL绘图上下文 失败')
  }
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('初始化着色器失败')
    return
  }
  // 获取attribute变量的存储位置
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position')
  const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  if (aPosition < 0) {
    console.log('获取a_Position地址失败')
    return
  }
  if (uFragColor < 0) {
    console.log('获取u_FragColor地址失败')
    return
  }
  const n = initVertexBuffers(gl)
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 绘制三个点
  // gl.drawArrays(gl.TRIANGLES, 0, n)
  // gl.drawArrays(gl.LINES, 0, n)
  // gl.drawArrays(gl.LINE_STRIP, 0, n)
  gl.drawArrays(gl.LINE_LOOP, 0, n)
}
function initVertexBuffers (gl) {
  const vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
  ])
  // 点的个数
  const n = 3
  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer()
  if (!vertexBuffer) {
    console.log('创建缓冲区对象失败')
  }
  // 缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position')
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
  // 链接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(aPosition)
  return n
}
main()
