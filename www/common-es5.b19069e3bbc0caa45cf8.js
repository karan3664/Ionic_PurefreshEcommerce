function _get(e,t,n){return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=_superPropBase(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function _superPropBase(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_getPrototypeOf(e)););return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _createSuper(e){return function(){var t,n=_getPrototypeOf(e);if(_isNativeReflectConstruct()){var r=_getPrototypeOf(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function asyncGeneratorStep(e,t,n,r,i,o,c){try{var u=e[o](c),a=u.value}catch(s){return void n(s)}u.done?t(a):Promise.resolve(a).then(r,i)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function c(e){asyncGeneratorStep(o,r,i,c,u,"next",e)}function u(e){asyncGeneratorStep(o,r,i,c,u,"throw",e)}c(void 0)}))}}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"6i10":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r={bubbles:{dur:1e3,circles:9,fn:function(e,t,n){var r="".concat(e*t/n-e,"ms"),i=2*Math.PI*t/n;return{r:5,style:{top:"".concat(9*Math.sin(i),"px"),left:"".concat(9*Math.cos(i),"px"),"animation-delay":r}}}},circles:{dur:1e3,circles:8,fn:function(e,t,n){var r=t/n,i="".concat(e*r-e,"ms"),o=2*Math.PI*r;return{r:5,style:{top:"".concat(9*Math.sin(o),"px"),left:"".concat(9*Math.cos(o),"px"),"animation-delay":i}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:function(){return{r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}}}},crescent:{dur:750,circles:1,fn:function(){return{r:26,style:{}}}},dots:{dur:750,circles:3,fn:function(e,t){return{r:6,style:{left:"".concat(9-9*t,"px"),"animation-delay":-110*t+"ms"}}}},lines:{dur:1e3,lines:12,fn:function(e,t,n){return{y1:17,y2:29,style:{transform:"rotate(".concat(30*t+(t<6?180:-180),"deg)"),"animation-delay":"".concat(e*t/n-e,"ms")}}}},"lines-small":{dur:1e3,lines:12,fn:function(e,t,n){return{y1:12,y2:20,style:{transform:"rotate(".concat(30*t+(t<6?180:-180),"deg)"),"animation-delay":"".concat(e*t/n-e,"ms")}}}}}},KwJk:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return u}));var r=function(e,t){return null!==t.closest(e)},i=function(e){return"string"==typeof e&&e.length>0?_defineProperty({"ion-color":!0},"ion-color-".concat(e),!0):void 0},o=function(e){var t={};return function(e){return void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter((function(e){return null!=e})).map((function(e){return e.trim()})).filter((function(e){return""!==e})):[]}(e).forEach((function(e){return t[e]=!0})),t},c=/^[a-z][a-z0-9+\-.]*:/,u=function(){var e=_asyncToGenerator(regeneratorRuntime.mark((function e(t,n,r){var i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==t||"#"===t[0]||c.test(t)){e.next=4;break}if(!(i=document.querySelector("ion-router"))){e.next=4;break}return e.abrupt("return",(null!=n&&n.preventDefault(),i.push(t,r)));case 4:return e.abrupt("return",!1);case 5:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},NqGI:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return i}));var r=function(){var e=_asyncToGenerator(regeneratorRuntime.mark((function e(t,n,r,i,o){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=2;break}return e.abrupt("return",t.attachViewToDom(n,r,o,i));case 2:if("string"==typeof r||r instanceof HTMLElement){e.next=4;break}throw new Error("framework delegate is missing");case 4:if(c="string"==typeof r?n.ownerDocument&&n.ownerDocument.createElement(r):r,i&&i.forEach((function(e){return c.classList.add(e)})),o&&Object.assign(c,o),n.appendChild(c),e.t0=c.componentOnReady,!e.t0){e.next=12;break}return e.next=12,c.componentOnReady();case 12:return e.abrupt("return",c);case 13:case"end":return e.stop()}}),e)})));return function(t,n,r,i,o){return e.apply(this,arguments)}}(),i=function(e,t){if(t){if(e)return e.removeViewFromDom(t.parentElement,t);t.remove()}return Promise.resolve()}},Uwmq:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e){try{if("string"!=typeof e||""===e)return e;var t=document.createDocumentFragment(),n=document.createElement("div");t.appendChild(n),n.innerHTML=e,u.forEach((function(e){for(var n=t.querySelectorAll(e),r=n.length-1;r>=0;r--){var c=n[r];c.parentNode?c.parentNode.removeChild(c):t.removeChild(c);for(var u=o(c),a=0;a<u.length;a++)i(u[a])}}));for(var r=o(t),c=0;c<r.length;c++)i(r[c]);var a=document.createElement("div");a.appendChild(t);var s=a.querySelector("div");return null!==s?s.innerHTML:a.innerHTML}catch(l){return console.error(l),""}},i=function e(t){if(!t.nodeType||1===t.nodeType){for(var n=t.attributes.length-1;n>=0;n--){var r=t.attributes.item(n),i=r.name;if(c.includes(i.toLowerCase())){var u=r.value;null!=u&&u.toLowerCase().includes("javascript:")&&t.removeAttribute(i)}else t.removeAttribute(i)}for(var a=o(t),s=0;s<a.length;s++)e(a[s])}},o=function(e){return null!=e.children?e.children:e.childNodes},c=["class","id","href","src","name","slot"],u=["script","style","iframe","meta","link","object","embed"]},fzvj:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return r}));var r=function(){var e=window.TapticEngine;e&&e.selection()},i=function(){var e=window.TapticEngine;e&&e.gestureSelectionStart()},o=function(){var e=window.TapticEngine;e&&e.gestureSelectionChanged()},c=function(){var e=window.TapticEngine;e&&e.gestureSelectionEnd()}},l5mm:function(e,t,n){"use strict";var r=n("HDdC"),i=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,r){var i;return _classCallCheck(this,n),(i=t.call(this,e,r)).scheduler=e,i.work=r,i.pending=!1,i}return _createClass(n,[{key:"schedule",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(this.closed)return this;this.state=e;var n=this.id,r=this.scheduler;return null!=n&&(this.id=this.recycleAsyncId(r,n,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(r,this.id,t),this}},{key:"requestAsyncId",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return setInterval(e.flush.bind(e,this),n)}},{key:"recycleAsyncId",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(null!==n&&this.delay===n&&!1===this.pending)return t;clearInterval(t)}},{key:"execute",value:function(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var n=this._execute(e,t);if(n)return n;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}},{key:"_execute",value:function(e,t){var n=!1,r=void 0;try{this.work(e)}catch(i){n=!0,r=!!i&&i||new Error(i)}if(n)return this.unsubscribe(),r}},{key:"_unsubscribe",value:function(){var e=this.id,t=this.scheduler,n=t.actions,r=n.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==r&&n.splice(r,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null}}]),n}(function(e){_inherits(n,e);var t=_createSuper(n);function n(e,r){return _classCallCheck(this,n),t.call(this)}return _createClass(n,[{key:"schedule",value:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this}}]),n}(n("quSY").a)),o=function(){var e=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.now;_classCallCheck(this,e),this.SchedulerAction=t,this.now=n}return _createClass(e,[{key:"schedule",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0;return new this.SchedulerAction(this,e).schedule(n,t)}}]),e}();return e.now=function(){return Date.now()},e}(),c=new(function(e){_inherits(n,e);var t=_createSuper(n);function n(e){var r,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.now;return _classCallCheck(this,n),(r=t.call(this,e,(function(){return n.delegate&&n.delegate!==_assertThisInitialized(r)?n.delegate.now():i()}))).actions=[],r.active=!1,r.scheduled=void 0,r}return _createClass(n,[{key:"schedule",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2?arguments[2]:void 0;return n.delegate&&n.delegate!==this?n.delegate.schedule(e,t,r):_get(_getPrototypeOf(n.prototype),"schedule",this).call(this,e,t,r)}},{key:"flush",value:function(e){var t=this.actions;if(this.active)t.push(e);else{var n;this.active=!0;do{if(n=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,n){for(;e=t.shift();)e.unsubscribe();throw n}}}}]),n}(o))(i),u=n("DH7j");function a(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c;return e=t,(Object(u.a)(e)||!(e-parseFloat(e)+1>=0)||t<0)&&(t=0),n&&"function"==typeof n.schedule||(n=c),new r.a((function(e){return e.add(n.schedule(s,t,{subscriber:e,counter:0,period:t})),e}))}function s(e){var t=e.subscriber,n=e.counter,r=e.period;t.next(n),this.schedule({subscriber:t,counter:n+1,period:r},r)}n.d(t,"a",(function(){return a}))}}]);