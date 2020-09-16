// Display current date in header
var currentDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(currentDate);
// TODO: Not in the assignment, but multi-day would be great. 
// Maybe add 24 hours to wherever I storing the value of the hours, 
// and then the past, present, future styling should work without new code

var currentHour =  parseInt(moment().format('H'));
// for (let i=0; i<8; i++) {
    //     let block = $(`.${i}`);
//     let blockHour = parseInt(block.attr("data-hour"));
//       if (blockHour < currentHour) {
    //         block.addClass("past");
    //     } else if (blockHour === currentHour) {
        //         block.addClass("present");
        //     } else if (blockHour > currentHour) {
//         block.addClass("future");
//     }
// }

var descriptions = $(".description");
// Load in Events
for (let i=0; i<descriptions.length; i++) {
    description = descriptions[i];

}


// Set styling for event blocks based on current timestamp
for (let i=0; i<descriptions.length; i++) {
    description = descriptions[i];
    // console.log(description);
    let blockHour = parseInt($(description).attr("data-hour"));
    // Fill value of Event
    $(description)[0].firstChild.value = localStorage.getItem(blockHour)
    if (blockHour < currentHour) {
          $(description).addClass("past");
    } else if (blockHour === currentHour) {
        $(description).addClass("present");
    } else if (blockHour > currentHour) {
        $(description).addClass("future");
    }
}

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