"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path_1.default.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir
let listOfItems = [];
app.get("/", (req, res) => {
    let date = new Date();
    let options = {
        //options to parse the Date returned by the function toLocaleDateString
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    let parsedDate = date.toLocaleDateString("en-US", options);
    res.render("list", { parsedDate: parsedDate, listOfItems: listOfItems });
});
app.post("/", (req, res) => {
    let item = req.body.newItem;
    listOfItems.push(item);
    res.redirect("/");
});
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
