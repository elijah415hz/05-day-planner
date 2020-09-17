// Grab the current moment
var timeStamp = moment();
// Display current date in header
function loadDate() {
    var displayDate = timeStamp.format('dddd, MMMM Do');
    $("#currentDay").text(displayDate);
    console.log(timeStamp)
}
loadDate();

var firstLoad = true;
// Grab all event description divs for later iterating
var descriptions = $(".description");

// Set styling for event blocks based on current timestamp
function loadStyling() {
    console.log("styling")
    for (let i=0; i<descriptions.length; i++) {
        description = descriptions[i];
        // Set data-hour attributes on initial page load only
        // TODO: Define a different timeStamp that I can change for each day while leaving timeStamp the same
        if (firstLoad) {
            var blockHour = moment().startOf('day').add((i+9), 'hours').format("MM-DD-YYYY, HH:hh");
            $(description).attr("data-hour", blockHour)
        } else {
            var blockHour = $(description).attr("data-hour");
        }
        console.log(blockHour)
        // Fill value of Event
        $(description)[0].firstChild.value = localStorage.getItem(blockHour)
        // Remove current classes
        $(description).removeClass("past present future");
        if (moment(blockHour) < moment()) {
            $(description).addClass("past");
            console.log("past", moment(), blockHour)
        } else if (moment(blockHour) === moment()) {
            $(description).addClass("present");
            console.log("present", moment(), blockHour)
        } else if (moment(blockHour) > moment()) {
            $(description).addClass("future");
            console.log("future", moment(), blockHour)
        }
    }
    firstLoad = false;
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

$(".btn").on("click", function() {
    if ($(this).attr("data-day") === 'next') {
        timeStamp.add(1, 'days');
    } else {
        timeStamp.subtract(1, 'days');
    }
    loadDate();
    loadStyling();
})