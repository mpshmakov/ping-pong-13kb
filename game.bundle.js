(() => {
  // lib/kontra.min.mjs
  var noop = () => {
  };
  var srOnlyStyle = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);";
  function addToDom(t, e) {
    let i = e.parentNode;
    if (t.setAttribute("data-kontra", ""), i) {
      let s = i.querySelector("[data-kontra]:last-of-type") || e;
      i.insertBefore(t, s.nextSibling);
    } else
      document.body.appendChild(t);
  }
  function removeFromArray(t, e) {
    let i = t.indexOf(e);
    if (i != -1)
      return t.splice(i, 1), true;
  }
  var canvasEl;
  var context;
  var callbacks$2 = {};
  function on(t, e) {
    callbacks$2[t] = callbacks$2[t] || [], callbacks$2[t].push(e);
  }
  function off(t, e) {
    callbacks$2[t] = (callbacks$2[t] || []).filter((t2) => t2 != e);
  }
  function emit(t, ...e) {
    (callbacks$2[t] || []).map((t2) => t2(...e));
  }
  var handler$1 = { get: (t, e) => e == "_proxy" || noop };
  function getContext() {
    return context;
  }
  function init$1(t, { contextless: e = false } = {}) {
    if (canvasEl = document.getElementById(t) || t || document.querySelector("canvas"), e && (canvasEl = canvasEl || new Proxy({}, handler$1)), !canvasEl)
      throw Error("You must provide a canvas element for the game");
    return context = canvasEl.getContext("2d") || new Proxy({}, handler$1), context.imageSmoothingEnabled = false, emit("init"), { canvas: canvasEl, context };
  }
  function rotatePoint(t, e) {
    let i = Math.sin(e), s = Math.cos(e);
    return { x: t.x * s - t.y * i, y: t.x * i + t.y * s };
  }
  function clamp(t, e, i) {
    return Math.min(Math.max(t, i), e);
  }
  function collides(t, e) {
    return [t, e] = [t, e].map((t2) => getWorldRect(t2)), t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y;
  }
  function getWorldRect(t) {
    let { x: e = 0, y: i = 0, width: s, height: a } = t.world || t;
    return t.mapwidth && (s = t.mapwidth, a = t.mapheight), t.anchor && (e -= s * t.anchor.x, i -= a * t.anchor.y), s < 0 && (e += s, s *= -1), a < 0 && (i += a, a *= -1), { x: e, y: i, width: s, height: a };
  }
  var Vector = class {
    constructor(t = 0, e = 0, i = {}) {
      t.x != null ? (this.x = t.x, this.y = t.y) : (this.x = t, this.y = e), i._c && (this.clamp(i._a, i._b, i._d, i._e), this.x = t, this.y = e);
    }
    set(t) {
      this.x = t.x, this.y = t.y;
    }
    add(t) {
      return new Vector(this.x + t.x, this.y + t.y, this);
    }
    subtract(t) {
      return new Vector(this.x - t.x, this.y - t.y, this);
    }
    scale(t) {
      return new Vector(this.x * t, this.y * t);
    }
    normalize(t = this.length() || 1) {
      return new Vector(this.x / t, this.y / t);
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    length() {
      return Math.hypot(this.x, this.y);
    }
    distance(t) {
      return Math.hypot(this.x - t.x, this.y - t.y);
    }
    angle(t) {
      return Math.acos(this.dot(t) / (this.length() * t.length()));
    }
    direction() {
      return Math.atan2(this.y, this.x);
    }
    clamp(t, e, i, s) {
      this._c = true, this._a = t, this._b = e, this._d = i, this._e = s;
    }
    get x() {
      return this._x;
    }
    get y() {
      return this._y;
    }
    set x(t) {
      this._x = this._c ? clamp(this._a, this._d, t) : t;
    }
    set y(t) {
      this._y = this._c ? clamp(this._b, this._e, t) : t;
    }
  };
  function factory$a() {
    return new Vector(...arguments);
  }
  var Updatable = class {
    constructor(t) {
      return this.init(t);
    }
    init(t = {}) {
      this.position = factory$a(), this.velocity = factory$a(), this.acceleration = factory$a(), this.ttl = 1 / 0, Object.assign(this, t);
    }
    update(t) {
      this.advance(t);
    }
    advance(t) {
      let e = this.acceleration;
      t && (e = e.scale(t)), this.velocity = this.velocity.add(e);
      let i = this.velocity;
      t && (i = i.scale(t)), this.position = this.position.add(i), this._pc(), this.ttl--;
    }
    get dx() {
      return this.velocity.x;
    }
    get dy() {
      return this.velocity.y;
    }
    set dx(t) {
      this.velocity.x = t;
    }
    set dy(t) {
      this.velocity.y = t;
    }
    get ddx() {
      return this.acceleration.x;
    }
    get ddy() {
      return this.acceleration.y;
    }
    set ddx(t) {
      this.acceleration.x = t;
    }
    set ddy(t) {
      this.acceleration.y = t;
    }
    isAlive() {
      return this.ttl > 0;
    }
    _pc() {
    }
  };
  var GameObject = class extends Updatable {
    init({ width: t = 0, height: e = 0, context: i = getContext(), render: s = this.draw, update: a = this.advance, children: n = [], anchor: o = { x: 0, y: 0 }, opacity: r = 1, rotation: h = 0, scaleX: l = 1, scaleY: d = 1, ...c } = {}) {
      this._c = [], super.init({ width: t, height: e, context: i, anchor: o, opacity: r, rotation: h, scaleX: l, scaleY: d, ...c }), this._di = true, this._uw(), this.addChild(n), this._rf = s, this._uf = a, on("init", () => {
        this.context ??= getContext();
      });
    }
    update(t) {
      this._uf(t), this.children.map((e) => e.update && e.update(t));
    }
    render() {
      let t = this.context;
      t.save(), (this.x || this.y) && t.translate(this.x, this.y), this.rotation && t.rotate(this.rotation), this.scaleX == 1 && this.scaleY == 1 || t.scale(this.scaleX, this.scaleY);
      let e = -this.width * this.anchor.x, i = -this.height * this.anchor.y;
      (e || i) && t.translate(e, i), this.context.globalAlpha = this.opacity, this._rf(), (e || i) && t.translate(-e, -i), this.children.map((t2) => t2.render && t2.render()), t.restore();
    }
    draw() {
    }
    _pc() {
      this._uw(), this.children.map((t) => t._pc());
    }
    get x() {
      return this.position.x;
    }
    get y() {
      return this.position.y;
    }
    set x(t) {
      this.position.x = t, this._pc();
    }
    set y(t) {
      this.position.y = t, this._pc();
    }
    get width() {
      return this._w;
    }
    set width(t) {
      this._w = t, this._pc();
    }
    get height() {
      return this._h;
    }
    set height(t) {
      this._h = t, this._pc();
    }
    _uw() {
      if (!this._di)
        return;
      let { _wx: t = 0, _wy: e = 0, _wo: i = 1, _wr: s = 0, _wsx: a = 1, _wsy: n = 1 } = this.parent || {};
      this._wx = this.x, this._wy = this.y, this._ww = this.width, this._wh = this.height, this._wo = i * this.opacity, this._wsx = a * this.scaleX, this._wsy = n * this.scaleY, this._wx = this._wx * a, this._wy = this._wy * n, this._ww = this.width * this._wsx, this._wh = this.height * this._wsy, this._wr = s + this.rotation;
      let { x: o, y: r } = rotatePoint({ x: this._wx, y: this._wy }, s);
      this._wx = o, this._wy = r, this._wx += t, this._wy += e;
    }
    get world() {
      return { x: this._wx, y: this._wy, width: this._ww, height: this._wh, opacity: this._wo, rotation: this._wr, scaleX: this._wsx, scaleY: this._wsy };
    }
    set children(t) {
      this.removeChild(this._c), this.addChild(t);
    }
    get children() {
      return this._c;
    }
    addChild(...t) {
      t.flat().map((t2) => {
        this.children.push(t2), t2.parent = this, t2._pc = t2._pc || noop, t2._pc();
      });
    }
    removeChild(...t) {
      t.flat().map((t2) => {
        removeFromArray(this.children, t2) && (t2.parent = null, t2._pc());
      });
    }
    get opacity() {
      return this._opa;
    }
    set opacity(t) {
      this._opa = clamp(0, 1, t), this._pc();
    }
    get rotation() {
      return this._rot;
    }
    set rotation(t) {
      this._rot = t, this._pc();
    }
    setScale(t, e = t) {
      this.scaleX = t, this.scaleY = e;
    }
    get scaleX() {
      return this._scx;
    }
    set scaleX(t) {
      this._scx = t, this._pc();
    }
    get scaleY() {
      return this._scy;
    }
    set scaleY(t) {
      this._scy = t, this._pc();
    }
  };
  var Sprite = class extends GameObject {
    init({ image: t, width: e = t ? t.width : void 0, height: i = t ? t.height : void 0, ...s } = {}) {
      super.init({ image: t, width: e, height: i, ...s });
    }
    get animations() {
      return this._a;
    }
    set animations(t) {
      let e, i;
      for (e in this._a = {}, t)
        this._a[e] = t[e].clone(), i = i || this._a[e];
      this.currentAnimation = i, this.width = this.width || i.width, this.height = this.height || i.height;
    }
    playAnimation(t) {
      this.currentAnimation?.stop(), this.currentAnimation = this.animations[t], this.currentAnimation.start();
    }
    advance(t) {
      super.advance(t), this.currentAnimation?.update(t);
    }
    draw() {
      this.image && this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height), this.currentAnimation && this.currentAnimation.render({ x: 0, y: 0, width: this.width, height: this.height, context: this.context }), this.color && (this.context.fillStyle = this.color, this.context.fillRect(0, 0, this.width, this.height));
    }
  };
  function factory$8() {
    return new Sprite(...arguments);
  }
  function clear(t) {
    let e = t.canvas;
    t.clearRect(0, 0, e.width, e.height);
  }
  function GameLoop({ fps: t = 60, clearCanvas: e = true, update: i = noop, render: s, context: a = getContext(), blur: n = false } = {}) {
    if (!s)
      throw Error("You must provide a render() function");
    let o, r, h, l, d, c = 0, u = 1e3 / t, p = 1 / t, g = e ? clear : noop, f = true;
    function m() {
      if (r = requestAnimationFrame(m), f && (h = performance.now(), l = h - o, o = h, !(l > 1e3))) {
        for (emit("tick"), c += l; c >= u; )
          d.update(p), c -= u;
        g(d.context), d.render();
      }
    }
    return n || (window.addEventListener("focus", () => {
      f = true;
    }), window.addEventListener("blur", () => {
      f = false;
    })), on("init", () => {
      d.context ??= getContext();
    }), d = { update: i, render: s, isStopped: true, context: a, start() {
      o = performance.now(), this.isStopped = false, requestAnimationFrame(m);
    }, stop() {
      this.isStopped = true, cancelAnimationFrame(r);
    }, _frame: m, set _last(t2) {
      o = t2;
    } }, d;
  }
  var keydownCallbacks = {};
  var keyupCallbacks = {};
  var pressedKeys = {};
  var keyMap = { Enter: "enter", Escape: "esc", Space: "space", ArrowLeft: "arrowleft", ArrowUp: "arrowup", ArrowRight: "arrowright", ArrowDown: "arrowdown" };
  function call(t = noop, e) {
    t._pd && e.preventDefault(), t(e);
  }
  function keydownEventHandler(t) {
    let e = keyMap[t.code], i = keydownCallbacks[e];
    pressedKeys[e] = true, call(i, t);
  }
  function keyupEventHandler(t) {
    let e = keyMap[t.code], i = keyupCallbacks[e];
    pressedKeys[e] = false, call(i, t);
  }
  function blurEventHandler() {
    pressedKeys = {};
  }
  function initKeys() {
    let t;
    for (t = 0; t < 26; t++)
      keyMap["Key" + String.fromCharCode(t + 65)] = String.fromCharCode(t + 97);
    for (t = 0; t < 10; t++)
      keyMap["Digit" + t] = keyMap["Numpad" + t] = "" + t;
    window.addEventListener("keydown", keydownEventHandler), window.addEventListener("keyup", keyupEventHandler), window.addEventListener("blur", blurEventHandler);
  }
  function keyPressed(t) {
    return !![].concat(t).some((t2) => pressedKeys[t2]);
  }
  function getAllNodes(t) {
    let e = [];
    return t._dn ? e.push(t._dn) : t.children && t.children.map((t2) => {
      e = e.concat(getAllNodes(t2));
    }), e;
  }
  var Scene = class {
    constructor({ id: t, name: e = t, objects: i = [], context: s = getContext(), cullObjects: a = true, cullFunction: n = collides, sortFunction: o, ...r }) {
      this._o = [], Object.assign(this, { id: t, name: e, context: s, cullObjects: a, cullFunction: n, sortFunction: o, ...r });
      let h = this._dn = document.createElement("section");
      h.tabIndex = -1, h.style = srOnlyStyle, h.id = t, h.setAttribute("aria-label", e);
      let l = this;
      this.camera = new class extends GameObject {
        set x(t2) {
          l.sx = t2 - this.centerX, super.x = t2;
        }
        get x() {
          return super.x;
        }
        set y(t2) {
          l.sy = t2 - this.centerY, super.y = t2;
        }
        get y() {
          return super.y;
        }
      }({ context: s, anchor: { x: 0.5, y: 0.5 }, render: this._rf.bind(this) }), this.add(i), this._i = () => {
        this.context ??= getContext();
        let t2 = this.context.canvas, { width: e2, height: i2 } = t2, s2 = e2 / 2, a2 = i2 / 2;
        Object.assign(this.camera, { centerX: s2, centerY: a2, x: s2, y: a2, width: e2, height: i2 }), this._dn.isConnected || addToDom(this._dn, t2);
      }, this.context && this._i(), on("init", this._i);
    }
    set objects(t) {
      this.remove(this._o), this.add(t);
    }
    get objects() {
      return this._o;
    }
    add(...t) {
      t.flat().map((t2) => {
        this._o.push(t2), t2.parent = this, getAllNodes(t2).map((t3) => {
          this._dn.appendChild(t3);
        });
      });
    }
    remove(...t) {
      t.flat().map((t2) => {
        removeFromArray(this._o, t2), t2.parent = null, getAllNodes(t2).map((t3) => {
          addToDom(t3, this.context);
        });
      });
    }
    show() {
      this.hidden = this._dn.hidden = false;
      let t = this._o.find((t2) => t2.focus);
      t ? t.focus() : this._dn.focus(), this.onShow();
    }
    hide() {
      this.hidden = this._dn.hidden = true, this.onHide();
    }
    destroy() {
      off("init", this._i), this._dn.remove(), this._o.map((t) => t.destroy && t.destroy());
    }
    lookAt(t) {
      let { x: e, y: i } = t.world || t;
      this.camera.x = e, this.camera.y = i;
    }
    update(t) {
      this.hidden || this._o.map((e) => e.update && e.update(t));
    }
    _rf() {
      let { _o: t, context: e, _sx: i, _sy: s, camera: a, sortFunction: n, cullObjects: o, cullFunction: r } = this;
      e.translate(i, s);
      let h = t;
      o && (h = h.filter((t2) => r(a, t2))), n && h.sort(n), h.map((t2) => t2.render && t2.render());
    }
    render() {
      if (!this.hidden) {
        let { context: t, camera: e } = this, { x: i, y: s, centerX: a, centerY: n } = e;
        t.save(), this._sx = a - i, this._sy = n - s, t.translate(this._sx, this._sy), e.render(), t.restore();
      }
    }
    onShow() {
    }
    onHide() {
    }
  };
  function factory$2() {
    return new Scene(...arguments);
  }

  // src/game.js
  var { canvas, context: context2 } = init$1();
  initKeys();
  var platformSpeed = 2.5;
  var ballSpeed = 3.5;
  var platformLeft = factory$8({
    anchor: { x: 0.5, y: 0.5 },
    width: 26,
    height: 110,
    x: 13,
    y: 256,
    color: "white"
  });
  var platformRight = factory$8({
    anchor: { x: 0.5, y: 0.5 },
    width: 26,
    height: 110,
    x: 499,
    y: 256,
    color: "white"
  });
  var ball = factory$8({
    anchor: { x: 0.5, y: 0.5 },
    width: 14,
    height: 14,
    x: 256,
    y: 320,
    color: "white"
  });
  var background = factory$8({
    width: 512,
    height: 512,
    x: 0,
    y: 0,
    color: "darkgray"
  });
  var scene = factory$2({
    id: "main",
    objects: [background, platformLeft, platformRight, ball]
  });
  var menuloop = GameLoop({
    update: function() {
      if (keyPressed("space")) {
        menuloop.stop();
      }
    },
    render: function() {
    }
  });
  var loop = GameLoop({
    update: function(dt) {
      console.log("update");
      if (keyPressed("space")) {
        console.log("time ");
        ball.dx = ballSpeed;
        ball.dy = ballSpeed;
      }
      if (collides(platformLeft, ball)) {
        ball.dx = -ball.dx;
      }
      if (collides(platformRight, ball)) {
        ball.dx = -ball.dx;
      }
      if (ball.y <= ball.height / 2) {
        ball.dy = -ball.dy;
      }
      if (ball.y >= 512 - ball.height / 2) {
        ball.dy = -ball.dy;
      }
      if (ball.x >= 512 - ball.width / 2) {
        loop.stop();
        alert("right player lost");
        window.location.reload;
      }
      if (ball.x <= ball.width / 2) {
        loop.stop();
        alert("left player lost");
        window.location.reload;
      }
      if (keyPressed("w")) {
        platformLeft.y -= platformSpeed;
      }
      if (keyPressed("s")) {
        platformLeft.y += platformSpeed;
      }
      if (keyPressed("i")) {
        platformRight.y -= platformSpeed;
      }
      if (keyPressed("k")) {
        platformRight.y += platformSpeed;
      }
      if (platformLeft.y > 512 - platformLeft.height / 2) {
        platformLeft.y = 512 - platformLeft.height / 2;
      }
      if (platformLeft.y < platformLeft.height / 2) {
        platformLeft.y = platformLeft.height / 2;
      }
      if (platformRight.y > 512 - platformRight.height / 2) {
        platformRight.y = 512 - platformRight.height / 2;
      }
      if (platformRight.y < platformRight.height / 2) {
        platformRight.y = platformRight.height / 2;
      }
      scene.update();
    },
    render: function() {
      scene.render();
    }
  });
  loop.start();
})();
/**
 * @preserve
 * Kontra.js v9.0.0
 */
