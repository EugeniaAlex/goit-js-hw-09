import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let countTime = null;

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minsEl = document.querySelector('span[data-minutes]');
const secsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    const selectedDate = selectedDates[0].getTime();
    const currentDate = options.defaultDate.getTime();
    countTime = selectedDate - currentDate;

    if (countTime < 0) {
      startBtn.disabled = true;
      window.alert("Please choose a date in the future");
      return;
    }

    startBtn.disabled = false;   
  },
};


const divTimerEl = document.querySelector('.timer');
const spanEl = document.querySelectorAll('span');
const spanValueEl = document.querySelectorAll('.value');
const spanLabelEl = document.querySelectorAll('.label');
const divFieldEl = document.querySelectorAll('.field');

startBtn.style.background = 'beige';
startBtn.style.padding = '5px';
startBtn.style.borderRadius = '5px';

divTimerEl.style.display = 'flex';

spanEl.forEach(span => {
    span.style.display = "block";
    span.style.textAlign = 'center';
});
spanValueEl.forEach(spanV => {
    spanV.style.fontSize = '32px';
    spanV.style.fontWeight = '500';
});
spanLabelEl.forEach(spanL => {
    spanL.style.fontSize = '10px';
    spanL.style.textTransform = 'uppercase';
});
divFieldEl.forEach(div => {
    div.style.marginRight = '20px';
    
});


flatpickr(input, options);

// console.log(options.defaultDate);
const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive && startBtn.disabled === true) {
      return;
    }

    const startTime = countTime;
    this.isActive = true;

    this.intervalId = setInterval(() => {
      countTime -= 1000;
      const time = convertMs(countTime);
      updateTimer(time);
      this.stop();
     }, 1000);
  },
  stop() {
    if (daysEl.textContent === '00' && hoursEl.textContent === '00' &&
      minsEl.textContent === '00' && secsEl.textContent === '00') {
      
      clearTimeout(this.intervalId);
      }
  },
 };

startBtn.addEventListener('click', () => {
  timer.start();
});

function updateTimer({ days, hours, minutes, seconds }) { 
  daysEl.textContent = `${days}`.padStart(2, '0');
  hoursEl.textContent = `${hours}`.padStart(2, '0');
  minsEl.textContent = `${minutes}`.padStart(2, '0');
  secsEl.textContent = `${seconds}`.padStart(2, '0');

  timer.stop(daysEl.textContent, hoursEl.textContent, minsEl.textContent, secsEl.textContent);

};

    
function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}




