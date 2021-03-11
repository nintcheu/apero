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
eval("\nconst staticCache = 'static-cache-v0';\nconst dynamicCache = 'dynamic-cache-v0';\nconst defaultCacheSize = 1;\nconst fallbackPage = '/fallback.html';\nconst assets = [\n    '/',\n    '/index.html',\n    '/favicon.ico',\n    '/fallback.html',\n    '/css/style.css',\n    '/css/materialize.min.css',\n    '/images/android-chrome-192x192.png',\n    '/images/android-chrome-512x512.png',\n    '/images/maskable_icon_x192.png',\n    '/images/maskable_icon_x512.png',\n    '/images/favicon-16x16.png',\n    '/images/favicon-32x32.png',\n    '/images/apple-touch-icon.png',\n    '/images/screen-540x7xx.png',\n    '/js/bundle.js',\n    '/js/wNumb.min.js',\n    'https://fonts.googleapis.com/icon?family=Material+Icons',\n    'https://dummyimage.com/150x150',\n    'https://dummyimage.com/300x250',\n    'https://materializecss.com/images/office.jpg',\n];\n// cache size limit function\nconst limitCacheSize = (name, size) => {\n    caches.open(name).then(cache => {\n        cache.keys().then(keys => {\n            if (keys.length > size) {\n                cache.delete(keys[0]).then(limitCacheSize(name, size));\n            }\n        });\n    });\n};\nself.addEventListener('install', (event) => {\n    //console.log('sw installed ', event);\n    event.waitUntil(caches.open(staticCache).then((cache) => {\n        //console.log('Adding static files to cache', cache);\n        return cache.addAll(assets);\n    }));\n});\nself.addEventListener('activate', (event) => {\n    //console.log('sw activated');\n    event.waitUntil(caches.keys().then((keys) => {\n        return Promise.all(keys\n            .filter((key) => key !== staticCache && key !== dynamicCache)\n            .map(key => caches.delete(key)));\n    }));\n});\n// fetch events\nself.addEventListener('fetch', evt => {\n    if (evt.request.url.indexOf('googletagmanager.com') === -1) {\n        evt.respondWith(caches.match(evt.request).then(cacheRes => {\n            return cacheRes || fetch(evt.request).then(fetchRes => {\n                return caches.open(dynamicCache).then(cache => {\n                    if (fetchRes instanceof Response) {\n                        cache.put(evt.request.url, fetchRes.clone());\n                    }\n                    else {\n                        console.log(\"fetchRes: \", fetchRes);\n                    }\n                    // check cached items size\n                    limitCacheSize(dynamicCache, defaultCacheSize);\n                    return fetchRes;\n                });\n            });\n        }).catch(() => {\n            if (evt.request.url.indexOf('.html') > -1) {\n                return caches.match(fallbackPage);\n            }\n        }));\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9zdy1kZWZpbmUudHM/YzY0NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFDdEMsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCO0FBQ3JDLE1BQU0sTUFBTSxHQUNWO0lBQ0UsR0FBRztJQUNILGFBQWE7SUFDYixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUNwQyxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLHlEQUF5RDtJQUN6RCxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDhDQUE4QztDQUMvQyxDQUFDO0FBR0osNEJBQTRCO0FBQzVCLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzdCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRTtnQkFDdEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUN6QyxzQ0FBc0M7SUFFdEMsS0FBSyxDQUFDLFNBQVMsQ0FDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3RDLHFEQUFxRDtRQUNyRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzFDLDhCQUE4QjtJQUU5QixLQUFLLENBQUMsU0FBUyxDQUNiLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTthQUNwQixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLFlBQVksQ0FBQzthQUM1RCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFHSCxlQUFlO0FBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNuQyxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDO1FBQ3hELEdBQUcsQ0FBQyxXQUFXLENBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sUUFBUSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUU1QyxJQUFHLFFBQVEsWUFBWSxRQUFRLEVBQUM7d0JBQzlCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7cUJBQzlDO3lCQUFJO3dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCwwQkFBMEI7b0JBQzFCLGNBQWMsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxRQUFRLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO2dCQUN2QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9zZXJ2aWNlL3N3LWRlZmluZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0YXRpY0NhY2hlID0gJ3N0YXRpYy1jYWNoZS12MCc7XG5jb25zdCBkeW5hbWljQ2FjaGUgPSAnZHluYW1pYy1jYWNoZS12MCc7XG5jb25zdCBkZWZhdWx0Q2FjaGVTaXplID0gMTtcbmNvbnN0IGZhbGxiYWNrUGFnZSA9ICcvZmFsbGJhY2suaHRtbCdcbmNvbnN0IGFzc2V0cyA9XG4gIFtcbiAgICAnLycsXG4gICAgJy9pbmRleC5odG1sJyxcbiAgICAnL2Zhdmljb24uaWNvJyxcbiAgICAnL2ZhbGxiYWNrLmh0bWwnLFxuICAgICcvY3NzL3N0eWxlLmNzcycsXG4gICAgJy9jc3MvbWF0ZXJpYWxpemUubWluLmNzcycsXG4gICAgJy9pbWFnZXMvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmcnLFxuICAgICcvaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3gxOTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3g1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9mYXZpY29uLTE2eDE2LnBuZycsXG4gICAgJy9pbWFnZXMvZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICcvaW1hZ2VzL2FwcGxlLXRvdWNoLWljb24ucG5nJyxcbiAgICAnL2ltYWdlcy9zY3JlZW4tNTQweDd4eC5wbmcnLFxuICAgICcvanMvYnVuZGxlLmpzJyxcbiAgICAnL2pzL3dOdW1iLm1pbi5qcycsXG4gICAgJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMnLFxuICAgICdodHRwczovL2R1bW15aW1hZ2UuY29tLzE1MHgxNTAnLFxuICAgICdodHRwczovL2R1bW15aW1hZ2UuY29tLzMwMHgyNTAnLFxuICAgICdodHRwczovL21hdGVyaWFsaXplY3NzLmNvbS9pbWFnZXMvb2ZmaWNlLmpwZycsXG4gIF07XG5cblxuLy8gY2FjaGUgc2l6ZSBsaW1pdCBmdW5jdGlvblxuY29uc3QgbGltaXRDYWNoZVNpemUgPSAobmFtZSwgc2l6ZSkgPT4ge1xuICBjYWNoZXMub3BlbihuYW1lKS50aGVuKGNhY2hlID0+IHtcbiAgICBjYWNoZS5rZXlzKCkudGhlbihrZXlzID0+IHtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IHNpemUpIHtcbiAgICAgICAgY2FjaGUuZGVsZXRlKGtleXNbMF0pLnRoZW4obGltaXRDYWNoZVNpemUobmFtZSwgc2l6ZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIChldmVudCkgPT4ge1xuICAvL2NvbnNvbGUubG9nKCdzdyBpbnN0YWxsZWQgJywgZXZlbnQpO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMub3BlbihzdGF0aWNDYWNoZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgIC8vY29uc29sZS5sb2coJ0FkZGluZyBzdGF0aWMgZmlsZXMgdG8gY2FjaGUnLCBjYWNoZSk7XG4gICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKGFzc2V0cyk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCAoZXZlbnQpID0+IHtcbiAgLy9jb25zb2xlLmxvZygnc3cgYWN0aXZhdGVkJyk7XG5cbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5rZXlzKCkudGhlbigoa2V5cykgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGtleXNcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09IHN0YXRpY0NhY2hlICYmIGtleSAhPT0gZHluYW1pY0NhY2hlKVxuICAgICAgICAubWFwKGtleSA9PiBjYWNoZXMuZGVsZXRlKGtleSkpKTtcbiAgICB9KVxuICApO1xufSk7XG5cblxuLy8gZmV0Y2ggZXZlbnRzXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZ0ID0+IHtcbiAgaWYoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJ2dvb2dsZXRhZ21hbmFnZXIuY29tJykgPT09IC0xKXtcbiAgICBldnQucmVzcG9uZFdpdGgoXG4gICAgICBjYWNoZXMubWF0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oY2FjaGVSZXMgPT4ge1xuICAgICAgICByZXR1cm4gY2FjaGVSZXMgfHwgZmV0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oZmV0Y2hSZXMgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWNoZXMub3BlbihkeW5hbWljQ2FjaGUpLnRoZW4oY2FjaGUgPT4ge1xuXG4gICAgICAgICAgICBpZihmZXRjaFJlcyBpbnN0YW5jZW9mIFJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgY2FjaGUucHV0KGV2dC5yZXF1ZXN0LnVybCwgZmV0Y2hSZXMuY2xvbmUoKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmZXRjaFJlczogXCIsIGZldGNoUmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIGNhY2hlZCBpdGVtcyBzaXplXG4gICAgICAgICAgICBsaW1pdENhY2hlU2l6ZShkeW5hbWljQ2FjaGUsIGRlZmF1bHRDYWNoZVNpemUpO1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoUmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBpZihldnQucmVxdWVzdC51cmwuaW5kZXhPZignLmh0bWwnKSA+IC0xKXtcbiAgICAgICAgICByZXR1cm4gY2FjaGVzLm1hdGNoKGZhbGxiYWNrUGFnZSk7XG4gICAgICAgIH0gXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/service/sw-define.ts\n");

/***/ })

/******/ });