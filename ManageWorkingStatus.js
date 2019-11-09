// 함수 정의
function setProgressBar(i, width) {
  var progressbar;
  var progressbar_remain;
  var minute;
  var minute_remain;

  progressbar = document.getElementsByClassName('progress')[i].children[0];
  progressbar.setAttribute('aria-valuenow', width);
  progressbar.setAttribute('style', "width: " + width + "%");

  switch (i) {
    case 0:
      minute = parseInt(8 * 60 * width / 100);
      minute_remain = 8 * 60 - minute;
      break;
    case 1:
      minute = parseInt(52 * 60 * width / 100);
      minute_remain = 52 * 60 - minute;
      break;
  }

  progressbar.innerText = parseInt(minute / 60) + ":" + minute % 60;

  progressbar_remain = document.getElementsByClassName('progress')[i].children[1];
  progressbar_remain.setAttribute('aria-valuenow', 100 - width);
  progressbar_remain.setAttribute('style', "width: " + (100 - width) + "%");
  progressbar_remain.innerText = parseInt(minute_remain / 60) + ":" + minute_remain % 60;
}

function startTimer() {
  timerID = setInterval(function() {
    if (dayMinute < 480) {
      dayMinute += 1;
      setProgressBar(0, dayMinute * 100 / 480);
    }
    if (weekMinute < 3120) {
      weekMinute += 1;
      setProgressBar(1, weekMinute * 100 / 3120);
    }
  }, 60000);
}

function stopTimer() {
  if (timerID != null) {
    clearInterval(timerID);
  }
}

function printTasks(taskList) {
  sortList(taskList);

  var ul = document.getElementsByTagName("ul")[0];
  clearTbody(ul);
  for (var i = 0; i < taskList.length; i++) {
    var li = document.createElement("li");
    var span0 = document.createElement("span");
    var span1 = document.createElement("span");
    var button = document.createElement("i");
    li.className = "list-group-item";
    button.className = "fa fa-circle";
    button.onclick = function() {
      this.parentNode.parentNode.removeChild(this.parentNode);
      var tempList = new Array();
      for (var k = 0; k < taskList.length; k++) {
        if (k == $(this).index()) {

        } else {
          tempList.push(taskList[k]);
        }
      }
      taskList = tempList;
      console.log(tempList);
    };
    span0.innerText = taskList[i].title;
    span1.className = "stars";
    ul.appendChild(li);
    li.appendChild(button);
    li.appendChild(span0);
    li.appendChild(span1);
    for (var j = 1; j <= 5; j++) {
      if (taskList[i].importance >= j) {
        span1.innerText += "★";
      } else {
        span1.innerText += "☆";
      }
    }
  }
}

function clearTbody(tbody) {
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.lastChild);
  }
}

function sortList(taskList) {
  taskList.sort(function(a, b) {
    return b.importance - a.importance;
  });
}

function add(다시하기, taskList) {
  다시하기.onclick = function() {
    taskList.push(new Task(this.title, this.importance));
    sortList(taskList);
  }
}

// 변수 선언

var timerID = null;

var dayMinute = 0;
var weekMinute = 0;

x = {
  statusInternal: "휴식중",
  statusListener: function(val) {},
  set status(val) {
    this.statusInternal = val;
    this.statusListener(val);
  },
  get status() {
    return this.statusInternal;
  },
  registerListener: function(listener) {
    this.statusListener = listener;
  }
}

x.registerListener(function(val) {
  var icon = document.getElementsByTagName("i")[0];
  if (val == "근무중") {
    icon.className = "fa fa-play"
  } else if (val == "대기중") {
    icon.className = "fa fa-pause";
  } else {
    icon.className = "fa fa-stop";
  }

  if (val == "근무중" || val == "대기중") {
    startTimer();
  } else {
    stopTimer();
  }
});

var Task = function(title, importance) {
  this.title = title;
  this.importance = importance;
}
var taskList = [new Task("1", 1), new Task("2", 2), new Task("3", 3), new Task("4", 4), new Task("5", 5)];

var 다시하기;

// 함수 호출

setProgressBar(0, 0);
setProgressBar(1, 0);

x.status = "근무중";

printTasks(taskList);
