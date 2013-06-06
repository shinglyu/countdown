var runningTimer = null;
var gTime = {
   hour: 0,
   min:  0,
   sec:  0,
   toString: function(){
      return padZero(this.hour,"00") 
             + padZero(this.min, "00") 
             + padZero(this.sec, "00");
   },
   setByString: function(str){
      str = padZero(str, "000000");
      this.hour = parseInt(str.substring(0,2),10);
      this.min  = parseInt(str.substring(2,4),10);
      this.sec  = parseInt(str.substring(4,6),10);
   },
   toDirtyHhmmss: function(){
      return padZero(this.hour,"00") + ":" 
             + padZero(this.min, "00") + ":"
             + padZero(this.sec, "00");

   },
   toSec: function(){ return this.hour*3600 + this.min*60 + this.sec; },
   reset: function(){
      this.hour = 0;
      this.min  = 0;
      this.sec  = 0;
   },
   toHhmmss: function(){ return sec2hhssmm(this.toSec()); },
   needFix: function(){
      //if (this.hour > 24 || this.hour < 0) {return true;}
      if (this.min  > 60 || this.min  < 0) {return true;}
      if (this.sec  > 60 || this.sec  < 0) {return true;}
      return false;
   },
   /*
   fix: function(){
      //if (this.hour > 24) {this.hour = 24;}
      if (this.min  > 60) {this.min  = 59;}
      if (this.sec  > 60) {this.sec  = 59;}
   }
   */
}



var countdownToFunc = function(func, remainTimeSec, toSec){
    if (typeof toSec === "undefined") {toSec = 0;}
    runningTimer = setInterval( function(){
       if (remainTimeSec > toSec) {
           $('#countdown').text(sec2hhmmss(remainTimeSec));
           remainTimeSec = remainTimeSec - 1;
           //runningTimer = setTimeout(function() {countdownToFunc(func, remainTimeSec-1, toSec)}, 
                      //1000);
       }
       else { //time's up!
          $("#countdown").text(sec2hhmmss(remainTimeSec));
          //clearInterval(runningTimer);
          $("#resetBtn").click();
          func.apply() 
       } 
    },
    1000);

}

var countdown = function() {
    /*if (gTime.needFix()){
      //showError
       $("#errorMsg").text(sec2hhmmss(gTime.toSec()) + " is not a valid time, so we fixed it for you.")
       gTime.fix();
    }
    */
    clearInterval(runningTimer);
    $(".numBtn").attr("disabled", true);
    $("#startBtn").attr("disabled", true);
    countdownToFunc(playBell, gTime.toSec());
}
var reset= function() {
    clearInterval(runningTimer);
    $(".numBtn").attr("disabled", false);
    $("#startBtn").attr("disabled", false);
    $("#countdown").text(sec2hhmmss(gTime.toSec()));
}
var clearTime= function() {
    clearInterval(runningTimer);
    gTime.reset();
    $(".numBtn").attr("disabled", false);
    $("#startBtn").attr("disabled", false);
    $("#countdown").text(sec2hhmmss(gTime.toSec()));
}

var sec2hhmmss = function(sec) {
   var ss = sec % 60;

   var min= Math.floor(sec/60);
   var mm = min % 60;

   var hour = Math.floor(min/60);
   //var hh = hour % 24; //enable if day is used
   var hh = hour;

   //if (hour > 24) {
   //   alert("Day not implemented yet!");
   //}

   //var day = Math.floor(hour/24)

   return padZero(hh,"00") + ":" + padZero(mm, "00") + ":" + padZero(ss, "00");
   //return sprintf("%02d:%02d:%02d", hh, mm, ss);
}

var padZero = function(num, base){
   //e.g. padZero(5, 000) => 005
   var zeroLen = String(base).length - String(num).length;
   if (zeroLen > 0) {return new Array(zeroLen+1).join("0") + num;}
                     //zeroLen + 1 ""'s joined by 0's
   else{return String(num);}
}

var onNumClick = function() {
   gTimeStr = gTime.toString();
   gTimeStr = gTimeStr.substring(1,6) + this.id;
   gTime.setByString(gTimeStr);
   $("#countdown").text(gTime.toDirtyHhmmss());
}

var loadBell = function(){
    $("#player1 #mp3src").attr("src", "bell.mp3")
    $("#player1 #oggsrc").attr("src", "bell.ogg")
    $("#player1")[0].load()
}
var loadDing= function(){
    $("#player2 #mp3src").attr("src", "ding.mp3")
    $("#player2 #oggsrc").attr("src", "ding.ogg")
    $("#player2")[0].load()
}
var playBell= function() {
    $("#player1")[0].play()
    $(".numBtn").attr("disabled", false);
    $("#startBtn").attr("disabled", false);
}
var playDing= function() {
    $("#player2")[0].play()
    $(".numBtn").attr("disabled", false);
    $("#startBtn").attr("disabled", false);
}

$(document).ready(function() {
    //$("#next").text("Next: " + moveNames[exeId]);
    //countdownToFunc(exercise, readyTimeout)
    loadBell()
    $('.numBtn').click(onNumClick)
    $("#countdown").text(sec2hhmmss(gTime.toSec()));

    //loadDing()
});

//for (var i = 0; i < 10; i){
//   Mousetrap.bind(String(i), function() { $("#" + i).click() });
//}
Mousetrap.bind("0", function() { $("#0").click() });
Mousetrap.bind("1", function() { $("#1").click() });
Mousetrap.bind("2", function() { $("#2").click() });
Mousetrap.bind("3", function() { $("#3").click() });
Mousetrap.bind("4", function() { $("#4").click() });
Mousetrap.bind("5", function() { $("#5").click() });
Mousetrap.bind("6", function() { $("#6").click() });
Mousetrap.bind("7", function() { $("#7").click() });
Mousetrap.bind("8", function() { $("#8").click() });
Mousetrap.bind("9", function() { $("#9").click() });
Mousetrap.bind("enter", function() { $("#startBtn").click() });
Mousetrap.bind("del", function() { $("#clearBtn").click() });
