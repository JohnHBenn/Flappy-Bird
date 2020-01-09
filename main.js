var cnvs = document.getElementById("canvas");
var cntx = cnvs.getContext("2d");

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

var gap = 80; //the gap of the pipes vertically
var constant;
var bX = 10; //changes the birds x pos
var bY = 80; //changes the birds beginning y pos
var gravity = 2; //how fast the bird will drop
var score = 0; //the score duh

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 40; //makes the bird go up
}

var pipe = [];

pipe[0] = {
    x : cnvs.width,
    y : -180 //height of first pipe
};

function draw(){
    
    cntx.drawImage(bg,0,0);

    if( pipe[pipe.length - 1].x == 70 ){ //width of pipes apart
        pipe.push({
            x : cnvs.width,
            y : Math.floor(Math.random() * 115) + 15 - northpipe.height // a number between 130 and 15
        }); 
    }
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = northpipe.height+gap;
        cntx.drawImage(northpipe,pipe[i].x,pipe[i].y);
        cntx.drawImage(southpipe,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + northpipe.width && (bY <= pipe[i].y + northpipe.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cnvs.height - fg.height){
            location.reload();
        }
        
        if(pipe[i].x == 5){
            score++;
        }
        
    }

    cntx.drawImage(fg,0,cnvs.height - fg.height);
    
    cntx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    cntx.fillStyle = "#000";
    cntx.font = "20px Verdana";
    cntx.fillText("Score : "+score,10,cnvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();