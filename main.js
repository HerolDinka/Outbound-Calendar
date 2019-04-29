let calendarElement = document.getElementById("calendar");
moment.locale("en-gb");
let today = moment();

let currentWeekStart=today.clone().startOf("week");
let currentWeekEnd=today.clone().endOf("week");
let currentMonthStart=today.clone().startOf("month");
let currentMonthEnd=today.clone().endOf("month");

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

function berlinButtonClicked(){
    moment.tz.setDefault();
}

function nyButtonClicked(){
    moment.tz.setDefault("America/New_York");
    // WHY CURRENT TIME DOES NOT CHANGE?
    console.log(currentTime);
}

//have to make div clickable for onclick function so that it does not simply popup on its own maybe?
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


    // for (let i=0; i<3; i++){
    //     let hourElement=document.createElement("div");
    //     hourElement.classList.add("hours");
    //     dayViewElement.appendChild(hourElement);
    //     // hourElement.onclick=addFup();
    // }
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

        if (i === today.day()) {
            console.log(today);
            dayDivElement.innerHTML = "<b>" + dayString + "</b>";
        } 
        // else if (){} ADD HOLIDAYS IN BOLD HERE
   
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

    for (let i=0; i < today.daysInMonth(); i++) {
        let dayDivElement = document.createElement("div");

        let day = currentMonthStart.add(i, "days");

        dayString = day.format("D ddd");

        if (i === today.date()-1) {
            dayDivElement.innerHTML = "<b>" + dayString + "</b>";
        } else {
        dayDivElement.innerHTML = dayString;
    }
        dayDivElement.classList.add("day");
        monthViewElement.appendChild(dayDivElement);

        // for (let i=0; i<3; i++){
        //     let hourElement=document.createElement("div");
        //     hourElement.classList.add("hours");
        //     // hourElement.onclick=addFup();
        //     dayDivElement.appendChild(hourElement);
        // }
        //3 because it wil only show 2 power hours and admin task field form settings, considering the max calls set on power hours,
        //showing only how full it is (color change?)
    }
}
//how to do this for month/day?
function previousButtonClicked(){
    currentWeekStart.subtract(1, "week");
    currentWeekEnd.subtract(1, "week");
    weekButtonClicked(currentWeekStart, currentWeekEnd);
}

function nextButtonClicked(){
    currentWeekStart.add(1, "week");
    currentWeekEnd.add(1, "week");
    weekButtonClicked(currentWeekStart, currentWeekEnd);
}

// does not create any new div bc dayDivELement is not defined (globally) + need to add that this is saved to localstorage
function timeframes(){
    let powerHourAMElement=document.createElement("div");
    powerHourAMElement.classList.add("hours");
    powerHourAMElement.onclick=addFup();
    dayDivElement.appendChild(powerHourAMElement);

    let powerHourPMElement=document.createElement("div");
    powerHourPMElement.classList.add("hours");
    powerHourPMElement.onclick=addFup();
    dayDivElement.appendChild(powerHourPMElement);

    if (fromAdmin&&toAdmin!==null){
        let AdminElement=document.createElement("div");
        AdminElement.classList.add("hours");
        AdminElement.onclick=addFup();
        dayDivElement.appendChild(AdminElement);
    } 
}

weekButtonClicked(currentWeekStart, currentWeekEnd);
