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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(2);
var GameState = /** @class */ (function () {
    function GameState(ctx) {
        this.minTimePerFrame = 0;
        this.borderColors = [];
        this.lastUpdated = Date.now();
        this.ctx = ctx;
        this.randomizeBorderColors();
    }
    GameState.prototype.update = function () {
        if (Date.now() - this.lastUpdated > this.minTimePerFrame) {
            this.advanceFrame();
            this.draw();
            this.lastUpdated = Date.now();
        }
    };
    GameState.prototype.advanceFrame = function () { };
    GameState.prototype.start = function () { };
    GameState.prototype.fillScreen = function (color) {
        this.ctx.g2D.fillStyle = color;
        this.ctx.g2D.fillRect(0, 0, this.ctx.width, this.ctx.height);
    };
    GameState.prototype.drawSquare = function (loc, color) {
        this.ctx.g2D.fillStyle = color;
        this.ctx.g2D.fillRect(loc[1] * this.ctx.tileSize, loc[0] * this.ctx.tileSize, this.ctx.tileSize, this.ctx.tileSize);
    };
    GameState.prototype.drawArt = function (art, rowOffset, colOffset, color) {
        for (var i = 0; i < art.length; i++) {
            for (var j = 0; j < art[i].length; j++) {
                if (art[i][j] !== ' ') {
                    this.drawSquare([rowOffset + i, colOffset + j], color);
                }
            }
        }
    };
    GameState.prototype.drawCenteredArt = function (art, color) {
        var rowOffset = (this.ctx.rows - art.length) / 2;
        var colOffset = (this.ctx.cols - art[0].length) / 2;
        this.drawArt(art, rowOffset, colOffset, color);
    };
    GameState.prototype.randomizeBorderColors = function () {
        var c = 0;
        for (var i = 0; i < this.ctx.rows; i++, c += 2) {
            this.borderColors[c] = Utils_1.Utils.randColor();
            this.borderColors[c + 1] = Utils_1.Utils.randColor();
        }
        for (var j = 0; j < this.ctx.cols; j++, c += 2) {
            this.borderColors[c] = Utils_1.Utils.randColor();
            this.borderColors[c + 1] = Utils_1.Utils.randColor();
        }
    };
    GameState.prototype.drawBorder = function (type) {
        if (type === void 0) { type = 'checker'; }
        var c = 0;
        for (var i = 0; i < this.ctx.rows; i++, c += 2) {
            var color1 = void 0;
            var color2 = void 0;
            if (type === 'colorful') {
                color1 = this.borderColors[c];
                color2 = this.borderColors[c + 1];
            }
            else if (type === 'checker') {
                color1 = (i % 2) ? 'grey' : 'lightgrey';
                color2 = ((this.ctx.cols - 1 + i) % 2) ? 'grey' : 'lightgrey';
            }
            else {
                color1 = color2 = type;
            }
            this.drawSquare([i, 0], color1);
            this.drawSquare([i, this.ctx.cols - 1], color2);
        }
        for (var j = 0; j < this.ctx.cols; j++, c += 2) {
            var color1 = void 0;
            var color2 = void 0;
            if (type === 'colorful') {
                color1 = this.borderColors[c];
                color2 = this.borderColors[c + 1];
            }
            else if (type === 'checker') {
                color1 = (j % 2) ? 'grey' : 'lightgrey';
                color2 = ((this.ctx.rows - 1 + j) % 2) ? 'grey' : 'lightgrey';
            }
            else {
                color1 = color2 = type;
            }
            this.drawSquare([0, j], color1);
            this.drawSquare([this.ctx.rows - 1, j], color2);
        }
    };
    GameState.prototype.drawText = function (text, x, y, color, size) {
        var g = this.ctx.g2D;
        g.font = size + 'px monospace';
        g.textBaseline = 'top';
        g.fillStyle = color;
        g.fillText(text, x, y);
    };
    return GameState;
}());
exports.GameState = GameState;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameState_1 = __webpack_require__(0);
var PlayScreen_1 = __webpack_require__(3);
var CountDownScreen = /** @class */ (function (_super) {
    __extends(CountDownScreen, _super);
    function CountDownScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberArt = [[
                'oooo',
                '   o',
                '   o',
                'oooo',
                '   o',
                '   o',
                'oooo',
            ], [
                'oooo',
                '   o',
                '   o',
                'oooo',
                'o   ',
                'o   ',
                'oooo',
            ], [
                ' o ',
                'oo ',
                ' o ',
                ' o ',
                ' o ',
                ' o ',
                'ooo',
            ]];
        _this.currentArt = 0;
        _this.offset = 0;
        return _this;
    }
    CountDownScreen.prototype.advanceFrame = function () {
        var elapsedSecs = Math.floor((Date.now() - this.startTime) / 1000);
        if (elapsedSecs > 2) {
            this.ctx.switchState(PlayScreen_1.PlayScreen.Name);
        }
        else {
            this.currentArt = elapsedSecs;
        }
        this.offset += 1;
    };
    CountDownScreen.prototype.draw = function () {
        var g = this.ctx.g2D;
        for (var i = 0; i < this.ctx.rows; i++) {
            for (var j = 0; j < this.ctx.cols; j++) {
                var x = (i - this.ctx.rows / 2) / 2;
                var y = (j - this.ctx.cols / 2) / 2;
                g.fillStyle = 'hsl(' + Math.floor(this.offset + 10 * Math.sqrt(x * x + y * y)) + ',80%,50%)';
                g.fillRect(j * this.ctx.tileSize, i * this.ctx.tileSize, 10, 10);
            }
        }
        g.fillStyle = 'black';
        g.beginPath();
        g.arc(this.ctx.width / 2, this.ctx.height / 2, 24, 0, 2 * Math.PI, false);
        g.fill();
        this.drawCenteredArt(this.numberArt[this.currentArt], 'white');
    };
    CountDownScreen.prototype.start = function () {
        this.startTime = Date.now();
    };
    CountDownScreen.Name = 'count down';
    return CountDownScreen;
}(GameState_1.GameState));
exports.CountDownScreen = CountDownScreen;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.randColor = function () {
        var hue = Math.floor(Math.random() * 360);
        return 'hsl(' + hue + ', 90%, 50%)';
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameOverScreen_1 = __webpack_require__(4);
var GameState_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(2);
var PlayScreen = /** @class */ (function (_super) {
    __extends(PlayScreen, _super);
    function PlayScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.forbidden = {
            d: 'u',
            l: 'r',
            r: 'l',
            u: 'd',
        };
        return _this;
    }
    PlayScreen.prototype.advanceFrame = function () {
        var head = this.snake[this.snake.length - 1].slice();
        var changeRow = this.direction === 'u' || this.direction === 'd';
        var increment = this.direction === 'r' || this.direction === 'd';
        head[changeRow ? 0 : 1] += increment ? 1 : -1;
        if (head[0] === 0 || head[0] === this.ctx.rows - 1 || head[1] === 0 || head[1] === this.ctx.cols - 1) {
            this.die();
            return;
        }
        for (var i = 0; i < this.snake.length - 1; i++) {
            if (this.sameloc(this.snake[i], head)) {
                this.die();
                return;
            }
        }
        this.snake.push(head);
        this.lastMove = this.direction;
        var hitPowerup = false;
        for (var i = 0; i < this.powerups.length; i++) {
            if (this.sameloc(head, this.powerups[i])) {
                this.snakeColors[this.snake.length - 1] = this.powerupColors[i];
                this.powerups[i] = this.randloc();
                this.powerupColors[i] = Utils_1.Utils.randColor();
                if (this.minTimePerFrame > 50) {
                    this.minTimePerFrame -= 25;
                }
                hitPowerup = true;
            }
        }
        if (!hitPowerup) {
            this.snake.shift();
        }
    };
    PlayScreen.prototype.draw = function () {
        this.fillScreen('black');
        this.drawBorder('#F66733');
        for (var i = 0; i < this.snake.length; i++) {
            this.drawSquare(this.snake[i], this.snakeColors[i]);
        }
        for (var i = 0; i < this.powerups.length; i++) {
            this.drawSquare(this.powerups[i], this.powerupColors[i]);
        }
    };
    PlayScreen.prototype.start = function () {
        var _this = this;
        this.minTimePerFrame = 200;
        this.snake = [[Math.floor(this.ctx.rows / 2), Math.floor(this.ctx.cols / 2)]];
        this.snakeColors = [Utils_1.Utils.randColor()];
        this.direction = 'l';
        this.powerups = [this.randloc()];
        this.powerupColors = [Utils_1.Utils.randColor()];
        for (var i = 0; i < 4; i++) {
            this.powerups.push(this.randloc());
            this.powerupColors.push(Utils_1.Utils.randColor());
        }
        this.ctx.io.addListener(function (socketId, event) {
            if (socketId === _this.ctx.sharedData) {
                console.log(event);
                if (event && _this.forbidden[_this.lastMove] !== event) {
                    _this.direction = event;
                }
            }
        });
    };
    PlayScreen.prototype.randi = function (a, b) {
        return Math.floor(a + (b - a + 1) * Math.random());
    };
    PlayScreen.prototype.sameloc = function (a, b) {
        return a[0] === b[0] && a[1] === b[1];
    };
    PlayScreen.prototype.randloc = function () {
        var loc = [this.randi(1, this.ctx.rows - 2), this.randi(1, this.ctx.cols - 2)];
        for (var _i = 0, _a = this.snake; _i < _a.length; _i++) {
            var segment = _a[_i];
            if (this.sameloc(loc, segment)) {
                return this.randloc();
            }
        }
        return loc;
    };
    PlayScreen.prototype.die = function () {
        this.ctx.io.sendMessage(this.ctx.sharedData, 'stop-playing');
        this.ctx.sharedData = this.snake;
        this.ctx.switchState(GameOverScreen_1.GameOverScreen.Name);
    };
    PlayScreen.Name = 'play';
    return PlayScreen;
}(GameState_1.GameState));
exports.PlayScreen = PlayScreen;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameState_1 = __webpack_require__(0);
var GameOverScreen = /** @class */ (function (_super) {
    __extends(GameOverScreen, _super);
    function GameOverScreen(ctx) {
        var _this = _super.call(this, ctx) || this;
        _this.gameOverArt = [
            'ooooo                  ooooo                 ',
            'o                      o   o                 ',
            'o     oooo ooooo oooo  o   o o   o oooo oooo',
            'o  oo    o o o o o  o  o   o o   o o  o o    ',
            'o   o oooo o o o oooo  o   o o   o oooo o    ',
            'o   o o  o o o o o     o   o  o o  o    o    ',
            'ooooo oooo o o o oooo  ooooo   o   oooo o    ',
        ];
        return _this;
    }
    GameOverScreen.prototype.advanceFrame = function () { };
    GameOverScreen.prototype.draw = function () {
        this.fillScreen('black');
        this.drawBorder('red');
        for (var _i = 0, _a = this.snake; _i < _a.length; _i++) {
            var segment = _a[_i];
            this.drawSquare(segment, 'darkred');
        }
        this.drawCenteredArt(this.gameOverArt, 'red');
    };
    GameOverScreen.prototype.start = function () {
        this.snake = this.ctx.sharedData;
        setTimeout(function () {
            location.reload(true);
            // this.ctx.switchState(StartScreen.Name);
        }, 3000);
    };
    GameOverScreen.Name = 'game over';
    return GameOverScreen;
}(GameState_1.GameState));
exports.GameOverScreen = GameOverScreen;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameRunner_1 = __webpack_require__(6);
__webpack_require__(12);
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var game = new GameRunner_1.GameRunner(canvas);
game.run();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CountDownScreen_1 = __webpack_require__(1);
var GameContext_1 = __webpack_require__(7);
var GameOverScreen_1 = __webpack_require__(4);
var IO_1 = __webpack_require__(8);
var PlayScreen_1 = __webpack_require__(3);
var StartScreen_1 = __webpack_require__(10);
var GameRunner = /** @class */ (function () {
    function GameRunner(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.states = {};
        this.ctx = new GameContext_1.GameContext(function (newState, ctx) {
            ctx.io.clearListeners();
            ctx.currState = newState;
            _this.states[newState].start();
        });
        canvas.width = this.ctx.width;
        canvas.height = this.ctx.height;
        this.ctx.g2D = canvas.getContext('2d');
        this.ctx.g2D.imageSmoothingEnabled = false;
        this.ctx.g2D.webkitImageSmoothingEnabled = false;
        this.ctx.io = new IO_1.IO();
        this.states[StartScreen_1.StartScreen.Name] = new StartScreen_1.StartScreen(this.ctx);
        this.states[CountDownScreen_1.CountDownScreen.Name] = new CountDownScreen_1.CountDownScreen(this.ctx);
        this.states[PlayScreen_1.PlayScreen.Name] = new PlayScreen_1.PlayScreen(this.ctx);
        this.states[GameOverScreen_1.GameOverScreen.Name] = new GameOverScreen_1.GameOverScreen(this.ctx);
        this.ctx.currState = StartScreen_1.StartScreen.Name;
        this.states[StartScreen_1.StartScreen.Name].start();
    }
    GameRunner.prototype.run = function () {
        var _this = this;
        this.states[this.ctx.currState].update();
        requestAnimationFrame(function () { _this.run(); });
    };
    return GameRunner;
}());
exports.GameRunner = GameRunner;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameContext = /** @class */ (function () {
    function GameContext(stateSwitcher) {
        this.stateSwitcher = stateSwitcher;
        this.rows = 18;
        this.cols = 157;
        this.tileSize = 4;
        this.width = this.cols * this.tileSize;
        this.height = this.rows * this.tileSize;
    }
    GameContext.prototype.switchState = function (newState) {
        this.stateSwitcher(newState, this);
    };
    return GameContext;
}());
exports.GameContext = GameContext;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var io = __webpack_require__(9);
var IO = /** @class */ (function () {
    function IO() {
        this.listeners = [];
        this.socket = io.connect('ec2-34-217-61-183.us-west-2.compute.amazonaws.com:3000/display');
    }
    IO.prototype.addListener = function (listener) {
        this.socket.on('message', listener);
        this.listeners.push(listener);
    };
    IO.prototype.clearListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            this.socket.removeListener('message', listener);
        }
        this.listeners = [];
    };
    IO.prototype.sendMessage = function (socketId, message) {
        this.socket.emit(socketId, message);
        console.log(socketId, message);
    };
    return IO;
}());
exports.IO = IO;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = io;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CountDownScreen_1 = __webpack_require__(1);
var GameState_1 = __webpack_require__(0);
var logoURL = __webpack_require__(11);
var StartScreen = /** @class */ (function (_super) {
    __extends(StartScreen, _super);
    function StartScreen(ctx) {
        var _this = _super.call(this, ctx) || this;
        _this.minTimePerFrame = 250;
        _this.logo = new Image();
        _this.logo.src = logoURL;
        _this.passcode = (1000 + Math.floor(9000 * Math.random())).toString();
        return _this;
    }
    StartScreen.prototype.draw = function () {
        this.fillScreen('white');
        this.ctx.g2D.drawImage(this.logo, 6, 6);
        this.drawText('cuhack.it/play ' + this.passcode, 108, 12, 'black', 48);
    };
    StartScreen.prototype.start = function () {
        var _this = this;
        this.ctx.io.addListener(function (socketId, event) {
            if (event === _this.passcode) {
                _this.ctx.sharedData = socketId;
                _this.ctx.switchState(CountDownScreen_1.CountDownScreen.Name);
                _this.ctx.io.sendMessage(socketId, 'playing');
            }
        });
    };
    StartScreen.Name = 'start';
    return StartScreen;
}(GameState_1.GameState));
exports.StartScreen = StartScreen;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "faafdc22c707891f4218c961f92ac3b1.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(13);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(15)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./display.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./display.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(false);
// imports


