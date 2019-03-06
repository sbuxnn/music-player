const musicArray =[{
  'author': 'Alphaville',
  'name': 'Forever young',
  'music': 'Forever.mp3',
  'cover': 'forever.jpg',
  'color': 'rgb(75,130,210)',

}];
const PLAYER = document.querySelector(".player");
const FORWARD = document.querySelector(".forward");
const BACKWARD = document.querySelector(".backward");
const PANEL = document.querySelector(".panel");
let audio = document.querySelector(".audio");
let progressBar = document.querySelector(".progress-bar")
let startTime = document.getElementById("start-time");
let endTime = document.getElementById("end-time");
let image = document.createElement("img");
let line = document.querySelector(".line");
let musicLine = document.querySelector(".musicLine");
let newLine = document.getElementById("new");
let songName = document.querySelector(".songName");
let author = document.querySelector(".author");
let source = document.createElement("source");

var currentTime =0;
var lineLength = 240;
var duration;

source.setAttribute("src", "Forever.mp3");
source.setAttribute("type", "audio/mpeg");
audio.appendChild(source);
image.setAttribute("src", musicArray[0].cover);
PLAYER.onmouseover = function(){
  this.style.color = musicArray[0].color;
}
PLAYER.onmouseout = function(){
  this.style.color = "#fff";
}
FORWARD.onmouseover = function(){
  this.style.color = musicArray[0].color;
}
FORWARD.onmouseout = function(){
  this.style.color = "#fff";
}
BACKWARD.onmouseover = function(){
  this.style.color = musicArray[0].color;
}
BACKWARD.onmouseout = function(){
  this.style.color = "#fff";
}

image.setAttribute("class", "image");
PANEL.appendChild(image);
songName.innerHTML = musicArray[0].name;
author.innerHTML = musicArray[0].author;

PLAYER.addEventListener("click",function(){
  line.classList.toggle("musicLine");
  audio.style.display ="block";
  //Может работать только если onmouseover нет
  //this.style.color = musicArray[0].color;
});



function initProgressBar(){}{

  audio.addEventListener('loadedmetadata', function(){
    duration = audio.duration;
    var minutes = calculateMinutes(duration);
    var seconds = calculateSeconds(duration);
    endTime.innerHTML = minutes +":" + seconds;

});



}

PLAYER.addEventListener("click", function(){
    newLine.style.backgroundColor = musicArray[0].color;

    if(!audio.paused && !audio.ended){
    audio.pause();
    PLAYER.classList.add("fa-play");
    PLAYER.classList.remove("fa-pause");
    window.clearInterval(update);


    endTime.style.display = "none";
    startTime.style.display = "none";
    progressBar.style.display ="none";
    newLine.style.display ="none";
    }
    else{
    //if the play button was pushed the music would play and every half a second the
    // function update will be called
    audio.play();
    PLAYER.classList.remove("fa-play");
    PLAYER.classList.add("fa-pause");
    updateTime = setInterval(update, 500);


    endTime.style.display = "inline-block";
    startTime.style.display = "inline-block";
    progressBar.style.display ="block";
    newLine.style.display ="block";
}
});

//считаем минуты
  function calculateMinutes(duration){
     return parseInt(duration/60);
  }
//считаем секунды
  function calculateSeconds(duration){
    return parseInt(duration%60);
  }


function update(){
  currentTime = audio.currentTime;

  var size = parseInt(currentTime*lineLength/duration);

  if(!audio.ended){
    var minutes = calculateMinutes(currentTime);
    var seconds = calculateSeconds(currentTime);
    if(seconds<10){
      seconds = "0" +seconds;
    }
    startTime.innerHTML = minutes + ":" + seconds;
    // add an animated progress-bar
    newLine.style.width = size + "px";
  }else{
    currentTime = "0:00";
    startTime.innerHTML = currentTime;
    PLAYER.classList.add("fa-play");
    PLAYER.classList.remove("fa-pause");

// if the track is ended progressBar width is 0px
    newLine.style.width = "0px";

  }
}

progressBar.addEventListener("click", changeTimeByClick);

function changeTimeByClick(e){
  if(!audio.ended)
  var allOffsetWidth = PANEL.offsetLeft + progressBar.offsetLeft + line.offsetLeft;
  console.log(allOffsetWidth);

  var newTime = (e.pageX-allOffsetWidth)*duration/lineLength;
  console.log(newTime);
  audio.currentTime = newTime;
}


newLine.addEventListener("click", changeTimeByClick);
