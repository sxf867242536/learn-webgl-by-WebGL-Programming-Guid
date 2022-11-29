
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
  const verticesSizes = new Float32Array([
    0.0, 0.5, 10.0, -0.5, -0.5, 20.0, 0.5, -0.5, 30.0
  ])
  // 点的个数
  const n = 3
  // 创建缓冲区对象
  const vertexSizeBuffer = gl.createBuffer()
  // 缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW)
  const FSIZE = verticesSizes.BYTES_PER_ELEMENT
  // 获取a_position的存储位置，分配缓冲区并且开启
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position')
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 3, 0)
  gl.enableVertexAttribArray(aPosition)
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2)
  gl.enableVertexAttribArray(aPointSize)
  return n
}
main()
