/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var initSocket = __webpack_require__(1);
	var inputNickname = __webpack_require__(3);
	var socket = initSocket();

	inputNickname(socket);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var initSocketListeners = __webpack_require__(2);
	var socket = null;

	function initSocket() {
	    if (!socket) {
	        socket = io();
	        initSocketListeners(socket);
	    }

	    return socket;
	}

	module.exports = initSocket;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var inputNickname = __webpack_require__(3);

	module.exports = function (socket) {
	   console.log('init_socket_listeners');

	   socket.on('nickname rejected', function (duplicateNickname) {
	      inputNickname(socket, duplicateNickname);
	   });

	   socket.on('user joined', function (nickname) {
	       alert(nickname + ' has connected');
	   });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function (socket, duplicateNickname) {
	    var message = 'Enter a nickname';

	    if (duplicateNickname) {
	        message += ' (' + duplicateNickname + ' is already taken)';
	    }

	    var nickname = prompt(message);
	    socket.emit('nickname was input', nickname);
	};

/***/ }
/******/ ]);