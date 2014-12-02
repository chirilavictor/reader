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
  console.log('hi')
  var fullText = $('.content').text();
  displayFirst(fullText);
};

var displayFirst = function(fullText){
  // var len = fullText.length;
  var counter = 0;
  var timer = setTimeout(function() { printLine(fullText, counter) }, 1250);
};

var printLine = function(text, counter) {
  // console.log('hi')
  line = text.slice(counter, counter + 40);
  $('.story-text').html(line);
  counter += 40;
  // console.log(counter)
  // console.log(text.length)
  // console.log(counter < text.length);
  if (counter < text.length) {   
    timer = setTimeout(function() { 
      printLine(text, counter); 
    }, 1250);
  }
};

$(document).ready(function(){

  console.log('hi')

  $('#start-story').click(function(e){
    console.log('hi')
    e.preventDefault();
    getContent();
  });

  // if ($('.content').length > 0) {
  //   var fullText = $('.content').text();
  //   displayFirst(fullText);
  // }

});
