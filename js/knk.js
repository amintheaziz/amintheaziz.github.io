
var countdownDates = [
    new Date("2025-03-15T00:00:00").getTime(), // عید
    new Date("2025-05-22T00:00:00").getTime(), // امتحانات
    new Date("2025-06-22T00:00:00").getTime(), // تابستان بعدی
    new Date("2026-06-29T10:30:00").getTime()  // کنکور
  ];

  var schoolDays = [6, 0, 1, 2, 3]; // Saturday (6) to Wednesday (3)
  
  // Function to find the next school day at 7:15 a.m.
  function getNextSchoolDay() {
    var now = new Date();
    var day = now.getDay();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var nextDay = null;
    
    if (schoolDays.includes(day) && (hour < 7 || (hour === 7 && minute < 15))) {
      nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 15, 0); // Today 7:15 a.m.
    } else {
      var daysToAdd = 1;
      while (!nextDay) {
        var testDay = (day + daysToAdd) % 7;
        if (schoolDays.includes(testDay)) {
          nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysToAdd, 7, 15, 0);
        }
        daysToAdd++;
      }
    }
    return nextDay.getTime();
  }

  var nextSchoolDay = getNextSchoolDay();

  function startTimers() {
    var x = setInterval(function() {
      var now = new Date().getTime();
      var timers = [
        { id: 'countdown1', end: countdownDates[3] }, // کنکور
        { id: 'countdown2', end: countdownDates[0] }, // عید
        { id: 'countdown4', end: countdownDates[1] }, // امتحانات
        { id: 'countdown5', end: countdownDates[2] }, // تابستان بعدی
        { id: 'nextSchoolDay', end: nextSchoolDay }    // Next school day
      ];

      timers.forEach(timer => {
        var distance = timer.end - now;
        var seconds = Math.floor(distance / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        var timerDisplay = `${days} روز ${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`;
        document.getElementById(timer.id).innerHTML = timerDisplay;

        var secDisplay = Math.floor((timer.end - now) / 1000);
        document.getElementById(timer.id + '_sec').innerHTML = `${secDisplay} ثانیه`;

        if (distance < 0) {
          clearInterval(x);
          document.getElementById(timer.id).innerHTML = "EXPIRED";
          document.getElementById(timer.id + '_sec').innerHTML = "EXPIRED";
        }
      });
    }, 1000);
  }

  startTimers();

  // Add visualizer background
  var flyBoxColors = [];
  var flyBoxes = [];
  var flyBoxCount = 0;
  var flyBoxPause = 200;
  var frame = 0;
  var origin;

  function setup() {
    flyBoxCount = 100*random(random(0,3), random(3,100));
    createCanvas(windowWidth, windowHeight);
    origin = createVector(windowWidth / 2, windowHeight / 2);
    
    for (let i = -flyBoxCount / 2; i < flyBoxCount / 2; i++) {
      let box = createFlyBox(i);
      box.start();
      flyBoxes.push(box);
    }

    flyBoxColors.push(color('#427394'));
    flyBoxColors.push(color('#99e89b'));
    flyBoxColors.push(color('#dc7933'));
    flyBoxColors.push(color('#fee600'));
    flyBoxColors.push(color('#ee353e'));
  }

  function draw() {
    background(0, 0, 0, 10);
    rectMode(CENTER);
    for (let i = 0; i < flyBoxCount; i++) {
      let flyBox = flyBoxes[i];
      flyBox.draw();
    }

    stroke(255, 255, 255, 100);
    strokeWeight(4000);
    noFill();
    translate(origin.x, origin.y);
    rotate((sin(frame * (100*random(1, 2))) + cos(frame * (100*random(1, 2)))) * PI);
    frame += 1;
  }

  function createFlyBox(offset) {
    return {
      offset: offset,
      delay: 0,
      getRandomDelay: () => { return random(0, flyBoxCount) * random(4, 6); },
      steps: 0,
      directions: [createVector(-51, -1), createVector(-10, 1), createVector(1, -10), createVector(1, 1)],
      currentDirection: 0,
      iteration: 0,
      size: 10*random(1, 5),
      start: function() {
        this.delay = this.getRandomDelay();
        this.steps = -this.delay;
      },
      draw: function() {
        this.steps += (15, 25);
        if (this.steps < 0) {
          return;
        }
        
        fill(flyBoxColors[this.iteration]);
        noStroke();
        var dir = this.directions[this.currentDirection];
        rect(
          -dir.x * this.steps + origin.x + dir.x * origin.x - dir.x * this.offset * (this.size * random(0, 1)),
          -dir.y * this.steps + origin.y + dir.y * origin.y + dir.y * this.offset * (this.size * random(0, 1)),
          this.size, this.size
        );
        
        if (this.steps > max(windowWidth, windowHeight)) {
          var newDelay = this.getRandomDelay();
          this.steps = -flyBoxPause + this.delay - newDelay;
          this.delay = newDelay;
          this.currentDirection = (this.currentDirection + 1) % 4;
          this.iteration = (this.iteration + 1) % flyBoxColors.length;
        }
      }
    };
  }