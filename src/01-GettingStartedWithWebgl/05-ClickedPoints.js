import { getWebGLContext, initShaders } from './../../utils/cuon-utils'
// 顶点着色器 声明attribute变量
// attribute 存储限定符 必须是全局变量 格式：存储限定符 类型 变量名
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position; //设置坐标
    gl_PointSize = a_PointSize;//设置尺寸
  }
`
// 片元着色器

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor =  vec4(1.0, 1.0, 0.0, 1.0);
  }
`
// 鼠标点击位置数组
const gPoints = []
// 鼠标点击回调事件
function click (ev, gl, canvas, aPosition) {
  const x = ev.clientX
  const y = ev.clientY
  const rect = ev.target.getBoundingClientRect()
  const coordX = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2)
  const coordY = -((y - rect.top) - canvas.height / 2) / (canvas.height / 2)
  gPoints.push(...[coordX, coordY])
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  for (let index = 0; index < gPoints.length; index += 2) {
    gl.vertexAttrib3f(aPosition, gPoints[index], gPoints[index + 1], 0.0)
    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
  }
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
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, aPosition)
  }
  if (aPosition < 0) {
    console.log('获取a_Position地址失败')
    return
  }
  if (aPointSize < 0) {
    console.log('获取a_PointSize地址失败')
    return
  }
  // attribute变量赋值
  gl.vertexAttrib3f(aPosition, 0.0, 0.0, 0.0)
  gl.vertexAttrib1f(aPointSize, 10.0)
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
}

main()
