//Selectors
const focusBtn = document.querySelector('#focus-btn');
const shortBtn = document.querySelector('#shortBreak-btn');
const longBtn = document.querySelector('#longBreak-btn');
const resetBtn = document.querySelector('#timer-reset');

//Event Listeners
focusBtn.addEventListener('click', timerOptionsDisplay);
shortBtn.addEventListener('click', timerOptionsDisplay);
longBtn.addEventListener('click', timerOptionsDisplay);
resetBtn.addEventListener('click', timerOptionsRemove);


let pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('.timer--minutes');
      this.secondsDom = document.querySelector('.timer--seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      // TODO: Refactor removal of other button's active state
  ////FOCUS BUTTON
      document.querySelector('#focus-btn').onclick = function(){
        self.startFocus.apply(self);
        this.classList.add('timer--tab-active');
        this.classList.remove('timer--tab');
        const fillerOpacity = document.querySelector('#filler');
        fillerOpacity.style.height = "300px";
      //Remove active Short Break
        const shortTab = document.querySelector('#shortBreak-btn');
        shortTab.classList.add('timer--tab');
        shortTab.classList.remove('timer--tab-active');
      //Remove active Long Break
        const longTab = document.querySelector('#longBreak-btn');
        longTab.classList.add('timer--tab');
        longTab.classList.remove('timer--tab-active-mr0');
      };
  ////SHORT BREAK BUTTON
      document.querySelector('#shortBreak-btn').onclick = function(){
        self.startShortBreak.apply(self);
        this.classList.add('timer--tab-active');
        this.classList.remove('timer--tab');
        const fillerOpacity = document.querySelector('#filler');
        fillerOpacity.style.height = "300px";
      //Remove active Focus
        const focusTab = document.querySelector('#focus-btn');
        focusTab.classList.add('timer--tab');
        focusTab.classList.remove('timer--tab-active');
      //Remove active Long Break
        const longTab = document.querySelector('#longBreak-btn');
        longTab.classList.add('timer--tab');
        longTab.classList.remove('timer--tab-active-mr0');
      };
  ////LONG BREAK BUTTON
      document.querySelector('#longBreak-btn').onclick = function(){
        self.startLongBreak.apply(self);
        this.classList.add('timer--tab-active-mr0');
        this.classList.remove('timer--tab');
        const fillerOpacity = document.querySelector('#filler');
        fillerOpacity.style.height = "300px";
      //Remove active Focus
        const focusTab = document.querySelector('#focus-btn');
        focusTab.classList.add('timer--tab');
        focusTab.classList.remove('timer--tab-active');
      //Remove active Short Break
        const shortTab = document.querySelector('#shortBreak-btn');
        shortTab.classList.add('timer--tab');
        shortTab.classList.remove('timer--tab-active');
      };
  ////RESET BUTTON
      document.querySelector('#timer-reset').onclick = function(){
        self.stopTimer.apply(self);
        const fillerOpacity = document.querySelector('#filler');
        fillerOpacity.style.height = "300px";
        const focusTab = document.querySelector('#focus-btn');
        focusTab.classList.remove('timer--tab-active');
        focusTab.classList.add('timer--tab');
        const shortTab = document.querySelector('#shortBreak-btn');
        shortTab.classList.remove('timer--tab-active');
        shortTab.classList.add('timer--tab');
        const longTab = document.querySelector('#longBreak-btn');
        longTab.classList.remove('timer--tab-active');
        longTab.classList.add('timer--tab');
        // const timerOptions = document.querySelector('.timer--on-options');
        // timerOptions.style.display = "none";
        // const timerInstruction = document.querySelector('.timer--instruction')
        // timerInstruction.style.display = "flex";
      };
  ////PAUSE BUTTON
      document.querySelector('#timer-pause').onclick = function(){
        let isPaused = pomodoro.started;
        if(isPaused === false) {
          pomodoro.started = true;
          const pauseBtn = document.getElementById('timer-pause-text');
          pauseBtn.textContent = "Pause";
          const playIcon = document.querySelector('#timer-play-btn');
          playIcon.style.display = "none";
          const pauseIcon = document.querySelector('#timer-pause-btn');
          pauseIcon.style.display = "block";
        } else {
          if (isPaused === true) {
            pomodoro.started = false;
            const pauseBtn = document.getElementById('timer-pause-text');
            pauseBtn.textContent = "Play";
            const pauseIcon = document.querySelector('#timer-pause-btn');
            pauseIcon.style.display = "none";
            const playIcon = document.querySelector('#timer-play-btn');
            playIcon.style.display = "block";
          }
        }
      }
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 300/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startFocus: function() {
        const settingsMinutes = document.getElementById('settings--focus-time').value;
        this.resetVariables(settingsMinutes, 0, true);
    },
    startShortBreak : function(){
        const settingsMinutes = document.getElementById('settings--short-time').value;
        this.resetVariables(settingsMinutes, 0, true);
    },
    startLongBreak : function(){
        const settingsMinutes = document.getElementById('settings--long-time').value;
        this.resetVariables(settingsMinutes, 0, true);
    },
    stopTimer : function(){
        const settingsMinutes = document.getElementById('settings--focus-time').value;
        this.resetVariables(settingsMinutes, 0, false);
        this.updateDom();
    },

    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};
window.onload = function(){
  pomodoro.init();
  const shortBreakSet = document.querySelector('#shortbreak-btn');
  const settingsShort = document.getElementById('settings--short-time').value;
  shortBreakSet.innerHTML = settingsShort;
  const longBreakSet = document.querySelector('#longbreak-btn');
  const settingsLong = document.getElementById('settings--long-time').value;
  longBreakSet.innerHTML = settingsLong;
};


//Show Timer Options: Pause - Restart - I FUCKING DID IT, COMPLETELY BY MYSELF.
//I can feel it's a makeshift, sketchy way to do it but a week into JavaScript and I'm happy with this progress!
//UPDATE: 2 days after writing the singular function, I ended up splitting it into two functions because I couldn't
//get the options to display again after clicking the reset button and then clicking a timer button(focus, short break, etc)
function timerOptionsDisplay() {
  const timerInstruction = document.querySelector('.timer--instruction');
  timerInstruction.style.display = "none";
    const timerOptions = document.querySelector('.timer--on-options');
    timerOptions.style.display = "flex";
  }; 

function timerOptionsRemove() {
  const timerInstruction = document.querySelector('.timer--instruction');
  timerInstruction.style.display = "flex";
    const timerOptions = document.querySelector('.timer--on-options');
    timerOptions.style.display = "none";
  };
  

 function updateBreakValues() {
  const settingsShort = document.getElementById('settings--short-time').value;
  shortBreakSet.innerHTML = settingsShort;
  const longBreakSet = document.querySelector('#longbreak-btn');
  const settingsLong = document.getElementById('settings--long-time').value;
  longBreakSet.innerHTML = settingsLong;
 };