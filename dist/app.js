webpackJsonp([1],[function(e,t,r){e.exports=r(66)},,,,,,function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=r(67),s="https://hacker-news.firebaseio.com",c="/v0";t.STORIES_PER_PAGE=20;var p=function(){function e(){this.cache=[],this.db=a.initializeApp({databaseURL:s}).database().ref(c)}return e.prototype.fetchStories=function(e){var t=this;return new Promise(function(r,n){t.db.child(e).on("value",function(e){r(e.val())},n)})},e.prototype.fetchItemsOnPage=function(e,r){var n=(r-1)*t.STORIES_PER_PAGE,i=r*t.STORIES_PER_PAGE,o=e.slice(n,i);return this.fetchItems(o)},e.prototype.fetchItems=function(e){var t=this;return e.length<1?Promise.resolve([]):Promise.all(e.map(function(e){return t.fetchItem(e)}))},e.prototype.fetchItem=function(e){var t=this;return new Promise(function(r,n){t.cache[e]?r(t.cache[e]):t.db.child("item/"+e).once("value",function(n){t.cache[e]=n.val(),r(t.cache[e])},n)})},e.prototype.fetchUser=function(e){var t=this;return new Promise(function(r,n){t.db.child("user/"+e).once("value",function(e){r(e.val())},n)})},e=n([o.autoinject(),i("design:paramtypes",[])],e)}();t.HackerNewsApi=p},,,,,function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=r(10),s=r(6),c=function(){function e(e){this.allStories=[],this.api=e}return e.prototype.determineActivationStrategy=function(){return a.activationStrategy.invokeLifecycle},e.prototype.activate=function(e){var t=this;window.scrollTo(0,0),void 0===e.page||isNaN(e.page)||e.page<1?this.currentPage=1:this.currentPage=Number(e.page),this.fetchIds().then(function(e){t.allStories=e})},e.prototype.allStoriesChanged=function(e,t){var r=this;e!==t&&void 0!==this.api&&this.api.fetchItemsOnPage(this.allStories,this.currentPage).then(function(e){r.stories=e,r.totalPages=Math.ceil(r.allStories.length/s.STORIES_PER_PAGE)})},e.prototype.currentPageChanged=function(e,t){e!==t&&(this.offset=s.STORIES_PER_PAGE*(e-1))},n([o.observable(),i("design:type",Array)],e.prototype,"allStories",void 0),n([o.observable(),i("design:type",Number)],e.prototype,"currentPage",void 0),e}();t.StoryList=c},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=r(6),s=function(){function e(e){this.expanded=!0,this.api=e}return e.prototype.bind=function(){var e=this;return void 0===this.comment.kids||this.comment.kids.length<1?Promise.resolve():this.api.fetchItems(this.comment.kids).then(function(t){e.replies=t})},e.prototype.toggle=function(){this.expanded=!this.expanded},n([o.bindable(),i("design:type",Object)],e.prototype,"comment",void 0),e=n([o.customElement("hn-comment"),o.inject(a.HackerNewsApi),i("design:paramtypes",["function"==typeof(t="undefined"!=typeof a.HackerNewsApi&&a.HackerNewsApi)&&t||Object])],e);var t}();t.Comment=s},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=function(){function e(){}return n([o.bindable(),i("design:type",Object)],e.prototype,"item",void 0),e=n([o.customElement("hn-item-preview"),i("design:paramtypes",[])],e)}();t.ItemPreview=a},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=function(){function e(){}return n([o.bindable(),i("design:type",Array)],e.prototype,"navigation",void 0),e=n([o.customElement("hn-nav-bar"),i("design:paramtypes",[])],e)}();t.NavBar=a},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=function(){function e(){}return n([o.bindable(),i("design:type",Number)],e.prototype,"current",void 0),n([o.bindable(),i("design:type",Number)],e.prototype,"total",void 0),n([o.bindable(),i("design:type",String)],e.prototype,"route",void 0),e=n([o.customElement("hn-paginator"),i("design:paramtypes",[])],e)}();t.Paginator=a},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=function(){function e(){}return n([o.bindable(),i("design:type",Array)],e.prototype,"stories",void 0),n([o.bindable(),i("design:type",Number)],e.prototype,"offset",void 0),e=n([o.customElement("hn-story-list"),i("design:paramtypes",[])],e)}();t.StoryList=a},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=function(){function e(){}return n([o.bindable(),i("design:type",Object)],e.prototype,"user",void 0),e=n([o.customElement("hn-user-profile"),i("design:paramtypes",[])],e)}();t.UserProfile=a},function(e,t){"use strict";function r(e){return""+(e<10&&e>=0?"0"+e:e)}var n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=function(){function e(){}return e.prototype.toView=function(e,t){void 0===t&&(t=!1);var i=new Date(1e3*e),o=i.getHours(),a="am";return o>=12&&(o-=12,a="pm"),0===o&&(o=12),o+":"+r(i.getMinutes())+a+" on "+i.getDate()+" "+n[i.getMonth()]+(t?" "+i.getFullYear():"")},e}();t.DateFormatValueConverter=i},function(e,t){"use strict";var r=function(){function e(){this.anchor=document.createElement("a")}return e.prototype.toView=function(e){this.anchor.href=e;var t=this.anchor.hostname.replace("www.","");return"localhost"===t?void 0:"("+t+")"},e}();t.HostnameValueConverter=r},function(e,t,r){"use strict";function n(e){e.use.standardConfiguration().developmentLogging(),e.start().then(function(){return e.setRoot("app")})}r(81),t.configure=n},,,,,,function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=r(6),s=function(){function e(){}return e.prototype.configureRouter=function(e,t){this.navigation=t.navigation,e.title="Aurelia HN",e.mapRoute({route:"",redirect:"news"}).mapRoute({route:"news",moduleId:"./pages/news/index",name:"topstories"}).mapRoute({route:"newest",moduleId:"./pages/newest/index",name:"newstories",nav:!0,title:"New"}).mapRoute({route:"best",moduleId:"./pages/best/index",name:"beststories",nav:!0,title:"Best"}).mapRoute({route:"show",moduleId:"./pages/show/index",name:"showstories",nav:!0,title:"Show"}).mapRoute({route:"ask",moduleId:"./pages/ask/index",name:"askstories",nav:!0,title:"Ask"}).mapRoute({route:"jobs",moduleId:"./pages/jobs/index",name:"jobstories",nav:!0,title:"Jobs"}).mapRoute({route:"item/:id",moduleId:"./pages/item/index",name:"item"}).mapRoute({route:"user/:id",moduleId:"./pages/user/index",name:"user"}).mapUnknownRoutes({route:"",redirect:"news"})},e=n([o.inject(a.HackerNewsApi),i("design:paramtypes",[])],e)}();t.App=s},function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},i=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=r(2),s=r(6),c=r(11),p=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.fetchIds=function(){return this.api.fetchStories("askstories")},t=i([a.inject(s.HackerNewsApi),o("design:paramtypes",["function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],t);var r}(c.StoryList);t.AskStories=p},function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},i=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=r(2),s=r(6),c=r(11),p=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.fetchIds=function(){return this.api.fetchStories("beststories")},t=i([a.inject(s.HackerNewsApi),o("design:paramtypes",["function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],t);var r}(c.StoryList);t.BestStories=p},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=r(10),s=r(6),c=function(){function e(e,t){this.router=e,this.api=t}return e.prototype.activate=function(e){var t=this;return void 0===e.id||isNaN(e.id)||e.id<0?(this.router.navigateToRoute("news"),Promise.resolve()):(this.id=e.id,this.api.fetchItem(this.id).then(function(e){if(t.item=e,!(void 0===t.item.kids||t.item.kids.length<1))return t.api.fetchItems(t.item.kids).then(function(e){t.comments=e})}))},e=n([o.inject(a.Router,s.HackerNewsApi),i("design:paramtypes",["function"==typeof(t="undefined"!=typeof a.Router&&a.Router)&&t||Object,"function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],e);var t,r}();t.Item=c},function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},i=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=r(2),s=r(6),c=r(11),p=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.fetchIds=function(){return this.api.fetchStories("jobstories")},t=i([a.inject(s.HackerNewsApi),o("design:paramtypes",["function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],t);var r}(c.StoryList);t.JobStories=p},function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},i=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=r(2),s=r(6),c=r(11),p=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.fetchIds=function(){return this.api.fetchStories("newstories")},t=i([a.inject(s.HackerNewsApi),o("design:paramtypes",["function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],t);var r}(c.StoryList);t.NewStories=p},function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},i=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=r(2),s=r(6),c=r(11),p=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.fetchIds=function(){return this.api.fetchStories("topstories")},t=i([a.inject(s.HackerNewsApi),o("design:paramtypes",["function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],t);var r}(c.StoryList);t.TopStories=p},function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},i=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=r(2),s=r(6),c=r(11),p=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.fetchIds=function(){return this.api.fetchStories("showstories")},t=i([a.inject(s.HackerNewsApi),o("design:paramtypes",["function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],t);var r}(c.StoryList);t.ShowStories=p},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,r,a):i(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=r(2),a=r(10),s=r(6),c=function(){function e(e,t){this.router=e,this.api=t}return e.prototype.activate=function(e){var t=this;return void 0===e.id?(this.router.navigateToRoute("news"),Promise.resolve()):(this.id=e.id,this.api.fetchUser(this.id).then(function(e){t.user=e}))},e=n([o.inject(a.Router,s.HackerNewsApi),i("design:paramtypes",["function"==typeof(t="undefined"!=typeof a.Router&&a.Router)&&t||Object,"function"==typeof(r="undefined"!=typeof s.HackerNewsApi&&s.HackerNewsApi)&&r||Object])],e);var t,r}();t.User=c},function(e,t){},function(e,t,r){e.exports=r.p+"images/y18.gif"},,,,,function(e,t){e.exports="<template> <require from=./components/nav-bar></require> <div class=container> <header> <hn-nav-bar navigation.bind=navigation></hn-nav-bar> </header> <router-view></router-view> </div> </template> "},function(e,t){e.exports="<template> <li class=comment if.bind=!comment.deleted> <span click.delegate=toggle() class=comment__toggle>[${expanded ? '-' : '+' + replies.length}]</span> <p class=comment__author>${comment.by}</p> <p class=comment__text innerhtml.bind=comment.text if.bind=expanded></p> </li> <ul class=comment__reply repeat.for=\"reply of replies\" if.bind=expanded> <hn-comment comment.bind=reply></hn-comment> </ul> </template> "},function(e,t){e.exports='<template> <require from=../converters/hostname></require> <require from=../converters/date-format></require> <div class=item-preview> <template if.bind=item.url> <a class=item-preview__link href.bind=item.url target=_blank>${item.title}</a> </template> <template if.bind=!item.url> <a class=item-preview__link route-href="route: item; params.bind: { id: item.id}">${item.title}</a> </template> <a class=item-preview__site-link>${item.url | hostname}</a> <p class=item-preview__info> ${item.score} points by <a class=item-preview__author-link route-href="route: user; params.bind: { id: item.by }">${item.by}</a> at ${item.time | dateFormat} | <a class=item-preview__comments-link route-href="route: item; params.bind: { id: item.id}"> <template if.bind="item.descendants < 1">discuss</template> <template if.bind="item.descendants >= 1">${item.descendants} comments</template> </a> </p> </div> </template> '},function(e,t,r){e.exports="<template> <nav class=nav-bar> <div class=nav-bar__right> Built with <a class=nav-bar__author-url href=http://aurelia.io/ target=_blank> Aurelia</a> | Made with <span class=nav-bar__author-heart>♥</span> by <a class=nav-bar__author-url href=https://www.michael-bull.com/ target=_blank>Mike</a> </div> <div class=nav-bar__left> <a href=http://www.ycombinator.com target=_blank> <img class=nav-bar__ycombinator src="+r(82)+" alt=YCombinator width=18 height=18 /></a> <a class=nav-bar__title href=#>Hacker News</a> <div class=nav-bar__links> <a repeat.for=\"nav of navigation\" href.bind=nav.href class=\"nav-bar__link ${nav.isActive ? 'nav-bar__link--active' : ''}\"> ${nav.title} </a> </div> </div> </nav> </template> "},function(e,t){e.exports="<template> <div class=paginator> <a class=\"paginator__selector ${current > 1 ? '' : 'paginator__selector--disabled'}\" route-href=\"route.bind: route; params.bind: { page: current > 1 ? current - 1 : 1 }\"> &laquo;</a> <div class=paginator__current>Page ${current} of ${total}</div> <a class=\"paginator__selector ${current < total ? '' : 'paginator__selector--disabled'}\" route-href=\"route.bind: route; params.bind: { page: current < total ? current + 1 : total }\"> &raquo;</a> </div> </template> "},function(e,t){e.exports='<template> <require from=./item-preview></require> <div class=story-list> <p class=story-list__loading if.bind=!stories>Loading...</p> <div class=story-list__item repeat.for="story of stories"> <span class=story-list__index> ${$index + offset + 1}. </span> <hn-item-preview item.bind=story></hn-item-preview> </div> </div> </template> '},function(e,t){e.exports="<template> <require from=../converters/date-format></require> <table class=user-profile> <tr> <td>user:</td> <td>${user.id}</td> </tr> <tr> <td>created:</td> <td>${user.created | dateFormat: true}</td> </tr> <tr> <td>karma:</td> <td>${user.karma}</td> </tr> </table> </template> "},function(e,t){e.exports="<template> <require from=../../components/story-list></require> <require from=../../components/paginator></require> <hn-story-list stories.bind=stories offset.bind=offset> </hn-story-list> <hn-paginator if.bind=stories current.bind=currentPage total.bind=totalPages route=askstories> </hn-paginator> </template> "},function(e,t){e.exports="<template> <require from=../../components/story-list></require> <require from=../../components/paginator></require> <hn-story-list stories.bind=stories offset.bind=offset> </hn-story-list> <hn-paginator if.bind=stories current.bind=currentPage total.bind=totalPages route=beststories> </hn-paginator> </template> "},function(e,t){e.exports='<template> <require from=../../components/comment></require> <require from=../../components/item-preview></require> <div class=news-item> <hn-item-preview item.bind=item></hn-item-preview> <p class=news-item__text if.bind=item.text innerhtml.bind=item.text></p> <p class=news-item__no-comments if.bind=!comments> No comments yet. </p> <ul class=news-item__comments if.bind=comments> <template repeat.for="comment of comments"> <hn-comment comment.bind=comment></hn-comment> </template> </ul> </div> </template> '},function(e,t){e.exports="<template> <require from=../../components/story-list></require> <require from=../../components/paginator></require> <hn-story-list stories.bind=stories offset.bind=offset> </hn-story-list> <hn-paginator if.bind=stories current.bind=currentPage total.bind=totalPages route=jobstories> </hn-paginator> </template> "},function(e,t){e.exports="<template> <require from=../../components/story-list></require> <require from=../../components/paginator></require> <hn-story-list stories.bind=stories offset.bind=offset> </hn-story-list> <hn-paginator if.bind=stories current.bind=currentPage total.bind=totalPages route=newstories> </hn-paginator> </template> "},function(e,t){e.exports="<template> <require from=../../components/story-list></require> <require from=../../components/paginator></require> <hn-story-list stories.bind=stories offset.bind=offset> </hn-story-list> <hn-paginator if.bind=stories current.bind=currentPage total.bind=totalPages route=topstories> </hn-paginator> </template> "},function(e,t){e.exports="<template> <require from=../../components/story-list></require> <require from=../../components/paginator></require> <hn-story-list stories.bind=stories offset.bind=offset> </hn-story-list> <hn-paginator if.bind=stories current.bind=currentPage total.bind=totalPages route=showstories> </hn-paginator> </template> "},function(e,t){e.exports="<template> <require from=../../components/user-profile></require> <hn-user-profile user.bind=user></hn-user-profile> </template> "},,function(e,t,r){function n(e){return r(i(e))}function i(e){return o[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var o={"./app":72,"./app.html":87,"./aurelia-bootstrapper-webpack":37,"./aurelia-event-aggregator":16,"./aurelia-framework":2,"./aurelia-history-browser":38,"./aurelia-http-client":39,"./aurelia-logging-console":41,"./aurelia-templating-binding":45,"./aurelia-templating-resources":49,"./aurelia-templating-resources/attr-binding-behavior":18,"./aurelia-templating-resources/attr-binding-behavior.js":18,"./aurelia-templating-resources/binding-mode-behaviors":20,"./aurelia-templating-resources/binding-mode-behaviors.js":20,"./aurelia-templating-resources/compose":21,"./aurelia-templating-resources/compose.js":21,"./aurelia-templating-resources/debounce-binding-behavior":22,"./aurelia-templating-resources/debounce-binding-behavior.js":22,"./aurelia-templating-resources/focus":23,"./aurelia-templating-resources/focus.js":23,"./aurelia-templating-resources/hide":24,"./aurelia-templating-resources/hide.js":24,"./aurelia-templating-resources/if":25,"./aurelia-templating-resources/if.js":25,"./aurelia-templating-resources/repeat":26,"./aurelia-templating-resources/repeat.js":26,"./aurelia-templating-resources/replaceable":27,"./aurelia-templating-resources/replaceable.js":27,"./aurelia-templating-resources/sanitize-html":28,"./aurelia-templating-resources/sanitize-html.js":28,"./aurelia-templating-resources/show":29,"./aurelia-templating-resources/show.js":29,"./aurelia-templating-resources/signal-binding-behavior":30,"./aurelia-templating-resources/signal-binding-behavior.js":30,"./aurelia-templating-resources/throttle-binding-behavior":31,"./aurelia-templating-resources/throttle-binding-behavior.js":31,"./aurelia-templating-resources/update-trigger-binding-behavior":32,"./aurelia-templating-resources/update-trigger-binding-behavior.js":32,"./aurelia-templating-resources/with":33,"./aurelia-templating-resources/with.js":33,"./aurelia-templating-router":57,"./aurelia-templating-router/route-href":34,"./aurelia-templating-router/route-href.js":34,"./aurelia-templating-router/router-view":35,"./aurelia-templating-router/router-view.js":35,"./components/comment":58,"./components/comment.html":88,"./components/comment.ts":58,"./components/item-preview":59,"./components/item-preview.html":89,"./components/item-preview.ts":59,"./components/nav-bar":60,"./components/nav-bar.html":90,"./components/nav-bar.ts":60,"./components/paginator":61,"./components/paginator.html":91,"./components/paginator.ts":61,"./components/story-list":62,"./components/story-list.html":92,"./components/story-list.ts":62,"./components/user-profile":63,"./components/user-profile.html":93,"./components/user-profile.ts":63,"./converters/date-format":64,"./converters/date-format.ts":64,"./converters/hostname":65,"./converters/hostname.ts":65,"./main":66,"./pages/ask/index":73,"./pages/ask/index.html":94,"./pages/best/index":74,"./pages/best/index.html":95,"./pages/item/index":75,"./pages/item/index.html":96,"./pages/jobs/index":76,"./pages/jobs/index.html":97,"./pages/newest/index":77,"./pages/newest/index.html":98,"./pages/news/index":78,"./pages/news/index.html":99,"./pages/show/index":79,"./pages/show/index.html":100,"./pages/story-list":11,"./pages/user/index":80,"./pages/user/index.html":101,"./services/api":6};n.keys=function(){return Object.keys(o)},n.resolve=i,e.exports=n,n.id=103}]);