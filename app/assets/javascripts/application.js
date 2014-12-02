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
  line = fullText.slice(counter, counter + 50);
  $('.story-text').html(line);
  counter += 50;
  if (counter < len) {   
    timer = setTimeout(function() { 
      printLine(len, counter); 
    }, 200);
  }
};

var displayFirst = function(){
  var len = fullText.length;
  var counter = 0;
  var timer = setTimeout(function() { printLine(len, counter) }, 200);
};

//   // $('.story-text').append(fullText);
//   // for (i = 0; i < fullText.length; i += 30) {
  // var len = fullText.length
//   // console.log('hi')
//   var counter = 0
//   while (counter < len) {
//     // console.log('hello');
//     setTimeout(printLines(len, counter), 1000);
//     counter += 50;
//   }

  // printLines(len, counter);
      // {$('.story-text').html(fullText.slice(i, i + 30); }, 1000);}
// }

// var printLine = function(i){
//   // console.log(i);
//   line = fullText.slice(i, i + 50);
//   console.log(line);
// }

// var printLines = function(len, counter){
//   // console.log('aloha')
//   line = fullText.slice(counter, counter + 50);
//   $('.story-text').html(line);
// }

    // setTimeout(function() {
    //   printLine(i);
    // }, 2000);



$(document).ready(function(){
  getContent();
  displayFirst();
});
