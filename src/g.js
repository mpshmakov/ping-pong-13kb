!function(){"use strict";
/**
   * @preserve
   * Kontra.js v9.0.0
   */let t=()=>{};function i(t,i){let e=i.parentNode;if(t.setAttribute("data-kontra",""),e){let s=e.querySelector("[data-kontra]:last-of-type")||i;e.insertBefore(t,s.nextSibling)}else document.body.appendChild(t)}function e(t,i){let e=t.indexOf(i);if(-1!=e)return t.splice(e,1),!0}let s,h,n={};function r(t,i){n[t]=n[t]||[],n[t].push(i)}function o(t,...i){(n[t]||[]).map((t=>t(...i)))}let a={get:(i,e)=>"_proxy"==e||t};function c(){return h}function d(t,i){return Math.atan2(i.y-t.y,i.x-t.x)}function l(t,i,e){return Math.min(Math.max(t,e),i)}function u(t,i){return[t,i]=[t,i].map((t=>function(t){let{x:i=0,y:e=0,width:s,height:h}=t.world||t;return t.mapwidth&&(s=t.mapwidth,h=t.mapheight),t.anchor&&(i-=s*t.anchor.x,e-=h*t.anchor.y),s<0&&(i+=s,s*=-1),h<0&&(e+=h,h*=-1),{x:i,y:e,width:s,height:h}}(t))),t.x<i.x+i.width&&t.x+t.width>i.x&&t.y<i.y+i.height&&t.y+t.height>i.y}class _{constructor(t=0,i=0,e={}){null!=t.x?(this.x=t.x,this.y=t.y):(this.x=t,this.y=i),e._c&&(this.clamp(e._a,e._b,e._d,e._e),this.x=t,this.y=i)}set(t){this.x=t.x,this.y=t.y}add(t){return new _(this.x+t.x,this.y+t.y,this)}subtract(t){return new _(this.x-t.x,this.y-t.y,this)}scale(t){return new _(this.x*t,this.y*t)}normalize(t=this.length()||1){return new _(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}direction(){return Math.atan2(this.y,this.x)}clamp(t,i,e,s){this._c=!0,this._a=t,this._b=i,this._d=e,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?l(this._a,this._d,t):t}set y(t){this._y=this._c?l(this._b,this._e,t):t}}function x(){return new _(...arguments)}class w{constructor(t){return this.init(t)}init(t={}){this.position=x(),this.velocity=x(),this.acceleration=x(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let i=this.acceleration;t&&(i=i.scale(t)),this.velocity=this.velocity.add(i);let e=this.velocity;t&&(e=e.scale(t)),this.position=this.position.add(e),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}class y extends w{init({width:t=0,height:i=0,context:e=c(),render:s=this.draw,update:h=this.advance,children:n=[],anchor:o={x:0,y:0},opacity:a=1,rotation:d=0,scaleX:l=1,scaleY:u=1,..._}={}){this._c=[],super.init({width:t,height:i,context:e,anchor:o,opacity:a,rotation:d,scaleX:l,scaleY:u,..._}),this._di=!0,this._uw(),this.addChild(n),this._rf=s,this._uf=h,r("init",(()=>{this.context??=c()}))}update(t){this._uf(t),this.children.map((i=>i.update&&i.update(t)))}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),1==this.scaleX&&1==this.scaleY||t.scale(this.scaleX,this.scaleY);let i=-this.width*this.anchor.x,e=-this.height*this.anchor.y;(i||e)&&t.translate(i,e),this.context.globalAlpha=this.opacity,this._rf(),(i||e)&&t.translate(-i,-e),this.children.map((t=>t.render&&t.render())),t.restore()}draw(){}_pc(){this._uw(),this.children.map((t=>t._pc()))}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:i=0,_wo:e=1,_wr:s=0,_wsx:h=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=e*this.opacity,this._wsx=h*this.scaleX,this._wsy=n*this.scaleY,this._wx=this._wx*h,this._wy=this._wy*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wr=s+this.rotation;let{x:r,y:o}=function(t,i){let e=Math.sin(i),s=Math.cos(i);return{x:t.x*s-t.y*e,y:t.x*e+t.y*s}}({x:this._wx,y:this._wy},s);this._wx=r,this._wy=o,this._wx+=t,this._wy+=i}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t)}get children(){return this._c}addChild(...i){i.flat().map((i=>{this.children.push(i),i.parent=this,i._pc=i._pc||t,i._pc()}))}removeChild(...t){t.flat().map((t=>{e(this.children,t)&&(t.parent=null,t._pc())}))}get opacity(){return this._opa}set opacity(t){this._opa=l(0,1,t),this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,i=t){this.scaleX=t,this.scaleY=i}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}class p extends y{init({image:t,width:i=(t?t.width:void 0),height:e=(t?t.height:void 0),...s}={}){super.init({image:t,width:i,height:e,...s})}get animations(){return this._a}set animations(t){let i,e;for(i in this._a={},t)this._a[i]=t[i].clone(),e=e||this._a[i];this.currentAnimation=e,this.width=this.width||e.width,this.height=this.height||e.height}playAnimation(t){this.currentAnimation?.stop(),this.currentAnimation=this.animations[t],this.currentAnimation.start()}advance(t){super.advance(t),this.currentAnimation?.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}}function g(){return new p(...arguments)}let f=/(\d+)(\w+)/;class m extends y{init({text:t="",textAlign:i="",lineHeight:e=1,font:s=c()?.font,...h}={}){t=""+t,super.init({text:t,textAlign:i,lineHeight:e,font:s,...h}),this.context&&this._p(),r("init",(()=>{this.font??=c().font,this._p()}))}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=""+t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=function(t){if(!t)return{computed:0};let i=t.match(f),e=+i[1];return{size:e,unit:i[2],computed:e}}(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context,i=[this.text];if(t.font=this.font,i=this.text.split("\n"),this._fw&&i.map((i=>{let e=i.split(" "),s=e.shift(),h=s;e.map((i=>{h+=" "+i,t.measureText(h).width>this._fw&&(this._s.push(s),h=i),s=h})),this._s.push(h)})),!this._s.length&&this.text.includes("\n")){let e=0;i.map((i=>{this._s.push(i),e=Math.max(e,t.measureText(i).width)})),this._w=this._fw||e}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,i=this.textAlign,e=this.context;i=this.textAlign||("rtl"==e.canvas.dir?"right":"left"),t="right"==i?this.width:"center"==i?this.width/2|0:0,this._s.map(((s,h)=>{e.textBaseline="top",e.textAlign=i,e.fillStyle=this.color,e.font=this.font,this.strokeColor&&(e.strokeStyle=this.strokeColor,e.lineWidth=this.lineWidth??1,e.strokeText(s,t,this._fs*this.lineHeight*h)),e.fillText(s,t,this._fs*this.lineHeight*h)}))}}function v(t){let i=t.canvas;t.clearRect(0,0,i.width,i.height)}let A={},b={},C={},S={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function Y(i=t,e){i._pd&&e.preventDefault(),i(e)}function k(t){let i=S[t.code],e=A[i];C[i]=!0,Y(e,t)}function E(t){let i=S[t.code],e=b[i];C[i]=!1,Y(e,t)}function M(){C={}}function X(t){return!![].concat(t).some((t=>C[t]))}function j(t){let i=[];return t._dn?i.push(t._dn):t.children&&t.children.map((t=>{i=i.concat(j(t))})),i}class F{constructor({id:t,name:e=t,objects:s=[],context:h=c(),cullObjects:n=!0,cullFunction:o=u,sortFunction:a,...d}){this._o=[],Object.assign(this,{id:t,name:e,context:h,cullObjects:n,cullFunction:o,sortFunction:a,...d});let l=this._dn=document.createElement("section");l.tabIndex=-1,l.style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);",l.id=t,l.setAttribute("aria-label",e);let _=this;this.camera=new class extends y{set x(t){_.sx=t-this.centerX,super.x=t}get x(){return super.x}set y(t){_.sy=t-this.centerY,super.y=t}get y(){return super.y}}({context:h,anchor:{x:.5,y:.5},render:this._rf.bind(this)}),this.add(s),this._i=()=>{this.context??=c();let t=this.context.canvas,{width:e,height:s}=t,h=e/2,n=s/2;Object.assign(this.camera,{centerX:h,centerY:n,x:h,y:n,width:e,height:s}),this._dn.isConnected||i(this._dn,t)},this.context&&this._i(),r("init",this._i)}set objects(t){this.remove(this._o),this.add(t)}get objects(){return this._o}add(...t){t.flat().map((t=>{this._o.push(t),t.parent=this,j(t).map((t=>{this._dn.appendChild(t)}))}))}remove(...t){t.flat().map((t=>{e(this._o,t),t.parent=null,j(t).map((t=>{i(t,this.context)}))}))}show(){this.hidden=this._dn.hidden=!1;let t=this._o.find((t=>t.focus));t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}destroy(){var t,i;t="init",i=this._i,n[t]=(n[t]||[]).filter((t=>t!=i)),this._dn.remove(),this._o.map((t=>t.destroy&&t.destroy()))}lookAt(t){let{x:i,y:e}=t.world||t;this.camera.x=i,this.camera.y=e}update(t){this.hidden||this._o.map((i=>i.update&&i.update(t)))}_rf(){let{_o:t,context:i,_sx:e,_sy:s,camera:h,sortFunction:n,cullObjects:r,cullFunction:o}=this;i.translate(e,s);let a=t;r&&(a=a.filter((t=>o(h,t)))),n&&a.sort(n),a.map((t=>t.render&&t.render()))}render(){if(!this.hidden){let{context:t,camera:i}=this,{x:e,y:s,centerX:h,centerY:n}=i;t.save(),this._sx=h-e,this._sy=n-s,t.translate(this._sx,this._sy),i.render(),t.restore()}}onShow(){}onHide(){}}!function(t,{contextless:i=!1}={}){if(s=document.getElementById(t)||t||document.querySelector("canvas"),i&&(s=s||new Proxy({},a)),!s)throw Error("You must provide a canvas element for the game");h=s.getContext("2d")||new Proxy({},a),h.imageSmoothingEnabled=!1,o("init")}(),function(){let t;for(t=0;t<26;t++)S["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)S["Digit"+t]=S["Numpad"+t]=""+t;window.addEventListener("keydown",k),window.addEventListener("keyup",E),window.addEventListener("blur",M)}();let H=2.5,O=4,L=0,T=!1,q=!1,B="left",D=0,I=g({anchor:{x:.5,y:.5},width:26,height:110,x:13,y:256,color:"white"}),P=g({anchor:{x:.5,y:.5},width:26,height:110,x:499,y:256,color:"white"}),R=g({anchor:{x:.5,y:.5},width:14,height:14,x:256,y:320,color:"white"}),z=function(){return new m(...arguments)}({text:"SPACE to start\nw,s - left\ni,k - right",font:"40px Arial",color:"white",x:256,y:256,anchor:{x:.5,y:.5},textAlign:"center"}),N=function(){return new F(...arguments)}({id:"main",objects:[g({width:512,height:512,x:0,y:0,color:"darkgray"}),z,I,P,R]});const W=function({fps:i=60,clearCanvas:e=!0,update:s=t,render:h,context:n=c(),blur:a=!1}={}){if(!h)throw Error("You must provide a render() function");let d,l,u,_,x,w=0,y=1e3/i,p=1/i,g=e?v:t,f=!0;function m(){if(l=requestAnimationFrame(m),f&&(u=performance.now(),_=u-d,d=u,!(_>1e3))){for(o("tick"),w+=_;w>=y;)x.update(p),w-=y;g(x.context),x.render()}}return a||(window.addEventListener("focus",(()=>{f=!0})),window.addEventListener("blur",(()=>{f=!1}))),r("init",(()=>{x.context??=c()})),x={update:s,render:h,isStopped:!0,context:n,start(){d=performance.now(),this.isStopped=!1,requestAnimationFrame(m)},stop(){this.isStopped=!0,cancelAnimationFrame(l)},_frame:m,set _last(t){d=t}},x}({update:function(t){1==T&&"left"==B&&(console.log("right collided entered"),H+=L/20,O+=L/20,D+=1,z.text=D,q=!1,T=!1,B="right"),1==q&&"right"==B&&(console.log("left collided entered"),H+=L/20,O+=L/20,D+=1,z.text=D,T=!1,q=!1,B="left"),X("space")&&(console.log("time "),z.text=0,z.color="gray",R.dx=O),u(I,R)&&(K("left"),L++,q=!0),u(P,R)&&(K("right"),L++,T=!0),R.y<=R.height/2&&(R.dy=-R.dy),R.y>=512-R.height/2&&(R.dy=-R.dy),R.x>=512-R.width/2&&(W.stop(),alert("right player lost"),window.location.reload()),R.x<=R.width/2&&(W.stop(),alert("left player lost"),window.location.reload()),X("w")&&(I.y-=H),X("s")&&(I.y+=H),X("i")&&(P.y-=H),X("k")&&(P.y+=H),I.y>512-I.height/2&&(I.y=512-I.height/2),I.y<I.height/2&&(I.y=I.height/2),P.y>512-P.height/2&&(P.y=512-P.height/2),P.y<P.height/2&&(P.y=P.height/2),N.update()},render:function(){N.render()}});function K(t){let i;"left"==t&&(i=d(I,R)),"right"==t&&(i=d(P,R));let e=O*Math.cos(i),s=O*Math.sin(i);console.log("x speed",e),console.log("y speed",s),R.dx=e,R.dy=s}W.start()}();