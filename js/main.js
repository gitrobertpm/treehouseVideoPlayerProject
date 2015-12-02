/*====================================================================================================
JAVASCRIPT FOR TREEHOUSE VIDEO PLAYER PROJECT
THE FOLLOWING LINKS WERE A GREAT HELP IN FIGURING OUT HOW TO COMPLETE THIS PROJECT
http://www.inwebson.com/html5/custom-html5-video-controls-with-jquery/
https://www.developphp.com/video/JavaScript/Video-Full-Screen-Toggle-Custom-Player-Controls-Tutorial
======================================================================================================*/

"use strict";

var width = window.innerWidth;

var vid = document.getElementById("video");

/*=======================
 VIDEO CONTROLS
 ======================*/
 
// PLAY/PAUSE
var playPause = document.getElementById("playPause");
var playPauseSpan = document.getElementById("playPauseSpan");

playPause.onclick = function() {
	if (vid.paused) {
		vid.play();
		vid.playbackRate = 1;
		playPauseSpan.removeAttribute("class", "glyphicon glyphicon-pause");
		playPauseSpan.setAttribute("class", "glyphicon glyphicon-play");
	} else {
		if (vid.playbackRate != 1) {
			vid.playbackRate = 1;
		} else {
			vid.pause();
			playPauseSpan.removeAttribute("class", "glyphicon glyphicon-play");
			playPauseSpan.setAttribute("class", "glyphicon glyphicon-pause");
		}
	}
};

//PLAYBACK RATE
var ff = document.getElementById("ff");
var rw = document.getElementById("rw");
var sl = document.getElementById("sl");

ff.onclick = function() {
	vid.play();
	vid.playbackRate = 3;
};

rw.onclick = function() {
	vid.currentTime -= 10;
};

sl.onclick = function() {
	vid.play();
	vid.playbackRate = .5;
};

// VOLUME
var mute = document.getElementById("mute");
var downVol = document.getElementById("downVol");
var upVol = document.getElementById("upVol");

mute.onclick = function() {
    vid.muted = !vid.muted;
};

downVol.onclick = function() {
	vid.volume -= .1;
};

upVol.onclick = function() {
	vid.muted = false;
	vid.volume += .1;
};

// PROGRESS BAR AND TIME/DURATION
// UPDATING PROGRESS BAR AND TIME/DURATION FUNCTIONS ARE CALLED BELOW IN TRANSCRIPT SECTION
var cur = document.getElementById("currentTime");
var dur = document.getElementById("duration");
var timeBar = document.getElementById("timeBar");
var progressBar = document.getElementById("progressBar");
var bufferBar = document.getElementById("bufferBar");

var timeDrag = false;
$('#progressBar').mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if(timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if(timeDrag) {
        updatebar(e.pageX);
    }
});
 
//UPDATE PROGRESS BAR ON MANUAL CHANGE
var updatebar = function(x) {
    var progress = $('#progressBar');
    var maxduration = vid.duration;
    var position = x - progress.offset().left;
    var percentage = 100 * position / progress.width();
 
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }

    $('#timeBar').css('width', percentage+'%');
    vid.currentTime = maxduration * percentage / 100;
};

//BUFFERED DATA
var startBuffer = function() {
    var maxduration = vid.duration;
    var currentBuffer = vid.buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $('#bufferBar').css('width', percentage+'%');
 
    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);

// FULLSCREEN - GOT SOME HELP FOR THIS FROM THE FOLLOWING LINK: http://generatedcontent.org/post/70347573294/is-your-fullscreen-api-code-up-to-date-find-out
var fullscreen = document.getElementById("fullscreen");

fullscreen.addEventListener("click",toggleFullScreen,false);
function toggleFullScreen(){
	if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled) {
		if(vid.requestFullScreen){
			vid.requestFullScreen();
		} else if(vid.webkitRequestFullScreen){
			vid.webkitRequestFullScreen();
		} else if(vid.mozRequestFullScreen){
			vid.mozRequestFullScreen();
		} else if(vid.msRequestFullscreen){
			vid.msRequestFullscreen();
		}
	}
	else {
		alert("Your browser doesn’t support the fullscreen API");
	}
};

/*=======================
TRANSCRIPT
 ======================*/
var trans = document.getElementById("transcript");

var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var p3 = document.getElementById("p3");
var p4 = document.getElementById("p4");
var p5 = document.getElementById("p5");
var p6 = document.getElementById("p6");
var p7 = document.getElementById("p7");
var p8 = document.getElementById("p8");

// SHORTCUT FUNCTION FOR MAKING TRANSCRIPT SENTENCES CLICKABLE
function clickable(idee, val) {
	idee.onclick = function() {
		vid.currentTime = val;
	};
};

clickable(p1, 0.24);
clickable(p2, 7.54);
clickable(p3, 13.97);
clickable(p4, 17.95);
clickable(p5, 32.11);
clickable(p6, 42.36);
clickable(p7,53.77 );
clickable(p8, 57.79);

// SHORTCUT FUNCTION TO HIGHLIGHT APPROPRIATE TEXT 
function hiLite(t1, t2, idee) {
	if (vid.currentTime > t1 && vid.currentTime < t2) {
		idee.style.color = "orange";
	} else {
		idee.style.color = "black";
	}
};

vid.ontimeupdate  = function() {

	// FORMAT VIDEO CURRENT TIME AND DURATION
	var curmins = Math.floor(vid.currentTime / 60);
	var cursecs = Math.floor(vid.currentTime - curmins * 60);
	var durmins = Math.floor(vid.duration / 60);
	var dursecs = Math.floor(vid.duration - durmins * 60);
	if(cursecs < 10){ cursecs = "0" + cursecs; }
	if(dursecs < 10){ dursecs = "0" + dursecs; }
	if(curmins < 10){ curmins = "0" + curmins; }
	if(durmins < 10){ durmins = "0" + durmins; }
	cur.innerHTML = curmins + ":" + cursecs + "/ ";
	dur.innerHTML = durmins + ":" + dursecs;
	
	
	// UPDATE PROGRESS BAR
	var currentPos = vid.currentTime;
	var maxduration = vid.duration;
	var percentage = 100 * currentPos / maxduration;
	var ps = percentage.toString();
	$('#timeBar').css('width', percentage+'%');
	
	
	// HICHLIGHT TRANSCRIPTS ON CUE
	hiLite(0.23, 7.54, p1);
	hiLite(7.52, 13.97, p2);
	hiLite(13.95, 17.95, p3);
	hiLite(17.93, 30.93, p4);
	hiLite(32.09, 41.2, p5);
	hiLite(42.34, 53.77, p6);
	hiLite(53.75, 57.79, p7);
	hiLite(57.77, 6.15, p8);
};
