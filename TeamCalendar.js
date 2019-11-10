document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid', 'bootstrap'],
    defaultView: 'dayGridMonth',
    defaultDate: new Date(),
    themeSystem: 'bootstrap',
    locale: 'ko',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: '  '
    }
  });

  calendar.setOption('height', screen.height * 0.5);

  calendar.render();

  var jobList;

  $.ajax({
      url: "JobList.jsp",
      method: "POST",
      dataType: "json"
    })
    .done(function(json) {
      jobList = JSON.parse(json);
    });

  jobList = [{
    'team': 'Action',
    'title': 'evt4',
    'start': '2019-09-04',
    'end': '2019-09-06'
  }, {
    'team': 'Action',
    'title': 'evt4',
    'start': '2019-11-04',
    'end': '2019-11-06'
  }];

  var dropdown_menu = document.getElementsByClassName("dropdown-menu")[0];
  for (var i = 0; i < dropdown_menu.children.length; i++) {
    var menuitem = dropdown_menu.children[i].children[0];
    menuitem.onclick = function() {
      var dropdownMenu1 = document.getElementById('dropdownMenu1');
      dropdownMenu1.innerText = this.innerText;

      var events = calendar.getEvents();
      for (var k = 0; k < events.length; k++) {
        events[k].remove();
      }

      for (var j = 0; j < jobList.length; j++) {
        if (jobList[j].team == this.innerText) {
          calendar.addEventSource([{
            'title': jobList[j].title,
            'start': jobList[j].start,
            'end': jobList[j].end
          }]);
        }
      }
    };
  }

  var 업무목록 = document.getElementById("업무목록");
  업무목록.onclick = function() {
    window.location.href = "JobList";
  };
});
