import {init, GameLoop, Sprite, keyPressed, initKeys, collides, angleToTarget, Scene, Text} from '../lib/kontra.min.mjs';

const {canvas, context} = init();
initKeys();

let platformSpeed = 2.5
let ballSpeed = 4
let bounces = 0;
let ballRightCollided = false;
let ballLeftCollided = false;
let lastCollided = 'left';
let counter = 0;

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
  text: 'SPACE to start\nw,s - left\ni,k - right',
  font: '40px Arial',
  color: 'white',
  x: 256,
  y: 256,
  anchor: {x: 0.5, y: 0.5},
  textAlign: 'center'

})

let background = Sprite({
  width: 512,
  height: 512,
  x:0,
  y: 0,
  color: 'darkgray',
  
})

let scene = Scene({
  id: 'main',
  objects: [background, counterText, platformLeft, platformRight, ball]
})

const loop = GameLoop({
  update: function(dt){
    // console.log('update')


    // console.log('bounces', bounces)
    // console.log('ballspeed+', bounces/20)
    // console.log('speed', ballSpeed)

    if (ballRightCollided == true && lastCollided == 'left'){
      console.log('right collided entered')
      
      platformSpeed += bounces / 20
      ballSpeed += bounces / 20
      counter += 1
      counterText.text = counter

      ballLeftCollided = false
      ballRightCollided = false  
      lastCollided = 'right'

    }

    
    if (ballLeftCollided == true && lastCollided == 'right'){
      console.log('left collided entered')
      platformSpeed += bounces / 20
      ballSpeed += bounces / 20
      counter += 1
      counterText.text = counter

      ballRightCollided = false
      ballLeftCollided = false
      lastCollided = 'left'

    }
    
    

    if (keyPressed('space')){
      console.log('time ')
      counterText.text = 0
      counterText.color = 'gray'
      ball.dx = ballSpeed
      
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

  console.log('x speed', x_speed)
  console.log('y speed', y_speed)

  ball.dx = x_speed;
  ball.dy = y_speed;
}