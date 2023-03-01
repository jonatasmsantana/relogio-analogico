var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);

function drawClock(){
    drawFace(ctx, radius); 
    drawNumbers(ctx, radius); 
    drawTime(ctx, radius) ;
}

function drawFace(ctx, radius){
    var gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    gradient = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05);
    gradient.addColorStop(0, '#333');
    gradient.addColorStop(0.5, '#fff');
    gradient.addColorStop(1, '#333');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius){
    var angle;
    var number;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(number = 1; number < 13; number++){
        angle = number * Math.PI / 6;
        ctx.rotate(angle);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-angle);
        ctx.fillText(number.toString(), 0, 0);
        ctx.rotate(angle);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-angle);
    }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);

    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, position, length, width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(position);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-position);
}