song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
function preload ()
{
    //carregando um audio
    song = loadSound("music.mp3"); 
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
          //esconder
    video.hide();

    poseNet = ml5.poseNet(video, modeLoaded);
    poseNet.on('pose', gotPoses);
}
function modeLoaded(){
    console.log('PoseNet Is Initialized');
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 20);
    if(rightWristY >0 && rightWristY <=100)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 0.5x";
         song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML = "Velocidade = '1x";
         song.rate(1);
    }
     else if(rightWristY >200 && rightWristY <=300)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
         song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY <=400)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 2x";
         song.rate(2);
    }
    else if(rightWristY >400)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 2.5x";
         song.rate(2.5);
    }

}    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decima/500;
        document.getElementById("volume").innerHTML= "volume = " + volume;
        song.setVolume(volume);
    
    }
   
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreLeftWrist =" + scoreLeftWrist);

    leftWristY = results[0].pose.leftWrist.y;
    leftWristX = results[0].pose.leftWrist.x;
    console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

    rightWristX = results[0].pose.leftWrist.x;
    rightWristY = results[0].pose.leftWrist.y;
    console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
}
}