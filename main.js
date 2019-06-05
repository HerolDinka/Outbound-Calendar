let calendarElement = document.getElementById("calendar");
moment.locale("en-gb");
let today = moment().utc();

let currentWeekStart = today.clone().startOf("week");
let currentWeekEnd = today.clone().endOf("week");
let currentMonthStart = today.clone().startOf("month");
let currentMonthEnd = today.clone().endOf("month");

let timezone = moment.tz.guess(true);
console.log(timezone);
let currentTime = today.hour();
console.log(currentTime);
let timezoneElement = document.getElementById("tzchanger");
let defaultMonth = moment().format("MMMM");
let defaultYear = moment().format("YYYY");
let monthYearElement = document.getElementById("monthYear");
monthYearElement.innerHTML = defaultMonth + "<br>" + defaultYear;
let modalElement = document.getElementById("addNewClient");
let settingElement = document.getElementById("settingsModal");
let modalCloseElement = document.getElementsByClassName("close")[0];

let holidayRegions = ['Germany', 'United States'];
for (let region of holidayRegions) {
    moment.modifyHolidays.add(region)
}

let settings = {
    callMorningStart: "",
    callMorningEnd: "",
    callAfternoonStart: "",
    callAfternoonEnd: "",
    AdminStart: "",
    AdminEnd: "",
    taskMax: 500,
}

let toDos = [];
console.log(toDos);

function addTaskButtonClicked() {
    modalElement.style.display = "block";
}

function addTaskClosed() {
    modalElement.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modalElement) {
        modalElement.style.display = "none";
    }
}

let taskDate = document.getElementById("taskDate").value;
console.log(taskDate);
let period = document.getElementById("periodDay").value;
let email = document.getElementById("email").value;

function saveTasks() {
    localStorage.setItem("TODOS", JSON.stringify(toDos));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("TODOS")
    if (savedTasks) {
        toDos = savedTasks;
    }
}

function addNewTaskButtonClicked() {
    let newTask={
        date: taskDate,
        period: period,
        email: email
    }
    toDos.push(newTask);
    saveTasks();
}

function settingsButtonClicked() {
    settingElement.style.display = "block";
}

function settingsSubmitClicked() {
    let callMorningStart = document.getElementById("fromAM").value;
    settings.callMorningStart = callMorningStart;
    let callMorningEnd = document.getElementById("toAM").value;
    settings.callMorningEnd = callMorningEnd;
    let callAfternoonStart = document.getElementById("fromPM").value;
    settings.callAfternoonStart = callAfternoonStart;
    let callAfternoonEnd = document.getElementById("toPM").value;
    settings.callAfternoonEnd = callAfternoonEnd;
    let AdminStart = document.getElementById("fromAdmin").value;
    settings.AdminStart = AdminStart;
    let AdminEnd = document.getElementById("toAdmin").value;
    settings.AdminEnd = AdminEnd;
    let taskMax = document.getElementById("maxCalls").value;
    settings.taskMax = taskMax;
    settingClosed();
}

function saveSetting() {
    localStorage.setItem("SETTINGS", JSON.stringify(settings));
}

function loadSetting() {
    const savedSettings = localStorage.getItem("SETTINGS")
    if (savedSettings) {
        settings = savedSettings;
    }
}

function settingClosed() {
    settingElement.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == settingElement) {
        settingElement.style.display = "none";
    }
}

function isSameDay(day1, day2) {
    let day1UTC = day1.clone().utc();
    let day2UTC = day2.clone().utc();
    return day1UTC.year() === day2UTC.year() && day1UTC.dayOfYear() === day2UTC.dayOfYear();
}

function dayButtonClicked() {
    calendarElement.innerHTML = "";

    let dayViewElement = document.createElement("div");

    dayViewElement.textContent = today.format("MMM  D ddd");

    calendarElement.appendChild(dayViewElement);
    dayViewElement.classList.add("day");

    let holiday = day.isHoliday();
    if (holiday) {
        let holidayEventElement = document.createElement('div');
        holidayEventElement.textContent = 'Holiday: ' + holiday;
        dayDivElement.classList.add("holiday");
        dayDivElement.appendChild(holidayEventElement);
    }
}

