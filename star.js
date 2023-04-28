window.starShown = false;
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let numStars = 115;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function generateStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4,
      alpha: Math.random() * 0.5 + 0.5,
      // vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 2,
      shakeRate: 0.0025,
    });
  }
}

window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("orientationchange", resizeCanvas, false);
window.addEventListener("orientationchange", generateStars, false);
window.onload = resizeCanvas();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
generateStars();
var alphaFrozen = false;

// 绘制星点
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];
    let baseAlpha = 0.3;
    if (!alphaFrozen) {
      alpha = baseAlpha + Math.random() * 0.2;
    } else {
      alpha = star.alpha;
    }
    if (star.y > canvas.height / 2) {
      alpha *= 1 - (star.y - canvas.height / 2) / (canvas.height / 2);
    }
    if (brightShown) {
      // star.x += star.vx;
      star.y -= star.vy;
      if (i % 2 == 1) {
        star.x += Math.sin((Date.now() * star.shakeRate) / 4) * 2; // 正弦函数平滑移动
      } else {
        star.x -= Math.sin((Date.now() * star.shakeRate) / 4) * 2; // 正弦函数平滑移动
      }
      star.y -= 5;
      /*
      if (star.x + star.radius * 2 < 0) {
        star.x = canvas.width + star.radius * 2;
      }
      if (star.x + star.radius * 2 > canvas.width) {
        star.x = 0 - star.radius * 2;
      }
      */
      if (star.y + star.radius * 2 < 0) {
        star.y = canvas.height + star.radius * 2;
      }
    }
    ctx.beginPath();
    if (brightShown) {
      alphaFrozen = true;
      ctx.fillStyle = `rgba(75, 141, 44, ${alpha})`;
      ctx.arc(star.x, star.y, star.radius * 2, 0, 2 * Math.PI);
    } else {
      alphaFrozen = false;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    }
    ctx.fill();
  }
}
let fps = 12;
let then = Date.now();
function animate() {
  requestAnimationFrame(animate);
  let interval = 1000 / fps; // 计算每帧间隔时间
  if (brightShown) {
    fps = 30;
  } else {
    fps = 12;
  }
  const now = Date.now();
  const delta = now - then;
  if (delta > interval) {
    // 如果时间间隔达到限定帧率
    then = now - (delta % interval); // 更新时间标记
    drawStars(); // 进行绘制
  }
  if (!starShown) {
    setTimeout(() => {
      document.getElementById("stars").classList.add("visible");
    }, 500);
    starShown = true;
  }
}
animate();
