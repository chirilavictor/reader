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

var fullText = "";

var getContent = function(){
  fullText = $('.content').text();
};

var printLine = function(len, counter) {
  line = fullText.slice(counter, counter + 40);
  $('.story-text').html(line);
  counter += 40;
  if (counter < len) {   
    timer = setTimeout(function() { 
      printLine(len, counter); 
    }, 1500);
  }
};

var displayFirst = function(){
  var len = fullText.length;
  var counter = 0;
  var timer = setTimeout(function() { printLine(len, counter) }, 1500);
};

$(document).ready(function(){
  getContent();
  displayFirst();
});
