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
                db.run(InputDetailEnum_1.detail.createAdminTableQuery);
                console.log("Table created");
            });
        };
        this.insertData = function (users) {
            var insertQuery = db.prepare(InputDetailEnum_1.detail.insertAdminQuery);
            // insertQuery.run("Admin",25,9503034025,"admin@gmail.com","10-11-1994","admin","admin")
            insertQuery.run(users.name, users.age, users.mobileNumber, users.email, users.birth, users.accountNo, users.accountType, users.username, users.password, users.amount, users.loanApplicable, users.loanTaken, users.loanAmount, users.loanLimit, users.loanApplied);
            console.log("Data inserted successfully...");
            insertQuery.finalize();
            db.close();
        };
        // accessData = () => {
        //     const sql = detail.selectQuery;
        //     db.all(sql,[],(err:{message:string},rows : any[]) => {
        //         if(err) return console.log(err.message);
        //         rows.forEach((row) => {
        //             console.log(row)
        //         })
        //     })
        // }
        this.deleteData = function (name) {
            db.run("DELETE FROM user WHERE name=?", name, function (err) {
                if (err)
                    return console.log(err.message);
                console.log("".concat(name, " deleted successfully..."));
            });
        };
    }
    return Data;
}());
exports.Data = Data;
;
