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
        startBtn.setAttribute('disabled', '');
        let timeDifference = selectedDates[0] - today;
        const counterID = setInterval(() => {
          convertMs(timeDifference);
          console.log(counter);
          timeDifference -= 1000;
          if (timeDifference <= 0) {
            clearInterval(counterID);
          }
        }, 1000);
        /* daysCounterEl.textContent = counter.days;
        hoursCounterEl.textContent = counter.hours;
        minutesCounterEl.textContent = counter.minutes;
        secondsCounterEl.textContent = counter.seconds; */
      });
    }
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  counter = { days, hours, minutes, seconds };
}

const daysCounterEl = document.querySelector('span[data-days]');
const hoursCounterEl = document.querySelector('span[data-hours]');
const minutesCounterEl = document.querySelector('span[data-minutes]');
const secondsCounterEl = document.querySelector('span[data-seconds]');
