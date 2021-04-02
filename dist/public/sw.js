/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/public/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service/sw-definition.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/service/sw-definition.ts":
/*!**************************************!*\
  !*** ./src/service/sw-definition.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst staticCache = 'static-cache-v0';\nconst dynamicCache = 'dynamic-cache-v0';\nconst defaultCacheSize = 1;\nconst fallbackPage = '/fallback.html';\nconst assets = [\n    '/',\n    '/index.html',\n    '/favicon.ico',\n    '/fallback.html',\n    '/css/style.css',\n    '/css/materialize.min.css',\n    '/images/android-chrome-192x192.png',\n    '/images/android-chrome-512x512.png',\n    '/images/maskable_icon_x192.png',\n    '/images/maskable_icon_x512.png',\n    '/images/favicon-16x16.png',\n    '/images/favicon-32x32.png',\n    '/images/apple-touch-icon.png',\n    '/images/screen-540x7xx.png',\n    '/js/bundle.js',\n    '/js/wNumb.min.js',\n    'https://fonts.googleapis.com/icon?family=Material+Icons',\n    'https://dummyimage.com/150x150',\n    'https://dummyimage.com/300x250',\n    'https://materializecss.com/images/office.jpg',\n];\n// cache size limit function\nconst limitCacheSize = (name, size) => {\n    caches.open(name).then(cache => {\n        cache.keys().then(keys => {\n            if (keys.length > size) {\n                cache.delete(keys[0]).then(limitCacheSize(name, size));\n            }\n        });\n    });\n};\nself.addEventListener('install', (event) => {\n    //console.log('sw installed ', event);\n    event.waitUntil(caches.open(staticCache).then((cache) => {\n        //console.log('Adding static files to cache', cache);\n        return cache.addAll(assets);\n    }));\n});\nself.addEventListener('activate', (event) => {\n    //console.log('sw activated');\n    event.waitUntil(caches.keys().then((keys) => {\n        return Promise.all(keys\n            .filter((key) => key !== staticCache && key !== dynamicCache)\n            .map(key => caches.delete(key)));\n    }));\n});\n// fetch events\nself.addEventListener('fetch', (evt) => {\n    //if(evt.request.url.indexOf('googletagmanager.com') === -1){\n    evt.respondWith(caches.match(evt.request).then(cacheRes => {\n        return cacheRes || fetch(evt.request).then(fetchRes => {\n            return caches.open(dynamicCache).then(cache => {\n                if ((fetchRes instanceof Response) && (200 === fetchRes.status)) {\n                    cache.put(evt.request.url, fetchRes.clone());\n                }\n                else {\n                    console.log(\"fetchRes: \", fetchRes);\n                }\n                // check cached items size\n                limitCacheSize(dynamicCache, defaultCacheSize);\n                return fetchRes;\n            });\n        });\n    }).catch(() => {\n        if (evt.request.url.indexOf('.html') > -1) {\n            return caches.match(fallbackPage);\n        }\n    }));\n    //}\n});\nfunction closeNotification(msg, evt) {\n    console.log(msg, evt.notification.data);\n    evt.notification.close();\n}\nself.addEventListener('notificationclose', (evt) => {\n    closeNotification(\"Notification closed\", evt);\n});\nself.addEventListener('notificationclick', (evt) => {\n    if (evt.action !== \"close\") {\n        evt.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: 'true' }).then(function (allclients) {\n            // do something with your clients list\n            console.log(\"allclients\", allclients);\n            for (let i = 0; i < allclients.length; i++) {\n                if (allclients[i].visibilityState === 'visible') {\n                    console.log(\"Navigating...\");\n                    allclients[i].navigate(evt.notification.data.loc);\n                    break;\n                }\n            }\n        }));\n    }\n    closeNotification(\"Notification Clicked\", evt);\n});\nself.addEventListener('push', function (e) {\n    var options = {\n        body: 'This notification for apéro',\n        icon: \"images/android-chrome-192x192.png\",\n        vibrate: [100, 50, 100],\n        data: {\n            dateOfArrival: Date.now(),\n            primaryKey: '2'\n        },\n        actions: [\n            {\n                action: 'explore', title: 'Explore this new world',\n                //icon: 'images/checkmark.png'\n            },\n            {\n                action: 'close', title: 'Close',\n                //icon: 'images/xmark.png'\n            },\n        ]\n    };\n    e.waitUntil(self.registration.showNotification('Hello world!', options));\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9zdy1kZWZpbml0aW9uLnRzP2I1MWEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDO0FBQ3RDLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBQ3hDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLE1BQU0sWUFBWSxHQUFHLGdCQUFnQjtBQUNyQyxNQUFNLE1BQU0sR0FDVjtJQUNFLEdBQUc7SUFDSCxhQUFhO0lBQ2IsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsMEJBQTBCO0lBQzFCLG9DQUFvQztJQUNwQyxvQ0FBb0M7SUFDcEMsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQywyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQix5REFBeUQ7SUFDekQsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyw4Q0FBOEM7Q0FDL0MsQ0FBQztBQUVKLDRCQUE0QjtBQUM1QixNQUFNLGNBQWMsR0FBRyxDQUFDLElBQVksRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM3QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFF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QUN2QixJQUFJLEVBQUU7WUFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN6QixVQUFVLEVBQUUsR0FBRztTQUNoQjtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHdCQUF3QjtnQkFDbEQsOEJBQThCO2FBQy9CO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTztnQkFDL0IsMEJBQTBCO2FBQzNCO1NBQ0Y7S0FDRixDQUFDO0lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FDNUQsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL3NlcnZpY2Uvc3ctZGVmaW5pdGlvbi50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qgc3RhdGljQ2FjaGUgPSAnc3RhdGljLWNhY2hlLXYwJztcbmNvbnN0IGR5bmFtaWNDYWNoZSA9ICdkeW5hbWljLWNhY2hlLXYwJztcbmNvbnN0IGRlZmF1bHRDYWNoZVNpemUgPSAxO1xuY29uc3QgZmFsbGJhY2tQYWdlID0gJy9mYWxsYmFjay5odG1sJ1xuY29uc3QgYXNzZXRzID1cbiAgW1xuICAgICcvJyxcbiAgICAnL2luZGV4Lmh0bWwnLFxuICAgICcvZmF2aWNvbi5pY28nLFxuICAgICcvZmFsbGJhY2suaHRtbCcsXG4gICAgJy9jc3Mvc3R5bGUuY3NzJyxcbiAgICAnL2Nzcy9tYXRlcmlhbGl6ZS5taW4uY3NzJyxcbiAgICAnL2ltYWdlcy9hbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZycsXG4gICAgJy9pbWFnZXMvYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmcnLFxuICAgICcvaW1hZ2VzL21hc2thYmxlX2ljb25feDE5Mi5wbmcnLFxuICAgICcvaW1hZ2VzL21hc2thYmxlX2ljb25feDUxMi5wbmcnLFxuICAgICcvaW1hZ2VzL2Zhdmljb24tMTZ4MTYucG5nJyxcbiAgICAnL2ltYWdlcy9mYXZpY29uLTMyeDMyLnBuZycsXG4gICAgJy9pbWFnZXMvYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxuICAgICcvaW1hZ2VzL3NjcmVlbi01NDB4N3h4LnBuZycsXG4gICAgJy9qcy9idW5kbGUuanMnLFxuICAgICcvanMvd051bWIubWluLmpzJyxcbiAgICAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucycsXG4gICAgJ2h0dHBzOi8vZHVtbXlpbWFnZS5jb20vMTUweDE1MCcsXG4gICAgJ2h0dHBzOi8vZHVtbXlpbWFnZS5jb20vMzAweDI1MCcsXG4gICAgJ2h0dHBzOi8vbWF0ZXJpYWxpemVjc3MuY29tL2ltYWdlcy9vZmZpY2UuanBnJyxcbiAgXTtcblxuLy8gY2FjaGUgc2l6ZSBsaW1pdCBmdW5jdGlvblxuY29uc3QgbGltaXRDYWNoZVNpemUgPSAobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIpID0+IHtcbiAgY2FjaGVzLm9wZW4obmFtZSkudGhlbihjYWNoZSA9PiB7XG4gICAgY2FjaGUua2V5cygpLnRoZW4oa2V5cyA9PiB7XG4gICAgICBpZiAoa2V5cy5sZW5ndGggPiBzaXplKSB7XG4gICAgICAgIGNhY2hlLmRlbGV0ZShrZXlzWzBdKS50aGVuKGxpbWl0Q2FjaGVTaXplKG5hbWUsIHNpemUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCAoZXZlbnQpID0+IHtcbiAgLy9jb25zb2xlLmxvZygnc3cgaW5zdGFsbGVkICcsIGV2ZW50KTtcblxuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLm9wZW4oc3RhdGljQ2FjaGUpLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdBZGRpbmcgc3RhdGljIGZpbGVzIHRvIGNhY2hlJywgY2FjaGUpO1xuICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChhc3NldHMpO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgKGV2ZW50KSA9PiB7XG4gIC8vY29uc29sZS5sb2coJ3N3IGFjdGl2YXRlZCcpO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMua2V5cygpLnRoZW4oKGtleXMpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChrZXlzXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSBzdGF0aWNDYWNoZSAmJiBrZXkgIT09IGR5bmFtaWNDYWNoZSlcbiAgICAgICAgLm1hcChrZXkgPT4gY2FjaGVzLmRlbGV0ZShrZXkpKSk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG5cbi8vIGZldGNoIGV2ZW50c1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIChldnQ6IEV2ZW50KSA9PiB7XG4gIC8vaWYoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJ2dvb2dsZXRhZ21hbmFnZXIuY29tJykgPT09IC0xKXtcbiAgZXZ0LnJlc3BvbmRXaXRoKFxuICAgIGNhY2hlcy5tYXRjaChldnQucmVxdWVzdCkudGhlbihjYWNoZVJlcyA9PiB7XG4gICAgICByZXR1cm4gY2FjaGVSZXMgfHwgZmV0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oZmV0Y2hSZXMgPT4ge1xuICAgICAgICByZXR1cm4gY2FjaGVzLm9wZW4oZHluYW1pY0NhY2hlKS50aGVuKGNhY2hlID0+IHtcblxuICAgICAgICAgIGlmICgoZmV0Y2hSZXMgaW5zdGFuY2VvZiBSZXNwb25zZSkgJiYgKDIwMCA9PT0gZmV0Y2hSZXMuc3RhdHVzKSkge1xuICAgICAgICAgICAgY2FjaGUucHV0KGV2dC5yZXF1ZXN0LnVybCwgZmV0Y2hSZXMuY2xvbmUoKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmV0Y2hSZXM6IFwiLCBmZXRjaFJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNoZWNrIGNhY2hlZCBpdGVtcyBzaXplXG4gICAgICAgICAgbGltaXRDYWNoZVNpemUoZHluYW1pY0NhY2hlLCBkZWZhdWx0Q2FjaGVTaXplKTtcbiAgICAgICAgICByZXR1cm4gZmV0Y2hSZXM7XG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBpZiAoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJy5odG1sJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gY2FjaGVzLm1hdGNoKGZhbGxiYWNrUGFnZSk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcbiAgLy99XG59KTtcblxuXG5mdW5jdGlvbiBjbG9zZU5vdGlmaWNhdGlvbihtc2csIGV2dCkge1xuICBjb25zb2xlLmxvZyhtc2csIGV2dC5ub3RpZmljYXRpb24uZGF0YSk7XG4gIGV2dC5ub3RpZmljYXRpb24uY2xvc2UoKTtcbn1cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdub3RpZmljYXRpb25jbG9zZScsIChldnQpID0+IHtcbiAgY2xvc2VOb3RpZmljYXRpb24oXCJOb3RpZmljYXRpb24gY2xvc2VkXCIsIGV2dCk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdub3RpZmljYXRpb25jbGljaycsIChldnQpID0+IHtcbiAgaWYgKGV2dC5hY3Rpb24gIT09IFwiY2xvc2VcIikge1xuXG4gICAgZXZ0LndhaXRVbnRpbChcbiAgICAgIHNlbGYuY2xpZW50cy5tYXRjaEFsbCh7IHR5cGU6ICd3aW5kb3cnLCBpbmNsdWRlVW5jb250cm9sbGVkOiAndHJ1ZScgfSkudGhlbihmdW5jdGlvbiAoYWxsY2xpZW50cykge1xuICAgICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB5b3VyIGNsaWVudHMgbGlzdFxuICAgICAgICBjb25zb2xlLmxvZyhcImFsbGNsaWVudHNcIiwgYWxsY2xpZW50cyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsY2xpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChhbGxjbGllbnRzW2ldLnZpc2liaWxpdHlTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZy4uLlwiKTtcbiAgICAgICAgICAgIGFsbGNsaWVudHNbaV0ubmF2aWdhdGUoZXZ0Lm5vdGlmaWNhdGlvbi5kYXRhLmxvYyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlTm90aWZpY2F0aW9uKFwiTm90aWZpY2F0aW9uIENsaWNrZWRcIiwgZXZ0KTtcbiAgXG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdwdXNoJywgZnVuY3Rpb24gKGUpIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgYm9keTogJ1RoaXMgbm90aWZpY2F0aW9uIGZvciBhcMOpcm8nLFxuICAgIGljb246IFwiaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nXCIsXG4gICAgdmlicmF0ZTogWzEwMCwgNTAsIDEwMF0sXG4gICAgZGF0YToge1xuICAgICAgZGF0ZU9mQXJyaXZhbDogRGF0ZS5ub3coKSxcbiAgICAgIHByaW1hcnlLZXk6ICcyJ1xuICAgIH0sXG4gICAgYWN0aW9uczogW1xuICAgICAge1xuICAgICAgICBhY3Rpb246ICdleHBsb3JlJywgdGl0bGU6ICdFeHBsb3JlIHRoaXMgbmV3IHdvcmxkJyxcbiAgICAgICAgLy9pY29uOiAnaW1hZ2VzL2NoZWNrbWFyay5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhY3Rpb246ICdjbG9zZScsIHRpdGxlOiAnQ2xvc2UnLFxuICAgICAgICAvL2ljb246ICdpbWFnZXMveG1hcmsucG5nJ1xuICAgICAgfSxcbiAgICBdXG4gIH07XG4gIGUud2FpdFVudGlsKFxuICAgIHNlbGYucmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24oJ0hlbGxvIHdvcmxkIScsIG9wdGlvbnMpXG4gICk7XG59KTtcblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/service/sw-definition.ts\n");

/***/ })

/******/ });