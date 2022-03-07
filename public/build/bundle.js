var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function c(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let l,i,a;function u(t,e){return l||(l=document.createElement("a")),l.href=e,t===l.href}function d(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function p(t,e,n){t.$$.on_destroy.push(d(e,n))}function f(t,e,n,o){if(t){const r=m(t,e,n,o);return t[0](r)}}function m(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function h(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}function $(t,e,n,o,r,c){if(r){const s=m(e,n,o,c);t.p(s,r)}}function g(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function v(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function y(t,e){t.appendChild(e)}function b(t,e,n){t.insertBefore(e,n||null)}function w(t){t.parentNode.removeChild(t)}function x(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function k(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function _(){return j(" ")}function E(){return j("")}function q(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function A(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function L(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function T(t,e,n,o){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function C(){if(void 0===i){i=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){i=!0}}return i}function N(t,e,n){t.classList[n?"add":"remove"](e)}function S(t){a=t}function O(){if(!a)throw new Error("Function called outside component initialization");return a}function P(t){O().$$.on_mount.push(t)}function R(){const t=O();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}function U(t,e){O().$$.context.set(t,e)}function H(t){return O().$$.context.get(t)}const M=[],z=[],B=[],I=[],J=Promise.resolve();let K=!1;function V(t){B.push(t)}const W=new Set;let D=0;function F(){const t=a;do{for(;D<M.length;){const t=M[D];D++,S(t),G(t.$$)}for(S(null),M.length=0,D=0;z.length;)z.pop()();for(let t=0;t<B.length;t+=1){const e=B[t];W.has(e)||(W.add(e),e())}B.length=0}while(M.length);for(;I.length;)I.pop()();K=!1,W.clear(),S(t)}function G(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(V)}}const X=new Set;let Q;function Y(){Q={r:0,c:[],p:Q}}function Z(){Q.r||r(Q.c),Q=Q.p}function tt(t,e){t&&t.i&&(X.delete(t),t.i(e))}function et(t,e,n,o){if(t&&t.o){if(X.has(t))return;X.add(t),Q.c.push((()=>{X.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const nt="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function ot(t){return"object"==typeof t&&null!==t?t:{}}function rt(t){t&&t.c()}function ct(t,e,o,s){const{fragment:l,on_mount:i,on_destroy:a,after_update:u}=t.$$;l&&l.m(e,o),s||V((()=>{const e=i.map(n).filter(c);a?a.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(V)}function st(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function lt(t,e){-1===t.$$.dirty[0]&&(M.push(t),K||(K=!0,J.then(F)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function it(e,n,c,s,l,i,u,d=[-1]){const p=a;S(e);const f=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:l,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(p?p.$$.context:[])),callbacks:o(),dirty:d,skip_bound:!1,root:n.target||p.$$.root};u&&u(f.root);let m=!1;if(f.ctx=c?c(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&l(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),m&&lt(e,t)),n})):[],f.update(),m=!0,r(f.before_update),f.fragment=!!s&&s(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(w)}else f.fragment&&f.fragment.c();n.intro&&tt(e.$$.fragment),ct(e,n.target,n.anchor,n.customElement),F()}S(p)}class at{$destroy(){st(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ut=[];function dt(e,n=t){let o;const r=new Set;function c(t){if(s(e,t)&&(e=t,o)){const t=!ut.length;for(const t of r)t[1](),ut.push(t,e);if(t){for(let t=0;t<ut.length;t+=2)ut[t][0](ut[t+1]);ut.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(s,l=t){const i=[s,l];return r.add(i),1===r.size&&(o=n(c)||t),s(e),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}function pt(e,n,o){const s=!Array.isArray(e),l=s?[e]:e,i=n.length<2;return a=e=>{let o=!1;const a=[];let u=0,p=t;const f=()=>{if(u)return;p();const o=n(s?a[0]:a,e);i?e(o):p=c(o)?o:t},m=l.map(((t,e)=>d(t,(t=>{a[e]=t,u&=~(1<<e),o&&f()}),(()=>{u|=1<<e}))));return o=!0,f(),function(){r(m),p()}},{subscribe:dt(o,a).subscribe};var a}const ft={},mt={};function ht(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const $t=function(t,e){const n=[];let o=ht(t);return{get location(){return o},listen(e){n.push(e);const r=()=>{o=ht(t),e({location:o,action:"POP"})};return t.addEventListener("popstate",r),()=>{t.removeEventListener("popstate",r);const o=n.indexOf(e);n.splice(o,1)}},navigate(e,{state:r,replace:c=!1}={}){r={...r,key:Date.now()+""};try{c?t.history.replaceState(r,null,e):t.history.pushState(r,null,e)}catch(n){t.location[c?"replace":"assign"](e)}o=ht(t),n.forEach((t=>t({location:o,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let e=0;const n=[{pathname:t,search:""}],o=[];return{get location(){return n[e]},addEventListener(t,e){},removeEventListener(t,e){},history:{get entries(){return n},get index(){return e},get state(){return o[e]},pushState(t,r,c){const[s,l=""]=c.split("?");e++,n.push({pathname:s,search:l}),o.push(t)},replaceState(t,r,c){const[s,l=""]=c.split("?");n[e]={pathname:s,search:l},o[e]=t}}}}()),{navigate:gt}=$t,vt=/^:(.+)/;function yt(t){return"*"===t[0]}function bt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function wt(t){return t.replace(/(^\/+|\/+$)/g,"")}function xt(t,e){return{route:t,score:t.default?0:bt(t.path).reduce(((t,e)=>(t+=4,!function(t){return""===t}(e)?!function(t){return vt.test(t)}(e)?yt(e)?t-=5:t+=3:t+=2:t+=1,t)),0),index:e}}function kt(t,e){let n,o;const[r]=e.split("?"),c=bt(r),s=""===c[0],l=function(t){return t.map(xt).sort(((t,e)=>t.score<e.score?1:t.score>e.score?-1:t.index-e.index))}(t);for(let t=0,r=l.length;t<r;t++){const r=l[t].route;let i=!1;if(r.default){o={route:r,params:{},uri:e};continue}const a=bt(r.path),u={},d=Math.max(c.length,a.length);let p=0;for(;p<d;p++){const t=a[p],e=c[p];if(void 0!==t&&yt(t)){u["*"===t?"*":t.slice(1)]=c.slice(p).map(decodeURIComponent).join("/");break}if(void 0===e){i=!0;break}let n=vt.exec(t);if(n&&!s){const t=decodeURIComponent(e);u[n[1]]=t}else if(t!==e){i=!0;break}}if(!i){n={route:r,params:u,uri:"/"+c.slice(0,p).join("/")};break}}return n||o||null}function jt(t,e){return`${wt("/"===e?t:`${wt(t)}/${wt(e)}`)}/`}function _t(t){let e;const n=t[9].default,o=f(n,t,t[8],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,[r]){o&&o.p&&(!e||256&r)&&$(o,n,t,t[8],e?h(n,t[8],r,null):g(t[8]),null)},i(t){e||(tt(o,t),e=!0)},o(t){et(o,t),e=!1},d(t){o&&o.d(t)}}}function Et(t,e,n){let o,r,c,{$$slots:s={},$$scope:l}=e,{basepath:i="/"}=e,{url:a=null}=e;const u=H(ft),d=H(mt),f=dt([]);p(t,f,(t=>n(6,r=t)));const m=dt(null);let h=!1;const $=u||dt(a?{pathname:a}:$t.location);p(t,$,(t=>n(5,o=t)));const g=d?d.routerBase:dt({path:i,uri:i});p(t,g,(t=>n(7,c=t)));const v=pt([g,m],(([t,e])=>{if(null===e)return t;const{path:n}=t,{route:o,uri:r}=e;return{path:o.default?n:o.path.replace(/\*.*$/,""),uri:r}}));return u||(P((()=>$t.listen((t=>{$.set(t.location)})))),U(ft,$)),U(mt,{activeRoute:m,base:g,routerBase:v,registerRoute:function(t){const{path:e}=c;let{path:n}=t;if(t._path=n,t.path=jt(e,n),"undefined"==typeof window){if(h)return;const e=function(t,e){return kt([t],e)}(t,o.pathname);e&&(m.set(e),h=!0)}else f.update((e=>(e.push(t),e)))},unregisterRoute:function(t){f.update((e=>{const n=e.indexOf(t);return e.splice(n,1),e}))}}),t.$$set=t=>{"basepath"in t&&n(3,i=t.basepath),"url"in t&&n(4,a=t.url),"$$scope"in t&&n(8,l=t.$$scope)},t.$$.update=()=>{if(128&t.$$.dirty){const{path:t}=c;f.update((e=>(e.forEach((e=>e.path=jt(t,e._path))),e)))}if(96&t.$$.dirty){const t=kt(r,o.pathname);m.set(t)}},[f,$,g,i,a,o,r,c,l,s]}class qt extends at{constructor(t){super(),it(this,t,Et,_t,s,{basepath:3,url:4})}}const At=t=>({params:4&t,location:16&t}),Lt=t=>({params:t[2],location:t[4]});function Tt(t){let e,n,o,r;const c=[Nt,Ct],s=[];function l(t,e){return null!==t[0]?0:1}return e=l(t),n=s[e]=c[e](t),{c(){n.c(),o=E()},m(t,n){s[e].m(t,n),b(t,o,n),r=!0},p(t,r){let i=e;e=l(t),e===i?s[e].p(t,r):(Y(),et(s[i],1,1,(()=>{s[i]=null})),Z(),n=s[e],n?n.p(t,r):(n=s[e]=c[e](t),n.c()),tt(n,1),n.m(o.parentNode,o))},i(t){r||(tt(n),r=!0)},o(t){et(n),r=!1},d(t){s[e].d(t),t&&w(o)}}}function Ct(t){let e;const n=t[10].default,o=f(n,t,t[9],Lt);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,r){o&&o.p&&(!e||532&r)&&$(o,n,t,t[9],e?h(n,t[9],r,At):g(t[9]),Lt)},i(t){e||(tt(o,t),e=!0)},o(t){et(o,t),e=!1},d(t){o&&o.d(t)}}}function Nt(t){let n,o,r;const c=[{location:t[4]},t[2],t[3]];var s=t[0];function l(t){let n={};for(let t=0;t<c.length;t+=1)n=e(n,c[t]);return{props:n}}return s&&(n=new s(l())),{c(){n&&rt(n.$$.fragment),o=E()},m(t,e){n&&ct(n,t,e),b(t,o,e),r=!0},p(t,e){const r=28&e?function(t,e){const n={},o={},r={$$scope:1};let c=t.length;for(;c--;){const s=t[c],l=e[c];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)r[t]||(n[t]=l[t],r[t]=1);t[c]=l}else for(const t in s)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(c,[16&e&&{location:t[4]},4&e&&ot(t[2]),8&e&&ot(t[3])]):{};if(s!==(s=t[0])){if(n){Y();const t=n;et(t.$$.fragment,1,0,(()=>{st(t,1)})),Z()}s?(n=new s(l()),rt(n.$$.fragment),tt(n.$$.fragment,1),ct(n,o.parentNode,o)):n=null}else s&&n.$set(r)},i(t){r||(n&&tt(n.$$.fragment,t),r=!0)},o(t){n&&et(n.$$.fragment,t),r=!1},d(t){t&&w(o),n&&st(n,t)}}}function St(t){let e,n,o=null!==t[1]&&t[1].route===t[7]&&Tt(t);return{c(){o&&o.c(),e=E()},m(t,r){o&&o.m(t,r),b(t,e,r),n=!0},p(t,[n]){null!==t[1]&&t[1].route===t[7]?o?(o.p(t,n),2&n&&tt(o,1)):(o=Tt(t),o.c(),tt(o,1),o.m(e.parentNode,e)):o&&(Y(),et(o,1,1,(()=>{o=null})),Z())},i(t){n||(tt(o),n=!0)},o(t){et(o),n=!1},d(t){o&&o.d(t),t&&w(e)}}}function Ot(t,n,o){let r,c,{$$slots:s={},$$scope:l}=n,{path:i=""}=n,{component:a=null}=n;const{registerRoute:u,unregisterRoute:d,activeRoute:f}=H(mt);p(t,f,(t=>o(1,r=t)));const m=H(ft);p(t,m,(t=>o(4,c=t)));const h={path:i,default:""===i};let $={},g={};var y;return u(h),"undefined"!=typeof window&&(y=()=>{d(h)},O().$$.on_destroy.push(y)),t.$$set=t=>{o(13,n=e(e({},n),v(t))),"path"in t&&o(8,i=t.path),"component"in t&&o(0,a=t.component),"$$scope"in t&&o(9,l=t.$$scope)},t.$$.update=()=>{2&t.$$.dirty&&r&&r.route===h&&o(2,$=r.params);{const{path:t,component:e,...r}=n;o(3,g=r)}},n=v(n),[a,r,$,g,c,f,m,h,i,l,s]}class Pt extends at{constructor(t){super(),it(this,t,Ot,St,s,{path:8,component:0})}}function Rt(t){function e(t){const e=t.currentTarget;""===e.target&&function(t){const e=location.host;return t.host==e||0===t.href.indexOf(`https://${e}`)||0===t.href.indexOf(`http://${e}`)}(e)&&function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)&&(t.preventDefault(),gt(e.pathname+e.search,{replace:e.hasAttribute("replace")}))}return t.addEventListener("click",e),{destroy(){t.removeEventListener("click",e)}}}function Ut(e){let n,o,r,c,s,l,i,a,u,d,p,f,m,h,$,g,v,x;return{c(){n=k("link"),o=k("html"),r=_(),c=k("div"),s=k("a"),s.innerHTML='<img id="logo" src="/logo.png" alt="UJAV" class="svelte-1lbqpdk"/>',l=_(),i=k("a"),a=j(" JAV "),u=_(),d=k("a"),p=j(" UAV "),f=_(),m=k("div"),h=k("form"),$=k("input"),g=_(),v=k("button"),v.innerHTML='<i class="fa fa-search svelte-1lbqpdk"></i>',A(n,"rel","stylesheet"),A(n,"href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"),A(n,"class","svelte-1lbqpdk"),A(o,"lang","en"),A(o,"class","svelte-1lbqpdk"),A(s,"href","/"),A(s,"class","svelte-1lbqpdk"),A(i,"href","/jav"),A(i,"class","option svelte-1lbqpdk"),T(i,"color",e[0]?"":"#f48f51"),A(d,"href","/uav"),A(d,"class","option svelte-1lbqpdk"),T(d,"color",e[0]?"#f48f51":""),A($,"type","text"),A($,"placeholder","Search..."),A($,"name","search"),A($,"class","svelte-1lbqpdk"),A(v,"type","submit"),A(v,"class","svelte-1lbqpdk"),A(h,"action",x="/"+(e[0]?"uav":"jav")+"/page/1"),A(h,"class","svelte-1lbqpdk"),A(m,"class","search-container svelte-1lbqpdk"),A(c,"class","topnav svelte-1lbqpdk")},m(t,e){y(document.head,n),y(document.head,o),b(t,r,e),b(t,c,e),y(c,s),y(c,l),y(c,i),y(i,a),y(c,u),y(c,d),y(d,p),y(c,f),y(c,m),y(m,h),y(h,$),y(h,g),y(h,v)},p(t,[e]){1&e&&T(i,"color",t[0]?"":"#f48f51"),1&e&&T(d,"color",t[0]?"#f48f51":""),1&e&&x!==(x="/"+(t[0]?"uav":"jav")+"/page/1")&&A(h,"action",x)},i:t,o:t,d(t){w(n),w(o),t&&w(r),t&&w(c)}}}function Ht(t,e,n){let{isUav:o=window.location.href.includes("/uav")}=e;return t.$$set=t=>{"isUav"in t&&n(0,o=t.isUav)},[o]}class Mt extends at{constructor(t){super(),it(this,t,Ht,Ut,s,{isUav:0})}}const{document:zt}=nt;function Bt(e){let n,o,r,c;return{c(){n=k("script"),r=_(),c=k("footer"),c.innerHTML='<div id="contact" class="svelte-1sqlycp"><h4>Telegram: <a href="https://t.me/ujav_xyz">https://t.me/+b26KKnyfTuxmOGE9</a></h4></div> \n    <div id="container-d52c7e07291ada6e0f33e1886e00777b"></div> \n    <div id="term" class="svelte-1sqlycp">Terms of Use: This Website Is For People 18 And Over Only</div>',A(n,"type","text/javascript"),u(n.src,o="//baggageconservationcaught.com/bd/83/82/bd83825a56b4f1fae3df192c52e8c59e.js")||A(n,"src","//baggageconservationcaught.com/bd/83/82/bd83825a56b4f1fae3df192c52e8c59e.js")},m(t,e){y(zt.head,n),b(t,r,e),b(t,c,e)},p:t,i:t,o:t,d(t){w(n),t&&w(r),t&&w(c)}}}function It(t){var e,n;return e=document.getElementsByTagName("head")[0],(n=document.createElement("script")).src="//baggageconservationcaught.com/d52c7e07291ada6e0f33e1886e00777b/invoke.js",e.appendChild(n),[]}class Jt extends at{constructor(t){super(),it(this,t,It,Bt,s,{})}}function Kt(t,e,n){const o=t.slice();return o[15]=e[n],o}function Vt(t,e,n){const o=t.slice();return o[18]=e[n],o}function Wt(t){let e,n,o=t[18].actor+"";return{c(){e=k("p2"),n=j(o),A(e,"id","actorName"),A(e,"class","svelte-1b654du")},m(t,o){b(t,e,o),y(e,n)},p(t,e){1&e&&o!==(o=t[18].actor+"")&&L(n,o)},d(t){t&&w(e)}}}function Dt(e){let n,o,r,s,l,i,a,d,p,f,m,h,$,g,v,x,E=(e[4]?e[18].title:e[18].title.split(" ")[0])+"",q=null!=e[18].actor&&Wt(e);return{c(){n=k("a"),o=k("div"),r=k("img"),i=_(),a=k("p1"),d=j(E),p=_(),f=k("br"),m=_(),q&&q.c(),h=_(),A(r,"id","actorImage"),u(r.src,s=e[18].icon_link)||A(r,"src",s),A(r,"alt","profile image"),A(r,"style",l=e[4]?"height: 7rem":""),A(r,"class","svelte-1b654du"),A(a,"class","title svelte-1b654du"),A(o,"class","container svelte-1b654du"),A(n,"href",$="/play/"+e[18].code),A(n,"class","svelte-1b654du")},m(e,s){var l;b(e,n,s),y(n,o),y(o,r),y(o,i),y(o,a),y(a,d),y(o,p),y(o,f),y(o,m),q&&q.m(o,null),y(n,h),v||(l=g=Rt.call(null,n),x=l&&c(l.destroy)?l.destroy:t,v=!0)},p(t,e){1&e&&!u(r.src,s=t[18].icon_link)&&A(r,"src",s),1&e&&E!==(E=(t[4]?t[18].title:t[18].title.split(" ")[0])+"")&&L(d,E),null!=t[18].actor?q?q.p(t,e):(q=Wt(t),q.c(),q.m(o,null)):q&&(q.d(1),q=null),1&e&&$!==($="/play/"+t[18].code)&&A(n,"href",$)},d(t){t&&w(n),q&&q.d(),v=!1,x()}}}function Ft(t){let e,n,o,r,c,s,l,i,a,u=t[3],d=[];for(let e=0;e<u.length;e+=1)d[e]=Gt(Kt(t,u,e));return{c(){e=k("div"),n=k("a"),o=j("«"),c=_();for(let t=0;t<d.length;t+=1)d[t].c();s=_(),l=k("a"),i=j("»"),A(n,"href",r=""+(Qt+t[5](t[8]-t[2]<0?t[1]-t[2]+1:t[8]-t[2]))),A(n,"class","svelte-1b654du"),A(l,"href",a=""+(Qt+t[5](t[8]+t[2]>t[1]?1:t[8]+t[2]))),A(l,"class","svelte-1b654du"),A(e,"class","pagination svelte-1b654du")},m(t,r){b(t,e,r),y(e,n),y(n,o),y(e,c);for(let t=0;t<d.length;t+=1)d[t].m(e,null);y(e,s),y(e,l),y(l,i)},p(t,o){if(6&o&&r!==(r=""+(Qt+t[5](t[8]-t[2]<0?t[1]-t[2]+1:t[8]-t[2])))&&A(n,"href",r),232&o){let n;for(u=t[3],n=0;n<u.length;n+=1){const r=Kt(t,u,n);d[n]?d[n].p(r,o):(d[n]=Gt(r),d[n].c(),d[n].m(e,s))}for(;n<d.length;n+=1)d[n].d(1);d.length=u.length}6&o&&a!==(a=""+(Qt+t[5](t[8]+t[2]>t[1]?1:t[8]+t[2])))&&A(l,"href",a)},d(t){t&&w(e),x(d,t)}}}function Gt(t){let e,n,o,r=t[6](t[15])+"";return{c(){e=k("a"),n=j(r),A(e,"href",o=""+(Qt+t[5](t[6](t[15])))),A(e,"class","svelte-1b654du"),N(e,"active",t[15]==t[7]),N(e,"small-text",t[15]>100)},m(t,o){b(t,e,o),y(e,n)},p(t,c){8&c&&r!==(r=t[6](t[15])+"")&&L(n,r),8&c&&o!==(o=""+(Qt+t[5](t[6](t[15]))))&&A(e,"href",o),136&c&&N(e,"active",t[15]==t[7]),8&c&&N(e,"small-text",t[15]>100)},d(t){t&&w(e)}}}function Xt(t){let e,n,o,r,c,s,l,i;n=new Mt({});let a=t[0],u=[];for(let e=0;e<a.length;e+=1)u[e]=Dt(Vt(t,a,e));let d=0!=t[0].length&&Ft(t);return l=new Jt({}),{c(){e=k("main"),rt(n.$$.fragment),o=_(),r=k("div");for(let t=0;t<u.length;t+=1)u[t].c();c=_(),d&&d.c(),s=_(),rt(l.$$.fragment),A(r,"id","wrapper-grid"),A(r,"style",t[4]?"grid-template-columns: repeat(auto-fit, 12rem)":""),A(r,"class","svelte-1b654du")},m(t,a){b(t,e,a),ct(n,e,null),y(e,o),y(e,r);for(let t=0;t<u.length;t+=1)u[t].m(r,null);y(e,c),d&&d.m(e,null),y(e,s),ct(l,e,null),i=!0},p(t,[n]){if(17&n){let e;for(a=t[0],e=0;e<a.length;e+=1){const o=Vt(t,a,e);u[e]?u[e].p(o,n):(u[e]=Dt(o),u[e].c(),u[e].m(r,null))}for(;e<u.length;e+=1)u[e].d(1);u.length=a.length}0!=t[0].length?d?d.p(t,n):(d=Ft(t),d.c(),d.m(e,s)):d&&(d.d(1),d=null)},i(t){i||(tt(n.$$.fragment,t),tt(l.$$.fragment,t),i=!0)},o(t){et(n.$$.fragment,t),et(l.$$.fragment,t),i=!1},d(t){t&&w(e),st(n),x(u,t),d&&d.d(),st(l)}}}const Qt="https://ujav.xyz";function Yt(t,e,n){let{id:o=1}=e;const r=new URLSearchParams(window.location.search),c=window.location.href.includes("/uav");let s=`Free HD Jav - Vixen - Blacked Page: ${o}`;if(r.has("search")){s=`Search: ${r.get("search").toLowerCase()} Page: ${o}`}document.title=s,document.querySelector('meta[name="description"]').setAttribute("content",`yui hatano free jav hd arina hashimoto momoka nishina karen kaede remu suzumori sora aoi ${s}`);const l=t=>{let e;if(e=c?`/uav/page/${t}`:`/jav/page/${t}`,r.has("search")){e+=`?search=${r.get("search")}`}return e},i=l(o);let a=[],u=0;const d=new XMLHttpRequest,p=o;let f=6;const m=p-p%f+1;let h=[];return d.onload=()=>{const t=JSON.parse(d.response);n(0,a=t.data),n(1,u=t.max_page),n(2,f=Math.max(1,Math.min(f,u))),n(3,h=Array.from({length:f},((t,e)=>m+e))),u<o&&(window.location.href=`${Qt}/${l(u)}`)},d.open("GET",`${Qt}/api${i}`,!0),d.setRequestHeader("Content-type","application/json"),d.send(),t.$$set=t=>{"id"in t&&n(9,o=t.id)},[a,u,f,h,c,l,t=>t>u?t%u:t,p,m,o]}class Zt extends at{constructor(t){super(),it(this,t,Yt,Xt,s,{id:9})}}function te(t,e,n){const o=t.slice();return o[5]=e[n],o}function ee(t){let e,n=t[0],o=[];for(let e=0;e<n.length;e+=1)o[e]=ce(te(t,n,e));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=E()},m(t,n){for(let e=0;e<o.length;e+=1)o[e].m(t,n);b(t,e,n)},p(t,r){if(1&r){let c;for(n=t[0],c=0;c<n.length;c+=1){const s=te(t,n,c);o[c]?o[c].p(s,r):(o[c]=ce(s),o[c].c(),o[c].m(e.parentNode,e))}for(;c<o.length;c+=1)o[c].d(1);o.length=n.length}},d(t){x(o,t),t&&w(e)}}}function ne(t){let e,n;return{c(){e=k("source"),u(e.src,n=t[0]["480p"])||A(e,"src",n),A(e,"title","480p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["480p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function oe(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["720p"])||A(e,"src",n),A(e,"title","720p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["720p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function re(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["1080p"])||A(e,"src",n),A(e,"title","1080p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["1080p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ce(t){let e,n,o,r="480p"==t[5].label&&ne(t),c="720p"==t[5].label&&oe(t),s="1080p"==t[5].label&&re(t);return{c(){r&&r.c(),e=E(),c&&c.c(),n=E(),s&&s.c(),o=E()},m(t,l){r&&r.m(t,l),b(t,e,l),c&&c.m(t,l),b(t,n,l),s&&s.m(t,l),b(t,o,l)},p(t,l){"480p"==t[5].label?r?r.p(t,l):(r=ne(t),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),"720p"==t[5].label?c?c.p(t,l):(c=oe(t),c.c(),c.m(n.parentNode,n)):c&&(c.d(1),c=null),"1080p"==t[5].label?s?s.p(t,l):(s=re(t),s.c(),s.m(o.parentNode,o)):s&&(s.d(1),s=null)},d(t){r&&r.d(t),t&&w(e),c&&c.d(t),t&&w(n),s&&s.d(t),t&&w(o)}}}function se(t){let e,n;return{c(){e=k("source"),u(e.src,n=t[0]["360p"])||A(e,"src",n),A(e,"title","360p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["360p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function le(t){let e,n;return{c(){e=k("source"),u(e.src,n=t[0]["480p"])||A(e,"src",n),A(e,"title","360p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["480p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ie(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["720p"])||A(e,"src",n),A(e,"title","720p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["720p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ae(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["1080p"])||A(e,"src",n),A(e,"title","1080p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["1080p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ue(e){let n,o,r,c,s,l,i,a,d,p,f=null!=e[0]&&e[0]instanceof Array&&ee(e),m=null!=e[0]["360p"]&&""!=e[0]["360p"]&&se(e),h=null!=e[0]["480p"]&&""!=e[0]["480p"]&&le(e),$=null!=e[0]["720p"]&&""!=e[0]["720p"]&&ie(e),g=null!=e[0]["1080p"]&&""!=e[0]["1080p"]&&ae(e);return{c(){n=k("link"),o=k("script"),c=k("style"),c.textContent="#video{width:100%;height: auto;object-fit:scale-down;}",s=_(),l=k("video"),f&&f.c(),i=E(),m&&m.c(),a=E(),h&&h.c(),d=E(),$&&$.c(),p=E(),g&&g.c(),A(n,"rel","stylesheet"),A(n,"href","https://cdn.fluidplayer.com/v2/current/fluidplayer.min.css"),A(n,"type","text/css"),u(o.src,r="https://cdn.fluidplayer.com/v2/current/fluidplayer.min.js")||A(o,"src","https://cdn.fluidplayer.com/v2/current/fluidplayer.min.js"),A(l,"id","video"),A(l,"poster",e[1]),l.controls=""},m(t,r){y(document.head,n),y(document.head,o),e[3](o),y(document.head,c),b(t,s,r),b(t,l,r),f&&f.m(l,null),y(l,i),m&&m.m(l,null),y(l,a),h&&h.m(l,null),y(l,d),$&&$.m(l,null),y(l,p),g&&g.m(l,null)},p(t,[e]){null!=t[0]&&t[0]instanceof Array?f?f.p(t,e):(f=ee(t),f.c(),f.m(l,i)):f&&(f.d(1),f=null),null!=t[0]["360p"]&&""!=t[0]["360p"]?m?m.p(t,e):(m=se(t),m.c(),m.m(l,a)):m&&(m.d(1),m=null),null!=t[0]["480p"]&&""!=t[0]["480p"]?h?h.p(t,e):(h=le(t),h.c(),h.m(l,d)):h&&(h.d(1),h=null),null!=t[0]["720p"]&&""!=t[0]["720p"]?$?$.p(t,e):($=ie(t),$.c(),$.m(l,p)):$&&($.d(1),$=null),null!=t[0]["1080p"]&&""!=t[0]["1080p"]?g?g.p(t,e):(g=ae(t),g.c(),g.m(l,null)):g&&(g.d(1),g=null),2&e&&A(l,"poster",t[1])},i:t,o:t,d(t){w(n),w(o),e[3](null),w(c),t&&w(s),t&&w(l),f&&f.d(),m&&m.d(),h&&h.d(),$&&$.d(),g&&g.d()}}}function de(t,e,n){let{sources:o}=e,{poster:r}=e;const c=R();let s;return P((async()=>{s.addEventListener("load",(()=>{c("loaded"),fluidPlayer("video",{layoutControls:{preload:!0,allowDownload:!0,primaryColor:"#f48f51",controlBar:{autoHide:!0,autoHideTimeout:5,animated:!0}},vastOptions:{allowVPAID:!0,adList:[{roll:"preRoll",vastTag:"https://www.videosprofitnetwork.com/watch.xml?key=05e16b727434e272cc6fd4f8639c28b4"}]}})})),s.addEventListener("error",(t=>{console.error("something went wrong",t),c("error")}))})),t.$$set=t=>{"sources"in t&&n(0,o=t.sources),"poster"in t&&n(1,r=t.poster)},[o,r,s,function(t){z[t?"unshift":"push"]((()=>{s=t,n(2,s)}))}]}class pe extends at{constructor(t){super(),it(this,t,de,ue,s,{sources:0,poster:1})}}const{document:fe}=nt;function me(e){let n,o,r,c,s;return{c(){n=k("style"),n.textContent="#movieplay {\n            width: 100%;\n            height: 100%;\n        }\n        #source {\n            aspect-ratio: 192/108;\n            width: 100%;\n        }",o=_(),r=k("iframe"),A(r,"id","source"),A(r,"height",e[2]()),u(r.src,c="https://smartshare.tv/v/"+e[0])||A(r,"src",c),A(r,"frameborder","0"),r.allowFullscreen=!0,V((()=>e[3].call(r)))},m(t,c){y(fe.head,n),b(t,o,c),b(t,r,c),s=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=k("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const o=C();let r;return o?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=q(window,"message",(t=>{t.source===n.contentWindow&&e()}))):(n.src="about:blank",n.onload=()=>{r=q(n.contentWindow,"resize",e)}),y(t,n),()=>{(o||r&&n.contentWindow)&&r(),w(n)}}(r,e[3].bind(r))},p(t,[e]){1&e&&!u(r.src,c="https://smartshare.tv/v/"+t[0])&&A(r,"src",c)},i:t,o:t,d(t){w(n),t&&w(o),t&&w(r),s()}}}function he(t,e,n){let o,{code:r}=e;return t.$$set=t=>{"code"in t&&n(0,r=t.code)},[r,o,()=>(o>0&&n(1,o=document.getElementById("source").offsetWidth),o/2),function(){o=this.offsetWidth,n(1,o)}]}class $e extends at{constructor(t){super(),it(this,t,he,me,s,{code:0})}}const{document:ge}=nt;function ve(t){let e,n,o,r,c,s,l,i,a,d,p,f,m,h=t[1].title+"";const $=[we,be],g=[];e=function(t,e){return t[2]?0:1}(t),n=g[e]=$[e](t);let v=null!=t[1].actor&&xe(t);return{c(){n.c(),o=_(),r=k("div"),c=k("img"),i=_(),a=k("div"),d=k("p"),p=j(h),f=_(),v&&v.c(),A(c,"id","actorImage"),u(c.src,s=t[1].icon_link)||A(c,"src",s),A(c,"alt",l=t[1].actor),A(c,"style",t[2]?"height: 6rem;":"height: 12rem;"),A(c,"class","svelte-1uk9qch"),A(d,"class","svelte-1uk9qch"),N(d,"small-text",t[1].title.length>160),A(a,"id","text"),A(a,"class","svelte-1uk9qch"),A(r,"id","info"),A(r,"class","svelte-1uk9qch")},m(t,n){g[e].m(t,n),b(t,o,n),b(t,r,n),y(r,c),y(r,i),y(r,a),y(a,d),y(d,p),y(a,f),v&&v.m(a,null),m=!0},p(t,e){n.p(t,e),(!m||2&e&&!u(c.src,s=t[1].icon_link))&&A(c,"src",s),(!m||2&e&&l!==(l=t[1].actor))&&A(c,"alt",l),(!m||2&e)&&h!==(h=t[1].title+"")&&L(p,h),2&e&&N(d,"small-text",t[1].title.length>160),null!=t[1].actor?v?v.p(t,e):(v=xe(t),v.c(),v.m(a,null)):v&&(v.d(1),v=null)},i(t){m||(tt(n),m=!0)},o(t){et(n),m=!1},d(t){g[e].d(t),t&&w(o),t&&w(r),v&&v.d()}}}function ye(e){let n;return{c(){n=k("h1"),n.textContent="Oops ! No content here",A(n,"class","svelte-1uk9qch")},m(t,e){b(t,n,e)},p:t,i:t,o:t,d(t){t&&w(n)}}}function be(t){let e,n;return e=new $e({props:{code:t[0]}}),{c(){rt(e.$$.fragment)},m(t,o){ct(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.code=t[0]),e.$set(o)},i(t){n||(tt(e.$$.fragment,t),n=!0)},o(t){et(e.$$.fragment,t),n=!1},d(t){st(e,t)}}}function we(t){let e,n;return e=new pe({props:{sources:t[1].files,poster:t[1].image_link}}),{c(){rt(e.$$.fragment)},m(t,o){ct(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.sources=t[1].files),2&n&&(o.poster=t[1].image_link),e.$set(o)},i(t){n||(tt(e.$$.fragment,t),n=!0)},o(t){et(e.$$.fragment,t),n=!1},d(t){st(e,t)}}}function xe(t){let e,n,o,r,c,s=t[1].actor+"";return{c(){e=k("a"),n=k("p"),o=j(s),A(n,"id","actorName"),A(n,"style",r=""!=t[1].actor?"background-color: #5cc2f7;":""),A(n,"class","svelte-1uk9qch"),A(e,"href",c="/jav/page/1/?search="+t[1].actor),A(e,"class","svelte-1uk9qch")},m(t,r){b(t,e,r),y(e,n),y(n,o)},p(t,l){2&l&&s!==(s=t[1].actor+"")&&L(o,s),2&l&&r!==(r=""!=t[1].actor?"background-color: #5cc2f7;":"")&&A(n,"style",r),2&l&&c!==(c="/jav/page/1/?search="+t[1].actor)&&A(e,"href",c)},d(t){t&&w(e)}}}function ke(t){let e,n,o,r,c,s,l,i,a,u,d,p;c=new Mt({props:{isUav:t[2]}});const f=[ye,ve],m=[];function h(t,e){return null==t[1]?0:1}return i=h(t),a=m[i]=f[i](t),d=new Jt({}),{c(){e=k("link"),n=k("link"),o=_(),r=k("main"),rt(c.$$.fragment),s=_(),l=k("div"),a.c(),u=_(),rt(d.$$.fragment),A(e,"rel","stylesheet"),A(e,"href","https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css"),A(n,"rel","stylesheet"),A(n,"href","https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/light.css"),A(l,"id","content"),A(l,"class","svelte-1uk9qch")},m(t,a){y(ge.head,e),y(ge.head,n),b(t,o,a),b(t,r,a),ct(c,r,null),y(r,s),y(r,l),m[i].m(l,null),y(r,u),ct(d,r,null),p=!0},p(t,[e]){let n=i;i=h(t),i===n?m[i].p(t,e):(Y(),et(m[n],1,1,(()=>{m[n]=null})),Z(),a=m[i],a?a.p(t,e):(a=m[i]=f[i](t),a.c()),tt(a,1),a.m(l,null))},i(t){p||(tt(c.$$.fragment,t),tt(a),tt(d.$$.fragment,t),p=!0)},o(t){et(c.$$.fragment,t),et(a),et(d.$$.fragment,t),p=!1},d(t){w(e),w(n),t&&w(o),t&&w(r),st(c),m[i].d(),st(d)}}}function je(t,e,n){let o,{id:r}=e;const c="ce546aedbd70c4d6ca".length==r.length,s=new XMLHttpRequest;let l;return l=c?`/uav/code/${r}`:`/jav/code/${r}`,s.onload=()=>{n(1,o=JSON.parse(s.response)),document.title=(c?"Porn - ":"JAV - ")+o.title,document.querySelector('meta[name="description"]').setAttribute("content","sex jav blacked vixen "+o.title)},s.open("GET",`https://ujav.xyz/api${l}`,!0),s.setRequestHeader("Content-type","application/json"),s.send(),t.$$set=t=>{"id"in t&&n(0,r=t.id)},[r,o,c]}class _e extends at{constructor(t){super(),it(this,t,je,ke,s,{id:0})}}function Ee(e){let n,o,r,c,s,l,i,a,u,d,p,f;return n=new Pt({props:{path:"/jav/page/:id",component:Zt}}),r=new Pt({props:{path:"/uav/page/:id",component:Zt}}),s=new Pt({props:{path:"/uav",component:Zt}}),i=new Pt({props:{path:"/jav",component:Zt}}),u=new Pt({props:{path:"/",component:Zt}}),p=new Pt({props:{path:"/play/:id",component:_e}}),{c(){rt(n.$$.fragment),o=_(),rt(r.$$.fragment),c=_(),rt(s.$$.fragment),l=_(),rt(i.$$.fragment),a=_(),rt(u.$$.fragment),d=_(),rt(p.$$.fragment)},m(t,e){ct(n,t,e),b(t,o,e),ct(r,t,e),b(t,c,e),ct(s,t,e),b(t,l,e),ct(i,t,e),b(t,a,e),ct(u,t,e),b(t,d,e),ct(p,t,e),f=!0},p:t,i(t){f||(tt(n.$$.fragment,t),tt(r.$$.fragment,t),tt(s.$$.fragment,t),tt(i.$$.fragment,t),tt(u.$$.fragment,t),tt(p.$$.fragment,t),f=!0)},o(t){et(n.$$.fragment,t),et(r.$$.fragment,t),et(s.$$.fragment,t),et(i.$$.fragment,t),et(u.$$.fragment,t),et(p.$$.fragment,t),f=!1},d(t){st(n,t),t&&w(o),st(r,t),t&&w(c),st(s,t),t&&w(l),st(i,t),t&&w(a),st(u,t),t&&w(d),st(p,t)}}}function qe(t){let e,n;return e=new qt({props:{$$slots:{default:[Ee]},$$scope:{ctx:t}}}),{c(){rt(e.$$.fragment)},m(t,o){ct(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(tt(e.$$.fragment,t),n=!0)},o(t){et(e.$$.fragment,t),n=!1},d(t){st(e,t)}}}return new class extends at{constructor(t){super(),it(this,t,null,qe,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
