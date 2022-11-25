function main () {
  // 获取canvas
  const canvas = document.querySelector('#example')
  if (!canvas) {
    console.log('获取canvas失败')
  }
  // 获取绘制二维图形的绘图上下文
  const ctx = canvas.getContext('2d')
  // 设置填充色为蓝色
  ctx.fillStyle = 'rgba(0, 0 ,255, 1.0)'
  // 使用填充贪色填充矩形
  ctx.fillRect(120, 10, 150, 150)
}
main()
