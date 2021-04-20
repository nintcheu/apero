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
eval("\nconst staticCache = 'static-cache-v0';\nconst dynamicCache = 'dynamic-cache-v0';\nconst defaultCacheSize = 1;\nconst fallbackPage = '/fallback.html';\nconst assets = [\n    '/',\n    '/index.html',\n    '/favicon.ico',\n    '/fallback.html',\n    '/css/style.css',\n    '/css/materialize.min.css',\n    '/images/android-chrome-192x192.png',\n    '/images/android-chrome-512x512.png',\n    '/images/maskable_icon_x192.png',\n    '/images/maskable_icon_x512.png',\n    '/images/favicon-16x16.png',\n    '/images/favicon-32x32.png',\n    '/images/apple-touch-icon.png',\n    '/images/screen-540x7xx.png',\n    '/js/bundle.js',\n    '/js/wNumb.min.js',\n    'https://fonts.googleapis.com/icon?family=Material+Icons',\n    'https://dummyimage.com/150x150',\n    'https://dummyimage.com/300x250',\n    'https://materializecss.com/images/office.jpg',\n];\n// cache size limit function\nconst limitCacheSize = (name, size) => {\n    caches.open(name).then(cache => {\n        cache.keys().then(keys => {\n            if (keys.length > size) {\n                cache.delete(keys[0]).then(limitCacheSize(name, size));\n            }\n        });\n    });\n};\nself.addEventListener('install', (event) => {\n    //console.log('sw installed ', event);\n    event.waitUntil(caches.open(staticCache).then((cache) => {\n        //console.log('Adding static files to cache', cache);\n        return cache.addAll(assets);\n    }));\n});\nself.addEventListener('activate', (event) => {\n    //console.log('sw activated');\n    event.waitUntil(caches.keys().then((keys) => {\n        return Promise.all(keys\n            .filter((key) => key !== staticCache && key !== dynamicCache)\n            .map(key => caches.delete(key)));\n    }));\n});\n// fetch events\nself.addEventListener('fetch', (evt) => {\n    //if(evt.request.url.indexOf('googletagmanager.com') === -1){\n    evt.respondWith(caches.match(evt.request).then(cacheRes => {\n        return cacheRes || fetch(evt.request).then(fetchRes => {\n            return caches.open(dynamicCache).then(cache => {\n                if ((fetchRes instanceof Response) && (200 === fetchRes.status)) {\n                    cache.put(evt.request.url, fetchRes.clone());\n                }\n                else {\n                    // console.log(\"fetchRes: \", fetchRes);\n                }\n                // check cached items size\n                limitCacheSize(dynamicCache, defaultCacheSize);\n                return fetchRes;\n            });\n        });\n    }).catch(() => {\n        if (evt.request.url.indexOf('.html') > -1) {\n            return caches.match(fallbackPage);\n        }\n    }));\n    //}\n});\nfunction closeNotification(msg, evt) {\n    console.log(msg, evt.notification.data);\n    evt.notification.close();\n}\nself.addEventListener('notificationclose', (evt) => {\n    closeNotification(\"Notification closed\", evt);\n});\nself.addEventListener('notificationclick', (evt) => {\n    if (evt.action !== \"close\") {\n        evt.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: 'true' }).then(function (allclients) {\n            // do something with your clients list\n            console.log(\"allclients\", allclients);\n            for (let i = 0; i < allclients.length; i++) {\n                if (allclients[i].visibilityState === 'visible') {\n                    console.log(\"Navigating...\");\n                    allclients[i].navigate(evt.notification.data.loc);\n                    break;\n                }\n            }\n        }));\n    }\n    closeNotification(\"Notification Clicked\", evt);\n});\nself.addEventListener('push', function (e) {\n    var options = {\n        body: 'This notification for apéro',\n        icon: \"images/android-chrome-192x192.png\",\n        vibrate: [100, 50, 100],\n        data: {\n            dateOfArrival: Date.now(),\n            primaryKey: '2'\n        },\n        actions: [\n            {\n                action: 'explore', title: 'Explore this new world',\n                //icon: 'images/checkmark.png'\n            },\n            {\n                action: 'close', title: 'Close',\n                //icon: 'images/xmark.png'\n            },\n        ]\n    };\n    e.waitUntil(self.registration.showNotification('Hello world!', options));\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9zdy1kZWZpbml0aW9uLnRzP2I1MWEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDO0FBQ3RDLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBQ3hDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLE1BQU0sWUFBWSxHQUFHLGdCQUFnQjtBQUNyQyxNQUFNLE1BQU0sR0FDVjtJQUNFLEdBQUc7SUFDSCxhQUFhO0lBQ2IsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsMEJBQTBCO0lBQzFCLG9DQUFvQztJQUNwQyxvQ0FBb0M7SUFDcEMsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQywyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQix5REFBeUQ7SUFDekQsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyw4Q0FBOEM7Q0FDL0MsQ0FBQztBQUVKLDRCQUE0QjtBQUM1QixNQUFNLGNBQWMsR0FBRyxDQUFDLElBQVksRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM3QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFF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QyxHQUFHLEVBQUU7WUFDekIsVUFBVSxFQUFFLEdBQUc7U0FDaEI7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx3QkFBd0I7Z0JBQ2xELDhCQUE4QjthQUMvQjtZQUNEO2dCQUNFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU87Z0JBQy9CLDBCQUEwQjthQUMzQjtTQUNGO0tBQ0YsQ0FBQztJQUNGLENBQUMsQ0FBQyxTQUFTLENBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQzVELENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9zZXJ2aWNlL3N3LWRlZmluaXRpb24udHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHN0YXRpY0NhY2hlID0gJ3N0YXRpYy1jYWNoZS12MCc7XG5jb25zdCBkeW5hbWljQ2FjaGUgPSAnZHluYW1pYy1jYWNoZS12MCc7XG5jb25zdCBkZWZhdWx0Q2FjaGVTaXplID0gMTtcbmNvbnN0IGZhbGxiYWNrUGFnZSA9ICcvZmFsbGJhY2suaHRtbCdcbmNvbnN0IGFzc2V0cyA9XG4gIFtcbiAgICAnLycsXG4gICAgJy9pbmRleC5odG1sJyxcbiAgICAnL2Zhdmljb24uaWNvJyxcbiAgICAnL2ZhbGxiYWNrLmh0bWwnLFxuICAgICcvY3NzL3N0eWxlLmNzcycsXG4gICAgJy9jc3MvbWF0ZXJpYWxpemUubWluLmNzcycsXG4gICAgJy9pbWFnZXMvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmcnLFxuICAgICcvaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3gxOTIucG5nJyxcbiAgICAnL2ltYWdlcy9tYXNrYWJsZV9pY29uX3g1MTIucG5nJyxcbiAgICAnL2ltYWdlcy9mYXZpY29uLTE2eDE2LnBuZycsXG4gICAgJy9pbWFnZXMvZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICcvaW1hZ2VzL2FwcGxlLXRvdWNoLWljb24ucG5nJyxcbiAgICAnL2ltYWdlcy9zY3JlZW4tNTQweDd4eC5wbmcnLFxuICAgICcvanMvYnVuZGxlLmpzJyxcbiAgICAnL2pzL3dOdW1iLm1pbi5qcycsXG4gICAgJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMnLFxuICAgICdodHRwczovL2R1bW15aW1hZ2UuY29tLzE1MHgxNTAnLFxuICAgICdodHRwczovL2R1bW15aW1hZ2UuY29tLzMwMHgyNTAnLFxuICAgICdodHRwczovL21hdGVyaWFsaXplY3NzLmNvbS9pbWFnZXMvb2ZmaWNlLmpwZycsXG4gIF07XG5cbi8vIGNhY2hlIHNpemUgbGltaXQgZnVuY3Rpb25cbmNvbnN0IGxpbWl0Q2FjaGVTaXplID0gKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyKSA9PiB7XG4gIGNhY2hlcy5vcGVuKG5hbWUpLnRoZW4oY2FjaGUgPT4ge1xuICAgIGNhY2hlLmtleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgaWYgKGtleXMubGVuZ3RoID4gc2l6ZSkge1xuICAgICAgICBjYWNoZS5kZWxldGUoa2V5c1swXSkudGhlbihsaW1pdENhY2hlU2l6ZShuYW1lLCBzaXplKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgKGV2ZW50KSA9PiB7XG4gIC8vY29uc29sZS5sb2coJ3N3IGluc3RhbGxlZCAnLCBldmVudCk7XG5cbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5vcGVuKHN0YXRpY0NhY2hlKS50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgLy9jb25zb2xlLmxvZygnQWRkaW5nIHN0YXRpYyBmaWxlcyB0byBjYWNoZScsIGNhY2hlKTtcbiAgICAgIHJldHVybiBjYWNoZS5hZGRBbGwoYXNzZXRzKTtcbiAgICB9KVxuICApO1xufSk7XG5cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIChldmVudCkgPT4ge1xuICAvL2NvbnNvbGUubG9nKCdzdyBhY3RpdmF0ZWQnKTtcblxuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLmtleXMoKS50aGVuKChrZXlzKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoa2V5c1xuICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gc3RhdGljQ2FjaGUgJiYga2V5ICE9PSBkeW5hbWljQ2FjaGUpXG4gICAgICAgIC5tYXAoa2V5ID0+IGNhY2hlcy5kZWxldGUoa2V5KSkpO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG4vLyBmZXRjaCBldmVudHNcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCAoZXZ0OiBFdmVudCkgPT4ge1xuICAvL2lmKGV2dC5yZXF1ZXN0LnVybC5pbmRleE9mKCdnb29nbGV0YWdtYW5hZ2VyLmNvbScpID09PSAtMSl7XG4gIGV2dC5yZXNwb25kV2l0aChcbiAgICBjYWNoZXMubWF0Y2goZXZ0LnJlcXVlc3QpLnRoZW4oY2FjaGVSZXMgPT4ge1xuICAgICAgcmV0dXJuIGNhY2hlUmVzIHx8IGZldGNoKGV2dC5yZXF1ZXN0KS50aGVuKGZldGNoUmVzID0+IHtcbiAgICAgICAgcmV0dXJuIGNhY2hlcy5vcGVuKGR5bmFtaWNDYWNoZSkudGhlbihjYWNoZSA9PiB7XG5cbiAgICAgICAgICBpZiAoKGZldGNoUmVzIGluc3RhbmNlb2YgUmVzcG9uc2UpICYmICgyMDAgPT09IGZldGNoUmVzLnN0YXR1cykpIHtcbiAgICAgICAgICAgIGNhY2hlLnB1dChldnQucmVxdWVzdC51cmwsIGZldGNoUmVzLmNsb25lKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmV0Y2hSZXM6IFwiLCBmZXRjaFJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNoZWNrIGNhY2hlZCBpdGVtcyBzaXplXG4gICAgICAgICAgbGltaXRDYWNoZVNpemUoZHluYW1pY0NhY2hlLCBkZWZhdWx0Q2FjaGVTaXplKTtcbiAgICAgICAgICByZXR1cm4gZmV0Y2hSZXM7XG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBpZiAoZXZ0LnJlcXVlc3QudXJsLmluZGV4T2YoJy5odG1sJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gY2FjaGVzLm1hdGNoKGZhbGxiYWNrUGFnZSk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcbiAgLy99XG59KTtcblxuXG5mdW5jdGlvbiBjbG9zZU5vdGlmaWNhdGlvbihtc2csIGV2dCkge1xuICBjb25zb2xlLmxvZyhtc2csIGV2dC5ub3RpZmljYXRpb24uZGF0YSk7XG4gIGV2dC5ub3RpZmljYXRpb24uY2xvc2UoKTtcbn1cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdub3RpZmljYXRpb25jbG9zZScsIChldnQpID0+IHtcbiAgY2xvc2VOb3RpZmljYXRpb24oXCJOb3RpZmljYXRpb24gY2xvc2VkXCIsIGV2dCk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdub3RpZmljYXRpb25jbGljaycsIChldnQpID0+IHtcbiAgaWYgKGV2dC5hY3Rpb24gIT09IFwiY2xvc2VcIikge1xuXG4gICAgZXZ0LndhaXRVbnRpbChcbiAgICAgIHNlbGYuY2xpZW50cy5tYXRjaEFsbCh7IHR5cGU6ICd3aW5kb3cnLCBpbmNsdWRlVW5jb250cm9sbGVkOiAndHJ1ZScgfSkudGhlbihmdW5jdGlvbiAoYWxsY2xpZW50cykge1xuICAgICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB5b3VyIGNsaWVudHMgbGlzdFxuICAgICAgICBjb25zb2xlLmxvZyhcImFsbGNsaWVudHNcIiwgYWxsY2xpZW50cyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsY2xpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChhbGxjbGllbnRzW2ldLnZpc2liaWxpdHlTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZy4uLlwiKTtcbiAgICAgICAgICAgIGFsbGNsaWVudHNbaV0ubmF2aWdhdGUoZXZ0Lm5vdGlmaWNhdGlvbi5kYXRhLmxvYyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlTm90aWZpY2F0aW9uKFwiTm90aWZpY2F0aW9uIENsaWNrZWRcIiwgZXZ0KTtcbiAgXG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdwdXNoJywgZnVuY3Rpb24gKGUpIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgYm9keTogJ1RoaXMgbm90aWZpY2F0aW9uIGZvciBhcMOpcm8nLFxuICAgIGljb246IFwiaW1hZ2VzL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nXCIsXG4gICAgdmlicmF0ZTogWzEwMCwgNTAsIDEwMF0sXG4gICAgZGF0YToge1xuICAgICAgZGF0ZU9mQXJyaXZhbDogRGF0ZS5ub3coKSxcbiAgICAgIHByaW1hcnlLZXk6ICcyJ1xuICAgIH0sXG4gICAgYWN0aW9uczogW1xuICAgICAge1xuICAgICAgICBhY3Rpb246ICdleHBsb3JlJywgdGl0bGU6ICdFeHBsb3JlIHRoaXMgbmV3IHdvcmxkJyxcbiAgICAgICAgLy9pY29uOiAnaW1hZ2VzL2NoZWNrbWFyay5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhY3Rpb246ICdjbG9zZScsIHRpdGxlOiAnQ2xvc2UnLFxuICAgICAgICAvL2ljb246ICdpbWFnZXMveG1hcmsucG5nJ1xuICAgICAgfSxcbiAgICBdXG4gIH07XG4gIGUud2FpdFVudGlsKFxuICAgIHNlbGYucmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24oJ0hlbGxvIHdvcmxkIScsIG9wdGlvbnMpXG4gICk7XG59KTtcblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/service/sw-definition.ts\n");

/***/ })

/******/ });