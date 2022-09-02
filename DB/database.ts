
import { detail } from "../Constants/InputDetailEnum";
var sqlite3 = require(detail.sqlite).verbose();
var db = new sqlite3.Database(detail.database);

export class Data {

    constructor(){
    }
    createTable = () => {
            db.serialize(function () {
                db.run(detail.createTableQuery);
                console.log("Table created");
            });
    };
   
};

