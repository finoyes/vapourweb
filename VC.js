let _ = {
    t: "PRE",
    o: function (o, n) {
      var i = o.i.element;
      ((i.style.backgroundColor = o.i.background),
        (i.style.color = o.i.color),
        (i.style.fontWeight = o.i.weight),
        (o.rows == e && o.cols == p) ||
          ((p = o.cols), (e = o.rows), (d.length = 0)));
      for (; i.childElementCount < e; ) {
        var t = document.createElement("span");
        ((t.style.display = "block"), i.appendChild(t));
      }
      for (; i.childElementCount > e; ) i.removeChild(i.lastChild);
      for (let t = 0; t < e; t++) {
        var l = t * p;
        let e = !1;
        for (let t = 0; t < p; t++) {
          var r = t + l,
            a = n[r],
            f = d[r];
          ((t, e) =>
            "object" == typeof t &&
            "object" == typeof e &&
            t.char === e.char &&
            t.weight === e.weight &&
            t.color === e.color &&
            t.background === e.background &&
            t.l === e.l &&
            t.u === e.u)(a, f) ||
            ((e = !0), (d[r] = { ...a }));
        }
        if (0 != e) {
          let e = "",
            r = {},
            a = !1;
          for (let t = 0; t < p; t++) {
            var s = n[t + l];
            if (
              (s.l && (a && ((e += "</span>"), (r = {}), (a = !1)), (e += s.l)),
              !((t, e) =>
                t.weight === e.weight &&
                t.color === e.color &&
                t.background === e.background)(s, r))
            ) {
              a && (e += "</span>");
              var u = s.color === o.i.color ? null : s.color,
                c = s.background === o.i.background ? null : s.background,
                h = s.weight === o.i.weight ? null : s.weight;
              let t = "";
              (u && (t += "color:" + u + ";"),
                c && (t += "background:" + c + ";"),
                h && (t += "font-weight:" + h + ";"),
                (t = t && ' style="' + t + '"'),
                (e += "<span" + t + ">"),
                (a = !0));
            }
            ((e += s.char),
              (r = s).u &&
                (a && ((e += "</span>"), (r = {}), (a = !1)), (e += s.u)));
          }
          (a && (e += "</span>"), (i.childNodes[t].innerHTML = e));
        }
      }
    },
  },
  d = [],
  p,
  e;
class D {
  constructor() {
    ((this.frames = 0), (this.h = 0), (this.p = 0));
  }
  update(t) {
    return (
      this.frames++,
      t >= this.h + 1e3 &&
        ((this.p = (1e3 * this.frames) / (t - this.h)),
        (this.h = t),
        (this.frames = 0)),
      this.p
    );
  }
}
var T = {
  store: function (t, e) {
    try {
      return (localStorage.setItem(t, JSON.stringify(e)), !0);
    } catch (t) {
      return !1;
    }
  },
  restore: function (t, e = {}) {
    t = JSON.parse(localStorage.getItem(t));
    return (Object.assign(e, t), e);
  },
  clear: function (t) {
    localStorage.removeItem(t);
  },
};
let r = {
    canvas: {
      t: "CANVAS",
      o: function (t, r) {
        var e = t.i.element,
          a = devicePixelRatio,
          o = t.cols,
          n = t.rows,
          i = t.m,
          l = i.g,
          f = Math.round(i.lineHeight),
          s = t.i;
        s.canvasSize
          ? ((e.width = s.canvasSize.width * a),
            (e.height = s.canvasSize.height * a),
            (e.style.width = s.canvasSize.width + "px"),
            (e.style.height = s.canvasSize.height + "px"))
          : ((e.width = t.width * a), (e.height = t.height * a));
        var u = " " + i.fontSize + "px " + i.fontFamily,
          c = s && s.background ? s.background : "white",
          h = s && s.color ? s.color : "black",
          d = s && s.weight ? s.color : "400",
          p =
            ((e.style.backgroundColor = s.background || "white"),
            e.getContext("2d"));
        ((p.fillStyle = c),
          p.fillRect(0, 0, e.width, e.height),
          p.save(),
          p.scale(a, a),
          s.canvasOffset &&
            ((t = s.canvasOffset),
            (i = Math.round("auto" == t.x ? (e.width / a - o * l) / 2 : t.x)),
            (s = Math.round("auto" == t.y ? (e.height / a - n * f) / 2 : t.y)),
            p.translate(i, s)));
        ((p.fillStyle = h), (p.textBaseline = "top"));
        for (let e = 0; e < n; e++)
          for (let t = 0; t < o; t++) {
            var m = r[e * o + t],
              y = t * l,
              g = e * f;
            (m.background &&
              m.background != c &&
              ((p.fillStyle = m.background || c),
              p.fillRect(Math.round(y), g, Math.ceil(l), f)),
              (p.font = (m.weight || d) + u),
              (p.fillStyle = m.color || h),
              p.fillText(m.char, y, g));
          }
        p.restore();
      },
    },
    text: _,
  },
  W = {
    element: null,
    cols: 0,
    rows: 0,
    once: !1,
    p: 30,
    v: "text",
    background: "",
    color: "",
    weight: "",
    M: !1,
    A: !1,
  };
