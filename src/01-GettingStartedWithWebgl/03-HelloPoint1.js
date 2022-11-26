import { getWebGLContext, initShaders } from './../../utils/cuon-utils'
// waring:glsl一定记得加分号
// 顶点着色器
// gl_PointSize = 10.0如果改为gl_PointSize = 10会报错，因我vec4参数为浮点型，10是整数型，10.0才是浮点型
const VSHADER_SOURCE = `
  void main() {
    gl_Position = vec4(0.5, 0.5, 0.0, 1.0); //设置坐标
    gl_PointSize = 10.0;//设置尺寸
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
  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1)
}
main()
