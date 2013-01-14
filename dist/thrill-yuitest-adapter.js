/*! thrill - v0.3.0 - 2013-01-13
* Copyright (c) 2013 Ozan Turgut; Licensed Apache License 2.0 */
thrill=function(){var e=function(e,t){return e.exports=t,t.TESTER_MESSAGE_TYPE={start:1,end:2,"suite start":3,"suite end":4,"test start":5,"test end":6,batch:7},e.exports}({},{}),t=function(t,n){function s(e){this.isStreaming=!/(?:\?|\&)disableStream=true(.*)(?:\&|$)/.test(window.location.search)&&!window.THRILL_STREAM_DISABLE,this.batch=[],this.socket=e}t.exports=n;var r=e.TESTER_MESSAGE_TYPE,i=t.exports=function(e){e=e||window.queenSocket||function(){var e=window.location.search.match(/(?:\?|\&)queenSocketId=(.*)(?:\&|$)/);if(!e)throw new ReferenceError("Unable to find queen socket id in the url.");return window.parent.iframeSockets[e[1]]}();var t=new s(e);return t};return s.prototype.sendToSocket=function(e){this.isStreaming?this.socket(e):(this.batch.push(e),e[0]===r.end&&this.socket([r.batch,this.batch]))},s.prototype.start=function(e){this.sendToSocket([r.start,e])},s.prototype.suite=function(e){this.sendToSocket([r["suite start"],e])},s.prototype.test=function(e){this.sendToSocket([r["test start"],e])},s.prototype.testEnd=function(e){this.sendToSocket([r["test end"],e])},s.prototype.suiteEnd=function(e){this.sendToSocket([r["suite end"],e])},s.prototype.end=function(e){if(!e||e.passed===void 0)throw new TypeError('A "passed" variable is required to end the test');this.sendToSocket([r.end,e])},t.exports}({},{}),n=function(e,t){function r(e,t,n){var r=0,i=e.length;for(;r<i;r++)t.call(n,e[r],r,e)}function i(e,t,n){var r;for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)}function o(e,t,n){var r=0,i=e.length,s=[];for(;r<i;r++)s.push(t.call(n,e[r],r,e));return s}function u(e,t,n){var r,i={};for(r in e)e.hasOwnProperty(r)&&(i[r]=t.call(n,e[r],r,e));return i}function f(e,t,n){var r=0,i=e.length,s=[];for(;r<i;r++)t.call(n,e[r],r,e)&&s.push(e[r]);return s}function l(e,t,n){var r,i={};for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)&&(i[r]=e[r]);return i}e.exports=t;var n=t.noop=function(){},s=t.each=function(e,t,n){return e instanceof Array?r.apply(void 0,arguments):i.apply(void 0,arguments)},a=t.map=function(e,t,n){return e instanceof Array?o.apply(void 0,arguments):u.apply(void 0,arguments)},c=t.filter=function(e,t,n){return e instanceof Array?f.apply(void 0,arguments):l.apply(void 0,arguments)},h=t.values=function(e){var t=[];return i(e,function(e){t.push(e)}),t},p=t.keys=function(e){var t=[];return i(e,function(e,n){t.push(n)}),t},d=t.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}};return e.exports}({},{}),r=function(e,r){function c(e){var t=e.stack;return t?(t=t.split(l),t=s.filter(t,function(e,t,n){return u.test(e)?!1:(n[t]=e.replace(a,"(").replace(f,""),!0)}),t.join("\n")):e.message}e.exports=r;var i=t,s=n,o=e.exports=function(e){e=e||{};var t=e.TestRunner||window.YAHOO.tool.TestRunner,n=e.thrill||i(),r,s,o,u;t.subscribe(t.BEGIN_EVENT,function(){s=+(new Date),n.start({type:"yuitest"})}),t.subscribe(t.TEST_SUITE_BEGIN_EVENT,function(e){u=e.testSuite.name,n.suite({name:e.testSuite.name})}),t.subscribe(t.TEST_CASE_BEGIN_EVENT,function(e){r=+(new Date),o=[],n.test({name:e.testCase.name,suiteName:u})}),t.subscribe(t.TEST_FAIL_EVENT,function(e){o.push(c(e.error))}),t.subscribe(t.TEST_CASE_COMPLETE_EVENT,function(e){var t=+(new Date)-r;n.testEnd({name:e.testCase.name,suiteName:u,passCount:e.results.passed,failCount:e.results.failed,runtime:t,log:o.join("\n")})}),t.subscribe(t.TEST_SUITE_COMPLETE_EVENT,function(e){n.suiteEnd({name:e.testSuite.name,passCount:e.results.passed,failCount:e.results.failed})}),t.subscribe(t.COMPLETE_EVENT,function(e){var t=+(new Date)-s;n.end({passed:!0,passCount:e.results.passed,failCount:e.results.failed,runtime:t})})},u=/.*yuitest.*\.js/i,a=/\(.*\/g\/.*?\//i,f=/\?queenSocketId=([\w\-])*/i,l=/\n/g;return(typeof THRILL_MANUAL=="undefined"||!THRILL_MANUAL)&&o(),e.exports}({},{});return r}();