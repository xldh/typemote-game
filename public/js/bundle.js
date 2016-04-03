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

	// preload available games
	var availableGames = __webpack_require__(1);
	var initSocket = __webpack_require__(2);
	var socket = initSocket();

	preloadAvailableGames();

	function preloadAvailableGames() {
	    availableGames.forEach(function (game) {
	        __webpack_require__(17)("./" + game + '/index');
	    });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	var availableGames = ['the_walk'];

	module.exports = availableGames;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var initSocketListeners = __webpack_require__(3);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var networkLogger = __webpack_require__(4);
	var addNicknameActions = __webpack_require__(8);
	var addGameSelectionActions = __webpack_require__(10);
	var addNicknameLogs = __webpack_require__(13);
	var addUsersLogs = __webpack_require__(14);
	var addOwnClientLogs = __webpack_require__(15);
	var addGameSelectionLogs = __webpack_require__(16);


	module.exports = function (socket) {
	    // actions
	    addNicknameActions(socket);
	    addGameSelectionActions(socket);

	    // logs
	    addNicknameLogs(socket, networkLogger);
	    addGameSelectionLogs(socket, networkLogger);
	    addUsersLogs(socket, networkLogger);
	    addOwnClientLogs(socket, networkLogger);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Logger = __webpack_require__(5);
	var LogHTMLDisplayer = __webpack_require__(6);
	var displayer = new LogHTMLDisplayer({
	    container: document.getElementById('network_logger'),
	    templateSelector: '#logger_inner_contents'
	});

	module.exports = new Logger(displayer);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var LogHTMLDisplayer = __webpack_require__(6);

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


	module.exports = Logger;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var simpleTemplate = __webpack_require__(7);

	function LogHTMLDisplayer(params) {
	    params = params || {};

	    this.container = params.container || null;
	    this.templateSelector = params.templateSelector || '';
	}


	LogHTMLDisplayer.prototype.display = function (entries) {
	    if (!Array.isArray(entries)) {
	        entries = [entries];
	    }

	    for (var i = 0, l = entries.length; i < l; i++) {
	        var template = simpleTemplate(this.templateSelector);
	        var messageHolder;

	        if (template.hasAttribute('data-contents')) {
	            messageHolder = template;
	        } else {
	            template = template.querySelector('[data-contents]');
	        }

	        messageHolder.textContent = entries[i].message;

	        this.container.appendChild(template);
	    }
	};

	module.exports = LogHTMLDisplayer;

/***/ },
/* 7 */
/***/ function(module, exports) {

	function simpleTemplate(templateSelector) {
	    var element = document.querySelector(templateSelector);

	    if (!element) {
	        throw new Error('Unknown template id');
	    }

	    var template = element.innerHTML.trim();
	    var fakeContainer = document.createElement('div');

	    fakeContainer.innerHTML = template;

	    var templateDOM = fakeContainer.childNodes;
	    var templateDOMLength = templateDOM.length;

	    if (templateDOMLength > 1) {
	        var fragment = document.createDocumentFragment();
	        for (var i = 0; i < templateDOMLength; i++) {
	            fragment.appendChild(templateDOM[i]);
	        }

	        templateDOM = fragment;
	    } else {
	        templateDOM = templateDOM[0];
	    }

	    return templateDOM;
	}

	module.exports = simpleTemplate;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var inputNickname = __webpack_require__(9);

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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var eventBus = __webpack_require__(11);
	var playGame = __webpack_require__(24);

	function addGameActions(socket) {
	    socket.on('choose a game', function (gameNames) {
	        if (socket.gameName) {
	            socket.emit('game chosen', socket.gameName);
	        } else {
	            promptGameChoice(socket, gameNames);
	        }
	    });

	    socket.on('your game choice was rejected', function (gameName, gameNames) {
	        promptGameChoice(socket, gameNames);
	    });

	    socket.on('you chose game', function (name, words) {
	        setSocketGameName(socket, name);
	        eventBus.emit('please init game ' + name, words);
	        eventBus.emit('requiring to play game', name, words);
	    });
	}

	function promptGameChoice(socket, gameNames) {
	    var gameNumber = prompt(gameNames.map(function (gameName, index) {
	        return (index + 1) + ': ' + gameName;
	    }).join('\n'));

	    socket.emit('game chosen', gameNames[gameNumber - 1]);
	}

	function setSocketGameName(socket, gameName) {
	    socket.gameName = gameName;
	}

	module.exports = addGameActions;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(12);

	module.exports = new EventEmitter();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ function(module, exports) {

	function addOwnClientLogs(socket, logger) {
	   socket.on('disconnect', function () {
	       logger.consume({ message: 'client disconnected' });
	   });
	}

	module.exports = addOwnClientLogs;

/***/ },
/* 16 */
/***/ function(module, exports) {

	function addGameLogs(socket, logger) {
	    socket.on('choose a game', function () {
	        logger.consume({ message: 'choose a game' });
	    });

	    socket.on('your game choice was rejected', function (gameName, gameNames) {
	        logger.consume({
	            message: 'your game choice was rejected (' + gameName + ')'
	        });
	    });

	    socket.on('you chose game', function (name, words) {
	        logger.consume({
	            message: 'you chose game ' + name
	        })
	    });
	}

	module.exports = addGameLogs;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./the_walk/index": 18
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 17;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var eventBus = __webpack_require__(11);
	var context2d = __webpack_require__(25);
	var Drawer = __webpack_require__(26);

	eventBus.on('please init game the_walk', function (words) {
	    console.log('"The walk" game init was asked politely', words);
	});

	function Game(words) {
	    if (Game.instance) {
	        return Game.instance;
	    }

	    this.hero = {
	        width: 0.1,
	        height: 0.1,
	        x: 0,
	        y: 0
	    };

	    this.hero.x = 0.1;
	    this.hero.y = 0.1;
	    this.drawer = new Drawer(context2d);


	    Game.instance = this;
	}


	Game.instance = null;

	Game.prototype.run = function () {
	    var game = this;

	    window.requestAnimationFrame(function () {
	        game.update();
	        game.render();
	        game.run();
	    });
	};


	Game.prototype.render = function () {
	    this.drawer.clear();
	    this.drawer.drawRect(this.hero);
	};


	Game.prototype.update = function () {
	    this.hero.x += 0.0001;
	};


	module.exports = Game;

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var eventBus = __webpack_require__(11);

	eventBus.on('requiring to play game', playGame);

	function playGame(name, words) {
	    console.log('playGame', name, words);
	    var Game = __webpack_require__(17)("./" + name + '/index');
	    var game = new Game(words);
	    console.log('play game', game);
	    game.run();
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	var canvas = document.getElementById('game_canvas');
	var context2d = canvas.getContext('2d');

	canvas.width = 800;
	canvas.height = 600;

	function provideContext() {
	    return context2d;
	}

	module.exports = context2d;

/***/ },
/* 26 */
/***/ function(module, exports) {

	function Drawer(context2D) {
	    this.ctx = context2D;
	}

	Drawer.prototype.drawRect = function (params) {
	    params = params || {};
	    var color = params.color || '#000000';
	    var width = params.width;
	    var height = params.height;
	    var x = params.x;
	    var y = params.y;
	    var canvasScreenCoordinates = this.toPixels(x, y);

	    this.ctx.save();
	    this.ctx.fillStyle = color;
	    this.ctx.fillRect(
	        canvasScreenCoordinates.x,
	        canvasScreenCoordinates.y,
	        width * this.ctx.canvas.width,
	        height * this.ctx.canvas.height
	    );
	    this.ctx.restore();
	}


	Drawer.prototype.clear = function () {
	    this.drawRect({
	        x: 0,
	        y: 0,
	        width: this.ctx.canvas.width,
	        height: this.ctx.canvas.height,
	        color: '#FFFFFF'
	    })
	};

	Drawer.prototype.toPixels = function (x, y) {
	    var width = this.ctx.canvas.width;
	    var height = this.ctx.canvas.height;

	    return {
	        x: width * x,
	        y: height * y
	    };
	};


	module.exports = Drawer;

/***/ }
/******/ ]);