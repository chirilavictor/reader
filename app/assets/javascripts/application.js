// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var delay = 2000;
var stop = false;
var bookmark;

function getContent() {
  var fullText = $('.content').text();
  arrayText = fullText.split(" ")
  var storyArray = []
  while (arrayText.length > 0) {
    line = ""
    while (line.length < 40 && arrayText.length > 0) {
      line += arrayText.shift();
      line += " ";
    }
    storyArray.push(line);
  }
  // for (i = 0; i < arrayText.length; i++){
  //   line = ""
  //   while (line.length < 40) {
  //     line += arrayText[i];
  //     line += " ";
  //     i += 1
  //   }

  // }
  return storyArray
};

function beginDisplay(story) {
  if (typeof(bookmark) == 'undefined') {
    var counter = 0;
  }
    else {
    var counter = bookmark
    }
  var timer = setTimeout(function() { displayLine(story, counter) }, delay);
};

// var setDelay = function(delay) {
//   console.log(delay);
//   return 4000;
// }

function displayLine(text, counter) {
    line = text[counter];
    $('.story-text').html(line);
    counter += 1;
    if (counter < text.length && stop === false) {   
      timer = setTimeout(function() { 
        displayLine(text, counter); 
      }, delay);
    }
    else {
      bookmark = counter;
    }

};

function setSpeed(rate) {
  if (typeof(rate) == 'undefined') {
    delay = 1000;
  }
  else {
    delay = rate;
  }

  }

function stopStory() {
  stop = true;
}


function startStory() {
    stop = false;
    story = getContent();
    beginDisplay(story);
}

function setListeners() {
    $('#start-story').on("click", startStory);
    $('#stop-story').on("click", stopStory);
    $('.speed-setting').on("click", function(){
      setSpeed($(this).attr('value'));
    });
  };

// var displayLine = function(text, counter) {
//   line = text.slice(counter, counter + 40);
//   $('.story-text').html(line);
//   counter += 40;
//   if (counter < text.length) {   
//     timer = setTimeout(function() { 
//       displayLine(text, counter); 
//     }, delay);
//   }
// };

$(document).ready(function(){
  setSpeed();
  setListeners();

  // if ($('.content').length > 0) {
  //   var fullText = $('.content').text();
  //   beginDisplay(fullText);
  // }

});
