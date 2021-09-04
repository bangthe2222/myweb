// let video = document.querySelector("#video");
let canvas = document.getElementById("canvas");
let videoElm = document.getElementById('video');
// flip button element
let flipBtn = document.getElementById('flip-button');
let defaultsOpts = { audio: false, video: true }
let shouldFaceUser = true;
let height_core=window.innerHeight;
let width_core=window.innerWidth;

window.addEventListener("resize",function(){
      height_core=window.innerHeight;
      width_core=window.innerWidth;
})
// check whether we can use facingMode
let supports = navigator.mediaDevices.getSupportedConstraints();
if( supports['facingMode'] === true ) {
  flipBtn.disabled = false;
}

let stream = null;
var loopdetect;
// // main function
const runCoco = async () => {
    const net = await cocoSsd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    canvas.style.opacity=1;
     loopdetect= setInterval(() => {
      detect(net);
      }, 1);

};


// draw bdb and label
const detect= async (net) =>{
    try{
      // console.log(videoElm.videoWidth);
      videoElm.msHorizontalMirror = true;
      const obj= await net.detect(videoElm);
      var height=videoElm.videoHeight;
      var width=videoElm.videoWidth;
      canvas.height=(height<height_core)?height:height_core;
      canvas.width=(width<width_core)?width:width_core*0.9;
      var ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,720,540);
      ctx.drawImage(videoElm,0,0,width,height);
      for (let i=0;i<obj.length;i++){
        if(obj[i].score>0.5){
          var x = obj[i].bbox[0];
          var y = obj[i].bbox[1];
          var w = obj[i].bbox[2];
          var h = obj[i].bbox[3];
          var name=obj[i].class;
          ctx.beginPath();
          
          ctx.lineWidth = "2";
          ctx.strokeStyle = colors[classes.indexOf(name)];
          ctx.rect(x,y,w,h);
          ctx.stroke();
          ctx.font = "30px Times New Roman";
          ctx.fillStyle=colors[classes.indexOf(name)];
          ctx.fillText(name, x, (y>50)? y-10:y+30); 

        }
    }
  } catch (error) {
    // console.error(error);
    };
    

}

// // let defaultsOpts = { audio: false, video: true }
// // let shouldFaceUser = true;
// let stream = null;
// var front = false;
// // get client camera
// var constraints = { video: { facingMode: (front)? "user" : "environment" },audio: false };

// async function run(){
//     let stream = await navigator.mediaDevices.getUserMedia(constraints);
    
//     video.srcObject = stream;
//     runCoco();
// };


// //  start-button
// var startbutton= document.getElementById("start-camera");
// startbutton.addEventListener("click",run);


// // flip button
// let defaultsOpts = { audio: false, video: true }
// let shouldFaceUser = true;

// // check whether we can use facingMode
// let supports = navigator.mediaDevices.getSupportedConstraints();
// if( supports['facingMode'] === true ) {
//   flipBtn.disabled = false;
// }

// get clien camera
function capture() {
  defaultsOpts.video = { facingMode: shouldFaceUser ? 'user' : 'environment',

                         } 
  navigator.mediaDevices.getUserMedia(defaultsOpts)
    .then(function(_stream) {
      stream  = _stream;
      videoElm.srcObject = stream;
      videoElm.play();
      runCoco();
      
    })
    .catch(function(err) {
      console.log(err)
    });
}

flipBtn.addEventListener('click', function(){
  if( stream == null ) return
  // we need to flip, stop everything
  stream.getTracks().forEach(t => {
    t.stop();
  });
  // toggle / flip
  clearInterval(loopdetect);
  shouldFaceUser = !shouldFaceUser;
  capture();
  })

var startButton=document.getElementById("start-button");
startButton.addEventListener("click",capture);

var endButton=document.getElementById("end-button");
endButton.addEventListener("click",function(){
  if( stream == null ) return
  // we need to flip, stop everything
  stream.getTracks().forEach(t => {
    t.stop();
  });
  clearInterval(loopdetect);
  canvas.style.opacity=0.5;
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);

})


const classes=[
    'person',
    'bicycle',
    'car',
    'motorcycle',
    'airplane',
    'bus',
    'train',
    'truck',
    'boat',
    'traffic light',
    'fire hydrant',
    'stop sign',
    'parking meter',
    'bench',
    'bird',
    'cat',
    'dog',
    'horse',
    'sheep',
    'cow',
    'elephant',
    'bear',
    'zebra',
    'giraffe',
    'backpack',
    'umbrella',
    'handbag',
    'tie',
    'suitcase',
    'frisbee',
    'skis',
    'snowboard',
    'sports ball',
    'kite',
    'baseball bat',
    'baseball glove',
    'skateboard',
    'surfboard',
    'tennis racket',
    'bottle',
    'wine glass',
    'cup',
    'fork',
    'knife',
    'spoon',
    'bowl',
    'banana',
    'apple',
    'sandwich',
    'orange',
    'broccoli',
    'carrot',
    'hot dog',
    'pizza',
    'donut',
    'cake',
    'chair',
    'couch',
    'potted plant',
    'bed',
    'dining table',
    'toilet',
    'tv',
    'laptop',
    'mouse',
    'remote',
    'keyboard',
    'cell phone',
    'microwave',
    'oven',
    'toaster',
    'sink',
    'refrigerator',
    'book',
    'clock',
    'vase',
    'scissors',
    'teddy bear',
    'hair drier',
    'toothbrush',
]

const colors=[
    '#A6F972',
    '#6FF0D4',
    '#7A8B43',
    '#24C7E9',
    '#54FA12',
    '#227BE4',
    '#76363D',
    '#017B44',
    '#323F51',
    '#A0D4A5',
    '#22D43C',
    '#884C61',
    '#0EB19B',
    '#021C4B',
    '#E522B4',
    '#DABFF7',
    '#079EA7',
    '#E04372',
    '#D76619',
    '#47B2CB',
    '#5B5DED',
    '#17A73E',
    '#0C7992',
    '#50435B',
    '#0F0355',
    '#4AD69B',
    '#412D83',
    '#FD9BB1',
    '#3CF9A0',
    '#6C33DF',
    '#9D889F',
    '#9CFA4C',
    '#D93941',
    '#FC1466',
    '#A89076',
    '#842E0F',
    '#50B662',
    '#4D5D76',
    '#912D40',
    '#339BE5',
    '#E3ED6D',
    '#FC9721',
    '#9B11AD',
    '#47441E',
    '#B235A8',
    '#11C3FB',
    '#B29A5C',
    '#1CCED0',
    '#4FD3E8',
    '#1902F4',
    '#53D51B',
    '#02BB76',
    '#6A01B1',
    '#EA2894',
    '#FA8FCF',
    '#AB2E4D',
    '#CEB96F',
    '#DE6645',
    '#CE9BD5',
    '#BB9716',
    '#C7AF2E',
    '#A4EEB2',
    '#A43065',
    '#8C6F6D',
    '#C1417B',
    '#785182',
    '#EEA1CA',
    '#B4B0EB',
    '#F55A12',
    '#7E1BEE',
    '#B5B2B9',
    '#F4462E',
    '#77F65A',
    '#01C5C1',
    '#F1D53F',
    '#8A6693',
    '#911CDC',
    '#9FB006',
    '#3B7037',
    '#8DF28C',
]