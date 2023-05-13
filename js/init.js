const monthNameStr = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const lastModifiedDate = new Date(document.lastModified);

window.starClicked = 0;
window.isBrightMode = false;
window.menuShown = false;
window.counterShown = false;
window.counterMode = 0; // 0: countdown; 1: countup; 2: special;
window.instanceName = "counter-down";
window.dayVersion = "v2";
window.version =
  lastModifiedDate.getYear().toString().slice(-2) +
  monthNameStr[lastModifiedDate.getMonth()] +
  ("0" + lastModifiedDate.getDate()).slice(-2) +
  dayVersion;

function flag() {
  if (isBrightMode) {
    document.getElementById("brightcover").classList.remove("bright");
    document.getElementById("footer").classList.remove("bright");
    document.getElementById("quote").classList.remove("bright");
    document.getElementById("countdown").classList.remove("bright");
    isBrightMode = false;
    return;
  }
  if (starClicked == 5) {
    starClicked = 0;
    document.getElementById("brightcover").classList.add("bright");
    document.getElementById("footer").classList.add("bright");
    document.getElementById("quote").classList.add("bright");
    document.getElementById("countdown").classList.add("bright");
    isBrightMode = true;
    console.log("Goin' bright!");
    try {
      eruda.init();
    } catch (e) {
      console.log("Failed to initialize eruda. Check network");
    }
    return;
  }
  starClicked++;
  console.log(`${starClicked}/6 taps to bright mode.`);
}

function modFooter(modInstanceName, modVersion) {
  if (modInstanceName || modVersion)
    document.getElementById(
      "footer"
    ).innerHTML = `点击此处生成一片新的星空!<br /><br />
  <!-- English alt: Click on the quote to<br />generate a new starry sky! -->
  by kW with love. <br />
  ${modInstanceName || window.instanceName} ${
      modVersion || window.version
    } - Github<br /><br />&nbsp;`;
  else throw new Error("Empty mod");
}

/*
  function toggleMenu() {
    if (!menuShown) {
      document.getElementById("tweaksMenu").classList.add("visible");
      menuShown = true;
    } else {
      document.getElementById("tweaksMenu").classList.remove("visible");
      menuShown = false;
    }
  }
  */

if (!/\bver=/.test(location.href)) {
  location.href = `${location.href}?ver=${version}`;
}

let searchParams = new URLSearchParams(new URL(location.href).search);
let verParam = searchParams.get("ver");
if (verParam !== version) {
  let locationRaw =
    location.protocol + "//" + location.host + location.pathname;
  location.href = `${locationRaw}?ver=${version}`;
}

console.log(
  "   _____ ____  _    _ _   _ _______ ______ _____  \n  / ____/ __ \\| |  | | \\ | |__   __|  ____|  __ \\ \n | |   | |  | | |  | |  \\| |  | |  | |__  | |__) |\n | |   | |  | | |  | | . ` |  | |  |  __| |  _  / \n | |___| |__| | |__| | |\\  |  | |  | |____| | \\ \\ \n  \\_____\\____/_\\____/|_|_\\_|  |_|  |______|_|  \\_\\ \n          |  __ \\ / __ \\ \\        / / | | |       \n  ______  | |  | | |  | \\ \\  /\\  / /|  \\| |       \n |______| | |  | | |  | |\\ \\/  \\/ / | . ` |       \n          | |__| | |__| | \\  /\\  /  | |\\  |       \n          |_____/ \\____/   \\/  \\/   |_| \\_|    " +
    version +
    "\n\nGithub Repo: https://github.com/kev1nweng/counter-down\n "
);
