"use strict"
// get element id
let video=document.getElementById("video");
let canvas=document.getElementById("canvas");
let end_button=document.getElementById("end");
let start_button=document.getElementById("start");
let context=canvas.getContext("2d");
let input = document.getElementById("input");
let HP= document.getElementById("HP");
var run_main=document.getElementById("run");
// var side_bar=document.getElementById("side_bar");
// var seclect_bar = document.getElementById("select_bar");  
// var selected_value;
// var selected_name;
var countContainer= document.getElementById("count_container");
var count= document.getElementById("count");

// get value
// selected_value = seclect_bar.options[seclect_bar.selectedIndex].value;
// selected_name=seclect_bar.options[seclect_bar.selectedIndex].innerHTML;
// document.getElementById("name_excercise").innerHTML=selected_name;
// seclect_bar.addEventListener("change",function(){
//     selected_value = seclect_bar.options[seclect_bar.selectedIndex].value;
//     selected_name=seclect_bar.options[seclect_bar.selectedIndex].innerHTML;
//     document.getElementById("name_excercise").innerHTML=selected_name;
// });

var select= document.querySelector(".select");
var list_select= select.getElementsByTagName("li")
var check=true;


// const var
var height_core=window.innerHeight;
var width_core=window.innerWidth;
var main_loop;
var auto_video;
var id;
var check_true_fale=true;
var score=document.getElementById("score");
var scoreL=document.getElementById("scoreL");
var scoreR=document.getElementById("scoreR");
var HP_score=0;
var core=0;



// swat, JumpingJack const

var Nose;
var Shoulder;
var listNose=[];

// dumbbell and hammer curls
var rightWristConst;
var leftWristConst;
var leftElowConst;
var rightElbowConst;
var listRightWrist=[];
var listLeftWrist=[]; 
var coreL=0;
var coreR=0;


// make sidebar selector

for(let i=0;i<list_select.length;i++){
  // get each element in selector
  list_select[i].addEventListener("click",function(){
    // get id selected
    id=list_select[i].getAttribute("value");
    // show name selected
    document.getElementById("name_excercise").innerHTML=list_select[i].innerHTML;
    // check true false to open seclector
    // if (check){
    // for(let i=0;i<list_select.length;i++){
    //   list_select[i].style.display="none";
    //   list_select[parseInt(id)].style.display="block";
    //   check=false;
    // }}else{
    //   for(let i=0;i<list_select.length;i++){
    //   list_select[i].style.display="block";
    //   check=true;
    //   }
    // } 
  });
}


// change const
window.addEventListener("resize", function(){
  height_core=window.innerHeight;
  width_core=window.innerWidth;
})
// model config
const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox
    };
// check natural number
function is_Natural(n) 
  {
    if (typeof n !== 'number') 
        return false; 

    return (n >= 0.0) && (Math.floor(n) === n) && n !== Infinity;
  }
// notice part
function notice(size="50px", document="Error", timeout=1000){
  countContainer.style.display="block";
  // count.style.marginLeft=String(width_core/2-100)+"px";
  count.style.fontSize=size;
  count.innerHTML=document;
  setTimeout(() => {
    countContainer.style.display="none";
    count.innerHTML='';
  }, timeout)
}
// get mainScore
function getScore(){
  HP_score=input.value;
  if(is_Natural(parseInt(HP_score))){
    HP.innerHTML="Total Score: "+String(HP_score);
  }else{
    HP_score=0;
    HP.innerHTML="Total Score: "+String(HP_score);
    notice("50px","Total score is natural number! Try again!",2000)
  }
  
}

// side bar
function open_side_bar(){
  side_bar.style.width="250px";
}

function close_side_bar(){
  side_bar.style.width=0;
}
// main function
function auto_stream(){
  // get client camera height, width

  canvas.height=video.videoHeight;
  canvas.width=(video.videoWidth<width_core)?video.videoWidth:width_core*0.9;
  
  // reset score
  score.innerHTML="";
  scoreR.innerHTML="";
  scoreL.innerHTML="";
  // console.log(video.videoHeight);
  auto_video= setInterval(() => {
    var ctx=context;
    ctx.save();
    ctx.drawImage(video,(canvas.width-video.videoWidth)/2,0);
  }, 100);
}

