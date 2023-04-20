let targetDate = new Date("November 5, 2024 00:00:00").getTime();

var positiveSentences = [
    "你一定能行！",
    "每一天都是新的开始！",
    "你的努力一定会有回报！",
    "坚持就是胜利！",
    "相信自己，你可以做到！",
    "不要放弃，成功就在前方！",
    "失败是成功之母，继续努力吧！",
    "只要你愿意，一切皆有可能！",
    "生活不易，但你可以更坚强！",
    "把握每一天，做最好的自己！",
    "你的未来取决于你现在的选择！",
    "每一次的尝试都是一次成长！",
    "不要害怕失败，勇敢去尝试！",
    "成功需要勇气和坚持！",
    "每一次的挑战都是一次机会！",
    "相信自己，你是最棒的！",
    "永远不要放弃对梦想的追求！",
    "不要停下前进的步伐，向前走！",
    "你的坚持会让未来更美好！",
    "相信自己，你一定可以做到！",
    "努力不一定成功，但放弃一定失败！",
    "不要让失败打败你，继续向前！",
    "相信自己，你的能力无限！",
    "做自己喜欢的事情，让生活更美好！",
    "永远不要放弃对未来的憧憬！",
    "不要被困难击倒，坚持到底！",
    "不要停下脚步，继续前行！",
    "每一次的努力都是一次积累！",
    "保持积极的心态，迎接美好的未来！",
    "成功需要实力和耐心！",
    "困难是暂时的，坚持是永恒的！",
    "你的梦想就在前方，加油！",
    "不要害怕失败，失败是成功之母！",
    "相信自己，你的能力无限！",
    "做自己的主人，掌握自己的命运！",
    "每一次的尝试都是一次机会，抓住它！",
    "不要在乎别人的眼光，坚持自己的梦想！",
    "成功的关键在于坚持不懈，永不放弃！",
    "没有什么事情是不可能的，只要你敢去尝试！",
    "每一个成功者都有一个开始。勇于开始，才能找到成功的路！",
    "不要让过去的阴影遮住了现在的阳光，放下过去，迎接未来！",
    "相信自己，你拥有改变世界的力量！",
    "只要你肯努力，没有什么事情是不能实现的！",
    "不要轻易放弃自己的梦想，它可能离你只差一步之遥！",
    "无论何时，都要保持一颗感恩的心，珍惜身边的一切！",
    "👍加油~"
];

// Special text in the last minute
const messages = [
    `Text1<br>Text2<br>Text3`,
];

window.counterShown = false;

function countDown() {
	let now = new Date().getTime();
	let remainingTime = targetDate - now;

	let years = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 365));
	let months = Math.floor((remainingTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
	let days = Math.floor((remainingTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
	let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    let formattedTime = `${years}<b>年</b> ${months}<b>月</b> ${days}<b>日</b><br>${hours}<b>小时</b> ${minutes}<b>分钟</b> ${seconds}<b>秒</b>`;
    if (!counterShown) {
        document.getElementById("countdown").classList.add("visible");
        counterShown = true;
    }

	document.getElementById("countdown").innerHTML = formattedTime;

	// TODO: 如果剩余时间小于1分钟，显示存储在数组中的文字
	if (remainingTime < 60000) {
        for (let i = 0; i <= messages.length; i++) {
            document.getElementById("countdown").innerHTML = messages[i];
        }
	}

	if (remainingTime <= 0) {
		clearInterval(countdownInterval);
		setInterval(countUp, 1000);
	}
}

function countUp() {
	let now = new Date().getTime();
	let elapsedTime = now - targetDate;

	let years = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 365));
	let months = Math.floor((elapsedTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
	let days = Math.floor((elapsedTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
	let hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

	// Format
    let formattedTime = `${years}<b>年</b> ${months}<b>月</b> ${days}<b>日</b><br>${hours}<b>小时</b> ${minutes}<b>分钟</b> ${seconds}<b>秒</b>`;
	document.getElementById("countdown").innerHTML = formattedTime;
}

function displayMessage() {
	if (targetDate - new Date().getTime() < 60000) {
		document.getElementById("countdown").innerHTML = messages[0][currentMessageIndex];
		currentMessageIndex = (currentMessageIndex + 1) % messages[0].length;
	}
	setTimeout(displayMessage, 5000);
}

/*
function fetchQuote() {
    fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
        const quoteQuery = document.querySelector('#quote');
        quoteQuery.href = `https://hitokoto.cn/?c=l`;
        quoteQuery.innerText = data.hitokoto;
        document.getElementById("quote").classList.add("visible");
    })
    .catch(console.error);
}
*/

function fetchQuote() {
    let gotQuote = positiveSentences[Math.floor(Math.random() * positiveSentences.length)];
    const quoteQuery = document.querySelector('#quote');
    quoteQuery.innerText = gotQuote;
    document.getElementById("quote").classList.add("visible");
}

setInterval(countDown, 1000);
displayMessage();
setTimeout(fetchQuote, 2000);