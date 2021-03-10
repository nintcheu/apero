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
eval("\nconst staticCache = 'static-cache-v0';\nconst dynamicCache = 'dynamic-cache-v0';\nconst defaultCacheSize = 1;\nconst fallbackPage = '/fallback.html';\nconst assets = [\n    '/',\n    '/index.html',\n    '/favicon.ico',\n    '/fallback.html',\n    '/css/style.css',\n    '/css/materialize.min.css',\n    '/images/android-chrome-192x192.png',\n    '/images/android-chrome-512x512.png',\n    '/images/maskable_icon_x192.png',\n    '/images/maskable_icon_x512.png',\n    '/images/favicon-16x16.png',\n    '/images/favicon-32x32.png',\n    '/images/apple-touch-icon.png',\n    '/images/screen-540x7xx.png',\n    '/js/bundle.js',\n    '/js/materialize.min.js',\n    '/js/wNumb.min.js',\n    'https://fonts.googleapis.com/icon?family=Material+Icons',\n    'https://dummyimage.com/150x150',\n    'https://dummyimage.com/300x250',\n    'https://materializecss.com/images/office.jpg',\n];\n// cache size limit function\nconst limitCacheSize = (name, size) => {\n    caches.open(name).then(cache => {\n        cache.keys().then(keys => {\n            if (keys.length > size) {\n                cache.delete(keys[0]).then(limitCacheSize(name, size));\n            }\n        });\n    });\n};\nself.addEventListener('install', (event) => {\n    //console.log('sw installed ', event);\n    event.waitUntil(caches.open(staticCache).then((cache) => {\n        //console.log('Adding static files to cache', cache);\n        return cache.addAll(assets);\n    }));\n});\nself.addEventListener('activate', (event) => {\n    //console.log('sw activated');\n    event.waitUntil(caches.keys().then((keys) => {\n        return Promise.all(keys\n            .filter((key) => key !== staticCache && key !== dynamicCache)\n            .map(key => caches.delete(key)));\n    }));\n});\n// fetch events\nself.addEventListener('fetch', evt => {\n    if (evt.request.url.indexOf('googletagmanager.com') === -1) {\n        evt.respondWith(caches.match(evt.request).then(cacheRes => {\n            return cacheRes || fetch(evt.request).then(fetchRes => {\n                return caches.open(dynamicCache).then(cache => {\n                    if (fetchRes instanceof Response) {\n                        cache.put(evt.request.url, fetchRes.clone());\n                    }\n                    else {\n                        console.log(\"fetchRes: \", fetchRes);\n                    }\n                    // check cached items size\n                    limitCacheSize(dynamicCache, defaultCacheSize);\n                    return fetchRes;\n                });\n            });\n        }).catch(() => {\n            if (evt.request.url.indexOf('.html') > -1) {\n                return caches.match(fallbackPage);\n            }\n        }));\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9zdy1kZWZpbmUudHM/YzY0NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFDdEMsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCO0FBQ3JDLE1BQU0sTUFBTSxHQUNWO0lBQ0UsR0FBRztJQUNILGFBQWE7SUFDYixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUNwQyxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixlQUFlO0lBQ2Ysd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQix5REFBeUQ7SUFDekQsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyw4Q0FBOEM7Q0FDL0MsQ0FBQztBQUdKLDRCQUE0QjtBQUM1QixNQUFNLGNBQWMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM3QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDekMsc0NBQXNDO0lBRXRDLEtBQUssQ0FBQyxTQUFTLENBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QyxxREFBcUQ7UUFDckQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUdILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxQyw4QkFBOEI7SUFFOUIsS0FBSyxDQUFDLFNBQVMsQ0FDYixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDcEIsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsS0FBSyxZQUFZLENBQUM7YUFDNUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBR0gsZUFBZTtBQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDbkMsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQztRQUN4RCxHQUFHLENBQUMsV0FBVyxDQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4QyxPQUFPLFFBQVEsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDcEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFFNUMsSUFBRyxRQUFRLFlBQVksUUFBUSxFQUFDO3dCQUM5QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUM5Qzt5QkFBSTt3QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsMEJBQTBCO29CQUMxQixjQUFjLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQy9DLE9BQU8sUUFBUSxDQUFDO2dCQUNsQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztnQkFDdkMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiLi9zcmMvc2VydmljZS9zdy1kZWZpbmUudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdGF0aWNDYWNoZSA9ICdzdGF0aWMtY2FjaGUtdjAnO1xuY29uc3QgZHluYW1pY0NhY2hlID0gJ2R5bmFtaWMtY2FjaGUtdjAnO1xuY29uc3QgZGVmYXVsdENhY2hlU2l6ZSA9IDE7XG5jb25zdCBmYWxsYmFja1BhZ2UgPSAnL2ZhbGxiYWNrLmh0bWwnXG5jb25zdCBhc3NldHMgPVxuICBbXG4gICAgJy8nLFxuICAgICcvaW5kZXguaHRtbCcsXG4gICAgJy9mYXZpY29uLmljbycsXG4gICAgJy9mYWxsYmFjay5odG1sJyxcbiAgICAnL2Nzcy9zdHlsZS5jc3MnLFxuICAgICcvY3NzL21hdGVyaWFsaXplLm1pbi5jc3MnLFxuICAgICcvaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nJyxcbiAgICAnL2ltYWdlcy9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG4gICAgJy9pbWFnZXMvbWFza2FibGVfaWNvbl94MTkyLnBuZycsXG4gICAgJy9pbWFnZXMvbWFza2FibGVfaWNvbl94NTEyLnBuZycsXG4gICAgJy9pbWFnZXMvZmF2aWNvbi0xNngxNi5wbmcnLFxuICAgICcvaW1hZ2VzL2Zhdmljb24tMzJ4MzIucG5nJyxcbiAgICAnL2ltYWdlcy9hcHBsZS10b3VjaC1pY29uLnBuZycsXG4gICAgJy9pbWFnZXMvc2NyZWVuLTU0MHg3eHgucG5nJyxcbiAgICAnL2pzL2J1bmRsZS5qcycsXG4gICAgJy9qcy9tYXRlcmlhbGl6ZS5taW4uanMnLFxuICAgICcvanMvd051bWIubWluLmpzJyxcbiAgICAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucycsXG4gICAgJ2h0dHBzOi8vZHVtbXlpbWFnZS5jb20vMTUweDE1MCcsXG4gICAgJ2h0dHBzOi8vZHVtbXlpbWFnZS5jb20vMzAweDI1MCcsXG4gICAgJ2h0dHBzOi8vbWF0ZXJpYWxpemVjc3MuY29tL2ltYWdlcy9vZmZpY2UuanBnJyxcbiAgXTtcblxuXG4vLyBjYWNoZSBzaXplIGxpbWl0IGZ1bmN0aW9uXG5jb25zdCBsaW1pdENhY2hlU2l6ZSA9IChuYW1lLCBzaXplKSA9PiB7XG4gIGNhY2hlcy5vcGVuKG5hbWUpLnRoZW4oY2FjaGUgPT4ge1xuICAgIGNhY2hlLmtleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgaWYgKGtleXMubGVuZ3RoID4gc2l6ZSkge1xuICAgICAgICBjYWNoZS5kZWxldGUoa2V5c1swXSkudGhlbihsaW1pdENhY2hlU2l6ZShuYW1lLCBzaXplKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgKGV2ZW50KSA9PiB7XG4gIC8vY29uc29sZS5sb2coJ3N3IGluc3RhbGxlZCAnLCBldmVudCk7XG5cbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5vcGVuKHN0YXRpY0NhY2hlKS50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgLy9jb25zb2xlLmxvZygnQWRkaW5nIHN0YXRpYyBmaWxlcyB0byBjYWNoZScsIGNhY2hlKTtcbiAgICAgIHJldHVybiBjYWNoZS5hZGRBbGwoYXNzZXRzKTtcbiAgICB9KVxuICApO1xufSk7XG5cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIChldmVudCkgPT4ge1xuICAvL2NvbnNvbGUubG9nKCdzdyBhY3RpdmF0ZWQnKTtcblxuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLmtleXMoKS50aGVuKChrZXlzKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoa2V5c1xuICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gc3RhdGljQ2FjaGUgJiYga2V5ICE9PSBkeW5hbWljQ2FjaGUpXG4gICAgICAgIC5tYXAoa2V5ID0+IGNhY2hlcy5kZWxldGUoa2V5KSkpO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG4vLyBmZXRjaCBldmVudHNcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCBldnQgPT4ge1xuICBpZihldnQucmVxdWVzdC51cmwuaW5kZXhPZignZ29vZ2xldGFnbWFuYWdlci5jb20nKSA9PT0gLTEpe1xuICAgIGV2dC5yZXNwb25kV2l0aChcbiAgICAgIGNhY2hlcy5tYXRjaChldnQucmVxdWVzdCkudGhlbihjYWNoZVJlcyA9PiB7XG4gICAgICAgIHJldHVybiBjYWNoZVJlcyB8fCBmZXRjaChldnQucmVxdWVzdCkudGhlbihmZXRjaFJlcyA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlcy5vcGVuKGR5bmFtaWNDYWNoZSkudGhlbihjYWNoZSA9PiB7XG5cbiAgICAgICAgICAgIGlmKGZldGNoUmVzIGluc3RhbmNlb2YgUmVzcG9uc2Upe1xuICAgICAgICAgICAgICBjYWNoZS5wdXQoZXZ0LnJlcXVlc3QudXJsLCBmZXRjaFJlcy5jbG9uZSgpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZldGNoUmVzOiBcIiwgZmV0Y2hSZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2hlY2sgY2FjaGVkIGl0ZW1zIHNpemVcbiAgICAgICAgICAgIGxpbWl0Q2FjaGVTaXplKGR5bmFtaWNDYWNoZSwgZGVmYXVsdENhY2hlU2l6ZSk7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXM7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGlmKGV2dC5yZXF1ZXN0LnVybC5pbmRleE9mKCcuaHRtbCcpID4gLTEpe1xuICAgICAgICAgIHJldHVybiBjYWNoZXMubWF0Y2goZmFsbGJhY2tQYWdlKTtcbiAgICAgICAgfSBcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufSk7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/service/sw-define.ts\n");

/***/ })

/******/ });