"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_panap_OneDrive_Desktop_panaHM_React_PromptPlan_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\panap\\\\OneDrive\\\\Desktop\\\\panaHM\\\\React\\\\PromptPlan\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_panap_OneDrive_Desktop_panaHM_React_PromptPlan_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNwYW5hcCU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q3BhbmFITSU1Q1JlYWN0JTVDUHJvbXB0UGxhbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDcGFuYXAlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNwYW5hSE0lNUNSZWFjdCU1Q1Byb21wdFBsYW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3VEO0FBQ3BJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbXB0cGxhbi8/ZWM2YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxwYW5hcFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHBhbmFITVxcXFxSZWFjdFxcXFxQcm9tcHRQbGFuXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHBhbmFwXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxccGFuYUhNXFxcXFJlYWN0XFxcXFByb21wdFBsYW5cXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\nconst { GET, POST } = _auth__WEBPACK_IMPORTED_MODULE_0__.handlers;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBaUM7QUFFMUIsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRSxHQUFHRiwyQ0FBUUEsQ0FBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb21wdHBsYW4vLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhbmRsZXJzIH0gZnJvbSAnQC9hdXRoJ1xuXG5leHBvcnQgY29uc3QgeyBHRVQsIFBPU1QgfSA9IGhhbmRsZXJzXG4iXSwibmFtZXMiOlsiaGFuZGxlcnMiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.config.ts":
/*!************************!*\
  !*** ./auth.config.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authConfig: () => (/* binding */ authConfig)\n/* harmony export */ });\nconst authConfig = {\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        authorized ({ auth, request: { nextUrl } }) {\n            const isLoggedIn = !!auth?.user;\n            const isLoginPage = nextUrl.pathname === \"/login\";\n            if (isLoginPage) {\n                if (isLoggedIn) return Response.redirect(new URL(\"/\", nextUrl));\n                return true;\n            }\n            return isLoggedIn;\n        }\n    },\n    providers: []\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hdXRoLmNvbmZpZy50cyIsIm1hcHBpbmdzIjoiOzs7O0FBRU8sTUFBTUEsYUFBNkI7SUFDeENDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFdBQVc7UUFDVEMsWUFBVyxFQUFFQyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsT0FBTyxFQUFFLEVBQUU7WUFDdkMsTUFBTUMsYUFBYSxDQUFDLENBQUNILE1BQU1JO1lBQzNCLE1BQU1DLGNBQWNILFFBQVFJLFFBQVEsS0FBSztZQUN6QyxJQUFJRCxhQUFhO2dCQUNmLElBQUlGLFlBQVksT0FBT0ksU0FBU0MsUUFBUSxDQUFDLElBQUlDLElBQUksS0FBS1A7Z0JBQ3RELE9BQU87WUFDVDtZQUNBLE9BQU9DO1FBQ1Q7SUFDRjtJQUNBTyxXQUFXLEVBQUU7QUFDZixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbXB0cGxhbi8uL2F1dGguY29uZmlnLnRzPzQzMDgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXV0aENvbmZpZyB9IGZyb20gJ25leHQtYXV0aCdcblxuZXhwb3J0IGNvbnN0IGF1dGhDb25maWc6IE5leHRBdXRoQ29uZmlnID0ge1xuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9sb2dpbicsXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGF1dGhvcml6ZWQoeyBhdXRoLCByZXF1ZXN0OiB7IG5leHRVcmwgfSB9KSB7XG4gICAgICBjb25zdCBpc0xvZ2dlZEluID0gISFhdXRoPy51c2VyXG4gICAgICBjb25zdCBpc0xvZ2luUGFnZSA9IG5leHRVcmwucGF0aG5hbWUgPT09ICcvbG9naW4nXG4gICAgICBpZiAoaXNMb2dpblBhZ2UpIHtcbiAgICAgICAgaWYgKGlzTG9nZ2VkSW4pIHJldHVybiBSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvJywgbmV4dFVybCkpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gaXNMb2dnZWRJblxuICAgIH0sXG4gIH0sXG4gIHByb3ZpZGVyczogW10sXG59Il0sIm5hbWVzIjpbImF1dGhDb25maWciLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImF1dGhvcml6ZWQiLCJhdXRoIiwicmVxdWVzdCIsIm5leHRVcmwiLCJpc0xvZ2dlZEluIiwidXNlciIsImlzTG9naW5QYWdlIiwicGF0aG5hbWUiLCJSZXNwb25zZSIsInJlZGlyZWN0IiwiVVJMIiwicHJvdmlkZXJzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./auth.config.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   handlers: () => (/* binding */ handlers),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _auth_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/auth.config */ \"(rsc)/./auth.config.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _schemas_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/schemas/auth */ \"(rsc)/./schemas/auth.ts\");\n\n\n\n\n\n\nconst { handlers, auth, signIn, signOut } = (0,next_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    ..._auth_config__WEBPACK_IMPORTED_MODULE_3__.authConfig,\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        ..._auth_config__WEBPACK_IMPORTED_MODULE_3__.authConfig.callbacks,\n        jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        session ({ session, token }) {\n            session.user.id = token.id;\n            session.user.role = token.role;\n            return session;\n        }\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            async authorize (credentials) {\n                const parsed = _schemas_auth__WEBPACK_IMPORTED_MODULE_5__.loginSchema.safeParse(credentials);\n                if (!parsed.success) return null;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.user.findUnique({\n                    where: {\n                        username: parsed.data.username\n                    }\n                });\n                if (!user) return null;\n                const passwordsMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(parsed.data.password, user.passwordHash);\n                if (!passwordsMatch) return null;\n                return {\n                    id: user.id,\n                    name: user.username,\n                    role: user.role\n                };\n            }\n        })\n    ]\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWdDO0FBQ3lCO0FBQzVCO0FBQ2E7QUFDTDtBQUNPO0FBRXJDLE1BQU0sRUFBRU0sUUFBUSxFQUFFQyxJQUFJLEVBQUVDLE1BQU0sRUFBRUMsT0FBTyxFQUFFLEdBQUdULHFEQUFRQSxDQUFDO0lBQzFELEdBQUdHLG9EQUFVO0lBQ2JPLFNBQVM7UUFBRUMsVUFBVTtJQUFNO0lBQzNCQyxXQUFXO1FBQ1QsR0FBR1Qsb0RBQVVBLENBQUNTLFNBQVM7UUFDdkJDLEtBQUksRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUU7WUFDakIsSUFBSUEsTUFBTTtnQkFDUkQsTUFBTUUsRUFBRSxHQUFHRCxLQUFLQyxFQUFFO2dCQUNsQkYsTUFBTUcsSUFBSSxHQUFHLEtBQXVDQSxJQUFJO1lBQzFEO1lBQ0EsT0FBT0g7UUFDVDtRQUNBSixTQUFRLEVBQUVBLE9BQU8sRUFBRUksS0FBSyxFQUFFO1lBQ3hCSixRQUFRSyxJQUFJLENBQUNDLEVBQUUsR0FBR0YsTUFBTUUsRUFBRTtZQUMxQk4sUUFBUUssSUFBSSxDQUFDRSxJQUFJLEdBQUdILE1BQU1HLElBQUk7WUFDOUIsT0FBT1A7UUFDVDtJQUNGO0lBQ0FRLFdBQVc7UUFDVGpCLDJFQUFXQSxDQUFDO1lBQ1YsTUFBTWtCLFdBQVVDLFdBQVc7Z0JBQ3pCLE1BQU1DLFNBQVNoQixzREFBV0EsQ0FBQ2lCLFNBQVMsQ0FBQ0Y7Z0JBQ3JDLElBQUksQ0FBQ0MsT0FBT0UsT0FBTyxFQUFFLE9BQU87Z0JBRTVCLE1BQU1SLE9BQU8sTUFBTVgsK0NBQU1BLENBQUNXLElBQUksQ0FBQ1MsVUFBVSxDQUFDO29CQUN4Q0MsT0FBTzt3QkFBRUMsVUFBVUwsT0FBT00sSUFBSSxDQUFDRCxRQUFRO29CQUFDO2dCQUMxQztnQkFDQSxJQUFJLENBQUNYLE1BQU0sT0FBTztnQkFFbEIsTUFBTWEsaUJBQWlCLE1BQU0xQix1REFBYyxDQUN6Q21CLE9BQU9NLElBQUksQ0FBQ0csUUFBUSxFQUNwQmYsS0FBS2dCLFlBQVk7Z0JBRW5CLElBQUksQ0FBQ0gsZ0JBQWdCLE9BQU87Z0JBRTVCLE9BQU87b0JBQUVaLElBQUlELEtBQUtDLEVBQUU7b0JBQUVnQixNQUFNakIsS0FBS1csUUFBUTtvQkFBRVQsTUFBTUYsS0FBS0UsSUFBSTtnQkFBQztZQUM3RDtRQUNGO0tBQ0Q7QUFDSCxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbXB0cGxhbi8uL2F1dGgudHM/OTIzOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IENyZWRlbnRpYWxzIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJ1xuaW1wb3J0IHsgYXV0aENvbmZpZyB9IGZyb20gJ0AvYXV0aC5jb25maWcnXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnXG5pbXBvcnQgeyBsb2dpblNjaGVtYSB9IGZyb20gJ0Avc2NoZW1hcy9hdXRoJ1xuXG5leHBvcnQgY29uc3QgeyBoYW5kbGVycywgYXV0aCwgc2lnbkluLCBzaWduT3V0IH0gPSBOZXh0QXV0aCh7XG4gIC4uLmF1dGhDb25maWcsXG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6ICdqd3QnIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIC4uLmF1dGhDb25maWcuY2FsbGJhY2tzLFxuICAgIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgeyBpZDogc3RyaW5nOyByb2xlOiBzdHJpbmcgfSkucm9sZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuXG4gICAgfSxcbiAgICBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXG4gICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgc3RyaW5nXG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzKHtcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBsb2dpblNjaGVtYS5zYWZlUGFyc2UoY3JlZGVudGlhbHMpXG4gICAgICAgIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHJldHVybiBudWxsXG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7IHVzZXJuYW1lOiBwYXJzZWQuZGF0YS51c2VybmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsXG5cbiAgICAgICAgY29uc3QgcGFzc3dvcmRzTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcbiAgICAgICAgICBwYXJzZWQuZGF0YS5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkSGFzaCxcbiAgICAgICAgKVxuICAgICAgICBpZiAoIXBhc3N3b3Jkc01hdGNoKSByZXR1cm4gbnVsbFxuXG4gICAgICAgIHJldHVybiB7IGlkOiB1c2VyLmlkLCBuYW1lOiB1c2VyLnVzZXJuYW1lLCByb2xlOiB1c2VyLnJvbGUgfVxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHMiLCJiY3J5cHQiLCJhdXRoQ29uZmlnIiwicHJpc21hIiwibG9naW5TY2hlbWEiLCJoYW5kbGVycyIsImF1dGgiLCJzaWduSW4iLCJzaWduT3V0Iiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJ1c2VyIiwiaWQiLCJyb2xlIiwicHJvdmlkZXJzIiwiYXV0aG9yaXplIiwiY3JlZGVudGlhbHMiLCJwYXJzZWQiLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidXNlcm5hbWUiLCJkYXRhIiwicGFzc3dvcmRzTWF0Y2giLCJjb21wYXJlIiwicGFzc3dvcmQiLCJwYXNzd29yZEhhc2giLCJuYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb21wdHBsYW4vLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./schemas/auth.ts":
/*!*************************!*\
  !*** ./schemas/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loginSchema: () => (/* binding */ loginSchema)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n\nconst loginSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    username: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1, \"Username is required\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(6, \"Password must be at least 6 characters\")\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zY2hlbWFzL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBdUI7QUFFaEIsTUFBTUMsY0FBY0QsdUNBQVEsQ0FBQztJQUNsQ0csVUFBVUgsdUNBQVEsR0FBR0ssR0FBRyxDQUFDLEdBQUc7SUFDNUJDLFVBQVVOLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQyxHQUFHO0FBQzlCLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9tcHRwbGFuLy4vc2NoZW1hcy9hdXRoLnRzPzU1ZDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCdcblxuZXhwb3J0IGNvbnN0IGxvZ2luU2NoZW1hID0gei5vYmplY3Qoe1xuICB1c2VybmFtZTogei5zdHJpbmcoKS5taW4oMSwgJ1VzZXJuYW1lIGlzIHJlcXVpcmVkJyksXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig2LCAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMnKSxcbn0pXG5cbmV4cG9ydCB0eXBlIExvZ2luSW5wdXQgPSB6LmluZmVyPHR5cGVvZiBsb2dpblNjaGVtYT5cbiJdLCJuYW1lcyI6WyJ6IiwibG9naW5TY2hlbWEiLCJvYmplY3QiLCJ1c2VybmFtZSIsInN0cmluZyIsIm1pbiIsInBhc3N3b3JkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./schemas/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@auth","vendor-chunks/zod","vendor-chunks/jose","vendor-chunks/oauth4webapi","vendor-chunks/bcryptjs","vendor-chunks/next-auth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpanap%5COneDrive%5CDesktop%5CpanaHM%5CReact%5CPromptPlan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();