// module
exports.push([module.i, "html, body {\n  margin: 0;\n  overflow: hidden; }\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQ0ODQ2M2NiYzFkYmVmZTcxODQiLCJ3ZWJwYWNrOi8vLy4vZGVtby1jbGllbnQvc3JjL3RzL2Rpc3BsYXkvR2FtZVN0YXRlLnRzIiwid2VicGFjazovLy8uL2RlbW8tY2xpZW50L3NyYy90cy9kaXNwbGF5L0NvdW50RG93blNjcmVlbi50cyIsIndlYnBhY2s6Ly8vLi9kZW1vLWNsaWVudC9zcmMvdHMvZGlzcGxheS9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9kZW1vLWNsaWVudC9zcmMvdHMvZGlzcGxheS9QbGF5U2NyZWVuLnRzIiwid2VicGFjazovLy8uL2RlbW8tY2xpZW50L3NyYy90cy9kaXNwbGF5L0dhbWVPdmVyU2NyZWVuLnRzIiwid2VicGFjazovLy8uL2RlbW8tY2xpZW50L3NyYy90cy9kaXNwbGF5LmVudHJ5LnRzeCIsIndlYnBhY2s6Ly8vLi9kZW1vLWNsaWVudC9zcmMvdHMvZGlzcGxheS9HYW1lUnVubmVyLnRzIiwid2VicGFjazovLy8uL2RlbW8tY2xpZW50L3NyYy90cy9kaXNwbGF5L0dhbWVDb250ZXh0LnRzIiwid2VicGFjazovLy8uL2RlbW8tY2xpZW50L3NyYy90cy9kaXNwbGF5L0lPLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImlvXCIiLCJ3ZWJwYWNrOi8vLy4vZGVtby1jbGllbnQvc3JjL3RzL2Rpc3BsYXkvU3RhcnRTY3JlZW4udHMiLCJ3ZWJwYWNrOi8vLy4vZGVtby1jbGllbnQvc3JjL2ltZy9sb2dvLnBuZyIsIndlYnBhY2s6Ly8vLi9kZW1vLWNsaWVudC9zcmMvc2Nzcy9kaXNwbGF5LnNjc3M/NDE5NyIsIndlYnBhY2s6Ly8vLi9kZW1vLWNsaWVudC9zcmMvc2Nzcy9kaXNwbGF5LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzVEQSxxQ0FBZ0M7QUFFaEM7SUFPSSxtQkFBWSxHQUFnQjtRQUxsQixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUV0QixpQkFBWSxHQUFhLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUc3QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSwwQkFBTSxHQUFiO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBRU0sZ0NBQVksR0FBbkIsY0FBNkIsQ0FBQztJ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LElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWCxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1gsTUFBTSxDQUFDO1lBQ1gsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFL0IsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN0WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6ImRpc3BsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZDQ4NDYzY2JjMWRiZWZlNzE4NCIsImltcG9ydCB7IEdhbWVDb250ZXh0IH0gZnJvbSAnLi9HYW1lQ29udGV4dCc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2FtZVN0YXRlIHtcclxuICAgIHByb3RlY3RlZCBjdHg6IEdhbWVDb250ZXh0O1xyXG4gICAgcHJvdGVjdGVkIG1pblRpbWVQZXJGcmFtZSA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBib3JkZXJDb2xvcnM6IHN0cmluZ1tdID0gW107XHJcbiAgICBwcml2YXRlIGxhc3RVcGRhdGVkID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjdHg6IEdhbWVDb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICAgICAgdGhpcy5yYW5kb21pemVCb3JkZXJDb2xvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChEYXRlLm5vdygpIC0gdGhpcy5sYXN0VXBkYXRlZCA+IHRoaXMubWluVGltZVBlckZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZUZyYW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RVcGRhdGVkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkdmFuY2VGcmFtZSgpOiB2b2lkIHt9XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZHJhdygpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHt9XHJcblxyXG4gICAgcHJvdGVjdGVkIGZpbGxTY3JlZW4oY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmcyRC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmN0eC5nMkQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jdHgud2lkdGgsIHRoaXMuY3R4LmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRyYXdTcXVhcmUobG9jOiBudW1iZXJbXSwgY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmcyRC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmN0eC5nMkQuZmlsbFJlY3QoXHJcbiAgICAgICAgICAgIGxvY1sxXSAqIHRoaXMuY3R4LnRpbGVTaXplLCBsb2NbMF0gKiB0aGlzLmN0eC50aWxlU2l6ZSwgdGhpcy5jdHgudGlsZVNpemUsIHRoaXMuY3R4LnRpbGVTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZHJhd0FydChhcnQ6IHN0cmluZ1tdLCByb3dPZmZzZXQ6IG51bWJlciwgY29sT2Zmc2V0OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFydC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFydFtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFydFtpXVtqXSAhPT0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3U3F1YXJlKFtyb3dPZmZzZXQgKyBpLCBjb2xPZmZzZXQgKyBqXSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkcmF3Q2VudGVyZWRBcnQoYXJ0OiBzdHJpbmdbXSwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHJvd09mZnNldCA9ICh0aGlzLmN0eC5yb3dzIC0gYXJ0Lmxlbmd0aCkgLyAyO1xyXG4gICAgICAgIGNvbnN0IGNvbE9mZnNldCA9ICh0aGlzLmN0eC5jb2xzIC0gYXJ0WzBdLmxlbmd0aCkgLyAyO1xyXG4gICAgICAgIHRoaXMuZHJhd0FydChhcnQsIHJvd09mZnNldCwgY29sT2Zmc2V0LCBjb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJhbmRvbWl6ZUJvcmRlckNvbG9ycygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYyA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jdHgucm93czsgaSsrLCBjICs9IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5ib3JkZXJDb2xvcnNbY10gPSBVdGlscy5yYW5kQ29sb3IoKTtcclxuICAgICAgICAgICAgdGhpcy5ib3JkZXJDb2xvcnNbYyArIDFdID0gVXRpbHMucmFuZENvbG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY3R4LmNvbHM7IGorKywgYyArPSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9yZGVyQ29sb3JzW2NdID0gVXRpbHMucmFuZENvbG9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9yZGVyQ29sb3JzW2MgKyAxXSA9IFV0aWxzLnJhbmRDb2xvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZHJhd0JvcmRlcih0eXBlID0gJ2NoZWNrZXInKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGMgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3R4LnJvd3M7IGkrKywgYyArPSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcjE6IHN0cmluZztcclxuICAgICAgICAgICAgbGV0IGNvbG9yMjogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbG9yZnVsJykge1xyXG4gICAgICAgICAgICAgICAgY29sb3IxID0gdGhpcy5ib3JkZXJDb2xvcnNbY107XHJcbiAgICAgICAgICAgICAgICBjb2xvcjIgPSB0aGlzLmJvcmRlckNvbG9yc1tjICsgMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NoZWNrZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjEgPSAoaSAlIDIpID8gJ2dyZXknIDogJ2xpZ2h0Z3JleSc7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjIgPSAoKHRoaXMuY3R4LmNvbHMgLSAxICsgaSkgJSAyKSA/ICdncmV5JyA6ICdsaWdodGdyZXknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29sb3IxID0gY29sb3IyID0gdHlwZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3U3F1YXJlKFtpLCAwXSwgY29sb3IxKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U3F1YXJlKFtpLCB0aGlzLmN0eC5jb2xzIC0gMV0sIGNvbG9yMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY3R4LmNvbHM7IGorKywgYyArPSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcjE6IHN0cmluZztcclxuICAgICAgICAgICAgbGV0IGNvbG9yMjogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbG9yZnVsJykge1xyXG4gICAgICAgICAgICAgICAgY29sb3IxID0gdGhpcy5ib3JkZXJDb2xvcnNbY107XHJcbiAgICAgICAgICAgICAgICBjb2xvcjIgPSB0aGlzLmJvcmRlckNvbG9yc1tjICsgMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NoZWNrZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjEgPSAoaiAlIDIpID8gJ2dyZXknIDogJ2xpZ2h0Z3JleSc7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjIgPSAoKHRoaXMuY3R4LnJvd3MgLSAxICsgaikgJSAyKSA/ICdncmV5JyA6ICdsaWdodGdyZXknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29sb3IxID0gY29sb3IyID0gdHlwZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3U3F1YXJlKFswLCBqXSwgY29sb3IxKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U3F1YXJlKFt0aGlzLmN0eC5yb3dzIC0gMSwgal0sIGNvbG9yMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkcmF3VGV4dCh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBzaXplOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBnID0gdGhpcy5jdHguZzJEO1xyXG4gICAgICAgIGcuZm9udCA9IHNpemUgKyAncHggbW9ub3NwYWNlJztcclxuICAgICAgICBnLnRleHRCYXNlbGluZSA9ICd0b3AnO1xyXG4gICAgICAgIGcuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgZy5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZW1vLWNsaWVudC9zcmMvdHMvZGlzcGxheS9HYW1lU3RhdGUudHMiLCJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tICcuL0dhbWVTdGF0ZSc7XHJcbmltcG9ydCB7IFBsYXlTY3JlZW4gfSBmcm9tICcuL1BsYXlTY3JlZW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvdW50RG93blNjcmVlbiBleHRlbmRzIEdhbWVTdGF0ZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUgPSAnY291bnQgZG93bic7XHJcbiAgICBwcml2YXRlIG51bWJlckFydDogc3RyaW5nW11bXSA9IFtbXHJcbiAgICAgICAgJ29vb28nLFxyXG4gICAgICAgICcgICBvJyxcclxuICAgICAgICAnICAgbycsXHJcbiAgICAgICAgJ29vb28nLFxyXG4gICAgICAgICcgICBvJyxcclxuICAgICAgICAnICAgbycsXHJcbiAgICAgICAgJ29vb28nLFxyXG4gICAgXSwgW1xyXG4gICAgICAgICdvb29vJyxcclxuICAgICAgICAnICAgbycsXHJcbiAgICAgICAgJyAgIG8nLFxyXG4gICAgICAgICdvb29vJyxcclxuICAgICAgICAnbyAgICcsXHJcbiAgICAgICAgJ28gICAnLFxyXG4gICAgICAgICdvb29vJyxcclxuICAgIF0sIFtcclxuICAgICAgICAnIG8gJyxcclxuICAgICAgICAnb28gJyxcclxuICAgICAgICAnIG8gJyxcclxuICAgICAgICAnIG8gJyxcclxuICAgICAgICAnIG8gJyxcclxuICAgICAgICAnIG8gJyxcclxuICAgICAgICAnb29vJyxcclxuICAgIF1dO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50QXJ0ID0gMDtcclxuICAgIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG9mZnNldCA9IDA7XHJcblxyXG4gICAgcHVibGljIGFkdmFuY2VGcmFtZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBlbGFwc2VkU2VjcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZSkgLyAxMDAwKTtcclxuICAgICAgICBpZiAoZWxhcHNlZFNlY3MgPiAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN3aXRjaFN0YXRlKFBsYXlTY3JlZW4uTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QXJ0ID0gZWxhcHNlZFNlY3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZyA9IHRoaXMuY3R4LmcyRDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3R4LnJvd3M7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY3R4LmNvbHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IChpIC0gdGhpcy5jdHgucm93cyAvIDIpIC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSAoaiAtIHRoaXMuY3R4LmNvbHMgLyAyKSAvIDI7XHJcbiAgICAgICAgICAgICAgICBnLmZpbGxTdHlsZSA9ICdoc2woJyArIE1hdGguZmxvb3IodGhpcy5vZmZzZXQgKyAxMCAqIE1hdGguc3FydCh4ICogeCArIHkgKiB5KSkgKyAnLDgwJSw1MCUpJztcclxuICAgICAgICAgICAgICAgIGcuZmlsbFJlY3QoaiAqIHRoaXMuY3R4LnRpbGVTaXplLCBpICogdGhpcy5jdHgudGlsZVNpemUsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBnLmZpbGxTdHlsZSA9ICdibGFjayc7XHJcbiAgICAgICAgZy5iZWdpblBhdGgoKTtcclxuICAgICAgICBnLmFyYyh0aGlzLmN0eC53aWR0aCAvIDIsIHRoaXMuY3R4LmhlaWdodCAvIDIsIDI0LCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgIGcuZmlsbCgpO1xyXG4gICAgICAgIHRoaXMuZHJhd0NlbnRlcmVkQXJ0KHRoaXMubnVtYmVyQXJ0W3RoaXMuY3VycmVudEFydF0sICd3aGl0ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGVtby1jbGllbnQvc3JjL3RzL2Rpc3BsYXkvQ291bnREb3duU2NyZWVuLnRzIiwiZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZENvbG9yKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgaHVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzYwKTtcclxuICAgICAgICByZXR1cm4gJ2hzbCgnICsgaHVlICsgJywgOTAlLCA1MCUpJztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZW1vLWNsaWVudC9zcmMvdHMvZGlzcGxheS9VdGlscy50cyIsImltcG9ydCB7IEdhbWVPdmVyU2NyZWVuIH0gZnJvbSAnLi9HYW1lT3ZlclNjcmVlbic7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gJy4vR2FtZVN0YXRlJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5U2NyZWVuIGV4dGVuZHMgR2FtZVN0YXRlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSA9ICdwbGF5JztcclxuXHJcbiAgICBwcml2YXRlIHNuYWtlOiBudW1iZXJbXVtdO1xyXG4gICAgcHJpdmF0ZSBzbmFrZUNvbG9yczogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIHBvd2VydXBzOiBudW1iZXJbXVtdO1xyXG4gICAgcHJpdmF0ZSBwb3dlcnVwQ29sb3JzOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgZGlyZWN0aW9uOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGxhc3RNb3ZlOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBmb3JiaWRkZW46IHsgW2Rpcjogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgZDogJ3UnLFxyXG4gICAgICAgIGw6ICdyJyxcclxuICAgICAgICByOiAnbCcsXHJcbiAgICAgICAgdTogJ2QnLFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgYWR2YW5jZUZyYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLnNuYWtlW3RoaXMuc25ha2UubGVuZ3RoIC0gMV0uc2xpY2UoKTtcclxuICAgICAgICBjb25zdCBjaGFuZ2VSb3cgPSB0aGlzLmRpcmVjdGlvbiA9PT0gJ3UnIHx8IHRoaXMuZGlyZWN0aW9uID09PSAnZCc7XHJcbiAgICAgICAgY29uc3QgaW5jcmVtZW50ID0gdGhpcy5kaXJlY3Rpb24gPT09ICdyJyB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gJ2QnO1xyXG4gICAgICAgIGhlYWRbY2hhbmdlUm93ID8gMCA6IDFdICs9IGluY3JlbWVudCA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWRbMF0gPT09IDAgfHwgaGVhZFswXSA9PT0gdGhpcy5jdHgucm93cyAtIDEgfHwgaGVhZFsxXSA9PT0gMCB8fCBoZWFkWzFdID09PSB0aGlzLmN0eC5jb2xzIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc25ha2UubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhbWVsb2ModGhpcy5zbmFrZVtpXSwgaGVhZCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGllKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc25ha2UucHVzaChoZWFkKTtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gdGhpcy5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgIGxldCBoaXRQb3dlcnVwID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvd2VydXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhbWVsb2MoaGVhZCwgdGhpcy5wb3dlcnVwc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc25ha2VDb2xvcnNbdGhpcy5zbmFrZS5sZW5ndGggLSAxXSA9IHRoaXMucG93ZXJ1cENvbG9yc1tpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG93ZXJ1cHNbaV0gPSB0aGlzLnJhbmRsb2MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG93ZXJ1cENvbG9yc1tpXSA9IFV0aWxzLnJhbmRDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluVGltZVBlckZyYW1lID4gNTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblRpbWVQZXJGcmFtZSAtPSAyNTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhpdFBvd2VydXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaGl0UG93ZXJ1cCkge1xyXG4gICAgICAgICAgICB0aGlzLnNuYWtlLnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmlsbFNjcmVlbignYmxhY2snKTtcclxuICAgICAgICB0aGlzLmRyYXdCb3JkZXIoJyNGNjY3MzMnKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNuYWtlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1NxdWFyZSh0aGlzLnNuYWtlW2ldLCB0aGlzLnNuYWtlQ29sb3JzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvd2VydXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1NxdWFyZSh0aGlzLnBvd2VydXBzW2ldLCB0aGlzLnBvd2VydXBDb2xvcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5taW5UaW1lUGVyRnJhbWUgPSAyMDA7XHJcbiAgICAgICAgdGhpcy5zbmFrZSA9IFtbTWF0aC5mbG9vcih0aGlzLmN0eC5yb3dzIC8gMiksIE1hdGguZmxvb3IodGhpcy5jdHguY29scyAvIDIpXV07XHJcbiAgICAgICAgdGhpcy5zbmFrZUNvbG9ycyA9IFtVdGlscy5yYW5kQ29sb3IoKV07XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbCc7XHJcbiAgICAgICAgdGhpcy5wb3dlcnVwcyA9IFt0aGlzLnJhbmRsb2MoKV07XHJcbiAgICAgICAgdGhpcy5wb3dlcnVwQ29sb3JzID0gW1V0aWxzLnJhbmRDb2xvcigpXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VydXBzLnB1c2godGhpcy5yYW5kbG9jKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VydXBDb2xvcnMucHVzaChVdGlscy5yYW5kQ29sb3IoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmN0eC5pby5hZGRMaXN0ZW5lcigoc29ja2V0SWQ6IHN0cmluZywgZXZlbnQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc29ja2V0SWQgPT09IHRoaXMuY3R4LnNoYXJlZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiB0aGlzLmZvcmJpZGRlblt0aGlzLmxhc3RNb3ZlXSAhPT0gZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGV2ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kaShhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYSArIChiIC0gYSArIDEpICogTWF0aC5yYW5kb20oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYW1lbG9jKGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kbG9jKCk6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCBsb2MgPSBbdGhpcy5yYW5kaSgxLCB0aGlzLmN0eC5yb3dzIC0gMiksIHRoaXMucmFuZGkoMSwgdGhpcy5jdHguY29scyAtIDIpXTtcclxuICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhpcy5zbmFrZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zYW1lbG9jKGxvYywgc2VnbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRsb2MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9jO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGllKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmlvLnNlbmRNZXNzYWdlKHRoaXMuY3R4LnNoYXJlZERhdGEgYXMgc3RyaW5nLCAnc3RvcC1wbGF5aW5nJyk7XHJcbiAgICAgICAgdGhpcy5jdHguc2hhcmVkRGF0YSA9IHRoaXMuc25ha2U7XHJcbiAgICAgICAgdGhpcy5jdHguc3dpdGNoU3RhdGUoR2FtZU92ZXJTY3JlZW4uTmFtZSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGVtby1jbGllbnQvc3JjL3RzL2Rpc3BsYXkvUGxheVNjcmVlbi50cyIsImltcG9ydCB7IEdhbWVDb250ZXh0IH0gZnJvbSAnLi9HYW1lQ29udGV4dCc7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gJy4vR2FtZVN0YXRlJztcclxuaW1wb3J0IHsgU3RhcnRTY3JlZW4gfSBmcm9tICcuL1N0YXJ0U2NyZWVuJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lT3ZlclNjcmVlbiBleHRlbmRzIEdhbWVTdGF0ZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUgPSAnZ2FtZSBvdmVyJztcclxuXHJcbiAgICBwcml2YXRlIGdhbWVPdmVyQXJ0OiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnb29vb28gICAgICAgICAgICAgICAgICBvb29vbyAgICAgICAgICAgICAgICAgJyxcclxuICAgICAgICAnbyAgICAgICAgICAgICAgICAgICAgICBvICAgbyAgICAgICAgICAgICAgICAgJyxcclxuICAgICAgICAnbyAgICAgb29vbyBvb29vbyBvb29vICBvICAgbyBvICAgbyBvb29vIG9vb28nLFxyXG4gICAgICAgICdvICBvbyAgICBvIG8gbyBvIG8gIG8gIG8gICBvIG8gICBvIG8gIG8gbyAgICAnLFxyXG4gICAgICAgICdvICAgbyBvb29vIG8gbyBvIG9vb28gIG8gICBvIG8gICBvIG9vb28gbyAgICAnLFxyXG4gICAgICAgICdvICAgbyBvICBvIG8gbyBvIG8gICAgIG8gICBvICBvIG8gIG8gICAgbyAgICAnLFxyXG4gICAgICAgICdvb29vbyBvb29vIG8gbyBvIG9vb28gIG9vb29vICAgbyAgIG9vb28gbyAgICAnLFxyXG4gICAgXTtcclxuICAgIHByaXZhdGUgc25ha2U6IG51bWJlcltdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoY3R4OiBHYW1lQ29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKGN0eCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkdmFuY2VGcmFtZSgpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5maWxsU2NyZWVuKCdibGFjaycpO1xyXG4gICAgICAgIHRoaXMuZHJhd0JvcmRlcigncmVkJyk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGlzLnNuYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1NxdWFyZShzZWdtZW50LCAnZGFya3JlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcmF3Q2VudGVyZWRBcnQodGhpcy5nYW1lT3ZlckFydCwgJ3JlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNuYWtlID0gdGhpcy5jdHguc2hhcmVkRGF0YSBhcyBudW1iZXJbXVtdO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY3R4LnN3aXRjaFN0YXRlKFN0YXJ0U2NyZWVuLk5hbWUpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RlbW8tY2xpZW50L3NyYy90cy9kaXNwbGF5L0dhbWVPdmVyU2NyZWVuLnRzIiwiaW1wb3J0IHsgR2FtZVJ1bm5lciB9IGZyb20gJy4vZGlzcGxheS9HYW1lUnVubmVyJztcclxucmVxdWlyZSgnLi4vc2Nzcy9kaXNwbGF5LnNjc3MnKTtcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG5jb25zdCBnYW1lID0gbmV3IEdhbWVSdW5uZXIoY2FudmFzKTtcclxuZ2FtZS5ydW4oKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGVtby1jbGllbnQvc3JjL3RzL2Rpc3BsYXkuZW50cnkudHN4IiwiaW1wb3J0IHsgQ291bnREb3duU2NyZWVuIH0gZnJvbSAnLi9Db3VudERvd25TY3JlZW4nO1xyXG5pbXBvcnQgeyBHYW1lQ29udGV4dCB9IGZyb20gJy4vR2FtZUNvbnRleHQnO1xyXG5pbXBvcnQgeyBHYW1lT3ZlclNjcmVlbiB9IGZyb20gJy4vR2FtZU92ZXJTY3JlZW4nO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tICcuL0dhbWVTdGF0ZSc7XHJcbmltcG9ydCB7IElPIH0gZnJvbSAnLi9JTyc7XHJcbmltcG9ydCB7IFBsYXlTY3JlZW4gfSBmcm9tICcuL1BsYXlTY3JlZW4nO1xyXG5pbXBvcnQgeyBTdGFydFNjcmVlbiB9IGZyb20gJy4vU3RhcnRTY3JlZW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVSdW5uZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0ZXM6IHsgW3R5cGU6IHN0cmluZ106IEdhbWVTdGF0ZSB9ID0ge307XHJcbiAgICBwcml2YXRlIGN0eCA9IG5ldyBHYW1lQ29udGV4dCgobmV3U3RhdGU6IHN0cmluZywgY3R4OiBHYW1lQ29udGV4dCkgPT4ge1xyXG4gICAgICAgIGN0eC5pby5jbGVhckxpc3RlbmVycygpO1xyXG4gICAgICAgIGN0eC5jdXJyU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgICB0aGlzLnN0YXRlc1tuZXdTdGF0ZV0uc3RhcnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuY3R4LndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmN0eC5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jdHguZzJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5jdHguZzJELmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3R4LmcyRC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHguaW8gPSBuZXcgSU8oKTtcclxuICAgICAgICB0aGlzLnN0YXRlc1tTdGFydFNjcmVlbi5OYW1lXSA9IG5ldyBTdGFydFNjcmVlbih0aGlzLmN0eCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXNbQ291bnREb3duU2NyZWVuLk5hbWVdID0gbmV3IENvdW50RG93blNjcmVlbih0aGlzLmN0eCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXNbUGxheVNjcmVlbi5OYW1lXSA9IG5ldyBQbGF5U2NyZWVuKHRoaXMuY3R4KTtcclxuICAgICAgICB0aGlzLnN0YXRlc1tHYW1lT3ZlclNjcmVlbi5OYW1lXSA9IG5ldyBHYW1lT3ZlclNjcmVlbih0aGlzLmN0eCk7XHJcbiAgICAgICAgdGhpcy5jdHguY3VyclN0YXRlID0gU3RhcnRTY3JlZW4uTmFtZTtcclxuICAgICAgICB0aGlzLnN0YXRlc1tTdGFydFNjcmVlbi5OYW1lXS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXNbdGhpcy5jdHguY3VyclN0YXRlXS51cGRhdGUoKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLnJ1bigpOyB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZW1vLWNsaWVudC9zcmMvdHMvZGlzcGxheS9HYW1lUnVubmVyLnRzIiwiaW1wb3J0IHsgSU8gfSBmcm9tICcuL0lPJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lQ29udGV4dCB7XHJcbiAgICBwdWJsaWMgZzJEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwdWJsaWMgaW86IElPO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSByb3dzID0gMTg7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29scyA9IDE1NztcclxuICAgIHB1YmxpYyByZWFkb25seSB0aWxlU2l6ZSA9IDQ7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2lkdGggPSB0aGlzLmNvbHMgKiB0aGlzLnRpbGVTaXplO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGhlaWdodCA9IHRoaXMucm93cyAqIHRoaXMudGlsZVNpemU7XHJcblxyXG4gICAgcHVibGljIHNoYXJlZERhdGE6IHt9O1xyXG4gICAgcHVibGljIGN1cnJTdGF0ZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGVTd2l0Y2hlcjogKG5ld1N0YXRlOiBzdHJpbmcsIGN0eDogR2FtZUNvbnRleHQpID0+IHZvaWQpIHt9XHJcblxyXG4gICAgcHVibGljIHN3aXRjaFN0YXRlKG5ld1N0YXRlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlU3dpdGNoZXIobmV3U3RhdGUsIHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RlbW8tY2xpZW50L3NyYy90cy9kaXNwbGF5L0dhbWVDb250ZXh0LnRzIiwiaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XHJcbnR5cGUgU29ja2V0TGlzdGVuZXIgPSAoc29ja2V0SWQ6IHN0cmluZywgZXZlbnQ6IHN0cmluZykgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBJTyB7XHJcbiAgICBwcml2YXRlIGxpc3RlbmVyczogU29ja2V0TGlzdGVuZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzb2NrZXQ6IFNvY2tldElPQ2xpZW50LlNvY2tldDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoJ2VjMi0zNC0yMTctNjEtMTgzLnVzLXdlc3QtMi5jb21wdXRlLmFtYXpvbmF3cy5jb206MzAwMC9kaXNwbGF5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKGxpc3RlbmVyOiBTb2NrZXRMaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdtZXNzYWdlJywgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckxpc3RlbmVycygpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShzb2NrZXRJZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KHNvY2tldElkLCBtZXNzYWdlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzb2NrZXRJZCwgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGVtby1jbGllbnQvc3JjL3RzL2Rpc3BsYXkvSU8udHMiLCJtb2R1bGUuZXhwb3J0cyA9IGlvO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaW9cIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBDb3VudERvd25TY3JlZW4gfSBmcm9tICcuL0NvdW50RG93blNjcmVlbic7XHJcbmltcG9ydCB7IEdhbWVDb250ZXh0IH0gZnJvbSAnLi9HYW1lQ29udGV4dCc7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gJy4vR2FtZVN0YXRlJztcclxuY29uc3QgbG9nb1VSTCA9IHJlcXVpcmUoJy4uLy4uL2ltZy9sb2dvLnBuZycpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgR2FtZVN0YXRlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSA9ICdzdGFydCc7XHJcbiAgICBwcml2YXRlIGxvZ286IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHBhc3Njb2RlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY3R4OiBHYW1lQ29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKGN0eCk7XHJcbiAgICAgICAgdGhpcy5taW5UaW1lUGVyRnJhbWUgPSAyNTA7XHJcbiAgICAgICAgdGhpcy5sb2dvID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5sb2dvLnNyYyA9IGxvZ29VUkw7XHJcbiAgICAgICAgdGhpcy5wYXNzY29kZSA9ICgxMDAwICsgTWF0aC5mbG9vcig5MDAwICogTWF0aC5yYW5kb20oKSkpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5maWxsU2NyZWVuKCd3aGl0ZScpO1xyXG4gICAgICAgIHRoaXMuY3R4LmcyRC5kcmF3SW1hZ2UodGhpcy5sb2dvLCA2LCA2KTtcclxuICAgICAgICB0aGlzLmRyYXdUZXh0KCdjdWhhY2suaXQvcGxheSAnICsgdGhpcy5wYXNzY29kZSwgMTA4LCAxMiwgJ2JsYWNrJywgNDgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5pby5hZGRMaXN0ZW5lcigoc29ja2V0SWQ6IHN0cmluZywgZXZlbnQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgPT09IHRoaXMucGFzc2NvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnNoYXJlZERhdGEgPSBzb2NrZXRJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN3aXRjaFN0YXRlKENvdW50RG93blNjcmVlbi5OYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmlvLnNlbmRNZXNzYWdlKHNvY2tldElkLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGVtby1jbGllbnQvc3JjL3RzL2Rpc3BsYXkvU3RhcnRTY3JlZW4udHMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmYWFmZGMyMmM3MDc4OTFmNDIxOGM5NjFmOTJhYzNiMS5wbmdcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlbW8tY2xpZW50L3NyYy9pbWcvbG9nby5wbmdcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Rpc3BsYXkuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kaXNwbGF5LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Rpc3BsYXkuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGVtby1jbGllbnQvc3JjL3Njc3MvZGlzcGxheS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2RlbW8tY2xpZW50L3NyYy9zY3NzL2Rpc3BsYXkuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==