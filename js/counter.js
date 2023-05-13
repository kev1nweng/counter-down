// Initialize hooks
const hook = {
  targetDate: null,
  countdownMsg: null,
  gotQuote: null,
};

let targetDate =
  hook.targetDate || new Date("November 5, 2024 00:00:00").getTime();

function countDown() {
  let now = new Date().getTime();
  let deltaTime;
  if (counterMode == 0) {
    deltaTime = targetDate - now;
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
  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = formattedTime;
  if (!counterShown) {
    setTimeout(() => {
      document.getElementById("countdown").classList.add("visible");
    }, 1000);
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
    document.getElementById("quote").classList.add("visible");
  })
  .catch(console.error);
}
*/

// Giving up base64 encryption because it's recommended to deploy from a private clone of the repo
const countdownMsg = hook.countdownMsg || [
  "You are the best!",
  "Always embrace hope...",
  "Tomorrow will always be a brand new day!",
];

const countupMsg = [];

// Special text in the last minute
const lastMinuteMsg = [
  [0, 1000, "A message shown from 0ms to 1000ms after triggering"], // Not final data structure
];

function fetchQuote(isCountdown = true) {
  let gotQuote;
  if (isCountdown) {
    gotQuote = countdownMsg[Math.floor(Math.random() * countdownMsg.length)];
  } else gotQuote = countupMsg[Math.floor(Math.random() * countupMsg.length)];
  const quoteQuery = document.querySelector("#quote");
  quoteQuery.innerText = hook.gotQuote || gotQuote;
}

function fireCountDown() {
  countDown();
  fetchQuote();
  setTimeout(() => {
    document.getElementById("quote").classList.add("visible");
  }, 2000);
  setTimeout(() => {
    document.getElementById("footer").classList.add("hidden");
  }, 2500);
  setTimeout(() => {
    document.getElementById("stars").classList.add("visible");
    modFooter(window.instanceName, window.version);
    document.getElementById("footer").classList.remove("hidden");
  }, 3000);
  setTimeout(() => {
    eval(
      atob(
        "Y29uc29sZS5sb2coIlBsZWFzZSBzdGF5IGFsaXZlLi4uICVjY3V6IHUgYXJlIHRoZSBvbmUuIiwgImNvbG9yOnJnYig1OCwgMTIwLCAyNTUpOyIp"
      )
    );
  }, 4000);
}

fireCountDown();
