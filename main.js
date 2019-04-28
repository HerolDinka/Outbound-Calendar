let calendarElement = document.getElementById("calendar");
moment.locale("en-gb");
let today = moment();
let currentWeek = today.clone().subtract(today.day(), "days");
let timezone=moment.tz.guess(true);
console.log(timezone);
let currentTime=today.hour();
console.log(currentTime);
let nyHols=moment().holidays();
let berlinHols=moment.modifyHolidays.set('Germany');
let defaultMonth=moment().format("MMMM");
let defaultYear=moment().format("YYYY");
let monthYearElement=document.getElementById("monthYear");
monthYearElement.innerHTML=defaultMonth + "<br>" + defaultYear;
let modalElement=document.getElementById("addNewClient");
let settingElement=document.getElementById("settingsModal");
let modalCloseElement=document.getElementsByClassName("close")[0];


// WHAT IS WRONG HERE?
console.log(berlinHols);

weekButtonClicked(currentWeek);

function berlinButtonClicked(){
    moment.tz.setDefault();
}

function nyButtonClicked(){
    moment.tz.setDefault("America/New_York");
    // WHY CURRENT TIME DOES NOT CHANGE?
    console.log(currentTime);
}

//this pops up on the wrong place, why?
function addFup () {
    modalElement.style.display = "block";
}

function addFupClosed(){
    modalElement.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalElement) {
      modalElement.style.display = "none";
    }
  }

function settingsButtonClicked(){
    settingElement.style.display = "block";
}

function settingClosed(){
    settingElement.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == settingElement) {
      settingElement.style.display = "none";
    }
  }

function dayButtonClicked() {
    calendarElement.innerHTML = "";

    let dayViewElement = document.createElement("div");

    dayViewElement.textContent = today.format("MMM  D ddd");

    calendarElement.appendChild(dayViewElement);
    dayViewElement.classList.add("day");


    for (let i=0; i<3; i++){
        let hourElement=document.createElement("div");
        hourElement.classList.add("hours");
        dayViewElement.appendChild(hourElement);
        hourElement.onclick=addFup();
    }
}

function weekButtonClicked(firstDay) {
    calendarElement.innerHTML = "";
    console.log(firstDay);
// FIRST DAY IS UNDEFINED 
    let weekViewElement = document.createElement("div");
    calendarElement.appendChild(weekViewElement);
    weekViewElement.classList.add("calendarView");

    for (let i = 1; i < 6; i++) {
        let dayDivElement = document.createElement("div");

        let day = today.clone(); 
        day.add(i, 'days');

        dayString = day.format("D ddd");

        if (i === today.day()) {
            console.log(today);
            dayDivElement.innerHTML = "<b>" + dayString + "</b>";
        } 
        // else if (){} ADD HOLIDAYS IN BOLD HERE
        //  else {
        //     let day = today.clone().add(i - today.day(), "days");
        //     dayDivElement.textContent = day.format("MMM  D ddd");
        // }
        dayDivElement.innerHTML=dayString;

        dayDivElement.classList.add("day");
        weekViewElement.appendChild(dayDivElement);

        for (let i=0; i<3; i++){
            let hourElement=document.createElement("div");
            hourElement.classList.add("hours");
            hourElement.onclick=addFup();
            dayDivElement.appendChild(hourElement);
        }
    }
}

function monthButtonClicked() {
    calendarElement.innerHTML = "";

    let monthViewElement = document.createElement("div");
    calendarElement.appendChild(monthViewElement);
    monthViewElement.classList.add("calendarView");

    let firstDayOfMonth = today.clone().subtract(today.date() - 1, "days");
    console.log("first day of month", firstDayOfMonth);
    for (let i=0; i < today.daysInMonth(); i++) {
        let dayDivElement = document.createElement("div");

        let day = firstDayOfMonth.clone().add(i, "days");

        dayString = day.format("D ddd");

        if (i === today.date()-1) {
            dayDivElement.innerHTML = "<b>" + dayString + "</b>";
        } else {
        dayDivElement.innerHTML = dayString;
    }
        dayDivElement.classList.add("day");
        monthViewElement.appendChild(dayDivElement);

        for (let i=0; i<3; i++){
            let hourElement=document.createElement("div");
            hourElement.classList.add("hours");
            hourElement.onclick=addFup();
            dayDivElement.appendChild(hourElement);
        }
        //3 because it wil only show 2 power hours and admin task field form settings, considering the max calls set on power hours,
        //showing only how full it is (color change?)
    }
}
//how to do this for month/day?
function previousButtonClicked(){
    currentWeek.subtract(7, "days");
    weekButtonClicked(currentWeek);
}

function nextButtonClicked(){
    currentWeek.add(7, "days");
    weekButtonClicked(currentWeek);
}

function timeframes(){
    let powerHourAMElement=document.createElement("div");
    powerHourAMElement.classList.add("hours");
    powerHourAMElement.onclick=addFup();
    dayDivElement.appendChild(powerHourAMElement);

    let powerHourPMElement=document.createElement("div");
    powerHourPMElement.classList.add("hours");
    powerHourPMElement.onclick=addFup();
    dayDivElement.appendChild(powerHourPMElement);

    //for admin tasks
    //if (){} 
}