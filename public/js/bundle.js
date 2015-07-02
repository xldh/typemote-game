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

	var networkLogger = __webpack_require__(3);
	var addNicknameActions = __webpack_require__(5);
	var addNicknameLogs = __webpack_require__(7);
	var addUsersLogs = __webpack_require__(8);
	var addOwnClientLogs = __webpack_require__(9);

	module.exports = function (socket) {
	    // actions
	    addNicknameActions(socket);

	    // logs
	    addNicknameLogs(socket, networkLogger);
	    addUsersLogs(socket, networkLogger);
	    addOwnClientLogs(socket, networkLogger);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Logger = __webpack_require__(4);

	module.exports = new Logger();

/***/ },
/* 4 */
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var inputNickname = __webpack_require__(6);

	function addNicknameActions(socket) {
	    socket.on('nickname was asked', function () {
	        if (socket.nickname) {
	            socket.emit('nickname was input', socket.nickname);
	        } else {
	            inputNickname(socket);
	        }
	    });

	    socket.on('nickname rejected', function (duplicateNickname) {
	       delete socket.nickname;
	       inputNickname(socket, duplicateNickname);
	    });

	    socket.on('nickname accepted', function (nickname) {
	       socket.nickname = nickname;
	    });
	}

	module.exports = addNicknameActions;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	function addNicknameLogs(socket, logger) {
	    socket.on('nickname was asked', function () {
	        logger.consume({ message: 'nickname was asked' });
	    });

	    socket.on('nickname rejected', function (duplicateNickname) {
	       logger.consume({ message: 'nickname ' + duplicateNickname + ' was rejected'});
	    });

	    socket.on('nickname accepted', function (nickname) {
	       logger.consume({ message: 'nickname ' + nickname + ' accepted' });
	    });
	}

	module.exports = addNicknameLogs;

/***/ },
/* 8 */
/***/ function(module, exports) {

	function addUsersLogs(socket, logger) {
	   socket.on('user joined', function (nickname) {
	      logger.consume({ message: 'user ' + nickname + ' joined' });
	   });

	   socket.on('user left', function (nickname) {
	       logger.consume({ message: 'user ' + nickname + ' left' });
	   });
	}

	module.exports = addUsersLogs;

/***/ },
/* 9 */
/***/ function(module, exports) {

	function addOwnClientLogs(socket, logger) {
	   socket.on('disconnect', function () {
	       logger.consume({ message: 'client disconnected' });
	   });
	}

	module.exports = addOwnClientLogs;

/***/ }
/******/ ]);