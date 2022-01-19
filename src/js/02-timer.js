import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
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

console.log(options.defaultDate)
    

