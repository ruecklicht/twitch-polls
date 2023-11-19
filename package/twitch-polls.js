function Ss(e, t) {
  const s = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let i = 0; i < n.length; i++)
    s[n[i]] = !0;
  return t ? (i) => !!s[i.toLowerCase()] : (i) => !!s[i];
}
const q = {}, st = [], we = () => {
}, no = () => !1, io = /^on[^a-z]/, zt = (e) => io.test(e), Ls = (e) => e.startsWith("onUpdate:"), re = Object.assign, js = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, oo = Object.prototype.hasOwnProperty, U = (e, t) => oo.call(e, t), L = Array.isArray, nt = (e) => Qt(e) === "[object Map]", Zn = (e) => Qt(e) === "[object Set]", F = (e) => typeof e == "function", te = (e) => typeof e == "string", qt = (e) => typeof e == "symbol", Y = (e) => e !== null && typeof e == "object", Gn = (e) => (Y(e) || F(e)) && F(e.then) && F(e.catch), ei = Object.prototype.toString, Qt = (e) => ei.call(e), ro = (e) => Qt(e).slice(8, -1), ti = (e) => Qt(e) === "[object Object]", Fs = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ft = /* @__PURE__ */ Ss(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Yt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, lo = /-(\w)/g, Ie = Yt((e) => e.replace(lo, (t, s) => s ? s.toUpperCase() : "")), co = /\B([A-Z])/g, at = Yt(
  (e) => e.replace(co, "-$1").toLowerCase()
), Xt = Yt((e) => e.charAt(0).toUpperCase() + e.slice(1)), fs = Yt((e) => e ? `on${Xt(e)}` : ""), rt = (e, t) => !Object.is(e, t), us = (e, t) => {
  for (let s = 0; s < e.length; s++)
    e[s](t);
}, Wt = (e, t, s) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: s
  });
}, ao = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let rn;
const vs = () => rn || (rn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Zt(e) {
  if (L(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = te(n) ? po(n) : Zt(n);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (te(e) || Y(e))
    return e;
}
const fo = /;(?![^(]*\))/g, uo = /:([^]+)/, ho = /\/\*[^]*?\*\//g;
function po(e) {
  const t = {};
  return e.replace(ho, "").split(fo).forEach((s) => {
    if (s) {
      const n = s.split(uo);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Pt(e) {
  let t = "";
  if (te(e))
    t = e;
  else if (L(e))
    for (let s = 0; s < e.length; s++) {
      const n = Pt(e[s]);
      n && (t += n + " ");
    }
  else if (Y(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const mo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _o = /* @__PURE__ */ Ss(mo);
function si(e) {
  return !!e || e === "";
}
const mt = (e) => te(e) ? e : e == null ? "" : L(e) || Y(e) && (e.toString === ei || !F(e.toString)) ? JSON.stringify(e, ni, 2) : String(e), ni = (e, t) => t && t.__v_isRef ? ni(e, t.value) : nt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((s, [n, i]) => (s[`${n} =>`] = i, s), {})
} : Zn(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : Y(t) && !L(t) && !ti(t) ? String(t) : t;
let _e;
class go {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = _e, !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = _e;
      try {
        return _e = this, t();
      } finally {
        _e = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    _e = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    _e = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function bo(e, t = _e) {
  t && t.active && t.effects.push(e);
}
function wo() {
  return _e;
}
const Ds = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, ii = (e) => (e.w & Ue) > 0, oi = (e) => (e.n & Ue) > 0, vo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ue;
}, yo = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let s = 0;
    for (let n = 0; n < t.length; n++) {
      const i = t[n];
      ii(i) && !oi(i) ? i.delete(e) : t[s++] = i, i.w &= ~Ue, i.n &= ~Ue;
    }
    t.length = s;
  }
}, ys = /* @__PURE__ */ new WeakMap();
let _t = 0, Ue = 1;
const Cs = 30;
let ge;
const Qe = Symbol(""), xs = Symbol("");
class Us {
  constructor(t, s = null, n) {
    this.fn = t, this.scheduler = s, this.active = !0, this.deps = [], this.parent = void 0, bo(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ge, s = je;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ge, ge = this, je = !0, Ue = 1 << ++_t, _t <= Cs ? vo(this) : ln(this), this.fn();
    } finally {
      _t <= Cs && yo(this), Ue = 1 << --_t, ge = this.parent, je = s, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ge === this ? this.deferStop = !0 : this.active && (ln(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ln(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++)
      t[s].delete(e);
    t.length = 0;
  }
}
let je = !0;
const ri = [];
function ft() {
  ri.push(je), je = !1;
}
function ut() {
  const e = ri.pop();
  je = e === void 0 ? !0 : e;
}
function ue(e, t, s) {
  if (je && ge) {
    let n = ys.get(e);
    n || ys.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || n.set(s, i = Ds()), li(i);
  }
}
function li(e, t) {
  let s = !1;
  _t <= Cs ? oi(e) || (e.n |= Ue, s = !ii(e)) : s = !e.has(ge), s && (e.add(ge), ge.deps.push(e));
}
function Re(e, t, s, n, i, o) {
  const r = ys.get(e);
  if (!r)
    return;
  let l = [];
  if (t === "clear")
    l = [...r.values()];
  else if (s === "length" && L(e)) {
    const a = Number(n);
    r.forEach((p, h) => {
      (h === "length" || !qt(h) && h >= a) && l.push(p);
    });
  } else
    switch (s !== void 0 && l.push(r.get(s)), t) {
      case "add":
        L(e) ? Fs(s) && l.push(r.get("length")) : (l.push(r.get(Qe)), nt(e) && l.push(r.get(xs)));
        break;
      case "delete":
        L(e) || (l.push(r.get(Qe)), nt(e) && l.push(r.get(xs)));
        break;
      case "set":
        nt(e) && l.push(r.get(Qe));
        break;
    }
  if (l.length === 1)
    l[0] && Es(l[0]);
  else {
    const a = [];
    for (const p of l)
      p && a.push(...p);
    Es(Ds(a));
  }
}
function Es(e, t) {
  const s = L(e) ? e : [...e];
  for (const n of s)
    n.computed && cn(n);
  for (const n of s)
    n.computed || cn(n);
}
function cn(e, t) {
  (e !== ge || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Co = /* @__PURE__ */ Ss("__proto__,__v_isRef,__isVue"), ci = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(qt)
), an = /* @__PURE__ */ xo();
function xo() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...s) {
      const n = W(this);
      for (let o = 0, r = this.length; o < r; o++)
        ue(n, "get", o + "");
      const i = n[t](...s);
      return i === -1 || i === !1 ? n[t](...s.map(W)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...s) {
      ft();
      const n = W(this)[t].apply(this, s);
      return ut(), n;
    };
  }), e;
}
function Eo(e) {
  const t = W(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
class ai {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._shallow = s;
  }
  get(t, s, n) {
    const i = this._isReadonly, o = this._shallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return o;
    if (s === "__v_raw" && n === (i ? o ? jo : di : o ? hi : ui).get(t))
      return t;
    const r = L(t);
    if (!i) {
      if (r && U(an, s))
        return Reflect.get(an, s, n);
      if (s === "hasOwnProperty")
        return Eo;
    }
    const l = Reflect.get(t, s, n);
    return (qt(s) ? ci.has(s) : Co(s)) || (i || ue(t, "get", s), o) ? l : ae(l) ? r && Fs(s) ? l : l.value : Y(l) ? i ? pi(l) : es(l) : l;
  }
}
class fi extends ai {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let o = t[s];
    if (vt(o) && ae(o) && !ae(n))
      return !1;
    if (!this._shallow && (!Ts(n) && !vt(n) && (o = W(o), n = W(n)), !L(t) && ae(o) && !ae(n)))
      return o.value = n, !0;
    const r = L(t) && Fs(s) ? Number(s) < t.length : U(t, s), l = Reflect.set(t, s, n, i);
    return t === W(i) && (r ? rt(n, o) && Re(t, "set", s, n) : Re(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = U(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && Re(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!qt(s) || !ci.has(s)) && ue(t, "has", s), n;
  }
  ownKeys(t) {
    return ue(
      t,
      "iterate",
      L(t) ? "length" : Qe
    ), Reflect.ownKeys(t);
  }
}
class To extends ai {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Oo = /* @__PURE__ */ new fi(), Po = /* @__PURE__ */ new To(), Io = /* @__PURE__ */ new fi(
  !0
), Hs = (e) => e, Gt = (e) => Reflect.getPrototypeOf(e);
function Rt(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const i = W(e), o = W(t);
  s || (rt(t, o) && ue(i, "get", t), ue(i, "get", o));
  const { has: r } = Gt(i), l = n ? Hs : s ? Vs : Ks;
  if (r.call(i, t))
    return l(e.get(t));
  if (r.call(i, o))
    return l(e.get(o));
  e !== i && e.get(t);
}
function Mt(e, t = !1) {
  const s = this.__v_raw, n = W(s), i = W(e);
  return t || (rt(e, i) && ue(n, "has", e), ue(n, "has", i)), e === i ? s.has(e) : s.has(e) || s.has(i);
}
function Nt(e, t = !1) {
  return e = e.__v_raw, !t && ue(W(e), "iterate", Qe), Reflect.get(e, "size", e);
}
function fn(e) {
  e = W(e);
  const t = W(this);
  return Gt(t).has.call(t, e) || (t.add(e), Re(t, "add", e, e)), this;
}
function un(e, t) {
  t = W(t);
  const s = W(this), { has: n, get: i } = Gt(s);
  let o = n.call(s, e);
  o || (e = W(e), o = n.call(s, e));
  const r = i.call(s, e);
  return s.set(e, t), o ? rt(t, r) && Re(s, "set", e, t) : Re(s, "add", e, t), this;
}
function hn(e) {
  const t = W(this), { has: s, get: n } = Gt(t);
  let i = s.call(t, e);
  i || (e = W(e), i = s.call(t, e)), n && n.call(t, e);
  const o = t.delete(e);
  return i && Re(t, "delete", e, void 0), o;
}
function dn() {
  const e = W(this), t = e.size !== 0, s = e.clear();
  return t && Re(e, "clear", void 0, void 0), s;
}
function kt(e, t) {
  return function(n, i) {
    const o = this, r = o.__v_raw, l = W(r), a = t ? Hs : e ? Vs : Ks;
    return !e && ue(l, "iterate", Qe), r.forEach((p, h) => n.call(i, a(p), a(h), o));
  };
}
function St(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, o = W(i), r = nt(o), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, p = i[e](...n), h = s ? Hs : t ? Vs : Ks;
    return !t && ue(
      o,
      "iterate",
      a ? xs : Qe
    ), {
      // iterator protocol
      next() {
        const { value: O, done: C } = p.next();
        return C ? { value: O, done: C } : {
          value: l ? [h(O[0]), h(O[1])] : h(O),
          done: C
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Se(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function $o() {
  const e = {
    get(o) {
      return Rt(this, o);
    },
    get size() {
      return Nt(this);
    },
    has: Mt,
    add: fn,
    set: un,
    delete: hn,
    clear: dn,
    forEach: kt(!1, !1)
  }, t = {
    get(o) {
      return Rt(this, o, !1, !0);
    },
    get size() {
      return Nt(this);
    },
    has: Mt,
    add: fn,
    set: un,
    delete: hn,
    clear: dn,
    forEach: kt(!1, !0)
  }, s = {
    get(o) {
      return Rt(this, o, !0);
    },
    get size() {
      return Nt(this, !0);
    },
    has(o) {
      return Mt.call(this, o, !0);
    },
    add: Se("add"),
    set: Se("set"),
    delete: Se("delete"),
    clear: Se("clear"),
    forEach: kt(!0, !1)
  }, n = {
    get(o) {
      return Rt(this, o, !0, !0);
    },
    get size() {
      return Nt(this, !0);
    },
    has(o) {
      return Mt.call(this, o, !0);
    },
    add: Se("add"),
    set: Se("set"),
    delete: Se("delete"),
    clear: Se("clear"),
    forEach: kt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = St(
      o,
      !1,
      !1
    ), s[o] = St(
      o,
      !0,
      !1
    ), t[o] = St(
      o,
      !1,
      !0
    ), n[o] = St(
      o,
      !0,
      !0
    );
  }), [
    e,
    s,
    t,
    n
  ];
}
const [
  Ao,
  Ro,
  Mo,
  No
] = /* @__PURE__ */ $o();
function Bs(e, t) {
  const s = t ? e ? No : Mo : e ? Ro : Ao;
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    U(s, i) && i in n ? s : n,
    i,
    o
  );
}
const ko = {
  get: /* @__PURE__ */ Bs(!1, !1)
}, So = {
  get: /* @__PURE__ */ Bs(!1, !0)
}, Lo = {
  get: /* @__PURE__ */ Bs(!0, !1)
}, ui = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), jo = /* @__PURE__ */ new WeakMap();
function Fo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Do(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Fo(ro(e));
}
function es(e) {
  return vt(e) ? e : Ws(
    e,
    !1,
    Oo,
    ko,
    ui
  );
}
function Uo(e) {
  return Ws(
    e,
    !1,
    Io,
    So,
    hi
  );
}
function pi(e) {
  return Ws(
    e,
    !0,
    Po,
    Lo,
    di
  );
}
function Ws(e, t, s, n, i) {
  if (!Y(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const r = Do(e);
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? n : s
  );
  return i.set(e, l), l;
}
function it(e) {
  return vt(e) ? it(e.__v_raw) : !!(e && e.__v_isReactive);
}
function vt(e) {
  return !!(e && e.__v_isReadonly);
}
function Ts(e) {
  return !!(e && e.__v_isShallow);
}
function mi(e) {
  return it(e) || vt(e);
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function _i(e) {
  return Wt(e, "__v_skip", !0), e;
}
const Ks = (e) => Y(e) ? es(e) : e, Vs = (e) => Y(e) ? pi(e) : e;
function Ho(e) {
  je && ge && (e = W(e), li(e.dep || (e.dep = Ds())));
}
function Bo(e, t) {
  e = W(e);
  const s = e.dep;
  s && Es(s);
}
function ae(e) {
  return !!(e && e.__v_isRef === !0);
}
function Wo(e) {
  return ae(e) ? e.value : e;
}
const Ko = {
  get: (e, t, s) => Wo(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return ae(i) && !ae(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function gi(e) {
  return it(e) ? e : new Proxy(e, Ko);
}
class Vo {
  constructor(t, s, n, i) {
    this._setter = s, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Us(t, () => {
      this._dirty || (this._dirty = !0, Bo(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = n;
  }
  get value() {
    const t = W(this);
    return Ho(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Jo(e, t, s = !1) {
  let n, i;
  const o = F(e);
  return o ? (n = e, i = we) : (n = e.get, i = e.set), new Vo(n, i, o || !i, s);
}
function Fe(e, t, s, n) {
  let i;
  try {
    i = n ? e(...n) : e();
  } catch (o) {
    ts(o, t, s);
  }
  return i;
}
function ve(e, t, s, n) {
  if (F(e)) {
    const o = Fe(e, t, s, n);
    return o && Gn(o) && o.catch((r) => {
      ts(r, t, s);
    }), o;
  }
  const i = [];
  for (let o = 0; o < e.length; o++)
    i.push(ve(e[o], t, s, n));
  return i;
}
function ts(e, t, s, n = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const r = t.proxy, l = s;
    for (; o; ) {
      const p = o.ec;
      if (p) {
        for (let h = 0; h < p.length; h++)
          if (p[h](e, r, l) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Fe(
        a,
        null,
        10,
        [e, r, l]
      );
      return;
    }
  }
  zo(e, s, i, n);
}
function zo(e, t, s, n = !0) {
  console.error(e);
}
let yt = !1, Os = !1;
const oe = [];
let Pe = 0;
const ot = [];
let Ae = null, Je = 0;
const bi = /* @__PURE__ */ Promise.resolve();
let Js = null;
function qo(e) {
  const t = Js || bi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Qo(e) {
  let t = Pe + 1, s = oe.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = oe[n], o = Ct(i);
    o < e || o === e && i.pre ? t = n + 1 : s = n;
  }
  return t;
}
function zs(e) {
  (!oe.length || !oe.includes(
    e,
    yt && e.allowRecurse ? Pe + 1 : Pe
  )) && (e.id == null ? oe.push(e) : oe.splice(Qo(e.id), 0, e), wi());
}
function wi() {
  !yt && !Os && (Os = !0, Js = bi.then(yi));
}
function Yo(e) {
  const t = oe.indexOf(e);
  t > Pe && oe.splice(t, 1);
}
function Xo(e) {
  L(e) ? ot.push(...e) : (!Ae || !Ae.includes(
    e,
    e.allowRecurse ? Je + 1 : Je
  )) && ot.push(e), wi();
}
function pn(e, t = yt ? Pe + 1 : 0) {
  for (; t < oe.length; t++) {
    const s = oe[t];
    s && s.pre && (oe.splice(t, 1), t--, s());
  }
}
function vi(e) {
  if (ot.length) {
    const t = [...new Set(ot)];
    if (ot.length = 0, Ae) {
      Ae.push(...t);
      return;
    }
    for (Ae = t, Ae.sort((s, n) => Ct(s) - Ct(n)), Je = 0; Je < Ae.length; Je++)
      Ae[Je]();
    Ae = null, Je = 0;
  }
}
const Ct = (e) => e.id == null ? 1 / 0 : e.id, Zo = (e, t) => {
  const s = Ct(e) - Ct(t);
  if (s === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return s;
};
function yi(e) {
  Os = !1, yt = !0, oe.sort(Zo);
  const t = we;
  try {
    for (Pe = 0; Pe < oe.length; Pe++) {
      const s = oe[Pe];
      s && s.active !== !1 && Fe(s, null, 14);
    }
  } finally {
    Pe = 0, oe.length = 0, vi(), yt = !1, Js = null, (oe.length || ot.length) && yi();
  }
}
function Go(e, t, ...s) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || q;
  let i = s;
  const o = t.startsWith("update:"), r = o && t.slice(7);
  if (r && r in n) {
    const h = `${r === "modelValue" ? "model" : r}Modifiers`, { number: O, trim: C } = n[h] || q;
    C && (i = s.map((I) => te(I) ? I.trim() : I)), O && (i = s.map(ao));
  }
  let l, a = n[l = fs(t)] || // also try camelCase event handler (#2249)
  n[l = fs(Ie(t))];
  !a && o && (a = n[l = fs(at(t))]), a && ve(
    a,
    e,
    6,
    i
  );
  const p = n[l + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, ve(
      p,
      e,
      6,
      i
    );
  }
}
function Ci(e, t, s = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, l = !1;
  if (!F(e)) {
    const a = (p) => {
      const h = Ci(p, t, !0);
      h && (l = !0, re(r, h));
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (Y(e) && n.set(e, null), null) : (L(o) ? o.forEach((a) => r[a] = null) : re(r, o), Y(e) && n.set(e, r), r);
}
function ss(e, t) {
  return !e || !zt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), U(e, t[0].toLowerCase() + t.slice(1)) || U(e, at(t)) || U(e, t));
}
let pe = null, xi = null;
function Kt(e) {
  const t = pe;
  return pe = e, xi = e && e.type.__scopeId || null, t;
}
function er(e, t = pe, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Tn(-1);
    const o = Kt(t);
    let r;
    try {
      r = e(...i);
    } finally {
      Kt(o), n._d && Tn(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function hs(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    props: o,
    propsOptions: [r],
    slots: l,
    attrs: a,
    emit: p,
    render: h,
    renderCache: O,
    data: C,
    setupState: I,
    ctx: d,
    inheritAttrs: u
  } = e;
  let _, k;
  const $ = Kt(e);
  try {
    if (s.shapeFlag & 4) {
      const b = i || n;
      _ = Oe(
        h.call(
          b,
          b,
          O,
          o,
          I,
          C,
          d
        )
      ), k = a;
    } else {
      const b = t;
      _ = Oe(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: l, emit: p }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), k = t.props ? a : tr(a);
    }
  } catch (b) {
    wt.length = 0, ts(b, e, 1), _ = De(xt);
  }
  let g = _;
  if (k && u !== !1) {
    const b = Object.keys(k), { shapeFlag: H } = g;
    b.length && H & 7 && (r && b.some(Ls) && (k = sr(
      k,
      r
    )), g = lt(g, k));
  }
  return s.dirs && (g = lt(g), g.dirs = g.dirs ? g.dirs.concat(s.dirs) : s.dirs), s.transition && (g.transition = s.transition), _ = g, Kt($), _;
}
const tr = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || zt(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, sr = (e, t) => {
  const s = {};
  for (const n in e)
    (!Ls(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function nr(e, t, s) {
  const { props: n, children: i, component: o } = e, { props: r, children: l, patchFlag: a } = t, p = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? mn(n, r, p) : !!r;
    if (a & 8) {
      const h = t.dynamicProps;
      for (let O = 0; O < h.length; O++) {
        const C = h[O];
        if (r[C] !== n[C] && !ss(p, C))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? mn(n, r, p) : !0 : !!r;
  return !1;
}
function mn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (t[o] !== e[o] && !ss(s, o))
      return !0;
  }
  return !1;
}
function ir({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = s, t = t.parent;
}
const or = (e) => e.__isSuspense;
function rr(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : Xo(e);
}
const Lt = {};
function ds(e, t, s) {
  return Ei(e, t, s);
}
function Ei(e, t, { immediate: s, deep: n, flush: i, onTrack: o, onTrigger: r } = q) {
  var l;
  const a = wo() === ((l = ne) == null ? void 0 : l.scope) ? ne : null;
  let p, h = !1, O = !1;
  if (ae(e) ? (p = () => e.value, h = Ts(e)) : it(e) ? (p = () => e, n = !0) : L(e) ? (O = !0, h = e.some((b) => it(b) || Ts(b)), p = () => e.map((b) => {
    if (ae(b))
      return b.value;
    if (it(b))
      return qe(b);
    if (F(b))
      return Fe(b, a, 2);
  })) : F(e) ? t ? p = () => Fe(e, a, 2) : p = () => {
    if (!(a && a.isUnmounted))
      return C && C(), ve(
        e,
        a,
        3,
        [I]
      );
  } : p = we, t && n) {
    const b = p;
    p = () => qe(b());
  }
  let C, I = (b) => {
    C = $.onStop = () => {
      Fe(b, a, 4);
    };
  }, d;
  if (Tt)
    if (I = we, t ? s && ve(t, a, 3, [
      p(),
      O ? [] : void 0,
      I
    ]) : p(), i === "sync") {
      const b = ll();
      d = b.__watcherHandles || (b.__watcherHandles = []);
    } else
      return we;
  let u = O ? new Array(e.length).fill(Lt) : Lt;
  const _ = () => {
    if ($.active)
      if (t) {
        const b = $.run();
        (n || h || (O ? b.some((H, Z) => rt(H, u[Z])) : rt(b, u))) && (C && C(), ve(t, a, 3, [
          b,
          // pass undefined as the old value when it's changed for the first time
          u === Lt ? void 0 : O && u[0] === Lt ? [] : u,
          I
        ]), u = b);
      } else
        $.run();
  };
  _.allowRecurse = !!t;
  let k;
  i === "sync" ? k = _ : i === "post" ? k = () => fe(_, a && a.suspense) : (_.pre = !0, a && (_.id = a.uid), k = () => zs(_));
  const $ = new Us(p, k);
  t ? s ? _() : u = $.run() : i === "post" ? fe(
    $.run.bind($),
    a && a.suspense
  ) : $.run();
  const g = () => {
    $.stop(), a && a.scope && js(a.scope.effects, $);
  };
  return d && d.push(g), g;
}
function lr(e, t, s) {
  const n = this.proxy, i = te(e) ? e.includes(".") ? Ti(n, e) : () => n[e] : e.bind(n, n);
  let o;
  F(t) ? o = t : (o = t.handler, s = t);
  const r = ne;
  ct(this);
  const l = Ei(i, o.bind(n), s);
  return r ? ct(r) : Ye(), l;
}
function Ti(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < s.length && n; i++)
      n = n[s[i]];
    return n;
  };
}
function qe(e, t) {
  if (!Y(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ae(e))
    qe(e.value, t);
  else if (L(e))
    for (let s = 0; s < e.length; s++)
      qe(e[s], t);
  else if (Zn(e) || nt(e))
    e.forEach((s) => {
      qe(s, t);
    });
  else if (ti(e))
    for (const s in e)
      qe(e[s], t);
  return e;
}
function cr(e, t) {
  const s = pe;
  if (s === null)
    return e;
  const n = rs(s) || s.proxy, i = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, l, a, p = q] = t[o];
    r && (F(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && qe(l), i.push({
      dir: r,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: a,
      modifiers: p
    }));
  }
  return e;
}
function We(e, t, s, n) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[n];
    a && (ft(), ve(a, s, 8, [
      e.el,
      l,
      e,
      t
    ]), ut());
  }
}
const Dt = (e) => !!e.type.__asyncLoader, Oi = (e) => e.type.__isKeepAlive;
function ar(e, t) {
  Pi(e, "a", t);
}
function fr(e, t) {
  Pi(e, "da", t);
}
function Pi(e, t, s = ne) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (ns(t, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      Oi(i.parent.vnode) && ur(n, t, s, i), i = i.parent;
  }
}
function ur(e, t, s, n) {
  const i = ns(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Ii(() => {
    js(n[t], i);
  }, s);
}
function ns(e, t, s = ne, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...r) => {
      if (s.isUnmounted)
        return;
      ft(), ct(s);
      const l = ve(t, s, e, r);
      return Ye(), ut(), l;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const Ne = (e) => (t, s = ne) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Tt || e === "sp") && ns(e, (...n) => t(...n), s)
), hr = Ne("bm"), dr = Ne("m"), pr = Ne("bu"), mr = Ne("u"), _r = Ne("bum"), Ii = Ne("um"), gr = Ne("sp"), br = Ne(
  "rtg"
), wr = Ne(
  "rtc"
);
function vr(e, t = ne) {
  ns("ec", e, t);
}
const $i = "components";
function yr(e, t) {
  return xr($i, e, !0, t) || e;
}
const Cr = Symbol.for("v-ndc");
function xr(e, t, s = !0, n = !1) {
  const i = pe || ne;
  if (i) {
    const o = i.type;
    if (e === $i) {
      const l = nl(
        o,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === Ie(t) || l === Xt(Ie(t))))
        return o;
    }
    const r = (
      // local registration
      // check instance[type] first which is resolved for options API
      _n(i[e] || o[e], t) || // global registration
      _n(i.appContext[e], t)
    );
    return !r && n ? o : r;
  }
}
function _n(e, t) {
  return e && (e[t] || e[Ie(t)] || e[Xt(Ie(t))]);
}
function Er(e, t, s, n) {
  let i;
  const o = s && s[n];
  if (L(e) || te(e)) {
    i = new Array(e.length);
    for (let r = 0, l = e.length; r < l; r++)
      i[r] = t(e[r], r, void 0, o && o[r]);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let r = 0; r < e; r++)
      i[r] = t(r + 1, r, void 0, o && o[r]);
  } else if (Y(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (r, l) => t(r, l, void 0, o && o[l])
      );
    else {
      const r = Object.keys(e);
      i = new Array(r.length);
      for (let l = 0, a = r.length; l < a; l++) {
        const p = r[l];
        i[l] = t(e[p], p, l, o && o[l]);
      }
    }
  else
    i = [];
  return s && (s[n] = i), i;
}
const Ps = (e) => e ? Hi(e) ? rs(e) || e.proxy : Ps(e.parent) : null, bt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ re(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ps(e.parent),
    $root: (e) => Ps(e.root),
    $emit: (e) => e.emit,
    $options: (e) => qs(e),
    $forceUpdate: (e) => e.f || (e.f = () => zs(e.update)),
    $nextTick: (e) => e.n || (e.n = qo.bind(e.proxy)),
    $watch: (e) => lr.bind(e)
  })
), ps = (e, t) => e !== q && !e.__isScriptSetup && U(e, t), Tr = {
  get({ _: e }, t) {
    const { ctx: s, setupState: n, data: i, props: o, accessCache: r, type: l, appContext: a } = e;
    let p;
    if (t[0] !== "$") {
      const I = r[t];
      if (I !== void 0)
        switch (I) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return o[t];
        }
      else {
        if (ps(n, t))
          return r[t] = 1, n[t];
        if (i !== q && U(i, t))
          return r[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && U(p, t)
        )
          return r[t] = 3, o[t];
        if (s !== q && U(s, t))
          return r[t] = 4, s[t];
        Is && (r[t] = 0);
      }
    }
    const h = bt[t];
    let O, C;
    if (h)
      return t === "$attrs" && ue(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (O = l.__cssModules) && (O = O[t])
    )
      return O;
    if (s !== q && U(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      C = a.config.globalProperties, U(C, t)
    )
      return C[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: o } = e;
    return ps(i, t) ? (i[t] = s, !0) : n !== q && U(n, t) ? (n[t] = s, !0) : U(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, propsOptions: o }
  }, r) {
    let l;
    return !!s[r] || e !== q && U(e, r) || ps(t, r) || (l = o[0]) && U(l, r) || U(n, r) || U(bt, r) || U(i.config.globalProperties, r);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : U(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function gn(e) {
  return L(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Is = !0;
function Or(e) {
  const t = qs(e), s = e.proxy, n = e.ctx;
  Is = !1, t.beforeCreate && bn(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: r,
    watch: l,
    provide: a,
    inject: p,
    // lifecycle
    created: h,
    beforeMount: O,
    mounted: C,
    beforeUpdate: I,
    updated: d,
    activated: u,
    deactivated: _,
    beforeDestroy: k,
    beforeUnmount: $,
    destroyed: g,
    unmounted: b,
    render: H,
    renderTracked: Z,
    renderTriggered: Q,
    errorCaptured: K,
    serverPrefetch: B,
    // public API
    expose: R,
    inheritAttrs: G,
    // assets
    components: de,
    directives: ke,
    filters: ls
  } = t;
  if (p && Pr(p, n, null), r)
    for (const X in r) {
      const J = r[X];
      F(J) && (n[X] = J.bind(s));
    }
  if (i) {
    const X = i.call(s, s);
    Y(X) && (e.data = es(X));
  }
  if (Is = !0, o)
    for (const X in o) {
      const J = o[X], He = F(J) ? J.bind(s, s) : F(J.get) ? J.get.bind(s, s) : we, $t = !F(J) && F(J.set) ? J.set.bind(s) : we, Be = ol({
        get: He,
        set: $t
      });
      Object.defineProperty(n, X, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (ye) => Be.value = ye
      });
    }
  if (l)
    for (const X in l)
      Ai(l[X], n, s, X);
  if (a) {
    const X = F(a) ? a.call(s) : a;
    Reflect.ownKeys(X).forEach((J) => {
      Nr(J, X[J]);
    });
  }
  h && bn(h, e, "c");
  function le(X, J) {
    L(J) ? J.forEach((He) => X(He.bind(s))) : J && X(J.bind(s));
  }
  if (le(hr, O), le(dr, C), le(pr, I), le(mr, d), le(ar, u), le(fr, _), le(vr, K), le(wr, Z), le(br, Q), le(_r, $), le(Ii, b), le(gr, B), L(R))
    if (R.length) {
      const X = e.exposed || (e.exposed = {});
      R.forEach((J) => {
        Object.defineProperty(X, J, {
          get: () => s[J],
          set: (He) => s[J] = He
        });
      });
    } else
      e.exposed || (e.exposed = {});
  H && e.render === we && (e.render = H), G != null && (e.inheritAttrs = G), de && (e.components = de), ke && (e.directives = ke);
}
function Pr(e, t, s = we) {
  L(e) && (e = $s(e));
  for (const n in e) {
    const i = e[n];
    let o;
    Y(i) ? "default" in i ? o = Ut(
      i.from || n,
      i.default,
      !0
      /* treat default function as factory */
    ) : o = Ut(i.from || n) : o = Ut(i), ae(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[n] = o;
  }
}
function bn(e, t, s) {
  ve(
    L(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Ai(e, t, s, n) {
  const i = n.includes(".") ? Ti(s, n) : () => s[n];
  if (te(e)) {
    const o = t[e];
    F(o) && ds(i, o);
  } else if (F(e))
    ds(i, e.bind(s));
  else if (Y(e))
    if (L(e))
      e.forEach((o) => Ai(o, t, s, n));
    else {
      const o = F(e.handler) ? e.handler.bind(s) : t[e.handler];
      F(o) && ds(i, o, e);
    }
}
function qs(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !i.length && !s && !n ? a = t : (a = {}, i.length && i.forEach(
    (p) => Vt(a, p, r, !0)
  ), Vt(a, t, r)), Y(t) && o.set(t, a), a;
}
function Vt(e, t, s, n = !1) {
  const { mixins: i, extends: o } = t;
  o && Vt(e, o, s, !0), i && i.forEach(
    (r) => Vt(e, r, s, !0)
  );
  for (const r in t)
    if (!(n && r === "expose")) {
      const l = Ir[r] || s && s[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const Ir = {
  data: wn,
  props: vn,
  emits: vn,
  // objects
  methods: gt,
  computed: gt,
  // lifecycle
  beforeCreate: ce,
  created: ce,
  beforeMount: ce,
  mounted: ce,
  beforeUpdate: ce,
  updated: ce,
  beforeDestroy: ce,
  beforeUnmount: ce,
  destroyed: ce,
  unmounted: ce,
  activated: ce,
  deactivated: ce,
  errorCaptured: ce,
  serverPrefetch: ce,
  // assets
  components: gt,
  directives: gt,
  // watch
  watch: Ar,
  // provide / inject
  provide: wn,
  inject: $r
};
function wn(e, t) {
  return t ? e ? function() {
    return re(
      F(e) ? e.call(this, this) : e,
      F(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function $r(e, t) {
  return gt($s(e), $s(t));
}
function $s(e) {
  if (L(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function gt(e, t) {
  return e ? re(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function vn(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : re(
    /* @__PURE__ */ Object.create(null),
    gn(e),
    gn(t ?? {})
  ) : t;
}
function Ar(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const s = re(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = ce(e[n], t[n]);
  return s;
}
function Ri() {
  return {
    app: null,
    config: {
      isNativeTag: no,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Rr = 0;
function Mr(e, t) {
  return function(n, i = null) {
    F(n) || (n = re({}, n)), i != null && !Y(i) && (i = null);
    const o = Ri(), r = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const a = o.app = {
      _uid: Rr++,
      _component: n,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: cl,
      get config() {
        return o.config;
      },
      set config(p) {
      },
      use(p, ...h) {
        return r.has(p) || (p && F(p.install) ? (r.add(p), p.install(a, ...h)) : F(p) && (r.add(p), p(a, ...h))), a;
      },
      mixin(p) {
        return o.mixins.includes(p) || o.mixins.push(p), a;
      },
      component(p, h) {
        return h ? (o.components[p] = h, a) : o.components[p];
      },
      directive(p, h) {
        return h ? (o.directives[p] = h, a) : o.directives[p];
      },
      mount(p, h, O) {
        if (!l) {
          const C = De(n, i);
          return C.appContext = o, h && t ? t(C, p) : e(C, p, O), l = !0, a._container = p, p.__vue_app__ = a, rs(C.component) || C.component.proxy;
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(p, h) {
        return o.provides[p] = h, a;
      },
      runWithContext(p) {
        Jt = a;
        try {
          return p();
        } finally {
          Jt = null;
        }
      }
    };
    return a;
  };
}
let Jt = null;
function Nr(e, t) {
  if (ne) {
    let s = ne.provides;
    const n = ne.parent && ne.parent.provides;
    n === s && (s = ne.provides = Object.create(n)), s[e] = t;
  }
}
function Ut(e, t, s = !1) {
  const n = ne || pe;
  if (n || Jt) {
    const i = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : Jt._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && F(t) ? t.call(n && n.proxy) : t;
  }
}
function kr(e, t, s, n = !1) {
  const i = {}, o = {};
  Wt(o, os, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Mi(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  s ? e.props = n ? i : Uo(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function Sr(e, t, s, n) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, l = W(i), [a] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const h = e.vnode.dynamicProps;
      for (let O = 0; O < h.length; O++) {
        let C = h[O];
        if (ss(e.emitsOptions, C))
          continue;
        const I = t[C];
        if (a)
          if (U(o, C))
            I !== o[C] && (o[C] = I, p = !0);
          else {
            const d = Ie(C);
            i[d] = As(
              a,
              l,
              d,
              I,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          I !== o[C] && (o[C] = I, p = !0);
      }
    }
  } else {
    Mi(e, t, i, o) && (p = !0);
    let h;
    for (const O in l)
      (!t || // for camelCase
      !U(t, O) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = at(O)) === O || !U(t, h))) && (a ? s && // for camelCase
      (s[O] !== void 0 || // for kebab-case
      s[h] !== void 0) && (i[O] = As(
        a,
        l,
        O,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[O]);
    if (o !== l)
      for (const O in o)
        (!t || !U(t, O)) && (delete o[O], p = !0);
  }
  p && Re(e, "set", "$attrs");
}
function Mi(e, t, s, n) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (Ft(a))
        continue;
      const p = t[a];
      let h;
      i && U(i, h = Ie(a)) ? !o || !o.includes(h) ? s[h] = p : (l || (l = {}))[h] = p : ss(e.emitsOptions, a) || (!(a in n) || p !== n[a]) && (n[a] = p, r = !0);
    }
  if (o) {
    const a = W(s), p = l || q;
    for (let h = 0; h < o.length; h++) {
      const O = o[h];
      s[O] = As(
        i,
        a,
        O,
        p[O],
        e,
        !U(p, O)
      );
    }
  }
  return r;
}
function As(e, t, s, n, i, o) {
  const r = e[s];
  if (r != null) {
    const l = U(r, "default");
    if (l && n === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && F(a)) {
        const { propsDefaults: p } = i;
        s in p ? n = p[s] : (ct(i), n = p[s] = a.call(
          null,
          t
        ), Ye());
      } else
        n = a;
    }
    r[
      0
      /* shouldCast */
    ] && (o && !l ? n = !1 : r[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === at(s)) && (n = !0));
  }
  return n;
}
function Ni(e, t, s = !1) {
  const n = t.propsCache, i = n.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, l = [];
  let a = !1;
  if (!F(e)) {
    const h = (O) => {
      a = !0;
      const [C, I] = Ni(O, t, !0);
      re(r, C), I && l.push(...I);
    };
    !s && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!o && !a)
    return Y(e) && n.set(e, st), st;
  if (L(o))
    for (let h = 0; h < o.length; h++) {
      const O = Ie(o[h]);
      yn(O) && (r[O] = q);
    }
  else if (o)
    for (const h in o) {
      const O = Ie(h);
      if (yn(O)) {
        const C = o[h], I = r[O] = L(C) || F(C) ? { type: C } : re({}, C);
        if (I) {
          const d = En(Boolean, I.type), u = En(String, I.type);
          I[
            0
            /* shouldCast */
          ] = d > -1, I[
            1
            /* shouldCastTrue */
          ] = u < 0 || d < u, (d > -1 || U(I, "default")) && l.push(O);
        }
      }
    }
  const p = [r, l];
  return Y(e) && n.set(e, p), p;
}
function yn(e) {
  return e[0] !== "$";
}
function Cn(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function xn(e, t) {
  return Cn(e) === Cn(t);
}
function En(e, t) {
  return L(t) ? t.findIndex((s) => xn(s, e)) : F(t) && xn(t, e) ? 0 : -1;
}
const ki = (e) => e[0] === "_" || e === "$stable", Qs = (e) => L(e) ? e.map(Oe) : [Oe(e)], Lr = (e, t, s) => {
  if (t._n)
    return t;
  const n = er((...i) => Qs(t(...i)), s);
  return n._c = !1, n;
}, Si = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (ki(i))
      continue;
    const o = e[i];
    if (F(o))
      t[i] = Lr(i, o, n);
    else if (o != null) {
      const r = Qs(o);
      t[i] = () => r;
    }
  }
}, Li = (e, t) => {
  const s = Qs(t);
  e.slots.default = () => s;
}, jr = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (e.slots = W(t), Wt(t, "_", s)) : Si(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Li(e, t);
  Wt(e.slots, os, 1);
}, Fr = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let o = !0, r = q;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? o = !1 : (re(i, t), !s && l === 1 && delete i._) : (o = !t.$stable, Si(t, i)), r = t;
  } else
    t && (Li(e, t), r = { default: 1 });
  if (o)
    for (const l in i)
      !ki(l) && r[l] == null && delete i[l];
};
function Rs(e, t, s, n, i = !1) {
  if (L(e)) {
    e.forEach(
      (C, I) => Rs(
        C,
        t && (L(t) ? t[I] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (Dt(n) && !i)
    return;
  const o = n.shapeFlag & 4 ? rs(n.component) || n.component.proxy : n.el, r = i ? null : o, { i: l, r: a } = e, p = t && t.r, h = l.refs === q ? l.refs = {} : l.refs, O = l.setupState;
  if (p != null && p !== a && (te(p) ? (h[p] = null, U(O, p) && (O[p] = null)) : ae(p) && (p.value = null)), F(a))
    Fe(a, l, 12, [r, h]);
  else {
    const C = te(a), I = ae(a);
    if (C || I) {
      const d = () => {
        if (e.f) {
          const u = C ? U(O, a) ? O[a] : h[a] : a.value;
          i ? L(u) && js(u, o) : L(u) ? u.includes(o) || u.push(o) : C ? (h[a] = [o], U(O, a) && (O[a] = h[a])) : (a.value = [o], e.k && (h[e.k] = a.value));
        } else
          C ? (h[a] = r, U(O, a) && (O[a] = r)) : I && (a.value = r, e.k && (h[e.k] = r));
      };
      r ? (d.id = -1, fe(d, s)) : d();
    }
  }
}
const fe = rr;
function Dr(e) {
  return Ur(e);
}
function Ur(e, t) {
  const s = vs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: o,
    createElement: r,
    createText: l,
    createComment: a,
    setText: p,
    setElementText: h,
    parentNode: O,
    nextSibling: C,
    setScopeId: I = we,
    insertStaticContent: d
  } = e, u = (c, f, m, w = null, v = null, E = null, P = !1, x = null, T = !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !dt(c, f) && (w = At(c), ye(c, v, E, !0), c = null), f.patchFlag === -2 && (T = !1, f.dynamicChildren = null);
    const { type: y, ref: M, shapeFlag: A } = f;
    switch (y) {
      case is:
        _(c, f, m, w);
        break;
      case xt:
        k(c, f, m, w);
        break;
      case ms:
        c == null && $(f, m, w, P);
        break;
      case Ee:
        de(
          c,
          f,
          m,
          w,
          v,
          E,
          P,
          x,
          T
        );
        break;
      default:
        A & 1 ? H(
          c,
          f,
          m,
          w,
          v,
          E,
          P,
          x,
          T
        ) : A & 6 ? ke(
          c,
          f,
          m,
          w,
          v,
          E,
          P,
          x,
          T
        ) : (A & 64 || A & 128) && y.process(
          c,
          f,
          m,
          w,
          v,
          E,
          P,
          x,
          T,
          Xe
        );
    }
    M != null && v && Rs(M, c && c.ref, E, f || c, !f);
  }, _ = (c, f, m, w) => {
    if (c == null)
      n(
        f.el = l(f.children),
        m,
        w
      );
    else {
      const v = f.el = c.el;
      f.children !== c.children && p(v, f.children);
    }
  }, k = (c, f, m, w) => {
    c == null ? n(
      f.el = a(f.children || ""),
      m,
      w
    ) : f.el = c.el;
  }, $ = (c, f, m, w) => {
    [c.el, c.anchor] = d(
      c.children,
      f,
      m,
      w,
      c.el,
      c.anchor
    );
  }, g = ({ el: c, anchor: f }, m, w) => {
    let v;
    for (; c && c !== f; )
      v = C(c), n(c, m, w), c = v;
    n(f, m, w);
  }, b = ({ el: c, anchor: f }) => {
    let m;
    for (; c && c !== f; )
      m = C(c), i(c), c = m;
    i(f);
  }, H = (c, f, m, w, v, E, P, x, T) => {
    P = P || f.type === "svg", c == null ? Z(
      f,
      m,
      w,
      v,
      E,
      P,
      x,
      T
    ) : B(
      c,
      f,
      v,
      E,
      P,
      x,
      T
    );
  }, Z = (c, f, m, w, v, E, P, x) => {
    let T, y;
    const { type: M, props: A, shapeFlag: N, transition: j, dirs: D } = c;
    if (T = c.el = r(
      c.type,
      E,
      A && A.is,
      A
    ), N & 8 ? h(T, c.children) : N & 16 && K(
      c.children,
      T,
      null,
      w,
      v,
      E && M !== "foreignObject",
      P,
      x
    ), D && We(c, null, w, "created"), Q(T, c, c.scopeId, P, w), A) {
      for (const V in A)
        V !== "value" && !Ft(V) && o(
          T,
          V,
          null,
          A[V],
          E,
          c.children,
          w,
          v,
          $e
        );
      "value" in A && o(T, "value", null, A.value), (y = A.onVnodeBeforeMount) && xe(y, w, c);
    }
    D && We(c, null, w, "beforeMount");
    const z = Hr(v, j);
    z && j.beforeEnter(T), n(T, f, m), ((y = A && A.onVnodeMounted) || z || D) && fe(() => {
      y && xe(y, w, c), z && j.enter(T), D && We(c, null, w, "mounted");
    }, v);
  }, Q = (c, f, m, w, v) => {
    if (m && I(c, m), w)
      for (let E = 0; E < w.length; E++)
        I(c, w[E]);
    if (v) {
      let E = v.subTree;
      if (f === E) {
        const P = v.vnode;
        Q(
          c,
          P,
          P.scopeId,
          P.slotScopeIds,
          v.parent
        );
      }
    }
  }, K = (c, f, m, w, v, E, P, x, T = 0) => {
    for (let y = T; y < c.length; y++) {
      const M = c[y] = x ? Le(c[y]) : Oe(c[y]);
      u(
        null,
        M,
        f,
        m,
        w,
        v,
        E,
        P,
        x
      );
    }
  }, B = (c, f, m, w, v, E, P) => {
    const x = f.el = c.el;
    let { patchFlag: T, dynamicChildren: y, dirs: M } = f;
    T |= c.patchFlag & 16;
    const A = c.props || q, N = f.props || q;
    let j;
    m && Ke(m, !1), (j = N.onVnodeBeforeUpdate) && xe(j, m, f, c), M && We(f, c, m, "beforeUpdate"), m && Ke(m, !0);
    const D = v && f.type !== "foreignObject";
    if (y ? R(
      c.dynamicChildren,
      y,
      x,
      m,
      w,
      D,
      E
    ) : P || J(
      c,
      f,
      x,
      null,
      m,
      w,
      D,
      E,
      !1
    ), T > 0) {
      if (T & 16)
        G(
          x,
          f,
          A,
          N,
          m,
          w,
          v
        );
      else if (T & 2 && A.class !== N.class && o(x, "class", null, N.class, v), T & 4 && o(x, "style", A.style, N.style, v), T & 8) {
        const z = f.dynamicProps;
        for (let V = 0; V < z.length; V++) {
          const ee = z[V], me = A[ee], Ze = N[ee];
          (Ze !== me || ee === "value") && o(
            x,
            ee,
            me,
            Ze,
            v,
            c.children,
            m,
            w,
            $e
          );
        }
      }
      T & 1 && c.children !== f.children && h(x, f.children);
    } else
      !P && y == null && G(
        x,
        f,
        A,
        N,
        m,
        w,
        v
      );
    ((j = N.onVnodeUpdated) || M) && fe(() => {
      j && xe(j, m, f, c), M && We(f, c, m, "updated");
    }, w);
  }, R = (c, f, m, w, v, E, P) => {
    for (let x = 0; x < f.length; x++) {
      const T = c[x], y = f[x], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        T.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !dt(T, y) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 70) ? O(T.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      u(
        T,
        y,
        M,
        null,
        w,
        v,
        E,
        P,
        !0
      );
    }
  }, G = (c, f, m, w, v, E, P) => {
    if (m !== w) {
      if (m !== q)
        for (const x in m)
          !Ft(x) && !(x in w) && o(
            c,
            x,
            m[x],
            null,
            P,
            f.children,
            v,
            E,
            $e
          );
      for (const x in w) {
        if (Ft(x))
          continue;
        const T = w[x], y = m[x];
        T !== y && x !== "value" && o(
          c,
          x,
          y,
          T,
          P,
          f.children,
          v,
          E,
          $e
        );
      }
      "value" in w && o(c, "value", m.value, w.value);
    }
  }, de = (c, f, m, w, v, E, P, x, T) => {
    const y = f.el = c ? c.el : l(""), M = f.anchor = c ? c.anchor : l("");
    let { patchFlag: A, dynamicChildren: N, slotScopeIds: j } = f;
    j && (x = x ? x.concat(j) : j), c == null ? (n(y, m, w), n(M, m, w), K(
      f.children,
      m,
      M,
      v,
      E,
      P,
      x,
      T
    )) : A > 0 && A & 64 && N && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (R(
      c.dynamicChildren,
      N,
      m,
      v,
      E,
      P,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || v && f === v.subTree) && ji(
      c,
      f,
      !0
      /* shallow */
    )) : J(
      c,
      f,
      m,
      M,
      v,
      E,
      P,
      x,
      T
    );
  }, ke = (c, f, m, w, v, E, P, x, T) => {
    f.slotScopeIds = x, c == null ? f.shapeFlag & 512 ? v.ctx.activate(
      f,
      m,
      w,
      P,
      T
    ) : ls(
      f,
      m,
      w,
      v,
      E,
      P,
      T
    ) : Gs(c, f, T);
  }, ls = (c, f, m, w, v, E, P) => {
    const x = c.component = Zr(
      c,
      w,
      v
    );
    if (Oi(c) && (x.ctx.renderer = Xe), Gr(x), x.asyncDep) {
      if (v && v.registerDep(x, le), !c.el) {
        const T = x.subTree = De(xt);
        k(null, T, f, m);
      }
      return;
    }
    le(
      x,
      c,
      f,
      m,
      v,
      E,
      P
    );
  }, Gs = (c, f, m) => {
    const w = f.component = c.component;
    if (nr(c, f, m))
      if (w.asyncDep && !w.asyncResolved) {
        X(w, f, m);
        return;
      } else
        w.next = f, Yo(w.update), w.update();
    else
      f.el = c.el, w.vnode = f;
  }, le = (c, f, m, w, v, E, P) => {
    const x = () => {
      if (c.isMounted) {
        let { next: M, bu: A, u: N, parent: j, vnode: D } = c, z = M, V;
        Ke(c, !1), M ? (M.el = D.el, X(c, M, P)) : M = D, A && us(A), (V = M.props && M.props.onVnodeBeforeUpdate) && xe(V, j, M, D), Ke(c, !0);
        const ee = hs(c), me = c.subTree;
        c.subTree = ee, u(
          me,
          ee,
          // parent may have changed if it's in a teleport
          O(me.el),
          // anchor may have changed if it's in a fragment
          At(me),
          c,
          v,
          E
        ), M.el = ee.el, z === null && ir(c, ee.el), N && fe(N, v), (V = M.props && M.props.onVnodeUpdated) && fe(
          () => xe(V, j, M, D),
          v
        );
      } else {
        let M;
        const { el: A, props: N } = f, { bm: j, m: D, parent: z } = c, V = Dt(f);
        if (Ke(c, !1), j && us(j), !V && (M = N && N.onVnodeBeforeMount) && xe(M, z, f), Ke(c, !0), A && as) {
          const ee = () => {
            c.subTree = hs(c), as(
              A,
              c.subTree,
              c,
              v,
              null
            );
          };
          V ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && ee()
          ) : ee();
        } else {
          const ee = c.subTree = hs(c);
          u(
            null,
            ee,
            m,
            w,
            c,
            v,
            E
          ), f.el = ee.el;
        }
        if (D && fe(D, v), !V && (M = N && N.onVnodeMounted)) {
          const ee = f;
          fe(
            () => xe(M, z, ee),
            v
          );
        }
        (f.shapeFlag & 256 || z && Dt(z.vnode) && z.vnode.shapeFlag & 256) && c.a && fe(c.a, v), c.isMounted = !0, f = m = w = null;
      }
    }, T = c.effect = new Us(
      x,
      () => zs(y),
      c.scope
      // track it in component's effect scope
    ), y = c.update = () => T.run();
    y.id = c.uid, Ke(c, !0), y();
  }, X = (c, f, m) => {
    f.component = c;
    const w = c.vnode.props;
    c.vnode = f, c.next = null, Sr(c, f.props, w, m), Fr(c, f.children, m), ft(), pn(), ut();
  }, J = (c, f, m, w, v, E, P, x, T = !1) => {
    const y = c && c.children, M = c ? c.shapeFlag : 0, A = f.children, { patchFlag: N, shapeFlag: j } = f;
    if (N > 0) {
      if (N & 128) {
        $t(
          y,
          A,
          m,
          w,
          v,
          E,
          P,
          x,
          T
        );
        return;
      } else if (N & 256) {
        He(
          y,
          A,
          m,
          w,
          v,
          E,
          P,
          x,
          T
        );
        return;
      }
    }
    j & 8 ? (M & 16 && $e(y, v, E), A !== y && h(m, A)) : M & 16 ? j & 16 ? $t(
      y,
      A,
      m,
      w,
      v,
      E,
      P,
      x,
      T
    ) : $e(y, v, E, !0) : (M & 8 && h(m, ""), j & 16 && K(
      A,
      m,
      w,
      v,
      E,
      P,
      x,
      T
    ));
  }, He = (c, f, m, w, v, E, P, x, T) => {
    c = c || st, f = f || st;
    const y = c.length, M = f.length, A = Math.min(y, M);
    let N;
    for (N = 0; N < A; N++) {
      const j = f[N] = T ? Le(f[N]) : Oe(f[N]);
      u(
        c[N],
        j,
        m,
        null,
        v,
        E,
        P,
        x,
        T
      );
    }
    y > M ? $e(
      c,
      v,
      E,
      !0,
      !1,
      A
    ) : K(
      f,
      m,
      w,
      v,
      E,
      P,
      x,
      T,
      A
    );
  }, $t = (c, f, m, w, v, E, P, x, T) => {
    let y = 0;
    const M = f.length;
    let A = c.length - 1, N = M - 1;
    for (; y <= A && y <= N; ) {
      const j = c[y], D = f[y] = T ? Le(f[y]) : Oe(f[y]);
      if (dt(j, D))
        u(
          j,
          D,
          m,
          null,
          v,
          E,
          P,
          x,
          T
        );
      else
        break;
      y++;
    }
    for (; y <= A && y <= N; ) {
      const j = c[A], D = f[N] = T ? Le(f[N]) : Oe(f[N]);
      if (dt(j, D))
        u(
          j,
          D,
          m,
          null,
          v,
          E,
          P,
          x,
          T
        );
      else
        break;
      A--, N--;
    }
    if (y > A) {
      if (y <= N) {
        const j = N + 1, D = j < M ? f[j].el : w;
        for (; y <= N; )
          u(
            null,
            f[y] = T ? Le(f[y]) : Oe(f[y]),
            m,
            D,
            v,
            E,
            P,
            x,
            T
          ), y++;
      }
    } else if (y > N)
      for (; y <= A; )
        ye(c[y], v, E, !0), y++;
    else {
      const j = y, D = y, z = /* @__PURE__ */ new Map();
      for (y = D; y <= N; y++) {
        const he = f[y] = T ? Le(f[y]) : Oe(f[y]);
        he.key != null && z.set(he.key, y);
      }
      let V, ee = 0;
      const me = N - D + 1;
      let Ze = !1, sn = 0;
      const ht = new Array(me);
      for (y = 0; y < me; y++)
        ht[y] = 0;
      for (y = j; y <= A; y++) {
        const he = c[y];
        if (ee >= me) {
          ye(he, v, E, !0);
          continue;
        }
        let Ce;
        if (he.key != null)
          Ce = z.get(he.key);
        else
          for (V = D; V <= N; V++)
            if (ht[V - D] === 0 && dt(he, f[V])) {
              Ce = V;
              break;
            }
        Ce === void 0 ? ye(he, v, E, !0) : (ht[Ce - D] = y + 1, Ce >= sn ? sn = Ce : Ze = !0, u(
          he,
          f[Ce],
          m,
          null,
          v,
          E,
          P,
          x,
          T
        ), ee++);
      }
      const nn = Ze ? Br(ht) : st;
      for (V = nn.length - 1, y = me - 1; y >= 0; y--) {
        const he = D + y, Ce = f[he], on = he + 1 < M ? f[he + 1].el : w;
        ht[y] === 0 ? u(
          null,
          Ce,
          m,
          on,
          v,
          E,
          P,
          x,
          T
        ) : Ze && (V < 0 || y !== nn[V] ? Be(Ce, m, on, 2) : V--);
      }
    }
  }, Be = (c, f, m, w, v = null) => {
    const { el: E, type: P, transition: x, children: T, shapeFlag: y } = c;
    if (y & 6) {
      Be(c.component.subTree, f, m, w);
      return;
    }
    if (y & 128) {
      c.suspense.move(f, m, w);
      return;
    }
    if (y & 64) {
      P.move(c, f, m, Xe);
      return;
    }
    if (P === Ee) {
      n(E, f, m);
      for (let A = 0; A < T.length; A++)
        Be(T[A], f, m, w);
      n(c.anchor, f, m);
      return;
    }
    if (P === ms) {
      g(c, f, m);
      return;
    }
    if (w !== 2 && y & 1 && x)
      if (w === 0)
        x.beforeEnter(E), n(E, f, m), fe(() => x.enter(E), v);
      else {
        const { leave: A, delayLeave: N, afterLeave: j } = x, D = () => n(E, f, m), z = () => {
          A(E, () => {
            D(), j && j();
          });
        };
        N ? N(E, D, z) : z();
      }
    else
      n(E, f, m);
  }, ye = (c, f, m, w = !1, v = !1) => {
    const {
      type: E,
      props: P,
      ref: x,
      children: T,
      dynamicChildren: y,
      shapeFlag: M,
      patchFlag: A,
      dirs: N
    } = c;
    if (x != null && Rs(x, null, m, c, !0), M & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const j = M & 1 && N, D = !Dt(c);
    let z;
    if (D && (z = P && P.onVnodeBeforeUnmount) && xe(z, f, c), M & 6)
      so(c.component, m, w);
    else {
      if (M & 128) {
        c.suspense.unmount(m, w);
        return;
      }
      j && We(c, null, f, "beforeUnmount"), M & 64 ? c.type.remove(
        c,
        f,
        m,
        v,
        Xe,
        w
      ) : y && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== Ee || A > 0 && A & 64) ? $e(
        y,
        f,
        m,
        !1,
        !0
      ) : (E === Ee && A & 384 || !v && M & 16) && $e(T, f, m), w && en(c);
    }
    (D && (z = P && P.onVnodeUnmounted) || j) && fe(() => {
      z && xe(z, f, c), j && We(c, null, f, "unmounted");
    }, m);
  }, en = (c) => {
    const { type: f, el: m, anchor: w, transition: v } = c;
    if (f === Ee) {
      to(m, w);
      return;
    }
    if (f === ms) {
      b(c);
      return;
    }
    const E = () => {
      i(m), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (c.shapeFlag & 1 && v && !v.persisted) {
      const { leave: P, delayLeave: x } = v, T = () => P(m, E);
      x ? x(c.el, E, T) : T();
    } else
      E();
  }, to = (c, f) => {
    let m;
    for (; c !== f; )
      m = C(c), i(c), c = m;
    i(f);
  }, so = (c, f, m) => {
    const { bum: w, scope: v, update: E, subTree: P, um: x } = c;
    w && us(w), v.stop(), E && (E.active = !1, ye(P, c, f, m)), x && fe(x, f), fe(() => {
      c.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, $e = (c, f, m, w = !1, v = !1, E = 0) => {
    for (let P = E; P < c.length; P++)
      ye(c[P], f, m, w, v);
  }, At = (c) => c.shapeFlag & 6 ? At(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : C(c.anchor || c.el), tn = (c, f, m) => {
    c == null ? f._vnode && ye(f._vnode, null, null, !0) : u(f._vnode || null, c, f, null, null, null, m), pn(), vi(), f._vnode = c;
  }, Xe = {
    p: u,
    um: ye,
    m: Be,
    r: en,
    mt: ls,
    mc: K,
    pc: J,
    pbc: R,
    n: At,
    o: e
  };
  let cs, as;
  return t && ([cs, as] = t(
    Xe
  )), {
    render: tn,
    hydrate: cs,
    createApp: Mr(tn, cs)
  };
}
function Ke({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function Hr(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ji(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (L(n) && L(i))
    for (let o = 0; o < n.length; o++) {
      const r = n[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = Le(i[o]), l.el = r.el), s || ji(r, l)), l.type === is && (l.el = r.el);
    }
}
function Br(e) {
  const t = e.slice(), s = [0];
  let n, i, o, r, l;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const p = e[n];
    if (p !== 0) {
      if (i = s[s.length - 1], e[i] < p) {
        t[n] = i, s.push(n);
        continue;
      }
      for (o = 0, r = s.length - 1; o < r; )
        l = o + r >> 1, e[s[l]] < p ? o = l + 1 : r = l;
      p < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, r = s[o - 1]; o-- > 0; )
    s[o] = r, r = t[r];
  return s;
}
const Wr = (e) => e.__isTeleport, Ee = Symbol.for("v-fgt"), is = Symbol.for("v-txt"), xt = Symbol.for("v-cmt"), ms = Symbol.for("v-stc"), wt = [];
let be = null;
function Ht(e = !1) {
  wt.push(be = e ? null : []);
}
function Kr() {
  wt.pop(), be = wt[wt.length - 1] || null;
}
let Et = 1;
function Tn(e) {
  Et += e;
}
function Fi(e) {
  return e.dynamicChildren = Et > 0 ? be || st : null, Kr(), Et > 0 && be && be.push(e), e;
}
function Ms(e, t, s, n, i, o) {
  return Fi(
    Te(
      e,
      t,
      s,
      n,
      i,
      o,
      !0
      /* isBlock */
    )
  );
}
function Vr(e, t, s, n, i) {
  return Fi(
    De(
      e,
      t,
      s,
      n,
      i,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Jr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function dt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const os = "__vInternal", Di = ({ key: e }) => e ?? null, Bt = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? te(e) || ae(e) || F(e) ? { i: pe, r: e, k: t, f: !!s } : e : null);
function Te(e, t = null, s = null, n = 0, i = null, o = e === Ee ? 0 : 1, r = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Di(t),
    ref: t && Bt(t),
    scopeId: xi,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: pe
  };
  return l ? (Ys(a, s), o & 128 && e.normalize(a)) : s && (a.shapeFlag |= te(s) ? 8 : 16), Et > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  be && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && be.push(a), a;
}
const De = zr;
function zr(e, t = null, s = null, n = 0, i = null, o = !1) {
  if ((!e || e === Cr) && (e = xt), Jr(e)) {
    const l = lt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Ys(l, s), Et > 0 && !o && be && (l.shapeFlag & 6 ? be[be.indexOf(e)] = l : be.push(l)), l.patchFlag |= -2, l;
  }
  if (il(e) && (e = e.__vccOpts), t) {
    t = qr(t);
    let { class: l, style: a } = t;
    l && !te(l) && (t.class = Pt(l)), Y(a) && (mi(a) && !L(a) && (a = re({}, a)), t.style = Zt(a));
  }
  const r = te(e) ? 1 : or(e) ? 128 : Wr(e) ? 64 : Y(e) ? 4 : F(e) ? 2 : 0;
  return Te(
    e,
    t,
    s,
    n,
    i,
    r,
    o,
    !0
  );
}
function qr(e) {
  return e ? mi(e) || os in e ? re({}, e) : e : null;
}
function lt(e, t, s = !1) {
  const { props: n, ref: i, patchFlag: o, children: r } = e, l = t ? Qr(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Di(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? L(i) ? i.concat(Bt(t)) : [i, Bt(t)] : Bt(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ee ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && lt(e.ssContent),
    ssFallback: e.ssFallback && lt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ui(e = " ", t = 0) {
  return De(is, null, e, t);
}
function Oe(e) {
  return e == null || typeof e == "boolean" ? De(xt) : L(e) ? De(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Le(e) : De(is, null, String(e));
}
function Le(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : lt(e);
}
function Ys(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (L(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Ys(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !(os in t) ? t._ctx = pe : i === 3 && pe && (pe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    F(t) ? (t = { default: t, _ctx: pe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ui(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Qr(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Pt([t.class, n.class]));
      else if (i === "style")
        t.style = Zt([t.style, n.style]);
      else if (zt(i)) {
        const o = t[i], r = n[i];
        r && o !== r && !(L(o) && o.includes(r)) && (t[i] = o ? [].concat(o, r) : r);
      } else
        i !== "" && (t[i] = n[i]);
  }
  return t;
}
function xe(e, t, s, n = null) {
  ve(e, t, 7, [
    s,
    n
  ]);
}
const Yr = Ri();
let Xr = 0;
function Zr(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Yr, o = {
    uid: Xr++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new go(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ni(n, i),
    emitsOptions: Ci(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: q,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: q,
    data: q,
    props: q,
    attrs: q,
    slots: q,
    refs: q,
    setupState: q,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Go.bind(null, o), e.ce && e.ce(o), o;
}
let ne = null, Xs, Ge, On = "__VUE_INSTANCE_SETTERS__";
(Ge = vs()[On]) || (Ge = vs()[On] = []), Ge.push((e) => ne = e), Xs = (e) => {
  Ge.length > 1 ? Ge.forEach((t) => t(e)) : Ge[0](e);
};
const ct = (e) => {
  Xs(e), e.scope.on();
}, Ye = () => {
  ne && ne.scope.off(), Xs(null);
};
function Hi(e) {
  return e.vnode.shapeFlag & 4;
}
let Tt = !1;
function Gr(e, t = !1) {
  Tt = t;
  const { props: s, children: n } = e.vnode, i = Hi(e);
  kr(e, s, i, t), jr(e, n);
  const o = i ? el(e, t) : void 0;
  return Tt = !1, o;
}
function el(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = _i(new Proxy(e.ctx, Tr));
  const { setup: n } = s;
  if (n) {
    const i = e.setupContext = n.length > 1 ? sl(e) : null;
    ct(e), ft();
    const o = Fe(
      n,
      e,
      0,
      [e.props, i]
    );
    if (ut(), Ye(), Gn(o)) {
      if (o.then(Ye, Ye), t)
        return o.then((r) => {
          Pn(e, r, t);
        }).catch((r) => {
          ts(r, e, 0);
        });
      e.asyncDep = o;
    } else
      Pn(e, o, t);
  } else
    Bi(e, t);
}
function Pn(e, t, s) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Y(t) && (e.setupState = gi(t)), Bi(e, s);
}
let In;
function Bi(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && In && !n.render) {
      const i = n.template || qs(e).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: r } = e.appContext.config, { delimiters: l, compilerOptions: a } = n, p = re(
          re(
            {
              isCustomElement: o,
              delimiters: l
            },
            r
          ),
          a
        );
        n.render = In(i, p);
      }
    }
    e.render = n.render || we;
  }
  {
    ct(e), ft();
    try {
      Or(e);
    } finally {
      ut(), Ye();
    }
  }
}
function tl(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, s) {
        return ue(e, "get", "$attrs"), t[s];
      }
    }
  ));
}
function sl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return tl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function rs(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(gi(_i(e.exposed)), {
      get(t, s) {
        if (s in t)
          return t[s];
        if (s in bt)
          return bt[s](e);
      },
      has(t, s) {
        return s in t || s in bt;
      }
    }));
}
function nl(e, t = !0) {
  return F(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function il(e) {
  return F(e) && "__vccOpts" in e;
}
const ol = (e, t) => Jo(e, t, Tt), rl = Symbol.for("v-scx"), ll = () => Ut(rl), cl = "3.3.7", al = "http://www.w3.org/2000/svg", ze = typeof document < "u" ? document : null, $n = ze && /* @__PURE__ */ ze.createElement("template"), fl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t ? ze.createElementNS(al, e) : ze.createElement(e, s ? { is: s } : void 0);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => ze.createTextNode(e),
  createComment: (e) => ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ze.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, i, o) {
    const r = s ? s.previousSibling : t.lastChild;
    if (i && (i === o || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === o || !(i = i.nextSibling)); )
        ;
    else {
      $n.innerHTML = n ? `<svg>${e}</svg>` : e;
      const l = $n.content;
      if (n) {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, ul = Symbol("_vtc");
function hl(e, t, s) {
  const n = e[ul];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Zs = Symbol("_vod"), dl = {
  beforeMount(e, { value: t }, { transition: s }) {
    e[Zs] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : pt(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), pt(e, !0), n.enter(e)) : n.leave(e, () => {
      pt(e, !1);
    }) : pt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    pt(e, t);
  }
};
function pt(e, t) {
  e.style.display = t ? e[Zs] : "none";
}
function pl(e, t, s) {
  const n = e.style, i = te(s);
  if (s && !i) {
    if (t && !te(t))
      for (const o in t)
        s[o] == null && Ns(n, o, "");
    for (const o in s)
      Ns(n, o, s[o]);
  } else {
    const o = n.display;
    i ? t !== s && (n.cssText = s) : t && e.removeAttribute("style"), Zs in e && (n.display = o);
  }
}
const An = /\s*!important$/;
function Ns(e, t, s) {
  if (L(s))
    s.forEach((n) => Ns(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = ml(e, t);
    An.test(s) ? e.setProperty(
      at(n),
      s.replace(An, ""),
      "important"
    ) : e[n] = s;
  }
}
const Rn = ["Webkit", "Moz", "ms"], _s = {};
function ml(e, t) {
  const s = _s[t];
  if (s)
    return s;
  let n = Ie(t);
  if (n !== "filter" && n in e)
    return _s[t] = n;
  n = Xt(n);
  for (let i = 0; i < Rn.length; i++) {
    const o = Rn[i] + n;
    if (o in e)
      return _s[t] = o;
  }
  return t;
}
const Mn = "http://www.w3.org/1999/xlink";
function _l(e, t, s, n, i) {
  if (n && t.startsWith("xlink:"))
    s == null ? e.removeAttributeNS(Mn, t.slice(6, t.length)) : e.setAttributeNS(Mn, t, s);
  else {
    const o = _o(t);
    s == null || o && !si(s) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : s);
  }
}
function gl(e, t, s, n, i, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    n && r(n, i, o), e[t] = s ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = s;
    const p = l === "OPTION" ? e.getAttribute("value") : e.value, h = s ?? "";
    p !== h && (e.value = h), s == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (s === "" || s == null) {
    const p = typeof e[t];
    p === "boolean" ? s = si(s) : s == null && p === "string" ? (s = "", a = !0) : p === "number" && (s = 0, a = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  a && e.removeAttribute(t);
}
function bl(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function wl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Nn = Symbol("_vei");
function vl(e, t, s, n, i = null) {
  const o = e[Nn] || (e[Nn] = {}), r = o[t];
  if (n && r)
    r.value = n;
  else {
    const [l, a] = yl(t);
    if (n) {
      const p = o[t] = El(n, i);
      bl(e, l, p, a);
    } else
      r && (wl(e, l, r, a), o[t] = void 0);
  }
}
const kn = /(?:Once|Passive|Capture)$/;
function yl(e) {
  let t;
  if (kn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(kn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : at(e.slice(2)), t];
}
let gs = 0;
const Cl = /* @__PURE__ */ Promise.resolve(), xl = () => gs || (Cl.then(() => gs = 0), gs = Date.now());
function El(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    ve(
      Tl(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = xl(), s;
}
function Tl(e, t) {
  if (L(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map((n) => (i) => !i._stopped && n && n(i));
  } else
    return t;
}
const Sn = /^on[a-z]/, Ol = (e, t, s, n, i = !1, o, r, l, a) => {
  t === "class" ? hl(e, n, i) : t === "style" ? pl(e, s, n) : zt(t) ? Ls(t) || vl(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Pl(e, t, n, i)) ? gl(
    e,
    t,
    n,
    o,
    r,
    l,
    a
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), _l(e, t, n, i));
};
function Pl(e, t, s, n) {
  return n ? !!(t === "innerHTML" || t === "textContent" || t in e && Sn.test(t) && F(s)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Sn.test(t) && te(s) ? !1 : t in e;
}
const Il = /* @__PURE__ */ re({ patchProp: Ol }, fl);
let Ln;
function $l() {
  return Ln || (Ln = Dr(Il));
}
const Al = (...e) => {
  const t = $l().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = Rl(n);
    if (!i)
      return;
    const o = t._component;
    !F(o) && !o.render && !o.template && (o.template = i.innerHTML), i.innerHTML = "";
    const r = s(i, !1, i instanceof SVGElement);
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), r;
  }, t;
};
function Rl(e) {
  return te(e) ? document.querySelector(e) : e;
}
function Wi(e) {
  return Object.entries(e.userVotes).reduce((t, [s, n]) => (n !== "0" && (t[s] = n), t), {});
}
function Ml(e) {
  const t = Ki(e);
  let s = [], n = 0;
  return Object.entries(t).forEach(([i, o]) => {
    o == n ? s.push(i) : o > n && (n = o, s = [i]);
  }), s;
}
function Ki(e) {
  let t = {};
  Object.keys(e.options).forEach((n) => {
    t[n] = 0;
  });
  const s = Wi(e);
  return Object.values(s).forEach((n) => {
    t[n] += 1;
  }), t;
}
function Nl(e) {
  const t = Wi(e);
  return Object.keys(t).length;
}
var jn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function kl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Sl(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var s = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else
    s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(s, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), s;
}
var Vi = { exports: {} };
const Ll = {}, jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ll
}, Symbol.toStringTag, { value: "Module" })), ks = /* @__PURE__ */ Sl(jl);
var Ji = { exports: {} };
const Fl = /^\u0001ACTION ([^\u0001]+)\u0001$/, Dl = /^(justinfan)(\d+$)/, Ul = /\\([sn:r\\])/g, Hl = /([ \n;\r\\])/g, Fn = { s: " ", n: "", ":": ";", r: "" }, Dn = { " ": "s", "\n": "n", ";": ":", "\r": "r" }, Bl = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i"), Wl = /[|\\^$*+?:#]/, jt = Ji.exports = {
  // Return the second value if the first value is undefined..
  get: (e, t) => typeof e > "u" ? t : e,
  // Indirectly use hasOwnProperty
  hasOwn: (e, t) => ({}).hasOwnProperty.call(e, t),
  // Race a promise against a delay..
  promiseDelay: (e) => new Promise((t) => setTimeout(t, e)),
  // Value is a finite number..
  isFinite: (e) => isFinite(e) && !isNaN(parseFloat(e)),
  // Parse string to number. Returns NaN if string can't be parsed to number..
  toNumber(e, t) {
    if (e === null)
      return 0;
    const s = Math.pow(10, jt.isFinite(t) ? t : 0);
    return Math.round(e * s) / s;
  },
  // Value is an integer..
  isInteger: (e) => !isNaN(jt.toNumber(e, 0)),
  // Value is a regex..
  isRegex: (e) => Wl.test(e),
  // Value is a valid url..
  isURL: (e) => Bl.test(e),
  // Return a random justinfan username..
  justinfan: () => `justinfan${Math.floor(Math.random() * 8e4 + 1e3)}`,
  // Username is a justinfan username..
  isJustinfan: (e) => Dl.test(e),
  // Return a valid channel name..
  channel(e) {
    const t = (e || "").toLowerCase();
    return t[0] === "#" ? t : "#" + t;
  },
  // Return a valid username..
  username(e) {
    const t = (e || "").toLowerCase();
    return t[0] === "#" ? t.slice(1) : t;
  },
  // Return a valid token..
  token: (e) => e ? e.toLowerCase().replace("oauth:", "") : "",
  // Return a valid password..
  password(e) {
    const t = jt.token(e);
    return t ? `oauth:${t}` : "";
  },
  actionMessage: (e) => e.match(Fl),
  // Replace all occurences of a string using an object..
  replaceAll(e, t) {
    if (e === null || typeof e > "u")
      return null;
    for (const s in t)
      e = e.replace(new RegExp(s, "g"), t[s]);
    return e;
  },
  unescapeHtml: (e) => e.replace(/\\&amp\\;/g, "&").replace(/\\&lt\\;/g, "<").replace(/\\&gt\\;/g, ">").replace(/\\&quot\\;/g, '"').replace(/\\&#039\\;/g, "'"),
  // Escaping values:
  // http://ircv3.net/specs/core/message-tags-3.2.html#escaping-values
  unescapeIRC(e) {
    return !e || typeof e != "string" || !e.includes("\\") ? e : e.replace(
      Ul,
      (t, s) => s in Fn ? Fn[s] : s
    );
  },
  escapeIRC(e) {
    return !e || typeof e != "string" ? e : e.replace(
      Hl,
      (t, s) => s in Dn ? `\\${Dn[s]}` : s
    );
  },
  // Add word to a string..
  addWord: (e, t) => e.length ? e + " " + t : e + t,
  // Split a line but try not to cut a word in half..
  splitLine(e, t) {
    let s = e.substring(0, t).lastIndexOf(" ");
    return s === -1 && (s = t - 1), [e.substring(0, s), e.substring(s + 1)];
  },
  // Extract a number from a string..
  extractNumber(e) {
    const t = e.split(" ");
    for (let s = 0; s < t.length; s++)
      if (jt.isInteger(t[s]))
        return ~~t[s];
    return 0;
  },
  // Format the date..
  formatDate(e) {
    let t = e.getHours(), s = e.getMinutes();
    return t = (t < 10 ? "0" : "") + t, s = (s < 10 ? "0" : "") + s, `${t}:${s}`;
  },
  // Inherit the prototype methods from one constructor into another..
  inherits(e, t) {
    e.super_ = t;
    const s = function() {
    };
    s.prototype = t.prototype, e.prototype = new s(), e.prototype.constructor = e;
  },
  // Return whether inside a Node application or not..
  isNode() {
    try {
      return typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
    } catch {
    }
    return !1;
  }
};
var It = Ji.exports;
const Kl = ks, Un = It;
var Vl = function(t, s) {
  let n = t.url !== void 0 ? t.url : t.uri;
  if (Un.isURL(n) || (n = `https://api.twitch.tv/kraken${n[0] === "/" ? n : `/${n}`}`), Un.isNode()) {
    const i = Object.assign({ method: "GET", json: !0 }, t);
    if (i.qs) {
      const a = new URLSearchParams(i.qs);
      n += `?${a}`;
    }
    const o = {};
    "fetchAgent" in this.opts.connection && (o.agent = this.opts.connection.fetchAgent);
    const r = Kl(n, {
      ...o,
      method: i.method,
      headers: i.headers,
      body: i.body
    });
    let l = {};
    r.then((a) => (l = { statusCode: a.status, headers: a.headers }, i.json ? a.json() : a.text())).then(
      (a) => s(null, l, a),
      (a) => s(a, l, null)
    );
  } else {
    const i = Object.assign({ method: "GET", headers: {} }, t, { url: n }), o = new XMLHttpRequest();
    o.open(i.method, i.url, !0);
    for (const r in i.headers)
      o.setRequestHeader(r, i.headers[r]);
    o.responseType = "json", o.addEventListener("load", (r) => {
      o.readyState === 4 && (o.status !== 200 ? s(o.status, null, null) : s(null, null, o.response));
    }), o.send();
  }
};
const S = It;
function Hn(e, t) {
  return e = S.channel(e), t = S.get(t, 30), this._sendCommand(null, e, `/followers ${t}`, (s, n) => {
    this.once("_promiseFollowers", (i) => {
      i ? n(i) : s([e, ~~t]);
    });
  });
}
function Bn(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/followersoff", (t, s) => {
    this.once("_promiseFollowersoff", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function Wn(e) {
  return e = S.channel(e), this._sendCommand(null, null, `PART ${e}`, (t, s) => {
    this.once("_promisePart", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function Kn(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/r9kbeta", (t, s) => {
    this.once("_promiseR9kbeta", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function Vn(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/r9kbetaoff", (t, s) => {
    this.once("_promiseR9kbetaoff", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function Jn(e, t) {
  return e = S.channel(e), t = S.get(t, 300), this._sendCommand(null, e, `/slow ${t}`, (s, n) => {
    this.once("_promiseSlow", (i) => {
      i ? n(i) : s([e, ~~t]);
    });
  });
}
function zn(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/slowoff", (t, s) => {
    this.once("_promiseSlowoff", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
var Jl = {
  // Send action message (/me <message>) on a channel..
  action(e, t) {
    return e = S.channel(e), t = `ACTION ${t}`, this._sendMessage(this._getPromiseDelay(), e, t, (s, n) => {
      s([e, t]);
    });
  },
  // Ban username on channel..
  ban(e, t, s) {
    return e = S.channel(e), t = S.username(t), s = S.get(s, ""), this._sendCommand(null, e, `/ban ${t} ${s}`, (n, i) => {
      this.once("_promiseBan", (o) => {
        o ? i(o) : n([e, t, s]);
      });
    });
  },
  // Clear all messages on a channel..
  clear(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/clear", (t, s) => {
      this.once("_promiseClear", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Change the color of your username..
  color(e, t) {
    return t = S.get(t, e), this._sendCommand(null, "#tmijs", `/color ${t}`, (s, n) => {
      this.once("_promiseColor", (i) => {
        i ? n(i) : s([t]);
      });
    });
  },
  // Run commercial on a channel for X seconds..
  commercial(e, t) {
    return e = S.channel(e), t = S.get(t, 30), this._sendCommand(null, e, `/commercial ${t}`, (s, n) => {
      this.once("_promiseCommercial", (i) => {
        i ? n(i) : s([e, ~~t]);
      });
    });
  },
  // Delete a specific message on a channel
  deletemessage(e, t) {
    return e = S.channel(e), this._sendCommand(null, e, `/delete ${t}`, (s, n) => {
      this.once("_promiseDeletemessage", (i) => {
        i ? n(i) : s([e]);
      });
    });
  },
  // Enable emote-only mode on a channel..
  emoteonly(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/emoteonly", (t, s) => {
      this.once("_promiseEmoteonly", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Disable emote-only mode on a channel..
  emoteonlyoff(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/emoteonlyoff", (t, s) => {
      this.once("_promiseEmoteonlyoff", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Enable followers-only mode on a channel..
  followersonly: Hn,
  // Alias for followersonly()..
  followersmode: Hn,
  // Disable followers-only mode on a channel..
  followersonlyoff: Bn,
  // Alias for followersonlyoff()..
  followersmodeoff: Bn,
  // Host a channel..
  host(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(2e3, e, `/host ${t}`, (s, n) => {
      this.once("_promiseHost", (i, o) => {
        i ? n(i) : s([e, t, ~~o]);
      });
    });
  },
  // Join a channel..
  join(e) {
    return e = S.channel(e), this._sendCommand(void 0, null, `JOIN ${e}`, (t, s) => {
      const n = "_promiseJoin";
      let i = !1;
      const o = (l, a) => {
        e === S.channel(a) && (this.removeListener(n, o), i = !0, l ? s(l) : t([e]));
      };
      this.on(n, o);
      const r = this._getPromiseDelay();
      S.promiseDelay(r).then(() => {
        i || this.emit(n, "No response from Twitch.", e);
      });
    });
  },
  // Mod username on channel..
  mod(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/mod ${t}`, (s, n) => {
      this.once("_promiseMod", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Get list of mods on a channel..
  mods(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/mods", (t, s) => {
      this.once("_promiseMods", (n, i) => {
        n ? s(n) : (i.forEach((o) => {
          this.moderators[e] || (this.moderators[e] = []), this.moderators[e].includes(o) || this.moderators[e].push(o);
        }), t(i));
      });
    });
  },
  // Leave a channel..
  part: Wn,
  // Alias for part()..
  leave: Wn,
  // Send a ping to the server..
  ping() {
    return this._sendCommand(null, null, "PING", (e, t) => {
      this.latency = /* @__PURE__ */ new Date(), this.pingTimeout = setTimeout(() => {
        this.ws !== null && (this.wasCloseCalled = !1, this.log.error("Ping timeout."), this.ws.close(), clearInterval(this.pingLoop), clearTimeout(this.pingTimeout));
      }, S.get(this.opts.connection.timeout, 9999)), this.once("_promisePing", (s) => e([parseFloat(s)]));
    });
  },
  // Enable R9KBeta mode on a channel..
  r9kbeta: Kn,
  // Alias for r9kbeta()..
  r9kmode: Kn,
  // Disable R9KBeta mode on a channel..
  r9kbetaoff: Vn,
  // Alias for r9kbetaoff()..
  r9kmodeoff: Vn,
  // Send a raw message to the server..
  raw(e) {
    return this._sendCommand(null, null, e, (t, s) => {
      t([e]);
    });
  },
  // Send a message on a channel..
  say(e, t) {
    return e = S.channel(e), t.startsWith(".") && !t.startsWith("..") || t.startsWith("/") || t.startsWith("\\") ? t.substr(1, 3) === "me " ? this.action(e, t.substr(4)) : this._sendCommand(null, e, t, (s, n) => {
      s([e, t]);
    }) : this._sendMessage(this._getPromiseDelay(), e, t, (s, n) => {
      s([e, t]);
    });
  },
  // Enable slow mode on a channel..
  slow: Jn,
  // Alias for slow()..
  slowmode: Jn,
  // Disable slow mode on a channel..
  slowoff: zn,
  // Alias for slowoff()..
  slowmodeoff: zn,
  // Enable subscribers mode on a channel..
  subscribers(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/subscribers", (t, s) => {
      this.once("_promiseSubscribers", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Disable subscribers mode on a channel..
  subscribersoff(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/subscribersoff", (t, s) => {
      this.once("_promiseSubscribersoff", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Timeout username on channel for X seconds..
  timeout(e, t, s, n) {
    return e = S.channel(e), t = S.username(t), s !== null && !S.isInteger(s) && (n = s, s = 300), s = S.get(s, 300), n = S.get(n, ""), this._sendCommand(null, e, `/timeout ${t} ${s} ${n}`, (i, o) => {
      this.once("_promiseTimeout", (r) => {
        r ? o(r) : i([e, t, ~~s, n]);
      });
    });
  },
  // Unban username on channel..
  unban(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/unban ${t}`, (s, n) => {
      this.once("_promiseUnban", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // End the current hosting..
  unhost(e) {
    return e = S.channel(e), this._sendCommand(2e3, e, "/unhost", (t, s) => {
      this.once("_promiseUnhost", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Unmod username on channel..
  unmod(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/unmod ${t}`, (s, n) => {
      this.once("_promiseUnmod", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Unvip username on channel..
  unvip(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/unvip ${t}`, (s, n) => {
      this.once("_promiseUnvip", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Add username to VIP list on channel..
  vip(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/vip ${t}`, (s, n) => {
      this.once("_promiseVip", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Get list of VIPs on a channel..
  vips(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/vips", (t, s) => {
      this.once("_promiseVips", (n, i) => {
        n ? s(n) : t(i);
      });
    });
  },
  // Send an whisper message to a user..
  whisper(e, t) {
    return e = S.username(e), e === this.getUsername() ? Promise.reject("Cannot send a whisper to the same account.") : this._sendCommand(null, "#tmijs", `/w ${e} ${t}`, (s, n) => {
      this.once("_promiseWhisper", (i) => {
        i && n(i);
      });
    }).catch((s) => {
      if (s && typeof s == "string" && s.indexOf("No response from Twitch.") !== 0)
        throw s;
      const n = S.channel(e), i = Object.assign({
        "message-type": "whisper",
        "message-id": null,
        "thread-id": null,
        username: this.getUsername()
      }, this.globaluserstate);
      return this.emits(["whisper", "message"], [
        [n, i, t, !0],
        [n, i, t, !0]
      ]), [e, t];
    });
  }
};
function se() {
  this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
}
var zl = se;
se.EventEmitter = se;
se.prototype._events = void 0;
se.prototype._maxListeners = void 0;
se.defaultMaxListeners = 10;
se.prototype.setMaxListeners = function(e) {
  if (!ql(e) || e < 0 || isNaN(e))
    throw TypeError("n must be a positive number");
  return this._maxListeners = e, this;
};
se.prototype.emit = function(e) {
  var t, s, n, i, o, r;
  if (this._events || (this._events = {}), e === "error" && (!this._events.error || Ot(this._events.error) && !this._events.error.length))
    throw t = arguments[1], t instanceof Error ? t : TypeError('Uncaught, unspecified "error" event.');
  if (s = this._events[e], zi(s))
    return !1;
  if (Me(s))
    switch (arguments.length) {
      case 1:
        s.call(this);
        break;
      case 2:
        s.call(this, arguments[1]);
        break;
      case 3:
        s.call(this, arguments[1], arguments[2]);
        break;
      default:
        i = Array.prototype.slice.call(arguments, 1), s.apply(this, i);
    }
  else if (Ot(s))
    for (i = Array.prototype.slice.call(arguments, 1), r = s.slice(), n = r.length, o = 0; o < n; o++)
      r[o].apply(this, i);
  return !0;
};
se.prototype.addListener = function(e, t) {
  var s;
  if (!Me(t))
    throw TypeError("listener must be a function");
  return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, Me(t.listener) ? t.listener : t), this._events[e] ? Ot(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, Ot(this._events[e]) && !this._events[e].warned && (zi(this._maxListeners) ? s = se.defaultMaxListeners : s = this._maxListeners, s && s > 0 && this._events[e].length > s && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), typeof console.trace == "function" && console.trace())), this;
};
se.prototype.on = se.prototype.addListener;
se.prototype.once = function(e, t) {
  if (!Me(t))
    throw TypeError("listener must be a function");
  var s = !1;
  if (this._events.hasOwnProperty(e) && e.charAt(0) === "_") {
    var n = 1, i = e;
    for (var o in this._events)
      this._events.hasOwnProperty(o) && o.startsWith(i) && n++;
    e = e + n;
  }
  function r() {
    e.charAt(0) === "_" && !isNaN(e.substr(e.length - 1)) && (e = e.substring(0, e.length - 1)), this.removeListener(e, r), s || (s = !0, t.apply(this, arguments));
  }
  return r.listener = t, this.on(e, r), this;
};
se.prototype.removeListener = function(e, t) {
  var s, n, i, o;
  if (!Me(t))
    throw TypeError("listener must be a function");
  if (!this._events || !this._events[e])
    return this;
  if (s = this._events[e], i = s.length, n = -1, s === t || Me(s.listener) && s.listener === t) {
    if (delete this._events[e], this._events.hasOwnProperty(e + "2") && e.charAt(0) === "_") {
      var r = e;
      for (var l in this._events)
        this._events.hasOwnProperty(l) && l.startsWith(r) && (isNaN(parseInt(l.substr(l.length - 1))) || (this._events[e + parseInt(l.substr(l.length - 1) - 1)] = this._events[l], delete this._events[l]));
      this._events[e] = this._events[e + "1"], delete this._events[e + "1"];
    }
    this._events.removeListener && this.emit("removeListener", e, t);
  } else if (Ot(s)) {
    for (o = i; o-- > 0; )
      if (s[o] === t || s[o].listener && s[o].listener === t) {
        n = o;
        break;
      }
    if (n < 0)
      return this;
    s.length === 1 ? (s.length = 0, delete this._events[e]) : s.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t);
  }
  return this;
};
se.prototype.removeAllListeners = function(e) {
  var t, s;
  if (!this._events)
    return this;
  if (!this._events.removeListener)
    return arguments.length === 0 ? this._events = {} : this._events[e] && delete this._events[e], this;
  if (arguments.length === 0) {
    for (t in this._events)
      t !== "removeListener" && this.removeAllListeners(t);
    return this.removeAllListeners("removeListener"), this._events = {}, this;
  }
  if (s = this._events[e], Me(s))
    this.removeListener(e, s);
  else if (s)
    for (; s.length; )
      this.removeListener(e, s[s.length - 1]);
  return delete this._events[e], this;
};
se.prototype.listeners = function(e) {
  var t;
  return !this._events || !this._events[e] ? t = [] : Me(this._events[e]) ? t = [this._events[e]] : t = this._events[e].slice(), t;
};
se.prototype.listenerCount = function(e) {
  if (this._events) {
    var t = this._events[e];
    if (Me(t))
      return 1;
    if (t)
      return t.length;
  }
  return 0;
};
se.listenerCount = function(e, t) {
  return e.listenerCount(t);
};
function Me(e) {
  return typeof e == "function";
}
function ql(e) {
  return typeof e == "number";
}
function Ot(e) {
  return typeof e == "object" && e !== null;
}
function zi(e) {
  return e === void 0;
}
const Ql = It;
let qi = "info";
const qn = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, fatal: 5 };
function et(e) {
  return function(t) {
    qn[e] >= qn[qi] && console.log(`[${Ql.formatDate(/* @__PURE__ */ new Date())}] ${e}: ${t}`);
  };
}
var Yl = {
  // Change the current logging level..
  setLevel(e) {
    qi = e;
  },
  trace: et("trace"),
  debug: et("debug"),
  info: et("info"),
  warn: et("warn"),
  error: et("error"),
  fatal: et("fatal")
};
const bs = It, tt = /\S+/g;
function ws(e, t, s = ",", n = "/", i) {
  const o = e[t];
  if (o === void 0)
    return e;
  const r = typeof o == "string";
  if (e[t + "-raw"] = r ? o : null, o === !0)
    return e[t] = null, e;
  if (e[t] = {}, r) {
    const l = o.split(s);
    for (let a = 0; a < l.length; a++) {
      const p = l[a].split(n);
      let h = p[1];
      i !== void 0 && h && (h = h.split(i)), e[t][p[0]] = h || null;
    }
  }
  return e;
}
var Xl = {
  // Parse Twitch badges..
  badges: (e) => ws(e, "badges"),
  // Parse Twitch badge-info..
  badgeInfo: (e) => ws(e, "badge-info"),
  // Parse Twitch emotes..
  emotes: (e) => ws(e, "emotes", "/", ":", ","),
  // Parse regex emotes..
  emoteRegex(e, t, s, n) {
    tt.lastIndex = 0;
    const i = new RegExp("(\\b|^|\\s)" + bs.unescapeHtml(t) + "(\\b|$|\\s)");
    let o;
    for (; (o = tt.exec(e)) !== null; )
      i.test(o[0]) && (n[s] = n[s] || [], n[s].push([o.index, tt.lastIndex - 1]));
  },
  // Parse string emotes..
  emoteString(e, t, s, n) {
    tt.lastIndex = 0;
    let i;
    for (; (i = tt.exec(e)) !== null; )
      i[0] === bs.unescapeHtml(t) && (n[s] = n[s] || [], n[s].push([i.index, tt.lastIndex - 1]));
  },
  // Transform the emotes object to a string with the following format..
  // emote_id:first_index-last_index,another_first-another_last/another_emote_id:first_index-last_index
  transformEmotes(e) {
    let t = "";
    return Object.keys(e).forEach((s) => {
      t = `${t + s}:`, e[s].forEach(
        (n) => t = `${t + n.join("-")},`
      ), t = `${t.slice(0, -1)}/`;
    }), t.slice(0, -1);
  },
  formTags(e) {
    const t = [];
    for (const s in e) {
      const n = bs.escapeIRC(e[s]);
      t.push(`${s}=${n}`);
    }
    return `@${t.join(";")}`;
  },
  // Parse Twitch messages..
  msg(e) {
    const t = {
      raw: e,
      tags: {},
      prefix: null,
      command: null,
      params: []
    };
    let s = 0, n = 0;
    if (e.charCodeAt(0) === 64) {
      if (n = e.indexOf(" "), n === -1)
        return null;
      const i = e.slice(1, n).split(";");
      for (let o = 0; o < i.length; o++) {
        const r = i[o], l = r.split("=");
        t.tags[l[0]] = r.substring(r.indexOf("=") + 1) || !0;
      }
      s = n + 1;
    }
    for (; e.charCodeAt(s) === 32; )
      s++;
    if (e.charCodeAt(s) === 58) {
      if (n = e.indexOf(" ", s), n === -1)
        return null;
      for (t.prefix = e.slice(s + 1, n), s = n + 1; e.charCodeAt(s) === 32; )
        s++;
    }
    if (n = e.indexOf(" ", s), n === -1)
      return e.length > s ? (t.command = e.slice(s), t) : null;
    for (t.command = e.slice(s, n), s = n + 1; e.charCodeAt(s) === 32; )
      s++;
    for (; s < e.length; ) {
      if (n = e.indexOf(" ", s), e.charCodeAt(s) === 58) {
        t.params.push(e.slice(s + 1));
        break;
      }
      if (n !== -1) {
        for (t.params.push(e.slice(s, n)), s = n + 1; e.charCodeAt(s) === 32; )
          s++;
        continue;
      }
      if (n === -1) {
        t.params.push(e.slice(s));
        break;
      }
    }
    return t;
  }
};
class Zl {
  constructor(t) {
    this.queue = [], this.index = 0, this.defaultDelay = t === void 0 ? 3e3 : t;
  }
  // Add a new function to the queue..
  add(t, s) {
    this.queue.push({ fn: t, delay: s });
  }
  // Go to the next in queue..
  next() {
    const t = this.index++, s = this.queue[t];
    if (!s)
      return;
    const n = this.queue[this.index];
    if (s.fn(), n) {
      const i = n.delay === void 0 ? this.defaultDelay : n.delay;
      setTimeout(() => this.next(), i);
    }
  }
}
var Gl = Zl;
(function(e) {
  const t = typeof jn < "u" ? jn : typeof window < "u" ? window : {}, s = t.WebSocket || ks, n = t.fetch || ks, i = Vl, o = Jl, r = zl.EventEmitter, l = Yl, a = Xl, p = Gl, h = It;
  let O = !1;
  const C = function I(d) {
    if (!(this instanceof I))
      return new I(d);
    this.opts = h.get(d, {}), this.opts.channels = this.opts.channels || [], this.opts.connection = this.opts.connection || {}, this.opts.identity = this.opts.identity || {}, this.opts.options = this.opts.options || {}, this.clientId = h.get(this.opts.options.clientId, null), this._globalDefaultChannel = h.channel(h.get(this.opts.options.globalDefaultChannel, "#tmijs")), this._skipMembership = h.get(this.opts.options.skipMembership, !1), this._skipUpdatingEmotesets = h.get(this.opts.options.skipUpdatingEmotesets, !1), this._updateEmotesetsTimer = null, this._updateEmotesetsTimerDelay = h.get(this.opts.options.updateEmotesetsTimer, 6e4), this.maxReconnectAttempts = h.get(this.opts.connection.maxReconnectAttempts, 1 / 0), this.maxReconnectInterval = h.get(this.opts.connection.maxReconnectInterval, 3e4), this.reconnect = h.get(this.opts.connection.reconnect, !0), this.reconnectDecay = h.get(this.opts.connection.reconnectDecay, 1.5), this.reconnectInterval = h.get(this.opts.connection.reconnectInterval, 1e3), this.reconnecting = !1, this.reconnections = 0, this.reconnectTimer = this.reconnectInterval, this.secure = h.get(
      this.opts.connection.secure,
      !this.opts.connection.server && !this.opts.connection.port
    ), this.emotes = "", this.emotesets = {}, this.channels = [], this.currentLatency = 0, this.globaluserstate = {}, this.lastJoined = "", this.latency = /* @__PURE__ */ new Date(), this.moderators = {}, this.pingLoop = null, this.pingTimeout = null, this.reason = "", this.username = "", this.userstate = {}, this.wasCloseCalled = !1, this.ws = null;
    let u = "error";
    this.opts.options.debug && (u = "info"), this.log = this.opts.logger || l;
    try {
      l.setLevel(u);
    } catch {
    }
    this.opts.channels.forEach(
      (_, k, $) => $[k] = h.channel(_)
    ), r.call(this), this.setMaxListeners(0);
  };
  h.inherits(C, r);
  for (const I in o)
    C.prototype[I] = o[I];
  C.prototype.emits = function(d, u) {
    for (let _ = 0; _ < d.length; _++) {
      const k = _ < u.length ? u[_] : u[u.length - 1];
      this.emit.apply(this, [d[_]].concat(k));
    }
  }, C.prototype.api = function(...I) {
    O || (this.log.warn("Client.prototype.api is deprecated and will be removed for version 2.0.0"), O = !0), i(...I);
  }, C.prototype.handleMessage = function(d) {
    if (!d)
      return;
    this.listenerCount("raw_message") && this.emit("raw_message", JSON.parse(JSON.stringify(d)), d);
    const u = h.channel(h.get(d.params[0], null));
    let _ = h.get(d.params[1], null);
    const k = h.get(d.tags["msg-id"], null), $ = d.tags = a.badges(a.badgeInfo(a.emotes(d.tags)));
    for (const g in $) {
      if (g === "emote-sets" || g === "ban-duration" || g === "bits")
        continue;
      let b = $[g];
      typeof b == "boolean" ? b = null : b === "1" ? b = !0 : b === "0" ? b = !1 : typeof b == "string" && (b = h.unescapeIRC(b)), $[g] = b;
    }
    if (d.prefix === null)
      switch (d.command) {
        case "PING":
          this.emit("ping"), this._isConnected() && this.ws.send("PONG");
          break;
        case "PONG": {
          const g = /* @__PURE__ */ new Date();
          this.currentLatency = (g.getTime() - this.latency.getTime()) / 1e3, this.emits(["pong", "_promisePing"], [[this.currentLatency]]), clearTimeout(this.pingTimeout);
          break;
        }
        default:
          this.log.warn(`Could not parse message with no prefix:
${JSON.stringify(d, null, 4)}`);
          break;
      }
    else if (d.prefix === "tmi.twitch.tv")
      switch (d.command) {
        case "002":
        case "003":
        case "004":
        case "372":
        case "375":
        case "CAP":
          break;
        case "001":
          this.username = d.params[0];
          break;
        case "376": {
          this.log.info("Connected to server."), this.userstate[this._globalDefaultChannel] = {}, this.emits(["connected", "_promiseConnect"], [[this.server, this.port], [null]]), this.reconnections = 0, this.reconnectTimer = this.reconnectInterval, this.pingLoop = setInterval(() => {
            this._isConnected() && this.ws.send("PING"), this.latency = /* @__PURE__ */ new Date(), this.pingTimeout = setTimeout(() => {
              this.ws !== null && (this.wasCloseCalled = !1, this.log.error("Ping timeout."), this.ws.close(), clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), clearTimeout(this._updateEmotesetsTimer));
            }, h.get(this.opts.connection.timeout, 9999));
          }, 6e4);
          let g = h.get(this.opts.options.joinInterval, 2e3);
          g < 300 && (g = 300);
          const b = new p(g), H = [.../* @__PURE__ */ new Set([...this.opts.channels, ...this.channels])];
          this.channels = [];
          for (let Z = 0; Z < H.length; Z++) {
            const Q = H[Z];
            b.add(() => {
              this._isConnected() && this.join(Q).catch((K) => this.log.error(K));
            });
          }
          b.next();
          break;
        }
        case "NOTICE": {
          const g = [null], b = [u, k, _], H = [k], Z = [u, !0], Q = [u, !1], K = [b, g], B = [b, H], R = `[${u}] ${_}`;
          switch (k) {
            case "subs_on":
              this.log.info(`[${u}] This room is now in subscribers-only mode.`), this.emits(["subscriber", "subscribers", "_promiseSubscribers"], [Z, Z, g]);
              break;
            case "subs_off":
              this.log.info(`[${u}] This room is no longer in subscribers-only mode.`), this.emits(["subscriber", "subscribers", "_promiseSubscribersoff"], [Q, Q, g]);
              break;
            case "emote_only_on":
              this.log.info(`[${u}] This room is now in emote-only mode.`), this.emits(["emoteonly", "_promiseEmoteonly"], [Z, g]);
              break;
            case "emote_only_off":
              this.log.info(`[${u}] This room is no longer in emote-only mode.`), this.emits(["emoteonly", "_promiseEmoteonlyoff"], [Q, g]);
              break;
            case "slow_on":
            case "slow_off":
              break;
            case "followers_on_zero":
            case "followers_on":
            case "followers_off":
              break;
            case "r9k_on":
              this.log.info(`[${u}] This room is now in r9k mode.`), this.emits(["r9kmode", "r9kbeta", "_promiseR9kbeta"], [Z, Z, g]);
              break;
            case "r9k_off":
              this.log.info(`[${u}] This room is no longer in r9k mode.`), this.emits(["r9kmode", "r9kbeta", "_promiseR9kbetaoff"], [Q, Q, g]);
              break;
            case "room_mods": {
              const G = _.split(": "), de = (G.length > 1 ? G[1] : "").toLowerCase().split(", ").filter((ke) => ke);
              this.emits(["_promiseMods", "mods"], [[null, de], [u, de]]);
              break;
            }
            case "no_mods":
              this.emits(["_promiseMods", "mods"], [[null, []], [u, []]]);
              break;
            case "vips_success": {
              _.endsWith(".") && (_ = _.slice(0, -1));
              const G = _.split(": "), de = (G.length > 1 ? G[1] : "").toLowerCase().split(", ").filter((ke) => ke);
              this.emits(["_promiseVips", "vips"], [[null, de], [u, de]]);
              break;
            }
            case "no_vips":
              this.emits(["_promiseVips", "vips"], [[null, []], [u, []]]);
              break;
            case "already_banned":
            case "bad_ban_admin":
            case "bad_ban_anon":
            case "bad_ban_broadcaster":
            case "bad_ban_global_mod":
            case "bad_ban_mod":
            case "bad_ban_self":
            case "bad_ban_staff":
            case "usage_ban":
              this.log.info(R), this.emits(["notice", "_promiseBan"], B);
              break;
            case "ban_success":
              this.log.info(R), this.emits(["notice", "_promiseBan"], K);
              break;
            case "usage_clear":
              this.log.info(R), this.emits(["notice", "_promiseClear"], B);
              break;
            case "usage_mods":
              this.log.info(R), this.emits(["notice", "_promiseMods"], [b, [k, []]]);
              break;
            case "mod_success":
              this.log.info(R), this.emits(["notice", "_promiseMod"], K);
              break;
            case "usage_vips":
              this.log.info(R), this.emits(["notice", "_promiseVips"], [b, [k, []]]);
              break;
            case "usage_vip":
            case "bad_vip_grantee_banned":
            case "bad_vip_grantee_already_vip":
            case "bad_vip_max_vips_reached":
            case "bad_vip_achievement_incomplete":
              this.log.info(R), this.emits(["notice", "_promiseVip"], [b, [k, []]]);
              break;
            case "vip_success":
              this.log.info(R), this.emits(["notice", "_promiseVip"], K);
              break;
            case "usage_mod":
            case "bad_mod_banned":
            case "bad_mod_mod":
              this.log.info(R), this.emits(["notice", "_promiseMod"], B);
              break;
            case "unmod_success":
              this.log.info(R), this.emits(["notice", "_promiseUnmod"], K);
              break;
            case "unvip_success":
              this.log.info(R), this.emits(["notice", "_promiseUnvip"], K);
              break;
            case "usage_unmod":
            case "bad_unmod_mod":
              this.log.info(R), this.emits(["notice", "_promiseUnmod"], B);
              break;
            case "usage_unvip":
            case "bad_unvip_grantee_not_vip":
              this.log.info(R), this.emits(["notice", "_promiseUnvip"], B);
              break;
            case "color_changed":
              this.log.info(R), this.emits(["notice", "_promiseColor"], K);
              break;
            case "usage_color":
            case "turbo_only_color":
              this.log.info(R), this.emits(["notice", "_promiseColor"], B);
              break;
            case "commercial_success":
              this.log.info(R), this.emits(["notice", "_promiseCommercial"], K);
              break;
            case "usage_commercial":
            case "bad_commercial_error":
              this.log.info(R), this.emits(["notice", "_promiseCommercial"], B);
              break;
            case "hosts_remaining": {
              this.log.info(R);
              const G = isNaN(_[0]) ? 0 : parseInt(_[0]);
              this.emits(["notice", "_promiseHost"], [b, [null, ~~G]]);
              break;
            }
            case "bad_host_hosting":
            case "bad_host_rate_exceeded":
            case "bad_host_error":
            case "usage_host":
              this.log.info(R), this.emits(["notice", "_promiseHost"], [b, [k, null]]);
              break;
            case "already_r9k_on":
            case "usage_r9k_on":
              this.log.info(R), this.emits(["notice", "_promiseR9kbeta"], B);
              break;
            case "already_r9k_off":
            case "usage_r9k_off":
              this.log.info(R), this.emits(["notice", "_promiseR9kbetaoff"], B);
              break;
            case "timeout_success":
              this.log.info(R), this.emits(["notice", "_promiseTimeout"], K);
              break;
            case "delete_message_success":
              this.log.info(`[${u} ${_}]`), this.emits(["notice", "_promiseDeletemessage"], K);
              break;
            case "already_subs_off":
            case "usage_subs_off":
              this.log.info(R), this.emits(["notice", "_promiseSubscribersoff"], B);
              break;
            case "already_subs_on":
            case "usage_subs_on":
              this.log.info(R), this.emits(["notice", "_promiseSubscribers"], B);
              break;
            case "already_emote_only_off":
            case "usage_emote_only_off":
              this.log.info(R), this.emits(["notice", "_promiseEmoteonlyoff"], B);
              break;
            case "already_emote_only_on":
            case "usage_emote_only_on":
              this.log.info(R), this.emits(["notice", "_promiseEmoteonly"], B);
              break;
            case "usage_slow_on":
              this.log.info(R), this.emits(["notice", "_promiseSlow"], B);
              break;
            case "usage_slow_off":
              this.log.info(R), this.emits(["notice", "_promiseSlowoff"], B);
              break;
            case "usage_timeout":
            case "bad_timeout_admin":
            case "bad_timeout_anon":
            case "bad_timeout_broadcaster":
            case "bad_timeout_duration":
            case "bad_timeout_global_mod":
            case "bad_timeout_mod":
            case "bad_timeout_self":
            case "bad_timeout_staff":
              this.log.info(R), this.emits(["notice", "_promiseTimeout"], B);
              break;
            case "untimeout_success":
            case "unban_success":
              this.log.info(R), this.emits(["notice", "_promiseUnban"], K);
              break;
            case "usage_unban":
            case "bad_unban_no_ban":
              this.log.info(R), this.emits(["notice", "_promiseUnban"], B);
              break;
            case "usage_delete":
            case "bad_delete_message_error":
            case "bad_delete_message_broadcaster":
            case "bad_delete_message_mod":
              this.log.info(R), this.emits(["notice", "_promiseDeletemessage"], B);
              break;
            case "usage_unhost":
            case "not_hosting":
              this.log.info(R), this.emits(["notice", "_promiseUnhost"], B);
              break;
            case "whisper_invalid_login":
            case "whisper_invalid_self":
            case "whisper_limit_per_min":
            case "whisper_limit_per_sec":
            case "whisper_restricted":
            case "whisper_restricted_recipient":
              this.log.info(R), this.emits(["notice", "_promiseWhisper"], B);
              break;
            case "no_permission":
            case "msg_banned":
            case "msg_room_not_found":
            case "msg_channel_suspended":
            case "tos_ban":
            case "invalid_user":
              this.log.info(R), this.emits([
                "notice",
                "_promiseBan",
                "_promiseClear",
                "_promiseUnban",
                "_promiseTimeout",
                "_promiseDeletemessage",
                "_promiseMods",
                "_promiseMod",
                "_promiseUnmod",
                "_promiseVips",
                "_promiseVip",
                "_promiseUnvip",
                "_promiseCommercial",
                "_promiseHost",
                "_promiseUnhost",
                "_promiseJoin",
                "_promisePart",
                "_promiseR9kbeta",
                "_promiseR9kbetaoff",
                "_promiseSlow",
                "_promiseSlowoff",
                "_promiseFollowers",
                "_promiseFollowersoff",
                "_promiseSubscribers",
                "_promiseSubscribersoff",
                "_promiseEmoteonly",
                "_promiseEmoteonlyoff",
                "_promiseWhisper"
              ], [b, [k, u]]);
              break;
            case "msg_rejected":
            case "msg_rejected_mandatory":
              this.log.info(R), this.emit("automod", u, k, _);
              break;
            case "unrecognized_cmd":
              this.log.info(R), this.emit("notice", u, k, _);
              break;
            case "cmds_available":
            case "host_target_went_offline":
            case "msg_censored_broadcaster":
            case "msg_duplicate":
            case "msg_emoteonly":
            case "msg_verified_email":
            case "msg_ratelimit":
            case "msg_subsonly":
            case "msg_timedout":
            case "msg_bad_characters":
            case "msg_channel_blocked":
            case "msg_facebook":
            case "msg_followersonly":
            case "msg_followersonly_followed":
            case "msg_followersonly_zero":
            case "msg_slowmode":
            case "msg_suspended":
            case "no_help":
            case "usage_disconnect":
            case "usage_help":
            case "usage_me":
            case "unavailable_command":
              this.log.info(R), this.emit("notice", u, k, _);
              break;
            case "host_on":
            case "host_off":
              break;
            default:
              _.includes("Login unsuccessful") || _.includes("Login authentication failed") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = _, this.log.error(this.reason), this.ws.close()) : _.includes("Error logging in") || _.includes("Improperly formatted auth") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = _, this.log.error(this.reason), this.ws.close()) : _.includes("Invalid NICK") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = "Invalid NICK.", this.log.error(this.reason), this.ws.close()) : (this.log.warn(`Could not parse NOTICE from tmi.twitch.tv:
${JSON.stringify(d, null, 4)}`), this.emit("notice", u, k, _));
              break;
          }
          break;
        }
        case "USERNOTICE": {
          const g = $["display-name"] || $.login, b = $["msg-param-sub-plan"] || "", H = h.unescapeIRC(h.get($["msg-param-sub-plan-name"], "")) || null, Q = { prime: b.includes("Prime"), plan: b, planName: H }, K = ~~($["msg-param-streak-months"] || 0), B = $["msg-param-recipient-display-name"] || $["msg-param-recipient-user-name"], R = ~~$["msg-param-mass-gift-count"];
          switch ($["message-type"] = k, k) {
            case "resub":
              this.emits(["resub", "subanniversary"], [
                [u, g, K, _, $, Q]
              ]);
              break;
            case "sub":
              this.emits(["subscription", "sub"], [
                [u, g, Q, _, $]
              ]);
              break;
            case "subgift":
              this.emit("subgift", u, g, K, B, Q, $);
              break;
            case "anonsubgift":
              this.emit("anonsubgift", u, K, B, Q, $);
              break;
            case "submysterygift":
              this.emit("submysterygift", u, g, R, Q, $);
              break;
            case "anonsubmysterygift":
              this.emit("anonsubmysterygift", u, R, Q, $);
              break;
            case "primepaidupgrade":
              this.emit("primepaidupgrade", u, g, Q, $);
              break;
            case "giftpaidupgrade": {
              const G = $["msg-param-sender-name"] || $["msg-param-sender-login"];
              this.emit("giftpaidupgrade", u, g, G, $);
              break;
            }
            case "anongiftpaidupgrade":
              this.emit("anongiftpaidupgrade", u, g, $);
              break;
            case "raid": {
              const G = $["msg-param-displayName"] || $["msg-param-login"], de = +$["msg-param-viewerCount"];
              this.emit("raided", u, G, de, $);
              break;
            }
            case "ritual": {
              const G = $["msg-param-ritual-name"];
              switch (G) {
                case "new_chatter":
                  this.emit("newchatter", u, g, $, _);
                  break;
                default:
                  this.emit("ritual", G, u, g, $, _);
                  break;
              }
              break;
            }
            default:
              this.emit("usernotice", k, u, $, _);
              break;
          }
          break;
        }
        case "HOSTTARGET": {
          const g = _.split(" "), b = ~~g[1] || 0;
          g[0] === "-" ? (this.log.info(`[${u}] Exited host mode.`), this.emits(["unhost", "_promiseUnhost"], [[u, b], [null]])) : (this.log.info(`[${u}] Now hosting ${g[0]} for ${b} viewer(s).`), this.emit("hosting", u, g[0], b));
          break;
        }
        case "CLEARCHAT":
          if (d.params.length > 1) {
            const g = h.get(d.tags["ban-duration"], null);
            g === null ? (this.log.info(`[${u}] ${_} has been banned.`), this.emit("ban", u, _, null, d.tags)) : (this.log.info(`[${u}] ${_} has been timed out for ${g} seconds.`), this.emit("timeout", u, _, null, ~~g, d.tags));
          } else
            this.log.info(`[${u}] Chat was cleared by a moderator.`), this.emits(["clearchat", "_promiseClear"], [[u], [null]]);
          break;
        case "CLEARMSG":
          if (d.params.length > 1) {
            const g = _, b = $.login;
            $["message-type"] = "messagedeleted", this.log.info(`[${u}] ${b}'s message has been deleted.`), this.emit("messagedeleted", u, b, g, $);
          }
          break;
        case "RECONNECT":
          this.log.info("Received RECONNECT request from Twitch.."), this.log.info(`Disconnecting and reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`), this.disconnect().catch((g) => this.log.error(g)), setTimeout(() => this.connect().catch((g) => this.log.error(g)), this.reconnectTimer);
          break;
        case "USERSTATE":
          d.tags.username = this.username, d.tags["user-type"] === "mod" && (this.moderators[u] || (this.moderators[u] = []), this.moderators[u].includes(this.username) || this.moderators[u].push(this.username)), !h.isJustinfan(this.getUsername()) && !this.userstate[u] && (this.userstate[u] = $, this.lastJoined = u, this.channels.push(u), this.log.info(`Joined ${u}`), this.emit("join", u, h.username(this.getUsername()), !0)), d.tags["emote-sets"] !== this.emotes && this._updateEmoteset(d.tags["emote-sets"]), this.userstate[u] = $;
          break;
        case "GLOBALUSERSTATE":
          this.globaluserstate = $, this.emit("globaluserstate", $), typeof d.tags["emote-sets"] < "u" && this._updateEmoteset(d.tags["emote-sets"]);
          break;
        case "ROOMSTATE":
          if (h.channel(this.lastJoined) === u && this.emit("_promiseJoin", null, u), d.tags.channel = u, this.emit("roomstate", u, d.tags), !h.hasOwn(d.tags, "subs-only")) {
            if (h.hasOwn(d.tags, "slow"))
              if (typeof d.tags.slow == "boolean" && !d.tags.slow) {
                const g = [u, !1, 0];
                this.log.info(`[${u}] This room is no longer in slow mode.`), this.emits(["slow", "slowmode", "_promiseSlowoff"], [g, g, [null]]);
              } else {
                const g = ~~d.tags.slow, b = [u, !0, g];
                this.log.info(`[${u}] This room is now in slow mode.`), this.emits(["slow", "slowmode", "_promiseSlow"], [b, b, [null]]);
              }
            if (h.hasOwn(d.tags, "followers-only"))
              if (d.tags["followers-only"] === "-1") {
                const g = [u, !1, 0];
                this.log.info(`[${u}] This room is no longer in followers-only mode.`), this.emits(["followersonly", "followersmode", "_promiseFollowersoff"], [g, g, [null]]);
              } else {
                const g = ~~d.tags["followers-only"], b = [u, !0, g];
                this.log.info(`[${u}] This room is now in follower-only mode.`), this.emits(["followersonly", "followersmode", "_promiseFollowers"], [b, b, [null]]);
              }
          }
          break;
        case "SERVERCHANGE":
          break;
        default:
          this.log.warn(`Could not parse message from tmi.twitch.tv:
${JSON.stringify(d, null, 4)}`);
          break;
      }
    else if (d.prefix === "jtv")
      switch (d.command) {
        case "MODE":
          _ === "+o" ? (this.moderators[u] || (this.moderators[u] = []), this.moderators[u].includes(d.params[2]) || this.moderators[u].push(d.params[2]), this.emit("mod", u, d.params[2])) : _ === "-o" && (this.moderators[u] || (this.moderators[u] = []), this.moderators[u].filter((g) => g !== d.params[2]), this.emit("unmod", u, d.params[2]));
          break;
        default:
          this.log.warn(`Could not parse message from jtv:
${JSON.stringify(d, null, 4)}`);
          break;
      }
    else
      switch (d.command) {
        case "353":
          this.emit("names", d.params[2], d.params[3].split(" "));
          break;
        case "366":
          break;
        case "JOIN": {
          const g = d.prefix.split("!")[0];
          h.isJustinfan(this.getUsername()) && this.username === g && (this.lastJoined = u, this.channels.push(u), this.log.info(`Joined ${u}`), this.emit("join", u, g, !0)), this.username !== g && this.emit("join", u, g, !1);
          break;
        }
        case "PART": {
          let g = !1;
          const b = d.prefix.split("!")[0];
          if (this.username === b) {
            g = !0, this.userstate[u] && delete this.userstate[u];
            let H = this.channels.indexOf(u);
            H !== -1 && this.channels.splice(H, 1), H = this.opts.channels.indexOf(u), H !== -1 && this.opts.channels.splice(H, 1), this.log.info(`Left ${u}`), this.emit("_promisePart", null);
          }
          this.emit("part", u, b, g);
          break;
        }
        case "WHISPER": {
          const g = d.prefix.split("!")[0];
          this.log.info(`[WHISPER] <${g}>: ${_}`), h.hasOwn(d.tags, "username") || (d.tags.username = g), d.tags["message-type"] = "whisper";
          const b = h.channel(d.tags.username);
          this.emits(["whisper", "message"], [
            [b, d.tags, _, !1]
          ]);
          break;
        }
        case "PRIVMSG":
          if (d.tags.username = d.prefix.split("!")[0], d.tags.username === "jtv") {
            const g = h.username(_.split(" ")[0]), b = _.includes("auto");
            if (_.includes("hosting you for")) {
              const H = h.extractNumber(_);
              this.emit("hosted", u, g, H, b);
            } else
              _.includes("hosting you") && this.emit("hosted", u, g, 0, b);
          } else {
            const g = h.get(this.opts.options.messagesLogLevel, "info"), b = h.actionMessage(_);
            if (d.tags["message-type"] = b ? "action" : "chat", _ = b ? b[1] : _, h.hasOwn(d.tags, "bits"))
              this.emit("cheer", u, d.tags, _);
            else {
              if (h.hasOwn(d.tags, "msg-id")) {
                if (d.tags["msg-id"] === "highlighted-message") {
                  const H = d.tags["msg-id"];
                  this.emit("redeem", u, d.tags.username, H, d.tags, _);
                } else if (d.tags["msg-id"] === "skip-subs-mode-message") {
                  const H = d.tags["msg-id"];
                  this.emit("redeem", u, d.tags.username, H, d.tags, _);
                }
              } else if (h.hasOwn(d.tags, "custom-reward-id")) {
                const H = d.tags["custom-reward-id"];
                this.emit("redeem", u, d.tags.username, H, d.tags, _);
              }
              b ? (this.log[g](`[${u}] *<${d.tags.username}>: ${_}`), this.emits(["action", "message"], [
                [u, d.tags, _, !1]
              ])) : (this.log[g](`[${u}] <${d.tags.username}>: ${_}`), this.emits(["chat", "message"], [
                [u, d.tags, _, !1]
              ]));
            }
          }
          break;
        default:
          this.log.warn(`Could not parse message:
${JSON.stringify(d, null, 4)}`);
          break;
      }
  }, C.prototype.connect = function() {
    return new Promise((d, u) => {
      this.server = h.get(this.opts.connection.server, "irc-ws.chat.twitch.tv"), this.port = h.get(this.opts.connection.port, 80), this.secure && (this.port = 443), this.port === 443 && (this.secure = !0), this.reconnectTimer = this.reconnectTimer * this.reconnectDecay, this.reconnectTimer >= this.maxReconnectInterval && (this.reconnectTimer = this.maxReconnectInterval), this._openConnection(), this.once("_promiseConnect", (_) => {
        _ ? u(_) : d([this.server, ~~this.port]);
      });
    });
  }, C.prototype._openConnection = function() {
    const d = `${this.secure ? "wss" : "ws"}://${this.server}:${this.port}/`, u = {};
    "agent" in this.opts.connection && (u.agent = this.opts.connection.agent), this.ws = new s(d, "irc", u), this.ws.onmessage = this._onMessage.bind(this), this.ws.onerror = this._onError.bind(this), this.ws.onclose = this._onClose.bind(this), this.ws.onopen = this._onOpen.bind(this);
  }, C.prototype._onOpen = function() {
    this._isConnected() && (this.log.info(`Connecting to ${this.server} on port ${this.port}..`), this.emit("connecting", this.server, ~~this.port), this.username = h.get(this.opts.identity.username, h.justinfan()), this._getToken().then((d) => {
      const u = h.password(d);
      this.log.info("Sending authentication to server.."), this.emit("logon");
      let _ = "twitch.tv/tags twitch.tv/commands";
      this._skipMembership || (_ += " twitch.tv/membership"), this.ws.send("CAP REQ :" + _), u ? this.ws.send(`PASS ${u}`) : h.isJustinfan(this.username) && this.ws.send("PASS SCHMOOPIIE"), this.ws.send(`NICK ${this.username}`);
    }).catch((d) => {
      this.emits(["_promiseConnect", "disconnected"], [[d], ["Could not get a token."]]);
    }));
  }, C.prototype._getToken = function() {
    const d = this.opts.identity.password;
    let u;
    return typeof d == "function" ? (u = d(), u instanceof Promise ? u : Promise.resolve(u)) : Promise.resolve(d);
  }, C.prototype._onMessage = function(d) {
    d.data.trim().split(`\r
`).forEach((_) => {
      const k = a.msg(_);
      k && this.handleMessage(k);
    });
  }, C.prototype._onError = function() {
    this.moderators = {}, this.userstate = {}, this.globaluserstate = {}, clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), clearTimeout(this._updateEmotesetsTimer), this.reason = this.ws === null ? "Connection closed." : "Unable to connect.", this.emits(["_promiseConnect", "disconnected"], [[this.reason]]), this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"), this.log.error("Maximum reconnection attempts reached.")), this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0, this.reconnections = this.reconnections + 1, this.log.error(`Reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`), this.emit("reconnect"), setTimeout(() => {
      this.reconnecting = !1, this.connect().catch((d) => this.log.error(d));
    }, this.reconnectTimer)), this.ws = null;
  }, C.prototype._onClose = function() {
    this.moderators = {}, this.userstate = {}, this.globaluserstate = {}, clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), clearTimeout(this._updateEmotesetsTimer), this.wasCloseCalled ? (this.wasCloseCalled = !1, this.reason = "Connection closed.", this.log.info(this.reason), this.emits(["_promiseConnect", "_promiseDisconnect", "disconnected"], [[this.reason], [null], [this.reason]])) : (this.emits(["_promiseConnect", "disconnected"], [[this.reason]]), this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"), this.log.error("Maximum reconnection attempts reached.")), this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0, this.reconnections = this.reconnections + 1, this.log.error(`Could not connect to server. Reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`), this.emit("reconnect"), setTimeout(() => {
      this.reconnecting = !1, this.connect().catch((d) => this.log.error(d));
    }, this.reconnectTimer))), this.ws = null;
  }, C.prototype._getPromiseDelay = function() {
    return this.currentLatency <= 600 ? 600 : this.currentLatency + 100;
  }, C.prototype._sendCommand = function(d, u, _, k) {
    return new Promise(($, g) => {
      if (this._isConnected())
        (d === null || typeof d == "number") && (d === null && (d = this._getPromiseDelay()), h.promiseDelay(d).then(() => g("No response from Twitch.")));
      else
        return g("Not connected to server.");
      if (u !== null) {
        const b = h.channel(u);
        this.log.info(`[${b}] Executing command: ${_}`), this.ws.send(`PRIVMSG ${b} :${_}`);
      } else
        this.log.info(`Executing command: ${_}`), this.ws.send(_);
      typeof k == "function" ? k($, g) : $();
    });
  }, C.prototype._sendMessage = function(d, u, _, k) {
    return new Promise(($, g) => {
      if (this._isConnected()) {
        if (h.isJustinfan(this.getUsername()))
          return g("Cannot send anonymous messages.");
      } else
        return g("Not connected to server.");
      const b = h.channel(u);
      if (this.userstate[b] || (this.userstate[b] = {}), _.length >= 500) {
        const B = h.splitLine(_, 500);
        _ = B[0], setTimeout(() => {
          this._sendMessage(d, u, B[1], () => {
          });
        }, 350);
      }
      this.ws.send(`PRIVMSG ${b} :${_}`);
      const H = {};
      Object.keys(this.emotesets).forEach(
        (B) => this.emotesets[B].forEach((R) => (h.isRegex(R.code) ? a.emoteRegex : a.emoteString)(_, R.code, R.id, H))
      );
      const Z = Object.assign(
        this.userstate[b],
        a.emotes({ emotes: a.transformEmotes(H) || null })
      ), Q = h.get(this.opts.options.messagesLogLevel, "info"), K = h.actionMessage(_);
      K ? (Z["message-type"] = "action", this.log[Q](`[${b}] *<${this.getUsername()}>: ${K[1]}`), this.emits(["action", "message"], [
        [b, Z, K[1], !0]
      ])) : (Z["message-type"] = "chat", this.log[Q](`[${b}] <${this.getUsername()}>: ${_}`), this.emits(["chat", "message"], [
        [b, Z, _, !0]
      ])), typeof k == "function" ? k($, g) : $();
    });
  }, C.prototype._updateEmoteset = function(d) {
    let u = d !== void 0;
    if (u && (d === this.emotes ? u = !1 : this.emotes = d), this._skipUpdatingEmotesets) {
      u && this.emit("emotesets", d, {});
      return;
    }
    const _ = () => {
      this._updateEmotesetsTimerDelay > 0 && (clearTimeout(this._updateEmotesetsTimer), this._updateEmotesetsTimer = setTimeout(() => this._updateEmoteset(d), this._updateEmotesetsTimerDelay));
    };
    this._getToken().then((k) => {
      const $ = `https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=${d}`, g = {};
      return "fetchAgent" in this.opts.connection && (g.agent = this.opts.connection.fetchAgent), n($, {
        ...g,
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          Authorization: `OAuth ${h.token(k)}`,
          "Client-ID": this.clientId
        }
      });
    }).then((k) => k.json()).then((k) => {
      this.emotesets = k.emoticon_sets || {}, this.emit("emotesets", d, this.emotesets), _();
    }).catch(() => _());
  }, C.prototype.getUsername = function() {
    return this.username;
  }, C.prototype.getOptions = function() {
    return this.opts;
  }, C.prototype.getChannels = function() {
    return this.channels;
  }, C.prototype.isMod = function(d, u) {
    const _ = h.channel(d);
    return this.moderators[_] || (this.moderators[_] = []), this.moderators[_].includes(h.username(u));
  }, C.prototype.readyState = function() {
    return this.ws === null ? "CLOSED" : ["CONNECTING", "OPEN", "CLOSING", "CLOSED"][this.ws.readyState];
  }, C.prototype._isConnected = function() {
    return this.ws !== null && this.ws.readyState === 1;
  }, C.prototype.disconnect = function() {
    return new Promise((d, u) => {
      this.ws !== null && this.ws.readyState !== 3 ? (this.wasCloseCalled = !0, this.log.info("Disconnecting from server.."), this.ws.close(), this.once("_promiseDisconnect", () => d([this.server, ~~this.port]))) : (this.log.error("Cannot disconnect from server. Socket is not opened or connection is already closing."), u("Cannot disconnect from server. Socket is not opened or connection is already closing."));
    });
  }, C.prototype.off = C.prototype.removeListener, e.exports && (e.exports = C), typeof window < "u" && (window.tmi = {
    client: C,
    Client: C
  });
})(Vi);
var ec = Vi.exports;
const Qn = ec;
var tc = {
  client: Qn,
  Client: Qn
};
const sc = /* @__PURE__ */ kl(tc), Qi = /^!poll$/, Yi = /^!poll [2-9]$/, Xi = /^!poll( "[^"]*")( "[^"]+"){2,}$/, Yn = /"([^"]*)"/g, nc = /^!polltitle( "[^"]+")$/, ic = /^!poll_tl$|^!poll_tr$|^!poll_br$|^!poll_bl$/, Zi = /^\s*(\d)(?: .*)?$/, oc = (e) => Qi.test(e) || Yi.test(e) || Xi.test(e), rc = (e) => /^!pollresume/g.test(e), lc = (e) => /^!pollend/g.test(e), cc = (e) => /^!pollstop/g.test(e), ac = (e) => /^!pollreset/g.test(e), fc = (e) => nc.test(e), uc = (e) => ic.test(e), Ve = (e) => {
  var t;
  return !!((t = e.badges) != null && t.broadcaster || e.mod);
}, hc = (e) => Zi.test(e), dc = {
  active: !0,
  visible: !0,
  title: "Debug Mode Poll",
  options: { 1: "Pizza", 2: "Jam", 3: "Coffee" },
  userVotes: { user1: "1", user2: "3", user3: "3" },
  position: "tl"
}, pc = {
  active: !1,
  visible: !1,
  title: "Poll",
  options: {},
  userVotes: {},
  position: "tl"
}, ie = es({
  ...pc,
  stopPoll() {
    this.active = !1;
  },
  resumePoll() {
    this.active = !0;
  },
  endPoll() {
    this.active = !1, this.visible = !1, this.title = "Poll", this.options = {}, this.userVotes = {};
  },
  resetPoll() {
    this.active = !0, this.userVotes = {};
  },
  updatePollTitle(e) {
    const s = e.match(Yn).shift().replaceAll('"', "");
    this.title = s;
  },
  updatePosition(e) {
    const t = e.split("_")[1];
    this.position = t;
  },
  castVote(e, t) {
    var n;
    if (!this.visible || !this.active)
      return;
    const s = (n = e.match(Zi)) == null ? void 0 : n[1];
    s && (this.options[s] || s === "0") && (this.userVotes[t] = s);
  },
  setDebugMode(e) {
    this.debugMode = e, Object.assign(this, dc);
  },
  startPoll(e) {
    var t;
    if (!(this.visible || this.active)) {
      if (this.options = {}, this.userVotes = {}, this.active = !0, this.visible = !0, this.title = "Poll", Qi.test(e))
        for (let s = 1; s <= 2; s++)
          this.options[s] = " ";
      else if (Yi.test(e)) {
        const s = (t = e.match(/!poll (\d)/)) == null ? void 0 : t[1];
        if (s)
          for (let n = 1; n <= s; n++)
            this.options[n] = " ";
      } else if (Xi.test(e)) {
        const s = [...e.matchAll(Yn)].map((i) => i[1]), n = s.shift();
        this.title = n, s.forEach((i, o) => {
          this.options[o + 1] = i;
        });
      }
    }
  }
});
function Xn(e, t) {
  oc(t) && Ve(e) && ie.startPoll(t), cc(t) && Ve(e) && ie.stopPoll(), rc(t) && Ve(e) && ie.resumePoll(), lc(t) && Ve(e) && ie.endPoll(), fc(t) && Ve(e) && ie.updatePollTitle(t), uc(t) && Ve(e) && ie.updatePosition(t), ac(t) && Ve(e) && ie.resetPoll(), hc(t) && ie.castVote(t, e.username);
}
const Gi = {
  tl: "top-left",
  tr: "top-right",
  br: "bottom-right",
  bl: "bottom-left"
};
function mc() {
  const e = new URLSearchParams(window.location.search), t = e.get("position"), s = e.has("debug"), n = e.get("channel");
  t && Gi[t] && ie.updatePosition(t), s && (ie.setDebugMode(!0), window.chat = (o, r = "testuser", l = !0) => {
    Xn({ mod: l, username: r }, o);
  });
  const i = sc.Client({
    channels: [n]
  });
  i.connect(), i.on("message", (o, r, l) => Xn(r, l));
}
const eo = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, _c = {
  props: {
    optionNumber: String,
    optionName: String,
    voteCount: Number,
    totalCount: Number,
    winningOptions: Array
  },
  computed: {
    percentage() {
      return this.totalCount === 0 ? 0 : Math.round(this.voteCount / this.totalCount * 100);
    },
    optionClasses() {
      return this.winningOptions.includes(this.optionNumber) ? this.winningOptions.length === 1 ? "winning-option animate__animated animate__bounceIn" : "draw-option animate__animated animate__shakeX" : "";
    }
  }
}, gc = { class: "option-number" }, bc = { contentEditable: !0 }, wc = { class: "percentage" }, vc = { class: "progress-bar-container" };
function yc(e, t, s, n, i, o) {
  return Ht(), Ms("div", {
    class: Pt(["option", o.optionClasses]),
    key: s.optionNumber
  }, [
    Te("div", null, [
      Te("div", gc, mt(s.optionNumber), 1),
      Te("span", bc, mt(s.optionName), 1),
      Ui(": "),
      Te("span", wc, mt(o.percentage) + "% (" + mt(s.voteCount) + ")", 1)
    ]),
    Te("div", vc, [
      Te("div", {
        class: "progress-bar",
        style: Zt({ width: `${o.percentage}%` })
      }, null, 4)
    ])
  ], 2);
}
const Cc = /* @__PURE__ */ eo(_c, [["render", yc]]);
const xc = {
  components: {
    PollOption: Cc
  },
  computed: {
    pollState() {
      return ie;
    },
    totalVoteCount() {
      return Nl(ie);
    },
    voteCountsPerOption() {
      return Ki(ie);
    },
    winningOptions() {
      return ie.active ? [] : Ml(ie);
    },
    positionClassName() {
      return Gi[ie.position];
    }
  }
}, Ec = { class: "poll" }, Tc = {
  id: "poll-title",
  class: "poll-title"
};
function Oc(e, t, s, n, i, o) {
  const r = yr("PollOption");
  return Ht(), Ms("div", {
    class: Pt(["container", o.positionClassName])
  }, [
    cr(Te("div", Ec, [
      Te("h1", Tc, mt(o.pollState.title), 1),
      (Ht(!0), Ms(Ee, null, Er(Object.entries(o.pollState.options), ([l, a]) => (Ht(), Vr(r, {
        optionNumber: l,
        optionName: a,
        voteCount: o.voteCountsPerOption[l],
        totalCount: o.totalVoteCount,
        winningOptions: o.winningOptions,
        key: l
      }, null, 8, ["optionNumber", "optionName", "voteCount", "totalCount", "winningOptions"]))), 128))
    ], 512), [
      [dl, o.pollState.visible]
    ])
  ], 2);
}
const Pc = /* @__PURE__ */ eo(xc, [["render", Oc]]);
mc();
Al(Pc).mount("#app");
