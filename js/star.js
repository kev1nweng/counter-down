const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let numStars = 115;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function generateStars() {
  // Initializing the array every time in case of issues when regenerating stars
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4,
      alpha: Math.random() * 0.3,
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
let alphaFrozen = false;

function reSpring() {
  document.getElementById("stars").classList.remove("visible");
  document.getElementById("quote").classList.remove("visible");
  setTimeout(() => {
    generateStars();
    fetchQuote();
    document.getElementById("stars").classList.add("visible");
    document.getElementById("quote").classList.add("visible");
  }, 500);
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];
    if (!alphaFrozen) {
      alpha = star.alpha + Math.random() * 0.1;
    } else {
      alpha = star.alpha + 0.4;
    }
    if (star.y > canvas.height / 2) {
      alpha *= 1 - (star.y - canvas.height / 2) / (canvas.height / 2);
    }
    if (isBrightMode) {
      // star.x += star.vx;
      /* 
      Removing this line cuz randomized x-axis movements can cause 
      a reduction in the number of stars in long sessions
      */
      star.y -= star.vy;
      if (i % 2 == 1) {
        star.x += Math.sin((Date.now() * star.shakeRate) / 4) * 2; // Movement smoothing
      } else {
        star.x -= Math.sin((Date.now() * star.shakeRate) / 4) * 2; // Movement smoothing
      }
      star.y -= 5;
      if (star.y + star.radius * 2 < 0) {
        star.y = canvas.height + star.radius * 2;
      }
    }
    ctx.beginPath();
    if (isBrightMode) {
      alphaFrozen = true;
      ctx.fillStyle = `rgba(75, 141, 44, ${alpha})`;
      ctx.arc(star.x, star.y, star.radius * 2, 0, 2 * Math.PI);
    } else {
      alphaFrozen = false;
      /* // Legacy: stars without glow effect
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      */
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      let gradient = ctx.createRadialGradient(
        star.x,
        star.y,
        star.radius * 0.25,
        star.x,
        star.y,
        star.radius * 2
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.arc(star.x, star.y, star.radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fill();
  }
}

let fps = 12;
let then = Date.now();

function animate() {
  let interval = 1000 / fps;
  if (isBrightMode) {
    fps = 30;
  } else {
    fps = 12;
  }
  const now = Date.now();
  const delta = now - then;
  if (delta >= interval) {
    then = now - (delta % interval);
    drawStars();
  }
  requestAnimationFrame(animate);
}

animate();
