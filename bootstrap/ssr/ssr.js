import { createSSRApp, h as h$1, mergeProps, useSSRContext, ref, onMounted, computed, watch, onUnmounted, watchEffect, withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, renderSlot, resolveDirective, createBlock, openBlock, Fragment, renderList, withDirectives, vShow, resolveComponent, reactive, createCommentVNode, nextTick, vModelCheckbox, withKeys } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp, usePage, useForm, Link, router, Head } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import FloatingVue from "floating-vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrGetDirectiveProps, ssrIncludeBooleanAttr } from "vue/server-renderer";
import pkg from "lodash";
import { SunIcon, MoonIcon, GlobeAltIcon, ChevronDownIcon, Bars3CenterLeftIcon, CheckBadgeIcon, UserIcon, HomeIcon, KeyIcon, ShieldCheckIcon, ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon, CheckCircleIcon, XMarkIcon, ChevronRightIcon, ChevronUpDownIcon, EyeIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, QrCodeIcon, ArrowDownTrayIcon as ArrowDownTrayIcon$1, ArrowUpTrayIcon as ArrowUpTrayIcon$1 } from "@heroicons/vue/24/solid";
import VueDatePicker from "@vuepic/vue-datepicker";
import { PencilIcon as PencilIcon$1, ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/vue/24/solid/index.js";
import Quagga from "quagga";
import { useDark, useToggle } from "@vueuse/core";
import { TransitionRoot, Dialog, TransitionChild, DialogOverlay } from "@headlessui/vue";
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738" }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
    var f2 = a2[s2], c2 = i2[f2];
    "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length) return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2) return e2;
  if ("object" != typeof r2) {
    if (u(e2)) e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function(t4) {
  return g.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k2 = S2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = /* @__PURE__ */ function(t5) {
    return $;
  }();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = { install(t4, e2) {
  const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
  parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
} };
const appName = "Laravel";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/Category/CategoryForm.vue": () => Promise.resolve().then(() => CategoryForm), "./Pages/Admin/Category/Create.vue": () => Promise.resolve().then(() => Create$7), "./Pages/Admin/Category/Delete.vue": () => Promise.resolve().then(() => Delete$7), "./Pages/Admin/Category/Edit.vue": () => Promise.resolve().then(() => Edit$7), "./Pages/Admin/Category/Index.vue": () => Promise.resolve().then(() => Index$9), "./Pages/Admin/Category/Show.vue": () => Promise.resolve().then(() => Show$4), "./Pages/Admin/Product/Create.vue": () => Promise.resolve().then(() => Create$6), "./Pages/Admin/Product/Delete.vue": () => Promise.resolve().then(() => Delete$6), "./Pages/Admin/Product/Edit.vue": () => Promise.resolve().then(() => Edit$6), "./Pages/Admin/Product/EmptyForm.vue": () => Promise.resolve().then(() => EmptyForm$1), "./Pages/Admin/Product/Form.vue": () => Promise.resolve().then(() => Form$1), "./Pages/Admin/Product/Index.vue": () => Promise.resolve().then(() => Index$8), "./Pages/Admin/Product/Show.vue": () => Promise.resolve().then(() => Show$3), "./Pages/Admin/Transaction/Create.vue": () => Promise.resolve().then(() => Create$5), "./Pages/Admin/Transaction/Delete.vue": () => Promise.resolve().then(() => Delete$5), "./Pages/Admin/Transaction/Edit.vue": () => Promise.resolve().then(() => Edit$5), "./Pages/Admin/Transaction/Form.vue": () => Promise.resolve().then(() => Form), "./Pages/Admin/Transaction/Index.vue": () => Promise.resolve().then(() => Index$6), "./Pages/Admin/Transaction/Show.vue": () => Promise.resolve().then(() => Show$2), "./Pages/Admin/Warehouse/Create.vue": () => Promise.resolve().then(() => Create$4), "./Pages/Admin/Warehouse/Delete.vue": () => Promise.resolve().then(() => Delete$4), "./Pages/Admin/Warehouse/Edit.vue": () => Promise.resolve().then(() => Edit$4), "./Pages/Admin/Warehouse/Index.vue": () => Promise.resolve().then(() => Index$5), "./Pages/Admin/Warehouse/Show.vue": () => Promise.resolve().then(() => Show$1), "./Pages/Admin/Warehouse/WarehouseForm.vue": () => Promise.resolve().then(() => WarehouseForm), "./Pages/Admin/WarehouseProduct/Create.vue": () => Promise.resolve().then(() => Create$3), "./Pages/Admin/WarehouseProduct/Delete.vue": () => Promise.resolve().then(() => Delete$3), "./Pages/Admin/WarehouseProduct/Income.vue": () => Promise.resolve().then(() => Income), "./Pages/Admin/WarehouseProduct/IncomeForm.vue": () => Promise.resolve().then(() => IncomeForm), "./Pages/Admin/WarehouseProduct/Index.vue": () => Promise.resolve().then(() => Index$3), "./Pages/Admin/WarehouseProduct/Outcome.vue": () => Promise.resolve().then(() => Outcome), "./Pages/Admin/WarehouseProduct/OutcomeForm.vue": () => Promise.resolve().then(() => OutcomeForm), "./Pages/Admin/WarehouseProduct/Show.vue": () => Promise.resolve().then(() => Show), "./Pages/Auth/CabinetLogin.vue": () => Promise.resolve().then(() => CabinetLogin), "./Pages/Auth/Login.vue": () => Promise.resolve().then(() => Login), "./Pages/Dashboard.vue": () => Promise.resolve().then(() => Dashboard), "./Pages/Permission/Create.vue": () => Promise.resolve().then(() => Create$2), "./Pages/Permission/Delete.vue": () => Promise.resolve().then(() => Delete$2), "./Pages/Permission/DeleteBulk.vue": () => Promise.resolve().then(() => DeleteBulk$2), "./Pages/Permission/Edit.vue": () => Promise.resolve().then(() => Edit$3), "./Pages/Permission/Index.vue": () => Promise.resolve().then(() => Index$2), "./Pages/Profile/Edit.vue": () => Promise.resolve().then(() => Edit$2), "./Pages/Profile/Partials/DeleteUserForm.vue": () => Promise.resolve().then(() => DeleteUserForm), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => Promise.resolve().then(() => UpdatePasswordForm), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => Promise.resolve().then(() => UpdateProfileInformationForm), "./Pages/Role/Create.vue": () => Promise.resolve().then(() => Create$1), "./Pages/Role/Delete.vue": () => Promise.resolve().then(() => Delete$1), "./Pages/Role/DeleteBulk.vue": () => Promise.resolve().then(() => DeleteBulk$1), "./Pages/Role/Edit.vue": () => Promise.resolve().then(() => Edit$1), "./Pages/Role/Index.vue": () => Promise.resolve().then(() => Index$1), "./Pages/Role/Permission.vue": () => Promise.resolve().then(() => Permission), "./Pages/User/Create.vue": () => Promise.resolve().then(() => Create), "./Pages/User/Delete.vue": () => Promise.resolve().then(() => Delete), "./Pages/User/DeleteBulk.vue": () => Promise.resolve().then(() => DeleteBulk), "./Pages/User/Edit.vue": () => Promise.resolve().then(() => Edit), "./Pages/User/Index.vue": () => Promise.resolve().then(() => Index) })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h$1(App, props) }).use(plugin).use(k, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      }).use(FloatingVue).mixin({
        methods: {
          can: function(permissions) {
            let allPermissions = this.$page.props.auth.can;
            let hasPermission = false;
            permissions.forEach(function(item) {
              if (allPermissions[item]) hasPermission = true;
            });
            return hasPermission;
          },
          lang: function() {
            return usePage().props.language.original;
          }
        }
      });
    }
  })
);
const _sfc_main$1n = {
  __name: "InputLabel",
  __ssrInlineRender: true,
  props: ["value"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "block font-medium text-sm text-slate-700 dark:text-slate-300" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputLabel.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const _sfc_main$1m = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: ["message"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: __props.message ? null : { display: "none" }
      }, _attrs))}><p class="text-sm text-red-600 dark:text-red-400">${ssrInterpolate(__props.message)}</p></div>`);
    };
  }
};
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const _sfc_main$1l = {
  __name: "TextInput",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    error: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        class: [
          __props.error ? "border-red-500 dark:border-red-400 dark:bg-slate-900 dark:text-slate-300 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400" : "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary",
          "rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50"
        ],
        value: __props.modelValue,
        ref_key: "input",
        ref: input
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextInput.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const _sfc_main$1k = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const _sfc_main$1j = {
  __name: "CustomSelectInput",
  __ssrInlineRender: true,
  props: ["modelValue", "dataSet", "prompt", "promptDisabled", "multiple"],
  emits: ["update:modelValue"],
  setup(__props) {
    const input = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${ssrRenderAttrs(mergeProps({
        class: "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50",
        value: __props.modelValue,
        ref_key: "input",
        ref: input,
        multiple: __props.multiple
      }, _attrs))}>`);
      if (__props.promptDisabled) {
        _push(`<option value="" disabled>${ssrInterpolate(__props.promptDisabled)}</option>`);
      } else if (__props.prompt) {
        _push(`<option value="">${ssrInterpolate(__props.prompt)}</option>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.dataSet, (data, index) => {
        _push(`<option${ssrRenderAttr("value", data.value)}>${ssrInterpolate(data.label)}</option>`);
      });
      _push(`<!--]--></select>`);
    };
  }
};
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CustomSelectInput.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const _sfc_main$1i = {
  __name: "CategoryForm",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    form: Object,
    locales: Array,
    restaurants: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid grid-cols-3 gap-4"><div><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "prize_category_id",
        value: _ctx.lang().label.restaurant
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1j, {
        id: "restaurant_id",
        class: "mt-1 block w-full",
        modelValue: __props.form.restaurant_id,
        "onUpdate:modelValue": ($event) => __props.form.restaurant_id = $event,
        dataSet: __props.restaurants,
        prompt: _ctx.lang().category.without_restaurant_id
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.restaurant_id
      }, null, _parent));
      _push(`</div></div><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "order_num",
        value: _ctx.lang().label.order_num
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "order_num",
        type: "number",
        class: "mt-1 block w-full",
        modelValue: __props.form.order_num,
        "onUpdate:modelValue": ($event) => __props.form.order_num = $event,
        step: "1",
        min: "0",
        required: "",
        placeholder: _ctx.lang().label.order_num,
        error: __props.form.errors.order_num
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.order_num
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "is_active",
        value: _ctx.lang().label.is_active
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1k, {
        id: "is_active",
        modelValue: __props.form.is_active,
        "onUpdate:modelValue": ($event) => __props.form.is_active = $event,
        checked: __props.form.is_active,
        error: __props.form.errors.is_active
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.is_active
      }, null, _parent));
      _push(`</div></div><h4 class="text-lg font-medium text-slate-700 dark:text-slate-100 mt-5">${ssrInterpolate(_ctx.lang().label.name)}</h4><div class="grid grid-cols-3 gap-4 mt-1"><!--[-->`);
      ssrRenderList(__props.locales, (locale) => {
        _push(`<div><div class="col-span-1 px-4 sm:px-0">`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "name-" + locale,
          value: locale.toUpperCase()
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1l, {
          id: "name-" + locale,
          type: "text",
          class: "mt-1 block w-full",
          modelValue: __props.form.name[locale],
          "onUpdate:modelValue": ($event) => __props.form.name[locale] = $event,
          required: "",
          placeholder: _ctx.lang().label.name,
          error: __props.form.errors["name." + locale]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          class: "mt-2",
          message: __props.form.errors["name." + locale]
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><h4 class="text-lg font-medium text-slate-700 dark:text-slate-100 mt-5 mb-2">${ssrInterpolate(_ctx.lang().label.short_description)}</h4><!--[-->`);
      ssrRenderList(__props.locales, (locale) => {
        _push(`<div><div class="grid grid-cols-12 gap-2 mb-3"><div class="col-span-12 px-4 sm:px-0">`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "short_description-" + locale,
          value: locale.toUpperCase()
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1l, {
          id: "short_description-" + locale,
          type: "text",
          class: "mt-1 block w-full",
          modelValue: __props.form.short_description[locale],
          "onUpdate:modelValue": ($event) => __props.form.short_description[locale] = $event,
          placeholder: _ctx.lang().label.short_description,
          error: __props.form.errors["short_description." + locale]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          class: "mt-2",
          message: __props.form.errors["short_description." + locale]
        }, null, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Category/CategoryForm.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const CategoryForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1h = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    watch(
      () => props.show,
      () => {
        if (props.show) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = null;
        }
      }
    );
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e2) => {
      if (e2.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 transform transition-all"><div class="absolute inset-0 bg-slate-500 dark:bg-slate-900 opacity-75"></div></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="${ssrRenderClass([maxWidthClass.value, "mb-6 bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"])}">`);
        if (__props.show) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const _sfc_main$1g = {
  __name: "PrimaryButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 bg-primary dark:bg-primary border border-transparent rounded-md font-semibold text-xs text-white dark:text-white uppercase tracking-widest hover:bg-primary/80 dark:hover:bg-primary/90 focus:bg-primary/80 dark:focus:bg-primary/80 active:bg-primary dark:active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-primary transition ease-in-out duration-150 disabled:bg-primary/80"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PrimaryButton.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const _sfc_main$1f = {
  __name: "SecondaryButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-500 rounded-md font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-25 transition ease-in-out duration-150"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SecondaryButton.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const _sfc_main$1e = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    restaurants: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const restaurants = Object.keys(props.restaurants).map((key) => ({
      label: props.restaurants[key],
      value: key
    }));
    const locales = usePage().props.locales;
    const emit = __emit;
    const form = useForm({
      restaurant_id: "",
      name: Object.fromEntries(locales.map((locale) => [locale, ""])),
      short_description: Object.fromEntries(locales.map((locale) => [locale, ""])),
      is_active: true,
      logo: null,
      order_num: 0
    });
    const create = () => {
      form.post(route("admin.category.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.add)} ${ssrInterpolate(_ctx.lang().label.category)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1i, {
              form: unref(form),
              locales: unref(locales),
              restaurants: unref(restaurants)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.add) + " " + toDisplayString(_ctx.lang().label.category), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$1i, {
                    form: unref(form),
                    locales: unref(locales),
                    restaurants: unref(restaurants)
                  }, null, 8, ["form", "locales", "restaurants"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Category/Create.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const Create$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1d = {
  __name: "DangerButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-2 py-1.5 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DangerButton.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const _sfc_main$1c = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    restaurant: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.restaurant.destroy", (_a = props.restaurant) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.restaurant) == null ? void 0 : _a.name)}</b></p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.restaurant) == null ? void 0 : _b.name), 1)
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Category/Delete.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const Delete$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1b = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    category: Object,
    locales: Array,
    restaurants: {
      type: Object,
      default: () => ({})
      // Provide an empty object as default
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const locales = usePage().props.locales;
    const props = __props;
    const restaurants = Object.keys(props.restaurants).map((key) => ({
      label: props.restaurants[key],
      value: key
    }));
    const emit = __emit;
    const form = useForm({
      restaurant_id: "",
      name: Object.fromEntries(locales.map((locale) => [locale, ""])),
      short_description: Object.fromEntries(locales.map((locale) => [locale, ""])),
      is_active: true,
      logo: null,
      order_num: 0
    });
    const update = () => {
      var _a;
      form.put(route("admin.category.update", (_a = props.category) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: (e2) => {
          form.processing = false;
          console.log(e2);
        },
        onFinish: () => {
          form.processing = false;
        }
      });
    };
    const edit = () => {
      var _a;
      axios.get(route("admin.category.edit", (_a = props.category) == null ? void 0 : _a.id)).then((response) => {
        if (response.data.success === true) {
          form.processing = false;
          const category = response.data.category;
          Object.keys(form).forEach((key) => {
            if (category[key] !== void 0) {
              form[key] = category[key];
            }
          });
          locales.forEach((locale) => {
            form.name[locale] = category.name[locale];
            form.short_description[locale] = category.short_description[locale];
          });
        }
      }).catch((error) => {
        console.log(error);
        form.reset();
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
        edit();
      } else {
        form.reset();
        form.processing = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.edit)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1i, {
              form: unref(form),
              locales: unref(locales),
              restaurants: unref(restaurants)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.edit) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$1i, {
                    form: unref(form),
                    locales: unref(locales),
                    restaurants: unref(restaurants)
                  }, null, 8, ["form", "locales", "restaurants"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Category/Edit.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const Edit$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1b
}, Symbol.toStringTag, { value: "Module" }));
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1a = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 316 316",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z"></path></svg>`);
}
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$19 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      default: "right"
    },
    width: {
      default: "48"
    },
    contentClasses: {
      default: () => ["py-1", "bg-white dark:bg-slate-700"]
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e2) => {
      if (open.value && e2.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "origin-top-left left-0";
      } else if (props.align === "right") {
        return "origin-top-right right-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle([
        open.value ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const _sfc_main$18 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({ class: "block w-full px-4 py-2 text-left text-sm leading-5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 transition duration-150 ease-in-out" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const _sfc_main$17 = {
  __name: "SwitchDarkModeNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = useDark();
    useToggle(isDark);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(_attrs)}><button${ssrRenderAttrs(mergeProps({ class: "hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.dark_mode)))}>`);
      if (unref(isDark)) {
        _push(ssrRenderComponent(unref(SunIcon), { class: "w-5 h-5 fill-current" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(isDark)) {
        _push(ssrRenderComponent(unref(MoonIcon), { class: "w-5 h-5 fill-current" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SwitchDarkModeNavbar.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const _sfc_main$16 = {
  __name: "SwitchLangNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const lang = usePage().props.locale;
    const locales = usePage().props.locales;
    return (_ctx, _push, _parent, _attrs) => {
      resolveDirective("tooltip");
      {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative inline-block text-left" }, _attrs))}>`);
        _push(ssrRenderComponent(_sfc_main$19, {
          align: "right",
          width: "48"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out sm:hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(GlobeAltIcon), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(`</button><button type="button" class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out truncate w-fit hidden sm:inline-flex"${_scopeId}><span class="flex justify-between items-center"${_scopeId}>${ssrInterpolate(unref(lang).toUpperCase())}</span>`);
              _push2(ssrRenderComponent(unref(ChevronDownIcon), { class: "ml-2 h-5 w-5 fill-current" }, null, _parent2, _scopeId));
              _push2(`</button></span>`);
            } else {
              return [
                createVNode("span", { class: "inline-flex rounded-md" }, [
                  createVNode("button", {
                    type: "button",
                    class: "hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out sm:hidden"
                  }, [
                    createVNode(unref(GlobeAltIcon), { class: "h-5 w-5" })
                  ]),
                  createVNode("button", {
                    type: "button",
                    class: "hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out truncate w-fit hidden sm:inline-flex"
                  }, [
                    createVNode("span", { class: "flex justify-between items-center" }, toDisplayString(unref(lang).toUpperCase()), 1),
                    createVNode(unref(ChevronDownIcon), { class: "ml-2 h-5 w-5 fill-current" })
                  ])
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(locales), (locale) => {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$18, {
                  href: _ctx.route("setLang.set", locale),
                  class: ["dark:text-white text-gray-500 block px-4 py-2 text-sm hover:bg-red-500 hover:dark:bg-red-500", { "bg-red-500": locale === unref(lang) }],
                  role: "menuitem"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(locale.toUpperCase())}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(locale.toUpperCase()), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(locales), (locale) => {
                  return openBlock(), createBlock("div", { key: locale }, [
                    createVNode(_sfc_main$18, {
                      href: _ctx.route("setLang.set", locale),
                      class: ["dark:text-white text-gray-500 block px-4 py-2 text-sm hover:bg-red-500 hover:dark:bg-red-500", { "bg-red-500": locale === unref(lang) }],
                      role: "menuitem"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(locale.toUpperCase()), 1)
                      ]),
                      _: 2
                    }, 1032, ["href", "class"])
                  ]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
    };
  }
};
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SwitchLangNavbar.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const _sfc_main$15 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  emits: ["open"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "lg:ml-4 bg-slate-900 border-slate-700 text-slate-300 lg:bg-white dark:bg-slate-900 border-b lg:border-slate-100 dark:border-slate-800 lg:text-slate-500 dark:text-slate-300" }, _attrs))}><div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="mr-4 shrink-0 flex items-center lg:hidden"><button class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out">`);
      _push(ssrRenderComponent(unref(Bars3CenterLeftIcon), { class: "h-5 w-5" }, null, _parent));
      _push(`</button></div><div class="flex">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.dashboard"),
        class: "flex items-center space-x-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "hidden md:block h-5 w-auto fill-current" }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>${ssrInterpolate(_ctx.$page.props.app.name)}</p>`);
          } else {
            return [
              createVNode(ApplicationLogo, { class: "hidden md:block h-5 w-auto fill-current" }),
              createVNode("p", null, toDisplayString(_ctx.$page.props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_sfc_main$16, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$17, null, null, _parent));
      _push(`<div class=""><div class="relative">`);
      _push(ssrRenderComponent(_sfc_main$19, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out sm:hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(UserIcon), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(`</button><button type="button" class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out truncate w-fit hidden sm:inline-flex"${_scopeId}><span class="flex justify-between items-center"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name.split(
              " "
            )[0])} `);
            _push2(ssrRenderComponent(unref(CheckBadgeIcon), {
              class: "ml-[2px] w-4 h-4 text-white dark:text-white lg:text-primary",
              style: _ctx.$page.props.auth.user.email_verified_at ? null : { display: "none" }
            }, null, _parent2, _scopeId));
            _push2(`</span>`);
            _push2(ssrRenderComponent(unref(ChevronDownIcon), { class: "ml-2 h-5 w-5 fill-current" }, null, _parent2, _scopeId));
            _push2(`</button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out sm:hidden"
                }, [
                  createVNode(unref(UserIcon), { class: "h-5 w-5" })
                ]),
                createVNode("button", {
                  type: "button",
                  class: "hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out truncate w-fit hidden sm:inline-flex"
                }, [
                  createVNode("span", { class: "flex justify-between items-center" }, [
                    createTextVNode(toDisplayString(_ctx.$page.props.auth.user.name.split(
                      " "
                    )[0]) + " ", 1),
                    withDirectives(createVNode(unref(CheckBadgeIcon), { class: "ml-[2px] w-4 h-4 text-white dark:text-white lg:text-primary" }, null, 512), [
                      [
                        vShow,
                        _ctx.$page.props.auth.user.email_verified_at
                      ]
                    ])
                  ]),
                  createVNode(unref(ChevronDownIcon), { class: "ml-2 h-5 w-5 fill-current" })
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-3 px-4 border-b border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"${_scopeId}><span class="flex items-center justify-start text-sm truncate"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)} `);
            _push2(ssrRenderComponent(unref(CheckBadgeIcon), {
              class: "ml-[2px] w-4 h-4 dark:text-white text-primary",
              style: _ctx.$page.props.auth.user.email_verified_at ? null : { display: "none" }
            }, null, _parent2, _scopeId));
            _push2(`</span><span class="block text-sm font-medium text-slate-500 truncate dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</span></div>`);
            _push2(ssrRenderComponent(_sfc_main$18, {
              href: _ctx.route("admin.profile.edit")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().label.profile)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().label.profile), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              href: _ctx.route("admin.logout"),
              method: "post",
              as: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().label.logout)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().label.logout), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-3 px-4 border-b border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300" }, [
                createVNode("span", { class: "flex items-center justify-start text-sm truncate" }, [
                  createTextVNode(toDisplayString(_ctx.$page.props.auth.user.name) + " ", 1),
                  withDirectives(createVNode(unref(CheckBadgeIcon), { class: "ml-[2px] w-4 h-4 dark:text-white text-primary" }, null, 512), [
                    [
                      vShow,
                      _ctx.$page.props.auth.user.email_verified_at
                    ]
                  ])
                ]),
                createVNode("span", { class: "block text-sm font-medium text-slate-500 truncate dark:text-slate-400" }, toDisplayString(_ctx.$page.props.auth.user.email), 1)
              ]),
              createVNode(_sfc_main$18, {
                href: _ctx.route("admin.profile.edit")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.lang().label.profile), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_sfc_main$18, {
                href: _ctx.route("admin.logout"),
                method: "post",
                as: "button"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.lang().label.logout), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></nav>`);
    };
  }
};
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Navbar.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const _sfc_main$14 = {
  __name: "SideBarMenu",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-slate-300 pt-5 pb-20" }, _attrs))}><div class="flex justify-center"><div class="rounded-full flex items-center justify-center bg-red-700 text-slate-300 w-24 h-24 text-4xl uppercase">${ssrInterpolate(_ctx.$page.props.auth.user.name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join(""))}</div></div><div class="text-center py-3 px-4 border-b border-slate-700 dark:border-slate-800"><span class="flex items-center justify-center"><p class="truncate text-md">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</p><div>`);
      _push(ssrRenderComponent(unref(CheckBadgeIcon), {
        class: "ml-[2px] w-4 h-4",
        style: _ctx.$page.props.auth.user.email_verified_at ? null : { display: "none" }
      }, null, _parent));
      _push(`</div></span><span class="block text-sm font-medium truncate">${ssrInterpolate(_ctx.$page.props.auth.user.roles[0].name)}</span></div><ul class="space-y-2 my-4"><li class="${ssrRenderClass([_ctx.route().current("admin.dashboard") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.dashboard"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(HomeIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.dashboard)}</span>`);
          } else {
            return [
              createVNode(unref(HomeIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.dashboard), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["read user"]) ? null : { display: "none" })}" class="py-2"><p>${ssrInterpolate(_ctx.lang().label.data)}</p></li><li style="${ssrRenderStyle(_ctx.can(["read user"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.user.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.user.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.users)}</span>`);
          } else {
            return [
              createVNode(unref(UserIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.users), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["Warehouse List"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.warehouse.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.warehouse.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.warehouses)}</span>`);
          } else {
            return [
              createVNode(unref(UserIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.warehouses), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["Category List"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.category.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.category.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.categories)}</span>`);
          } else {
            return [
              createVNode(unref(UserIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.categories), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["Product List"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.product.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.product.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.products)}</span>`);
          } else {
            return [
              createVNode(unref(UserIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.products), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["WarehouseProduct List"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.warehouse_product.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.warehouse_product.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.warehouse_products)}</span>`);
          } else {
            return [
              createVNode(unref(UserIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.warehouse_products), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["Transaction List"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.transaction.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.transaction.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.transactions)}</span>`);
          } else {
            return [
              createVNode(unref(UserIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.transactions), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["read role", "read permission"]) ? null : { display: "none" })}" class="py-2"><p>${ssrInterpolate(_ctx.lang().label.access)}</p></li><li style="${ssrRenderStyle(_ctx.can(["read role"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.role.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.role.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(KeyIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.role)}</span>`);
          } else {
            return [
              createVNode(unref(KeyIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.role), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li style="${ssrRenderStyle(_ctx.can(["read permission"]) ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.route().current("admin.permission.index") ? "bg-red-500" : "bg-slate-700/40 dark:bg-slate-800/40", "text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"])}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.permission.index"),
        class: "flex items-center py-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShieldCheckIcon), { class: "w-6 h-5" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.permission)}</span>`);
          } else {
            return [
              createVNode(unref(ShieldCheckIcon), { class: "w-6 h-5" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.lang().label.permission), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div>`);
    };
  }
};
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SideBarMenu.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const _sfc_main$13 = {
  __name: "SideBar",
  __ssrInlineRender: true,
  props: {
    open: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="hidden lg:flex"><aside class="fixed lg:flex flex-col h-screen overflow-hidden w-64 bg-slate-800 dark:bg-slate-900 dark:border-r dark:border-slate-800"><div class="flex-1 h-screen overflow-y-auto scrollbar-sidebar px-3">`);
      _push(ssrRenderComponent(_sfc_main$14, null, null, _parent));
      _push(`</div></aside></div>`);
      _push(ssrRenderComponent(unref(TransitionRoot), { show: __props.open }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              onClose: ($event) => emit("close"),
              class: "fixed inset-0 z-10 flex lg:hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    enter: "transition ease-in-out duration-200 transform",
                    "enter-from": "-translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transition ease-in-out duration-200 transform",
                    "leave-from": "translate-x-0",
                    "leave-to": "-translate-x-full",
                    as: "template"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<aside class="flex flex-col relative z-10 w-64 bg-slate-800 dark:bg-slate-900 dark:border-r dark:border-slate-800"${_scopeId3}><div class="flex flex-col relative h-screen min-h-screen"${_scopeId3}><div class="overflow-y-auto flex-1 scrollbar-sidebar px-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$14, null, null, _parent4, _scopeId3));
                        _push4(`</div></div></aside>`);
                      } else {
                        return [
                          createVNode("aside", { class: "flex flex-col relative z-10 w-64 bg-slate-800 dark:bg-slate-900 dark:border-r dark:border-slate-800" }, [
                            createVNode("div", { class: "flex flex-col relative h-screen min-h-screen" }, [
                              createVNode("div", { class: "overflow-y-auto flex-1 scrollbar-sidebar px-3" }, [
                                createVNode(_sfc_main$14)
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    enter: "transition-opacity ease-linear duration-200",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-200",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0",
                    as: "template"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 bg-slate-500 dark:bg-slate-900 opacity-75 lg:hidden" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogOverlay), { class: "fixed inset-0 bg-slate-500 dark:bg-slate-900 opacity-75 lg:hidden" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      enter: "transition ease-in-out duration-200 transform",
                      "enter-from": "-translate-x-full",
                      "enter-to": "translate-x-0",
                      leave: "transition ease-in-out duration-200 transform",
                      "leave-from": "translate-x-0",
                      "leave-to": "-translate-x-full",
                      as: "template"
                    }, {
                      default: withCtx(() => [
                        createVNode("aside", { class: "flex flex-col relative z-10 w-64 bg-slate-800 dark:bg-slate-900 dark:border-r dark:border-slate-800" }, [
                          createVNode("div", { class: "flex flex-col relative h-screen min-h-screen" }, [
                            createVNode("div", { class: "overflow-y-auto flex-1 scrollbar-sidebar px-3" }, [
                              createVNode(_sfc_main$14)
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TransitionChild), {
                      enter: "transition-opacity ease-linear duration-200",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "transition-opacity ease-linear duration-200",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0",
                      as: "template"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DialogOverlay), { class: "fixed inset-0 bg-slate-500 dark:bg-slate-900 opacity-75 lg:hidden" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                onClose: ($event) => emit("close"),
                class: "fixed inset-0 z-10 flex lg:hidden"
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    enter: "transition ease-in-out duration-200 transform",
                    "enter-from": "-translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transition ease-in-out duration-200 transform",
                    "leave-from": "translate-x-0",
                    "leave-to": "-translate-x-full",
                    as: "template"
                  }, {
                    default: withCtx(() => [
                      createVNode("aside", { class: "flex flex-col relative z-10 w-64 bg-slate-800 dark:bg-slate-900 dark:border-r dark:border-slate-800" }, [
                        createVNode("div", { class: "flex flex-col relative h-screen min-h-screen" }, [
                          createVNode("div", { class: "overflow-y-auto flex-1 scrollbar-sidebar px-3" }, [
                            createVNode(_sfc_main$14)
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TransitionChild), {
                    enter: "transition-opacity ease-linear duration-200",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-200",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0",
                    as: "template"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(DialogOverlay), { class: "fixed inset-0 bg-slate-500 dark:bg-slate-900 opacity-75 lg:hidden" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SideBar.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const _sfc_main$12 = {
  components: {
    XMarkIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon
  },
  props: {
    flash: Object
  },
  data() {
    return {
      isVisible: false,
      isErrorVisible: false,
      timeout: null
    };
  },
  methods: {
    toggle() {
      this.isVisible = false;
      this.isErrorVisible = false;
    }
  },
  watch: {
    flash: {
      deep: true,
      handler(newVal) {
        this.isVisible = true;
        this.isErrorVisible = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.isVisible = false;
        }, 3e3);
      }
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CheckCircleIcon = resolveComponent("CheckCircleIcon");
  const _component_XMarkIcon = resolveComponent("XMarkIcon");
  const _component_InformationCircleIcon = resolveComponent("InformationCircleIcon");
  const _component_ExclamationTriangleIcon = resolveComponent("ExclamationTriangleIcon");
  const _component_ExclamationCircleIcon = resolveComponent("ExclamationCircleIcon");
  _push(`<!--[-->`);
  if ($props.flash.success && $data.isVisible) {
    _push(`<div class="absolute top-4 right-4 w-8/12 md:w-6/12 lg:w-3/12 z-[100]"><div class="flex p-4 justify-between items-center bg-green-600 rounded-lg"><div>`);
    _push(ssrRenderComponent(_component_CheckCircleIcon, {
      class: "h-8 w-8 text-white",
      fill: "currentColor"
    }, null, _parent));
    _push(`</div><div class="mx-3 text-sm font-medium text-white">${$props.flash.success ?? ""}</div><button type="button" class="ml-auto bg-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 p-1.5 hover:bg-white/30 h-8 w-8"><span class="sr-only">Close</span>`);
    _push(ssrRenderComponent(_component_XMarkIcon, { class: "w-5 h-5" }, null, _parent));
    _push(`</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.flash.info && $data.isVisible) {
    _push(`<div class="absolute top-4 right-4 w-8/12 md:w-6/12 lg:w-3/12 z-[100]"><div class="flex p-4 justify-between items-center bg-primary rounded-lg"><div>`);
    _push(ssrRenderComponent(_component_InformationCircleIcon, {
      class: "h-8 w-8 text-white",
      fill: "currentColor"
    }, null, _parent));
    _push(`</div><div class="mx-3 text-sm font-medium text-white">${$props.flash.info ?? ""}</div><button type="button" class="ml-auto bg-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 p-1.5 hover:bg-white/30 h-8 w-8"><span class="sr-only">Close</span>`);
    _push(ssrRenderComponent(_component_XMarkIcon, { class: "w-5 h-5" }, null, _parent));
    _push(`</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.flash.warning && $data.isVisible) {
    _push(`<div class="absolute top-4 right-4 w-8/12 md:w-6/12 lg:w-3/12 z-[100]"><div class="flex p-4 justify-between items-center bg-amber-600 rounded-lg"><div>`);
    _push(ssrRenderComponent(_component_ExclamationTriangleIcon, {
      class: "h-8 w-8 text-white",
      fill: "currentColor"
    }, null, _parent));
    _push(`</div><div class="mx-3 text-sm font-medium text-white">${$props.flash.warning ?? ""}</div><button type="button" class="ml-auto bg-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 p-1.5 hover:bg-white/30 h-8 w-8"><span class="sr-only">Close</span>`);
    _push(ssrRenderComponent(_component_XMarkIcon, { class: "w-5 h-5" }, null, _parent));
    _push(`</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.flash.error && $data.isErrorVisible) {
    _push(`<div class="absolute top-4 right-4 w-8/12 md:w-6/12 lg:w-3/12 z-[100]"><div class="flex p-4 justify-between items-center bg-red-600 rounded-lg"><div>`);
    _push(ssrRenderComponent(_component_ExclamationCircleIcon, {
      class: "h-8 w-8 text-white",
      fill: "currentColor"
    }, null, _parent));
    _push(`</div><div class="mx-3 text-sm font-medium text-white">${$props.flash.error ?? ""}</div><button type="button" class="ml-auto bg-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 p-1.5 hover:bg-white/30 h-8 w-8">`);
    _push(ssrRenderComponent(_component_XMarkIcon, { class: "w-5 h-5" }, null, _parent));
    _push(`</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Toast.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const Toast = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$11 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "sticky top-[100vh] border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300" }, _attrs))}><div class="flex items-center justify-center sm:justify-end max-w-7xl mx-auto p-4 sm:px-6 lg:px-8"><p class="text-center"><a href="https://example.com" target="_blank" class="font-bold">${ssrInterpolate(_ctx.$page.props.app.name)}</a> ©️ ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} <a href="https://example.com" target="_blank" class="font-bold text-primary">Example</a></p></div></footer>`);
}
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Footer.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$10 = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  emits: ["close", "open"],
  setup(__props, { emit: __emit }) {
    const sidebarOpened = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex w-full overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$13, null, null, _parent));
      _push(`<div class="pl-0 lg:pl-64 w-full min-h-screen block bg-slate-100 dark:bg-slate-900">`);
      _push(ssrRenderComponent(Toast, {
        flash: _ctx.$page.props.flash
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$15, {
        open: sidebarOpened.value,
        onOpen: ($event) => sidebarOpened.value = true
      }, null, _parent));
      _push(`<main class="ml-4 max-w-full mx-auto md:pl-6 lg:pl-0 sm:pr-6 lg:pr-8 pb-10 text-slate-900 dark:text-slate-100 text-sm">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const _sfc_main$$ = {
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  props: {
    title: String,
    breadcrumbs: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between py-4 px-4 sm:px-0 text-slate-500 dark:text-slate-300" }, _attrs))}><p>${ssrInterpolate(__props.title)}</p><div class="hidden sm:flex space-x-2 items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.dashboard"),
        style: __props.breadcrumbs.length != 0 ? null : { display: "none" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.lang().label.dashboard)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.lang().label.dashboard), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(__props.breadcrumbs, (breadcrumb, index) => {
        _push(`<div class="flex items-center space-x-2">`);
        _push(ssrRenderComponent(unref(ChevronRightIcon), { class: "w-3 h-3" }, null, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: breadcrumb.href
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(breadcrumb.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(breadcrumb.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Breadcrumb.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const _sfc_main$_ = {
  __name: "SelectInput",
  __ssrInlineRender: true,
  props: ["modelValue", "dataSet"],
  emits: ["update:modelValue"],
  setup(__props) {
    const input = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${ssrRenderAttrs(mergeProps({
        class: "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50",
        value: __props.modelValue,
        ref_key: "input",
        ref: input
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.dataSet, (data, index) => {
        _push(`<option${ssrRenderAttr("value", data.value)}>${ssrInterpolate(data.label)}</option>`);
      });
      _push(`<!--]--></select>`);
    };
  }
};
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SelectInput.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const _sfc_main$Z = {
  __name: "InfoButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-2 py-1.5 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InfoButton.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const _sfc_main$Y = {
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: String
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      if (props.name === "nodata") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          xmlns: "http://www.w3.org/2000/svg",
          "data-name": "Layer 1",
          width: "647.63626",
          height: "632.17383",
          viewBox: "0 0 647.63626 632.17383",
          "xmlns:xlink": "http://www.w3.org/1999/xlink"
        }, _attrs))}><path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="#f2f2f2"></path><path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"></path><path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" class="text-primary fill-current"></path><circle cx="190.15351" cy="24.95465" r="20" class="text-primary fill-current"></circle><circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff"></circle><path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="#e6e6e6"></path><path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"></path><path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" class="text-primary fill-current"></path><circle cx="433.63626" cy="105.17383" r="20" class="text-primary fill-current"></circle><circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff"></circle></svg>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Icon.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const _sfc_main$X = {
  __name: "ResourcePagination",
  __ssrInlineRender: true,
  props: {
    links: Object,
    filters: Object
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const data = reactive({
      params: {
        search: (_a = props.filters) == null ? void 0 : _a.search,
        field: (_b = props.filters) == null ? void 0 : _b.field,
        order: (_c = props.filters) == null ? void 0 : _c.order,
        perPage: (_d = props.filters) == null ? void 0 : _d.perPage
      }
    });
    watchEffect(() => {
      var _a2, _b2, _c2, _d2;
      data.params.search = (_a2 = props.filters) == null ? void 0 : _a2.search;
      data.params.field = (_b2 = props.filters) == null ? void 0 : _b2.field;
      data.params.order = (_c2 = props.filters) == null ? void 0 : _c2.order;
      data.params.perPage = (_d2 = props.filters) == null ? void 0 : _d2.perPage;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.links.data.length != 0) {
        _push(`<div class="ml-2">${ssrInterpolate(__props.links.meta.from)}-${ssrInterpolate(__props.links.meta.to)} ${ssrInterpolate(_ctx.lang().label.of)} ${ssrInterpolate(__props.links.meta.total)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.links.data.length == 0) {
        _push(`<div class="flex flex-col space-y-2 mx-auto p-6 text-lg">`);
        _push(ssrRenderComponent(_sfc_main$Y, {
          name: "nodata",
          class: "w-auto h-16"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(_ctx.lang().label.no_data)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.links.meta.links.length > 1) {
        _push(`<div><ul class="flex justify-center items-center rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"><li><button class="px-4 py-2"${ssrIncludeBooleanAttr(__props.links.links.prev == null) ? " disabled" : ""}>${"«"}</button></li><li><p class="px-4 py-2 bg-primary text-white">${__props.links.meta.current_page ?? ""}</p></li><li><button class="px-4 py-2"${ssrIncludeBooleanAttr(__props.links.links.next == null) ? " disabled" : ""}>${"»"}</button></li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResourcePagination.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const datetime_format$4 = "yyyy-MM-dd HH:mm";
const _sfc_main$W = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    categories: Object,
    restaurants: Array,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage,
        id: "",
        restaurant_id: "",
        name: "",
        order_num: "",
        logo: null,
        is_active: "",
        created_at: ""
      },
      selectedId: [],
      multipleSelect: false,
      createOpen: false,
      editOpen: false,
      deleteOpen: false,
      category: null,
      dataSet: usePage().props.app.perpage
    });
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    const restaurant_list = Object.keys(props.restaurants).map((key) => ({
      label: props.restaurants[key],
      value: key
    }));
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.category.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 1e3)
    );
    const startTime = ref({ hours: 0, minutes: 0 });
    const locale = usePage().props.locale;
    const timezone = ref({ tz: "Asia/Tashkent", offset: 5 });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              style: _ctx.can(["Category Create"]) ? null : { display: "none" },
              class: "rounded-none",
              onClick: ($event) => data.createOpen = true
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1e, {
              show: data.createOpen,
              onClose: ($event) => data.createOpen = false,
              title: props.title,
              restaurants: props.restaurants
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1b, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              category: data.category,
              title: props.title,
              restaurants: props.restaurants
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1c, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              category: data.category,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="flex justify-between p-2"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table"${_scopeId}><table class="w-full"${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700"${_scopeId}><tr class="dark:bg-slate-900/50 text-left"${_scopeId}><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.id)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.restaurant)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.is_active)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.logo)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.order_num)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.created)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only"${_scopeId}>Action</th></tr><tr${_scopeId}><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["id"],
              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
              modelModifiers: { lazy: true },
              type: "number",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1j, {
              id: "restaurant_id",
              class: "mt-1 block w-full",
              modelValue: data.params["restaurant_id"],
              "onUpdate:modelValue": ($event) => data.params["restaurant_id"] = $event,
              dataSet: unref(restaurant_list),
              prompt: _ctx.lang().label.all
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["name"],
              "onUpdate:modelValue": ($event) => data.params["name"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              class: "block w-full rounded-lg size-8 text-sm font-light py-0",
              modelValue: data.params["is_active"],
              "onUpdate:modelValue": ($event) => data.params["is_active"] = $event,
              dataSet: [
                { value: -1, label: _ctx.lang().label.all },
                { value: 1, label: _ctx.lang().button.yes },
                { value: 0, label: _ctx.lang().button.no }
              ],
              selected: data.params["is_active"] === "" ? -1 : data.params["is_active"]
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}></th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["order_num"],
              "onUpdate:modelValue": ($event) => data.params["order_num"] = $event,
              modelModifiers: { lazy: true },
              type: "number",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(VueDatePicker), {
              modelValue: data.params.created_at,
              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
              range: "",
              "enable-time-picker": true,
              "is-24": true,
              "start-time": startTime.value,
              format: datetime_format$4,
              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
              teleport: true,
              timezone: timezone.value,
              "input-class-name": [
                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
              ]
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.updated_at,
              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories.data, (category, index) => {
              _push2(`<tr class="${ssrRenderClass([{ "bg-slate-200/30 dark:bg-slate-900/20": category.deleted_at }, "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"])}"${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"${_scopeId}>${ssrInterpolate(category.id)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"${_scopeId}>${ssrInterpolate(category.restaurant.name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"${_scopeId}>${ssrInterpolate(category.name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}><span class="${ssrRenderClass(category.is_active === true ? "text-green-500" : "text-rose-500")}"${_scopeId}>${ssrInterpolate(category.is_active === true ? _ctx.lang().button.yes : _ctx.lang().button.no)}</span></td><td class="py-4 px-2 sm:py-3"${_scopeId}>`);
              if (category.logo != null) {
                _push2(`<div class=""${_scopeId}><img${ssrRenderAttr("src", category.logo)} alt="icon" class="mx-auto max-w-8 max-h-12 rounded-full"${_scopeId}></div>`);
              } else {
                _push2(`<div class="flex justify-center items-center"${_scopeId}> - </div>`);
              }
              _push2(`</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>${ssrInterpolate(category.order_num)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(category.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(category.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}><div class="flex justify-center items-center"${_scopeId}><div class="rounded-md overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                href: _ctx.route("admin.category.show", category == null ? void 0 : category.id),
                tabindex: "-1"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(EyeIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
                style: _ctx.can(["Category Update"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.editOpen = true, data.category = category),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["Category Delete"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.deleteOpen = true, data.category = category),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$X, {
              links: props.categories,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    withDirectives(createVNode(_sfc_main$1g, {
                      class: "rounded-none",
                      onClick: ($event) => data.createOpen = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, _ctx.can(["Category Create"])]
                    ]),
                    createVNode(_sfc_main$1e, {
                      show: data.createOpen,
                      onClose: ($event) => data.createOpen = false,
                      title: props.title,
                      restaurants: props.restaurants
                    }, null, 8, ["show", "onClose", "title", "restaurants"]),
                    createVNode(_sfc_main$1b, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      category: data.category,
                      title: props.title,
                      restaurants: props.restaurants
                    }, null, 8, ["show", "onClose", "category", "title", "restaurants"]),
                    createVNode(_sfc_main$1c, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      category: data.category,
                      title: props.title
                    }, null, 8, ["show", "onClose", "category", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("id")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.id), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("restaurant_id")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.restaurant), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("is_active")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.is_active), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4" }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.logo), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ]),
                          createVNode("th", { class: "px-2 py-4" }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.order_num), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ]),
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["id"],
                              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
                              modelModifiers: { lazy: true },
                              type: "number",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1j, {
                              id: "restaurant_id",
                              class: "mt-1 block w-full",
                              modelValue: data.params["restaurant_id"],
                              "onUpdate:modelValue": ($event) => data.params["restaurant_id"] = $event,
                              dataSet: unref(restaurant_list),
                              prompt: _ctx.lang().label.all
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "prompt"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["name"],
                              "onUpdate:modelValue": ($event) => data.params["name"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$_, {
                              class: "block w-full rounded-lg size-8 text-sm font-light py-0",
                              modelValue: data.params["is_active"],
                              "onUpdate:modelValue": ($event) => data.params["is_active"] = $event,
                              dataSet: [
                                { value: -1, label: _ctx.lang().label.all },
                                { value: 1, label: _ctx.lang().button.yes },
                                { value: 0, label: _ctx.lang().button.no }
                              ],
                              selected: data.params["is_active"] === "" ? -1 : data.params["is_active"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "selected"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["order_num"],
                              "onUpdate:modelValue": ($event) => data.params["order_num"] = $event,
                              modelModifiers: { lazy: true },
                              type: "number",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(unref(VueDatePicker), {
                              modelValue: data.params.created_at,
                              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
                              range: "",
                              "enable-time-picker": true,
                              "is-24": true,
                              "start-time": startTime.value,
                              format: datetime_format$4,
                              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
                              teleport: true,
                              timezone: timezone.value,
                              "input-class-name": [
                                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
                              ]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "start-time", "locale", "timezone"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params.updated_at,
                              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" })
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.categories.data, (category, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: ["border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20", { "bg-slate-200/30 dark:bg-slate-900/20": category.deleted_at }]
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(category.id), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(category.restaurant.name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(category.name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, [
                              createVNode("span", {
                                class: category.is_active === true ? "text-green-500" : "text-rose-500"
                              }, toDisplayString(category.is_active === true ? _ctx.lang().button.yes : _ctx.lang().button.no), 3)
                            ]),
                            createVNode("td", { class: "py-4 px-2 sm:py-3" }, [
                              category.logo != null ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: ""
                              }, [
                                createVNode("img", {
                                  src: category.logo,
                                  alt: "icon",
                                  class: "mx-auto max-w-8 max-h-12 rounded-full"
                                }, null, 8, ["src"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex justify-center items-center"
                              }, " - "))
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(category.order_num), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(category.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(category.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  createVNode(unref(Link), {
                                    class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                                    href: _ctx.route("admin.category.show", category == null ? void 0 : category.id),
                                    tabindex: "-1"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                    type: "button",
                                    onClick: ($event) => (data.editOpen = true, data.category = category),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Category Update"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.deleteOpen = true, data.category = category),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Category Delete"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.delete]
                                  ])
                                ])
                              ])
                            ])
                          ], 2);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$X, {
                      links: props.categories,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Category/Index.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const Index$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$W
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$V = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    title: String,
    items: Object,
    breadcrumbs: Object
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {},
      category: null,
      owner: null,
      employees: [],
      editOpen: false
    });
    const { category } = usePage().props;
    watchEffect(() => {
      if (data.editOpen === false && data.category !== null) {
        location.reload();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1b, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              category: data.category,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="col-span-2 px-4 sm:px-0"${_scopeId}><div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><div class="grid grid-cols-6 md:grid-cols-6 gap-4"${_scopeId}><div class="col-span-5"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200"${_scopeId}>${ssrInterpolate(unref(category).name)}</h3></div><div class="col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
              style: _ctx.can(["Category Update"]) ? null : { display: "none" },
              type: "button",
              onClick: ($event) => (data.editOpen = true, data.category = unref(category)),
              class: "px-2 py-1.5 rounded float-right"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().label.edit)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(PencilIcon$1), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="border-t border-gray-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><div class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}> ID </dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).id)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).name)}</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.short_description)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).short_description)}</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.is_active)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>`);
            if (unref(category).is_active === true) {
              _push2(`<span class="text-green-700 font-bold"${_scopeId}>${ssrInterpolate(_ctx.lang().label.active)}</span>`);
            } else {
              _push2(`<span class="text-rose-700 font-bold"${_scopeId}>${ssrInterpolate(_ctx.lang().label.inactive)}</span>`);
            }
            _push2(`</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.logo)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>`);
            if (unref(category).logo) {
              _push2(`<img${ssrRenderAttr("src", unref(category).logo)} alt="logo" class="w-10 h-10 object-cover"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.order_num)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).order_num)}</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.created_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).created_at)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).updated_at)}</dd></div></div></div></div></div></div></div><div class="col-span-1 px-4 sm:px-0"${_scopeId}><div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200"${_scopeId}>${ssrInterpolate(_ctx.lang().label.restaurant)}</h3></div><div class="border-t border-gray-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><div class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.restaurant_id)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).restaurant_id)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(category).name)}</dd></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    createVNode(_sfc_main$1b, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      category: data.category,
                      title: props.title
                    }, null, 8, ["show", "onClose", "category", "title"])
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "col-span-2 px-4 sm:px-0" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "px-4 sm:px-0" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                          createVNode("div", { class: "grid grid-cols-6 md:grid-cols-6 gap-4" }, [
                            createVNode("div", { class: "col-span-5" }, [
                              createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-slate-200" }, toDisplayString(unref(category).name), 1)
                            ]),
                            createVNode("div", { class: "col-span-1" }, [
                              withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                type: "button",
                                onClick: ($event) => (data.editOpen = true, data.category = unref(category)),
                                class: "px-2 py-1.5 rounded float-right"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [vShow, _ctx.can(["Category Update"])],
                                [_directive_tooltip, _ctx.lang().label.edit]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 dark:border-slate-700" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, " ID "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).id), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).name), 1)
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.short_description), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).short_description), 1)
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.is_active), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, [
                                unref(category).is_active === true ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-green-700 font-bold"
                                }, toDisplayString(_ctx.lang().label.active), 1)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-rose-700 font-bold"
                                }, toDisplayString(_ctx.lang().label.inactive), 1))
                              ])
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.logo), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, [
                                unref(category).logo ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(category).logo,
                                  alt: "logo",
                                  class: "w-10 h-10 object-cover"
                                }, null, 8, ["src"])) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.order_num), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).order_num), 1)
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.created_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).created_at), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.updated_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).updated_at), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-span-1 px-4 sm:px-0" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "px-4 sm:px-0" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-slate-200" }, toDisplayString(_ctx.lang().label.restaurant), 1)
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 dark:border-slate-700" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.restaurant_id), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).restaurant_id), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(category).name), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Category/Show.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const Show$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$V
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$U = {
  __name: "CameraSelectInput",
  __ssrInlineRender: true,
  props: ["modelValue", "dataSet"],
  emits: ["update:modelValue"],
  setup(__props) {
    const input = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${ssrRenderAttrs(mergeProps({
        class: "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50",
        value: __props.modelValue,
        ref_key: "input",
        ref: input
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.dataSet, (data, index) => {
        _push(`<option${ssrRenderAttr("value", data.id)}${ssrIncludeBooleanAttr(index === 0) ? " selected" : ""}>${ssrInterpolate(data.label)}</option>`);
      });
      _push(`<!--]--></select>`);
    };
  }
};
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CameraSelectInput.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const _sfc_main$T = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><div class="grid grid-cols-3 gap-4 animate-pulse"><div class="h-10 bg-gray-300 rounded"></div><div class="h-10 bg-gray-300 rounded"></div><div class="h-10 bg-gray-300 rounded"></div></div><h4 class="text-lg font-medium text-slate-700 dark:text-slate-100 mt-5">${ssrInterpolate(_ctx.lang().label.names)}</h4><div class="grid grid-cols-1 gap-4 mt-1 animate-pulse"><ul class="flex border-b"><li class="-mb-px mr-1 h-8 w-24 bg-gray-300 rounded"></li><li class="-mb-px mr-1 h-8 w-24 bg-gray-300 rounded"></li><li class="-mb-px mr-1 h-8 w-24 bg-gray-300 rounded"></li></ul><div class="py-3"><div class="grid grid-cols-3 md:grid-cols-3 gap-4"><div class="col-span-1 px-4 sm:px-0"><div class="h-6 bg-gray-300 rounded w-24 mb-2"></div><div class="h-10 bg-gray-300 rounded w-full"></div></div><div class="col-span-2 px-4 sm:px-0"><div class="h-6 bg-gray-300 rounded w-24 mb-2"></div><div class="h-10 bg-gray-300 rounded w-full"></div></div></div></div></div><!--]-->`);
}
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product/EmptyForm.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const EmptyForm = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["ssrRender", _sfc_ssrRender]]);
const EmptyForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EmptyForm
}, Symbol.toStringTag, { value: "Module" }));
const lineSpeed = 2;
const _sfc_main$S = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    form: Object,
    locales: Array,
    category_list: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const linePosition = ref(0);
    let animationFrameId = null;
    let direction = 1;
    const activeMainTab = ref(usePage().props.locale);
    const scanning = ref(false);
    const scanner = ref(null);
    const cameras = ref([]);
    const selectedCamera = ref(null);
    const currentActiveCamera = ref(null);
    let videoStream = null;
    let videoStreams = /* @__PURE__ */ new Map();
    const isCameraActive = ref(false);
    const animateLine = () => {
      if (!scanning.value) return;
      const video = scanner.value;
      if (!video) {
        return;
      }
      const videoHeight = video.clientHeight;
      linePosition.value += direction * lineSpeed;
      if (linePosition.value >= videoHeight - 4 || linePosition.value <= 0) {
        direction *= -1;
      }
      animationFrameId = requestAnimationFrame(animateLine);
    };
    watch(scanning, async (newVal) => {
      if (newVal) {
        await nextTick();
        if (!scanner.value) {
          return;
        }
        linePosition.value = 0;
        console.log("🔴 Сканирование запущено, старт анимации");
        animateLine();
      } else {
        console.log("⚪ Сканирование остановлено, анимация выключена");
        cancelAnimationFrame(animationFrameId);
      }
    });
    const initCameraSelection = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        cameras.value = videoDevices.map((device) => ({
          id: device.deviceId || device.id,
          label: device.label || `Camera ${cameras.value.length + 1}`
        }));
        if (cameras.value.length > 0) {
          selectedCamera.value = cameras.value[0].id;
        }
      } catch (error) {
        console.error("Ошибка получения списка камер:", error);
      }
    };
    const stopVideoStream = (cameraId = null) => {
      if (cameraId && videoStreams.has(cameraId)) {
        const stream = videoStreams.get(cameraId);
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
        stream.getVideoTracks()[0].stop();
        videoStreams.delete(cameraId);
        console.log(`Остановлена камера: ${cameraId}`);
      }
      if (!cameraId && videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
          console.log(`Остановлена камера с ID: ${currentActiveCamera.value}`);
        });
        currentActiveCamera.value = null;
        videoStream = null;
      }
    };
    const startVideoStream = async () => {
      try {
        stopVideoStream(currentActiveCamera.value);
        videoStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: selectedCamera.value ? { exact: selectedCamera.value } : void 0
          }
        });
        if (scanner.value) {
          scanner.value.srcObject = videoStream;
          await new Promise((resolve) => {
            scanner.value.onloadeddata = resolve;
          });
          if (scanner.value.paused) {
            await scanner.value.play();
          }
        }
        videoStreams.set(selectedCamera.value, videoStream);
        currentActiveCamera.value = selectedCamera.value;
        console.log(`Камера с ID ${selectedCamera.value} запущена`);
      } catch (error) {
        console.error("Ошибка запуска камеры:", error);
      }
    };
    const toggleScanner = async () => {
      isCameraActive.value = !isCameraActive.value;
      if (scanning.value) {
        stopScanner();
      } else {
        scanning.value = true;
        await nextTick();
        await startScanner();
      }
    };
    const startScanner = async () => {
      scanning.value = true;
      await nextTick();
      if (Quagga.initialized) {
        console.warn("Quagga уже запущен!");
        return;
      }
      await startVideoStream();
      Quagga.init({
        inputStream: {
          // name: "Live",
          type: "LiveStream",
          target: scanner.value,
          constraints: {
            deviceId: selectedCamera.value ? { exact: selectedCamera.value } : void 0
          },
          willReadFrequently: true
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        decoder: {
          readers: ["ean_reader", "code_128_reader"]
        }
      }, (err) => {
        if (err) {
          console.error(err);
          scanning.value = false;
          return;
        }
        Quagga.initialized = true;
        Quagga.start();
      });
      Quagga.onDetected((data) => {
        if (!scanning.value) return;
        console.log("Сканировано:", data.codeResult.code);
        props.form.barcode = data.codeResult.code;
        Quagga.stop();
        Quagga.offDetected();
        Quagga.initialized = false;
        setTimeout(resumeScanning, 1e3);
      });
    };
    const resumeScanning = () => {
      if (scanning.value) {
        if (!Quagga.initialized) {
          console.warn("Quagga не был инициализирован. Повторный запуск...");
          startScanner();
        } else {
          Quagga.start();
        }
      }
    };
    const stopScanner = () => {
      if (Quagga.initialized) {
        Quagga.stop();
        Quagga.offDetected();
        Quagga.initialized = false;
      }
      stopVideoStream();
      scanning.value = false;
    };
    const searchProductByBarCode = () => {
      if (!props.form.barcode) {
        return;
      }
      let barcode = props.form.barcode;
      console.log("Поиск продукта по штрихкоду:", barcode);
      try {
        axios.get(route("admin.product.searchInfoByEan", barcode)).then((response) => {
          if (response.data.success === true) {
            props.form.processing = false;
            const product_data = response.data.product_data.product;
            console.log("Данные продукта:", product_data);
            const product_name = (product_data.name_ru ?? product_data.name) + ", " + product_data.quantity;
            const product_description = product_name + ", " + product_data.countries;
            props.locales.forEach((locale) => {
              props.form.name[locale] = product_name;
              props.form.description[locale] = product_description;
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.error("Ошибка поиска продукта по штрихкоду:", error);
      }
    };
    watch(selectedCamera, async (newCamera, oldCamera) => {
      if (oldCamera !== newCamera && isCameraActive.value) {
        console.log(`Переключение с камеры ${oldCamera} на ${newCamera}`);
        stopVideoStream(oldCamera);
        await startVideoStream();
      }
    });
    onMounted(() => {
      initCameraSelection();
      cancelAnimationFrame(animationFrameId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_select = resolveComponent("v-select");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-f3e7a985>`);
      if (__props.form.processing) {
        _push(`<div data-v-f3e7a985>`);
        _push(ssrRenderComponent(EmptyForm, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div data-v-f3e7a985><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-f3e7a985><div class="col-span-2" data-v-f3e7a985><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-f3e7a985><div data-v-f3e7a985>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "sku",
          value: _ctx.lang().product.sku
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1l, {
          id: "sku",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: __props.form.sku,
          "onUpdate:modelValue": ($event) => __props.form.sku = $event,
          required: "",
          placeholder: _ctx.lang().product.sku,
          error: __props.form.errors.sku
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          class: "mt-2",
          message: __props.form.errors.sku
        }, null, _parent));
        _push(`</div><div data-v-f3e7a985>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "price",
          value: _ctx.lang().label.price
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1l, {
          id: "price",
          type: "number",
          class: "mt-1 block w-full",
          modelValue: __props.form.price,
          "onUpdate:modelValue": ($event) => __props.form.price = $event,
          step: "1",
          min: "0",
          required: "",
          placeholder: _ctx.lang().label.price,
          error: __props.form.errors.price
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          class: "mt-2",
          message: __props.form.errors.price
        }, null, _parent));
        _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5" data-v-f3e7a985><div data-v-f3e7a985>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "category_ids",
          value: _ctx.lang().label.categories
        }, null, _parent));
        _push(ssrRenderComponent(_component_v_select, {
          multiple: "",
          modelValue: __props.form.category_ids,
          "onUpdate:modelValue": ($event) => __props.form.category_ids = $event,
          options: __props.category_list,
          reduce: (option) => option.value,
          clearable: ""
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          class: "mt-2",
          message: __props.form.errors.category_ids
        }, null, _parent));
        _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5" data-v-f3e7a985><div class="col-span-1" data-v-f3e7a985><div class="grid grid-cols-4 gap-2" data-v-f3e7a985><div class="col-span-3" data-v-f3e7a985>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "barcode",
          value: _ctx.lang().product.barcode
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1l, {
          id: "barcode",
          type: "number",
          class: "mt-1 block w-full",
          modelValue: __props.form.barcode,
          "onUpdate:modelValue": ($event) => __props.form.barcode = $event,
          required: "",
          placeholder: _ctx.lang().product.barcode,
          error: __props.form.errors.barcode
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          class: "mt-2",
          message: __props.form.errors.barcode
        }, null, _parent));
        _push(`</div><div class="col-span-1" data-v-f3e7a985>`);
        _push(ssrRenderComponent(_sfc_main$1g, {
          type: "button",
          onClick: searchProductByBarCode,
          disabled: !__props.form.barcode,
          class: "mt-6 right-2 top-2 bg-gray-300 py-2 text-gray-800 rounded h-auto float-end",
          style: { "height": "40px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(MagnifyingGlassIcon), { class: "h-5 w-5" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div><div class="col-span-1" data-v-f3e7a985><div class="grid grid-cols-4 gap-2" data-v-f3e7a985><div class="col-span-3" data-v-f3e7a985>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "camera-select",
          value: _ctx.lang().label.camera_list
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$U, {
          id: "camera-select",
          class: "mt-1 block w-full",
          modelValue: selectedCamera.value,
          "onUpdate:modelValue": ($event) => selectedCamera.value = $event,
          dataSet: cameras.value,
          onChange: startScanner
        }, null, _parent));
        _push(`</div><div class="md:col-span-1" data-v-f3e7a985>`);
        _push(ssrRenderComponent(_sfc_main$1f, {
          type: "button",
          onClick: toggleScanner,
          class: "mt-6 right-2 top-2 bg-gray-300 p-2 rounded h-auto float-end",
          style: { "height": "40px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(QrCodeIcon), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(QrCodeIcon), { class: "h-5 w-5" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></div><div class="col-span-1" data-v-f3e7a985><div class="grid grid-cols-1 md:grid-cols-1 gap-4" data-v-f3e7a985>`);
        if (scanning.value) {
          _push(`<div class="mt-4 relative" data-v-f3e7a985><video class="w-full border rounded" autoplay data-v-f3e7a985></video><div class="scanner-overlay" data-v-f3e7a985><div class="scanner-line" style="${ssrRenderStyle({ top: linePosition.value + "px" })}" data-v-f3e7a985></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><h4 class="text-lg font-medium text-slate-700 dark:text-slate-100 mt-5" data-v-f3e7a985>${ssrInterpolate(_ctx.lang().label.names)}</h4><div class="grid grid-cols-1 gap-4 mt-1" data-v-f3e7a985><ul class="flex border-b" data-v-f3e7a985><!--[-->`);
        ssrRenderList(__props.locales, (locale) => {
          _push(`<li class="-mb-px mr-1" data-v-f3e7a985><a href="javascript:void(0);" class="${ssrRenderClass([activeMainTab.value === locale ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500", "inline-block py-2 px-4 font-semibold border-b-2 cursor-pointer"])}" data-v-f3e7a985>${ssrInterpolate(locale)}</a></li>`);
        });
        _push(`<!--]--></ul><div class="py-3" data-v-f3e7a985><!--[-->`);
        ssrRenderList(__props.locales, (locale) => {
          _push(`<div style="${ssrRenderStyle(activeMainTab.value === locale ? null : { display: "none" })}" data-v-f3e7a985><div class="grid grid-cols-1 sm:grid-cols-3 gap-4" data-v-f3e7a985><div class="col-pan-1 sm:col-span-1 sm:px-0" data-v-f3e7a985>`);
          _push(ssrRenderComponent(_sfc_main$1n, {
            for: "name-" + locale,
            value: _ctx.lang().label.name
          }, null, _parent));
          _push(ssrRenderComponent(_sfc_main$1l, {
            id: "name-" + locale,
            type: "text",
            class: "mt-1 block w-full",
            modelValue: __props.form.name[locale],
            "onUpdate:modelValue": ($event) => __props.form.name[locale] = $event,
            required: "",
            placeholder: _ctx.lang().label.name,
            error: __props.form.errors["name." + locale]
          }, null, _parent));
          _push(ssrRenderComponent(_sfc_main$1m, {
            class: "mt-2",
            message: __props.form.errors["name." + locale]
          }, null, _parent));
          _push(`</div><div class="col-pan-1 sm:col-span-2 sm:px-0" data-v-f3e7a985>`);
          _push(ssrRenderComponent(_sfc_main$1n, {
            for: "description-" + locale,
            value: _ctx.lang().label.description
          }, null, _parent));
          _push(ssrRenderComponent(_sfc_main$1l, {
            id: "description-" + locale,
            type: "text",
            class: "mt-1 block w-full",
            modelValue: __props.form.description[locale],
            "onUpdate:modelValue": ($event) => __props.form.description[locale] = $event,
            placeholder: _ctx.lang().label.description,
            error: __props.form.errors["description." + locale]
          }, null, _parent));
          _push(ssrRenderComponent(_sfc_main$1m, {
            class: "mt-2",
            message: __props.form.errors["description." + locale]
          }, null, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product/Form.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const ProductForm = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-f3e7a985"]]);
const Form$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductForm
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$R = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    categories: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const category_list = Object.keys(props.categories).map((key) => ({
      label: props.categories[key],
      value: key
    }));
    const locales = usePage().props.locales;
    const emit = __emit;
    const form = useForm({
      name: Object.fromEntries(locales.map((locale) => [locale, ""])),
      description: Object.fromEntries(locales.map((locale) => [locale, ""])),
      sku: null,
      price: null,
      barcode: null,
      category_ids: []
    });
    const create = () => {
      form.post(route("admin.product.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().product.add)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(ProductForm, {
              form: unref(form),
              locales: unref(locales),
              category_list: unref(category_list)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().product.add), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(ProductForm, {
                    form: unref(form),
                    locales: unref(locales),
                    category_list: unref(category_list)
                  }, null, 8, ["form", "locales", "category_list"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product/Create.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const Create$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$R
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Q = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    product: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.product.delete", (_a = props.product) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.product) == null ? void 0 : _a.name)}</b></p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.product) == null ? void 0 : _b.name), 1)
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product/Delete.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const Delete$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$Q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$P = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    product: Object,
    categories: Object,
    locales: Array
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const locales = usePage().props.locales;
    const props = __props;
    const category_list = Object.keys(props.categories).map((key) => ({
      label: props.categories[key],
      value: key
    }));
    const emit = __emit;
    const form = useForm({
      name: Object.fromEntries(locales.map((locale) => [locale, ""])),
      description: Object.fromEntries(locales.map((locale) => [locale, ""])),
      price: null,
      sku: null,
      barcode: null,
      category_ids: []
    });
    const normalizedCategoryIds = computed(() => {
      return form.category_ids.map((item) => typeof item === "object" ? item.value : item);
    });
    const update = () => {
      var _a;
      form.category_ids = normalizedCategoryIds.value;
      form.put(route("admin.product.update", (_a = props.product) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: (e2) => {
          form.processing = false;
          console.log(e2);
        },
        onFinish: () => {
          form.processing = false;
        }
      });
    };
    const edit = () => {
      var _a;
      axios.get(route("admin.product.edit", (_a = props.product) == null ? void 0 : _a.id)).then((response) => {
        if (response.data.success === true) {
          form.processing = false;
          const product = response.data.product;
          Object.keys(form).forEach((key) => {
            if (product[key] !== void 0) {
              form[key] = product[key];
            }
          });
          console.log(form.category_ids);
          locales.forEach((locale) => {
            form.name[locale] = product.name[locale];
            form.description[locale] = product.description[locale];
          });
        }
      }).catch((error) => {
        console.log(error);
        form.reset();
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
        edit();
      } else {
        form.reset();
        form.processing = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().product.edit)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(ProductForm, {
              form: unref(form),
              locales: unref(locales),
              isEdit: true,
              category_list: unref(category_list)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().product.edit), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(ProductForm, {
                    form: unref(form),
                    locales: unref(locales),
                    isEdit: true,
                    category_list: unref(category_list)
                  }, null, 8, ["form", "locales", "category_list"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product/Edit.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const Edit$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$P
}, Symbol.toStringTag, { value: "Module" }));
const datetime_format$3 = "yyyy-MM-dd HH:mm";
const _sfc_main$O = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    products: Object,
    categories: Object,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage,
        id: "",
        name: "",
        description: "",
        sku: null,
        price: "",
        barcode: "",
        created_at: "",
        updated_at: ""
      },
      selectedId: [],
      multipleSelect: false,
      createOpen: false,
      editOpen: false,
      deleteOpen: false,
      product: null,
      dataSet: usePage().props.app.perpage
    });
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    Object.keys(props.categories).map((key) => ({
      label: props.categories[key],
      value: key
    }));
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.product.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 1e3)
    );
    const startTime = ref({ hours: 0, minutes: 0 });
    const locale = usePage().props.locale;
    const tz = usePage().props.timezone.name;
    const tz_offset = usePage().props.timezone.offset;
    const timezone = ref({ tz, offset: tz_offset });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4" data-v-ba945cbd${_scopeId}><div class="px-4 sm:px-0" data-v-ba945cbd${_scopeId}><div class="rounded-lg overflow-hidden w-fit" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              style: _ctx.can(["Product Create"]) ? null : { display: "none" },
              class: "rounded-none",
              onClick: ($event) => data.createOpen = true
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              show: data.createOpen,
              onClose: ($event) => data.createOpen = false,
              title: props.title,
              categories: props.categories
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$P, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              product: data.product,
              title: props.title,
              categories: props.categories
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$Q, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              product: data.product,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" data-v-ba945cbd${_scopeId}><div class="flex justify-between p-2" data-v-ba945cbd${_scopeId}><div class="flex space-x-2" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table" data-v-ba945cbd${_scopeId}><table class="w-full" data-v-ba945cbd${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700" data-v-ba945cbd${_scopeId}><tr class="dark:bg-slate-900/50 text-left" data-v-ba945cbd${_scopeId}><th class="px-2 py-4 cursor-pointer" data-v-ba945cbd${_scopeId}><div class="flex justify-between items-center" data-v-ba945cbd${_scopeId}><span data-v-ba945cbd${_scopeId}>${ssrInterpolate(_ctx.lang().label.id)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-ba945cbd${_scopeId}><div class="flex justify-between items-center" data-v-ba945cbd${_scopeId}><span data-v-ba945cbd${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-ba945cbd${_scopeId}><div class="flex justify-between items-center" data-v-ba945cbd${_scopeId}><span data-v-ba945cbd${_scopeId}>${ssrInterpolate(_ctx.lang().product.sku)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-ba945cbd${_scopeId}><div class="flex justify-between items-right" data-v-ba945cbd${_scopeId}><span data-v-ba945cbd${_scopeId}>${ssrInterpolate(_ctx.lang().label.price)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-ba945cbd${_scopeId}><div class="flex justify-between items-right" data-v-ba945cbd${_scopeId}><span data-v-ba945cbd${_scopeId}>${ssrInterpolate(_ctx.lang().product.barcode)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-ba945cbd${_scopeId}><div class="flex justify-between items-center" data-v-ba945cbd${_scopeId}><span data-v-ba945cbd${_scopeId}>${ssrInterpolate(_ctx.lang().label.created_at)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-ba945cbd${_scopeId}><div class="flex justify-between items-center" data-v-ba945cbd${_scopeId}><span data-v-ba945cbd${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated_at)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only" data-v-ba945cbd${_scopeId}>Action</th></tr><tr data-v-ba945cbd${_scopeId}><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["id"],
              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
              modelModifiers: { lazy: true },
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["name"],
              "onUpdate:modelValue": ($event) => data.params["name"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["sku"],
              "onUpdate:modelValue": ($event) => data.params["sku"] = $event,
              modelModifiers: { lazy: true },
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["price"],
              "onUpdate:modelValue": ($event) => data.params["price"] = $event,
              modelModifiers: { lazy: true },
              type: "number",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["barcode"],
              "onUpdate:modelValue": ($event) => data.params["barcode"] = $event,
              modelModifiers: { lazy: true },
              type: "number",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(VueDatePicker), {
              modelValue: data.params.created_at,
              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
              range: "",
              "enable-time-picker": true,
              "is-24": true,
              "start-time": startTime.value,
              format: datetime_format$3,
              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
              teleport: true,
              timezone: timezone.value,
              style: { "line-height": "14px" }
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.updated_at,
              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-ba945cbd${_scopeId}></th></tr></thead><tbody data-v-ba945cbd${_scopeId}><!--[-->`);
            ssrRenderList(__props.products.data, (product, index) => {
              _push2(`<tr class="${ssrRenderClass([{ "bg-red-500/30 dark:bg-red-900/20 hover:bg-red-500/30 dark:hover:bg-red-900/20": product.deleted_at }, "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"])}" data-v-ba945cbd${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left" data-v-ba945cbd${_scopeId}>${ssrInterpolate(product.id)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left" data-v-ba945cbd${_scopeId}>${ssrInterpolate(product.name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center" data-v-ba945cbd${_scopeId}>${ssrInterpolate(product.sku)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center" data-v-ba945cbd${_scopeId}>${ssrInterpolate(product.price)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center" data-v-ba945cbd${_scopeId}>${ssrInterpolate(product.barcode)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3" data-v-ba945cbd${_scopeId}>${ssrInterpolate(product.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3" data-v-ba945cbd${_scopeId}>${ssrInterpolate(product.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3" data-v-ba945cbd${_scopeId}><div class="flex justify-center items-center" data-v-ba945cbd${_scopeId}><div class="rounded-md overflow-hidden" data-v-ba945cbd${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                href: _ctx.route("admin.product.show", product == null ? void 0 : product.id),
                tabindex: "-1"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(EyeIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
                style: _ctx.can(["Product Update"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.editOpen = true, data.product = product),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["Product Delete"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.deleteOpen = true, data.product = product),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" data-v-ba945cbd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$X, {
              links: props.products,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    withDirectives(createVNode(_sfc_main$1g, {
                      class: "rounded-none",
                      onClick: ($event) => data.createOpen = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, _ctx.can(["Product Create"])]
                    ]),
                    createVNode(_sfc_main$R, {
                      show: data.createOpen,
                      onClose: ($event) => data.createOpen = false,
                      title: props.title,
                      categories: props.categories
                    }, null, 8, ["show", "onClose", "title", "categories"]),
                    createVNode(_sfc_main$P, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      product: data.product,
                      title: props.title,
                      categories: props.categories
                    }, null, 8, ["show", "onClose", "product", "title", "categories"]),
                    createVNode(_sfc_main$Q, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      product: data.product,
                      title: props.title
                    }, null, 8, ["show", "onClose", "product", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("id")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.id), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("sku")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().product.sku), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("price")
                          }, [
                            createVNode("div", { class: "flex justify-between items-right" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.price), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("barcode")
                          }, [
                            createVNode("div", { class: "flex justify-between items-right" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().product.barcode), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created_at), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated_at), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ]),
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["id"],
                              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
                              modelModifiers: { lazy: true },
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["name"],
                              "onUpdate:modelValue": ($event) => data.params["name"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["sku"],
                              "onUpdate:modelValue": ($event) => data.params["sku"] = $event,
                              modelModifiers: { lazy: true },
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["price"],
                              "onUpdate:modelValue": ($event) => data.params["price"] = $event,
                              modelModifiers: { lazy: true },
                              type: "number",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["barcode"],
                              "onUpdate:modelValue": ($event) => data.params["barcode"] = $event,
                              modelModifiers: { lazy: true },
                              type: "number",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(unref(VueDatePicker), {
                              modelValue: data.params.created_at,
                              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
                              range: "",
                              "enable-time-picker": true,
                              "is-24": true,
                              "start-time": startTime.value,
                              format: datetime_format$3,
                              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
                              teleport: true,
                              timezone: timezone.value,
                              style: { "line-height": "14px" }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "start-time", "locale", "timezone"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params.updated_at,
                              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" })
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: ["border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20", { "bg-red-500/30 dark:bg-red-900/20 hover:bg-red-500/30 dark:hover:bg-red-900/20": product.deleted_at }]
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(product.id), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(product.name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(product.sku), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(product.price), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(product.barcode), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(product.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(product.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  createVNode(unref(Link), {
                                    class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                                    href: _ctx.route("admin.product.show", product == null ? void 0 : product.id),
                                    tabindex: "-1"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                    type: "button",
                                    onClick: ($event) => (data.editOpen = true, data.product = product),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Product Update"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.deleteOpen = true, data.product = product),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Product Delete"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.delete]
                                  ])
                                ])
                              ])
                            ])
                          ], 2);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$X, {
                      links: props.products,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product/Index.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const Index$7 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-ba945cbd"]]);
const Index$8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$N = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    title: String,
    items: Object,
    categories: Object,
    breadcrumbs: Object
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {},
      product: null,
      editOpen: false
    });
    const { product } = usePage().props;
    watch(() => data.editOpen, (newVal) => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$P, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              product: data.product,
              title: props.title,
              categories: props.categories
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="col-span-1 md:col-span-2 px-4 sm:px-0"${_scopeId}><div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><div class="grid grid-cols-6 md:grid-cols-6 gap-4"${_scopeId}><div class="col-span-5"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200"${_scopeId}>${ssrInterpolate(unref(product).name)}</h3></div><div class="col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
              style: _ctx.can(["Product Update"]) ? null : { display: "none" },
              type: "button",
              onClick: ($event) => (data.editOpen = true, data.product = unref(product)),
              class: "px-2 py-1.5 rounded float-right"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().product.edit)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(PencilIcon$1), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="border-t border-gray-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><div class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}> ID </dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).id)}</dd></div><div class="bg-gray-100 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).name)}</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.description)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).description)}</dd></div><div class="bg-gray-100 dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().product.sku)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).sku)}</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.price)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).price)}</dd></div><div class="bg-gray-100 dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().product.barcode)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).barcode)}</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.created_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).created_at)}</dd></div><div class="bg-gray-100 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(product).updated_at)}</dd></div></div></div></div></div></div></div><div class="col-span-1 md:col-span-1 px-4 sm:px-0"${_scopeId}><div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200"${_scopeId}>${ssrInterpolate(_ctx.lang().label.categories)}</h3></div><div class="border-t border-gray-200 dark:border-slate-700"${_scopeId}><ul class="divide-y divide-gray-200 dark:divide-slate-700"${_scopeId}><!--[-->`);
            ssrRenderList(unref(product).categories, (category) => {
              _push2(`<li class="px-4 py-4 sm:px-6"${_scopeId}><div class="text-sm font-medium text-gray-700 dark:text-slate-200"${_scopeId}>${ssrInterpolate(category.label)}</div></li>`);
            });
            _push2(`<!--]--></ul></div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    createVNode(_sfc_main$P, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      product: data.product,
                      title: props.title,
                      categories: props.categories
                    }, null, 8, ["show", "onClose", "product", "title", "categories"])
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "col-span-1 md:col-span-2 px-4 sm:px-0" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "px-4 sm:px-0" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                          createVNode("div", { class: "grid grid-cols-6 md:grid-cols-6 gap-4" }, [
                            createVNode("div", { class: "col-span-5" }, [
                              createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-slate-200" }, toDisplayString(unref(product).name), 1)
                            ]),
                            createVNode("div", { class: "col-span-1" }, [
                              withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                type: "button",
                                onClick: ($event) => (data.editOpen = true, data.product = unref(product)),
                                class: "px-2 py-1.5 rounded float-right"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [vShow, _ctx.can(["Product Update"])],
                                [_directive_tooltip, _ctx.lang().product.edit]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 dark:border-slate-700" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, " ID "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).id), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-100 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).name), 1)
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.description), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).description), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-100 dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().product.sku), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).sku), 1)
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.price), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).price), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-100 dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().product.barcode), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).barcode), 1)
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.created_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).created_at), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-100 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.updated_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(product).updated_at), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-span-1 md:col-span-1 px-4 sm:px-0" }, [
                  createVNode("div", { class: "bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-slate-200" }, toDisplayString(_ctx.lang().label.categories), 1)
                    ]),
                    createVNode("div", { class: "border-t border-gray-200 dark:border-slate-700" }, [
                      createVNode("ul", { class: "divide-y divide-gray-200 dark:divide-slate-700" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(product).categories, (category) => {
                          return openBlock(), createBlock("li", {
                            key: category.id,
                            class: "px-4 py-4 sm:px-6"
                          }, [
                            createVNode("div", { class: "text-sm font-medium text-gray-700 dark:text-slate-200" }, toDisplayString(category.label), 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product/Show.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const Show$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$N
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$M = {
  __name: "WarehouseForm",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    form: Object,
    status_list: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid grid-cols-4 gap-4"><div class="col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "name",
        value: _ctx.lang().label.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "name",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: __props.form.name,
        "onUpdate:modelValue": ($event) => __props.form.name = $event,
        required: "",
        placeholder: _ctx.lang().placeholder.name,
        error: __props.form.errors.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.name
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-4 gap-4 mt-3"><div class="col-span-3">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "location",
        value: _ctx.lang().label.address
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "location",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: __props.form.location,
        "onUpdate:modelValue": ($event) => __props.form.location = $event,
        required: "",
        error: __props.form.errors.location
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.location
      }, null, _parent));
      _push(`</div><div class="">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "status",
        value: _ctx.lang().label.status
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$_, {
        id: "role",
        class: "mt-1 block w-full",
        modelValue: __props.form.status,
        "onUpdate:modelValue": ($event) => __props.form.status = $event,
        required: "",
        dataSet: __props.status_list
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.status
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Warehouse/WarehouseForm.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const WarehouseForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$M
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$L = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const locales = usePage().props.locales;
    const emit = __emit;
    const form = useForm({
      name: "",
      location: "",
      status: ""
    });
    const create = () => {
      form.post(route("admin.warehouse.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.add)} ${ssrInterpolate(_ctx.lang().label.warehouse)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$M, {
              form: unref(form),
              locales: unref(locales)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.add) + " " + toDisplayString(_ctx.lang().label.warehouse), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$M, {
                    form: unref(form),
                    locales: unref(locales)
                  }, null, 8, ["form", "locales"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Transaction/Create.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const Create$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$L
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$K = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    warehouse: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.warehouse.delete", (_a = props.warehouse) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.warehouse) == null ? void 0 : _a.name)}</b></p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.warehouse) == null ? void 0 : _b.name), 1)
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Transaction/Delete.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const Delete$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$K
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$J = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    form: Object,
    status_list: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid grid-cols-2 gap-4"><div class="col-span-1"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "status",
        value: _ctx.lang().label.status
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$_, {
        id: "role",
        class: "mt-1 block w-full",
        modelValue: __props.form.status,
        "onUpdate:modelValue": ($event) => __props.form.status = $event,
        required: "",
        dataSet: __props.status_list
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.status
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Transaction/Form.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$J
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$I = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    transaction: Object,
    status_list: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const status_list = Object.keys(props.status_list).map((key) => ({
      label: props.status_list[key],
      value: key
    }));
    const emit = __emit;
    const form = useForm({
      status: ""
    });
    const update = () => {
      var _a;
      form.put(route("admin.transaction.update", (_a = props.transaction) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: (e2) => {
          form.processing = false;
          console.log(e2);
        },
        onFinish: () => {
          form.processing = false;
        }
      });
    };
    const edit = () => {
      var _a;
      axios.get(route("admin.transaction.edit", (_a = props.transaction) == null ? void 0 : _a.id)).then((response) => {
        if (response.data.success === true) {
          form.processing = false;
          const transaction = response.data.transaction;
          Object.keys(form).forEach((key) => {
            if (transaction[key] !== void 0) {
              form[key] = transaction[key];
            }
          });
        }
      }).catch((error) => {
        console.log(error);
        form.reset();
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
        edit();
      } else {
        form.reset();
        form.processing = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.edit)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$J, {
              form: unref(form),
              status_list: unref(status_list)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.edit) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$J, {
                    form: unref(form),
                    status_list: unref(status_list)
                  }, null, 8, ["form", "status_list"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Transaction/Edit.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const Edit$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$I
}, Symbol.toStringTag, { value: "Module" }));
const datetime_format$2 = "yyyy-MM-dd HH:mm";
const _sfc_main$H = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    transactions: Object,
    warehouses: Object,
    status_list: Object,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage,
        id: "",
        warehouse_id: "",
        executor_id: "",
        product_name: "",
        type: "",
        quantity: "",
        status: "",
        is_internal_transfer: "",
        source: "",
        destination: "",
        created_at: ""
      },
      selectedId: [],
      multipleSelect: false,
      editOpen: false,
      deleteOpen: false,
      transaction: null,
      dataSet: usePage().props.app.perpage
    });
    const warehouse_list = Object.keys(props.warehouses).map((key) => ({
      label: props.warehouses[key],
      value: key
    }));
    const status_dropdown = Object.keys(props.status_list).map((key) => ({
      label: props.status_list[key],
      value: key
    }));
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.transaction.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 1e3)
    );
    const startTime = ref({ hours: 0, minutes: 0 });
    const locale = usePage().props.locale;
    const timezone = ref({ tz: "Asia/Tashkent", offset: 5 });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$I, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              transaction: data.transaction,
              title: props.title,
              status_list: props.status_list
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$K, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              transaction: data.transaction,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="flex justify-between p-2"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table"${_scopeId}><table class="w-full"${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700"${_scopeId}><tr class="dark:bg-slate-900/50 text-left"${_scopeId}><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.id)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.warehouse_id)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.product_name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.type)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.quantity)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.status)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().transaction.is_internal_transfer)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().transaction.source)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().transaction.destination)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.created)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only"${_scopeId}>Action</th></tr><tr${_scopeId}><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["id"],
              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
              modelModifiers: { lazy: true },
              type: "number",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1j, {
              id: "warehouse_id",
              class: "block w-full",
              style: { "line-height": "14px" },
              modelValue: data.params["warehouse_id"],
              "onUpdate:modelValue": ($event) => data.params["warehouse_id"] = $event,
              dataSet: unref(warehouse_list),
              prompt: _ctx.lang().label.all
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["product_name"],
              "onUpdate:modelValue": ($event) => data.params["product_name"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1j, {
              id: "type",
              class: "block w-full",
              style: { "line-height": "14px" },
              modelValue: data.params["type"],
              "onUpdate:modelValue": ($event) => data.params["type"] = $event,
              dataSet: [
                // { value: -1, label: lang().label.all },
                { value: `in`, label: _ctx.lang().transaction.type_income },
                { value: `out`, label: _ctx.lang().transaction.type_outcome }
              ],
              prompt: _ctx.lang().label.all
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["quantity"],
              "onUpdate:modelValue": ($event) => data.params["quantity"] = $event,
              type: "number",
              class: "block w-full rounded-lg size-8",
              placeholder: _ctx.lang().label.quantity
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1j, {
              id: "status",
              class: "block w-full",
              style: { "line-height": "14px" },
              modelValue: data.params["status"],
              "onUpdate:modelValue": ($event) => data.params["status"] = $event,
              dataSet: unref(status_dropdown),
              prompt: _ctx.lang().label.all
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1j, {
              id: "is_internal_transfer",
              class: "block w-full",
              style: { "line-height": "14px" },
              modelValue: data.params["is_internal_transfer"],
              "onUpdate:modelValue": ($event) => data.params["is_internal_transfer"] = $event,
              dataSet: [
                // { value: -1, label: lang().label.all },
                { value: 1, label: _ctx.lang().button.yes },
                { value: 0, label: _ctx.lang().button.no }
              ],
              prompt: _ctx.lang().label.all
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["source"],
              "onUpdate:modelValue": ($event) => data.params["source"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["destination"],
              "onUpdate:modelValue": ($event) => data.params["destination"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(VueDatePicker), {
              modelValue: data.params.created_at,
              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
              range: "",
              "enable-time-picker": true,
              "is-24": true,
              "start-time": startTime.value,
              format: datetime_format$2,
              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
              teleport: true,
              timezone: timezone.value,
              "input-class-name": [
                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
              ]
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.updated_at,
              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.transactions.data, (transaction, index) => {
              _push2(`<tr class="${ssrRenderClass([{ "bg-slate-200/30 dark:bg-slate-900/20": transaction.deleted_at }, "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"])}"${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>${ssrInterpolate(transaction.id)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"${_scopeId}>${ssrInterpolate(props.warehouses[transaction.warehouse_id])}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"${_scopeId}>${ssrInterpolate(transaction.product_name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>`);
              if (transaction.type === "in") {
                _push2(`<span class="text-green-500"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(ArrowDownTrayIcon), { class: "w-7 h-7 mx-auto" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<span class="text-rose-500"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(ArrowUpTrayIcon), { class: "w-7 h-7 mx-auto" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              }
              _push2(`</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>${ssrInterpolate(transaction.quantity)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left font-bold"${_scopeId}>`);
              if (transaction.status === "completed") {
                _push2(`<span class="text-green-500"${_scopeId}>${ssrInterpolate(_ctx.lang().transaction.status_completed)}</span>`);
              } else if (transaction.status === "pending") {
                _push2(`<span class="text-yellow-500"${_scopeId}>${ssrInterpolate(_ctx.lang().transaction.status_pending)}</span>`);
              } else if (transaction.status === "cancelled") {
                _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().transaction.status_cancelled)}</span>`);
              } else {
                _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_unknown)}</span>`);
              }
              _push2(`</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>${ssrInterpolate(transaction.is_internal_transfer)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(transaction.source)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(transaction.destination)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(transaction.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(transaction.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}><div class="flex justify-center items-center"${_scopeId}><div class="rounded-md overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                href: _ctx.route("admin.transaction.show", transaction == null ? void 0 : transaction.id),
                tabindex: "-1"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(EyeIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
                style: _ctx.can(["Transaction Update"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.editOpen = true, data.transaction = transaction),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["Transaction Delete"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.deleteOpen = true, data.transaction = transaction),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$X, {
              links: props.transactions,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    createVNode(_sfc_main$I, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      transaction: data.transaction,
                      title: props.title,
                      status_list: props.status_list
                    }, null, 8, ["show", "onClose", "transaction", "title", "status_list"]),
                    createVNode(_sfc_main$K, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      transaction: data.transaction,
                      title: props.title
                    }, null, 8, ["show", "onClose", "transaction", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("id")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.id), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("warehouse_id")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.warehouse_id), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("product_name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.product_name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("type")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.type), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("quantity")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.quantity), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("status")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.status), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("is_internal_transfer")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().transaction.is_internal_transfer), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("source")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().transaction.source), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("destination")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().transaction.destination), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ]),
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["id"],
                              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
                              modelModifiers: { lazy: true },
                              type: "number",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1j, {
                              id: "warehouse_id",
                              class: "block w-full",
                              style: { "line-height": "14px" },
                              modelValue: data.params["warehouse_id"],
                              "onUpdate:modelValue": ($event) => data.params["warehouse_id"] = $event,
                              dataSet: unref(warehouse_list),
                              prompt: _ctx.lang().label.all
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "prompt"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["product_name"],
                              "onUpdate:modelValue": ($event) => data.params["product_name"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1j, {
                              id: "type",
                              class: "block w-full",
                              style: { "line-height": "14px" },
                              modelValue: data.params["type"],
                              "onUpdate:modelValue": ($event) => data.params["type"] = $event,
                              dataSet: [
                                // { value: -1, label: lang().label.all },
                                { value: `in`, label: _ctx.lang().transaction.type_income },
                                { value: `out`, label: _ctx.lang().transaction.type_outcome }
                              ],
                              prompt: _ctx.lang().label.all
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "prompt"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["quantity"],
                              "onUpdate:modelValue": ($event) => data.params["quantity"] = $event,
                              type: "number",
                              class: "block w-full rounded-lg size-8",
                              placeholder: _ctx.lang().label.quantity
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1j, {
                              id: "status",
                              class: "block w-full",
                              style: { "line-height": "14px" },
                              modelValue: data.params["status"],
                              "onUpdate:modelValue": ($event) => data.params["status"] = $event,
                              dataSet: unref(status_dropdown),
                              prompt: _ctx.lang().label.all
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "prompt"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1j, {
                              id: "is_internal_transfer",
                              class: "block w-full",
                              style: { "line-height": "14px" },
                              modelValue: data.params["is_internal_transfer"],
                              "onUpdate:modelValue": ($event) => data.params["is_internal_transfer"] = $event,
                              dataSet: [
                                // { value: -1, label: lang().label.all },
                                { value: 1, label: _ctx.lang().button.yes },
                                { value: 0, label: _ctx.lang().button.no }
                              ],
                              prompt: _ctx.lang().label.all
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "prompt"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["source"],
                              "onUpdate:modelValue": ($event) => data.params["source"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["destination"],
                              "onUpdate:modelValue": ($event) => data.params["destination"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(unref(VueDatePicker), {
                              modelValue: data.params.created_at,
                              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
                              range: "",
                              "enable-time-picker": true,
                              "is-24": true,
                              "start-time": startTime.value,
                              format: datetime_format$2,
                              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
                              teleport: true,
                              timezone: timezone.value,
                              "input-class-name": [
                                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
                              ]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "start-time", "locale", "timezone"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params.updated_at,
                              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" })
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.data, (transaction, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: ["border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20", { "bg-slate-200/30 dark:bg-slate-900/20": transaction.deleted_at }]
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(transaction.id), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(props.warehouses[transaction.warehouse_id]), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(transaction.product_name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, [
                              transaction.type === "in" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-green-500"
                              }, [
                                createVNode(unref(ArrowDownTrayIcon), { class: "w-7 h-7 mx-auto" })
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-rose-500"
                              }, [
                                createVNode(unref(ArrowUpTrayIcon), { class: "w-7 h-7 mx-auto" })
                              ]))
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(transaction.quantity), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left font-bold" }, [
                              transaction.status === "completed" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-green-500"
                              }, toDisplayString(_ctx.lang().transaction.status_completed), 1)) : transaction.status === "pending" ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-yellow-500"
                              }, toDisplayString(_ctx.lang().transaction.status_pending), 1)) : transaction.status === "cancelled" ? (openBlock(), createBlock("span", {
                                key: 2,
                                class: "text-rose-500"
                              }, toDisplayString(_ctx.lang().transaction.status_cancelled), 1)) : (openBlock(), createBlock("span", {
                                key: 3,
                                class: "text-rose-500"
                              }, toDisplayString(_ctx.lang().warehouse.status_unknown), 1))
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(transaction.is_internal_transfer), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(transaction.source), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(transaction.destination), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(transaction.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(transaction.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  createVNode(unref(Link), {
                                    class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                                    href: _ctx.route("admin.transaction.show", transaction == null ? void 0 : transaction.id),
                                    tabindex: "-1"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                    type: "button",
                                    onClick: ($event) => (data.editOpen = true, data.transaction = transaction),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Transaction Update"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.deleteOpen = true, data.transaction = transaction),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Transaction Delete"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.delete]
                                  ])
                                ])
                              ])
                            ])
                          ], 2);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$X, {
                      links: props.transactions,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Transaction/Index.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const Index$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$H
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$G = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    warehouse: Object,
    status_list: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const status_list = Object.keys(props.status_list).map((key) => ({
      label: props.status_list[key],
      value: key
    }));
    console.log(status_list);
    const emit = __emit;
    const form = useForm({
      name: "",
      location: "",
      status: ""
    });
    const update = () => {
      var _a;
      form.put(route("admin.warehouse.update", (_a = props.warehouse) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: (e2) => {
          form.processing = false;
          console.log(e2);
        },
        onFinish: () => {
          form.processing = false;
        }
      });
    };
    const edit = () => {
      var _a;
      axios.get(route("admin.warehouse.edit", (_a = props.warehouse) == null ? void 0 : _a.id)).then((response) => {
        if (response.data.success === true) {
          form.processing = false;
          const warehouse = response.data.warehouse;
          Object.keys(form).forEach((key) => {
            if (warehouse[key] !== void 0) {
              form[key] = warehouse[key];
            }
          });
        }
      }).catch((error) => {
        console.log(error);
        form.reset();
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
        edit();
      } else {
        form.reset();
        form.processing = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.edit)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$M, {
              form: unref(form),
              status_list: unref(status_list)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.edit) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$M, {
                    form: unref(form),
                    status_list: unref(status_list)
                  }, null, 8, ["form", "status_list"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Warehouse/Edit.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const Edit$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$G
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$F = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    title: String,
    items: Object,
    breadcrumbs: Object,
    status_list: Object
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {},
      warehouse: null,
      editOpen: false
    });
    const { warehouse } = usePage().props;
    watch(() => data.editOpen, (newVal) => {
      if (!newVal) {
        location.reload();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$G, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              warehouse: data.warehouse,
              title: props.title,
              status_list: props.status_list
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="col-span-2 px-4 sm:px-0"${_scopeId}><div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><div class="grid grid-cols-6 md:grid-cols-6 gap-4"${_scopeId}><div class="col-span-5"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200"${_scopeId}>${ssrInterpolate(unref(warehouse).name)}</h3></div><div class="col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
              style: _ctx.can(["Warehouse Update"]) ? null : { display: "none" },
              type: "button",
              onClick: ($event) => (data.editOpen = true, data.warehouse = unref(warehouse)),
              class: "px-2 py-1.5 rounded float-right"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().label.edit)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(PencilIcon$1), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="border-t border-gray-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><div class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}> ID </dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).id)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.address)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).location)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.status)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>`);
            if (unref(warehouse).status === "active") {
              _push2(`<span class="text-green-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_active)}</span>`);
            } else if (unref(warehouse).status === "inactive") {
              _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_inactive)}</span>`);
            } else {
              _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_unknown)}</span>`);
            }
            _push2(`</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.created_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).created_at)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).updated_at)}</dd></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    createVNode(_sfc_main$G, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      warehouse: data.warehouse,
                      title: props.title,
                      status_list: props.status_list
                    }, null, 8, ["show", "onClose", "warehouse", "title", "status_list"])
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "col-span-2 px-4 sm:px-0" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "px-4 sm:px-0" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                          createVNode("div", { class: "grid grid-cols-6 md:grid-cols-6 gap-4" }, [
                            createVNode("div", { class: "col-span-5" }, [
                              createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-slate-200" }, toDisplayString(unref(warehouse).name), 1)
                            ]),
                            createVNode("div", { class: "col-span-1" }, [
                              withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                type: "button",
                                onClick: ($event) => (data.editOpen = true, data.warehouse = unref(warehouse)),
                                class: "px-2 py-1.5 rounded float-right"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [vShow, _ctx.can(["Warehouse Update"])],
                                [_directive_tooltip, _ctx.lang().label.edit]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 dark:border-slate-700" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, " ID "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).id), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.address), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).location), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.status), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, [
                                unref(warehouse).status === "active" ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-green-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_active), 1)) : unref(warehouse).status === "inactive" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-rose-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_inactive), 1)) : (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "text-rose-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_unknown), 1))
                              ])
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.created_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).created_at), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.updated_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).updated_at), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Transaction/Show.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const Show$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$F
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$E = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const locales = usePage().props.locales;
    const emit = __emit;
    const form = useForm({
      name: "",
      location: "",
      status: ""
    });
    const create = () => {
      form.post(route("admin.warehouse.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.add)} ${ssrInterpolate(_ctx.lang().label.warehouse)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$M, {
              form: unref(form),
              locales: unref(locales)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.add) + " " + toDisplayString(_ctx.lang().label.warehouse), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$M, {
                    form: unref(form),
                    locales: unref(locales)
                  }, null, 8, ["form", "locales"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Warehouse/Create.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const Create$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$E
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$D = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    warehouse: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.warehouse.delete", (_a = props.warehouse) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.warehouse) == null ? void 0 : _a.name)}</b></p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.warehouse) == null ? void 0 : _b.name), 1)
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Warehouse/Delete.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const Delete$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$D
}, Symbol.toStringTag, { value: "Module" }));
const datetime_format$1 = "yyyy-MM-dd HH:mm";
const _sfc_main$C = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    warehouses: Object,
    status_list: Object,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage,
        id: "",
        name: "",
        location: "",
        status: "",
        created_at: ""
      },
      selectedId: [],
      multipleSelect: false,
      createOpen: false,
      editOpen: false,
      deleteOpen: false,
      warehouse: null,
      dataSet: usePage().props.app.perpage
    });
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.warehouse.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 1e3)
    );
    const startTime = ref({ hours: 0, minutes: 0 });
    const locale = usePage().props.locale;
    const timezone = ref({ tz: "Asia/Tashkent", offset: 5 });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4" data-v-deafb0cf${_scopeId}><div class="px-4 sm:px-0" data-v-deafb0cf${_scopeId}><div class="rounded-lg overflow-hidden w-fit" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              style: _ctx.can(["Warehouse Create"]) ? null : { display: "none" },
              class: "rounded-none",
              onClick: ($event) => data.createOpen = true
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$E, {
              show: data.createOpen,
              onClose: ($event) => data.createOpen = false,
              title: props.title,
              status_list: props.status_list
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$G, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              warehouse: data.warehouse,
              title: props.title,
              status_list: props.status_list
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$D, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              warehouse: data.warehouse,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" data-v-deafb0cf${_scopeId}><div class="flex justify-between p-2" data-v-deafb0cf${_scopeId}><div class="flex space-x-2" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table" data-v-deafb0cf${_scopeId}><table class="w-full" data-v-deafb0cf${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700" data-v-deafb0cf${_scopeId}><tr class="dark:bg-slate-900/50 text-left" data-v-deafb0cf${_scopeId}><th class="px-2 py-4 cursor-pointer" data-v-deafb0cf${_scopeId}><div class="flex justify-between items-center" data-v-deafb0cf${_scopeId}><span data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().label.id)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-deafb0cf${_scopeId}><div class="flex justify-between items-center" data-v-deafb0cf${_scopeId}><span data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-deafb0cf${_scopeId}><div class="flex justify-between items-center" data-v-deafb0cf${_scopeId}><span data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().label.address)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-deafb0cf${_scopeId}><div class="flex justify-between items-center" data-v-deafb0cf${_scopeId}><span data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().label.status)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-deafb0cf${_scopeId}><div class="flex justify-between items-center" data-v-deafb0cf${_scopeId}><span data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().label.created)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer" data-v-deafb0cf${_scopeId}><div class="flex justify-between items-center" data-v-deafb0cf${_scopeId}><span data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only" data-v-deafb0cf${_scopeId}>Action</th></tr><tr data-v-deafb0cf${_scopeId}><th class="px-2 pb-3" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["id"],
              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
              modelModifiers: { lazy: true },
              type: "number",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["name"],
              "onUpdate:modelValue": ($event) => data.params["name"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["location"],
              "onUpdate:modelValue": ($event) => data.params["location"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8",
              placeholder: _ctx.lang().label.address
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              class: "block w-24 rounded-lg size-8 font-light py-0",
              modelValue: data.params["status"],
              "onUpdate:modelValue": ($event) => data.params["status"] = $event,
              dataSet: [
                { value: -1, label: _ctx.lang().label.all },
                { value: `active`, label: _ctx.lang().warehouse.status_active },
                { value: `inactive`, label: _ctx.lang().warehouse.status_inactive }
              ],
              selected: data.params["status"] === "" ? -1 : data.params["status"]
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(unref(VueDatePicker), {
              modelValue: data.params.created_at,
              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
              range: "",
              "enable-time-picker": true,
              "is-24": true,
              "start-time": startTime.value,
              format: datetime_format$1,
              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
              teleport: true,
              timezone: timezone.value,
              "input-class-name": [
                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
              ]
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.updated_at,
              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3" data-v-deafb0cf${_scopeId}></th></tr></thead><tbody data-v-deafb0cf${_scopeId}><!--[-->`);
            ssrRenderList(__props.warehouses.data, (warehouse, index) => {
              _push2(`<tr class="${ssrRenderClass([{ "bg-slate-200/30 dark:bg-slate-900/20": warehouse.deleted_at }, "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"])}" data-v-deafb0cf${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center" data-v-deafb0cf${_scopeId}>${ssrInterpolate(warehouse.id)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left" data-v-deafb0cf${_scopeId}>${ssrInterpolate(warehouse.name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left" data-v-deafb0cf${_scopeId}>${ssrInterpolate(warehouse.location)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left" data-v-deafb0cf${_scopeId}>`);
              if (warehouse.status === "active") {
                _push2(`<span class="text-green-500" data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_active)}</span>`);
              } else if (warehouse.status === "inactive") {
                _push2(`<span class="text-rose-500" data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_inactive)}</span>`);
              } else {
                _push2(`<span class="text-rose-500" data-v-deafb0cf${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_unknown)}</span>`);
              }
              _push2(`</td><td class="whitespace-nowrap py-4 px-2 sm:py-3" data-v-deafb0cf${_scopeId}>${ssrInterpolate(warehouse.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3" data-v-deafb0cf${_scopeId}>${ssrInterpolate(warehouse.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3" data-v-deafb0cf${_scopeId}><div class="flex justify-center items-center" data-v-deafb0cf${_scopeId}><div class="rounded-md overflow-hidden" data-v-deafb0cf${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                href: _ctx.route("admin.warehouse.show", warehouse == null ? void 0 : warehouse.id),
                tabindex: "-1"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(EyeIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
                style: _ctx.can(["Warehouse Update"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.editOpen = true, data.warehouse = warehouse),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["Warehouse Delete"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.deleteOpen = true, data.warehouse = warehouse),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" data-v-deafb0cf${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$X, {
              links: props.warehouses,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    withDirectives(createVNode(_sfc_main$1g, {
                      class: "rounded-none",
                      onClick: ($event) => data.createOpen = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, _ctx.can(["Warehouse Create"])]
                    ]),
                    createVNode(_sfc_main$E, {
                      show: data.createOpen,
                      onClose: ($event) => data.createOpen = false,
                      title: props.title,
                      status_list: props.status_list
                    }, null, 8, ["show", "onClose", "title", "status_list"]),
                    createVNode(_sfc_main$G, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      warehouse: data.warehouse,
                      title: props.title,
                      status_list: props.status_list
                    }, null, 8, ["show", "onClose", "warehouse", "title", "status_list"]),
                    createVNode(_sfc_main$D, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      warehouse: data.warehouse,
                      title: props.title
                    }, null, 8, ["show", "onClose", "warehouse", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("id")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.id), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("location")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.address), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("status")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.status), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ]),
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["id"],
                              "onUpdate:modelValue": ($event) => data.params["id"] = $event,
                              modelModifiers: { lazy: true },
                              type: "number",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["name"],
                              "onUpdate:modelValue": ($event) => data.params["name"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["location"],
                              "onUpdate:modelValue": ($event) => data.params["location"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8",
                              placeholder: _ctx.lang().label.address
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$_, {
                              class: "block w-24 rounded-lg size-8 font-light py-0",
                              modelValue: data.params["status"],
                              "onUpdate:modelValue": ($event) => data.params["status"] = $event,
                              dataSet: [
                                { value: -1, label: _ctx.lang().label.all },
                                { value: `active`, label: _ctx.lang().warehouse.status_active },
                                { value: `inactive`, label: _ctx.lang().warehouse.status_inactive }
                              ],
                              selected: data.params["status"] === "" ? -1 : data.params["status"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "selected"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(unref(VueDatePicker), {
                              modelValue: data.params.created_at,
                              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
                              range: "",
                              "enable-time-picker": true,
                              "is-24": true,
                              "start-time": startTime.value,
                              format: datetime_format$1,
                              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
                              teleport: true,
                              timezone: timezone.value,
                              "input-class-name": [
                                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
                              ]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "start-time", "locale", "timezone"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params.updated_at,
                              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" })
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.warehouses.data, (warehouse, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: ["border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20", { "bg-slate-200/30 dark:bg-slate-900/20": warehouse.deleted_at }]
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(warehouse.id), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(warehouse.name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(warehouse.location), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, [
                              warehouse.status === "active" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-green-500"
                              }, toDisplayString(_ctx.lang().warehouse.status_active), 1)) : warehouse.status === "inactive" ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-rose-500"
                              }, toDisplayString(_ctx.lang().warehouse.status_inactive), 1)) : (openBlock(), createBlock("span", {
                                key: 2,
                                class: "text-rose-500"
                              }, toDisplayString(_ctx.lang().warehouse.status_unknown), 1))
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(warehouse.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(warehouse.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  createVNode(unref(Link), {
                                    class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                                    href: _ctx.route("admin.warehouse.show", warehouse == null ? void 0 : warehouse.id),
                                    tabindex: "-1"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EyeIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                    type: "button",
                                    onClick: ($event) => (data.editOpen = true, data.warehouse = warehouse),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Warehouse Update"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.deleteOpen = true, data.warehouse = warehouse),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["Warehouse Delete"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.delete]
                                  ])
                                ])
                              ])
                            ])
                          ], 2);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$X, {
                      links: props.warehouses,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Warehouse/Index.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const Index$4 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-deafb0cf"]]);
const Index$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    title: String,
    items: Object,
    breadcrumbs: Object,
    status_list: Object
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {},
      warehouse: null,
      editOpen: false
    });
    const { warehouse } = usePage().props;
    watch(() => data.editOpen, (newVal) => {
      if (!newVal) {
        location.reload();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$G, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              warehouse: data.warehouse,
              title: props.title,
              status_list: props.status_list
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="col-span-2 px-4 sm:px-0"${_scopeId}><div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><div class="grid grid-cols-6 md:grid-cols-6 gap-4"${_scopeId}><div class="col-span-5"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200"${_scopeId}>${ssrInterpolate(unref(warehouse).name)}</h3></div><div class="col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
              style: _ctx.can(["Warehouse Update"]) ? null : { display: "none" },
              type: "button",
              onClick: ($event) => (data.editOpen = true, data.warehouse = unref(warehouse)),
              class: "px-2 py-1.5 rounded float-right"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().label.edit)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(PencilIcon$1), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="border-t border-gray-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><div class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}> ID </dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).id)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.address)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).location)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.status)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>`);
            if (unref(warehouse).status === "active") {
              _push2(`<span class="text-green-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_active)}</span>`);
            } else if (unref(warehouse).status === "inactive") {
              _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_inactive)}</span>`);
            } else {
              _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_unknown)}</span>`);
            }
            _push2(`</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.created_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).created_at)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).updated_at)}</dd></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    createVNode(_sfc_main$G, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      warehouse: data.warehouse,
                      title: props.title,
                      status_list: props.status_list
                    }, null, 8, ["show", "onClose", "warehouse", "title", "status_list"])
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "col-span-2 px-4 sm:px-0" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "px-4 sm:px-0" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                          createVNode("div", { class: "grid grid-cols-6 md:grid-cols-6 gap-4" }, [
                            createVNode("div", { class: "col-span-5" }, [
                              createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-slate-200" }, toDisplayString(unref(warehouse).name), 1)
                            ]),
                            createVNode("div", { class: "col-span-1" }, [
                              withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                type: "button",
                                onClick: ($event) => (data.editOpen = true, data.warehouse = unref(warehouse)),
                                class: "px-2 py-1.5 rounded float-right"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [vShow, _ctx.can(["Warehouse Update"])],
                                [_directive_tooltip, _ctx.lang().label.edit]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 dark:border-slate-700" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, " ID "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).id), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.address), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).location), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.status), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, [
                                unref(warehouse).status === "active" ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-green-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_active), 1)) : unref(warehouse).status === "inactive" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-rose-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_inactive), 1)) : (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "text-rose-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_unknown), 1))
                              ])
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.created_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).created_at), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.updated_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).updated_at), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Warehouse/Show.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const Show$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = {
  __name: "IncomeForm",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    form: Object,
    warehouse_list: {
      type: Array,
      default: () => []
    },
    product_list: {}
  },
  setup(__props) {
    const props = __props;
    computed(() => {
      return props.warehouse_list.filter(
        (w2) => w2.value !== props.form.warehouse_id
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid grid-cols-3 gap-4"><div class="col-span-1"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "product_id",
        value: _ctx.lang().label.product_id
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1j, {
        id: "product_id",
        class: "mt-1 block w-full",
        modelValue: __props.form.product_id,
        "onUpdate:modelValue": ($event) => __props.form.product_id = $event,
        required: "",
        disabled: "disabled",
        dataSet: __props.product_list
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.product_id
      }, null, _parent));
      _push(`</div></div></div><div class="grid grid-cols-6 gap-4 mt-5"><div class="col-span-2"><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "source",
        value: _ctx.lang().transaction.source
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "source",
        modelValue: __props.form.source,
        "onUpdate:modelValue": ($event) => __props.form.source = $event,
        required: "",
        type: "text",
        class: "mt-1 block w-full"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        message: __props.form.errors.source
      }, null, _parent));
      _push(`</div></div><div class="col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "receive_quantity",
        value: _ctx.lang().label.quantity
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "receive_quantity",
        type: "number",
        min: "1",
        step: "1",
        class: "mt-1 block w-full",
        modelValue: __props.form.receive_quantity,
        "onUpdate:modelValue": ($event) => __props.form.receive_quantity = $event,
        required: "",
        placeholder: _ctx.lang().placeholder.quantity,
        error: __props.form.errors.receive_quantity
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.receive_quantity
      }, null, _parent));
      _push(`</div><div class="col-span-2"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "warehouse_id",
        value: _ctx.lang().transaction.source
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1j, {
        id: "warehouse_id",
        class: "mt-1 block w-full",
        modelValue: __props.form.warehouse_id,
        "onUpdate:modelValue": ($event) => __props.form.warehouse_id = $event,
        required: "",
        disabled: "disabled",
        dataSet: __props.warehouse_list
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.warehouse_id
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/IncomeForm.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const IncomeForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$A
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$z = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    warehouses: Object,
    products: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      warehouse_id: "",
      destination_warehouse_id: "",
      product_id: "",
      quantity: "",
      destination: "",
      source: "",
      type: "",
      is_internal_transfer: false
    });
    const warehouse_list = Object.keys(props.warehouses).map((key) => ({
      label: props.warehouses[key],
      value: key
    }));
    const product_list = Object.keys(props.products).map((key) => ({
      label: props.products[key],
      value: key
    }));
    const create = () => {
      form.post(route("admin.warehouse_product.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.add)} ${ssrInterpolate(_ctx.lang().label.warehouse_product)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$A, {
              form: unref(form),
              warehouse_list: unref(warehouse_list),
              product_list: unref(product_list)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.add) + " " + toDisplayString(_ctx.lang().label.warehouse_product), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$A, {
                    form: unref(form),
                    warehouse_list: unref(warehouse_list),
                    product_list: unref(product_list)
                  }, null, 8, ["form", "warehouse_list", "product_list"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/Create.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const Create$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    warehouse: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.warehouse.delete", (_a = props.warehouse) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.warehouse) == null ? void 0 : _a.name)}</b></p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.warehouse) == null ? void 0 : _b.name), 1)
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/Delete.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const Delete$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$x = {
  __name: "Income",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    warehouse_product: Object,
    warehouses: Object,
    products: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      warehouse_id: "",
      product_id: "",
      receive_quantity: "",
      destination: "",
      source: "",
      type: "in",
      is_internal_transfer: false
    });
    const warehouse_list = Object.keys(props.warehouses).map((key) => ({
      label: props.warehouses[key],
      value: key
    }));
    const product_list = Object.keys(props.products).map((key) => ({
      label: props.products[key],
      value: key
    }));
    const update = () => {
      var _a;
      form.put(route("admin.warehouse_product.update", (_a = props.warehouse_product) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: (e2) => {
          form.processing = false;
          console.log(e2);
        },
        onFinish: () => {
          form.processing = false;
        }
      });
    };
    const edit = () => {
      var _a;
      axios.get(route("admin.warehouse_product.edit", (_a = props.warehouse_product) == null ? void 0 : _a.id)).then((response) => {
        if (response.data.success === true) {
          form.processing = false;
          const warehouse_product = response.data.warehouse_product;
          Object.keys(form).forEach((key) => {
            if (warehouse_product[key] !== void 0) {
              form[key] = warehouse_product[key];
            }
          });
          form.send_quantity = warehouse_product.quantity;
        }
      }).catch((error) => {
        console.log(error);
        form.reset();
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
        edit();
      } else {
        form.reset();
        form.processing = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$A, {
              form: unref(form),
              warehouse_list: unref(warehouse_list),
              product_list: unref(product_list)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$A, {
                    form: unref(form),
                    warehouse_list: unref(warehouse_list),
                    product_list: unref(product_list)
                  }, null, 8, ["form", "warehouse_list", "product_list"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/Income.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const Income = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$w = {
  __name: "IncomeButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-2 py-1.5 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Buttons/IncomeButton.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = {
  __name: "OutcomeForm",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    form: Object,
    warehouse_list: {
      type: Array,
      default: () => []
    },
    product_list: {}
  },
  setup(__props) {
    const props = __props;
    const filteredDestinationWarehouses = computed(() => {
      return props.warehouse_list.filter(
        (w2) => w2.value !== props.form.warehouse_id
      );
    });
    watch(() => props.form.quantity, (newValue, oldValue) => {
      if (newValue > props.form.quantity) {
        props.form.errors.quantity = "Quantity cannot be greater than the available quantity";
      } else {
        props.form.errors.quantity = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid grid-cols-3 gap-4"><div class="col-span-1"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "product_id",
        value: _ctx.lang().label.product_id
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1j, {
        id: "product_id",
        class: "mt-1 block w-full",
        modelValue: __props.form.product_id,
        "onUpdate:modelValue": ($event) => __props.form.product_id = $event,
        required: "",
        disabled: "disabled",
        dataSet: __props.product_list
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.product_id
      }, null, _parent));
      _push(`</div></div><div class="col-span-1"><div>`);
      _push(ssrRenderComponent(_sfc_main$1k, {
        id: "is_internal_transfer",
        modelValue: __props.form.is_internal_transfer,
        "onUpdate:modelValue": ($event) => __props.form.is_internal_transfer = $event,
        label: _ctx.lang().transaction.is_internal_transfer
      }, null, _parent));
      _push(`<label for="is_internal_transfer" class="ml-2 font-medium text-sm text-slate-600 dark:text-slate-400">${ssrInterpolate(_ctx.lang().transaction.is_internal_transfer)}</label></div></div></div><div class="grid grid-cols-6 gap-4 mt-5"><div class="col-span-2"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "warehouse_id",
        value: _ctx.lang().transaction.source
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1j, {
        id: "warehouse_id",
        class: "mt-1 block w-full",
        modelValue: __props.form.warehouse_id,
        "onUpdate:modelValue": ($event) => __props.form.warehouse_id = $event,
        required: "",
        disabled: "disabled",
        dataSet: __props.warehouse_list
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.warehouse_id
      }, null, _parent));
      _push(`</div></div><div class="col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "send_quantity",
        value: _ctx.lang().label.quantity
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "send_quantity",
        type: "number",
        min: "1",
        class: "mt-1 block w-full",
        modelValue: __props.form.send_quantity,
        "onUpdate:modelValue": ($event) => __props.form.send_quantity = $event,
        required: "",
        placeholder: _ctx.lang().placeholder.quantity,
        error: __props.form.errors.send_quantity
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: __props.form.errors.send_quantity
      }, null, _parent));
      _push(`</div><div class="col-span-2">`);
      if (__props.form.is_internal_transfer) {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "destination_warehouse_id",
          value: _ctx.lang().transaction.destination
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1j, {
          class: "mt-1 block w-full",
          id: "destination_warehouse_id",
          modelValue: __props.form.destination,
          "onUpdate:modelValue": ($event) => __props.form.destination = $event,
          required: "",
          dataSet: filteredDestinationWarehouses.value,
          prompt: _ctx.lang().warehouse.select
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          message: __props.form.errors.destination
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          for: "destination",
          value: _ctx.lang().transaction.destination
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1l, {
          id: "destination",
          modelValue: __props.form.destination,
          "onUpdate:modelValue": ($event) => __props.form.destination = $event,
          required: "",
          type: "text",
          class: "mt-1 block w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1m, {
          message: __props.form.errors.destination
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/OutcomeForm.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const OutcomeForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = {
  __name: "Outcome",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    warehouse_product: Object,
    warehouses: Object,
    products: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      warehouse_id: "",
      product_id: "",
      quantity: "",
      send_quantity: "",
      destination: null,
      source: null,
      type: "out",
      is_internal_transfer: false
    });
    const warehouse_list = Object.keys(props.warehouses).map((key) => ({
      label: props.warehouses[key],
      value: key
    }));
    const product_list = Object.keys(props.products).map((key) => ({
      label: props.products[key],
      value: key
    }));
    const update = () => {
      var _a;
      form.put(route("admin.warehouse_product.update", (_a = props.warehouse_product) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: (e2) => {
          form.processing = false;
          console.log(e2);
        },
        onFinish: () => {
          form.processing = false;
        }
      });
    };
    const edit = () => {
      var _a;
      axios.get(route("admin.warehouse_product.edit", (_a = props.warehouse_product) == null ? void 0 : _a.id)).then((response) => {
        if (response.data.success === true) {
          form.processing = false;
          const warehouse_product = response.data.warehouse_product;
          Object.keys(form).forEach((key) => {
            if (warehouse_product[key] !== void 0) {
              form[key] = warehouse_product[key];
            }
          });
          form.send_quantity = warehouse_product.quantity;
        }
      }).catch((error) => {
        console.log(error);
        form.reset();
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
        edit();
      } else {
        form.reset();
        form.processing = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        "max-width": `4xl`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$v, {
              form: unref(form),
              warehouse_list: unref(warehouse_list),
              product_list: unref(product_list)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode(_sfc_main$v, {
                    form: unref(form),
                    warehouse_list: unref(warehouse_list),
                    product_list: unref(product_list)
                  }, null, 8, ["form", "warehouse_list", "product_list"])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/Outcome.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const Outcome = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const datetime_format = "yyyy-MM-dd HH:mm";
const _sfc_main$t = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    warehouse_products: Object,
    warehouses: Object,
    products: Object,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage,
        id: "",
        warehouse_id: "",
        product_id: "",
        product_name: "",
        quantity: "",
        created_at: ""
      },
      selectedId: [],
      multipleSelect: false,
      createOpen: false,
      incomeOpen: false,
      outcomeOpen: false,
      deleteOpen: false,
      warehouse_product: null,
      transaction_type: null,
      dataSet: usePage().props.app.perpage
    });
    const warehouse_list = Object.keys(props.warehouses).map((key) => ({
      label: props.warehouses[key],
      value: key
    }));
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.warehouse_product.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 1e3)
    );
    const startTime = ref({ hours: 0, minutes: 0 });
    const locale = usePage().props.locale;
    const timezone = ref({ tz: "Asia/Tashkent", offset: 5 });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              style: _ctx.can(["WarehouseProduct Create"]) ? null : { display: "none" },
              class: "rounded-none",
              onClick: ($event) => data.createOpen = true
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$z, {
              show: data.createOpen,
              onClose: ($event) => data.createOpen = false,
              title: props.title,
              warehouses: props.warehouses,
              products: props.products
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$x, {
              show: data.incomeOpen,
              onClose: ($event) => data.incomeOpen = false,
              warehouse_product: data.warehouse_product,
              title: _ctx.lang().transaction.type_income,
              warehouses: props.warehouses,
              products: props.products
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$u, {
              show: data.outcomeOpen,
              onClose: ($event) => data.outcomeOpen = false,
              warehouse_product: data.warehouse_product,
              title: _ctx.lang().transaction.type_outcome,
              warehouses: props.warehouses,
              products: props.products
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$y, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              warehouse_product: data.warehouse_product,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="flex justify-between p-2"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table"${_scopeId}><table class="w-full"${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700"${_scopeId}><tr class="dark:bg-slate-900/50 text-left"${_scopeId}><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.warehouse_id)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.product_name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer w-36"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.quantity)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.created)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only"${_scopeId}>Action</th></tr><tr${_scopeId}><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1j, {
              id: "warehouse_id",
              class: "block w-full",
              style: { "line-height": "14px" },
              modelValue: data.params["warehouse_id"],
              "onUpdate:modelValue": ($event) => data.params["warehouse_id"] = $event,
              dataSet: unref(warehouse_list),
              prompt: _ctx.lang().label.all
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["product_name"],
              "onUpdate:modelValue": ($event) => data.params["product_name"] = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params["quantity"],
              "onUpdate:modelValue": ($event) => data.params["quantity"] = $event,
              type: "number",
              class: "block w-full rounded-lg size-8",
              placeholder: _ctx.lang().label.quantity
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(VueDatePicker), {
              modelValue: data.params.created_at,
              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
              range: "",
              "enable-time-picker": true,
              "is-24": true,
              "start-time": startTime.value,
              format: datetime_format,
              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
              teleport: true,
              timezone: timezone.value,
              "input-class-name": [
                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
              ]
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.updated_at,
              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
              type: "text",
              class: "block w-full rounded-lg size-8"
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 pb-3"${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.warehouse_products.data, (warehouse_product, index) => {
              _push2(`<tr class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"${_scopeId}>${ssrInterpolate(props.warehouses[warehouse_product.warehouse_id])}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"${_scopeId}>${ssrInterpolate(props.products[warehouse_product.product_id])}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-right"${_scopeId}>${ssrInterpolate(warehouse_product.quantity)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-right"${_scopeId}>${ssrInterpolate(warehouse_product.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-right"${_scopeId}>${ssrInterpolate(warehouse_product.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}><div class="flex justify-center items-center"${_scopeId}><div class="rounded-md overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                class: "inline-flex items-center px-2 py-1.5 bg-slate-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-500 active:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                href: _ctx.route("admin.warehouse_product.show", warehouse_product == null ? void 0 : warehouse_product.id),
                tabindex: "-1"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(EyeIcon), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(EyeIcon), { class: "w-5 h-5" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$w, mergeProps({
                style: _ctx.can(["WarehouseProduct Update"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.incomeOpen = true, data.warehouse_product = warehouse_product, data.transaction_type = "in"),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ArrowDownTrayIcon$1), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ArrowDownTrayIcon$1), { class: "w-5 h-5" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["WarehouseProduct Update"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.outcomeOpen = true, data.warehouse_product = warehouse_product, data.transaction_type = "out"),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ArrowUpTrayIcon$1), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ArrowUpTrayIcon$1), { class: "w-5 h-5" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$X, {
              links: props.warehouse_products,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    withDirectives(createVNode(_sfc_main$1g, {
                      class: "rounded-none",
                      onClick: ($event) => data.createOpen = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, _ctx.can(["WarehouseProduct Create"])]
                    ]),
                    createVNode(_sfc_main$z, {
                      show: data.createOpen,
                      onClose: ($event) => data.createOpen = false,
                      title: props.title,
                      warehouses: props.warehouses,
                      products: props.products
                    }, null, 8, ["show", "onClose", "title", "warehouses", "products"]),
                    createVNode(_sfc_main$x, {
                      show: data.incomeOpen,
                      onClose: ($event) => data.incomeOpen = false,
                      warehouse_product: data.warehouse_product,
                      title: _ctx.lang().transaction.type_income,
                      warehouses: props.warehouses,
                      products: props.products
                    }, null, 8, ["show", "onClose", "warehouse_product", "title", "warehouses", "products"]),
                    createVNode(_sfc_main$u, {
                      show: data.outcomeOpen,
                      onClose: ($event) => data.outcomeOpen = false,
                      warehouse_product: data.warehouse_product,
                      title: _ctx.lang().transaction.type_outcome,
                      warehouses: props.warehouses,
                      products: props.products
                    }, null, 8, ["show", "onClose", "warehouse_product", "title", "warehouses", "products"]),
                    createVNode(_sfc_main$y, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      warehouse_product: data.warehouse_product,
                      title: props.title
                    }, null, 8, ["show", "onClose", "warehouse_product", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("warehouse_id")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.warehouse_id), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("product_name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.product_name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer w-36",
                            onClick: ($event) => order("quantity")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.quantity), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ]),
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1j, {
                              id: "warehouse_id",
                              class: "block w-full",
                              style: { "line-height": "14px" },
                              modelValue: data.params["warehouse_id"],
                              "onUpdate:modelValue": ($event) => data.params["warehouse_id"] = $event,
                              dataSet: unref(warehouse_list),
                              prompt: _ctx.lang().label.all
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet", "prompt"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["product_name"],
                              "onUpdate:modelValue": ($event) => data.params["product_name"] = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params["quantity"],
                              "onUpdate:modelValue": ($event) => data.params["quantity"] = $event,
                              type: "number",
                              class: "block w-full rounded-lg size-8",
                              placeholder: _ctx.lang().label.quantity
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(unref(VueDatePicker), {
                              modelValue: data.params.created_at,
                              "onUpdate:modelValue": ($event) => data.params.created_at = $event,
                              range: "",
                              "enable-time-picker": true,
                              "is-24": true,
                              "start-time": startTime.value,
                              format: datetime_format,
                              locale: unref(locale) === "uz" ? "uz-Cyrl" : unref(locale),
                              teleport: true,
                              timezone: timezone.value,
                              "input-class-name": [
                                "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary dark:focus:ring-primary rounded-md shadow-sm placeholder:text-slate-400 placeholder:dark:text-slate-400/50 block w-full rounded-lg size-8"
                              ]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "start-time", "locale", "timezone"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" }, [
                            createVNode(_sfc_main$1l, {
                              modelValue: data.params.updated_at,
                              "onUpdate:modelValue": ($event) => data.params.updated_at = $event,
                              type: "text",
                              class: "block w-full rounded-lg size-8"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("th", { class: "px-2 pb-3" })
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.warehouse_products.data, (warehouse_product, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(props.warehouses[warehouse_product.warehouse_id]), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-left" }, toDisplayString(props.products[warehouse_product.product_id]), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-right" }, toDisplayString(warehouse_product.quantity), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-right" }, toDisplayString(warehouse_product.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-right" }, toDisplayString(warehouse_product.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  createVNode(unref(Link), {
                                    class: "inline-flex items-center px-2 py-1.5 bg-slate-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-500 active:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out duration-150",
                                    href: _ctx.route("admin.warehouse_product.show", warehouse_product == null ? void 0 : warehouse_product.id),
                                    tabindex: "-1"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EyeIcon), { class: "w-5 h-5" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$w, {
                                    type: "button",
                                    onClick: ($event) => (data.incomeOpen = true, data.warehouse_product = warehouse_product, data.transaction_type = "in"),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ArrowDownTrayIcon$1), { class: "w-5 h-5" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["WarehouseProduct Update"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.outcomeOpen = true, data.warehouse_product = warehouse_product, data.transaction_type = "out"),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ArrowUpTrayIcon$1), { class: "w-5 h-5" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["WarehouseProduct Update"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.delete]
                                  ])
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$X, {
                      links: props.warehouse_products,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/Index.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const Index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    title: String,
    items: Object,
    breadcrumbs: Object,
    status_list: Object
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {},
      warehouse: null,
      editOpen: false
    });
    const { warehouse } = usePage().props;
    watch(() => data.editOpen, (newVal) => {
      if (!newVal) {
        location.reload();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$G, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              warehouse: data.warehouse,
              title: props.title,
              status_list: props.status_list
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="col-span-2 px-4 sm:px-0"${_scopeId}><div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><div class="grid grid-cols-6 md:grid-cols-6 gap-4"${_scopeId}><div class="col-span-5"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200"${_scopeId}>${ssrInterpolate(unref(warehouse).name)}</h3></div><div class="col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
              style: _ctx.can(["Warehouse Update"]) ? null : { display: "none" },
              type: "button",
              onClick: ($event) => (data.editOpen = true, data.warehouse = unref(warehouse)),
              class: "px-2 py-1.5 rounded float-right"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().label.edit)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(PencilIcon$1), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="border-t border-gray-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><div class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}> ID </dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).id)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.address)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).location)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.status)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>`);
            if (unref(warehouse).status === "active") {
              _push2(`<span class="text-green-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_active)}</span>`);
            } else if (unref(warehouse).status === "inactive") {
              _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_inactive)}</span>`);
            } else {
              _push2(`<span class="text-rose-500"${_scopeId}>${ssrInterpolate(_ctx.lang().warehouse.status_unknown)}</span>`);
            }
            _push2(`</dd></div><div class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.created_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).created_at)}</dd></div><div class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated_at)}</dt><dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(unref(warehouse).updated_at)}</dd></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    createVNode(_sfc_main$G, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      warehouse: data.warehouse,
                      title: props.title,
                      status_list: props.status_list
                    }, null, 8, ["show", "onClose", "warehouse", "title", "status_list"])
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "col-span-2 px-4 sm:px-0" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "px-4 sm:px-0" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                          createVNode("div", { class: "grid grid-cols-6 md:grid-cols-6 gap-4" }, [
                            createVNode("div", { class: "col-span-5" }, [
                              createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-slate-200" }, toDisplayString(unref(warehouse).name), 1)
                            ]),
                            createVNode("div", { class: "col-span-1" }, [
                              withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                type: "button",
                                onClick: ($event) => (data.editOpen = true, data.warehouse = unref(warehouse)),
                                class: "px-2 py-1.5 rounded float-right"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(PencilIcon$1), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [vShow, _ctx.can(["Warehouse Update"])],
                                [_directive_tooltip, _ctx.lang().label.edit]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 dark:border-slate-700" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, " ID "),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).id), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.address), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).location), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.status), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, [
                                unref(warehouse).status === "active" ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-green-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_active), 1)) : unref(warehouse).status === "inactive" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-rose-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_inactive), 1)) : (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "text-rose-500"
                                }, toDisplayString(_ctx.lang().warehouse.status_unknown), 1))
                              ])
                            ]),
                            createVNode("div", { class: "bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.created_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).created_at), 1)
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.updated_at), 1),
                              createVNode("dd", { class: "mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2" }, toDisplayString(unref(warehouse).updated_at), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WarehouseProduct/Show.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = {
  __name: "SwitchDarkMode",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = useDark();
    useToggle(isDark);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(_attrs)}><button${ssrRenderAttrs(mergeProps({ class: "p-2 rounded-md text-slate-500 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-900 focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.dark_mode)))}>`);
      if (unref(isDark)) {
        _push(ssrRenderComponent(unref(SunIcon), { class: "w-5 h-5 fill-current" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(isDark)) {
        _push(ssrRenderComponent(unref(MoonIcon), { class: "w-5 h-5 fill-current" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SwitchDarkMode.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col-2 sm:justify-center items-center pt-6 sm:pt-0 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-300" }, _attrs))}><div class="w-full sm:max-w-md lg:max-w-4xl my-4 bg-white dark:bg-slate-800 shadow-md overflow-hidden sm:rounded-lg"><div class="grid grid-cols-1 lg:grid-cols-2"><div class="space-y-6 px-6 py-4 lg:py-16"><div class="flex justify-between items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        class: "flex items-center",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-8 h-8 fill-current" }, null, _parent2, _scopeId));
            _push2(`<p class="text-lg ml-2"${_scopeId}>${ssrInterpolate(_ctx.$page.props.app.name)}</p>`);
          } else {
            return [
              createVNode(ApplicationLogo, { class: "w-8 h-8 fill-current" }),
              createVNode("p", { class: "text-lg ml-2" }, toDisplayString(_ctx.$page.props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex space-x-2 items-center">`);
      _push(ssrRenderComponent(_sfc_main$16, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$r, null, null, _parent));
      _push(`</div></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="hidden lg:flex lg:flex-col px-6 py-4 justify-center items-center space-y-2 text-white">`);
      ssrRenderSlot(_ctx.$slots, "illustration", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = {
  __name: "AuthenticationIllustrationForCabinet",
  __ssrInlineRender: true,
  props: {
    type: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.type == "login") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          xmlns: "http://www.w3.org/2000/svg",
          width: "532",
          height: "532",
          viewBox: "0 0 532 532",
          "xmlns:xlink": "http://www.w3.org/1999/xlink"
        }, _attrs))}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path style="${ssrRenderStyle({ "fill": "#CCD1D9" })}" d="M303.964,84.39c-2.047,0-4.156-0.078-6.312-0.234c-5.875-0.438-10.281-5.562-9.859-11.438 c0.438-5.875,5.562-10.281,11.438-9.843c12.625,0.938,22.578-1.906,27.312-7.828c2.438-3.031,2.484-5.609,2.359-6.25 c-1.797-3.156-3.391-4.406-4.297-4.516c-2.016-0.234-5.891,2.469-7.312,4.016c-4,4.328-10.75,4.609-15.078,0.625 c-4.328-4-4.609-10.734-0.625-15.078c1.172-1.266,11.828-12.343,25.5-10.75c5.797,0.672,14.046,3.906,20.515,15.421 c4.219,7.531,3.344,18.062-2.219,26.828c-4.031,6.328-10.218,11.406-17.89,14.671C320.667,82.921,312.776,84.39,303.964,84.39z"></path> <path style="${ssrRenderStyle({ "fill": "#FFCE54" })}" d="M469.319,105.076H42.667c-5.891,0-10.671,4.766-10.671,10.656v42.671 c0,5.89,4.781,10.656,10.671,10.656h426.652c5.89,0,10.655-4.766,10.655-10.656v-42.671 C479.974,109.842,475.209,105.076,469.319,105.076z"></path> <path style="${ssrRenderStyle({ "fill": "#e1e3e5" })}" d="M490.645,233.057H21.331c-5.89,0-10.664,4.781-10.664,10.671v234.65 c0,5.89,4.773,10.671,10.664,10.671h469.314c5.891,0,10.672-4.781,10.672-10.671v-234.65 C501.317,237.838,496.536,233.057,490.645,233.057z"></path> <g><rect x="42.667" y="307.724" style="${ssrRenderStyle({ "fill": "#4FC2E9" })}" width="127.99" height="106.65"></rect> <rect x="341.325" y="307.724" style="${ssrRenderStyle({ "fill": "#4FC2E9" })}" width="128" height="106.65"></rect></g> <path style="${ssrRenderStyle({ "fill": "#FFCE54" })}" d="M298.651,297.056h-85.333c-5.891,0-10.664,4.78-10.664,10.671v170.652 c0,5.89,4.773,10.671,10.664,10.671h85.333c5.891,0,10.672-4.781,10.672-10.671V307.726 C309.323,301.836,304.542,297.056,298.651,297.056z"></path> <path style="${ssrRenderStyle({ "fill": "#DA4453" })}" d="M510.614,217.151l-31.765-63.514c-1.812-3.625-5.5-5.906-9.53-5.906H42.667 c-4.039,0-7.734,2.281-9.539,5.906l-32,63.982c-1.656,3.312-1.476,7.234,0.461,10.391c1.945,3.14,5.383,5.046,9.078,5.046h490.649 l0,0c5.891,0,10.672-4.765,10.672-10.656C511.989,220.495,511.489,218.698,510.614,217.151z"></path> <path style="${ssrRenderStyle({ "fill": "#434A54" })}" d="M245.317,393.053c0,5.891-4.773,10.672-10.664,10.672s-10.664-4.781-10.664-10.672 s4.773-10.672,10.664-10.672C240.544,382.381,245.317,387.162,245.317,393.053z"></path> <path style="${ssrRenderStyle({ "fill": "#e1e3e5" })}" d="M309.448,30.407H202.779c-5.89,0-10.671,4.781-10.671,10.671c0,35.28,28.71,63.998,63.998,63.998 c35.295,0,63.999-28.718,63.999-63.998C320.104,35.188,315.339,30.407,309.448,30.407z"></path> <g><path style="${ssrRenderStyle({ "fill": "#DA4453" })}" d="M170.655,403.724H42.667c-5.891,0-10.671-4.781-10.671-10.672s4.781-10.672,10.671-10.672h127.988 c5.891,0,10.672,4.781,10.672,10.672S176.546,403.724,170.655,403.724z"></path> <path style="${ssrRenderStyle({ "fill": "#DA4453" })}" d="M469.319,403.724H341.322c-5.89,0-10.671-4.781-10.671-10.672s4.781-10.672,10.671-10.672h127.997 c5.89,0,10.655,4.781,10.655,10.672S475.209,403.724,469.319,403.724z"></path></g> <path style="${ssrRenderStyle({ "fill": "#434A54" })}" d="M501.317,489.05H10.668c-5.891,0-10.664-4.781-10.664-10.671c0-5.891,4.773-10.656,10.664-10.656 h490.649c5.875,0,10.656,4.766,10.656,10.656C511.974,484.268,507.192,489.05,501.317,489.05z"></path> <g><path style="${ssrRenderStyle({ "fill": "#ED5564" })}" d="M501.317,211.729H10.668c-5.891,0-10.664,4.781-10.664,10.672v39.796 c0,3.812,2.023,7.328,5.32,9.234c4.859,2.812,10.391,4.296,16.007,4.296c8.188,0,15.671-3.094,21.335-8.171 c5.664,5.077,13.14,8.171,21.328,8.171c8.187,0,15.671-3.094,21.335-8.171c5.664,5.077,13.141,8.171,21.328,8.171 c8.195,0,15.671-3.094,21.335-8.171c5.664,5.077,13.148,8.171,21.335,8.171s15.664-3.094,21.327-8.171 c5.664,5.077,13.148,8.171,21.335,8.171c8.188,0,15.664-3.094,21.328-8.171c5.672,5.077,13.148,8.171,21.335,8.171 s15.671-3.094,21.335-8.171c5.665,5.077,13.141,8.171,21.335,8.171c8.188,0,15.671-3.094,21.327-8.171 c5.672,5.077,13.141,8.171,21.328,8.171s15.672-3.094,21.343-8.171c5.656,5.077,13.14,8.171,21.327,8.171 s15.672-3.094,21.328-8.171c5.672,5.077,13.156,8.171,21.343,8.171c8.188,0,15.656-3.094,21.327-8.171 c5.672,5.077,13.141,8.171,21.328,8.171s15.672-3.094,21.344-8.171c5.655,5.077,13.14,8.171,21.326,8.171 c5.609,0,11.156-1.484,16-4.296c3.297-1.906,5.328-5.422,5.328-9.234v-39.796C511.974,216.511,507.192,211.729,501.317,211.729z"></path> <path style="${ssrRenderStyle({ "fill": "#ED5564" })}" d="M170.655,425.052H42.667c-5.891,0-10.671-4.781-10.671-10.672V307.726 c0-5.891,4.781-10.671,10.671-10.671h127.988c5.891,0,10.672,4.78,10.672,10.671v106.653 C181.327,420.27,176.546,425.052,170.655,425.052z M53.33,403.724h106.661v-85.326H53.33V403.724z"></path> <path style="${ssrRenderStyle({ "fill": "#ED5564" })}" d="M469.319,425.052H341.322c-5.89,0-10.671-4.781-10.671-10.672V307.726 c0-5.891,4.781-10.671,10.671-10.671h127.997c5.89,0,10.655,4.78,10.655,10.671v106.653 C479.974,420.27,475.209,425.052,469.319,425.052z M351.978,403.724h106.669v-85.326H351.978V403.724z"></path></g></g></svg>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AuthenticationIllustrationForCabinet.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = {
  __name: "CabinetLogin",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String
  },
  setup(__props) {
    const telegram_bot_name = usePage().props.telegram_bot_name;
    const form = useForm({
      email: "",
      password: "",
      remember: false,
      phone: "",
      otp_code: ""
    });
    const isEmailAuth = ref(true);
    const submit = () => {
      const routeName = isEmailAuth.value ? "cabinet.auth.login.store" : "cabinet.auth.otp.store";
      form.post(route(routeName), {
        onFinish: (e2) => {
          console.log("finish", e2);
        },
        onSuccess: (e2) => {
          console.log("success", e2);
        },
        onError: (e2) => {
          console.log("error", e2);
        }
      });
    };
    const toggleAuthMethod = () => {
      isEmailAuth.value = !isEmailAuth.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$q, _attrs, {
        illustration: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$p, {
              type: "login",
              class: "w-72 h-auto"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$p, {
                type: "login",
                class: "w-72 h-auto"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: _ctx.lang().label.cabinet_login
            }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}>`);
            if (isEmailAuth.value) {
              _push2(`<div${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1n, {
                for: "email",
                value: _ctx.lang().label.email
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1l, {
                id: "email",
                type: "email",
                class: "mt-1 block w-full",
                modelValue: unref(form).email,
                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                required: "",
                autofocus: "",
                autocomplete: "username",
                placeholder: _ctx.lang().placeholder.email,
                error: unref(form).errors.email
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1m, {
                class: "mt-2",
                message: unref(form).errors.email
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1n, {
                for: "password",
                value: _ctx.lang().label.password
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1l, {
                id: "password",
                type: "password",
                class: "mt-1 block w-full",
                modelValue: unref(form).password,
                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                required: "",
                autocomplete: "current-password",
                placeholder: _ctx.lang().placeholder.password,
                error: unref(form).errors.password
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1m, {
                class: "mt-2",
                message: unref(form).errors.password
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1k, {
                name: "remember",
                checked: unref(form).remember,
                "onUpdate:checked": ($event) => unref(form).remember = $event
              }, null, _parent2, _scopeId));
              _push2(`<span class="ml-2 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.remember_me)}</span></label></div></div>`);
            } else {
              _push2(`<div${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1n, {
                for: "phone",
                value: _ctx.lang().label.phone
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1l, {
                id: "phone",
                type: "text",
                class: "mt-1 block w-64",
                modelValue: unref(form).phone,
                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                required: "",
                autofocus: "",
                autocomplete: "tel",
                placeholder: _ctx.lang().placeholder.phone,
                error: unref(form).errors.phone
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1m, {
                class: "mt-2",
                message: unref(form).errors.phone
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1n, {
                for: "otp_code",
                value: _ctx.lang().label.otp_code
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1l, {
                id: "otp_code",
                type: "text",
                class: "mt-1 block w-40",
                modelValue: unref(form).otp_code,
                "onUpdate:modelValue": ($event) => unref(form).otp_code = $event,
                required: "",
                autocomplete: "one-time-code",
                placeholder: _ctx.lang().placeholder.otp_code,
                error: unref(form).errors.otp_code
              }, null, _parent2, _scopeId));
              _push2(`<a${ssrRenderAttr("href", `https://t.me/${unref(telegram_bot_name)}`)} target="_blank" class="ms-4 inline-flex items-center px-4 py-2.5 h-10 bg-primary dark:bg-primary border border-transparent rounded-md font-semibold text-xs text-white dark:text-white uppercase tracking-widest hover:bg-primary/80 dark:hover:bg-primary/90 focus:bg-primary/80 dark:focus:bg-primary/80 active:bg-primary dark:active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-primary transition ease-in-out duration-150 disabled:bg-primary/80"${_scopeId}> OTP </a></div></div>`);
            }
            _push2(`<div class="flex items-center justify-between mt-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["float-right", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.login + "..." : _ctx.lang().button.login)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.login + "..." : _ctx.lang().button.login), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form><div class="mt-4"${_scopeId}><button class="underline text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800"${_scopeId}>${ssrInterpolate(isEmailAuth.value ? _ctx.lang().auth.via_bot : _ctx.lang().auth.via_email)}</button></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: _ctx.lang().label.cabinet_login
              }, null, 8, ["title"]),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                isEmailAuth.value ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      for: "email",
                      value: _ctx.lang().label.email
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "email",
                      type: "email",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "username",
                      placeholder: _ctx.lang().placeholder.email,
                      error: unref(form).errors.email
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "mt-4" }, [
                    createVNode(_sfc_main$1n, {
                      for: "password",
                      value: _ctx.lang().label.password
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "password",
                      type: "password",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      autocomplete: "current-password",
                      placeholder: _ctx.lang().placeholder.password,
                      error: unref(form).errors.password
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "block mt-4" }, [
                    createVNode("label", { class: "flex items-center" }, [
                      createVNode(_sfc_main$1k, {
                        name: "remember",
                        checked: unref(form).remember,
                        "onUpdate:checked": ($event) => unref(form).remember = $event
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode("span", { class: "ml-2 text-sm text-slate-600 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.remember_me), 1)
                    ])
                  ])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      for: "phone",
                      value: _ctx.lang().label.phone
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "phone",
                      type: "text",
                      class: "mt-1 block w-64",
                      modelValue: unref(form).phone,
                      "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "tel",
                      placeholder: _ctx.lang().placeholder.phone,
                      error: unref(form).errors.phone
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.phone
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "mt-4 flex items-center" }, [
                    createVNode(_sfc_main$1n, {
                      for: "otp_code",
                      value: _ctx.lang().label.otp_code
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "otp_code",
                      type: "text",
                      class: "mt-1 block w-40",
                      modelValue: unref(form).otp_code,
                      "onUpdate:modelValue": ($event) => unref(form).otp_code = $event,
                      required: "",
                      autocomplete: "one-time-code",
                      placeholder: _ctx.lang().placeholder.otp_code,
                      error: unref(form).errors.otp_code
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode("a", {
                      href: `https://t.me/${unref(telegram_bot_name)}`,
                      target: "_blank",
                      class: "ms-4 inline-flex items-center px-4 py-2.5 h-10 bg-primary dark:bg-primary border border-transparent rounded-md font-semibold text-xs text-white dark:text-white uppercase tracking-widest hover:bg-primary/80 dark:hover:bg-primary/90 focus:bg-primary/80 dark:focus:bg-primary/80 active:bg-primary dark:active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-primary transition ease-in-out duration-150 disabled:bg-primary/80"
                    }, " OTP ", 8, ["href"])
                  ])
                ])),
                createVNode("div", { class: "flex items-center justify-between mt-8" }, [
                  createVNode(_sfc_main$1g, {
                    class: ["float-right", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.login + "..." : _ctx.lang().button.login), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32),
              createVNode("div", { class: "mt-4" }, [
                createVNode("button", {
                  onClick: toggleAuthMethod,
                  class: "underline text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800"
                }, toDisplayString(isEmailAuth.value ? _ctx.lang().auth.via_bot : _ctx.lang().auth.via_email), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/CabinetLogin.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const CabinetLogin = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$n = {
  __name: "AuthenticationIllustration",
  __ssrInlineRender: true,
  props: {
    type: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.type == "login") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          xmlns: "http://www.w3.org/2000/svg",
          width: "532",
          height: "532",
          viewBox: "0 0 532 532",
          "xmlns:xlink": "http://www.w3.org/1999/xlink"
        }, _attrs))}><circle cx="270.75986" cy="260.93427" r="86.34897" fill="#ffb6b6"></circle><polygon points="221.18982 360.05209 217.28876 320.6185 295.18982 306.05209 341.18982 418.05209 261.18982 510.05209 204.18982 398.05209 221.18982 360.05209" fill="#ffb6b6"></polygon><path d="m216.0374,340.35736l17.03111,3.84802s-13.38821-42.45453-8.84396-46.50766c4.54427-4.05316,15.68007,2.33328,15.68007,2.33328l11.70201,13.1199,14.25394-14.51239s15.47495-19.2421,21.53397-24.6463-3.67319-25.46364-3.67319-25.46364c0,0,89.89185-24.23923,56.44299-67.83968,0,0-19.61093-34.18452-25.99734-23.04871-6.38641,11.1358-14.00162-6.55013-14.00162-6.55013l-23.25381,4.42198s-45.89429-27.06042-89.45331,30.82959c-43.55902,57.89003,28.57916,154.01572,28.57916,154.01572h-.00002Z" class="text-slate-700 fill-current"></path><path d="m433.16003,472.95001c-47.19,38.26001-105.57001,59.04999-167.16003,59.04999-56.23999,0-109.81-17.33997-154.62-49.47998.08002-.84003.16003-1.66998.23004-2.5,1.19-13,2.25-25.64001,2.94995-36.12,2.71002-40.69,97.64001-67.81,97.64001-67.81,0,0,.42999.42999,1.29004,1.17999,5.23999,4.59998,26.50995,21.27997,63.81,25.94,33.25995,4.15997,44.20996-15.57001,47.51996-25.02002,1-2.88,1.30005-4.81,1.30005-4.81l97.63995,46.10999c6.37,9.10004,8.86005,28.70001,9.35004,50.73004.01996.90997.03998,1.81.04999,2.72998Z" class="text-slate-200 fill-current"></path><path d="m454.09003,77.91003C403.85004,27.66998,337.05005,0,266,0S128.15002,27.66998,77.91003,77.91003C27.67004,128.15002,0,194.95001,0,266c0,64.85004,23.05005,126.16003,65.29004,174.57001,4.02997,4.63,8.23999,9.14001,12.62,13.52002,1.02997,1.02997,2.07001,2.06,3.12,3.06,2.79999,2.70996,5.65002,5.35999,8.54999,7.92999,1.76001,1.57001,3.54004,3.10999,5.34003,4.62,1.40997,1.19,2.82001,2.35999,4.25,3.51001.02997.02997.04999.04999.07996.07001,3.97003,3.19995,8.01001,6.27997,12.13,9.23999,44.81,32.14001,98.37999,49.47998,154.61998,49.47998,61.59003,0,119.97003-20.78998,167.16003-59.04999,3.84998-3.12,7.62-6.35999,11.32001-9.71002,3.26996-2.95996,6.46997-6.01001,9.60999-9.14996.98999-.98999,1.97998-1.98999,2.95001-3,2.70001-2.78003,5.32001-5.61005,7.88-8.48004,43.37-48.71997,67.07996-110.83997,67.07996-176.60999,0-71.04999-27.66998-137.84998-77.90997-188.08997Zm10.17999,362.20997c-2.5,2.84003-5.06,5.64001-7.67999,8.37-4.08002,4.25-8.28998,8.37-12.64001,12.34003-1.64996,1.52002-3.32001,3-5.01001,4.46997-1.91998,1.67004-3.85999,3.31-5.82996,4.92004-15.53003,12.75-32.54004,23.75-50.73004,32.70996-7.19,3.54999-14.56,6.78003-22.09998,9.67004-29.28998,11.23999-61.08002,17.39996-94.28003,17.39996-32.03998,0-62.75995-5.73999-91.19-16.23999-11.66998-4.29999-22.94995-9.40997-33.77997-15.26001-1.59003-.85999-3.16998-1.72998-4.73999-2.62-8.26001-4.67999-16.25-9.78998-23.91998-15.31-.25-.17999-.51001-.37-.76001-.54999-5.46002-3.94-10.77002-8.09003-15.90002-12.45001-1.88-1.59003-3.73999-3.20001-5.57001-4.84998-2.97998-2.65002-5.89996-5.38-8.75-8.18005-5.39996-5.28998-10.56-10.79999-15.48999-16.52997C26.09003,391.77002,2,331.65002,2,266,2,120.42999,120.43005,2,266,2s264,118.42999,264,264c0,66.66003-24.82996,127.62-65.72998,174.12Z" class="text-slate-100 fill-current"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AuthenticationIllustration.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("admin.auth.login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$q, _attrs, {
        illustration: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$n, {
              type: "login",
              class: "w-72 h-auto"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$n, {
                type: "login",
                class: "w-72 h-auto"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: _ctx.lang().label.login
            }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "email",
              value: _ctx.lang().label.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username",
              placeholder: _ctx.lang().placeholder.email,
              error: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "password",
              value: _ctx.lang().label.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password",
              placeholder: _ctx.lang().placeholder.password,
              error: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1k, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.remember_me)}</span></label></div><div class="flex items-center justify-between mt-4"${_scopeId}>`);
            {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-4 float-right", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.login + "..." : _ctx.lang().button.login)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.login + "..." : _ctx.lang().button.login), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: _ctx.lang().label.login
              }, null, 8, ["title"]),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1n, {
                    for: "email",
                    value: _ctx.lang().label.email
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$1l, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username",
                    placeholder: _ctx.lang().placeholder.email,
                    error: unref(form).errors.email
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                  createVNode(_sfc_main$1m, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1n, {
                    for: "password",
                    value: _ctx.lang().label.password
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$1l, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    placeholder: _ctx.lang().placeholder.password,
                    error: unref(form).errors.password
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                  createVNode(_sfc_main$1m, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "block mt-4" }, [
                  createVNode("label", { class: "flex items-center" }, [
                    createVNode(_sfc_main$1k, {
                      name: "remember",
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", { class: "ml-2 text-sm text-slate-600 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.remember_me), 1)
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-between mt-4" }, [
                  createCommentVNode("", true),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-4 float-right", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.login + "..." : _ctx.lang().button.login), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    users: Number,
    customers: Number,
    roles: Number,
    permissions: Number
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: "Dashboard",
              breadcrumbs: []
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="text-white dark:text-slate-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 overflow-hidden shadow-sm"${_scopeId}><div${_scopeId}><div class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-blue-600/70 dark:bg-blue-500/80 items-center overflow-hidden"${_scopeId}><div class="flex flex-col"${_scopeId}><p class="text-4xl font-bold"${_scopeId}>${ssrInterpolate(props.users)}</p><p class="text-md md:text-lg uppercase"${_scopeId}>${ssrInterpolate(_ctx.lang().label.user)}</p></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(UserIcon), { class: "w-16 h-auto" }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-blue-600 dark:bg-blue-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-blue-600/90 dark:hover:bg-blue-600/70"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.user.index"),
              class: "flex justify-between items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>${ssrInterpolate(_ctx.lang().label.more)}</p>`);
                  _push3(ssrRenderComponent(unref(ChevronRightIcon), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, toDisplayString(_ctx.lang().label.more), 1),
                    createVNode(unref(ChevronRightIcon), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}><div class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-green-600/70 dark:bg-green-500/80 items-center overflow-hidden"${_scopeId}><div class="flex flex-col"${_scopeId}><p class="text-4xl font-bold"${_scopeId}>${ssrInterpolate(props.roles)}</p><p class="text-md md:text-lg uppercase"${_scopeId}>${ssrInterpolate(_ctx.lang().label.role)}</p></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(KeyIcon), { class: "w-16 h-auto" }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-green-600 dark:bg-green-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-green-600/90 dark:hover:bg-green-600/70"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.role.index"),
              class: "flex justify-between items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>${ssrInterpolate(_ctx.lang().label.more)}</p>`);
                  _push3(ssrRenderComponent(unref(ChevronRightIcon), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, toDisplayString(_ctx.lang().label.more), 1),
                    createVNode(unref(ChevronRightIcon), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}><div class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-amber-600/70 dark:bg-amber-500/80 items-center overflow-hidden"${_scopeId}><div class="flex flex-col"${_scopeId}><p class="text-4xl font-bold"${_scopeId}>${ssrInterpolate(props.permissions)}</p><p class="text-md md:text-lg uppercase"${_scopeId}>${ssrInterpolate(_ctx.lang().label.permission)}</p></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShieldCheckIcon), { class: "w-16 h-auto" }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-amber-600 dark:bg-amber-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-amber-600/90 dark:hover:bg-amber-600/70"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.permission.index"),
              class: "flex justify-between items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>${ssrInterpolate(_ctx.lang().label.more)}</p>`);
                  _push3(ssrRenderComponent(unref(ChevronRightIcon), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, toDisplayString(_ctx.lang().label.more), 1),
                    createVNode(unref(ChevronRightIcon), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: "Dashboard",
                breadcrumbs: []
              }),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "text-white dark:text-slate-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 overflow-hidden shadow-sm" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-blue-600/70 dark:bg-blue-500/80 items-center overflow-hidden" }, [
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("p", { class: "text-4xl font-bold" }, toDisplayString(props.users), 1),
                        createVNode("p", { class: "text-md md:text-lg uppercase" }, toDisplayString(_ctx.lang().label.user), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(UserIcon), { class: "w-16 h-auto" })
                      ])
                    ]),
                    createVNode("div", { class: "bg-blue-600 dark:bg-blue-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-blue-600/90 dark:hover:bg-blue-600/70" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.user.index"),
                        class: "flex justify-between items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", null, toDisplayString(_ctx.lang().label.more), 1),
                          createVNode(unref(ChevronRightIcon), { class: "w-5 h-5" })
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-green-600/70 dark:bg-green-500/80 items-center overflow-hidden" }, [
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("p", { class: "text-4xl font-bold" }, toDisplayString(props.roles), 1),
                        createVNode("p", { class: "text-md md:text-lg uppercase" }, toDisplayString(_ctx.lang().label.role), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(KeyIcon), { class: "w-16 h-auto" })
                      ])
                    ]),
                    createVNode("div", { class: "bg-green-600 dark:bg-green-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-green-600/90 dark:hover:bg-green-600/70" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.role.index"),
                        class: "flex justify-between items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", null, toDisplayString(_ctx.lang().label.more), 1),
                          createVNode(unref(ChevronRightIcon), { class: "w-5 h-5" })
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-amber-600/70 dark:bg-amber-500/80 items-center overflow-hidden" }, [
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("p", { class: "text-4xl font-bold" }, toDisplayString(props.permissions), 1),
                        createVNode("p", { class: "text-md md:text-lg uppercase" }, toDisplayString(_ctx.lang().label.permission), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(ShieldCheckIcon), { class: "w-16 h-auto" })
                      ])
                    ]),
                    createVNode("div", { class: "bg-amber-600 dark:bg-amber-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-amber-600/90 dark:hover:bg-amber-600/70" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.permission.index"),
                        class: "flex justify-between items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", null, toDisplayString(_ctx.lang().label.more), 1),
                          createVNode(unref(ChevronRightIcon), { class: "w-5 h-5" })
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      name: ""
    });
    const create = () => {
      form.post(route("admin.permission.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.add)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "name",
              value: _ctx.lang().label.role
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              placeholder: _ctx.lang().placeholder.name,
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.add) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      for: "name",
                      value: _ctx.lang().label.role
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "name",
                      type: "text",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      required: "",
                      placeholder: _ctx.lang().placeholder.name,
                      error: unref(form).errors.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.name
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Permission/Create.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const Create$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    permission: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.permission.destroy", (_a = props.permission) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.permission) == null ? void 0 : _a.name)}</b>? </p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.permission) == null ? void 0 : _b.name), 1),
                  createTextVNode("? ")
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Permission/Delete.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const Delete$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  __name: "DeleteBulk",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    selectedId: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      id: []
    });
    const destroy = () => {
      form.post(route("admin.permission.destroy-bulk"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.id = props.selectedId;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} ${ssrInterpolate((_a = props.selectedId) == null ? void 0 : _a.length)} ${ssrInterpolate(props.title)}? </p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.delete_confirm) + " " + toDisplayString((_b = props.selectedId) == null ? void 0 : _b.length) + " " + toDisplayString(props.title) + "? ", 1),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Permission/DeleteBulk.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const DeleteBulk$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    permission: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      name: ""
    });
    const update = () => {
      var _a;
      form.put(route("admin.permission.update", (_a = props.permission) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      var _a;
      if (props.show) {
        form.errors = {};
        form.name = (_a = props.permission) == null ? void 0 : _a.name;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.edit)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "name",
              value: _ctx.lang().label.role
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              placeholder: _ctx.lang().placeholder.name,
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.edit) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      for: "name",
                      value: _ctx.lang().label.role
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "name",
                      type: "text",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      required: "",
                      placeholder: _ctx.lang().placeholder.name,
                      error: unref(form).errors.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.name
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Permission/Edit.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const Edit$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    links: Object,
    filters: Object
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const data = reactive({
      params: {
        search: (_a = props.filters) == null ? void 0 : _a.search,
        field: (_b = props.filters) == null ? void 0 : _b.field,
        order: (_c = props.filters) == null ? void 0 : _c.order,
        perPage: (_d = props.filters) == null ? void 0 : _d.perPage
      }
    });
    watchEffect(() => {
      var _a2, _b2, _c2, _d2;
      data.params.search = (_a2 = props.filters) == null ? void 0 : _a2.search;
      data.params.field = (_b2 = props.filters) == null ? void 0 : _b2.field;
      data.params.order = (_c2 = props.filters) == null ? void 0 : _c2.order;
      data.params.perPage = (_d2 = props.filters) == null ? void 0 : _d2.perPage;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.links.data.length != 0) {
        _push(`<div class="ml-2">${ssrInterpolate(__props.links.from)}-${ssrInterpolate(__props.links.to)} ${ssrInterpolate(_ctx.lang().label.of)} ${ssrInterpolate(__props.links.total)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.links.data.length == 0) {
        _push(`<div class="flex flex-col space-y-2 mx-auto p-6 text-lg">`);
        _push(ssrRenderComponent(_sfc_main$Y, {
          name: "nodata",
          class: "w-auto h-16"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(_ctx.lang().label.no_data)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.links.links.length > 3) {
        _push(`<div><ul class="flex justify-center items-center rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"><li><button class="px-4 py-2"${ssrIncludeBooleanAttr(__props.links.prev_page_url == null) ? " disabled" : ""}>${"«"}</button></li><li><p class="px-4 py-2 bg-primary text-white">${__props.links.current_page ?? ""}</p></li><li><button class="px-4 py-2"${ssrIncludeBooleanAttr(__props.links.next_page_url == null) ? " disabled" : ""}>${"»"}</button></li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    permissions: Object,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage
      },
      selectedId: [],
      multipleSelect: false,
      createOpen: false,
      editOpen: false,
      deleteOpen: false,
      deleteBulkOpen: false,
      permission: null,
      dataSet: usePage().props.app.perpage
    });
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.permission.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 150)
    );
    const selectAll = (event) => {
      var _a;
      if (event.target.checked === false) {
        data.selectedId = [];
      } else {
        (_a = props.permissions) == null ? void 0 : _a.data.forEach((permission) => {
          data.selectedId.push(permission.id);
        });
      }
    };
    const select = () => {
      var _a;
      if (((_a = props.permissions) == null ? void 0 : _a.data.length) == data.selectedId.length) {
        data.multipleSelect = true;
      } else {
        data.multipleSelect = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              style: _ctx.can(["create permission"]) ? null : { display: "none" },
              class: "rounded-none",
              onClick: ($event) => data.createOpen = true
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$k, {
              show: data.createOpen,
              onClose: ($event) => data.createOpen = false,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$h, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              permission: data.permission,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$j, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              permission: data.permission,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$i, {
              show: data.deleteBulkOpen,
              onClose: ($event) => (data.deleteBulkOpen = false, data.multipleSelect = false, data.selectedId = []),
              selectedId: data.selectedId,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="flex justify-between p-2"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
              onClick: ($event) => data.deleteBulkOpen = true,
              style: data.selectedId.length != 0 && _ctx.can(["delete permission"]) ? null : { display: "none" },
              class: "px-3 py-1.5"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete_selected)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TrashIcon), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table"${_scopeId}><table class="w-full"${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700"${_scopeId}><tr class="dark:bg-slate-900/50 text-left"${_scopeId}><th class="px-2 py-4 text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1k, {
              checked: data.multipleSelect,
              "onUpdate:checked": ($event) => data.multipleSelect = $event,
              onChange: selectAll
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 py-4 text-center"${_scopeId}>#</th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>Guard</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.created)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only"${_scopeId}>Action</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.permissions.data, (permission, index) => {
              _push2(`<tr class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}><input class="rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary" type="checkbox"${ssrRenderAttr("value", permission.id)}${ssrIncludeBooleanAttr(Array.isArray(data.selectedId) ? ssrLooseContain(data.selectedId, permission.id) : data.selectedId) ? " checked" : ""}${_scopeId}></td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>${ssrInterpolate(++index)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(permission.name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(permission.guard_name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(permission.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(permission.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}><div class="flex justify-center items-center"${_scopeId}><div class="rounded-md overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
                style: _ctx.can(["update permission"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.editOpen = true, data.permission = permission),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["delete permission"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.deleteOpen = true, data.permission = permission),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(
                _ctx,
                _directive_tooltip,
                _ctx.lang().tooltip.delete
              )), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              links: props.permissions,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    withDirectives(createVNode(_sfc_main$1g, {
                      class: "rounded-none",
                      onClick: ($event) => data.createOpen = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, _ctx.can(["create permission"])]
                    ]),
                    createVNode(_sfc_main$k, {
                      show: data.createOpen,
                      onClose: ($event) => data.createOpen = false,
                      title: props.title
                    }, null, 8, ["show", "onClose", "title"]),
                    createVNode(_sfc_main$h, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      permission: data.permission,
                      title: props.title
                    }, null, 8, ["show", "onClose", "permission", "title"]),
                    createVNode(_sfc_main$j, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      permission: data.permission,
                      title: props.title
                    }, null, 8, ["show", "onClose", "permission", "title"]),
                    createVNode(_sfc_main$i, {
                      show: data.deleteBulkOpen,
                      onClose: ($event) => (data.deleteBulkOpen = false, data.multipleSelect = false, data.selectedId = []),
                      selectedId: data.selectedId,
                      title: props.title
                    }, null, 8, ["show", "onClose", "selectedId", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"]),
                      withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                        onClick: ($event) => data.deleteBulkOpen = true,
                        class: "px-3 py-1.5"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(TrashIcon), { class: "w-5 h-5" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])), [
                        [
                          vShow,
                          data.selectedId.length != 0 && _ctx.can(["delete permission"])
                        ],
                        [_directive_tooltip, _ctx.lang().tooltip.delete_selected]
                      ])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", { class: "px-2 py-4 text-center" }, [
                            createVNode(_sfc_main$1k, {
                              checked: data.multipleSelect,
                              "onUpdate:checked": ($event) => data.multipleSelect = $event,
                              onChange: selectAll
                            }, null, 8, ["checked", "onUpdate:checked"])
                          ]),
                          createVNode("th", { class: "px-2 py-4 text-center" }, "#"),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("guard")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, "Guard"),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.permissions.data, (permission, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, [
                              withDirectives(createVNode("input", {
                                class: "rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary",
                                type: "checkbox",
                                onChange: select,
                                value: permission.id,
                                "onUpdate:modelValue": ($event) => data.selectedId = $event
                              }, null, 40, ["value", "onUpdate:modelValue"]), [
                                [vModelCheckbox, data.selectedId]
                              ])
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(++index), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(permission.name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(permission.guard_name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(permission.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(permission.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                    type: "button",
                                    onClick: ($event) => (data.editOpen = true, data.permission = permission),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [
                                      vShow,
                                      _ctx.can(["update permission"])
                                    ],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.deleteOpen = true, data.permission = permission),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [
                                      vShow,
                                      _ctx.can(["delete permission"])
                                    ],
                                    [
                                      _directive_tooltip,
                                      _ctx.lang().tooltip.delete
                                    ]
                                  ])
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$g, {
                      links: props.permissions,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Permission/Index.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmingUserDeletion = ref(false);
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;
      nextTick(() => passwordInput.value.focus());
    };
    const deleteUser = () => {
      form.delete(route("admin.profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${ssrInterpolate(_ctx.lang().profile.delete_account)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400">${ssrInterpolate(_ctx.lang().profile.delete_account_caption)}</p></header>`);
      _push(ssrRenderComponent(_sfc_main$1d, { onClick: confirmUserDeletion }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.lang().button.delete_account)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.lang().button.delete_account), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: confirmingUserDeletion.value,
        onClose: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().profile.delete_account_modal_title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().profile.delete_account_modal_caption)}</p><div class="mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "password",
              value: _ctx.lang().label.password,
              class: "sr-only"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "password",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              onKeyup: deleteUser,
              placeholder: _ctx.lang().placeholder.password,
              error: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              message: unref(form).errors.password,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, { onClick: closeModal }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: deleteUser
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete_account + "..." : _ctx.lang().button.delete_account)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete_account + "..." : _ctx.lang().button.delete_account), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().profile.delete_account_modal_title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, toDisplayString(_ctx.lang().profile.delete_account_modal_caption), 1),
                createVNode("div", { class: "mt-6" }, [
                  createVNode(_sfc_main$1n, {
                    for: "password",
                    value: _ctx.lang().label.password,
                    class: "sr-only"
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$1l, {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    onKeyup: withKeys(deleteUser, ["enter"]),
                    placeholder: _ctx.lang().placeholder.password,
                    error: unref(form).errors.password
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                  createVNode(_sfc_main$1m, {
                    message: unref(form).errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete_account + "..." : _ctx.lang().button.delete_account), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const DeleteUserForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${ssrInterpolate(_ctx.lang().profile.update_password)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400">${ssrInterpolate(_ctx.lang().profile.update_password_caption)}</p></header><form class="mt-6 space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "current_password",
        value: _ctx.lang().profile.current_password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "current_password",
        ref_key: "currentPasswordInput",
        ref: currentPasswordInput,
        modelValue: unref(form).current_password,
        "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "current-password",
        placeholder: _ctx.lang().placeholder.password,
        error: unref(form).errors.current_password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        message: unref(form).errors.current_password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "password",
        value: _ctx.lang().profile.new_password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "password",
        ref_key: "passwordInput",
        ref: passwordInput,
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password",
        placeholder: _ctx.lang().placeholder.password,
        error: unref(form).errors.password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        message: unref(form).errors.password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "password_confirmation",
        value: _ctx.lang().label.password_confirmation
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password",
        placeholder: _ctx.lang().placeholder.password_confirmation,
        error: unref(form).errors.password_confirmation
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        message: unref(form).errors.password_confirmation,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$1g, {
        class: { "opacity-25": unref(form).processing },
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm text-slate-600 dark:text-slate-400">${ssrInterpolate(_ctx.lang().profile.saved)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const UpdatePasswordForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: Boolean,
    status: String
  },
  setup(__props) {
    const props = __props;
    const user = usePage().props.auth.user;
    const form = useForm({
      name: user.name,
      email: user.email
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${ssrInterpolate(_ctx.lang().profile.profile_information)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400">${ssrInterpolate(_ctx.lang().profile.update_profile)}</p></header><form class="mt-6 space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "name",
        value: _ctx.lang().label.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "name",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        required: "",
        autofocus: "",
        autocomplete: "name",
        placeholder: _ctx.lang().placeholder.name,
        error: unref(form).errors.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        for: "email",
        value: _ctx.lang().label.email
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1l, {
        id: "email",
        type: "email",
        class: "mt-1 block w-full",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "email",
        placeholder: _ctx.lang().placeholder.email,
        error: unref(form).errors.email
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1m, {
        class: "mt-2",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div>`);
      if (props.mustVerifyEmail && unref(user).email_verified_at === null) {
        _push(`<div><p class="text-sm mt-2 text-slate-800 dark:text-slate-200">${ssrInterpolate(_ctx.lang().profile.unverified_email)} `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("verification.send"),
          method: "post",
          as: "button",
          class: "underline text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.lang().profile.resend_email_verification)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.lang().profile.resend_email_verification), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><div style="${ssrRenderStyle(props.status === "verification-link-sent" ? null : { display: "none" })}" class="mt-2 font-medium text-sm text-green-600 dark:text-green-400">${ssrInterpolate(_ctx.lang().profile.sent_verification_email)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$1g, {
        class: { "opacity-25": unref(form).processing },
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm text-green-600 dark:text-green-400">${ssrInterpolate(_ctx.lang().profile.saved)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const UpdateProfileInformationForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: Boolean,
    status: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.lang().label.profile
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: "Profile",
              breadcrumbs: []
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$c, {
              "must-verify-email": __props.mustVerifyEmail,
              status: __props.status,
              class: "max-w-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$d, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div><div class="p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: "Profile",
                breadcrumbs: []
              }),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode(_sfc_main$c, {
                    "must-verify-email": __props.mustVerifyEmail,
                    status: __props.status,
                    class: "max-w-xl"
                  }, null, 8, ["must-verify-email", "status"])
                ]),
                createVNode("div", { class: "p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode(_sfc_main$d, { class: "max-w-xl" })
                ]),
                createVNode("div", { class: "p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode(_sfc_main$e, { class: "max-w-xl" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const Edit$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    permissions: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const data = reactive({
      multipleSelect: false
    });
    const form = useForm({
      name: "",
      guard_name: "web",
      permissions: []
    });
    const create = () => {
      form.post(route("admin.role.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
          data.multipleSelect = false;
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    const selectAll = (event) => {
      if (event.target.checked === false) {
        form.permissions = [];
      } else {
        form.permissions = [];
        props.permissions.forEach((permission) => {
          form.permissions.push(permission.id);
        });
      }
    };
    const select = () => {
      if (props.permissions.length == form.permissions.length) {
        data.multipleSelect = true;
      } else {
        data.multipleSelect = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.add)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "name",
              value: _ctx.lang().label.role
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              placeholder: _ctx.lang().placeholder.name,
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              value: _ctx.lang().label.permission
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.permissions
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-start items-center space-x-2 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1k, {
              id: "permission-all",
              checked: data.multipleSelect,
              "onUpdate:checked": ($event) => data.multipleSelect = $event,
              onChange: selectAll
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "permission-all",
              value: _ctx.lang().label.check_all
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2"${_scopeId}><!--[-->`);
            ssrRenderList(props.permissions, (permission, index) => {
              _push2(`<div class="flex items-center justify-start space-x-2"${_scopeId}><input class="rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary" type="checkbox"${ssrRenderAttr("id", "permission_" + permission.id)}${ssrRenderAttr("value", permission.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).permissions) ? ssrLooseContain(unref(form).permissions, permission.id) : unref(form).permissions) ? " checked" : ""}${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1n, {
                for: "permission_" + permission.id,
                value: permission.name
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.add) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      for: "name",
                      value: _ctx.lang().label.role
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "name",
                      type: "text",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      required: "",
                      placeholder: _ctx.lang().placeholder.name,
                      error: unref(form).errors.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.name
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      value: _ctx.lang().label.permission
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.permissions
                    }, null, 8, ["message"]),
                    createVNode("div", { class: "flex justify-start items-center space-x-2 mt-2" }, [
                      createVNode(_sfc_main$1k, {
                        id: "permission-all",
                        checked: data.multipleSelect,
                        "onUpdate:checked": ($event) => data.multipleSelect = $event,
                        onChange: selectAll
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode(_sfc_main$1n, {
                        for: "permission-all",
                        value: _ctx.lang().label.check_all
                      }, null, 8, ["value"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.permissions, (permission, index) => {
                        return openBlock(), createBlock("div", {
                          class: "flex items-center justify-start space-x-2",
                          key: index
                        }, [
                          withDirectives(createVNode("input", {
                            onChange: select,
                            class: "rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary",
                            type: "checkbox",
                            id: "permission_" + permission.id,
                            value: permission.id,
                            "onUpdate:modelValue": ($event) => unref(form).permissions = $event
                          }, null, 40, ["id", "value", "onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).permissions]
                          ]),
                          createVNode(_sfc_main$1n, {
                            for: "permission_" + permission.id,
                            value: permission.name
                          }, null, 8, ["for", "value"])
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Role/Create.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Create$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    role: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.role.destroy", (_a = props.role) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.role) == null ? void 0 : _a.name)}</b>? </p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.role) == null ? void 0 : _b.name), 1),
                  createTextVNode("? ")
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Role/Delete.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Delete$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  __name: "DeleteBulk",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    selectedId: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      id: []
    });
    const destroy = () => {
      form.post(route("admin.role.destroy-bulk"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.id = props.selectedId;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} ${ssrInterpolate((_a = props.selectedId) == null ? void 0 : _a.length)} ${ssrInterpolate(props.title)}? </p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.delete_confirm) + " " + toDisplayString((_b = props.selectedId) == null ? void 0 : _b.length) + " " + toDisplayString(props.title) + "? ", 1),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Role/DeleteBulk.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const DeleteBulk$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    role: Object,
    permissions: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const data = reactive({
      multipleSelect: false
    });
    const emit = __emit;
    const form = useForm({
      name: "",
      permissions: []
    });
    const update = () => {
      var _a;
      form.put(route("admin.role.update", (_a = props.role) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
          data.multipleSelect = false;
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      var _a, _b, _c;
      if (props.show) {
        form.errors = {};
        form.name = (_a = props.role) == null ? void 0 : _a.name;
        form.permissions = (_b = props.role.permissions) == null ? void 0 : _b.map((d2) => d2.id);
      }
      if (props.permissions.length == ((_c = props.role) == null ? void 0 : _c.permissions.length)) {
        data.multipleSelect = true;
      } else {
        data.multipleSelect = false;
      }
    });
    const selectAll = (event) => {
      if (event.target.checked === false) {
        form.permissions = [];
      } else {
        form.permissions = [];
        props.permissions.forEach((permission) => {
          form.permissions.push(permission.id);
        });
      }
    };
    const select = () => {
      if (props.permissions.length == form.permissions.length) {
        data.multipleSelect = true;
      } else {
        data.multipleSelect = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "4xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.edit)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "name",
              value: _ctx.lang().label.role
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              placeholder: _ctx.lang().placeholder.name,
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              value: _ctx.lang().label.permission
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.permissions
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-start items-center space-x-2 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1k, {
              id: "permission-all",
              checked: data.multipleSelect,
              "onUpdate:checked": ($event) => data.multipleSelect = $event,
              onChange: selectAll
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "permission-all",
              value: _ctx.lang().label.check_all
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-2"${_scopeId}><!--[-->`);
            ssrRenderList(props.permissions, (permission, index) => {
              _push2(`<div class="flex items-center justify-start space-x-2"${_scopeId}><input class="rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary" type="checkbox"${ssrRenderAttr("id", "permission_" + permission.id)}${ssrRenderAttr("value", permission.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).permissions) ? ssrLooseContain(unref(form).permissions, permission.id) : unref(form).permissions) ? " checked" : ""}${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1n, {
                for: "permission_" + permission.id,
                value: permission.name
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.edit) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      for: "name",
                      value: _ctx.lang().label.role
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1l, {
                      id: "name",
                      type: "text",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      required: "",
                      placeholder: _ctx.lang().placeholder.name,
                      error: unref(form).errors.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.name
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1n, {
                      value: _ctx.lang().label.permission
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$1m, {
                      class: "mt-2",
                      message: unref(form).errors.permissions
                    }, null, 8, ["message"]),
                    createVNode("div", { class: "flex justify-start items-center space-x-2 mt-2" }, [
                      createVNode(_sfc_main$1k, {
                        id: "permission-all",
                        checked: data.multipleSelect,
                        "onUpdate:checked": ($event) => data.multipleSelect = $event,
                        onChange: selectAll
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode(_sfc_main$1n, {
                        for: "permission-all",
                        value: _ctx.lang().label.check_all
                      }, null, 8, ["value"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.permissions, (permission, index) => {
                        return openBlock(), createBlock("div", {
                          class: "flex items-center justify-start space-x-2",
                          key: index
                        }, [
                          withDirectives(createVNode("input", {
                            onChange: select,
                            class: "rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary",
                            type: "checkbox",
                            id: "permission_" + permission.id,
                            value: permission.id,
                            "onUpdate:modelValue": ($event) => unref(form).permissions = $event
                          }, null, 40, ["id", "value", "onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).permissions]
                          ]),
                          createVNode(_sfc_main$1n, {
                            for: "permission_" + permission.id,
                            value: permission.name
                          }, null, 8, ["for", "value"])
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Role/Edit.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const Edit$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "Permission",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    role: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "4xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-6 text-slate-900 dark:text-slate-100"${_scopeId}><h2 class="text-lg font-medium"${_scopeId}>${ssrInterpolate(_ctx.lang().label.permission)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.all_permission)} ${ssrInterpolate(_ctx.lang().label.role)} <b${_scopeId}>${ssrInterpolate((_a = props.role) == null ? void 0 : _a.name)}</b></p><div class="my-6 grid grid-cols-3 sm:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList((_b = props.role) == null ? void 0 : _b.permissions, (permission, index) => {
              _push2(`<div class="flex justify-between w-full px-4 pb-1"${_scopeId}>${ssrInterpolate(++index + ". " + permission.name)}</div>`);
            });
            _push2(`<!--]--></div><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 text-slate-900 dark:text-slate-100" }, [
                createVNode("h2", { class: "text-lg font-medium" }, toDisplayString(_ctx.lang().label.permission), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.all_permission) + " " + toDisplayString(_ctx.lang().label.role) + " ", 1),
                  createVNode("b", null, toDisplayString((_c = props.role) == null ? void 0 : _c.name), 1)
                ]),
                createVNode("div", { class: "my-6 grid grid-cols-3 sm:grid-cols-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList((_d = props.role) == null ? void 0 : _d.permissions, (permission, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: "flex justify-between w-full px-4 pb-1"
                    }, toDisplayString(++index + ". " + permission.name), 1);
                  }), 128))
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Role/Permission.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const Permission = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    roles: Object,
    permissions: Object,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage
      },
      selectedId: [],
      multipleSelect: false,
      createOpen: false,
      editOpen: false,
      deleteOpen: false,
      deleteBulkOpen: false,
      permissionOpen: false,
      role: null,
      dataSet: usePage().props.app.perpage
    });
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.role.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 150)
    );
    const selectAll = (event) => {
      var _a;
      if (event.target.checked === false) {
        data.selectedId = [];
      } else {
        (_a = props.roles) == null ? void 0 : _a.data.forEach((role) => {
          data.selectedId.push(role.id);
        });
      }
    };
    const select = () => {
      var _a;
      if (((_a = props.roles) == null ? void 0 : _a.data.length) === data.selectedId.length) {
        data.multipleSelect = true;
      } else {
        data.multipleSelect = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              style: _ctx.can(["create role"]) ? null : { display: "none" },
              class: "rounded-none",
              onClick: ($event) => data.createOpen = true
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, {
              show: data.createOpen,
              onClose: ($event) => data.createOpen = false,
              permissions: props.permissions,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              role: data.role,
              permissions: props.permissions,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              role: data.role,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              show: data.deleteBulkOpen,
              onClose: ($event) => (data.deleteBulkOpen = false, data.multipleSelect = false, data.selectedId = []),
              selectedId: data.selectedId,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              show: data.permissionOpen,
              onClose: ($event) => data.permissionOpen = false,
              role: data.role,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="flex justify-between p-2"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
              onClick: ($event) => data.deleteBulkOpen = true,
              style: data.selectedId.length != 0 && _ctx.can(["delete role"]) ? null : { display: "none" },
              class: "px-3 py-1.5"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete_selected)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TrashIcon), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table"${_scopeId}><table class="w-full"${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700"${_scopeId}><tr class="dark:bg-slate-900/50 text-left"${_scopeId}><th class="px-2 py-4 text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1k, {
              checked: data.multipleSelect,
              "onUpdate:checked": ($event) => data.multipleSelect = $event,
              onChange: selectAll
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 py-4 text-center"${_scopeId}>#</th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>Guard</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4"${_scopeId}>${ssrInterpolate(_ctx.lang().label.permission)}</th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.created)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only"${_scopeId}>Action</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.roles.data, (role, index) => {
              _push2(`<tr class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}><input class="rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary" type="checkbox"${ssrRenderAttr("value", role.id)}${ssrIncludeBooleanAttr(Array.isArray(data.selectedId) ? ssrLooseContain(data.selectedId, role.id) : data.selectedId) ? " checked" : ""}${_scopeId}></td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>${ssrInterpolate(++index)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(role.name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(role.guard_name)}</td>`);
              if (role.permissions.length === props.permissions.length) {
                _push2(`<td${ssrRenderAttrs(mergeProps({ class: "whitespace-nowrap py-4 px-2 sm:py-3 cursor-pointer text-blue-600 dark:text-blue-400 font-bold underline" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.detail)))}${_scopeId}>${ssrInterpolate(_ctx.lang().label.all_permission)}</td>`);
              } else if (role.permissions.length !== 0) {
                _push2(`<td${ssrRenderAttrs(mergeProps({ class: "whitespace-nowrap py-4 px-2 sm:py-3 cursor-pointer text-blue-600 dark:text-blue-400 font-bold underline" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.detail)))}${_scopeId}>${ssrInterpolate(role.permissions.length)} ${ssrInterpolate(_ctx.lang().label.permission)}</td>`);
              } else {
                _push2(`<td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(_ctx.lang().label.no_permission)}</td>`);
              }
              _push2(`<td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(role.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(role.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}><div class="flex justify-center items-center"${_scopeId}><div class="rounded-md overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
                style: _ctx.can(["update role"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.editOpen = true, data.role = role),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["delete role"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.deleteOpen = true, data.role = role),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(
                _ctx,
                _directive_tooltip,
                _ctx.lang().tooltip.delete
              )), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              links: props.roles,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    withDirectives(createVNode(_sfc_main$1g, {
                      class: "rounded-none",
                      onClick: ($event) => data.createOpen = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, _ctx.can(["create role"])]
                    ]),
                    createVNode(_sfc_main$a, {
                      show: data.createOpen,
                      onClose: ($event) => data.createOpen = false,
                      permissions: props.permissions,
                      title: props.title
                    }, null, 8, ["show", "onClose", "permissions", "title"]),
                    createVNode(_sfc_main$7, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      role: data.role,
                      permissions: props.permissions,
                      title: props.title
                    }, null, 8, ["show", "onClose", "role", "permissions", "title"]),
                    createVNode(_sfc_main$9, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      role: data.role,
                      title: props.title
                    }, null, 8, ["show", "onClose", "role", "title"]),
                    createVNode(_sfc_main$8, {
                      show: data.deleteBulkOpen,
                      onClose: ($event) => (data.deleteBulkOpen = false, data.multipleSelect = false, data.selectedId = []),
                      selectedId: data.selectedId,
                      title: props.title
                    }, null, 8, ["show", "onClose", "selectedId", "title"]),
                    createVNode(_sfc_main$6, {
                      show: data.permissionOpen,
                      onClose: ($event) => data.permissionOpen = false,
                      role: data.role,
                      title: props.title
                    }, null, 8, ["show", "onClose", "role", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"]),
                      withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                        onClick: ($event) => data.deleteBulkOpen = true,
                        class: "px-3 py-1.5"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(TrashIcon), { class: "w-5 h-5" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])), [
                        [
                          vShow,
                          data.selectedId.length != 0 && _ctx.can(["delete role"])
                        ],
                        [_directive_tooltip, _ctx.lang().tooltip.delete_selected]
                      ])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", { class: "px-2 py-4 text-center" }, [
                            createVNode(_sfc_main$1k, {
                              checked: data.multipleSelect,
                              "onUpdate:checked": ($event) => data.multipleSelect = $event,
                              onChange: selectAll
                            }, null, 8, ["checked", "onUpdate:checked"])
                          ]),
                          createVNode("th", { class: "px-2 py-4 text-center" }, "#"),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("email")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, "Guard"),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4" }, toDisplayString(_ctx.lang().label.permission), 1),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.roles.data, (role, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, [
                              withDirectives(createVNode("input", {
                                class: "rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary",
                                type: "checkbox",
                                onChange: select,
                                value: role.id,
                                "onUpdate:modelValue": ($event) => data.selectedId = $event
                              }, null, 40, ["value", "onUpdate:modelValue"]), [
                                [vModelCheckbox, data.selectedId]
                              ])
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(++index), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(role.name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(role.guard_name), 1),
                            role.permissions.length === props.permissions.length ? withDirectives((openBlock(), createBlock("td", {
                              key: 0,
                              onClick: ($event) => (data.permissionOpen = true, data.role = role),
                              class: "whitespace-nowrap py-4 px-2 sm:py-3 cursor-pointer text-blue-600 dark:text-blue-400 font-bold underline"
                            }, [
                              createTextVNode(toDisplayString(_ctx.lang().label.all_permission), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tooltip, _ctx.lang().tooltip.detail]
                            ]) : role.permissions.length !== 0 ? withDirectives((openBlock(), createBlock("td", {
                              key: 1,
                              onClick: ($event) => (data.permissionOpen = true, data.role = role),
                              class: "whitespace-nowrap py-4 px-2 sm:py-3 cursor-pointer text-blue-600 dark:text-blue-400 font-bold underline"
                            }, [
                              createTextVNode(toDisplayString(role.permissions.length) + " " + toDisplayString(_ctx.lang().label.permission), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tooltip, _ctx.lang().tooltip.detail]
                            ]) : (openBlock(), createBlock("td", {
                              key: 2,
                              class: "whitespace-nowrap py-4 px-2 sm:py-3"
                            }, toDisplayString(_ctx.lang().label.no_permission), 1)),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(role.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(role.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                    type: "button",
                                    onClick: ($event) => (data.editOpen = true, data.role = role),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["update role"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.deleteOpen = true, data.role = role),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["delete role"])],
                                    [
                                      _directive_tooltip,
                                      _ctx.lang().tooltip.delete
                                    ]
                                  ])
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$g, {
                      links: props.roles,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Role/Index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    roles: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emit = __emit;
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "admin"
    });
    const create = () => {
      form.post(route("admin.user.store"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.errors = {};
      }
    });
    const roles = (_a = props.roles) == null ? void 0 : _a.map((role) => ({
      label: role.name,
      value: role.name
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.add)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "name",
              value: _ctx.lang().label.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              placeholder: _ctx.lang().placeholder.name,
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "email",
              value: _ctx.lang().label.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              placeholder: _ctx.lang().placeholder.email,
              error: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "password",
              value: _ctx.lang().label.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              placeholder: _ctx.lang().placeholder.password,
              error: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "password_confirmation",
              value: _ctx.lang().label.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              placeholder: _ctx.lang().placeholder.password_confirmation,
              error: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "role",
              value: _ctx.lang().label.role
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$_, {
              id: "role",
              class: "mt-1 block w-full",
              modelValue: unref(form).role,
              "onUpdate:modelValue": ($event) => unref(form).role = $event,
              required: "",
              dataSet: unref(roles)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.role
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: create
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(create, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.add) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "name",
                        value: _ctx.lang().label.name
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "name",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        required: "",
                        placeholder: _ctx.lang().placeholder.name,
                        error: unref(form).errors.name
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.name
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "email",
                        value: _ctx.lang().label.email
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        placeholder: _ctx.lang().placeholder.email,
                        error: unref(form).errors.email
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "password",
                        value: _ctx.lang().label.password
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        placeholder: _ctx.lang().placeholder.password,
                        error: unref(form).errors.password
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "password_confirmation",
                        value: _ctx.lang().label.password_confirmation
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "password_confirmation",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password_confirmation,
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        placeholder: _ctx.lang().placeholder.password_confirmation,
                        error: unref(form).errors.password_confirmation
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "role",
                        value: _ctx.lang().label.role
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$_, {
                        id: "role",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).role,
                        "onUpdate:modelValue": ($event) => unref(form).role = $event,
                        required: "",
                        dataSet: unref(roles)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.role
                      }, null, 8, ["message"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: create
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.add + "..." : _ctx.lang().button.add), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Create.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    user: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({});
    const destroy = () => {
      var _a;
      form.delete(route("admin.user.destroy", (_a = props.user) == null ? void 0 : _a.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} <b${_scopeId}>${ssrInterpolate((_a = props.user) == null ? void 0 : _a.name)}</b>? </p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, [
                  createTextVNode(toDisplayString(_ctx.lang().label.delete_confirm) + " ", 1),
                  createVNode("b", null, toDisplayString((_b = props.user) == null ? void 0 : _b.name), 1),
                  createTextVNode("? ")
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.delete + "..." : _ctx.lang().button.delete), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Delete.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Delete = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "DeleteBulk",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    selectedId: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      id: []
    });
    const destroy = () => {
      form.post(route("admin.user.destroy-bulk"), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      if (props.show) {
        form.id = props.selectedId;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close"),
        maxWidth: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete)} ${ssrInterpolate(props.title)}</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.lang().label.delete_confirm)} ${ssrInterpolate((_a = props.selectedId) == null ? void 0 : _a.length)} ${ssrInterpolate(props.title)}? </p><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: destroy
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? "Delete..." : "Delete")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Delete..." : "Delete"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(destroy, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.delete) + " " + toDisplayString(props.title), 1),
                createVNode("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-400" }, toDisplayString(_ctx.lang().label.delete_confirm) + " " + toDisplayString((_b = props.selectedId) == null ? void 0 : _b.length) + " " + toDisplayString(props.title) + "? ", 1),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1d, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: destroy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? "Delete..." : "Delete"), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/DeleteBulk.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DeleteBulk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: String,
    user: Object,
    roles: Object
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emit = __emit;
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: ""
    });
    const update = () => {
      var _a2;
      form.put(route("admin.user.update", (_a2 = props.user) == null ? void 0 : _a2.id), {
        preserveScroll: true,
        onSuccess: () => {
          emit("close");
          form.reset();
        },
        onError: () => null,
        onFinish: () => null
      });
    };
    watchEffect(() => {
      var _a2, _b, _c, _d;
      if (props.show) {
        form.errors = {};
        form.name = (_a2 = props.user) == null ? void 0 : _a2.name;
        form.email = (_b = props.user) == null ? void 0 : _b.email;
        form.role = ((_c = props.user) == null ? void 0 : _c.roles) == 0 ? "" : (_d = props.user) == null ? void 0 : _d.roles[0].name;
        form.errors = {};
      }
    });
    const roles = (_a = props.roles) == null ? void 0 : _a.map((role) => ({
      label: role.name,
      value: role.name
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1h, {
        show: props.show,
        onClose: ($event) => emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="p-6"${_scopeId}><h2 class="text-lg font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(_ctx.lang().label.edit)} ${ssrInterpolate(props.title)}</h2><div class="my-6 space-y-4"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "name",
              value: _ctx.lang().label.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              placeholder: _ctx.lang().placeholder.name,
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "email",
              value: _ctx.lang().label.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              placeholder: _ctx.lang().placeholder.email,
              error: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "password",
              value: _ctx.lang().label.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              placeholder: _ctx.lang().placeholder.password,
              error: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "password_confirmation",
              value: _ctx.lang().label.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1l, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              placeholder: _ctx.lang().placeholder.password_confirmation,
              error: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1n, {
              for: "role",
              value: _ctx.lang().label.role
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$_, {
              id: "role",
              class: "mt-1 block w-full",
              modelValue: unref(form).role,
              "onUpdate:modelValue": ($event) => unref(form).role = $event,
              required: "",
              dataSet: unref(roles)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1m, {
              class: "mt-2",
              message: unref(form).errors.role
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1f, {
              disabled: unref(form).processing,
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.close)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1g, {
              class: ["ml-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: update
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                class: "p-6",
                onSubmit: withModifiers(update, ["prevent"])
              }, [
                createVNode("h2", { class: "text-lg font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(_ctx.lang().label.edit) + " " + toDisplayString(props.title), 1),
                createVNode("div", { class: "my-6 space-y-4" }, [
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "name",
                        value: _ctx.lang().label.name
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "name",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        required: "",
                        placeholder: _ctx.lang().placeholder.name,
                        error: unref(form).errors.name
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.name
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "email",
                        value: _ctx.lang().label.email
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        placeholder: _ctx.lang().placeholder.email,
                        error: unref(form).errors.email
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "password",
                        value: _ctx.lang().label.password
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        placeholder: _ctx.lang().placeholder.password,
                        error: unref(form).errors.password
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "password_confirmation",
                        value: _ctx.lang().label.password_confirmation
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$1l, {
                        id: "password_confirmation",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password_confirmation,
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        placeholder: _ctx.lang().placeholder.password_confirmation,
                        error: unref(form).errors.password_confirmation
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1n, {
                        for: "role",
                        value: _ctx.lang().label.role
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$_, {
                        id: "role",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).role,
                        "onUpdate:modelValue": ($event) => unref(form).role = $event,
                        required: "",
                        dataSet: unref(roles)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"]),
                      createVNode(_sfc_main$1m, {
                        class: "mt-2",
                        message: unref(form).errors.role
                      }, null, 8, ["message"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_sfc_main$1f, {
                    disabled: unref(form).processing,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.lang().button.close), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_sfc_main$1g, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(form).processing ? _ctx.lang().button.save + "..." : _ctx.lang().button.save), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Edit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    filters: Object,
    users: Object,
    roles: Object,
    breadcrumbs: Object,
    perPage: Number
  },
  setup(__props) {
    const { _, debounce, pickBy } = pkg;
    const props = __props;
    const data = reactive({
      params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage
      },
      selectedId: [],
      multipleSelect: false,
      createOpen: false,
      editOpen: false,
      deleteOpen: false,
      deleteBulkOpen: false,
      user: null,
      dataSet: usePage().props.app.perpage
    });
    const order = (field) => {
      data.params.field = field;
      data.params.order = data.params.order === "asc" ? "desc" : "asc";
    };
    watch(
      () => _.cloneDeep(data.params),
      debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.user.index"), params, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      }, 150)
    );
    const selectAll = (event) => {
      var _a;
      if (event.target.checked === false) {
        data.selectedId = [];
      } else {
        (_a = props.users) == null ? void 0 : _a.data.forEach((user) => {
          data.selectedId.push(user.id);
        });
      }
    };
    const select = () => {
      var _a;
      if (((_a = props.users) == null ? void 0 : _a.data.length) == data.selectedId.length) {
        data.multipleSelect = true;
      } else {
        data.multipleSelect = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$10, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$$, {
              title: __props.title,
              breadcrumbs: __props.breadcrumbs
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-4"${_scopeId}><div class="px-4 sm:px-0"${_scopeId}><div class="rounded-lg overflow-hidden w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1g, {
              style: _ctx.can(["create user"]) ? null : { display: "none" },
              class: "rounded-none",
              onClick: ($event) => data.createOpen = true
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.lang().button.add)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              show: data.createOpen,
              onClose: ($event) => data.createOpen = false,
              roles: props.roles,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: data.editOpen,
              onClose: ($event) => data.editOpen = false,
              user: data.user,
              roles: props.roles,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: data.deleteOpen,
              onClose: ($event) => data.deleteOpen = false,
              user: data.user,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: data.deleteBulkOpen,
              onClose: ($event) => (data.deleteBulkOpen = false, data.multipleSelect = false, data.selectedId = []),
              selectedId: data.selectedId,
              title: props.title
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg"${_scopeId}><div class="flex justify-between p-2"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              modelValue: data.params.perPage,
              "onUpdate:modelValue": ($event) => data.params.perPage = $event,
              dataSet: data.dataSet
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
              onClick: ($event) => data.deleteBulkOpen = true,
              style: data.selectedId.length != 0 && _ctx.can(["delete user"]) ? null : { display: "none" },
              class: "px-3 py-1.5"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.delete_selected)), {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TrashIcon), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, {
              modelValue: data.params.search,
              "onUpdate:modelValue": ($event) => data.params.search = $event,
              type: "text",
              class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
              placeholder: _ctx.lang().placeholder.search
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto scrollbar-table"${_scopeId}><table class="w-full"${_scopeId}><thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700"${_scopeId}><tr class="dark:bg-slate-900/50 text-left"${_scopeId}><th class="px-2 py-4 text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1k, {
              checked: data.multipleSelect,
              "onUpdate:checked": ($event) => data.multipleSelect = $event,
              onChange: selectAll
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-2 py-4 text-center"${_scopeId}>#</th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.name)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.email)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4"${_scopeId}>${ssrInterpolate(_ctx.lang().label.role)}</th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.created)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 cursor-pointer"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.lang().label.updated)}</span>`);
            _push2(ssrRenderComponent(unref(ChevronUpDownIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div></th><th class="px-2 py-4 sr-only"${_scopeId}>Action</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.users.data, (user, index) => {
              _push2(`<tr class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"${_scopeId}><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}><input class="rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary" type="checkbox"${ssrRenderAttr("value", user.id)}${ssrIncludeBooleanAttr(Array.isArray(data.selectedId) ? ssrLooseContain(data.selectedId, user.id) : data.selectedId) ? " checked" : ""}${_scopeId}></td><td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center"${_scopeId}>${ssrInterpolate(++index)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}><span class="flex justify-start items-center"${_scopeId}>${ssrInterpolate(user.name)} `);
              _push2(ssrRenderComponent(unref(CheckBadgeIcon), {
                class: "ml-[2px] w-4 h-4 text-primary dark:text-white",
                style: user.email_verified_at ? null : { display: "none" }
              }, null, _parent2, _scopeId));
              _push2(`</span></td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(user.email)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(user.roles.length == 0 ? "not selected" : user.roles[0].name)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(user.created_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}>${ssrInterpolate(user.updated_at)}</td><td class="whitespace-nowrap py-4 px-2 sm:py-3"${_scopeId}><div class="flex justify-center items-center"${_scopeId}><div class="rounded-md overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$Z, mergeProps({
                style: _ctx.can(["update user"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.editOpen = true, data.user = user),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.lang().tooltip.edit)), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1d, mergeProps({
                style: _ctx.can(["delete user"]) ? null : { display: "none" },
                type: "button",
                onClick: ($event) => (data.deleteOpen = true, data.user = user),
                class: "px-2 py-1.5 rounded-none"
              }, ssrGetDirectiveProps(
                _ctx,
                _directive_tooltip,
                _ctx.lang().tooltip.delete
              )), {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              links: props.users,
              filters: data.params
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$$, {
                title: __props.title,
                breadcrumbs: __props.breadcrumbs
              }, null, 8, ["title", "breadcrumbs"]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "px-4 sm:px-0" }, [
                  createVNode("div", { class: "rounded-lg overflow-hidden w-fit" }, [
                    withDirectives(createVNode(_sfc_main$1g, {
                      class: "rounded-none",
                      onClick: ($event) => data.createOpen = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.lang().button.add), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, _ctx.can(["create user"])]
                    ]),
                    createVNode(_sfc_main$4, {
                      show: data.createOpen,
                      onClose: ($event) => data.createOpen = false,
                      roles: props.roles,
                      title: props.title
                    }, null, 8, ["show", "onClose", "roles", "title"]),
                    createVNode(_sfc_main$1, {
                      show: data.editOpen,
                      onClose: ($event) => data.editOpen = false,
                      user: data.user,
                      roles: props.roles,
                      title: props.title
                    }, null, 8, ["show", "onClose", "user", "roles", "title"]),
                    createVNode(_sfc_main$3, {
                      show: data.deleteOpen,
                      onClose: ($event) => data.deleteOpen = false,
                      user: data.user,
                      title: props.title
                    }, null, 8, ["show", "onClose", "user", "title"]),
                    createVNode(_sfc_main$2, {
                      show: data.deleteBulkOpen,
                      onClose: ($event) => (data.deleteBulkOpen = false, data.multipleSelect = false, data.selectedId = []),
                      selectedId: data.selectedId,
                      title: props.title
                    }, null, 8, ["show", "onClose", "selectedId", "title"])
                  ])
                ]),
                createVNode("div", { class: "relative bg-white dark:bg-slate-800 shadow sm:rounded-lg" }, [
                  createVNode("div", { class: "flex justify-between p-2" }, [
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(_sfc_main$_, {
                        modelValue: data.params.perPage,
                        "onUpdate:modelValue": ($event) => data.params.perPage = $event,
                        dataSet: data.dataSet
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dataSet"]),
                      withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                        onClick: ($event) => data.deleteBulkOpen = true,
                        class: "px-3 py-1.5"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(TrashIcon), { class: "w-5 h-5" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])), [
                        [
                          vShow,
                          data.selectedId.length != 0 && _ctx.can(["delete user"])
                        ],
                        [_directive_tooltip, _ctx.lang().tooltip.delete_selected]
                      ])
                    ]),
                    createVNode(_sfc_main$1l, {
                      modelValue: data.params.search,
                      "onUpdate:modelValue": ($event) => data.params.search = $event,
                      type: "text",
                      class: "block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg",
                      placeholder: _ctx.lang().placeholder.search
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto scrollbar-table" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "uppercase text-sm border-t border-slate-200 dark:border-slate-700" }, [
                        createVNode("tr", { class: "dark:bg-slate-900/50 text-left" }, [
                          createVNode("th", { class: "px-2 py-4 text-center" }, [
                            createVNode(_sfc_main$1k, {
                              checked: data.multipleSelect,
                              "onUpdate:checked": ($event) => data.multipleSelect = $event,
                              onChange: selectAll
                            }, null, 8, ["checked", "onUpdate:checked"])
                          ]),
                          createVNode("th", { class: "px-2 py-4 text-center" }, "#"),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("name")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.name), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("email")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.email), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4" }, toDisplayString(_ctx.lang().label.role), 1),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("created_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.created), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", {
                            class: "px-2 py-4 cursor-pointer",
                            onClick: ($event) => order("updated_at")
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", null, toDisplayString(_ctx.lang().label.updated), 1),
                              createVNode(unref(ChevronUpDownIcon), { class: "w-4 h-4" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("th", { class: "px-2 py-4 sr-only" }, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.users.data, (user, index) => {
                          return openBlock(), createBlock("tr", {
                            key: index,
                            class: "border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30 hover:dark:bg-slate-900/20"
                          }, [
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, [
                              withDirectives(createVNode("input", {
                                class: "rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-primary dark:text-primary shadow-sm focus:ring-primary/80 dark:focus:ring-primary dark:focus:ring-offset-slate-800 dark:checked:bg-primary dark:checked:border-primary",
                                type: "checkbox",
                                onChange: select,
                                value: user.id,
                                "onUpdate:modelValue": ($event) => data.selectedId = $event
                              }, null, 40, ["value", "onUpdate:modelValue"]), [
                                [vModelCheckbox, data.selectedId]
                              ])
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3 text-center" }, toDisplayString(++index), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("span", { class: "flex justify-start items-center" }, [
                                createTextVNode(toDisplayString(user.name) + " ", 1),
                                withDirectives(createVNode(unref(CheckBadgeIcon), { class: "ml-[2px] w-4 h-4 text-primary dark:text-white" }, null, 512), [
                                  [vShow, user.email_verified_at]
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(user.email), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(user.roles.length == 0 ? "not selected" : user.roles[0].name), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(user.created_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, toDisplayString(user.updated_at), 1),
                            createVNode("td", { class: "whitespace-nowrap py-4 px-2 sm:py-3" }, [
                              createVNode("div", { class: "flex justify-center items-center" }, [
                                createVNode("div", { class: "rounded-md overflow-hidden" }, [
                                  withDirectives((openBlock(), createBlock(_sfc_main$Z, {
                                    type: "button",
                                    onClick: ($event) => (data.editOpen = true, data.user = user),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["update user"])],
                                    [_directive_tooltip, _ctx.lang().tooltip.edit]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_sfc_main$1d, {
                                    type: "button",
                                    onClick: ($event) => (data.deleteOpen = true, data.user = user),
                                    class: "px-2 py-1.5 rounded-none"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])), [
                                    [vShow, _ctx.can(["delete user"])],
                                    [
                                      _directive_tooltip,
                                      _ctx.lang().tooltip.delete
                                    ]
                                  ])
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700" }, [
                    createVNode(_sfc_main$g, {
                      links: props.users,
                      filters: data.params
                    }, null, 8, ["links", "filters"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
