
import { getWebGLContext, initShaders } from './../../utils/cuon-utils'
// 顶点着色器 声明attribute变量
// attribute 存储限定符 必须是全局变量 格式：存储限定符 类型 变量名
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
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
  const n = initVertexBuffers(gl)
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 绘制三角形
  gl.drawArrays(gl.POINTS, 0, n)
}

function initVertexBuffers (gl) {
  const vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
  ])
  // 点的个数
  const n = 3
  const sizes = new Float32Array([
    10.0, 20.0, 30.0
  ])
  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer()
  const sizeBuffer = gl.createBuffer()
  // 缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position')
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
  // 链接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(aPosition)
  // 将顶点尺寸写入缓冲区对象并开启
  gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW)
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(aPointSize)
  return n
}
main()
