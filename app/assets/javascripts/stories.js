// STORY MODEL

var story;

function Story() {
  this.bookmark = 0;
  this.stop = false;
  this.delay = 2000;
}

Story.prototype = {
  
  constructor: Story,

  displayLine: function() {
    $('.story-text').html(this.content[this.bookmark]);
    if (this.bookmark < this.length) {
      this.bookmark += 1;
    }
    if (this.bookmark < this.length && this.stop === false) {
      currentStory = this;
      setTimeout(function() { currentStory.displayLine(); }, currentStory.delay);
    }
  }

};


function getContent() {
  $.ajax({
    url: '/get_story/' + $('.story-text').attr('id'),
    data: $('.story-text').attr('id'),
    type: 'post',
    success: function(responseData) {
      story.content = responseData;
      story.length = responseData.length;
    }
  });
}


// CONTROLLER

function setListeners() {
  $('#start-story').on("click", startStory);
  $('#stop-story').on("click", stopStory);
  $('#next-line').on("click", nextLine);
  $('#last-line').on("click", lastLine);
  $('.speed-setting').on("click", setSpeed);
  $('#return-home').on("click", returnHome);
}

function setSpeed() {
  story.delay = parseInt($(this).attr('value'), 10);
  if (story.delay === 0) { manualRead(); }
  setBlurb();
}

function setBlurb() {
  var animal = $('button[value="' + story.delay +'"]').html();
  var blurb = $('button[value="' + story.delay +'"]').attr('data-blurb');
  $('#speed-choice').html('Current speed: ' + animal);
}

function startStory() {
    $('#title').hide(500, 'linear');
    $('.story-text').css({'min-height': '120px', 'padding-top': '60px', 'background': '#FFFFFF'});
    story.stop = false;
    if (story.delay === 0) {
      manualRead();
    }
    else {
      autoRead();
    }
}

// VIEW

function manualRead() {
  story.stop = true;
  $('.navigation').show();
  story.displayLine();
}

function autoRead() {
  $('.navigation').hide();
  $('#stop-story').show();
  $('#start-story').hide();
  story.displayLine();
}

function nextLine() {
  story.displayLine();
}

function lastLine() {
  if (story.bookmark > 1) {
    story.bookmark -= 2;
    story.displayLine();
  }
}

function stopStory() {
  story.stop = true;
  $('#start-story').show();
  $('#start-story').html('Resume');
  $('.navigation').show();
  $('#stop-story').hide();
}

function returnHome() {
  story.stop = true;
}


// DOCUMENT READY

$(document).ready(function(){
  story = new Story();
  getContent();
  setListeners();
  setBlurb();
});