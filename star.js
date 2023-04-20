window.onload = function () {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let numStars = 100;
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 2;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      alpha: Math.random() * 0.5 + 0.5,
    });
  }

  // 绘制星点
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numStars; i++) {
      let star = stars[i];
      let baseAlpha = 0.3;
      let alpha = baseAlpha + Math.random() * 0.2;
      if (star.y > canvas.height / 2) {
        alpha *= 1 - (star.y - canvas.height / 2) / (canvas.height / 2);
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }
  }
  const fps = 6; // 设置帧率为30
  const interval = 1000 / fps; // 计算每帧间隔时间

  let then = Date.now();
  function animate() {
    requestAnimationFrame(animate);
    const now = Date.now();
    const delta = now - then;
    if (delta > interval) {
      // 如果时间间隔达到限定帧率
      then = now - (delta % interval); // 更新时间标记
      drawStars(); // 进行绘制
    }
  }
  animate();
};
