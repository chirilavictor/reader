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
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var getContent = function(){
  var fullText = $('.content').text();
  displayFirst(fullText);
};

var displayFirst = function(fullText){
  var counter = 0;
  var timer = setTimeout(function() { printLine(fullText, counter) }, 1000);
};

var printLine = function(text, counter) {
  line = text.slice(counter, counter + 40);
  $('.story-text').html(line);
  counter += 40;
  if (counter < text.length) {   
    timer = setTimeout(function() { 
      printLine(text, counter); 
    }, 1000);
  }
};

$(document).ready(function(){
  console.log('hi')

  $('#start-story').click(function(){
    getContent();
  });

  // if ($('.content').length > 0) {
  //   var fullText = $('.content').text();
  //   displayFirst(fullText);
  // }

});
