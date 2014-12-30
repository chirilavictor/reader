function Story(delay) {
  this.bookmark = 0;
  this.stop = false;
  this.delay = 2000;
  this.content = this.getContent();
  this.length = this.content.length;
}

Story.prototype = {
  constructor: Story,

  getContent: function() {
    // change to AJAX request to get content array from rails
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
    return storyArray
  }

}


function displayLine(counter) {
    $('.story-text').html(story.content[counter]);
    if (counter < story.length - 1) {
      counter += 1;
    }
    if (counter < story.length && story.stop === false) {   
      setTimeout(function() { 
        displayLine(counter); 
      }, story.delay);
    }
    else {
      story.bookmark = counter;
    }

};

function nextLine() {
  displayLine(story.bookmark)
}

function lastLine() {
  if (story.bookmark > 1) {
    story.bookmark -= 2
    displayLine(story.bookmark);
  }
}

function startStory() {
    story.stop = false;
    if (story.delay == 0) {
      manualRead();
    }
    else {
      autoRead()
    }
}

function manualRead() {
  story.stop = true
  $('.navigation').show();
  displayLine(story.bookmark);
}

function autoRead() {
  $('.navigation').hide(); // ideally this should run only if they are shown -- which would be every time except first...
  $('#stop-story').show();
  $('#start-story').hide();
  displayLine(story.bookmark);
}

function stopStory() {
  story.stop = true;
  $('#start-story').show();
  $('#start-story').html('Resume');
  $('.navigation').show(); 
  $('#stop-story').hide();
}

function setListeners() {
    $('#start-story').on("click", startStory);
    $('#stop-story').on("click", stopStory);
    $('#next-line').on("click", nextLine);
    $('#last-line').on("click", lastLine);
    $('#btn-manual').on("click", manualRead);
    $('.speed-setting').on("click", function(){
      story.delay = parseInt(($(this).attr('value')));
      setBlurb();
    });
  };

function setBlurb() {
  var blurb;

  switch (story.delay) {
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
    case 3000:
      blurb = "Dogs are awesome!"
      break;
    case 2000:
      blurb = "Horses are awesome!"
      break;
    case 1000:
      blurb = "Cheetahs are awesome!"
      break;
    case 500:
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

$(document).ready(function(){
  story = new Story();
  setListeners();
  setBlurb();
});
