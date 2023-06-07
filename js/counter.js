const targetDate = new Date("November 5, 2024 00:00:00").getTime();

function countDown() {
  let now = new Date().getTime();
  let deltaTime;
  if (counterMode == 0) {
    deltaTime = (hook.targetDate || targetDate) - now;
  } else if (counterMode == 1) {
    deltaTime = now - targetDate;
  } else {
    return;
  }
  if (deltaTime <= 0) counterMode = 1;
  let years = Math.floor(deltaTime / (1000 * 60 * 60 * 24 * 365));
  let months = Math.floor(
    (deltaTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  let days = Math.floor(
    (deltaTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  let hours = Math.floor(
    (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((deltaTime % (1000 * 60)) / 1000);
  let formattedTime = `${years}<b>年</b> ${months}<b>月</b> ${days}<b>日</b><br>${hours}<b>小时</b> ${minutes}<b>分钟</b> ${seconds}<b>秒</b>`;
  // DOM cache: results in better proformance in loops
  const countdownElem = $id("countdown");
  countdownElem.innerHTML = formattedTime;
  if (!counterShown) {
    setTimeout(() => {
      $id("countdown").classList.add("visible");
    }, 500);
    counterShown = true;
  }
  requestAnimationFrame(countDown);
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
    $id("quote").classList.add("visible");
  })
  .catch(console.error);
}
*/

// Giving up base64 encryption because it's recommended to deploy from a private clone of the repo
const countdownMsg = [
  "You are the best!",
  "Always embrace hope...",
  "Tomorrow will always be a brand new day!",
  "U got way to go!",
  "万物皆有缝隙 - 那是光照进来的地方。"
];

const countupMsg = [];

// Special text in the last minute
const lastMinuteMsg = [
  [0, 1000, "A message shown from 0ms to 1000ms after triggering"], // Not final data structure
];

function fetchQuote(isCountdown = true) {
  let gotQuote;
  if (isCountdown) {
    gotQuote = (hook.countdownMsg || countdownMsg)[
      Math.floor(Math.random() * countdownMsg.length)
    ];
  } else gotQuote = countupMsg[Math.floor(Math.random() * countupMsg.length)];
  const quoteQuery = document.querySelector("#quote");
  quoteQuery.innerText = "「 " + gotQuote + " 」";
}

function fireCountDown() {
  countDown();
  fetchQuote();
  setTimeout(() => {
    $id("quote").classList.add("visible");
  }, 1500);
  setTimeout(() => {
    $id("footer").classList.add("hidden");
  }, 2000);
  setTimeout(() => {
    document.getElementById("stars").classList.add("visible");
    modFooter(window.instanceName, window.version);
    $id("footer").classList.remove("hidden");
  }, 2500);
}

fireCountDown();
// Whatever It Takes.