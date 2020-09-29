// Showing the date at the top of the page

setInterval(function () {
    var today = moment();
    $("#currentDay").text(today.format("dddd, MMMM YYYY - h:mm:ss a"));
}, 1000)

//find out current time

let timeNow = moment();

var workHours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var todaysDateEl = $("#currentDay");


// function to clone timeblocks from single timeblock in html

function setStatus() {

    // for loop to create the row
    for (let i = 1; i < workHours.length; i++) {
        let newTimeBlock = $("#9am").clone();
        newTimeBlock.attr("id", workHours[i]);
        newTimeBlock.children(".hour").text(workHours[i]);
        newTimeBlock.appendTo(".container");
    }
}

// funtion to classify rows for past, present or future accordingly
function classifyTime() {

    let timeOfDay = moment().format("ha");
    let allTimeBlockEl = $(".time-block");

    // looping through all time block elements to find each timeblock id and assign the hour
    for (let i = 0; i < allTimeBlockEl.length; i++) {

        let timeBlock = $(allTimeBlockEl[i]);
        let timeBlockId = timeBlock.attr("id");
        let timeBlockTextarea = timeBlock.children(".schedule");

        // Setting class to present if timeblock is same as current hour
        if (timeBlockId === timeOfDay) {
            timeBlockTextarea.addClass("present");

            // setting class to past if before current hour
        } else if (moment(timeBlockId, "ha").isBefore()) {
            timeBlockTextarea.addClass("past");

            // setting class to future if after current hour
        } else if (moment(timeBlockId, "ha").isAfter()) {
            timeBlockTextarea.addClass("future");
        }
    }
}

setStatus()
classifyTime()

function setPlanner() {

    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

    $(".time-block").each(function () {
        var id = $(this).attr("id");
        var schedule = localStorage.getItem(id);

        if (schedule !== null) {
            $(this).children(".schedule").val(schedule);
        }
    });
}

setPlanner();

var saveBtn = $(".saveBtn");

saveBtn.on("click", function () {
    var time = $(this).parent().attr("id");
    var schedule = $(this).siblings(".schedule").val();

    localStorage.setItem(time, schedule);
});

