import {init, GameLoop, Sprite, keyPressed, initKeys, collides, angleToTarget, Scene} from '../lib/kontra.min.mjs';

const {canvas, context} = init();
initKeys();

let platformSpeed = 2.5
let ballSpeed = 3.5

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

let background = Sprite({
  width: 512,
  height: 512,
  x:0,
  y: 0,
  color: 'darkgray'
})

let scene = Scene({
  id: 'main',
  objects: [background, platformLeft, platformRight, ball]
})



const menuloop = GameLoop({
  update: function(){
    if (keyPressed('space')) {
      menuloop.stop()
    }
  },
  render: function(){

  }
})

const loop = GameLoop({
  update: function(dt){
    console.log('update')

    if (keyPressed('space')){
      console.log('time ')
      ball.dx = ballSpeed
      ball.dy = ballSpeed
    }

    if (collides(platformLeft, ball)){
      ball.dx = -ball.dx;
      //ball.dy = -ball.dy;
    }

    if (collides(platformRight, ball)){
      ball.dx = -ball.dx;
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
      window.location.reload;
    }

    if (ball.x <= ball.width/2){
      loop.stop();
      alert('left player lost')
      window.location.reload;
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