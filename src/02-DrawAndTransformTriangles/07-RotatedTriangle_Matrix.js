import { getWebGLContext, initShaders } from './../../utils/cuon-utils'
// 顶点着色器 声明attribute变量
// attribute 存储限定符 必须是全局变量 格式：存储限定符 类型 变量名
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrix;
  void main() {
    gl_Position = u_xformMatrix * a_Position;
  }
`
// 片元着色器
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
`
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
  if (aPosition < 0) {
    console.log('获取a_Position地址失败')
    return
  }
  const n = initVertexBuffers(gl)
  // 旋转
  // // 旋转角度
  // const ANGLE = 90.0
  // // 角度转弧度
  // const radian = ANGLE * Math.PI / 180
  // // 创建旋转矩阵
  // const cosB = Math.cos(radian)
  // const sinB = Math.sin(radian)
  // // webgl中矩阵是列主序
  // const xformMatrix = new Float32Array([
  //   cosB, sinB, 0.0, 0.0,
  //   -sinB, cosB, 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // ])
  // 平移
  // const Tx = 0.5
  // const Ty = 0.5
  // const Tz = 0.0
  // const xformMatrix = new Float32Array([
  //   1.0, 0.0, 0.0, 0.0,
  //   0.0, 1.0, 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   Tx, Ty, Tz, 1.0
  // ])
  // 缩放
  const Sx = 1.5
  const Sy = 1.5
  const Sz = 1.0
  const xformMatrix = new Float32Array([
    Sx, 0.0, 0.0, 0.0,
    0.0, Sy, 0.0, 0.0,
    0.0, 0.0, Sz, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])

  const uxformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix')
  gl.uniformMatrix4fv(uxformMatrix, false, xformMatrix)
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 绘制三个点
  gl.drawArrays(gl.TRIANGLES, 0, n)
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