function $(S, e, N = {}) {
  new Promise(function (f) {
    let s = { ...W, ...e, ...S.i },
      u = { time: 0, frame: 0, j: 0 },
      c = "currentState";
    s.A && (T.restore(c, u), u.j++);
    let h,
      d =
        (s.element
          ? "canvas" == s.v
            ? "CANVAS" == s.element.nodeName
              ? (h = r[s.v])
              : console.warn("This renderer expects a canvas target element.")
            : "CANVAS" != s.element.nodeName
              ? (h = r[s.v])
              : console.warn("This renderer expects a text target element.")
          : ((h = r[s.v] || r.text),
            (s.element = document.createElement(h.t)),
            document.body.appendChild(s.element)),
        []),
      p = { x: 0, y: 0, pressed: !1, px: 0, k: 0, S: !1 };
    var t;
    (s.element.addEventListener("pointermove", (t) => {
      var e = s.element.getBoundingClientRect();
      ((p.x = t.clientX - e.left),
        (p.y = t.clientY - e.top),
        d.push("pointerMove"));
    }),
      s.element.addEventListener("pointerdown", (t) => {
        ((p.pressed = !0), d.push("pointerDown"));
      }),
      s.element.addEventListener("pointerup", (t) => {
        ((p.pressed = !1), d.push("pointerUp"));
      }),
      (s.element.style.N = "normal"),
      s.M ||
        (((t = s.element).style.userSelect = "none"),
        (t.style.webkitUserSelect = "none"),
        (t.style.B = "none"),
        (t.dataset.C = "false")),
      document.fonts.ready.then((t) => {
        let r = 3;
        !(function t() {
          var e;
          0 < --r
            ? requestAnimationFrame(t)
            : ((w = (function r(a) {
                let t = getComputedStyle(a);
                let e = t.getPropertyValue("font-family");
                let o = parseFloat(t.getPropertyValue("line-height"));
                let n = parseFloat(t.getPropertyValue("font-size"));
                let i =
                  "CANVAS" == a.nodeName ? a : document.createElement("canvas");
                let l = i.getContext("2d");
                l.font = n + "px " + e;
                let f = l.measureText("".padEnd(10, "x")).width / 10;
                let s = f / o;
                let u = {
                  O: s,
                  g: f,
                  lineHeight: o,
                  fontFamily: e,
                  fontSize: n,
                  F: function () {
                    let t = r(a);
                    for (var e in t)
                      ("number" != typeof t[e] && "string" != typeof t[e]) ||
                        (u[e] = t[e]);
                  },
                };
                return u;
              })(s.element)),
              (e = I(u, s, w, m)),
              "function" == typeof S.V && S.V(e, b, N),
              requestAnimationFrame(k));
        })();
      }));
    let m = new D(),
      y = " ",
      g = Object.freeze({
        color: s.color,
        background: s.background,
        weight: s.weight,
      }),
      b = [],
      w;
    let v = 0,
      x = 1e3 / s.p,
      M = u.time,
      A,
      j;
    function k(t) {
      var e = t - v;
      if (e < x) s.once || requestAnimationFrame(k);
      else {
        var r = I(u, s, w, m),
          a =
            (m.update(t),
            (v = t - (e % x)),
            (u.time = t + M),
            u.frame++,
            T.store(c, u),
            {
              x: p.x / w.g,
              y: p.y / w.lineHeight,
              pressed: p.pressed,
              q: { x: p.px / w.g, y: p.k / w.lineHeight, pressed: p.S },
            });
        if (
          ((p.px = p.x),
          (p.k = p.y),
          (p.S = p.pressed),
          A != r.cols || j != r.rows)
        ) {
          ((A = r.cols), (j = r.rows), (b.length = r.cols * r.rows));
          for (let t = 0; t < b.length; t++) b[t] = { ...g, char: y };
        }
        if (
          ("function" == typeof S.P && S.P(r, a, b, N),
          "function" == typeof S.R)
        )
          for (let e = 0; e < r.rows; e++) {
            var o = e * r.cols;
            for (let t = 0; t < r.cols; t++) {
              var n = t + o,
                i = S.R({ x: t, y: e, index: n }, r, a, b, N);
              ((b[n] =
                "object" == typeof i && null !== i
                  ? { ...b[n], ...i }
                  : { ...b[n], char: i }),
                Boolean(b[n].char) || 0 === b[n].char || (b[n].char = y));
            }
          }
        for (
          "function" == typeof S._ && S._(r, a, b, N), h.o(r, b, s);
          0 < d.length;
        ) {
          var l = d.shift();
          l && "function" == typeof S[l] && S[l](r, a, b);
        }
        (s.once || requestAnimationFrame(k), f(r));
      }
    }
  });
}
function I(t, e, r, a) {
  var o = e.element.getBoundingClientRect(),
    n = e.cols || Math.floor(o.width / r.g),
    i = e.rows || Math.floor(o.height / r.lineHeight);
  return Object.freeze({
    frame: t.frame,
    time: t.time,
    cols: n,
    rows: i,
    m: r,
    width: o.width,
    height: o.height,
    i: e,
    runtime: Object.freeze({ j: t.j, p: a.p }),
  });
}
class J {
  constructor(t) {
    this.D = t;
  }
  T() {
    this.W = this.D.getBoundingClientRect();
  }
  $(t) {
    return getComputedStyle(this.D).getPropertyValue(t).trim();
  }
  width(t) {
    return Math.round(this.W.width / t.g);
  }
  height(t) {
    return Math.round(this.W.height / t.lineHeight);
  }
  x(t) {
    return Math.round(this.W.left / t.g);
  }
  y(t) {
    return Math.round(this.W.top / t.lineHeight);
  }
  background() {
    return getComputedStyle(this.D).backgroundColor;
  }
  update(t) {
    return { x: x(t), y: y(t), width: width(t), height: height(t) };
  }
}
function L(t, e, r) {
  return t < e ? e : r < t ? r : t;
}
function M(t, e, r) {
  return t * (1 - r) + e * r;
}
function H(t, e, r) {
  r = L((r - t) / (e - t), 0, 1);
  return r * r * (3 - 2 * r);
}
function K(t, e, r, a, o) {
  return t < 0 || a <= t || e < 0 || o <= e ? {} : r[t + e * a];
}
function U(t, e, r, a, o, n) {
  e < 0 ||
    o <= e ||
    r < 0 ||
    n <= r ||
    ((e = "object" == typeof a[(n = e + r * o)] ? a[n] : { char: a[n] }),
    (a[n] = { ...e, ...t }));
}
function X(r, a, t, o, n, i, l, f) {
  for (let e = t; e < t + n; e++)
    for (let t = a; t < a + o; t++) U(r, t, e, i, l, f);
}
function Y(t, a, e, o, n, i) {
  let r,
    l,
    f =
      ("object" == typeof t
        ? ((r = t.text), delete (l = { ...t }).text)
        : (r = t),
      a),
    s = e,
    u = [];
  return (
    r.split("\n").forEach((t, e) => {
      t.split("").forEach((t, e) => {
        ((f = a + e), U({ char: t, ...l }, f, s, o, n, i));
      });
      var r = K(a, s, o, n, i),
        t = K(a + t.length - 1, s, o, n, i);
      (u.push({ first: r, I: t }), s++);
    }),
    (s = Math.max(e, s - 1)),
    { offset: { J: f, L: s }, H: u }
  );
}
function Z(t, o = 0) {
  if (0 == o) {
    var n = t;
    let e = 0,
      r = 0,
      a = 0;
    for (let t = 0; t < n.length; t++)
      "\n" == n[t] ? ((a = 0), e++) : (a++, (r = Math.max(r, a)));
    return { text: n, K: e, maxWidth: r };
  }
  {
    var i, l;
    let e = "",
      r = 0,
      a = 0;
    for (i of t.split("\n")) {
      let t = 0;
      for (l of i.split(" "))
        0 == t
          ? ((e += l), (t = l.length), (r = Math.max(r, t)))
          : t + 1 + l.length <= o
            ? ((e += " " + l), (t += l.length + 1), (r = Math.max(r, t)))
            : ((e += "\n" + l), (t = l.length + 1), a++);
      ((e += "\n"), a++);
    }
    return (
      "\n" == (e = e.slice(0, -1)).charAt(e.length - 1) && a--,
      { text: e, K: a, maxWidth: r }
    );
  }
}
class a {
  constructor(t, e) {
    ((this.width = t),
      (this.height = e),
      (this.data = new Array(t * e).fill(0)));
  }
  U(r, a, o) {
    for (let e = 0; e < r.height; e++)
      for (let t = 0; t < r.width; t++) {
        var n = a + t + (e + o) * this.width;
        this.data[n] = r.get(t, e);
      }
  }
  get(t, e) {
    return t < 0 || t >= this.width || e < 0 || e >= this.height
      ? 0
      : this.data[t + e * this.width];
  }
  sample(t, e) {
    var t = t * this.width - 0.5,
      e = e * this.height - 0.5,
      r = Math.floor(t),
      a = Math.floor(e),
      o = r + 1,
      n = a + 1,
      t = t - r,
      e = e - a,
      a = M(this.get(r, a), this.get(o, a), t),
      r = M(this.get(r, n), this.get(o, n), t);
    return M(a, r, e);
  }
  print() {
    let r = "";
    for (let e = 0; e < this.height; e++) {
      for (let t = 0; t < this.width; t++)
        r += this.get(t, e) < 0.5 ? "K" : "T";
      r += "\n";
    }
    return r;
  }
  X() {
    var t = [],
      e = Math.ceil(this.data.length / 32);
    for (let r = 0; r < e; r++) {
      let e = 0;
      for (let t = 0; t < 32; t++) 0.5 < this.data[t + 32 * r] && (e |= 1 << t);
      t.push(e);
    }
    return t;
  }
  Y(e, r) {
    for (let t = 0; t < r; t++) {
      var a = e[Math.floor(t / 32)],
        o = t % 32;
      this.data[t] = (a >> o) % 2 != 0 ? 1 : 0;
    }
  }
}
var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let G = new a(8, 11),
  Q = {};
