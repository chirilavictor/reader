function Story() {
  this.bookmark = 0;
  this.stop = false;
  this.delay = 2000;
  this.content = null;
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


function nextLine() {
  story.displayLine();
}

function lastLine() {
  if (story.bookmark > 1) {
    story.bookmark -= 2;
    story.displayLine();
  }
}

function startStory() {
    $('#title').hide(500, 'linear');
    $('.story-text').css({'padding': '80px 40px', 'background': '#FFFFFF'});
    $('div#container').css({'background': 'rgba(255,255,255,0.7)'});
    story.stop = false;
    if (story.delay === 0) {
      manualRead();
    }
    else {
      autoRead();
    }
}

function manualRead() {
  story.stop = true;
  $('.navigation').show();
  story.displayLine();
}

function autoRead() {
  $('.navigation').hide(); // ideally this should run only if they are shown -- which would be every time except first...
  $('#stop-story').show();
  $('#start-story').hide();
  console.log(story)
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
      story.delay = parseInt($(this).attr('value'), 10);
      if (story.delay === 0) { manualRead(); }
      setBlurb();
    });
  }

function setBlurb() {
  var animal = $('button[value="' + story.delay +'"]').html(); 
  var blurb = $('button[value="' + story.delay +'"]').attr('data-blurb');
  $('#speed-choice').html('Current speed: ' + animal)
  // $('#speed-blurb').html(blurb);
}

$(document).ready(function(){
  story = new Story();
  getContent();
  setListeners();
  setBlurb();
});