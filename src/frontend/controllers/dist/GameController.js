"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GameController = void 0;
var GameItem_1 = require("../models/GameItem");
var autobind_decorator_1 = require("autobind-decorator");
var lodash_1 = require("lodash");
var GameController = /** @class */ (function () {
    function GameController(items, element) {
        this.element = element;
        this.items = [];
        this.initGame(items);
    }
    GameController.prototype.initGame = function (initData) {
        for (var _i = 0, initData_1 = initData; _i < initData_1.length; _i++) {
            var item = initData_1[_i];
            this.items.push(item);
            this.items.push(new GameItem_1.GameItem(item.id, item.divId, item.image));
        }
        var id = 1;
        this.items.forEach(function (it) {
            it.status = GameItem_1.GameItemStatus.Close;
            it.divId = 'd' + id;
            id++;
        });
    };
    GameController.prototype.reinitGAme = function () {
        this.items.forEach(function (item) {
            item.imageElement = null;
            item.status = GameItem_1.GameItemStatus.Close;
            item.isMatched = false;
        });
        this.shuffle();
    };
    GameController.prototype.isWinGame = function () {
        return this.items.filter(function (item) { return item.status === GameItem_1.GameItemStatus.Open; }).length
            === this.items.length;
    };
    GameController.prototype.renderHTML = function (rootElement, item) {
        // <div class="col-2 gameItem m-2 p1 text-center">
        //             <img src="./images/1.png" alt="" class="img-fluid">
        //         </div>
        var divItem = document.createElement('div');
        divItem.className = 'col-2 gameItem m-2 p1 text-center';
        divItem.id = item.divId;
        divItem.addEventListener('click', this.processGameItemClicked);
        var imgItem = document.createElement('img');
        imgItem.src = "images/" + item.image;
        imgItem.className = 'img-fluid invisible';
        item.imageElement = imgItem;
        divItem.appendChild(imgItem);
        rootElement.appendChild(divItem);
    };
    GameController.prototype.renderResetButton = function (rootElement) {
        var button = rootElement.querySelector('button#reset');
        if (button) {
            button.addEventListener('click', this.processResetButtonClicked);
        }
    };
    GameController.prototype.renderGameBoard = function () {
        var _this = this;
        this.shuffle();
        var boardDiv = this.element.querySelector('#board');
        if (boardDiv) {
            this.items.forEach(function (it) {
                _this.renderHTML(boardDiv, it);
            });
        }
        this.renderResetButton(this.element);
    };
    GameController.prototype.isMatched = function (id, imgElement) {
        var _this = this;
        var openedItems = this.items.filter(function (item) {
            if (item.status === GameItem_1.GameItemStatus.Open && !item.isMatched) {
                return item;
            }
        });
        if (openedItems.length == 2) {
            var checkMatchedFilter = openedItems.filter(function (item) { return item.id == id; });
            if (checkMatchedFilter.length < 2) {
                openedItems.forEach(function (item) {
                    _this.changeMatchedBackground(item.imageElement, false);
                });
                setTimeout(function () {
                    return openedItems.forEach(function (item) {
                        if (item.imageElement) {
                            item.imageElement.className = 'img-fluid invisible';
                            item.status = GameItem_1.GameItemStatus.Close;
                            item.isMatched = false;
                            _this.changeMatchedBackground(item.imageElement);
                        }
                    });
                }, 600);
            }
            else {
                openedItems.forEach(function (item) {
                    item.isMatched = true;
                    _this.changeMatchedBackground(item.imageElement);
                });
                return true;
            }
        }
        return false;
    };
    GameController.prototype.changeMatchedBackground = function (imgElement, isMatched) {
        if (isMatched === void 0) { isMatched = true; }
        if (imgElement === null || imgElement === void 0 ? void 0 : imgElement.parentElement) {
            if (isMatched) {
                imgElement.parentElement.className =
                    'col-2 gameItem m-1 p-1 text-center';
            }
            else {
                imgElement.parentElement.className =
                    'col-2 gameItem m-1 p-1 text-center unmatched';
            }
        }
    };
    GameController.prototype.processGameItemClicked = function (event) {
        var element = event.target;
        if (element.tagName === 'img') {
            element = element.parentElement;
        }
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.divId == (element === null || element === void 0 ? void 0 : element.id) && !item.isMatched
                && item.status === GameItem_1.GameItemStatus.Close) {
                item.status = GameItem_1.GameItemStatus.Open;
                var imgElement = element.querySelector('img');
                if (imgElement) {
                    imgElement.className = "img-fluid visible";
                    this.isMatched(item.id, imgElement);
                }
            }
        }
    };
    GameController.prototype.processResetButtonClicked = function (event) {
        this.reinitGAme();
        var boardElement = document.querySelector('#board');
        boardElement.innerHTML = '';
        this.renderGameBoard();
    };
    GameController.prototype.shuffle = function () {
        this.items = lodash_1["default"].shuffle(this.items);
    };
    __decorate([
        autobind_decorator_1["default"]
    ], GameController.prototype, "processGameItemClicked");
    __decorate([
        autobind_decorator_1["default"]
    ], GameController.prototype, "processResetButtonClicked");
    return GameController;
}());
exports.GameController = GameController;
