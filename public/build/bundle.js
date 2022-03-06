var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function c(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let l,i,a;function u(t,e){return l||(l=document.createElement("a")),l.href=e,t===l.href}function p(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function d(t,e,n){t.$$.on_destroy.push(p(e,n))}function f(t,e,n,o){if(t){const r=m(t,e,n,o);return t[0](r)}}function m(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function h(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}function $(t,e,n,o,r,c){if(r){const s=m(e,n,o,c);t.p(s,r)}}function g(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function v(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function y(t,e){t.appendChild(e)}function b(t,e,n){t.insertBefore(e,n||null)}function w(t){t.parentNode.removeChild(t)}function x(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function k(t){return document.createElement(t)}function _(t){return document.createTextNode(t)}function j(){return _(" ")}function q(){return _("")}function E(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function A(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function L(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function S(t,e,n,o){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function T(){if(void 0===i){i=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){i=!0}}return i}function N(t,e,n){t.classList[n?"add":"remove"](e)}function O(t){a=t}function P(){if(!a)throw new Error("Function called outside component initialization");return a}function C(t){P().$$.on_mount.push(t)}function R(){const t=P();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}function U(t,e){P().$$.context.set(t,e)}function M(t){return P().$$.context.get(t)}const H=[],z=[],I=[],J=[],V=Promise.resolve();let B=!1;function K(t){I.push(t)}const W=new Set;let F=0;function D(){const t=a;do{for(;F<H.length;){const t=H[F];F++,O(t),G(t.$$)}for(O(null),H.length=0,F=0;z.length;)z.pop()();for(let t=0;t<I.length;t+=1){const e=I[t];W.has(e)||(W.add(e),e())}I.length=0}while(H.length);for(;J.length;)J.pop()();B=!1,W.clear(),O(t)}function G(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(K)}}const X=new Set;let Q;function Y(){Q={r:0,c:[],p:Q}}function Z(){Q.r||r(Q.c),Q=Q.p}function tt(t,e){t&&t.i&&(X.delete(t),t.i(e))}function et(t,e,n,o){if(t&&t.o){if(X.has(t))return;X.add(t),Q.c.push((()=>{X.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const nt="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function ot(t){return"object"==typeof t&&null!==t?t:{}}function rt(t){t&&t.c()}function ct(t,e,o,s){const{fragment:l,on_mount:i,on_destroy:a,after_update:u}=t.$$;l&&l.m(e,o),s||K((()=>{const e=i.map(n).filter(c);a?a.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(K)}function st(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function lt(t,e){-1===t.$$.dirty[0]&&(H.push(t),B||(B=!0,V.then(D)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function it(e,n,c,s,l,i,u,p=[-1]){const d=a;O(e);const f=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:l,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:p,skip_bound:!1,root:n.target||d.$$.root};u&&u(f.root);let m=!1;if(f.ctx=c?c(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&l(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),m&&lt(e,t)),n})):[],f.update(),m=!0,r(f.before_update),f.fragment=!!s&&s(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(w)}else f.fragment&&f.fragment.c();n.intro&&tt(e.$$.fragment),ct(e,n.target,n.anchor,n.customElement),D()}O(d)}class at{$destroy(){st(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ut=[];function pt(e,n=t){let o;const r=new Set;function c(t){if(s(e,t)&&(e=t,o)){const t=!ut.length;for(const t of r)t[1](),ut.push(t,e);if(t){for(let t=0;t<ut.length;t+=2)ut[t][0](ut[t+1]);ut.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(s,l=t){const i=[s,l];return r.add(i),1===r.size&&(o=n(c)||t),s(e),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}function dt(e,n,o){const s=!Array.isArray(e),l=s?[e]:e,i=n.length<2;return a=e=>{let o=!1;const a=[];let u=0,d=t;const f=()=>{if(u)return;d();const o=n(s?a[0]:a,e);i?e(o):d=c(o)?o:t},m=l.map(((t,e)=>p(t,(t=>{a[e]=t,u&=~(1<<e),o&&f()}),(()=>{u|=1<<e}))));return o=!0,f(),function(){r(m),d()}},{subscribe:pt(o,a).subscribe};var a}const ft={},mt={};function ht(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const $t=function(t,e){const n=[];let o=ht(t);return{get location(){return o},listen(e){n.push(e);const r=()=>{o=ht(t),e({location:o,action:"POP"})};return t.addEventListener("popstate",r),()=>{t.removeEventListener("popstate",r);const o=n.indexOf(e);n.splice(o,1)}},navigate(e,{state:r,replace:c=!1}={}){r={...r,key:Date.now()+""};try{c?t.history.replaceState(r,null,e):t.history.pushState(r,null,e)}catch(n){t.location[c?"replace":"assign"](e)}o=ht(t),n.forEach((t=>t({location:o,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let e=0;const n=[{pathname:t,search:""}],o=[];return{get location(){return n[e]},addEventListener(t,e){},removeEventListener(t,e){},history:{get entries(){return n},get index(){return e},get state(){return o[e]},pushState(t,r,c){const[s,l=""]=c.split("?");e++,n.push({pathname:s,search:l}),o.push(t)},replaceState(t,r,c){const[s,l=""]=c.split("?");n[e]={pathname:s,search:l},o[e]=t}}}}()),{navigate:gt}=$t,vt=/^:(.+)/;function yt(t){return"*"===t[0]}function bt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function wt(t){return t.replace(/(^\/+|\/+$)/g,"")}function xt(t,e){return{route:t,score:t.default?0:bt(t.path).reduce(((t,e)=>(t+=4,!function(t){return""===t}(e)?!function(t){return vt.test(t)}(e)?yt(e)?t-=5:t+=3:t+=2:t+=1,t)),0),index:e}}function kt(t,e){let n,o;const[r]=e.split("?"),c=bt(r),s=""===c[0],l=function(t){return t.map(xt).sort(((t,e)=>t.score<e.score?1:t.score>e.score?-1:t.index-e.index))}(t);for(let t=0,r=l.length;t<r;t++){const r=l[t].route;let i=!1;if(r.default){o={route:r,params:{},uri:e};continue}const a=bt(r.path),u={},p=Math.max(c.length,a.length);let d=0;for(;d<p;d++){const t=a[d],e=c[d];if(void 0!==t&&yt(t)){u["*"===t?"*":t.slice(1)]=c.slice(d).map(decodeURIComponent).join("/");break}if(void 0===e){i=!0;break}let n=vt.exec(t);if(n&&!s){const t=decodeURIComponent(e);u[n[1]]=t}else if(t!==e){i=!0;break}}if(!i){n={route:r,params:u,uri:"/"+c.slice(0,d).join("/")};break}}return n||o||null}function _t(t,e){return`${wt("/"===e?t:`${wt(t)}/${wt(e)}`)}/`}function jt(t){let e;const n=t[9].default,o=f(n,t,t[8],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,[r]){o&&o.p&&(!e||256&r)&&$(o,n,t,t[8],e?h(n,t[8],r,null):g(t[8]),null)},i(t){e||(tt(o,t),e=!0)},o(t){et(o,t),e=!1},d(t){o&&o.d(t)}}}function qt(t,e,n){let o,r,c,{$$slots:s={},$$scope:l}=e,{basepath:i="/"}=e,{url:a=null}=e;const u=M(ft),p=M(mt),f=pt([]);d(t,f,(t=>n(6,r=t)));const m=pt(null);let h=!1;const $=u||pt(a?{pathname:a}:$t.location);d(t,$,(t=>n(5,o=t)));const g=p?p.routerBase:pt({path:i,uri:i});d(t,g,(t=>n(7,c=t)));const v=dt([g,m],(([t,e])=>{if(null===e)return t;const{path:n}=t,{route:o,uri:r}=e;return{path:o.default?n:o.path.replace(/\*.*$/,""),uri:r}}));return u||(C((()=>$t.listen((t=>{$.set(t.location)})))),U(ft,$)),U(mt,{activeRoute:m,base:g,routerBase:v,registerRoute:function(t){const{path:e}=c;let{path:n}=t;if(t._path=n,t.path=_t(e,n),"undefined"==typeof window){if(h)return;const e=function(t,e){return kt([t],e)}(t,o.pathname);e&&(m.set(e),h=!0)}else f.update((e=>(e.push(t),e)))},unregisterRoute:function(t){f.update((e=>{const n=e.indexOf(t);return e.splice(n,1),e}))}}),t.$$set=t=>{"basepath"in t&&n(3,i=t.basepath),"url"in t&&n(4,a=t.url),"$$scope"in t&&n(8,l=t.$$scope)},t.$$.update=()=>{if(128&t.$$.dirty){const{path:t}=c;f.update((e=>(e.forEach((e=>e.path=_t(t,e._path))),e)))}if(96&t.$$.dirty){const t=kt(r,o.pathname);m.set(t)}},[f,$,g,i,a,o,r,c,l,s]}class Et extends at{constructor(t){super(),it(this,t,qt,jt,s,{basepath:3,url:4})}}const At=t=>({params:4&t,location:16&t}),Lt=t=>({params:t[2],location:t[4]});function St(t){let e,n,o,r;const c=[Nt,Tt],s=[];function l(t,e){return null!==t[0]?0:1}return e=l(t),n=s[e]=c[e](t),{c(){n.c(),o=q()},m(t,n){s[e].m(t,n),b(t,o,n),r=!0},p(t,r){let i=e;e=l(t),e===i?s[e].p(t,r):(Y(),et(s[i],1,1,(()=>{s[i]=null})),Z(),n=s[e],n?n.p(t,r):(n=s[e]=c[e](t),n.c()),tt(n,1),n.m(o.parentNode,o))},i(t){r||(tt(n),r=!0)},o(t){et(n),r=!1},d(t){s[e].d(t),t&&w(o)}}}function Tt(t){let e;const n=t[10].default,o=f(n,t,t[9],Lt);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,r){o&&o.p&&(!e||532&r)&&$(o,n,t,t[9],e?h(n,t[9],r,At):g(t[9]),Lt)},i(t){e||(tt(o,t),e=!0)},o(t){et(o,t),e=!1},d(t){o&&o.d(t)}}}function Nt(t){let n,o,r;const c=[{location:t[4]},t[2],t[3]];var s=t[0];function l(t){let n={};for(let t=0;t<c.length;t+=1)n=e(n,c[t]);return{props:n}}return s&&(n=new s(l())),{c(){n&&rt(n.$$.fragment),o=q()},m(t,e){n&&ct(n,t,e),b(t,o,e),r=!0},p(t,e){const r=28&e?function(t,e){const n={},o={},r={$$scope:1};let c=t.length;for(;c--;){const s=t[c],l=e[c];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)r[t]||(n[t]=l[t],r[t]=1);t[c]=l}else for(const t in s)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(c,[16&e&&{location:t[4]},4&e&&ot(t[2]),8&e&&ot(t[3])]):{};if(s!==(s=t[0])){if(n){Y();const t=n;et(t.$$.fragment,1,0,(()=>{st(t,1)})),Z()}s?(n=new s(l()),rt(n.$$.fragment),tt(n.$$.fragment,1),ct(n,o.parentNode,o)):n=null}else s&&n.$set(r)},i(t){r||(n&&tt(n.$$.fragment,t),r=!0)},o(t){n&&et(n.$$.fragment,t),r=!1},d(t){t&&w(o),n&&st(n,t)}}}function Ot(t){let e,n,o=null!==t[1]&&t[1].route===t[7]&&St(t);return{c(){o&&o.c(),e=q()},m(t,r){o&&o.m(t,r),b(t,e,r),n=!0},p(t,[n]){null!==t[1]&&t[1].route===t[7]?o?(o.p(t,n),2&n&&tt(o,1)):(o=St(t),o.c(),tt(o,1),o.m(e.parentNode,e)):o&&(Y(),et(o,1,1,(()=>{o=null})),Z())},i(t){n||(tt(o),n=!0)},o(t){et(o),n=!1},d(t){o&&o.d(t),t&&w(e)}}}function Pt(t,n,o){let r,c,{$$slots:s={},$$scope:l}=n,{path:i=""}=n,{component:a=null}=n;const{registerRoute:u,unregisterRoute:p,activeRoute:f}=M(mt);d(t,f,(t=>o(1,r=t)));const m=M(ft);d(t,m,(t=>o(4,c=t)));const h={path:i,default:""===i};let $={},g={};var y;return u(h),"undefined"!=typeof window&&(y=()=>{p(h)},P().$$.on_destroy.push(y)),t.$$set=t=>{o(13,n=e(e({},n),v(t))),"path"in t&&o(8,i=t.path),"component"in t&&o(0,a=t.component),"$$scope"in t&&o(9,l=t.$$scope)},t.$$.update=()=>{2&t.$$.dirty&&r&&r.route===h&&o(2,$=r.params);{const{path:t,component:e,...r}=n;o(3,g=r)}},n=v(n),[a,r,$,g,c,f,m,h,i,l,s]}class Ct extends at{constructor(t){super(),it(this,t,Pt,Ot,s,{path:8,component:0})}}function Rt(t){function e(t){const e=t.currentTarget;""===e.target&&function(t){const e=location.host;return t.host==e||0===t.href.indexOf(`https://${e}`)||0===t.href.indexOf(`http://${e}`)}(e)&&function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)&&(t.preventDefault(),gt(e.pathname+e.search,{replace:e.hasAttribute("replace")}))}return t.addEventListener("click",e),{destroy(){t.removeEventListener("click",e)}}}function Ut(e){let n,o,r,c,s,l,i,a,u,p,d,f,m,h,$,g,v,x;return{c(){n=k("link"),o=k("html"),r=j(),c=k("div"),s=k("a"),s.innerHTML='<img id="logo" src="/logo.png" alt="UJAV" class="svelte-1lbqpdk"/>',l=j(),i=k("a"),a=_(" JAV "),u=j(),p=k("a"),d=_(" UAV "),f=j(),m=k("div"),h=k("form"),$=k("input"),g=j(),v=k("button"),v.innerHTML='<i class="fa fa-search svelte-1lbqpdk"></i>',A(n,"rel","stylesheet"),A(n,"href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"),A(n,"class","svelte-1lbqpdk"),A(o,"lang","en"),A(o,"class","svelte-1lbqpdk"),A(s,"href","/"),A(s,"class","svelte-1lbqpdk"),A(i,"href","/jav"),A(i,"class","option svelte-1lbqpdk"),S(i,"color",e[0]?"":"#f48f51"),A(p,"href","/uav"),A(p,"class","option svelte-1lbqpdk"),S(p,"color",e[0]?"#f48f51":""),A($,"type","text"),A($,"placeholder","Search..."),A($,"name","search"),A($,"class","svelte-1lbqpdk"),A(v,"type","submit"),A(v,"class","svelte-1lbqpdk"),A(h,"action",x="/"+(e[0]?"uav":"jav")+"/page/1"),A(h,"class","svelte-1lbqpdk"),A(m,"class","search-container svelte-1lbqpdk"),A(c,"class","topnav svelte-1lbqpdk")},m(t,e){y(document.head,n),y(document.head,o),b(t,r,e),b(t,c,e),y(c,s),y(c,l),y(c,i),y(i,a),y(c,u),y(c,p),y(p,d),y(c,f),y(c,m),y(m,h),y(h,$),y(h,g),y(h,v)},p(t,[e]){1&e&&S(i,"color",t[0]?"":"#f48f51"),1&e&&S(p,"color",t[0]?"#f48f51":""),1&e&&x!==(x="/"+(t[0]?"uav":"jav")+"/page/1")&&A(h,"action",x)},i:t,o:t,d(t){w(n),w(o),t&&w(r),t&&w(c)}}}function Mt(t,e,n){let{isUav:o=window.location.href.includes("/uav")}=e;return t.$$set=t=>{"isUav"in t&&n(0,o=t.isUav)},[o]}class Ht extends at{constructor(t){super(),it(this,t,Mt,Ut,s,{isUav:0})}}function zt(e){let n,o;return{c(){n=j(),o=k("footer"),o.innerHTML='<script async="async" data-cfasync="false" src="//baggageconservationcaught.com/d52c7e07291ada6e0f33e1886e00777b/invoke.js"><\/script> \n    <div id="contact" class="svelte-1sqlycp"><h4>Telegram: <a href="https://t.me/ujav_xyz">https://t.me/+b26KKnyfTuxmOGE9</a></h4></div> \n    <div id="container-d52c7e07291ada6e0f33e1886e00777b"></div> \n    <div id="term" class="svelte-1sqlycp">Terms of Use: This Website Is For People 18 And Over Only</div>'},m(t,e){b(t,n,e),b(t,o,e)},p:t,i:t,o:t,d(t){t&&w(n),t&&w(o)}}}class It extends at{constructor(t){super(),it(this,t,null,zt,s,{})}}function Jt(t,e,n){const o=t.slice();return o[15]=e[n],o}function Vt(t,e,n){const o=t.slice();return o[18]=e[n],o}function Bt(t){let e,n,o=t[18].actor+"";return{c(){e=k("p2"),n=_(o),A(e,"id","actorName"),A(e,"class","svelte-1b654du")},m(t,o){b(t,e,o),y(e,n)},p(t,e){1&e&&o!==(o=t[18].actor+"")&&L(n,o)},d(t){t&&w(e)}}}function Kt(e){let n,o,r,s,l,i,a,p,d,f,m,h,$,g,v,x,q=(e[4]?e[18].title:e[18].title.split(" ")[0])+"",E=null!=e[18].actor&&Bt(e);return{c(){n=k("a"),o=k("div"),r=k("img"),i=j(),a=k("p1"),p=_(q),d=j(),f=k("br"),m=j(),E&&E.c(),h=j(),A(r,"id","actorImage"),u(r.src,s=e[18].icon_link)||A(r,"src",s),A(r,"alt","profile image"),A(r,"style",l=e[4]?"height: 7rem":""),A(r,"class","svelte-1b654du"),A(a,"class","title svelte-1b654du"),A(o,"class","container svelte-1b654du"),A(n,"href",$="/play/"+e[18].code),A(n,"class","svelte-1b654du")},m(e,s){var l;b(e,n,s),y(n,o),y(o,r),y(o,i),y(o,a),y(a,p),y(o,d),y(o,f),y(o,m),E&&E.m(o,null),y(n,h),v||(l=g=Rt.call(null,n),x=l&&c(l.destroy)?l.destroy:t,v=!0)},p(t,e){1&e&&!u(r.src,s=t[18].icon_link)&&A(r,"src",s),1&e&&q!==(q=(t[4]?t[18].title:t[18].title.split(" ")[0])+"")&&L(p,q),null!=t[18].actor?E?E.p(t,e):(E=Bt(t),E.c(),E.m(o,null)):E&&(E.d(1),E=null),1&e&&$!==($="/play/"+t[18].code)&&A(n,"href",$)},d(t){t&&w(n),E&&E.d(),v=!1,x()}}}function Wt(t){let e,n,o,r,c,s,l,i,a,u=t[3],p=[];for(let e=0;e<u.length;e+=1)p[e]=Ft(Jt(t,u,e));return{c(){e=k("div"),n=k("a"),o=_("«"),c=j();for(let t=0;t<p.length;t+=1)p[t].c();s=j(),l=k("a"),i=_("»"),A(n,"href",r=""+(Gt+t[5](t[8]-t[2]<0?t[1]-t[2]+1:t[8]-t[2]))),A(n,"class","svelte-1b654du"),A(l,"href",a=""+(Gt+t[5](t[8]+t[2]>t[1]?1:t[8]+t[2]))),A(l,"class","svelte-1b654du"),A(e,"class","pagination svelte-1b654du")},m(t,r){b(t,e,r),y(e,n),y(n,o),y(e,c);for(let t=0;t<p.length;t+=1)p[t].m(e,null);y(e,s),y(e,l),y(l,i)},p(t,o){if(6&o&&r!==(r=""+(Gt+t[5](t[8]-t[2]<0?t[1]-t[2]+1:t[8]-t[2])))&&A(n,"href",r),232&o){let n;for(u=t[3],n=0;n<u.length;n+=1){const r=Jt(t,u,n);p[n]?p[n].p(r,o):(p[n]=Ft(r),p[n].c(),p[n].m(e,s))}for(;n<p.length;n+=1)p[n].d(1);p.length=u.length}6&o&&a!==(a=""+(Gt+t[5](t[8]+t[2]>t[1]?1:t[8]+t[2])))&&A(l,"href",a)},d(t){t&&w(e),x(p,t)}}}function Ft(t){let e,n,o,r=t[6](t[15])+"";return{c(){e=k("a"),n=_(r),A(e,"href",o=""+(Gt+t[5](t[6](t[15])))),A(e,"class","svelte-1b654du"),N(e,"active",t[15]==t[7]),N(e,"small-text",t[15]>100)},m(t,o){b(t,e,o),y(e,n)},p(t,c){8&c&&r!==(r=t[6](t[15])+"")&&L(n,r),8&c&&o!==(o=""+(Gt+t[5](t[6](t[15]))))&&A(e,"href",o),136&c&&N(e,"active",t[15]==t[7]),8&c&&N(e,"small-text",t[15]>100)},d(t){t&&w(e)}}}function Dt(t){let e,n,o,r,c,s,l,i;n=new Ht({});let a=t[0],u=[];for(let e=0;e<a.length;e+=1)u[e]=Kt(Vt(t,a,e));let p=0!=t[0].length&&Wt(t);return l=new It({}),{c(){e=k("main"),rt(n.$$.fragment),o=j(),r=k("div");for(let t=0;t<u.length;t+=1)u[t].c();c=j(),p&&p.c(),s=j(),rt(l.$$.fragment),A(r,"id","wrapper-grid"),A(r,"style",t[4]?"grid-template-columns: repeat(auto-fit, 12rem)":""),A(r,"class","svelte-1b654du")},m(t,a){b(t,e,a),ct(n,e,null),y(e,o),y(e,r);for(let t=0;t<u.length;t+=1)u[t].m(r,null);y(e,c),p&&p.m(e,null),y(e,s),ct(l,e,null),i=!0},p(t,[n]){if(17&n){let e;for(a=t[0],e=0;e<a.length;e+=1){const o=Vt(t,a,e);u[e]?u[e].p(o,n):(u[e]=Kt(o),u[e].c(),u[e].m(r,null))}for(;e<u.length;e+=1)u[e].d(1);u.length=a.length}0!=t[0].length?p?p.p(t,n):(p=Wt(t),p.c(),p.m(e,s)):p&&(p.d(1),p=null)},i(t){i||(tt(n.$$.fragment,t),tt(l.$$.fragment,t),i=!0)},o(t){et(n.$$.fragment,t),et(l.$$.fragment,t),i=!1},d(t){t&&w(e),st(n),x(u,t),p&&p.d(),st(l)}}}const Gt="https://ujav.xyz";function Xt(t,e,n){let{id:o=1}=e;const r=new URLSearchParams(window.location.search),c=window.location.href.includes("/uav"),s=c?"Free Porn":"Free Jav";let l=`UJAV - ${s} Page: ${o}`;if(r.has("search")){const t=r.get("search");l=`UJAV - ${s} Page: ${o} Search: ${t}`}document.title=l,document.querySelector('meta[name="description"]').setAttribute("content",l);const i=t=>{let e;if(e=c?`/uav/page/${t}`:`/jav/page/${t}`,r.has("search")){e+=`?search=${r.get("search")}`}return e},a=i(o);let u=[],p=0;const d=new XMLHttpRequest,f=o;let m=6;const h=f-f%m+1;let $=[];return d.onload=()=>{const t=JSON.parse(d.response);n(0,u=t.data),n(1,p=t.max_page),n(2,m=Math.max(1,Math.min(m,p))),n(3,$=Array.from({length:m},((t,e)=>h+e))),p<o&&(window.location.href=`${Gt}/${i(p)}`)},d.open("GET",`${Gt}/api${a}`,!0),d.setRequestHeader("Content-type","application/json"),d.send(),t.$$set=t=>{"id"in t&&n(9,o=t.id)},[u,p,m,$,c,i,t=>t>p?t%p:t,f,h,o]}class Qt extends at{constructor(t){super(),it(this,t,Xt,Dt,s,{id:9})}}function Yt(t,e,n){const o=t.slice();return o[5]=e[n],o}function Zt(t){let e,n=t[0],o=[];for(let e=0;e<n.length;e+=1)o[e]=oe(Yt(t,n,e));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=q()},m(t,n){for(let e=0;e<o.length;e+=1)o[e].m(t,n);b(t,e,n)},p(t,r){if(1&r){let c;for(n=t[0],c=0;c<n.length;c+=1){const s=Yt(t,n,c);o[c]?o[c].p(s,r):(o[c]=oe(s),o[c].c(),o[c].m(e.parentNode,e))}for(;c<o.length;c+=1)o[c].d(1);o.length=n.length}},d(t){x(o,t),t&&w(e)}}}function te(t){let e,n;return{c(){e=k("source"),u(e.src,n=t[0]["480p"])||A(e,"src",n),A(e,"title","480p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["480p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ee(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["720p"])||A(e,"src",n),A(e,"title","720p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["720p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ne(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["1080p"])||A(e,"src",n),A(e,"title","1080p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["1080p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function oe(t){let e,n,o,r="480p"==t[5].label&&te(t),c="720p"==t[5].label&&ee(t),s="1080p"==t[5].label&&ne(t);return{c(){r&&r.c(),e=q(),c&&c.c(),n=q(),s&&s.c(),o=q()},m(t,l){r&&r.m(t,l),b(t,e,l),c&&c.m(t,l),b(t,n,l),s&&s.m(t,l),b(t,o,l)},p(t,l){"480p"==t[5].label?r?r.p(t,l):(r=te(t),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),"720p"==t[5].label?c?c.p(t,l):(c=ee(t),c.c(),c.m(n.parentNode,n)):c&&(c.d(1),c=null),"1080p"==t[5].label?s?s.p(t,l):(s=ne(t),s.c(),s.m(o.parentNode,o)):s&&(s.d(1),s=null)},d(t){r&&r.d(t),t&&w(e),c&&c.d(t),t&&w(n),s&&s.d(t),t&&w(o)}}}function re(t){let e,n;return{c(){e=k("source"),u(e.src,n=t[0]["360p"])||A(e,"src",n),A(e,"title","360p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["360p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ce(t){let e,n;return{c(){e=k("source"),u(e.src,n=t[0]["480p"])||A(e,"src",n),A(e,"title","360p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["480p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function se(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["720p"])||A(e,"src",n),A(e,"title","720p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["720p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function le(t){let e,n;return{c(){e=k("source"),A(e,"data-fluid-hd",""),u(e.src,n=t[0]["1080p"])||A(e,"src",n),A(e,"title","1080p"),A(e,"type","video/mp4")},m(t,n){b(t,e,n)},p(t,o){1&o&&!u(e.src,n=t[0]["1080p"])&&A(e,"src",n)},d(t){t&&w(e)}}}function ie(e){let n,o,r,c,s,l,i,a,p,d,f=null!=e[0]&&e[0]instanceof Array&&Zt(e),m=null!=e[0]["360p"]&&""!=e[0]["360p"]&&re(e),h=null!=e[0]["480p"]&&""!=e[0]["480p"]&&ce(e),$=null!=e[0]["720p"]&&""!=e[0]["720p"]&&se(e),g=null!=e[0]["1080p"]&&""!=e[0]["1080p"]&&le(e);return{c(){n=k("link"),o=k("script"),c=k("style"),c.textContent="#video{width:100%;height: auto;object-fit:scale-down;}",s=j(),l=k("video"),f&&f.c(),i=q(),m&&m.c(),a=q(),h&&h.c(),p=q(),$&&$.c(),d=q(),g&&g.c(),A(n,"rel","stylesheet"),A(n,"href","https://cdn.fluidplayer.com/v2/current/fluidplayer.min.css"),A(n,"type","text/css"),u(o.src,r="https://cdn.fluidplayer.com/v2/current/fluidplayer.min.js")||A(o,"src","https://cdn.fluidplayer.com/v2/current/fluidplayer.min.js"),A(l,"id","video"),A(l,"poster",e[1]),l.controls=""},m(t,r){y(document.head,n),y(document.head,o),e[3](o),y(document.head,c),b(t,s,r),b(t,l,r),f&&f.m(l,null),y(l,i),m&&m.m(l,null),y(l,a),h&&h.m(l,null),y(l,p),$&&$.m(l,null),y(l,d),g&&g.m(l,null)},p(t,[e]){null!=t[0]&&t[0]instanceof Array?f?f.p(t,e):(f=Zt(t),f.c(),f.m(l,i)):f&&(f.d(1),f=null),null!=t[0]["360p"]&&""!=t[0]["360p"]?m?m.p(t,e):(m=re(t),m.c(),m.m(l,a)):m&&(m.d(1),m=null),null!=t[0]["480p"]&&""!=t[0]["480p"]?h?h.p(t,e):(h=ce(t),h.c(),h.m(l,p)):h&&(h.d(1),h=null),null!=t[0]["720p"]&&""!=t[0]["720p"]?$?$.p(t,e):($=se(t),$.c(),$.m(l,d)):$&&($.d(1),$=null),null!=t[0]["1080p"]&&""!=t[0]["1080p"]?g?g.p(t,e):(g=le(t),g.c(),g.m(l,null)):g&&(g.d(1),g=null),2&e&&A(l,"poster",t[1])},i:t,o:t,d(t){w(n),w(o),e[3](null),w(c),t&&w(s),t&&w(l),f&&f.d(),m&&m.d(),h&&h.d(),$&&$.d(),g&&g.d()}}}function ae(t,e,n){let{sources:o}=e,{poster:r}=e;const c=R();let s;return C((async()=>{s.addEventListener("load",(()=>{c("loaded"),fluidPlayer("video",{layoutControls:{preload:!0,allowDownload:!0,primaryColor:"#f48f51",controlBar:{autoHide:!0,autoHideTimeout:5,animated:!0}},vastOptions:{allowVPAID:!0,adList:[{roll:"preRoll",vastTag:"https://www.videosprofitnetwork.com/watch.xml?key=05e16b727434e272cc6fd4f8639c28b4"}]}})})),s.addEventListener("error",(t=>{console.error("something went wrong",t),c("error")}))})),t.$$set=t=>{"sources"in t&&n(0,o=t.sources),"poster"in t&&n(1,r=t.poster)},[o,r,s,function(t){z[t?"unshift":"push"]((()=>{s=t,n(2,s)}))}]}class ue extends at{constructor(t){super(),it(this,t,ae,ie,s,{sources:0,poster:1})}}const{document:pe}=nt;function de(e){let n,o,r,c,s;return{c(){n=k("style"),n.textContent="#movieplay {\n            width: 100%;\n            height: 100%;\n        }\n        #source {\n            aspect-ratio: 192/108;\n            width: 100%;\n        }",o=j(),r=k("iframe"),A(r,"id","source"),A(r,"height",e[2]()),u(r.src,c="https://smartshare.tv/v/"+e[0])||A(r,"src",c),A(r,"frameborder","0"),r.allowFullscreen=!0,K((()=>e[3].call(r)))},m(t,c){y(pe.head,n),b(t,o,c),b(t,r,c),s=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=k("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const o=T();let r;return o?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=E(window,"message",(t=>{t.source===n.contentWindow&&e()}))):(n.src="about:blank",n.onload=()=>{r=E(n.contentWindow,"resize",e)}),y(t,n),()=>{(o||r&&n.contentWindow)&&r(),w(n)}}(r,e[3].bind(r))},p(t,[e]){1&e&&!u(r.src,c="https://smartshare.tv/v/"+t[0])&&A(r,"src",c)},i:t,o:t,d(t){w(n),t&&w(o),t&&w(r),s()}}}function fe(t,e,n){let o,{code:r}=e;return t.$$set=t=>{"code"in t&&n(0,r=t.code)},[r,o,()=>(o>0&&n(1,o=document.getElementById("source").offsetWidth),o/2),function(){o=this.offsetWidth,n(1,o)}]}class me extends at{constructor(t){super(),it(this,t,fe,de,s,{code:0})}}const{document:he}=nt;function $e(t){let e,n,o,r,c,s,l,i,a,p,d,f,m,h=t[1].title+"";const $=[ye,ve],g=[];e=function(t,e){return t[2]?0:1}(t),n=g[e]=$[e](t);let v=null!=t[1].actor&&be(t);return{c(){n.c(),o=j(),r=k("div"),c=k("img"),i=j(),a=k("div"),p=k("p"),d=_(h),f=j(),v&&v.c(),A(c,"id","actorImage"),u(c.src,s=t[1].icon_link)||A(c,"src",s),A(c,"alt",l=t[1].actor),A(c,"style",t[2]?"height: 6rem;":"height: 12rem;"),A(c,"class","svelte-1uk9qch"),A(p,"class","svelte-1uk9qch"),N(p,"small-text",t[1].title.length>160),A(a,"id","text"),A(a,"class","svelte-1uk9qch"),A(r,"id","info"),A(r,"class","svelte-1uk9qch")},m(t,n){g[e].m(t,n),b(t,o,n),b(t,r,n),y(r,c),y(r,i),y(r,a),y(a,p),y(p,d),y(a,f),v&&v.m(a,null),m=!0},p(t,e){n.p(t,e),(!m||2&e&&!u(c.src,s=t[1].icon_link))&&A(c,"src",s),(!m||2&e&&l!==(l=t[1].actor))&&A(c,"alt",l),(!m||2&e)&&h!==(h=t[1].title+"")&&L(d,h),2&e&&N(p,"small-text",t[1].title.length>160),null!=t[1].actor?v?v.p(t,e):(v=be(t),v.c(),v.m(a,null)):v&&(v.d(1),v=null)},i(t){m||(tt(n),m=!0)},o(t){et(n),m=!1},d(t){g[e].d(t),t&&w(o),t&&w(r),v&&v.d()}}}function ge(e){let n;return{c(){n=k("h1"),n.textContent="Oops ! No content here",A(n,"class","svelte-1uk9qch")},m(t,e){b(t,n,e)},p:t,i:t,o:t,d(t){t&&w(n)}}}function ve(t){let e,n;return e=new me({props:{code:t[0]}}),{c(){rt(e.$$.fragment)},m(t,o){ct(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.code=t[0]),e.$set(o)},i(t){n||(tt(e.$$.fragment,t),n=!0)},o(t){et(e.$$.fragment,t),n=!1},d(t){st(e,t)}}}function ye(t){let e,n;return e=new ue({props:{sources:t[1].files,poster:t[1].image_link}}),{c(){rt(e.$$.fragment)},m(t,o){ct(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.sources=t[1].files),2&n&&(o.poster=t[1].image_link),e.$set(o)},i(t){n||(tt(e.$$.fragment,t),n=!0)},o(t){et(e.$$.fragment,t),n=!1},d(t){st(e,t)}}}function be(t){let e,n,o,r,c,s=t[1].actor+"";return{c(){e=k("a"),n=k("p"),o=_(s),A(n,"id","actorName"),A(n,"style",r=""!=t[1].actor?"background-color: #5cc2f7;":""),A(n,"class","svelte-1uk9qch"),A(e,"href",c="/jav/page/1/?search="+t[1].actor),A(e,"class","svelte-1uk9qch")},m(t,r){b(t,e,r),y(e,n),y(n,o)},p(t,l){2&l&&s!==(s=t[1].actor+"")&&L(o,s),2&l&&r!==(r=""!=t[1].actor?"background-color: #5cc2f7;":"")&&A(n,"style",r),2&l&&c!==(c="/jav/page/1/?search="+t[1].actor)&&A(e,"href",c)},d(t){t&&w(e)}}}function we(t){let e,n,o,r,c,s,l,i,a,u,p,d;c=new Ht({props:{isUav:t[2]}});const f=[ge,$e],m=[];function h(t,e){return null==t[1]?0:1}return i=h(t),a=m[i]=f[i](t),p=new It({}),{c(){e=k("link"),n=k("link"),o=j(),r=k("main"),rt(c.$$.fragment),s=j(),l=k("div"),a.c(),u=j(),rt(p.$$.fragment),A(e,"rel","stylesheet"),A(e,"href","https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css"),A(n,"rel","stylesheet"),A(n,"href","https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/light.css"),A(l,"id","content"),A(l,"class","svelte-1uk9qch")},m(t,a){y(he.head,e),y(he.head,n),b(t,o,a),b(t,r,a),ct(c,r,null),y(r,s),y(r,l),m[i].m(l,null),y(r,u),ct(p,r,null),d=!0},p(t,[e]){let n=i;i=h(t),i===n?m[i].p(t,e):(Y(),et(m[n],1,1,(()=>{m[n]=null})),Z(),a=m[i],a?a.p(t,e):(a=m[i]=f[i](t),a.c()),tt(a,1),a.m(l,null))},i(t){d||(tt(c.$$.fragment,t),tt(a),tt(p.$$.fragment,t),d=!0)},o(t){et(c.$$.fragment,t),et(a),et(p.$$.fragment,t),d=!1},d(t){w(e),w(n),t&&w(o),t&&w(r),st(c),m[i].d(),st(p)}}}function xe(t,e,n){let o,{id:r}=e;const c="ce546aedbd70c4d6ca".length==r.length,s=new XMLHttpRequest;let l;return l=c?`/uav/code/${r}`:`/jav/code/${r}`,s.onload=()=>{n(1,o=JSON.parse(s.response)),document.title=(c?"Porn - ":"JAV - ")+o.title,document.querySelector('meta[name="description"]').setAttribute("content","sex jav blacked vixen "+o.title)},s.open("GET",`https://ujav.xyz/api${l}`,!0),s.setRequestHeader("Content-type","application/json"),s.send(),t.$$set=t=>{"id"in t&&n(0,r=t.id)},[r,o,c]}class ke extends at{constructor(t){super(),it(this,t,xe,we,s,{id:0})}}function _e(e){let n,o,r,c,s,l,i,a,u,p,d,f;return n=new Ct({props:{path:"/jav/page/:id",component:Qt}}),r=new Ct({props:{path:"/uav/page/:id",component:Qt}}),s=new Ct({props:{path:"/uav",component:Qt}}),i=new Ct({props:{path:"/jav",component:Qt}}),u=new Ct({props:{path:"/",component:Qt}}),d=new Ct({props:{path:"/play/:id",component:ke}}),{c(){rt(n.$$.fragment),o=j(),rt(r.$$.fragment),c=j(),rt(s.$$.fragment),l=j(),rt(i.$$.fragment),a=j(),rt(u.$$.fragment),p=j(),rt(d.$$.fragment)},m(t,e){ct(n,t,e),b(t,o,e),ct(r,t,e),b(t,c,e),ct(s,t,e),b(t,l,e),ct(i,t,e),b(t,a,e),ct(u,t,e),b(t,p,e),ct(d,t,e),f=!0},p:t,i(t){f||(tt(n.$$.fragment,t),tt(r.$$.fragment,t),tt(s.$$.fragment,t),tt(i.$$.fragment,t),tt(u.$$.fragment,t),tt(d.$$.fragment,t),f=!0)},o(t){et(n.$$.fragment,t),et(r.$$.fragment,t),et(s.$$.fragment,t),et(i.$$.fragment,t),et(u.$$.fragment,t),et(d.$$.fragment,t),f=!1},d(t){st(n,t),t&&w(o),st(r,t),t&&w(c),st(s,t),t&&w(l),st(i,t),t&&w(a),st(u,t),t&&w(p),st(d,t)}}}function je(t){let e,n;return e=new Et({props:{$$slots:{default:[_e]},$$scope:{ctx:t}}}),{c(){rt(e.$$.fragment)},m(t,o){ct(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(tt(e.$$.fragment,t),n=!0)},o(t){et(e.$$.fragment,t),n=!1},d(t){st(e,t)}}}return new class extends at{constructor(t){super(),it(this,t,null,je,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
