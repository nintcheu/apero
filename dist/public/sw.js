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
eval("\nconst staticCache = 'static-cache-v0';\nconst dynamicCache = 'dynamic-cache-v0';\nconst defaultCacheSize = 1;\nconst fallbackPage = '/fallback.html';\nconst assets = [\n    '/',\n    '/index.html',\n    '/favicon.ico',\n    '/fallback.html',\n    '/css/style.css',\n    '/css/materialize.min.css',\n    '/images/android-chrome-192x192.png',\n    '/images/android-chrome-512x512.png',\n    '/images/maskable_icon_x192.png',\n    '/images/maskable_icon_x512.png',\n    '/images/favicon-16x16.png',\n    '/images/favicon-32x32.png',\n    '/images/apple-touch-icon.png',\n    '/images/screen-540x7xx.png',\n    '/js/bundle.js',\n    'https://fonts.googleapis.com/icon?family=Material+Icons',\n    'https://dummyimage.com/150x150',\n    'https://materializecss.com/images/office.jpg',\n];\n// cache size limit function\nconst limitCacheSize = (name, size) => {\n    caches.open(name).then(cache => {\n        cache.keys().then(keys => {\n            if (keys.length > size) {\n                cache.delete(keys[0]).then(limitCacheSize(name, size));\n            }\n        });\n    });\n};\nself.addEventListener('install', (event) => {\n    //console.log('sw installed ', event);\n    event.waitUntil(caches.open(staticCache).then((cache) => {\n        //console.log('Adding static files to cache', cache);\n        return cache.addAll(assets);\n    }));\n});\nself.addEventListener('activate', (event) => {\n    //console.log('sw activated');\n    event.waitUntil(caches.keys().then((keys) => {\n        return Promise.all(keys\n            .filter((key) => key !== staticCache && key !== dynamicCache)\n            .map(key => caches.delete(key)));\n    }));\n});\n// fetch events\nself.addEventListener('fetch', evt => {\n    if (evt.request.url.indexOf('googletagmanager.com') === -1) {\n        evt.respondWith(caches.match(evt.request).then(cacheRes => {\n            return cacheRes || fetch(evt.request).then(fetchRes => {\n                return caches.open(dynamicCache).then(cache => {\n                    cache.put(evt.request.url, fetchRes.clone());\n                    // check cached items size\n                    limitCacheSize(dynamicCache, defaultCacheSize);\n                    return fetchRes;\n                });\n            });\n        }).catch(() => {\n            if (evt.request.url.indexOf('.html') > -1) {\n                return caches.match(fallbackPage);\n            }\n        }));\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9zdy1kZWZpbmUudHM/YzY0NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFDdEMsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCO0FBQ3JDLE1BQU0sTUFBTSxHQUNWO0lBQ0UsR0FBRztJQUNILGFBQWE7SUFDYixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUNwQyxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixlQUFlO0lBQ2YseURBQXlEO0lBQ3pELGdDQUFnQztJQUNoQyw4Q0FBOEM7Q0FDL0MsQ0FBQztBQUdKLDRCQUE0QjtBQUM1QixNQUFNLGNBQWMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM3QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDekMsc0NBQXNDO0lBRXRDLEtBQUssQ0FBQyxTQUFTLENBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QyxxREFBcUQ7UUFDckQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUdILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxQyw4QkFBOEI7SUFFOUIsS0FBSyxDQUFDLFNBQVMsQ0FDYixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDcEIsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsS0FBSyxZQUFZLENBQUM7YUFDNUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBR0gsZUFBZTtBQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDbkMsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQztRQUN4RCxHQUFHLENBQUMsV0FBVyxDQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4QyxPQUFPLFFBQVEsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDcEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDNUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDN0MsMEJBQTBCO29CQUMxQixjQUFjLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQy9DLE9BQU8sUUFBUSxDQUFDO2dCQUNsQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztnQkFDdkMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiLi9zcmMvc2VydmljZS9zdy1kZWZpbmUudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdGF0aWNDYWNoZSA9ICdzdGF0aWMtY2FjaGUtdjAnO1xuY29uc3QgZHluYW1pY0NhY2hlID0gJ2R5bmFtaWMtY2FjaGUtdjAnO1xuY29uc3QgZGVmYXVsdENhY2hlU2l6ZSA9IDE7XG5jb25zdCBmYWxsYmFja1BhZ2UgPSAnL2ZhbGxiYWNrLmh0bWwnXG5jb25zdCBhc3NldHMgPVxuICBbXG4gICAgJy8nLFxuICAgICcvaW5kZXguaHRtbCcsXG4gICAgJy9mYXZpY29uLmljbycsXG4gICAgJy9mYWxsYmFjay5odG1sJyxcbiAgICAnL2Nzcy9zdHlsZS5jc3MnLFxuICAgICcvY3NzL21hdGVyaWFsaXplLm1pbi5jc3MnLFxuICAgICcvaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nJyxcbiAgICAnL2ltYWdlcy9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG4gICAgJy9pbWFnZXMvbWFza2FibGVfaWNvbl94MTkyLnBuZycsXG4gICAgJy9pbWFnZXMvbWFza2FibGVfaWNvbl94NTEyLnBuZycsXG4gICAgJy9pbWFnZXMvZmF2aWNvbi0xNngxNi5wbmcnLFxuICAgICcvaW1hZ2VzL2Zhdmljb24tMzJ4MzIucG5nJyxcbiAgICAnL2ltYWdlcy9hcHBsZS10b3VjaC1pY29uLnBuZycsXG4gICAgJy9pbWFnZXMvc2NyZWVuLTU0MHg3eHgucG5nJyxcbiAgICAnL2pzL2J1bmRsZS5qcycsXG4gICAgJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMnLFxuICAgICdodHRwczovL2R1bW15aW1hZ2UuY29tLzE1MHgxNTAnLFxuICAgICdodHRwczovL21hdGVyaWFsaXplY3NzLmNvbS9pbWFnZXMvb2ZmaWNlLmpwZycsXG4gIF07XG5cblxuLy8gY2FjaGUgc2l6ZSBsaW1pdCBmdW5jdGlvblxuY29uc3QgbGltaXRDYWNoZVNpemUgPSAobmFtZSwgc2l6ZSkgPT4ge1xuICBjYWNoZXMub3BlbihuYW1lKS50aGVuKGNhY2hlID0+IHtcbiAgICBjYWNoZS5rZXlzKCkudGhlbihrZXlzID0+IHtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IHNpemUpIHtcbiAgICAgICAgY2FjaGUuZGVsZXRlKGtleXNbMF0pLnRoZW4obGltaXRDYWNoZVNpemUobmFtZSwgc2l6ZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIChldmVudCkgPT4ge1xuICAvL2NvbnNvbGUubG9nKCdzdyBpbnN0YWxsZWQgJywgZXZlbnQpO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMub3BlbihzdGF0aWNDYWNoZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgIC8vY29uc29sZS5sb2coJ0FkZGluZyBzdGF0aWMgZmlsZXMgdG8gY2FjaGUnLCBjYWNoZSk7XG4gICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKGFzc2V0cyk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCAoZXZlbnQpID0+IHtcbiAgLy9jb25zb2xlLmxvZygnc3cgYWN0aXZhdGVkJyk7XG5cbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5rZXlzKCkudGhlbigoa2V5cykgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGtleXNcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09IHN0YXRpY0NhY2hlICYmIGtleSAhPT0gZHluYW1pY0NhY2hlKVxuICAgICAgICAubWFwKGtleSA9PiBjYWNoZXMuZGVsZXRlKGtleSkpKTtcbiAgICB9KVxuICApO1xufSk7XG5cblxuLy8gZmV0Y2ggZXZlbnRzXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZ0ID0+IHtcbiAgaWYoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJ2dvb2dsZXRhZ21hbmFnZXIuY29tJykgPT09IC0xKXtcbiAgICBldnQucmVzcG9uZFdpdGgoXG4gICAgICBjYWNoZXMubWF0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oY2FjaGVSZXMgPT4ge1xuICAgICAgICByZXR1cm4gY2FjaGVSZXMgfHwgZmV0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oZmV0Y2hSZXMgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWNoZXMub3BlbihkeW5hbWljQ2FjaGUpLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgY2FjaGUucHV0KGV2dC5yZXF1ZXN0LnVybCwgZmV0Y2hSZXMuY2xvbmUoKSk7XG4gICAgICAgICAgICAvLyBjaGVjayBjYWNoZWQgaXRlbXMgc2l6ZVxuICAgICAgICAgICAgbGltaXRDYWNoZVNpemUoZHluYW1pY0NhY2hlLCBkZWZhdWx0Q2FjaGVTaXplKTtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJlcztcbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgaWYoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJy5odG1sJykgPiAtMSl7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlcy5tYXRjaChmYWxsYmFja1BhZ2UpO1xuICAgICAgICB9IFxuICAgICAgfSlcbiAgICApO1xuICB9XG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/service/sw-define.ts\n");

/***/ })

/******/ });