// run
async function run(){
    // define the model
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    // console.log(poses[0].keypoints[1]);c
    auto_stream();
    function start(){
      clearInterval(main_loop);
      clearInterval(auto_video);
      core=0;
      coreL=0;
      coreR=0;

      main_loop= setInterval(() => {
        
        detect(detector);
  
      }, 100);
    }
    // start();
    end_button.onclick=function(){
      auto_stream();
      // mainScore=0;
      clearInterval(main_loop);
      // console.log("/////");
    }
    start_button.onclick=function(){
      check_true_fale=true;

      if (parseInt(HP_score)===0){
        notice("50px","Please! Input your score!",2000);
      }
      else{
        setTimeout(() => {
          start();
        }, 7000);

      let i=5;
      // get id count
      countContainer.style.display="block";
      // count.style.marginLeft=String(width_core/2-50)+"px";
      count.style.fontSize="200px"
      var a_=setInterval(() => {
        count.innerHTML= String(i);
        i-=1;
        // console.log(i);
        if(i==-2){
          clearInterval(a_);
          countContainer.style.display="none";
          count.innerHTML='';
        }
      }, 1000);
      // console.log("start");
      }

    }
}



// get client camera
function capture() {
  // get media
  navigator.mediaDevices.getUserMedia({
            video:{facingMode:"user"},
            audio: false
            })
    // stream data
    .then(function(_stream) {
      // run stream
      var stream;
      stream  = _stream;
      video.srcObject = stream;
      // video.play();
      // run main function
      run();
    })
    .catch(function(err) {
      console.log(err);
    });
}



const detect=async(detector)=>{
  const poses = await detector.estimatePoses(video);

  if (poses.length==0){
    var ctx=context;
    ctx.drawImage(video,0,0);
  }

  for(let i=0; i<poses.length;i++){
    // get items in poses
    let nose=poses[i].keypoints[0];
    let left_eye=poses[i].keypoints[1];
    let right_eye=poses[i].keypoints[2];
    let left_ear=poses[i].keypoints[3];
    let right_ear=poses[i].keypoints[4];
    let left_shoulder=poses[i].keypoints[5];
    let right_shoulder=poses[i].keypoints[6];
    let left_elbow=poses[i].keypoints[7];
    let right_elbow=poses[i].keypoints[8];
    let left_wrist=poses[i].keypoints[9];
    let right_wrist=poses[i].keypoints[10];
    let left_hip=poses[i].keypoints[11];
    let right_hip=poses[i].keypoints[12];
    let left_knee=poses[i].keypoints[13];
    let right_knee=poses[i].keypoints[14];
    let left_ankle=poses[i].keypoints[15];
    let right_ankle=poses[i].keypoints[16];
    // console.log(nose.y);
    // set canvas height, width
    canvas.height=video.videoHeight;
    canvas.width=(video.videoWidth<width_core)?video.videoWidth:width_core*0.9;
    // set context
    var ctx=context;
    // main function
    if(id=="0"){
      curls(ctx,left_wrist,right_wrist,left_elbow,right_elbow);
    }else if(id=="1"){
      squat(ctx,nose,right_shoulder);
    }else if(id=="2"){
      barbellCurl(ctx,right_wrist,right_elbow);
    }else{
      notice("50px","Error! Please, try again!",3000);
      auto_stream();
      // mainScore=0;
      clearInterval(main_loop);   
    };
  }


}


// swat function
function squat(ctx,nose,right_shoulder){
  // get ListNose to check distance from const nose and new nose
  listNose.push(nose.y);
  listNose.sort(function(a,b){return a-b });
  
  // set const nose
  if (check_true_fale){
    Nose=nose.y;
    Shoulder=right_shoulder.y;
    check_true_fale=false;
  }
  // check nose max and const nose
  if (((nose.y-Nose)>1.4*(Shoulder-Nose))&&(listNose[0]-Nose<50)){
      core+=1;
      // listShoulder=[];
      listNose=[];
      // console.log("pass");
      HP_score-=1;
  }
  // draw image and point
  ctx.save();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(video,0,0);
  ctx.fillRect(nose.x,nose.y,10,10);
  
  // show score
  
  score.innerHTML="SCORE: "+String(core);
  HP.innerHTML="Total Score: "+String(HP_score);

  // end program if HP==0
  if (HP_score<0||HP_score==0){
    notice("50px", "Congratulations! ^_^", 2000);
    clearInterval(main_loop);
    auto_stream();
    HP_score=0;
  }
}


