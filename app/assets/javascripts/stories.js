function Story() {
  this.bookmark = 0;
  this.stop = false;
  this.delay = 2000;
  this.content = this.getContent();
  this.length = this.content.length;
}

Story.prototype = {
  // is it good to have Story accessing jQuery objects
  // on the page?
  
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
  },

  displayLine: function() {
    $('.story-text').html(this.content[this.bookmark]);
    if (this.bookmark < this.length) {
      this.bookmark += 1;
    }
    if (this.bookmark < this.length && this.stop === false) {
      currentStory = this;
      setTimeout(function() { 
        currentStory.displayLine(); 
      }, currentStory.delay);
    }
  }
// ,
  // setSpeeds: function() {
  //   var current_story = this
  //   $.get('/speeds/get_speeds', function(data) {
  //     current_story.speeds = data;
  //   });
  // }
  // abandoned this approach as asynchronous issues were making it needlessly complicated
}


function nextLine() {
  story.displayLine()
}

function lastLine() {
  if (story.bookmark > 1) {
    story.bookmark -= 2
    story.displayLine();
  }
}

function startStory() {
    story.stop = false;
    if (story.delay === 0) {
      manualRead();
    }
    else {
      autoRead()
    }
}

function manualRead() {
  story.stop = true
  $('.navigation').show();
  story.displayLine();
}

function autoRead() {
  $('.navigation').hide(); // ideally this should run only if they are shown -- which would be every time except first...
  $('#stop-story').show();
  $('#start-story').hide();
  story.displayLine();
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
    $('.speed-setting').on("click", function(){
      story.delay = parseInt(($(this).attr('value')));
      if (story.delay === 0) { manualRead(); }
      setBlurb();
    });
  }

function setBlurb() {
  var blurb = $('button[value="' + story.delay +'"]').attr('data-blurb');
  $('#speed-blurb').html(blurb);
}

$(document).ready(function(){
  story = new Story();
  setListeners();
  setBlurb();
});