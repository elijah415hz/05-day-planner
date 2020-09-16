// Display current date in header
var currentDate = moment().format('dddd, MMMM Do');

// TODO: Not in the assignment, but multi-day would be great. 
// Maybe add 24 hours to wherever I storing the value of the hours, 
// and then the past, present, future styling should work without new code

var timeBlocks = $(".time-block");
var currentHour =  parseInt(moment().format('H'));
for (let i=0; i<8; i++) {
    let block = $(`.${i}`);
    let blockHour = parseInt(block.attr("data-hour"));
      if (blockHour < currentHour) {
        block.addClass("past");
    } else if (blockHour === currentHour) {
        block.addClass("present");
    } else if (blockHour > currentHour) {
        block.addClass("future");
    }
}