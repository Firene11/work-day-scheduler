//Wraps all code that interacts with the DOM in a call to jQuery so that the code isn't run until 
//the browser has finished rendering all the elements in the html.

$( ".row" ).wrapAll("<div class='time-id' />");


//Displays the current date in the header of the page.

var currentDate = dayjs().format ("dddd-MM-DD-YYYY");
$("#currentDay").html(currentDate);

var saveButtonEl = $('#saveBtn');


//Begins the function
$(document).ready(function () {


//Listener for click events on save button. Uses the id in the containing time-block to save user input
//in local storage.   

    $(".saveBtn").on("click", function () {
        var textArea = $(this).siblings(".description").val();
        var timeBlock = $(this).parent().attr("id");

        localStorage.setItem(timeBlock, textArea);
        console.log(timeBlock + textArea);
        })


    function timeSections () {
//Uses Day.js to get the current hour in 24-hour time
        var currentTime = dayjs().format("H");


//Applies the past, present, or future class to each time block by comparing the id to the current hour.

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

//Calls the function to work
    timeSections();


//Saves any user input that was saved in localStorage and sets the values of the corresponding text area 
//elements. 

    $('.time-block').each(function() {
        const key = $(this).attr('id');
        const value = localStorage.getItem(key);
        $(this).children('.description').val(value);
      });

  });