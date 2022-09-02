"use strict";
exports.__esModule = true;
exports.Data = void 0;
var InputDetailEnum_1 = require("../Constants/InputDetailEnum");
var sqlite3 = require(InputDetailEnum_1.detail.sqlite).verbose();
var db = new sqlite3.Database(InputDetailEnum_1.detail.database);
var Data = /** @class */ (function () {
    function Data() {
        this.createTable = function () {
            db.serialize(function () {
                db.run(InputDetailEnum_1.detail.createTableQuery);
                console.log("Table created");
            });
        };
    }
    return Data;
}());
exports.Data = Data;
;
