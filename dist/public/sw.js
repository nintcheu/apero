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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service/sw-define.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/service/sw-define.ts":
/*!**********************************!*\
  !*** ./src/service/sw-define.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst staticCache = 'static-cache-v0';\nconst dynamicCache = 'dynamic-cache-v0';\nconst defaultCacheSize = 1;\nconst fallbackPage = '/fallback.html';\nconst assets = [\n    '/',\n    '/index.html',\n    '/favicon.ico',\n    '/fallback.html',\n    '/css/style.css',\n    '/css/materialize.min.css',\n    '/images/android-chrome-192x192.png',\n    '/images/android-chrome-512x512.png',\n    '/images/maskable_icon_x192.png',\n    '/images/maskable_icon_x512.png',\n    '/images/favicon-16x16.png',\n    '/images/favicon-32x32.png',\n    '/images/apple-touch-icon.png',\n    '/images/screen-540x7xx.png',\n    '/js/bundle.js',\n    'https://fonts.googleapis.com/icon?family=Material+Icons',\n    'https://dummyimage.com/150x150',\n    'https://materializecss.com/images/office.jpg',\n];\n// cache size limit function\nconst limitCacheSize = (name, size) => {\n    caches.open(name).then(cache => {\n        cache.keys().then(keys => {\n            if (keys.length > size) {\n                cache.delete(keys[0]).then(limitCacheSize(name, size));\n            }\n        });\n    });\n};\nself.addEventListener('install', (event) => {\n    console.log('sw installed ', event);\n    event.waitUntil(caches.open(staticCache).then((cache) => {\n        console.log('Adding static files to cache', cache);\n        return cache.addAll(assets);\n    }));\n});\nself.addEventListener('activate', (event) => {\n    console.log('sw activated');\n    event.waitUntil(caches.keys().then((keys) => {\n        return Promise.all(keys\n            .filter((key) => key !== staticCache && key !== dynamicCache)\n            .map(key => caches.delete(key)));\n    }));\n});\n// fetch events\nself.addEventListener('fetch', evt => {\n    //if(evt.request.url.indexOf('googletagmanager.com') === -1){\n    evt.respondWith(caches.match(evt.request).then(cacheRes => {\n        return cacheRes || fetch(evt.request).then(fetchRes => {\n            return caches.open(dynamicCache).then(cache => {\n                cache.put(evt.request.url, fetchRes.clone());\n                // check cached items size\n                limitCacheSize(dynamicCache, defaultCacheSize);\n                return fetchRes;\n            });\n        });\n    }).catch(() => {\n        if (evt.request.url.indexOf('.html') > -1) {\n            return caches.match(fallbackPage);\n        }\n    }));\n    //}\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9zdy1kZWZpbmUudHM/YzY0NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFDdEMsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCO0FBQ3JDLE1BQU0sTUFBTSxHQUNWO0lBQ0UsR0FBRztJQUNILGFBQWE7SUFDYixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUNwQyxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixlQUFlO0lBQ2YseURBQXlEO0lBQ3pELGdDQUFnQztJQUNoQyw4Q0FBOEM7Q0FDL0MsQ0FBQztBQUdKLDRCQUE0QjtBQUM1QixNQUFNLGNBQWMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM3QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFcEMsS0FBSyxDQUFDLFNBQVMsQ0FDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUdILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTVCLEtBQUssQ0FBQyxTQUFTLENBQ2IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3BCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxHQUFHLEtBQUssWUFBWSxDQUFDO2FBQzVELEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUdILGVBQWU7QUFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQ25DLDZEQUE2RDtJQUMzRCxHQUFHLENBQUMsV0FBVyxDQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4QyxPQUFPLFFBQVEsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM1QyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QywwQkFBMEI7Z0JBQzFCLGNBQWMsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxRQUFRLENBQUM7WUFDbEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1osSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7WUFDdkMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLEdBQUc7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9zZXJ2aWNlL3N3LWRlZmluZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0YXRpY0NhY2hlID0gJ3N0YXRpYy1jYWNoZS12MCc7XG5jb25zdCBkeW5hbWljQ2FjaGUgPSAnZHluYW1pYy1jYWNoZS12MCc7XG5jb25zdCBkZWZhdWx0Q2FjaGVTaXplID0gMTtcbmNvbnN0IGZhbGxiYWNrUGFnZSA9ICcvZmFsbGJhY2suaHRtbCdcbmNvbnN0IGFzc2V0cyA9XG4gIFtcbiAgICAnLycsXG4gICAgJy9pbmRleC5odG1sJyxcbiAgICAnL2Zhdmljb24uaWNvJyxcbiAgICAnL2ZhbGxiYWNrLmh0bWwnLFxuICAgICcvY3NzL3N0eWxlLmNzcycsXG4gICAgJy9jc3MvbWF0ZXJpYWxpemUubWluLmNzcycsXG4gICAgJy9pbWFnZXMvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmcnLFxuICAgICcvaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3gxOTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3g1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9mYXZpY29uLTE2eDE2LnBuZycsXG4gICAgJy9pbWFnZXMvZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICcvaW1hZ2VzL2FwcGxlLXRvdWNoLWljb24ucG5nJyxcbiAgICAnL2ltYWdlcy9zY3JlZW4tNTQweDd4eC5wbmcnLFxuICAgICcvanMvYnVuZGxlLmpzJyxcbiAgICAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucycsXG4gICAgJ2h0dHBzOi8vZHVtbXlpbWFnZS5jb20vMTUweDE1MCcsXG4gICAgJ2h0dHBzOi8vbWF0ZXJpYWxpemVjc3MuY29tL2ltYWdlcy9vZmZpY2UuanBnJyxcbiAgXTtcblxuXG4vLyBjYWNoZSBzaXplIGxpbWl0IGZ1bmN0aW9uXG5jb25zdCBsaW1pdENhY2hlU2l6ZSA9IChuYW1lLCBzaXplKSA9PiB7XG4gIGNhY2hlcy5vcGVuKG5hbWUpLnRoZW4oY2FjaGUgPT4ge1xuICAgIGNhY2hlLmtleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgaWYgKGtleXMubGVuZ3RoID4gc2l6ZSkge1xuICAgICAgICBjYWNoZS5kZWxldGUoa2V5c1swXSkudGhlbihsaW1pdENhY2hlU2l6ZShuYW1lLCBzaXplKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgKGV2ZW50KSA9PiB7XG4gIGNvbnNvbGUubG9nKCdzdyBpbnN0YWxsZWQgJywgZXZlbnQpO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMub3BlbihzdGF0aWNDYWNoZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgc3RhdGljIGZpbGVzIHRvIGNhY2hlJywgY2FjaGUpO1xuICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChhc3NldHMpO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgKGV2ZW50KSA9PiB7XG4gIGNvbnNvbGUubG9nKCdzdyBhY3RpdmF0ZWQnKTtcblxuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLmtleXMoKS50aGVuKChrZXlzKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoa2V5c1xuICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gc3RhdGljQ2FjaGUgJiYga2V5ICE9PSBkeW5hbWljQ2FjaGUpXG4gICAgICAgIC5tYXAoa2V5ID0+IGNhY2hlcy5kZWxldGUoa2V5KSkpO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG4vLyBmZXRjaCBldmVudHNcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCBldnQgPT4ge1xuICAvL2lmKGV2dC5yZXF1ZXN0LnVybC5pbmRleE9mKCdnb29nbGV0YWdtYW5hZ2VyLmNvbScpID09PSAtMSl7XG4gICAgZXZ0LnJlc3BvbmRXaXRoKFxuICAgICAgY2FjaGVzLm1hdGNoKGV2dC5yZXF1ZXN0KS50aGVuKGNhY2hlUmVzID0+IHtcbiAgICAgICAgcmV0dXJuIGNhY2hlUmVzIHx8IGZldGNoKGV2dC5yZXF1ZXN0KS50aGVuKGZldGNoUmVzID0+IHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVzLm9wZW4oZHluYW1pY0NhY2hlKS50aGVuKGNhY2hlID0+IHtcbiAgICAgICAgICAgIGNhY2hlLnB1dChldnQucmVxdWVzdC51cmwsIGZldGNoUmVzLmNsb25lKCkpO1xuICAgICAgICAgICAgLy8gY2hlY2sgY2FjaGVkIGl0ZW1zIHNpemVcbiAgICAgICAgICAgIGxpbWl0Q2FjaGVTaXplKGR5bmFtaWNDYWNoZSwgZGVmYXVsdENhY2hlU2l6ZSk7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXM7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGlmKGV2dC5yZXF1ZXN0LnVybC5pbmRleE9mKCcuaHRtbCcpID4gLTEpe1xuICAgICAgICAgIHJldHVybiBjYWNoZXMubWF0Y2goZmFsbGJhY2tQYWdlKTtcbiAgICAgICAgfSBcbiAgICAgIH0pXG4gICAgKTtcbiAgLy99XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/service/sw-define.ts\n");

/***/ })

/******/ });