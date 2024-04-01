(function () {
  'use strict';

  /**
   * @preserve
   * Kontra.js v9.0.0
   */
  let noop=()=>{},srOnlyStyle="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);";function addToDom(t,e){let i=e.parentNode;if(t.setAttribute("data-kontra",""),i){let s=i.querySelector("[data-kontra]:last-of-type")||e;i.insertBefore(t,s.nextSibling);}else document.body.appendChild(t);}function removeFromArray(t,e){let i=t.indexOf(e);if(-1!=i)return t.splice(i,1),!0}let canvasEl,context,callbacks$2={};function on(t,e){callbacks$2[t]=callbacks$2[t]||[],callbacks$2[t].push(e);}function off(t,e){callbacks$2[t]=(callbacks$2[t]||[]).filter((t=>t!=e));}function emit(t,...e){(callbacks$2[t]||[]).map((t=>t(...e)));}let handler$1={get:(t,e)=>"_proxy"==e||noop};function getContext(){return context}function init$1(t,{contextless:e=!1}={}){if(canvasEl=document.getElementById(t)||t||document.querySelector("canvas"),e&&(canvasEl=canvasEl||new Proxy({},handler$1)),!canvasEl)throw Error("You must provide a canvas element for the game");return context=canvasEl.getContext("2d")||new Proxy({},handler$1),context.imageSmoothingEnabled=!1,emit("init"),{canvas:canvasEl,context:context}}function angleToTarget(t,e){return Math.atan2(e.y-t.y,e.x-t.x)}function rotatePoint(t,e){let i=Math.sin(e),s=Math.cos(e);return {x:t.x*s-t.y*i,y:t.x*i+t.y*s}}function clamp(t,e,i){return Math.min(Math.max(t,i),e)}function collides(t,e){return [t,e]=[t,e].map((t=>getWorldRect(t))),t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y}function getWorldRect(t){let{x:e=0,y:i=0,width:s,height:a}=t.world||t;return t.mapwidth&&(s=t.mapwidth,a=t.mapheight),t.anchor&&(e-=s*t.anchor.x,i-=a*t.anchor.y),s<0&&(e+=s,s*=-1),a<0&&(i+=a,a*=-1),{x:e,y:i,width:s,height:a}}class Vector{constructor(t=0,e=0,i={}){null!=t.x?(this.x=t.x,this.y=t.y):(this.x=t,this.y=e),i._c&&(this.clamp(i._a,i._b,i._d,i._e),this.x=t,this.y=e);}set(t){this.x=t.x,this.y=t.y;}add(t){return new Vector(this.x+t.x,this.y+t.y,this)}subtract(t){return new Vector(this.x-t.x,this.y-t.y,this)}scale(t){return new Vector(this.x*t,this.y*t)}normalize(t=this.length()||1){return new Vector(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}direction(){return Math.atan2(this.y,this.x)}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s;}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?clamp(this._a,this._d,t):t;}set y(t){this._y=this._c?clamp(this._b,this._e,t):t;}}function factory$a(){return new Vector(...arguments)}class Updatable{constructor(t){return this.init(t)}init(t={}){this.position=factory$a(),this.velocity=factory$a(),this.acceleration=factory$a(),this.ttl=1/0,Object.assign(this,t);}update(t){this.advance(t);}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let i=this.velocity;t&&(i=i.scale(t)),this.position=this.position.add(i),this._pc(),this.ttl--;}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t;}set dy(t){this.velocity.y=t;}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t;}set ddy(t){this.acceleration.y=t;}isAlive(){return this.ttl>0}_pc(){}}class GameObject extends Updatable{init({width:t=0,height:e=0,context:i=getContext(),render:s=this.draw,update:a=this.advance,children:n=[],anchor:o={x:0,y:0},opacity:r=1,rotation:h=0,scaleX:l=1,scaleY:d=1,...c}={}){this._c=[],super.init({width:t,height:e,context:i,anchor:o,opacity:r,rotation:h,scaleX:l,scaleY:d,...c}),this._di=!0,this._uw(),this.addChild(n),this._rf=s,this._uf=a,on("init",(()=>{this.context??=getContext();}));}update(t){this._uf(t),this.children.map((e=>e.update&&e.update(t)));}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),1==this.scaleX&&1==this.scaleY||t.scale(this.scaleX,this.scaleY);let e=-this.width*this.anchor.x,i=-this.height*this.anchor.y;(e||i)&&t.translate(e,i),this.context.globalAlpha=this.opacity,this._rf(),(e||i)&&t.translate(-e,-i),this.children.map((t=>t.render&&t.render())),t.restore();}draw(){}_pc(){this._uw(),this.children.map((t=>t._pc()));}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc();}set y(t){this.position.y=t,this._pc();}get width(){return this._w}set width(t){this._w=t,this._pc();}get height(){return this._h}set height(t){this._h=t,this._pc();}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:i=1,_wr:s=0,_wsx:a=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=i*this.opacity,this._wsx=a*this.scaleX,this._wsy=n*this.scaleY,this._wx=this._wx*a,this._wy=this._wy*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wr=s+this.rotation;let{x:o,y:r}=rotatePoint({x:this._wx,y:this._wy},s);this._wx=o,this._wy=r,this._wx+=t,this._wy+=e;}get world(){return {x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t);}get children(){return this._c}addChild(...t){t.flat().map((t=>{this.children.push(t),t.parent=this,t._pc=t._pc||noop,t._pc();}));}removeChild(...t){t.flat().map((t=>{removeFromArray(this.children,t)&&(t.parent=null,t._pc());}));}get opacity(){return this._opa}set opacity(t){this._opa=clamp(0,1,t),this._pc();}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc();}setScale(t,e=t){this.scaleX=t,this.scaleY=e;}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc();}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc();}}class Sprite extends GameObject{init({image:t,width:e=(t?t.width:void 0),height:i=(t?t.height:void 0),...s}={}){super.init({image:t,width:e,height:i,...s});}get animations(){return this._a}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height;}playAnimation(t){this.currentAnimation?.stop(),this.currentAnimation=this.animations[t],this.currentAnimation.start();}advance(t){super.advance(t),this.currentAnimation?.update(t);}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height));}}function factory$8(){return new Sprite(...arguments)}let fontSizeRegex=/(\d+)(\w+)/;function parseFont(t){if(!t)return {computed:0};let e=t.match(fontSizeRegex),i=+e[1];return {size:i,unit:e[2],computed:i}}class Text extends GameObject{init({text:t="",textAlign:e="",lineHeight:i=1,font:s=getContext()?.font,...a}={}){t=""+t,super.init({text:t,textAlign:e,lineHeight:i,font:s,...a}),this.context&&this._p(),on("init",(()=>{this.font??=getContext().font,this._p();}));}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t;}get text(){return this._t}set text(t){this._d=!0,this._t=""+t;}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=parseFont(t).computed;}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t;}render(){this._d&&this._p(),super.render();}_p(){this._s=[],this._d=!1;let t=this.context,e=[this.text];if(t.font=this.font,e=this.text.split("\n"),this._fw&&e.map((e=>{let i=e.split(" "),s=i.shift(),a=s;i.map((e=>{a+=" "+e,t.measureText(a).width>this._fw&&(this._s.push(s),a=e),s=a;})),this._s.push(a);})),!this._s.length&&this.text.includes("\n")){let i=0;e.map((e=>{this._s.push(e),i=Math.max(i,t.measureText(e).width);})),this._w=this._fw||i;}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw();}draw(){let t=0,e=this.textAlign,i=this.context;e=this.textAlign||("rtl"==i.canvas.dir?"right":"left"),t="right"==e?this.width:"center"==e?this.width/2|0:0,this._s.map(((s,a)=>{i.textBaseline="top",i.textAlign=e,i.fillStyle=this.color,i.font=this.font,this.strokeColor&&(i.strokeStyle=this.strokeColor,i.lineWidth=this.lineWidth??1,i.strokeText(s,t,this._fs*this.lineHeight*a)),i.fillText(s,t,this._fs*this.lineHeight*a);}));}}function factory$7(){return new Text(...arguments)}function clear(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height);}function GameLoop({fps:t=60,clearCanvas:e=!0,update:i=noop,render:s,context:a=getContext(),blur:n=!1}={}){if(!s)throw Error("You must provide a render() function");let o,r,h,l,d,c=0,u=1e3/t,p=1/t,g=e?clear:noop,f=!0;function m(){if(r=requestAnimationFrame(m),f&&(h=performance.now(),l=h-o,o=h,!(l>1e3))){for(emit("tick"),c+=l;c>=u;)d.update(p),c-=u;g(d.context),d.render();}}return n||(window.addEventListener("focus",(()=>{f=!0;})),window.addEventListener("blur",(()=>{f=!1;}))),on("init",(()=>{d.context??=getContext();})),d={update:i,render:s,isStopped:!0,context:a,start(){o=performance.now(),this.isStopped=!1,requestAnimationFrame(m);},stop(){this.isStopped=!0,cancelAnimationFrame(r);},_frame:m,set _last(t){o=t;}},d}let keydownCallbacks={},keyupCallbacks={},pressedKeys={},keyMap={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function call(t=noop,e){t._pd&&e.preventDefault(),t(e);}function keydownEventHandler(t){let e=keyMap[t.code],i=keydownCallbacks[e];pressedKeys[e]=!0,call(i,t);}function keyupEventHandler(t){let e=keyMap[t.code],i=keyupCallbacks[e];pressedKeys[e]=!1,call(i,t);}function blurEventHandler(){pressedKeys={};}function initKeys(){let t;for(t=0;t<26;t++)keyMap["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)keyMap["Digit"+t]=keyMap["Numpad"+t]=""+t;window.addEventListener("keydown",keydownEventHandler),window.addEventListener("keyup",keyupEventHandler),window.addEventListener("blur",blurEventHandler);}function keyPressed(t){return !![].concat(t).some((t=>pressedKeys[t]))}function getAllNodes(t){let e=[];return t._dn?e.push(t._dn):t.children&&t.children.map((t=>{e=e.concat(getAllNodes(t));})),e}class Scene{constructor({id:t,name:e=t,objects:i=[],context:s=getContext(),cullObjects:a=!0,cullFunction:n=collides,sortFunction:o,...r}){this._o=[],Object.assign(this,{id:t,name:e,context:s,cullObjects:a,cullFunction:n,sortFunction:o,...r});let h=this._dn=document.createElement("section");h.tabIndex=-1,h.style=srOnlyStyle,h.id=t,h.setAttribute("aria-label",e);let l=this;this.camera=new class extends GameObject{set x(t){l.sx=t-this.centerX,super.x=t;}get x(){return super.x}set y(t){l.sy=t-this.centerY,super.y=t;}get y(){return super.y}}({context:s,anchor:{x:.5,y:.5},render:this._rf.bind(this)}),this.add(i),this._i=()=>{this.context??=getContext();let t=this.context.canvas,{width:e,height:i}=t,s=e/2,a=i/2;Object.assign(this.camera,{centerX:s,centerY:a,x:s,y:a,width:e,height:i}),this._dn.isConnected||addToDom(this._dn,t);},this.context&&this._i(),on("init",this._i);}set objects(t){this.remove(this._o),this.add(t);}get objects(){return this._o}add(...t){t.flat().map((t=>{this._o.push(t),t.parent=this,getAllNodes(t).map((t=>{this._dn.appendChild(t);}));}));}remove(...t){t.flat().map((t=>{removeFromArray(this._o,t),t.parent=null,getAllNodes(t).map((t=>{addToDom(t,this.context);}));}));}show(){this.hidden=this._dn.hidden=!1;let t=this._o.find((t=>t.focus));t?t.focus():this._dn.focus(),this.onShow();}hide(){this.hidden=this._dn.hidden=!0,this.onHide();}destroy(){off("init",this._i),this._dn.remove(),this._o.map((t=>t.destroy&&t.destroy()));}lookAt(t){let{x:e,y:i}=t.world||t;this.camera.x=e,this.camera.y=i;}update(t){this.hidden||this._o.map((e=>e.update&&e.update(t)));}_rf(){let{_o:t,context:e,_sx:i,_sy:s,camera:a,sortFunction:n,cullObjects:o,cullFunction:r}=this;e.translate(i,s);let h=t;o&&(h=h.filter((t=>r(a,t)))),n&&h.sort(n),h.map((t=>t.render&&t.render()));}render(){if(!this.hidden){let{context:t,camera:e}=this,{x:i,y:s,centerX:a,centerY:n}=e;t.save(),this._sx=a-i,this._sy=n-s,t.translate(this._sx,this._sy),e.render(),t.restore();}}onShow(){}onHide(){}}function factory$2(){return new Scene(...arguments)}

  let zzfx,zzfxV,zzfxX;
  zzfxV=.1;    // volume
  zzfx=       // play sound
  (p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination);b.start();return b};
  zzfxX=new(window.AudioContext||webkitAudioContext); // audio context

  // end of sounds library

  init$1();
  initKeys();
  let platformSpeed = 2.5;
  let ballSpeed = 4;
  let bounces = 0;
  let bouncesSpeedBoundary = 30;
  let ballMinSpeed = 4;
  let speedBoundary = 11;
  let ballRightCollided = false;
  let ballLeftCollided = false;
  let ballSpeedAdd = 0.3; 
  let ballSpeedAddMin = 0.2;
  let lastCollided = 'left';
  let counter = 0;
  let currentSelect = 1;

  let upPressed = false;
  let downPressed = false;

  let platformLeft = factory$8({
    anchor : {x: 0.5, y: 0.5},
    width: 26,
    height: 110,
    x: 13,
    y: 256,
    color: 'white'

  });

  let platformRight = factory$8({
    anchor : {x: 0.5, y: 0.5},
    width: 26,
    height: 110,
    x: 499,
    y: 256,
    color: 'white'

  });

  let ball = factory$8({
    anchor : {x: 0.5, y: 0.5},
    width: 14,
    height: 14,
    x: 256,
    y: 320, 
    // dx: 2,
    // dy: 2,
    color: 'white'
  });

  let counterText = factory$7({
    text: 'SPACE to start\nw,s - left\ni,k - right\n1,2/up,down - settings',
    font: '38px Arial',
    color: 'white',
    x: 256,
    y: 230,
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'

  });

  let speedText = factory$7 ({
    text: 'speed\n'+ballSpeed.toFixed(1),
    font: '28px Arial',
    color: 'darkgray',
    x: 256,
    y: 60,
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
  });

  let speedBoundaryText = factory$7 ({
    text: '1 - ball speed boundary: ' + speedBoundary,
    font: '20px Arial',
    color: 'white',
    x: 120,
    y: 420,
    //anchor: {x: 0.5, y: 0.5},
    textAlign: 'left'
  });

  let speedMultiplierText = factory$7 ({
    text: '2 - ball speed addend: '+ ballSpeedAdd,
    font: '20px Arial',
    color: 'darkgray',
    x: 120,
    y: 450,
    //anchor: {x: 0.5, y: 0.5},
    textAlign: 'left'
  });

  let background = factory$8({
    width: 512,
    height: 512,
    x:0,
    y: 0,
    color: 'gray',
    
  });

  let scene = factory$2({
    id: 'main',
    objects: [background, counterText, speedText, speedBoundaryText, speedMultiplierText, platformLeft, platformRight, ball]
  });

  const loop = GameLoop({
    update: function(dt){

      // //console.log('bounces', bounces)
      // //console.log('ballspeed+', bounces/20)
      // //console.log('speed', ballSpeed)

      if (ballRightCollided == true && lastCollided == 'left'){
        zzfx(...[1.01,,175,.02,,,,1.09,,,,,,.7,,,,.52,.06,.19]);
        //console.log('right collided entered')
        if (bounces < bouncesSpeedBoundary && ballSpeed < speedBoundary){
          // platformSpeed += bounces / ballSpeedDivider
          // ballSpeed += bounces / ballSpeedDivider
          platformSpeed += ballSpeedAdd;
          ballSpeed += ballSpeedAdd;
        }
        counter += 1;
        counterText.text = counter;
        speedText.text = "speed\n"+(ballSpeed).toFixed(1);

        ballLeftCollided = false;
        ballRightCollided = false;  
        lastCollided = 'right';

      }

      
      if (ballLeftCollided == true && lastCollided == 'right'){
        zzfx(...[1.01,,175,.02,,,,1.09,,,,,,.7,,,,.52,.06,.19]);
        //console.log('left collided entered')
        if (bounces < bouncesSpeedBoundary && ballSpeed < speedBoundary){
          // platformSpeed += bounces / 20
          // ballSpeed += bounces / 20
          platformSpeed += ballSpeedAdd;
          ballSpeed += ballSpeedAdd;
        }
        counter += 1;
        counterText.text = counter;
        speedText.text = "speed\n"+(ballSpeed).toFixed(1);

        ballRightCollided = false;
        ballLeftCollided = false;
        lastCollided = 'left';

      }
      
      
      if (bounces < 1){  
        if (keyPressed('space')){
          //console.log('time ')
          counterText.text = 0;
          counterText.color = 'darkgray';
          counterText.y = 256;
          counterText.font = '42px Arial';

          speedBoundaryText.text = '';
          speedMultiplierText.text = '';
          
          ball.dx = ballSpeed; 
        }

        if (keyPressed('1')){
          currentSelect = 1;
        }

        if (keyPressed('2')){
          currentSelect = 2;
        }

        if (currentSelect == 1){
          speedBoundaryText.color = 'white';
          speedMultiplierText.color = 'darkgray';
          
          if (speedBoundary >= ballMinSpeed){

            if (keyPressed('arrowup')&&upPressed == true){
              speedBoundary += 1;
              upPressed = false;
              // //console.log('uppressed 1', upPressed)
              
              speedBoundaryText.text = '1 - ball speed boundary: '+speedBoundary;

            } else if (!keyPressed('arrowup')){
              // //console.log('uppressed 2', upPressed)
              upPressed = true;
            }

            if (keyPressed('arrowdown') && downPressed == true){
              if (speedBoundary > ballMinSpeed){
                speedBoundary -= 1;
              }
              //console.log('downpressed 1', downPressed)
              downPressed = false;
              
              speedBoundaryText.text = '1 - ball speed boundary: '+speedBoundary;
            } else if (!keyPressed('arrowdown')){
              //console.log('downpressed 2', downPressed)
              downPressed = true;
            } 
            
          }
        }

        if (currentSelect == 2){
          speedBoundaryText.color = 'darkgray';
          speedMultiplierText.color = 'white';

          if (ballSpeedAdd >= ballSpeedAddMin){
            if (keyPressed('arrowup')&&upPressed == true){
              ballSpeedAdd += 0.1;
              upPressed = false;
              
              console.log(ballSpeedAdd);
              speedMultiplierText.text = '2 - ball speed addend: '+ballSpeedAdd.toFixed(1);

            } else if (!keyPressed('arrowup')){
              upPressed = true;
            }

            if (keyPressed('arrowdown') && downPressed == true){
              if (ballSpeedAdd > ballSpeedAddMin){
                ballSpeedAdd = parseFloat((ballSpeedAdd-0.1).toFixed(1));
              }
              downPressed = false;
              
              console.log(ballSpeedAdd);
              speedMultiplierText.text = '2 - ball speed addend: '+ballSpeedAdd.toFixed(1);
            } else if (!keyPressed('arrowdown')){
              downPressed = true;
            } 
          }
        }
      }

      if (collides(platformLeft, ball)){
        calc_dx_dy("left");
        bounces++;
        ballLeftCollided = true;
        
        // ball.dx = -ball.dx;
        //ball.dy = -ball.dy;
      }

      if (collides(platformRight, ball)){
        calc_dx_dy("right");
        bounces++;
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
        alert('right player lost');
        window.location.reload();
      }

      if (ball.x <= ball.width/2){
        loop.stop();
        alert('left player lost');
        window.location.reload();
      }

      if (ballSpeed > speedBoundary){
        ballSpeed = speedBoundary;
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
        platformLeft.y = 512 - platformLeft.height/2;
      }

      if (platformLeft.y < platformLeft.height/2){
        platformLeft.y = platformLeft.height/2;
      }

      if (platformRight.y > 512 - platformRight.height/2){
        platformRight.y = 512 - platformRight.height/2;
      }

      if (platformRight.y < platformRight.height/2){
        platformRight.y = platformRight.height/2;
      }

      scene.update();
    },
    render: function() {

      scene.render();
    }
  });

  loop.start();

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

})();