var tt = [
    1667446300, 1667465059, 25443, 1667457855, 1667457855, 16227, 50553662,
    50529027, 15971, 1667445535, 1667457891, 7987, 50529151, 50529087, 32515,
    50529151, 50529087, 771, 50553662, 1667457915, 32355, 1667457891,
    1667457919, 25443, 202116159, 202116108, 16140, 808464504, 858796080, 7731,
    456352611, 857411343, 25443, 50529027, 50529027, 32515, 2138530659,
    1667984235, 25443, 1734828899, 1936948079, 25443, 1667457854, 1667457891,
    15971, 1667457855, 50544483, 771, 1667457854, 1868784483, 6305371,
    1667457855, 858987327, 25443, 100885310, 1613764620, 15971, 404232447,
    404232216, 6168, 1667457891, 1667457891, 15971, 1667457891, 912483171, 2076,
    1801675619, 2137746283, 13878, 912483171, 1664490524, 25443, 858993459,
    202120755, 3084, 811622527, 50727960, 32515, 1801675582, 1667984235, 15971,
    404626456, 404232216, 32280, 1616929598, 101455920, 32515, 1616929598,
    1616928828, 15971, 1010315296, 813642550, 12336, 50529151, 1616928831,
    15971, 50529852, 1667457855, 15971, 1616929663, 202119216, 3084, 1667457854,
    1667457854, 15971, -471604290, -522125597, 8429232,
  ],
  et = 8,
  rt = 11,
  at = t,
  ot = et * rt,
  nt = Math.ceil(ot / 32);
