window.debugMode = false; // Manually override using web terminal when debugging
window.counterShown = false;

let targetDate = new Date("November 5, 2024 00:00:00").getTime();

// TODO: Base64 quote encryption
const countdownMsg = [
  "You are the best!",
  "Always embrace hope...",
  "Tomorrow will always be a brand new day.",
];

if (debugMode) {
  countdownMsg = [
    "",
    // Debug msg here
  ];
}

const countupMsg = [];

// Special text in the last minute
const lastMinuteMsg = [
  [0, 1000, "A message shown from 0ms to 1000ms after triggering"], // Not final data structure
];

function countDown() {
  let now = new Date().getTime();
  let remainingTime = targetDate - now;
  let years = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 365));
  let months = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  let days = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  let hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  let formattedTime = `${years}<b>年</b> ${months}<b>月</b> ${days}<b>日</b><br>${hours}<b>小时</b> ${minutes}<b>分钟</b> ${seconds}<b>秒</b>`;
  if (!counterShown) {
    setTimeout(() => {
      document.getElementById("countdown").classList.add("visible");
    }, 1000);
    counterShown = true;
  }
  // DOM cache: results in better proformance in loops
  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = formattedTime;
  if (remainingTime <= 0) {
    // TODO: countUp(); Not working yet!!
    // countUp();
    return;
  }
  requestAnimationFrame(countDown);
  // How to cancel requestAnimationFrame(countDown); when switching to count up?
}

// TODO
function countUp() {
  let now = new Date().getTime();
  let elapsedTime = now - startTime;
  let years = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 365));
  let months = Math.floor(
    (elapsedTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  let days = Math.floor(
    (elapsedTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  let hours = Math.floor(
    (elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  let formattedTime = `${years}<b>年</b> ${months}<b>月</b> ${days}<b>日</b><br>${hours}<b>小时</b> ${minutes}<b>分钟</b> ${seconds}<b>秒</b>`;
  // DOM cache: results in better proformance in loops
  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = formattedTime;
  requestAnimationFrame(countUp);
}

// TODO
function theLastMinute(name) {
  return name;
}

/* Abandoned: Online quote (hitokoto)
function fetchQuote() {
  fetch('https://v1.hitokoto.cn/?c=k')
  .then(response => response.json())
  .then(data => {
    const quoteQuery = document.querySelector('#quote');
    quoteQuery.innerText = data.hitokoto;
    document.getElementById("quote").classList.add("visible");
  })
  .catch(console.error);
}
*/

function fetchQuote(isCountdown = true) {
  let gotQuote;
  if (isCountdown) {
    gotQuote = countdownMsg[Math.floor(Math.random() * countdownMsg.length)];
  } else gotQuote = countupMsg[Math.floor(Math.random() * countupMsg.length)];
  const quoteQuery = document.querySelector("#quote");
  quoteQuery.innerText = gotQuote;
}

function initialize() {
  countDown();
  fetchQuote();
  setTimeout(() => {
    document.getElementById("quote").classList.add("visible");
  }, 2000);
  setTimeout(() => {
    eval(
      atob(
        "Y29uc29sZS5sb2coIlBsZWFzZSBzdGF5IGFsaXZlLi4uICVjY3V6IHUgYXJlIHRoZSBvbmUuIiwgImNvbG9yOnJnYig1OCwgMTIwLCAyNTUpOyIp"
      )
    );
  }, 4000);
}

initialize();
