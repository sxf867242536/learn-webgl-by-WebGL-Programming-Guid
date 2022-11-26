import { getWebGLContext, initShaders } from './../../utils/cuon-utils'
// 顶点着色器 声明attribute变量
// attribute 存储限定符 必须是全局变量 格式：存储限定符 类型 变量名
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position; //设置坐标
    gl_PointSize = 10.0;//设置尺寸
  }
`
// 片元着色器

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`
// 鼠标点击位置数组
const gPoints = []
// 存储点颜色
const gColors = []
// 鼠标点击回调事件
function click (ev, gl, canvas, aPosition, uFragColor) {
  const x = ev.clientX
  const y = ev.clientY
  const rect = ev.target.getBoundingClientRect()
  const coordX = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2)
  const coordY = -((y - rect.top) - canvas.height / 2) / (canvas.height / 2)
  gPoints.push([coordX, coordY])
  const rgb = getRandomRGBColor()
  gColors.push(rgb)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  for (let index = 0; index < gPoints.length; index++) {
    gl.vertexAttrib3f(aPosition, gPoints[index][0], gPoints[index][1], 0.0)
    gl.uniform4f(uFragColor, gColors[index][0], gColors[index][1], gColors[index][2], 1.0)
    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
function getRandomRGBColor () {
  return [Math.random(), Math.random(), Math.random()]
}
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
  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, aPosition, uFragColor)
  }
  if (aPosition < 0) {
    console.log('获取a_Position地址失败')
    return
  }
  // attribute变量赋值
  gl.vertexAttrib3f(aPosition, 0.0, 0.0, 0.0)
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
}

main()