for (let t = 0; t < at.length; t++) {
  var it = new a(et, rt),
    o = t * nt,
    o = (it.Y(tt.slice(o, o + nt), ot), at[t]);
  Q[o] = it;
}
var n = {
  width: 8,
  height: 11,
  char: function (t) {
    return Q[t] || G;
  },
  Z: t,
};
let i = [
    "abs",
    "ace",
    "act",
    "add",
    "age",
    "ago",
    "aha",
    "aim",
    "air",
    "all",
    "alt",
    "amp",
    "and",
    "ant",
    "any",
    "ape",
    "app",
    "apt",
    "arc",
    "ark",
    "arm",
    "art",
    "ash",
    "ask",
    "asp",
    "ass",
    "ate",
    "ave",
    "awe",
    "axe",
    "aye",
    "bad",
    "bag",
    "ban",
    "bar",
    "bat",
    "bay",
    "bed",
    "bee",
    "beg",
    "ben",
    "bet",
    "bid",
    "big",
    "bin",
    "bio",
    "bis",
    "bit",
    "biz",
    "bob",
    "bog",
    "boo",
    "bow",
    "box",
    "boy",
    "bra",
    "bud",
    "Bug",
    "bum",
    "bun",
    "bus",
    "but",
    "buy",
    "bye",
    "cab",
    "cad",
    "cam",
    "can",
    "cap",
    "car",
    "cat",
    "chi",
    "cob",
    "con",
    "cop",
    "cos",
    "cow",
    "cry",
    "cub",
    "cue",
    "cum",
    "cup",
    "cut",
    "dab",
    "dad",
    "dal",
    "dam",
    "dan",
    "day",
    "Dee",
    "def",
    "del",
    "den",
    "dew",
    "did",
    "die",
    "dig",
    "dim",
    "din",
    "dip",
    "dis",
    "doc",
    "doe",
    "dog",
    "don",
    "dot",
    "dry",
    "dub",
    "due",
    "dug",
    "dun",
    "duo",
    "dye",
    "ear",
    "eat",
    "ebb",
    "ecu",
    "eft",
    "egg",
    "ego",
    "elf",
    "elm",
    "emu",
    "end",
    "era",
    "eta",
    "eve",
    "eye",
    "fab",
    "fad",
    "fan",
    "far",
    "fat",
    "fax",
    "fay",
    "fed",
    "fee",
    "fen",
    "few",
    "fig",
    "fin",
    "fit",
    "fix",
    "flu",
    "fly",
    "foe",
    "fog",
    "for",
    "fox",
    "fry",
    "fun",
    "fur",
    "gag",
    "gal",
    "gap",
    "gas",
    "gay",
    "gee",
    "gel",
    "gem",
    "get",
    "gig",
    "gin",
    "god",
    "got",
    "gum",
    "gun",
    "gut",
    "guy",
    "gym",
    "had",
    "ham",
    "has",
    "hat",
    "hay",
    "hem",
    "hen",
    "her",
    "hey",
    "hid",
    "him",
    "hip",
    "his",
    "hit",
    "hog",
    "hop",
    "hot",
    "how",
    "hub",
    "hue",
    "hug",
    "huh",
    "hum",
    "hut",
    "ice",
    "icy",
    "ill",
    "ink",
    "inn",
    "ion",
    "its",
    "ivy",
    "jam",
    "jar",
    "jaw",
    "jay",
    "jet",
    "jew",
    "job",
    "joe",
    "jog",
    "joy",
    "jug",
    "kay",
    "ken",
    "key",
    "kid",
    "kin",
    "kit",
    "lad",
    "lap",
    "law",
    "lax",
    "lay",
    "lea",
    "led",
    "leg",
    "let",
    "lib",
    "lid",
    "lie",
    "lip",
    "lit",
    "log",
    "lol",
    "lot",
    "low",
    "mac",
    "mad",
    "man",
    "map",
    "mat",
    "max",
    "may",
    "med",
    "men",
    "met",
    "mid",
    "mix",
    "mob",
    "mod",
    "mom",
    "mop",
    "mud",
    "mug",
    "mum",
    "nan",
    "nap",
    "nay",
    "net",
    "new",
    "nil",
    "nod",
    "nor",
    "not",
    "now",
    "nun",
    "nut",
    "oak",
    "odd",
    "off",
    "oft",
    "oil",
    "old",
    "ole",
    "one",
    "ooh",
    "opt",
    "orb",
    "our",
    "out",
    "owe",
    "owl",
    "own",
    "pac",
    "pad",
    "pal",
    "pam",
    "pan",
    "pat",
    "paw",
    "pay",
    "pea",
    "peg",
    "pen",
    "pep",
    "pet",
    "phi",
    "pic",
    "pie",
    "pig",
    "pin",
    "pip",
    "pit",
    "ply",
    "pod",
    "pop",
    "pot",
    "pro",
    "psi",
    "pub",
    "pup",
    "put",
    "rad",
    "rag",
    "ram",
    "rap",
    "rat",
    "raw",
    "ray",
    "red",
    "rem",
    "rep",
    "rev",
    "rib",
    "rid",
    "rig",
    "rim",
    "rip",
    "rob",
    "rod",
    "row",
    "rub",
    "rug",
    "rum",
    "run",
    "rye",
    "sac",
    "sad",
    "sat",
    "saw",
    "say",
    "sea",
    "see",
    "set",
    "sew",
    "sex",
    "she",
    "shy",
    "sic",
    "sim",
    "sin",
    "sip",
    "sir",
    "sis",
    "sit",
    "six",
    "ski",
    "sky",
    "sly",
    "sol",
    "son",
    "soy",
    "spa",
    "spy",
    "sub",
    "sue",
    "sum",
    "sun",
    "sup",
    "tab",
    "tag",
    "tam",
    "tan",
    "tap",
    "tar",
    "tax",
    "tea",
    "ted",
    "tee",
    "ten",
    "the",
    "tie",
    "tin",
    "tip",
    "tod",
    "toe",
    "tom",
    "ton",
    "too",
    "top",
    "tow",
    "toy",
    "try",
    "tub",
    "tug",
    "two",
    "use",
    "van",
    "vet",
    "via",
    "vow",
    "war",
    "was",
    "wax",
    "way",
    "web",
    "wed",
    "wee",
    "wet",
    "who",
    "why",
    "wig",
    "win",
    "wit",
    "won",
    "woo",
    "wow",
    "wry",
    "xxx",
    "yen",
    "yep",
    "yes",
    "yet",
    "you",
    "zip",
    "zoo",
  ],
  l = 3,
  f = 0,
  lt = 0,
  s = " " + n.Z;
