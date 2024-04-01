import {init, GameLoop, Sprite, keyPressed, initKeys, collides, angleToTarget, Scene, Text} from '../lib/kontra.min.mjs';

//ZZfx library for sounds

'use strict';let zzfx,zzfxV,zzfxX
zzfxV=.1    // volume
zzfx=       // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination);b.start();return b}
zzfxX=new(window.AudioContext||webkitAudioContext) // audio context

// end of sounds library

const {canvas, context} = init();
initKeys();
let time = 0;
let platformSpeed = 2.5
let ballSpeed = 4
let bounces = 0;
let bouncesSpeedBoundary = 30
let ballMinSpeed = 4
let speedBoundary = 11
let ballRightCollided = false;
let ballLeftCollided = false;
let ballSpeedAdd = 0.3; 
let ballSpeedAddMin = 0.2
let lastCollided = 'left';
let counter = 0;
let currentSelect = 1;

let upPressed = false
let downPressed = false

let platformLeft = Sprite({
  anchor : {x: 0.5, y: 0.5},
  width: 26,
  height: 110,
  x: 13,
  y: 256,
  color: 'white'

})

let platformRight = Sprite({
  anchor : {x: 0.5, y: 0.5},
  width: 26,
  height: 110,
  x: 499,
  y: 256,
  color: 'white'

})

let ball = Sprite({
  anchor : {x: 0.5, y: 0.5},
  width: 14,
  height: 14,
  x: 256,
  y: 320, 
  // dx: 2,
  // dy: 2,
  color: 'white'
})

let counterText = Text({
  text: 'SPACE to start\nw,s - left\ni,k - right\n1,2/up,down - settings',
  font: '38px Arial',
  color: 'white',
  x: 256,
  y: 230,
  anchor: {x: 0.5, y: 0.5},
  textAlign: 'center'

})

let speedText = Text ({
  text: 'speed\n'+ballSpeed.toFixed(1),
  font: '28px Arial',
  color: 'darkgray',
  x: 256,
  y: 60,
  anchor: {x: 0.5, y: 0.5},
  textAlign: 'center'
})

let speedBoundaryText = Text ({
  text: '1 - ball speed boundary: ' + speedBoundary,
  font: '20px Arial',
  color: 'white',
  x: 120,
  y: 420,
  //anchor: {x: 0.5, y: 0.5},
  textAlign: 'left'
})

let speedMultiplierText = Text ({
  text: '2 - ball speed addend: '+ ballSpeedAdd,
  font: '20px Arial',
  color: 'darkgray',
  x: 120,
  y: 450,
  //anchor: {x: 0.5, y: 0.5},
  textAlign: 'left'
})

let background = Sprite({
  width: 512,
  height: 512,
  x:0,
  y: 0,
  color: 'gray',
  
})

let scene = Scene({
  id: 'main',
  objects: [background, counterText, speedText, speedBoundaryText, speedMultiplierText, platformLeft, platformRight, ball]
})

