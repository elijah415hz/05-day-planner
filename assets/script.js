// Grab the current moment
var timeStamp = moment();
// Use this variable to increment when changing days
var timeStampMutable = moment();
var timeStampMutableBlockHour = moment();
// Display current date in header
function loadDate() {
    var displayDate = timeStampMutableBlockHour.format('dddd, MMMM Do');
    $("#currentDay").text(displayDate);
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
        // if (firstLoad) {
            var blockHour = timeStampMutableBlockHour.startOf('day').add((i+9), 'hours');
            $(description).attr("data-hour", blockHour.format());
        // } else {
        //     var blockHour = moment($(description).attr("data-hour"));
        // }
        // console.log(blockHour)
        // Fill value of Event
        $(description)[0].firstChild.value = localStorage.getItem(blockHour.format())
        // Remove current classes
        $(description).removeClass("past present future");
        if (blockHour.isBefore(timeStampMutable, 'hour')) {
            $(description).addClass("past");
            console.log("past", timeStampMutable.format(), blockHour.format())
        } else if (blockHour.isSame(timeStampMutable, 'hour')) {
            $(description).addClass("present");
            console.log("present", timeStampMutable.format(), blockHour.format())
        } else if (blockHour.isAfter(timeStampMutable, 'hour')) {
            $(description).addClass("future");
            console.log("future", timeStampMutable.format(), blockHour.format())
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
        timeStampMutableBlockHour.add(1, 'days');
    } else {
        timeStampMutableBlockHour.subtract(1, 'days');
    }
    loadDate();
    loadStyling();
})