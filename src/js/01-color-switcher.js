function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', newStart);
stopBtn.addEventListener('click', newStop);

function newStart() {
  timerId = setInterval(() => {document.body.style.backgroundColor = getRandomHexColor()}, 1000);

  startBtn.toggleAttribute('disabled');
}

function newStop() {
  clearInterval(timerId);

  startBtn.removeAttribute('disabled');
}
