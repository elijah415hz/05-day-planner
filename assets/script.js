// Grab the current moment
var timeStamp = moment();
// Use this variable for setting blockHours and for displaying current day
// This extra variable is needed because of the mutability of moment.js objects
var timeStampMutable = moment();
// Display current date in header
function loadDate() {
    var displayDate = timeStampMutable.format('dddd, MMMM Do');
    $("#currentDay").text(displayDate);
}
loadDate();

// Dynamically generate elements ====================================================
var container = $("<div class='container'>")
$("body").append(container);
// generate time blocks for each working day hour
for (var i=0; i<9; i++) {
    var timeBlock = $("<div class='row time-block'>")
    container.append(timeBlock);
    if (i<4) {
        hour = (i+9)+"AM";
    } else {
        hour = (i-3)+"PM";
    }
    // hour label
    timeBlock.append($("<div class='col-2 col-sm-1 hour'>").text(hour))
    // event description
    var eventDescriptionBlock = $("<div class='col-8 col-sm-10 description'>");
    timeBlock.append(eventDescriptionBlock);
    eventDescriptionBlock.append($("<textarea>"));
    // save button
    var saveButton = $("<button class='col-2 col-sm-1 saveBtn'>");
    timeBlock.append(saveButton);
    saveButton.append($("<i class='fa fa-save'>"));
}
// navigation buttons
var buttonRow = $("<div class='row'>");
container.append(buttonRow);
var prevBtn = $("<button class='col-3 col-2-sm btn btn-warning' data-day='previous'>");
prevBtn.append($("<i class='fa fa-arrow-left'>").html("<br>Previous"));
buttonRow.append(prevBtn);
buttonRow.append($("<div class='col-6 col-8-sm'>"));
var nextBtn = $("<button class='col-3 col-2-sm btn btn-warning' data-day='next'>");
nextBtn.append($("<i class='fa fa-arrow-right'>").html("<br>Next"));
buttonRow.append(nextBtn);
//=============================================================================

// Set styling for event blocks based on current timestamp
function loadStyling() {
    // Iterate over all event description divs
    $(".description").each(function(index) {
        var blockHour = timeStampMutable.startOf('day').add((index+9), 'hours');
        $(this).attr("data-hour", blockHour.format());
        // Fill value of Event
        // For some reason, the actual element is at index 0 of "$(this)".
        // .firstChild is the <textarea>
        $(this)[0].firstChild.value = localStorage.getItem(blockHour.format())
        // Remove current classes
        $(this).removeClass("past present future");
        // Add appropriate class to apply styling
        if (blockHour.isBefore(timeStamp, 'hour')) {
            $(this).addClass("past");
        } else if (blockHour.isSame(timeStamp, 'hour')) {
            $(this).addClass("present");
        } else if (blockHour.isAfter(timeStamp, 'hour')) {
            $(this).addClass("future");
        }
    })
}
loadStyling();


// Click event for save buttons
$(".saveBtn").on("click", function() {
    // Save value of corresponding description to local storage
    // Make an object store it as JSON
    var event = $(this).prev();
    var eventText = event[0].firstChild.value;
    var eventIndex = event.attr("data-hour");
    // Or don't use JSON...
    localStorage.setItem(eventIndex, eventText)
    console.log(localStorage.getItem(eventIndex));
})

// Click event for previous and next buttons
$(".btn").on("click", function() {
    if ($(this).attr("data-day") === 'next') {
        timeStampMutable.add(1, 'days');
    } else {
        timeStampMutable.subtract(1, 'days');
    }
    loadDate();
    loadStyling();
})

// Reload styling every 5 minutes
var resetStyling = setInterval(function() {
    timeStamp = moment();
    loadStyling();
}, 300000);