// TIMER STUFF 10 minutes from now
var time_in_minutes_10 = 10;
var current_time = Date.parse(new Date());
var deadline_10min = new Date(current_time + time_in_minutes_10*60*1000); //calculate 10 minutes from now

// Most of this timer javascript was taken from https://jsitor.com/JDB2I5aHb

function time_remaining(endtime){
var t = Date.parse(endtime) - Date.parse(new Date());
var seconds = Math.floor( (t/1000) % 60 );
var minutes = Math.floor( (t/1000/60) % 60 );
var hours = Math.floor( (t/(1000*60*60)) % 24 );
var days = Math.floor( t/(1000*60*60*24) );
return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
var clock = document.getElementById(id);
function update_clock(){
    var t = time_remaining(endtime);
    hours = ('0' + t.hours).slice(-2); 
    minutes = ('0' + t.minutes).slice(-2);
    seconds = ('0' + t.seconds).slice(-2);
    clock.innerHTML = hours +':'+minutes+':'+seconds;
    if(t.total<=0){ 
        window.location.href = "secondpage.html"; //If the timer has run out, load the next page https://www.w3schools.com/jsref/prop_loc_href.asp
        clearInterval(timeinterval); 
    }
}
update_clock(); // run function once at first to avoid delay
var timeinterval = setInterval(update_clock,1000);
}
run_clock('clockdiv_10min',deadline_10min);
// -----------------

// ACTIVATE LONG FADE - On click or drag, this should remove the short timer and trigger long timer. 

function activateLongFade(){

    // switch timer from 10 minute to 1 hour timer on the top right
    // 1. Remove the first timer and add second timer
    document.getElementById('clockdiv_10min').style.display='none'; //https://www.w3schools.com/jsref/prop_style_display.asp
    document.getElementById('clockdiv_hour').style.display='block'; //https://www.w3schools.com/jsref/prop_style_display.asp
    // 2. New timer is 60 minutes from the click
    var time_in_minutes_1hr = 60;
    // This is the current time below
    var new_current_time = Date.parse(new Date());
    // Current time + 60 minutes into the future
    var deadline_1hr = new Date(new_current_time + time_in_minutes_1hr*60*1000);
    run_clock('clockdiv_hour',deadline_1hr); //start new timer
    
    // list of imgs to change fade on mousedown, one to remove and one to add. 
    // Inspired by https://gomakethings.com/how-to-add-and-remove-a-css-class-from-multiple-elements-with-vanilla-javascript/
    let imgs_to_change_fade = document.querySelectorAll('img');
    let imgs_to_remove_fade = document.querySelectorAll('img');

    //remove 10-min fade and changing the style from css doc
    for (let elem of imgs_to_remove_fade) {
        elem.classList.remove('initial_10_minutes');
    }
    //add 1hr fade and adds a new style from css doc
    for (let elem of imgs_to_change_fade) {
        elem.classList.add('long_fade');
    }

}

// On the first mousedown event, activate the switch from 10 to 60 minutes
$(document).ready(function(){ //A page can't be manipulated safely until the document is "ready." https://learn.jquery.com/using-jquery-core/document-ready/
    $("body").one("mousedown", function(){ //jQuery "one" specifies only happens once, thus only on the first 'mousedown' https://www.w3schools.com/jquery/event_one.asp
        activateLongFade();
    });
  });