var u = i;
for (let t = u.length - 1; 0 < t; t--) {
  var ft = Math.floor(Math.random() * t);
  [u[t], u[ft]] = [u[ft], u[t]];
}
(i.unshift("cvb"), i.unshift("dfg"), i.unshift("ert"));
let c = new Array(l).fill(f),
  st = new Array(l).fill(f),
  ut = new Array(l).fill(0),
  ct = 0;
var h,
  t = n.width * l + lt * (l - 1),
  ht = n.height;
let b = new a(t, ht);
function dt(t, e) {
  if (t.frame % 300 == 0) {
    var r = (
      ((t) => {
        if ("string" == typeof t && t.length == l) {
          for (var e in t) if (-1 == s.indexOf(e)) return;
          return 1;
        }
      })(e)
        ? e
        : i[ct]
    ).toUpperCase();
    st.fill(f);
    for (let t = 0; t < r.length; t++) st[t] = s.indexOf(r[t]);
    ct = (ct + 1) % i.length;
    for (let t = 0; t < l; t++) ut[t] = 6 * t;
  }
  if (t.frame % 2 == 1) {
    for (let t = 0; t < l; t++)
      0 == ut[t] ? c[t] != st[t] && (c[t] = (c[t] + 1) % s.length) : ut[t]--;
    for (let t = 0; t < l; t++) {
      var a = (n.width + lt) * t,
        o = c[t];
      b.U(n.char(s[o]), a, 0);
    }
  }
}
let { min: pt, max: w, cos: mt, floor: v, random: yt } = Math,
  A = [],
  j =
    (A.push("  "),
    A.push("+ "),
    A.push(" ."),
    A.push("+ "),
    A.push(" ,"),
    A.push("· "),
    A.push(": "),
    A.push("• "),
    " .,·-•─~+:;=*π’“”┐┌┘└┼├┤┴┬│╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@aàbcdefghijklmnoòpqrstuüvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%()".split(
      "",
    )),
  k = " .·•-+=:;*ABC0123!*".split(""),
  S = " ·-•~+:*abcXYZ*".split(""),
  N = v(yt() * A.length);
