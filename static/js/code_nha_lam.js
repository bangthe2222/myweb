"use strict"
function clearArc(context, x, y, radius) {
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
}
// change planet 
function run(contex,url,r,size,angle,angle_planet,agl,agl_p, color,size_core,len){
    const r_no_change=r;
    r=size_core*r*0.9/2;
    var planet_core_size;
    planet_core_size=(size_core/len)/2;
    var image= new Image();
    var x=0,y=-r;
    var new_size; 
    new_size=planet_core_size*size;
    image.src=url;
    image.onload= setInterval(
        function(){ 
            var ctx;     
            window.addEventListener('resize', size_get);
            function size_get(){
                var size_core;
                size_core=start.size_core;
                r=size_core*r_no_change*0.9/2;
                planet_core_size=(size_core/len)/2;
                new_size=planet_core_size*size;
            }                  
            ctx=contex;        
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, 2 * Math.PI);
            ctx.lineWidth=0.03;
            ctx.strokeStyle=color;
            ctx.stroke()
            ctx.translate(x,y);
            ctx.rotate(angle_planet);
            clearArc(ctx,0,0,new_size/2+0.5);
            ctx.restore();
            ctx.save();
            
            x=r*Math.sin(angle);
            y=-r*Math.cos(angle);
            angle+=agl*Math.PI/180; 
            ctx.translate(x,y);
            ctx.rotate(angle_planet);
            // clearArc(ctx,0,0,size/2+1);
            ctx.drawImage(image,-new_size/2,-new_size/2,new_size,new_size); 
            ctx.restore();
            

            angle_planet+=agl_p*Math.PI/180;                   
        },
        100
    )
}

// change mouse image

const circle = document.querySelector('.circle');
// const link = document.querySelectorAll()
window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('mousedown', mouseDownHandler);
window.addEventListener('mouseup', mouseUpHandler);
// link.addEventListener('mouseenter', linkEnterHandler);
// link.addEventListener('mouseleave', linkLeaveHandler);


function mouseMoveHandler(e) {
    circle.style.left = e.clientX - circle.offsetWidth / 2 + "px";
    circle.style.top = e.clientY - circle.offsetHeight / 2 + "px";
    circle.style.opacity = 1;
}

function mouseUpHandler(e) {
    circle.style.transform = "scale(1)";
    // circle.style.transform = "rotate(17deg)";
}

function mouseDownHandler() {

    circle.style.transform = "scale(1.5)";
    // circle.style.transform = "rotate(377deg)";
}
