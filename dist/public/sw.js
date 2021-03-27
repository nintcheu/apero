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
eval("\nconst staticCache = 'static-cache-v0';\nconst dynamicCache = 'dynamic-cache-v0';\nconst defaultCacheSize = 1;\nconst fallbackPage = '/fallback.html';\nconst assets = [\n    '/',\n    '/index.html',\n    '/favicon.ico',\n    '/fallback.html',\n    '/css/style.css',\n    '/css/materialize.min.css',\n    '/images/android-chrome-192x192.png',\n    '/images/android-chrome-512x512.png',\n    '/images/maskable_icon_x192.png',\n    '/images/maskable_icon_x512.png',\n    '/images/favicon-16x16.png',\n    '/images/favicon-32x32.png',\n    '/images/apple-touch-icon.png',\n    '/images/screen-540x7xx.png',\n    '/js/bundle.js',\n    '/js/wNumb.min.js',\n    'https://fonts.googleapis.com/icon?family=Material+Icons',\n    'https://dummyimage.com/150x150',\n    'https://dummyimage.com/300x250',\n    'https://materializecss.com/images/office.jpg',\n];\n// cache size limit function\nconst limitCacheSize = (name, size) => {\n    caches.open(name).then(cache => {\n        cache.keys().then(keys => {\n            if (keys.length > size) {\n                cache.delete(keys[0]).then(limitCacheSize(name, size));\n            }\n        });\n    });\n};\nself.addEventListener('install', (event) => {\n    //console.log('sw installed ', event);\n    event.waitUntil(caches.open(staticCache).then((cache) => {\n        //console.log('Adding static files to cache', cache);\n        return cache.addAll(assets);\n    }));\n});\nself.addEventListener('activate', (event) => {\n    //console.log('sw activated');\n    event.waitUntil(caches.keys().then((keys) => {\n        return Promise.all(keys\n            .filter((key) => key !== staticCache && key !== dynamicCache)\n            .map(key => caches.delete(key)));\n    }));\n});\n// fetch events\nself.addEventListener('fetch', (evt) => {\n    //if(evt.request.url.indexOf('googletagmanager.com') === -1){\n    evt.respondWith(caches.match(evt.request).then(cacheRes => {\n        return cacheRes || fetch(evt.request).then(fetchRes => {\n            return caches.open(dynamicCache).then(cache => {\n                if ((fetchRes instanceof Response) && (200 === fetchRes.status)) {\n                    cache.put(evt.request.url, fetchRes.clone());\n                }\n                else {\n                    console.log(\"fetchRes: \", fetchRes);\n                }\n                // check cached items size\n                limitCacheSize(dynamicCache, defaultCacheSize);\n                return fetchRes;\n            });\n        });\n    }).catch(() => {\n        if (evt.request.url.indexOf('.html') > -1) {\n            return caches.match(fallbackPage);\n        }\n    }));\n    //}\n});\nself.addEventListener('push', function (e) {\n    var options = {\n        body: 'This notification was generated from a push! for apéro',\n        //icon: 'images/example.png',\n        vibrate: [100, 50, 100],\n        data: {\n            dateOfArrival: Date.now(),\n            primaryKey: '2'\n        },\n        actions: [\n            { action: 'explore', title: 'Explore this new world',\n                //icon: 'images/checkmark.png'\n            },\n            { action: 'close', title: 'Close',\n                //icon: 'images/xmark.png'\n            },\n        ]\n    };\n    e.waitUntil(self.registration.showNotification('Hello world!', options));\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9zdy1kZWZpbmUudHM/YzY0NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFDdEMsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCO0FBQ3JDLE1BQU0sTUFBTSxHQUNWO0lBQ0UsR0FBRztJQUNILGFBQWE7SUFDYixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUNwQyxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLHlEQUF5RDtJQUN6RCxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDhDQUE4QztDQUMvQyxDQUFDO0FBR0osNEJBQTRCO0FBQzVCLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxFQUFFO0lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzdCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRTtnQkFDdEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUN6QyxzQ0FBc0M7SUFFdEMsS0FBSyxDQUFDLFNBQVMsQ0FDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3RDLHFEQUFxRDtRQUNyRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzFDLDhCQUE4QjtJQUU5QixLQUFLLENBQUMsU0FBUyxDQUNiLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTthQUNwQixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLFlBQVksQ0FBQzthQUM1RCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFHSCxlQUFlO0FBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFO0lBQzVDLDZEQUE2RDtJQUMzRCxHQUFHLENBQUMsV0FBVyxDQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4QyxPQUFPLFFBQVEsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUU1QyxJQUFHLENBQUMsUUFBUSxZQUFZLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQztvQkFDN0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDOUM7cUJBQUk7b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELDBCQUEwQjtnQkFDMUIsY0FBYyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDWixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztZQUN2QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osR0FBRztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFTLENBQUM7SUFDdEMsSUFBSSxPQUFPLEdBQUc7UUFDWixJQUFJLEVBQUUsd0RBQXdEO1FBQzlELDZCQUE2QjtRQUM3QixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztRQUN2QixJQUFJLEVBQUU7WUFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN6QixVQUFVLEVBQUUsR0FBRztTQUNoQjtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsd0JBQXdCO2dCQUNqRCw4QkFBOEI7YUFDL0I7WUFDRCxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU87Z0JBQzlCLDBCQUEwQjthQUMzQjtTQUNGO0tBQ0YsQ0FBQztJQUNGLENBQUMsQ0FBQyxTQUFTLENBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQzVELENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9zZXJ2aWNlL3N3LWRlZmluZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0YXRpY0NhY2hlID0gJ3N0YXRpYy1jYWNoZS12MCc7XG5jb25zdCBkeW5hbWljQ2FjaGUgPSAnZHluYW1pYy1jYWNoZS12MCc7XG5jb25zdCBkZWZhdWx0Q2FjaGVTaXplID0gMTtcbmNvbnN0IGZhbGxiYWNrUGFnZSA9ICcvZmFsbGJhY2suaHRtbCdcbmNvbnN0IGFzc2V0cyA9XG4gIFtcbiAgICAnLycsXG4gICAgJy9pbmRleC5odG1sJyxcbiAgICAnL2Zhdmljb24uaWNvJyxcbiAgICAnL2ZhbGxiYWNrLmh0bWwnLFxuICAgICcvY3NzL3N0eWxlLmNzcycsXG4gICAgJy9jc3MvbWF0ZXJpYWxpemUubWluLmNzcycsXG4gICAgJy9pbWFnZXMvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmcnLFxuICAgICcvaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3gxOTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3g1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9mYXZpY29uLTE2eDE2LnBuZycsXG4gICAgJy9pbWFnZXMvZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICcvaW1hZ2VzL2FwcGxlLXRvdWNoLWljb24ucG5nJyxcbiAgICAnL2ltYWdlcy9zY3JlZW4tNTQweDd4eC5wbmcnLFxuICAgICcvanMvYnVuZGxlLmpzJyxcbiAgICAnL2pzL3dOdW1iLm1pbi5qcycsXG4gICAgJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMnLFxuICAgICdodHRwczovL2R1bW15aW1hZ2UuY29tLzE1MHgxNTAnLFxuICAgICdodHRwczovL2R1bW15aW1hZ2UuY29tLzMwMHgyNTAnLFxuICAgICdodHRwczovL21hdGVyaWFsaXplY3NzLmNvbS9pbWFnZXMvb2ZmaWNlLmpwZycsXG4gIF07XG5cblxuLy8gY2FjaGUgc2l6ZSBsaW1pdCBmdW5jdGlvblxuY29uc3QgbGltaXRDYWNoZVNpemUgPSAobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIpID0+IHtcbiAgY2FjaGVzLm9wZW4obmFtZSkudGhlbihjYWNoZSA9PiB7XG4gICAgY2FjaGUua2V5cygpLnRoZW4oa2V5cyA9PiB7XG4gICAgICBpZiAoa2V5cy5sZW5ndGggPiBzaXplKSB7XG4gICAgICAgIGNhY2hlLmRlbGV0ZShrZXlzWzBdKS50aGVuKGxpbWl0Q2FjaGVTaXplKG5hbWUsIHNpemUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCAoZXZlbnQpID0+IHtcbiAgLy9jb25zb2xlLmxvZygnc3cgaW5zdGFsbGVkICcsIGV2ZW50KTtcblxuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLm9wZW4oc3RhdGljQ2FjaGUpLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdBZGRpbmcgc3RhdGljIGZpbGVzIHRvIGNhY2hlJywgY2FjaGUpO1xuICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChhc3NldHMpO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgKGV2ZW50KSA9PiB7XG4gIC8vY29uc29sZS5sb2coJ3N3IGFjdGl2YXRlZCcpO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMua2V5cygpLnRoZW4oKGtleXMpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChrZXlzXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSBzdGF0aWNDYWNoZSAmJiBrZXkgIT09IGR5bmFtaWNDYWNoZSlcbiAgICAgICAgLm1hcChrZXkgPT4gY2FjaGVzLmRlbGV0ZShrZXkpKSk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG5cbi8vIGZldGNoIGV2ZW50c1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIChldnQ6IEV2ZW50KSA9PiB7XG4gIC8vaWYoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJ2dvb2dsZXRhZ21hbmFnZXIuY29tJykgPT09IC0xKXtcbiAgICBldnQucmVzcG9uZFdpdGgoXG4gICAgICBjYWNoZXMubWF0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oY2FjaGVSZXMgPT4ge1xuICAgICAgICByZXR1cm4gY2FjaGVSZXMgfHwgZmV0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oZmV0Y2hSZXMgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWNoZXMub3BlbihkeW5hbWljQ2FjaGUpLnRoZW4oY2FjaGUgPT4ge1xuXG4gICAgICAgICAgICBpZigoZmV0Y2hSZXMgaW5zdGFuY2VvZiBSZXNwb25zZSkgJiYgKDIwMCA9PT0gZmV0Y2hSZXMuc3RhdHVzKSl7XG4gICAgICAgICAgICAgIGNhY2hlLnB1dChldnQucmVxdWVzdC51cmwsIGZldGNoUmVzLmNsb25lKCkpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmV0Y2hSZXM6IFwiLCBmZXRjaFJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGVjayBjYWNoZWQgaXRlbXMgc2l6ZVxuICAgICAgICAgICAgbGltaXRDYWNoZVNpemUoZHluYW1pY0NhY2hlLCBkZWZhdWx0Q2FjaGVTaXplKTtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJlcztcbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgaWYoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJy5odG1sJykgPiAtMSl7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlcy5tYXRjaChmYWxsYmFja1BhZ2UpO1xuICAgICAgICB9IFxuICAgICAgfSlcbiAgICApO1xuICAvL31cbn0pO1xuXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigncHVzaCcsIGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgYm9keTogJ1RoaXMgbm90aWZpY2F0aW9uIHdhcyBnZW5lcmF0ZWQgZnJvbSBhIHB1c2ghIGZvciBhcMOpcm8nLFxuICAgIC8vaWNvbjogJ2ltYWdlcy9leGFtcGxlLnBuZycsXG4gICAgdmlicmF0ZTogWzEwMCwgNTAsIDEwMF0sXG4gICAgZGF0YToge1xuICAgICAgZGF0ZU9mQXJyaXZhbDogRGF0ZS5ub3coKSxcbiAgICAgIHByaW1hcnlLZXk6ICcyJ1xuICAgIH0sXG4gICAgYWN0aW9uczogW1xuICAgICAge2FjdGlvbjogJ2V4cGxvcmUnLCB0aXRsZTogJ0V4cGxvcmUgdGhpcyBuZXcgd29ybGQnLFxuICAgICAgICAvL2ljb246ICdpbWFnZXMvY2hlY2ttYXJrLnBuZydcbiAgICAgIH0sXG4gICAgICB7YWN0aW9uOiAnY2xvc2UnLCB0aXRsZTogJ0Nsb3NlJyxcbiAgICAgICAgLy9pY29uOiAnaW1hZ2VzL3htYXJrLnBuZydcbiAgICAgIH0sXG4gICAgXVxuICB9O1xuICBlLndhaXRVbnRpbChcbiAgICBzZWxmLnJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKCdIZWxsbyB3b3JsZCEnLCBvcHRpb25zKVxuICApO1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/service/sw-define.ts\n");

/***/ })

/******/ });