import Matrix4 from '../../utils/cuon-matrix'
import { getWebGLContext, initShaders } from './../../utils/cuon-utils'
// 顶点着色器 声明attribute变量
// attribute 存储限定符 必须是全局变量 格式：存储限定符 类型 变量名
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  void main() {
    gl_Position = u_ModelMatrix * a_Position;
  }
`
// 片元着色器
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
`
// 旋转速度（度/秒）
const ANGLE_STEP = 90.0
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
  const n = initVertexBuffers(gl)
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  const uModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
  // 三角形当前旋转角度
  let currentAngle = 0.0
  // 创建Matrix4对象进行模型变化
  const modelMatrix = new Matrix4()
  // 开始绘制三角形
  const tick = function () {
    // 更新旋转角
    currentAngle = animate(currentAngle)
    draw(gl, n, currentAngle, modelMatrix, uModelMatrix)
    requestAnimationFrame(tick)
  }
  tick()
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
function draw (gl, n, currentAngle, modelMatrix, uModelMatrix) {
  // 设置旋转矩阵
  modelMatrix.setRotate(currentAngle, 0, 0, 1)
  modelMatrix.translate(0.35, 0, 0)
  // 将旋转矩阵传输给顶点着色器
  gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix.elements)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, n)
}
// 记录上一次调用函数时刻
let gLast = Date.now()
function animate (angle) {
  // 计算距离上次调用经过多长的时间
  const now = Date.now()
  // 毫秒
  const elapsed = now - gLast
  gLast = now
  // 根据距离上次调用的时间，更新当前旋转角度
  const newAngle = (angle + (ANGLE_STEP * elapsed) / 1000) % 360
  return newAngle
}
main()
