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
	var socket = initSocket();

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
	var networkLogger = __webpack_require__(4);

	module.exports = function (socket) {
	   socket.on('nickname was asked', function () {
	        networkLogger.consume({ message: 'nickname was asked' });
	        if (socket.nickname) {
	            socket.emit('nickname was input', socket.nickname);
	        } else {
	            inputNickname(socket);
	        }
	   });

	   socket.on('nickname rejected', function (duplicateNickname) {
	       networkLogger.consume({ message: 'nickname ' + duplicateNickname + ' was rejected'});
	       delete socket.nickname;
	       inputNickname(socket, duplicateNickname);
	   });

	   socket.on('nickname accepted', function (nickname) {
	       console.log('nickname accepted', nickname);
	       networkLogger.consume({ message: 'nickname ' + nickname + ' accepted' });
	       socket.nickname = nickname;
	   });

	   socket.on('user joined', function (nickname) {
	      networkLogger.consume({ message: 'user ' + nickname + ' joined' });
	   });

	   socket.on('disconnect', function () {
	       networkLogger.consume({ message: 'client disconnected' });
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Logger = __webpack_require__(5);

	module.exports = new Logger();

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Logger(displayer) {
	    this.buffer = [];
	    this.displayer = displayer || new LogHTMLDisplayer({
	        container: document.body,
	        templateSelector: '#logger'
	    });
	}


	Logger.prototype.push = function (entry) {
	    this.buffer.push(entry);
	};


	Logger.prototype.flush = function () {
	    this.displayer.display(this.buffer);
	    this.buffer.length = 0;
	};


	Logger.prototype.consume = function (entry) {
	    this.displayer.display(entry);
	};

	function LogHTMLDisplayer(params) {
	    params = params || {};

	    this.container = params.container || null;
	    this.templateSelector = params.templateSelector || '';
	}


	LogHTMLDisplayer.prototype.display = function (entries) {
	    if (!Array.isArray(entries)) {
	        entries = [entries];
	    }

	    var templateHolder = document.body.querySelector(this.templateSelector);

	    for (var i = 0, l = entries.length; i < l; i++) {
	        templateHolder = templateHolder.cloneNode(true);

	        this.container.insertAdjacentHTML('beforeend', templateHolder.innerHTML);

	        var messageHolders = this.container.querySelectorAll('[data-contents]');
	        var messageHolder = messageHolders[messageHolders.length - 1];

	        messageHolder.textContent = entries[i].message;

	    }
	};

	module.exports = Logger;

/***/ }
/******/ ]);