function weekButtonClicked(firstDay) {
    calendarElement.innerHTML = "";
    let weekViewElement = document.createElement("div");
    calendarElement.appendChild(weekViewElement);
    weekViewElement.classList.add("calendarView");

    for (let i = 0; i < 5; i++) {
        let dayDivElement = document.createElement("div");

        let day = firstDay.clone();
        day.add(i, 'days');

        dayString = day.format("D ddd");
        let dayString2 = day.format("l");

        if (i === today.day()) {
            console.log(today);
            dayDivElement.innerHTML = "<b>" + dayString + "</b>";
        }
        // else if (){} ADD HOLIDAYS IN BOLD HERE

        dayDivElement.innerHTML = dayString;

        dayDivElement.classList.add("day");
        weekViewElement.appendChild(dayDivElement);

        let morningElement = document.createElement("div");


        let afternoonElement = document.createElement("div");
        let adminElement = document.createElement("div");

        console.log(dayString2);
        let daysToDo = toDos[dayString2];
        morningElement.textContent = settings.callMorningStart + "-" + settings.callMorningEnd;
        afternoonElement.textContent = settings.callAfternoonStart + "-" + settings.callAfternoonEnd;
        adminElement.textContent = settings.AdminStart + "-" + settings.AdminEnd;
        if (daysToDo) {
            morningElement.textContent += daysToDo;
            afternoonElement.textContent += daysToDo;
            adminElement.textContent += daysToDo;
        }
        morningElement.classList.add("hours");
        afternoonElement.classList.add("hours");
        adminElement.classList.add("hours");
        dayDivElement.appendChild(morningElement);
        dayDivElement.appendChild(afternoonElement);
        dayDivElement.appendChild(adminElement);

        let taskBox = document.createElement("div");

        toDos.forEach(function (item, index) {
            console.log(dayString2, item.date)
            if (dayString2 === item.date) {
                taskBox.textContent = `${taskBox.textContent} ${item.date} ${item.email}`;
                if (item.period === 'morning') {
                    morningElement.appendChild(taskBox);
                }
                else if (item.period === 'afternoon') {
                    afternoonElement.appendChild(taskBox);
                }
                else {
                    adminElement.appendChild(taskBox);
                }
            }
        })
    }
}

function monthButtonClicked() {
    calendarElement.innerHTML = "";

    let monthViewElement = document.createElement("div");
    calendarElement.appendChild(monthViewElement);
    monthViewElement.classList.add("calendarView");

    for (let i = 0; i < today.daysInMonth(); i++) {
        let dayDivElement = document.createElement("div");

        let day = currentMonthStart.add(i, "days");

        dayString = day.format("D ddd");

        if (i === today.date() - 1) {
            dayDivElement.innerHTML = "<b>" + dayString + "</b>";
        } else {
            dayDivElement.innerHTML = dayString;
        }
        dayDivElement.classList.add("day");
        monthViewElement.appendChild(dayDivElement);
    }
}
//how to do this for month/day?
function previousButtonClicked() {
    currentWeekStart.subtract(1, "week");
    currentWeekEnd.subtract(1, "week");
    weekButtonClicked(currentWeekStart, currentWeekEnd);
}

function nextButtonClicked() {
    currentWeekStart.add(1, "week");
    currentWeekEnd.add(1, "week");
    weekButtonClicked(currentWeekStart, currentWeekEnd);
}

function changeTimeZoneClicked() {
    let tz = timezoneElement.value;
    timezone = tz;
    weekButtonClicked(currentWeekStart);
}

loadSetting();
weekButtonClicked(currentWeekStart, currentWeekEnd);
loadTasks();
