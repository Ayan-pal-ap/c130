song="";
leftWristx=0;
rightWristx=0;
leftWristy=0;
rightWristy=0;
 sl=0;
 sr=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotanswer);
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.rate(1);
  song.setVolume(divide);
}
function draw(){
    image(video,0,0,600,500);
    fill("#fc0000");
    stroke("#fc0000");
    circle(rightWristx,rightWristy,20);
    if(rightWristx>0 && rightWristy<=100){
     document.getElementById("speeds").innerHTML="0.5";
     song.rate(0.5);
    }
   else if(rightWristx>100 && rightWristy<=200){
        document.getElementById("speeds").innerHTML="1";
        song.rate(1);
       }
       else if(rightWristx>200 && rightWristy<=300){
        document.getElementById("speeds").innerHTML="1.5";
        song.rate(1.5);
       }
       else if(rightWristx>300 && rightWristy<=400){
        document.getElementById("speeds").innerHTML="2";
        song.rate(2);
       }

    if(sl>0.2){
    circle(leftWristx,leftWristy,20);
    anyname=Number(leftWristy);
    remove_all=floor(anyname);
    divide=remove_all/500;
    console.log('r'+remove_all);
    document.getElementById("volume").innerHTML=divide;
    song.setVolume(divide);
    }
}
function modelLoaded(){
    console.log("All is wel till now");
}
function gotanswer(result){
    if(result.length>0){
        console.log(result);
        sl=result[0].pose.keypoints[9].score;
        sr=result[0].pose.keypoints[10].score;
     leftWristx=result[0].pose.leftWrist.x;
     leftWristy=result[0].pose.leftWrist.y;
     rightWristx=result[0].pose.rightWrist.x;
     rightWristy=result[0].pose.rightWrist.y;
      console.log("lefty    "+leftWristy+" leftX" +leftWristx);
      console.log("righty    "+rightWristy+" rightX" +rightWristx);
    }
}
