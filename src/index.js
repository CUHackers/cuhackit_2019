const hackDate = new Date("March 10, 2018 10:00:00");
const seconds = document.getElementsByClassName("seconds")[0];
const minutes = document.getElementsByClassName("minutes")[0];
const hours = document.getElementsByClassName("hours")[0];
const days = document.getElementsByClassName("days")[0];

// Controls the countdown timer
setInterval(function() {
  let now = new Date();
  let timeDelt = hackDate - now.getTime();
  let displaySeconds = Math.floor(timeDelt/1000) % 60;
  let displayMinutes = Math.floor(timeDelt/60000) % 60;
  let displayHours = Math.floor(timeDelt/3600000) % 24;
  let displayDays = Math.floor(timeDelt/86400000);
  
  if (displaySeconds > 9) {
    seconds.innerHTML = displaySeconds;
  } else {
    seconds.innerHTML = "0"+ displaySeconds;
  }
  
  if (displayMinutes > 9) {
    minutes.innerHTML = displayMinutes;
  } else {
    minutes.innerHTML = "0" + displayMinutes;
  }
  
  if (displayHours > 9) {
    hours.innerHTML = displayHours;
  } else {
    hours.innerHTML = "0" + displayHours;
  }
  
  days.innerHTML = displayDays;
}, 1000)