// curls
function curls(ctx, left_wrist, right_wrist, left_elbow,right_elbow){
  if (check_true_fale){
    // get const left, right wrist
    leftWristConst=left_wrist.y;
    rightWristConst=right_wrist.y;
    
    // get const left, right elbow
    leftElowConst=left_elbow.y;
    rightElbowConst=right_elbow.y;

    
    // run first time
    check_true_fale=false;
  }
  // add wrist, eblow to list
  listLeftWrist.push(left_wrist.y);
  listRightWrist.push(right_wrist.y);

  //  sort list min to max
  listLeftWrist.sort(function(a,b){return b-a});
  listRightWrist.sort(function(a,b){return b-a})

  //  check left wrist < left eblow const => one rep
  if ((left_wrist.y<leftElowConst)&&(leftWristConst-listLeftWrist[0]<50)){
    coreL+=1;
    listLeftWrist=[];
    HP_score-=1;
    if(HP_score<0){
      HP_score=0;
    }

  }
  // check right wrist < right eblow const => one rep
  if ((right_wrist.y<rightElbowConst)&&(rightWristConst-listRightWrist[0]<50)){
    coreR+=1;
    listRightWrist=[];
    HP_score-=1;
    if(HP_score<0){
      HP_score=0;
    }

  }
  // show score to client
  scoreL.innerHTML="SCORE L: "+String(coreL);
  scoreR.innerHTML="SCORE R: "+String(coreR);
  HP.innerHTML="Total Score: "+String(HP_score);

  // end function if HP==0
  if (HP_score<0||HP_score==0){
    notice("50px", "Congratulations! ^_^");
    clearInterval(main_loop);
    auto_stream();
    HP_score=0;
  }
  ctx.save();
  ctx.drawImage(video,0,0);
  

  

}

// barbrll curl function
function barbellCurl(ctx,right_wrist,right_elbow){
  if (check_true_fale){
    // get const right wrist
    rightWristConst=right_wrist.y;
    
    // get const right elbow
    rightElbowConst=right_elbow.y;

    
    // run first time
    check_true_fale=false;
  }
  // add y to list and sort
  listRightWrist.push(right_wrist.y);
  listRightWrist.sort(function(a,b){return b-a})

  // check if Rwrist <  RelowConst => one rep
  if ((right_wrist.y<rightElbowConst)&&(rightWristConst-listRightWrist[0]<50)){
    coreR+=1;
    listRightWrist=[];
    HP_score-=1;
    if(HP_score<0){
      HP_score=0;
    }

  }
  // show to client score
  score.innerHTML="SCORE: "+String(coreR);
  HP.innerHTML="Total Score: "+String(HP_score);

  // end function if HP==0
  if (HP_score<0||HP_score==0){
    notice("50px", "Congratulations! ^_^");
    clearInterval(main_loop);
    auto_stream();
    HP_score=0;
  }
  ctx.save();
  ctx.drawImage(video,0,0);
}



// get client camera 
run_main.addEventListener("click",function(){
  if(video.videoHeight==0){
    capture();
  }else{
    console.log("error");
  }
});


// capture();



// doi ngay giai quyet :((

// function jumpingJack(ctx,left_wrist,right_wrist){


//   // if (){
//   //   core+=1;
//   //   HP_score-=1;
//   //   listNose=[];
//   // }
//   ctx.save();
//   ctx.drawImage(video,0,0);
//   ctx.beginPath();
//   ctx.moveTo(left_wrist.x,left_wrist.y);
//   ctx.lineTo(right_wrist.x,right_wrist.y);
//   ctx.fillStyle="blue";
//   ctx.stroke();
  
//   // show score
//   if (left_wrist.x-left_wrist.y<100){
//     console.log("pass");
//   }
  
//   score.innerHTML="SCORE: "+String(core);
//   HP.innerHTML="Total Score: "+String(HP_score);
// }