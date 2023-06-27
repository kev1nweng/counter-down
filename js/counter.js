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

const theLastMinute = {
  customName: "targetName",
  payload: function () {
    console.log(this.customName);
  },
};

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

function fetchQuote(evtRaw, isCountdown = true) {
  const jsonPath = "./config.json?timestamp=" + new Date().getTime();
  if (evtRaw) evt = evtRaw;
  else evt = null;
  if (!configFetched) {
    fetch(jsonPath)
      .then((response) => response.json())
      .then((data) => {
        configVersion = data.version;
        window.countdownMsg = data.msgArrays.countDown;
        window.countupMsg = data.msgArrays.countUp;
        console.log(
          "\nFetch: " +
            "(on " +
            evt +
            ") " +
            jsonPath +
            "\n\nconfigVersion: " +
            configVersion +
            "\n\ncountDownMsg: " +
            countdownMsg +
            "\n\ncountUpMsg: " +
            countupMsg +
            "\n\n"
        );
        window.configFetched = true;
        let gotQuote;
        if (isCountdown) {
          gotQuote = (hook.countdownMsg || countdownMsg)[
            Math.floor(Math.random() * countdownMsg.length)
          ];
        } else
          gotQuote = countupMsg[Math.floor(Math.random() * countupMsg.length)];
        setTimeout(() => {
          modQuote(gotQuote);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    let gotQuote;
    if (isCountdown) {
      gotQuote = (hook.countdownMsg || countdownMsg)[
        Math.floor(Math.random() * countdownMsg.length)
      ];
    } else gotQuote = countupMsg[Math.floor(Math.random() * countupMsg.length)];
    setTimeout(() => {
      modQuote(gotQuote);
    }, 500);
  }
}

function modQuote(msg) {
  const quoteQuery = document.querySelector("#quote");
  quoteQuery.innerText = "「 " + msg + " 」";
}

function fireCountDown() {
  if (targetDate) countDown();
  fetchQuote("Init");
  setTimeout(() => {
    $id("quote").classList.add("visible");
  }, 1500);
  setTimeout(() => {
    $id("footer").classList.add("hidden");
  }, 2000);
  setTimeout(() => {
    document.getElementById("stars").classList.add("visible");
    modFooter(window.instanceName, window.version, "cfg" + configVersion);
    $id("footer").classList.remove("hidden");
  }, 2500);
}

fireCountDown();
