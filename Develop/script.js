// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$( ".row" ).wrapAll("<div class='time-id' />");


// TODO: Add code to display the current date in the header of the page.
var currentDate = dayjs().format ("dddd-MM-DD-YYYY");
$("#currentDay").html(currentDate);

var saveButtonEl = $('#saveBtn');

$(document).ready(function () {

//Added a listener for click events on the save button. This code uses the id in the containing time-block 
//as a key to save the user input in local storage.   

    $(".saveBtn").on("click", function () {
        var textArea = $(this).siblings(".description").val();
        var timeBlock = $(this).parent().attr("id");

        localStorage.setItem(timeBlock, textArea);
        console.log(timeBlock + textArea);
        })

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?

    function timeSections () {
        var currentTime = dayjs().format("H");

        $(".time-block").each(function () {
            var workHour = parseInt(this.id);

            if (workHour == currentTime) {
                $(this).removeClass('past future').addClass('present');
            } else if (workHour < currentTime) {
            $(this).removeClass('future present').addClass('past');
            } else {
            $(this).removeClass('past present').addClass('future');
            }
        })
    }

    timeSections();
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    $('.time-block').each(function() {
        const key = $(this).attr('id');
        const value = localStorage.getItem(key);
        $(this).children('.description').val(value);
      });

  });
timeSections();
  