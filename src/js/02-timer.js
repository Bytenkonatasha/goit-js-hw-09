import flatpickr from "flatpickr"; 
import "flatpickr/dist/flatpickr.min.css"; 
import Notiflix from 'notiflix'; 
 
const text = document.querySelector('#datetime-picker'); 
const timers = document.querySelector('.timer'); 
const start = document.querySelector('[data-start]'); 
const seconds = document.querySelector('[data-seconds]'); 
const minutes = document.querySelector('[data-minutes]'); 
const hours = document.querySelector('[data-hours]'); 
const days = document.querySelector('[data-days]'); 
 
start.disabled = true; 
 
const options = { 
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  onClose(selectedDates) { 
    if (selectedDates[0] < new Date()) { 
      Notiflix.Notify.failure('Please choose a date in the future'); 
      start.disabled = true; 
    } else { 
      start.disabled = false; 
    } 
  }, 
}; 
flatpickr(text, options); 
 
function convertMs(ms) { 
  // Number of milliseconds per unit of time 
  const second = 1000; 
  const minute = second * 60; 
  const hour = minute * 60; 
  const day = hour * 24; 
 
  // Remaining days 
  const days = Math.floor(ms / day); 
  // Remaining hours 
  const hours = Math.floor((ms % day) / hour); 
  // Remaining minutes 
  const minutes = Math.floor(((ms % day) % hour) / minute); 
  // Remaining seconds 
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); 
 
  return { days, hours, minutes, seconds }; 
} 
 
function addLeadingZero(value) { 
    return value.toString().padStart(2, '0'); 
} 
 
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2} 
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20} 
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20} 
 
 
 
// Get element date input, start btn, data: days, hours, min, sec 
 
 
start.addEventListener('click', () => { 
  let timer = setInterval(() => { 
    let countdown = new Date(text.value) - new Date(); 
    start.disabled = true; 
    if (countdown >= 0) { 
      let timeObject = convertMs(countdown); 
      days.textContent = addLeadingZero(timeObject.days); 
      hours.textContent = addLeadingZero(timeObject.hours); 
      minutes.textContent = addLeadingZero(timeObject.minutes); 
      seconds.textContent = addLeadingZero(timeObject.seconds); 
      if (countdown <= 10000) { 
        timers.style.color = 'tomato'; 
      } 
    } else { 
      Notiflix.Notify.success('Countdown finished'); 
      timers.style.color = 'black'; 
      clearInterval(timer); 
    } 
  }, 1000); 
});