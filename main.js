var cnvs = document.getElementById("canvas");
var cntx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var northpipe = new Image();
var southpipe = new Image();

bird.src = "Images/Mr.flappy.png";
bg.src = "images/background.png";
fg.src = "images/ground.png";
northpipe.src = "Images/northpipe.png";
southpipe.src = "Images/southpipe.png";

var gap = 70;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 10;
}

var pipe = [];

pipe[0] = {
    x : cnvs.width,
    y : 0
};

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = northpipe.height+gap;
        cntx.drawImage(northpipe,pipe[i].x,pipe[i].y);
        cntx.drawImage(southpipe,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cnvs.width,
                y : Math.floor(Math.random()*northpipe.height)-northpipe.height
            }); 
        }

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + northpipe.width && (bY <= pipe[i].y + northpipe.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cnvs.height - fg.height){
            location.reload();
        }
        
        if(pipe[i].x == 5){
            score++;
        }
        
    }

    ctx.drawImage(fg,0,cnvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();