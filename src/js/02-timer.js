import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', '');

const today = new Date();
let counter;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < today) {
      alert('Please choose a date in the future!');
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', () => {
        convertMs(selectedDates[0] - today);
        /* daysCounterEl.textContent = counter.days;
        hoursCounterEl.textContent = counter.hours;
        minutesCounterEl.textContent = counter.minutes;
        secondsCounterEl.textContent = counter.seconds; */
        console.log(counter);
      });
    }
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);

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

  counter = { days, hours, minutes, seconds };
}

const daysCounterEl = document.querySelector('span[data-days]');
const hoursCounterEl = document.querySelector('span[data-hours]');
const minutesCounterEl = document.querySelector('span[data-minutes]');
const secondsCounterEl = document.querySelector('span[data-seconds]');