const loop = GameLoop({
  update: function(dt){
    // //console.log(time)
    time += dt

    // //console.log('bounces', bounces)
    // //console.log('ballspeed+', bounces/20)
    // //console.log('speed', ballSpeed)

    if (ballRightCollided == true && lastCollided == 'left'){
      zzfx(...[1.01,,175,.02,,,,1.09,,,,,,.7,,,,.52,.06,.19]);
      //console.log('right collided entered')
      if (bounces < bouncesSpeedBoundary && ballSpeed < speedBoundary){
        // platformSpeed += bounces / ballSpeedDivider
        // ballSpeed += bounces / ballSpeedDivider
        platformSpeed += ballSpeedAdd
        ballSpeed += ballSpeedAdd
      }
      counter += 1
      counterText.text = counter
      speedText.text = "speed\n"+(ballSpeed).toFixed(1)

      ballLeftCollided = false
      ballRightCollided = false  
      lastCollided = 'right'

    }

    
    if (ballLeftCollided == true && lastCollided == 'right'){
      zzfx(...[1.01,,175,.02,,,,1.09,,,,,,.7,,,,.52,.06,.19]);
      //console.log('left collided entered')
      if (bounces < bouncesSpeedBoundary && ballSpeed < speedBoundary){
        // platformSpeed += bounces / 20
        // ballSpeed += bounces / 20
        platformSpeed += ballSpeedAdd
        ballSpeed += ballSpeedAdd
      }
      counter += 1
      counterText.text = counter
      speedText.text = "speed\n"+(ballSpeed).toFixed(1)

      ballRightCollided = false
      ballLeftCollided = false
      lastCollided = 'left'

    }
    
    
    if (bounces < 1){  
      if (keyPressed('space')){
        //console.log('time ')
        counterText.text = 0
        counterText.color = 'darkgray'
        counterText.y = 256
        counterText.font = '42px Arial'

        speedBoundaryText.text = ''
        speedMultiplierText.text = ''
        
        ball.dx = ballSpeed 
      }

      if (keyPressed('1')){
        currentSelect = 1
      }

      if (keyPressed('2')){
        currentSelect = 2
      }

      if (currentSelect == 1){
        speedBoundaryText.color = 'white'
        speedMultiplierText.color = 'darkgray'
        
        if (speedBoundary >= ballMinSpeed){

          if (keyPressed('arrowup')&&upPressed == true){
            speedBoundary += 1
            upPressed = false
            // //console.log('uppressed 1', upPressed)
            
            speedBoundaryText.text = '1 - ball speed boundary: '+speedBoundary

          } else if (!keyPressed('arrowup')){
            // //console.log('uppressed 2', upPressed)
            upPressed = true
          }

          if (keyPressed('arrowdown') && downPressed == true){
            if (speedBoundary > ballMinSpeed){
              speedBoundary -= 1
            }
            //console.log('downpressed 1', downPressed)
            downPressed = false
            
            speedBoundaryText.text = '1 - ball speed boundary: '+speedBoundary
          } else if (!keyPressed('arrowdown')){
            //console.log('downpressed 2', downPressed)
            downPressed = true
          } 
          
        }
      }

      if (currentSelect == 2){
        speedBoundaryText.color = 'darkgray'
        speedMultiplierText.color = 'white'

        if (ballSpeedAdd >= ballSpeedAddMin){
          if (keyPressed('arrowup')&&upPressed == true){
            ballSpeedAdd += 0.1
            upPressed = false
            
            console.log(ballSpeedAdd)
            speedMultiplierText.text = '2 - ball speed addend: '+ballSpeedAdd.toFixed(1)

          } else if (!keyPressed('arrowup')){
            upPressed = true
          }

          if (keyPressed('arrowdown') && downPressed == true){
            if (ballSpeedAdd > ballSpeedAddMin){
              ballSpeedAdd = parseFloat((ballSpeedAdd-0.1).toFixed(1))
            }
            downPressed = false
            
            console.log(ballSpeedAdd)
            speedMultiplierText.text = '2 - ball speed addend: '+ballSpeedAdd.toFixed(1)
          } else if (!keyPressed('arrowdown')){
            downPressed = true
          } 
        }
      }
    }

    if (collides(platformLeft, ball)){
      calc_dx_dy("left")
      bounces++
      ballLeftCollided = true;
      
      // ball.dx = -ball.dx;
      //ball.dy = -ball.dy;
    }

    if (collides(platformRight, ball)){
      calc_dx_dy("right")
      bounces++
      ballRightCollided = true;

      // ball.dx = -ball.dx;
      // ball.dy = -ball.dy;
    }

    if (ball.y <= ball.height/2){
      // ball.dx = -ball.dx;
      ball.dy = -ball.dy;
    }

    if (ball.y >= 512-ball.height/2){
      // ball.dx = -ball.dx;
      ball.dy = -ball.dy;
    }

    if (ball.x >= 512-ball.width/2){
      loop.stop();
      alert('right player lost')
      window.location.reload();
    }

    if (ball.x <= ball.width/2){
      loop.stop();
      alert('left player lost')
      window.location.reload();
    }

    if (ballSpeed > speedBoundary){
      ballSpeed = speedBoundary
    }

    if (keyPressed('w')){
      platformLeft.y -= platformSpeed;
    }

    if (keyPressed('s')){
      platformLeft.y += platformSpeed;
    }

    if (keyPressed('i')){
      platformRight.y -= platformSpeed;
    }

    if (keyPressed('k')){
      platformRight.y += platformSpeed;
    }

    if (platformLeft.y > 512 - platformLeft.height/2){
      platformLeft.y = 512 - platformLeft.height/2
    }

    if (platformLeft.y < platformLeft.height/2){
      platformLeft.y = platformLeft.height/2
    }

    if (platformRight.y > 512 - platformRight.height/2){
      platformRight.y = 512 - platformRight.height/2
    }

    if (platformRight.y < platformRight.height/2){
      platformRight.y = platformRight.height/2
    }

    scene.update();
  },
  render: function() {

    scene.render();
  }
})

loop.start()

function calc_dx_dy(plarform){
 
  let angle;

  if (plarform == "left"){
    angle = angleToTarget(platformLeft, ball);
  }

  if (plarform == "right"){
    angle = angleToTarget(platformRight, ball);    
  }

  let x_speed = ballSpeed * Math.cos(angle);
  let y_speed = ballSpeed * Math.sin(angle);

  //console.log('x speed', x_speed)
  //console.log('y speed', y_speed)

  ball.dx = x_speed;
  ball.dy = y_speed;
}
