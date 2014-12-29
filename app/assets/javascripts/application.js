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
var story;
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

function getCounter() {
  if (typeof(bookmark) == 'undefined') {
    var counter = 0;
  }
    else {
    var counter = bookmark
  }
  return counter
  // var timer = setTimeout(function() { displayLine(story, counter) }, delay);
};

// var setDelay = function(delay) {
//   console.log(delay);
//   return 4000;
// }

function nextLine() {
  displayLine(bookmark)
}

function lastLine() {
  if (bookmark > 1) {
    bookmark -= 2
    displayLine(bookmark);
  }
}

function displayLine(counter) {
    line = story[counter];
    $('.story-text').html(line);
    if (counter < story.length - 1) {
      counter += 1;
    }
    if (counter < story.length && stop === false) {   
      setTimeout(function() { 
        displayLine(counter); 
      }, delay);
    }
    else {
      bookmark = counter;
    }

};

function setBlurb(delay) {
  var blurb;

  switch (delay) {
    case 20000:
      blurb = "Slugs are awesome!"
      break;
    case 18000:
      blurb = "Sloths are awesome!"
      break;
    case 15000:
      blurb = "Turtles are awesome!"
      break;
    case 12000:
      blurb = "Snakes are awesome!"
      break;
    case 9000:
      blurb = "Lizards are awesome!"
      break;
    case 7000:
      blurb = "Mice are awesome!"
      break;
    case 5000:
      blurb = "Rabbits are awesome!"
      break;
    case 4000:
      blurb = "Dogs are awesome!"
      break;
    case 3000:
      blurb = "Horses are awesome!"
      break;
    case 2000:
      blurb = "Cheetahs are awesome!"
      break;
    case 1000:
      blurb = "Peregrine falcons are awesome!"
      break;
    case 0:
      blurb = "Click arrows to read the story."
      break;
    default:
      blurb = "Something went wrong with setting the blurb."
  }

  $('#speed-blurb').html(blurb);

}

function setSpeed(rate) {
  if (typeof(rate) == 'undefined') {
    delay = 5000;
  }
  else {
    delay = rate;
  }
  setBlurb(parseInt(delay));
}

function stopStory() {
  stop = true;
  $('#start-story').show();
  $('#start-story').html('Resume');
  $('.navigation').show(); 
  $('#stop-story').hide();
}


function manualRead() {
  stop = true
  $('.navigation').show();
  // var counter = getCounter();

  displayLine(getCounter());
}

function autoRead() {
  $('.navigation').hide(); // ideally this should run only if they are shown -- which would be every time except first...
  $('#stop-story').show();
  $('#start-story').hide();
  displayLine(getCounter());
}

function startStory() {
    stop = false;
    if (delay == 0) {
      manualRead();
    }
    else {
      autoRead()
    }
}

function setListeners() {
    $('#start-story').on("click", startStory);
    $('#stop-story').on("click", stopStory);
    $('#next-line').on("click", nextLine);
    $('#last-line').on("click", lastLine);
    $('#btn-manual').on("click", manualRead);
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
  story = getContent();


  // if ($('.content').length > 0) {
  //   var fullText = $('.content').text();
  //   beginDisplay(fullText);
  // }

});
