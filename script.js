window.debugMode = false;
let targetDate = new Date("November 5, 2024 00:00:00").getTime();

setTimeout(() => {
  eval(
    atob(
      "Y29uc29sZS5sb2coIlBsZWFzZSBzdGF5IGFsaXZlLi4uICVjY3V6IHUgYXJlIHRoZSBvbmUuIiwgImNvbG9yOnJnYig1OCwgMTIwLCAyNTUpOyIp"
    )
  );
}, 4000);

// TODO: Base64 quote encryption
const countdownMsg = [
  "你一定能行！",
  "每一天都是新的开始，昨天的那都不是事！",
  "你的努力一定会有回报。",
  "不要放弃哦，我在明天等着你。",
  "只要你愿意，一切皆有可能！",
  "生活不易，但你可以更坚强。",
  "每一次的尝试都是一次成长！",
  "相信自己，你是最棒的！",
  "永远不要放弃对梦想的追求！",
  "不要停下前进的步伐，向前走。",
  "你的坚持会让未来更美好！",
  "相信自己，你一定可以做到！",
  "不要让失败打败你，继续向前！",
  "相信自己，你的能力无限。",
  "做自己喜欢的事情，让生活更美好！",
  "永远不要放弃对未来的憧憬！",
  "不要被困难击倒，坚持到底！",
  "不要停下脚步，继续前行！",
  "困难是暂时的，坚持是永恒的！",
  "相信自己，你的能力无限。",
  "做自己的主人，掌握自己的命运。",
  "不要在乎别人的眼光，坚持自己就可以了！",
  "坚持不懈，永不放弃。",
  "没有什么事情是不可能的，只要你敢去尝试。",
  "不要让过去的阴影遮住了现在的阳光。",
  "相信自己，你拥有改变世界的力量。",
  "这个世界上，还有很多人爱着你。",
  "👍加油~",
  "真心希望你可以健康快乐地活着鸭！",
  "碰上什么破事，过了 24 小时还不得到明天吗",
  "还真就和这世界杠上了！",
  "你是个独一无二的、很有意思的人！",
];

if (debugMode) {
  countdownMsg = [];
}

const countupMsg = [];

// Special text in the last minute
const messages = [`Text1<br>Text2<br>Text3`];

window.counterShown = false;

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
  // 缓存 DOM
  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = formattedTime;
  if (remainingTime <= 0) {
    countUp();
    return;
  }
  requestAnimationFrame(countDown);
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
  // 缓存 DOM
  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = formattedTime;
  requestAnimationFrame(countUp);
}

// TODO
function theLastMinute(name) {return name;}

/* online quote
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
    gotQuote =
      countdownMsg[Math.floor(Math.random() * countdownMsg.length)];
  } else
    gotQuote = countupMsg[Math.floor(Math.random() * countupMsg.length)];
  const quoteQuery = document.querySelector("#quote");
  quoteQuery.innerText = gotQuote;
  setTimeout(() => {
    document.getElementById("quote").classList.add("visible");
  }, 2000);
}

function initialize() {
  countDown();
  fetchQuote();
}

initialize();

// odvDZ288Fxg24x1HsWLtdVVxiPHg1W5huaX3ZHnsx