((k[k.length - 1] = A[N][0]), (S[S.length - 1] = A[N][1]));
for (h of A)
  (-1 == j.indexOf(h[0]) && j.push(h[0]),
    -1 == j.indexOf(h[1]) && j.push(h[1]));
let B = j.reduce((t, e, r) => ((t[e] = r), t), {});
function C(t) {
  var e = null == t ? 0 : t.length;
  return e ? t[Math.floor(Math.random() * e)] : void 0;
}
function O(t, e, r) {
  return m(M(t.r, e.r, r), M(t.G, e.G, r), M(t.b, e.b, r));
}
function m(t, e, r, a = 1) {
  return { r: t, G: e, b: r, a: a };
}
function F(t) {
  var e = Math.round(t.r).toString(16).padStart(2, "0"),
    r = Math.round(t.G).toString(16).padStart(2, "0"),
    a = Math.round(t.b).toString(16).padStart(2, "0");
  return void 0 === t.a
    ? "#" + e + r + a
    : "#" +
        e +
        r +
        a +
        Math.round(255 * t.a)
          .toString(16)
          .padStart(2, "0");
}
function g(t) {
  return { a: 1, r: (t >> 16) & 255, G: (t >> 8) & 255, b: 255 & t };
}
let z = [
    g(43690),
    g(11141120),
    g(11162880),
    g(5592575),
    g(5635925),
    g(5636095),
    g(16733525),
    g(16733695),
    g(16777215),
  ],
  V = { a: m(120, 120, 120), b: m(90, 90, 90) },
  q = { ...V },
  gt = (() => {
    let r = 256,
      a = new Array(r),
      o = new Array(512);
    for (let t = 0; t < r; t++) ((a[t] = Math.random()), (o[t] = t));
    for (let t = 0; t < r; t++) {
      var e = Math.floor(Math.random() * r);
      (([o[t], o[e]] = [o[e], o[t]]), (o[t + r] = o[t]));
    }
    let n, i, l, f, s, u, c, h, d, p, m, y, g, b, w, v;
    return function (t, e) {
      return (
        (n = Math.floor(t)),
        (i = Math.floor(e)),
        (l = t - n),
        (f = e - i),
        (s = (n + r) % r),
        (u = (1 + s + r) % r),
        (c = (i + r) % r),
        (h = (1 + c + r) % r),
        (d = a[o[o[s] + c]]),
        (p = a[o[o[u] + c]]),
        (m = a[o[o[s] + h]]),
        (y = a[o[o[u] + h]]),
        (g = H(0, 1, l)),
        (b = H(0, 1, f)),
        (w = M(d, p, g)),
        (v = M(m, y, g)),
        M(w, v, b)
      );
    };
  })(),
  E = { tt: 0, et: 0, rt: 0, ot: 0, scale: 0, data: [] },
  bt = Array.from(document.querySelectorAll("main div")).map((t) => new J(t)),
  wt = new J(document.body),
  vt = wt.$("--font-size-change"),
  P,
  R;
