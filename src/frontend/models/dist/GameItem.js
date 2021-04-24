"use strict";
exports.__esModule = true;
exports.GameItem = exports.GameItemStatus = void 0;
var GameItemStatus;
(function (GameItemStatus) {
    GameItemStatus[GameItemStatus["Open"] = 0] = "Open";
    GameItemStatus[GameItemStatus["Close"] = 1] = "Close";
})(GameItemStatus = exports.GameItemStatus || (exports.GameItemStatus = {}));
var GameItem = /** @class */ (function () {
    function GameItem(id, divId, image, status, isMatched, imageElement) {
        if (status === void 0) { status = GameItemStatus.Close; }
        if (isMatched === void 0) { isMatched = false; }
        if (imageElement === void 0) { imageElement = null; }
        this.id = id;
        this.divId = divId;
        this.image = image;
        this.status = status;
        this.isMatched = isMatched;
        this.imageElement = imageElement;
    }
    return GameItem;
}());
exports.GameItem = GameItem;