"ontouchstart" in window
  ? document.addEventListener("touchstart", function (t) {
      t.target.href && (t.preventDefault(), (location.href = t.target.href));
    })
  : document.addEventListener("mousedown", function (t) {
      0 === t.button &&
        t.target.href &&
        (t.preventDefault(),
        "_blank" == t.target.target
          ? window.open(t.target.href)
          : (location.href = t.target.href));
    });
var xt = Object.freeze({
  __proto__: null,
  V: function (t, e, r) {
    ((P = t.cols), (R = t.rows));
    var a = P * R;
    for (let t = 0; t < a; t++) {
      var o = Math.floor(t / P),
        n = t % P;
      E.data[t] = { nt: 0, it: Math.floor(n / 3 + 2 * o) + 2, lt: 0 };
    }
  },
  R: function (t, e, r, a, o) {
    var n = t.index,
      i = w(E.data[n].ft, E.data[n].nt);
    return (
      (e = (e = (t.x - r.x) * e.m.O) * e + (r = t.y - r.y) * r) < E.rt &&
        ((r = B[0] + v(E.rt - e)), (E.data[n].lt = r), (E.data[n].it = 1)),
      (E.data[n].nt = 0.95 * i),
      {
        char: (e = (t.x + t.y) % 2 ? k : S)[v(i * (e.length - 1))],
        color: 0.99 <= i ? E.tt : E.et,
      }
    );
  },
  _: function (a, t, e, r) {
    if ("screensaver" != r.mode) {
      var o = a.m;
      let r = 0;
      var i,
        l;
      for (i of bt) {
        var s,
          u = [],
          c =
            (!(function t(e, r) {
              for (var o of e.childNodes)
                if (0 == o.childNodes.length) {
                  if (o.nodeType == Node.TEXT_NODE) {
                    let e = o.textContent.trim();
                    if (e) {
                      let t = o.parentNode.tagName,
                        a = { text: e, tag: t };
                      if (
                        (Object.keys(o.parentNode.dataset) &&
                          (a.data = o.parentNode.dataset),
                        "A" == t)
                      ) {
                        let t = o.parentNode.attributes,
                          e = t.target ? ` target='${t.target.nodeValue}'` : "",
                          r = t.href ? ` href='${t.href.nodeValue}'` : "";
                        ((a.l = `<a${r}${e}>`), (a.u = "</a>"));
                      }
                      r.push(a);
                    }
                  } else if (o.nodeType == Node.ELEMENT_NODE) {
                    let t = o.tagName,
                      e = { tag: t };
                    r.push(e);
                  }
                } else t(o, r);
            })(i.D, u),
            i.T(),
            i.x(o)),
          h = i.y(o),
          d = i.width(o);
        i.height(o);
        let t = c,
          e = h;
        for (s of u)
          if ("BR" == s.tag) ((e += 1), (t = c), (r = w(r, e)));
          else if ("DIV" == s.tag) {
            var p = Z(s.text, d),
              m = Y(p.text, t, e, E.data, a.cols, a.rows);
            ((t = m.offset.J + 1), (e = m.offset.L), (r = w(r, p.K)));
          } else if ("A" == s.tag && s.text) {
            var y,
              m = Z(s.text, d),
              p = Y(
                { text: m.text, st: s.data?.flap ? 1 : 0 },
                t,
                e,
                E.data,
                a.cols,
                a.rows,
              );
            for (y of p.H) ((y.first.l = s.l), (y.I.u = s.u));
            ((t = p.offset.J + 1), (e = p.offset.L), (r = w(r, m.K)));
          }
      }
      for (let t = 0; t < e.length; t++) {
        var g = E.data[t];
        g.char &&
          ((g.it = Math.max(g.it, g.st || 0)),
          1 == g.it
            ? g.lt != B[g.char]
              ? ((g.char = j[g.lt]), (g.lt = (g.lt + 1) % j.length))
              : (g.it = 0)
            : 1 < g.it && (g.it--, (g.char = j[g.lt])),
          (e[t] = { ...g }),
          delete E.data[t].char,
          delete E.data[t].l,
          delete E.data[t].u,
          delete E.data[t].color);
      }
    }
  },
  P: function (t, e, r, a) {
    var o = wt.$("--font-size-change");
    if ((vt != o && (t.m.F(), (vt = o)), P != t.cols || R != t.rows)) {
      ((P = t.cols), (R = t.rows));
      var n = P * R;
      for (let t = 0; t < n; t++) E.data[t] = { nt: 0, it: 0, lt: 0 };
    }
    if ("white" == a.color) ((E.tt = "lightgray"), (E.et = "white"));
    else if (a.color)
      (t.frame % 2e3 == 0 && ((V.a = C(z)), (V.b = C(z))),
        (q.a = O(q.a, V.a, 0.01)),
        (q.b = O(q.b, V.b, 0.01)),
        (E.tt = F(q.a)),
        (E.et = F(q.b)));
    else {
      ((e = (o = e).q), (i = o.x - e.x), (o = o.y - e.y));
      var e = Math.sqrt(i * i + o * o),
        i =
          ((E.rt *= 0.75),
          (E.rt = pt(E.rt + 0.4 * e, 20)),
          0.1 < e ? 0.008 : 0);
      if (((E.ot = pt(E.ot + i, 1)), E.ot < 0.3))
        for (q.a = C(z), q.b = C(z); q.b == q.a; ) q.b = C(z);
      ((o = 0.3), (e = 0.8));
      e =
        (i = L(((i = E.ot) - o) / (e - o), 0, 1)) *
        i *
        i *
        (i * (6 * i - 15) + 10);
      ((E.tt = F(O(V.a, q.a, e))), (E.et = F(O(V.b, q.b, e))));
    }
    if (
      ("screensaver" == a.mode &&
        t.frame % 3e3 == 0 &&
        (N = v(yt() * A.length)),
      1 == E.ot && (N = v(yt() * A.length)),
      (o = k[k.length - 1]) != A[N][0])
    ) {
      let t = (B[o] + 1) % j.length;
      k[k.length - 1] = j[t];
    }
    if ((i = S[S.length - 1]) != A[N][1]) {
      let t = (B[i] + 1) % j.length;
      S[S.length - 1] = j[t];
    }
    E.ot = w(E.ot - 0.003, 0);
    var e = t.cols < 80 ? 1.3 : 0.8,
      o = ((E.scale += 0.01 * (e - E.scale)), t.m.O),
      e = b.width / b.height / o;
    let l, f;
    f =
      e < t.cols / t.rows
        ? ((o = t.rows), (l = 1 / o / e / E.scale), 1 / o / E.scale)
        : ((o = t.cols), (l = 1 / o / E.scale), ((1 / o) * e) / E.scale);
    var s = 4e-4 * t.time,
      u =
        (dt(t, a && a.word ? a.word : ""),
        (o = mt(s)),
        (e = 1.2) + ((o - (t = -1)) / (1 - t)) * (0.5 - e));
    let c, h, d, p, m, y, g;
    for (let e = 0; e < R; e++)
      for (let t = 0; t < P; t++)
        ((c = l * (t - 0.5 * P) + 0.5),
          (h = f * (e - 0.5 * R) + 0.5),
          (d = c + 0.5 * (gt(c * u + s, h * u) - 0.5)),
          (p = h + 1.8 * (gt(c * u, h * u + s) - 0.5)),
          (m = Math.floor(d * b.width)),
          (y = Math.floor(p * b.height)),
          (g = t + e * P),
          (E.data[g].ft = w(b.sample(d, p), b.get(m, y))));
  },
  ct: m,
  ht: F,
});
function Mt(t) {
  var e = document.querySelector("PRE");
  ($(xt, { element: e, p: 60, M: !1 }, t),
    document.addEventListener("keydown", (t) => {
      "f" == t.key &&
        document.body.requestFullscreen &&
        document.body.requestFullscreen().catch((t) => console.warn(t));
    }));
}
export { Mt as boot };
