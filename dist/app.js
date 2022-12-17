"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const global_1 = require("./global");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path_1.default.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir
const dailyList = []; // to do list of homePageDir
const workList = []; // to do list of workPageDir
const homePageDir = "/";
const workPageDir = "/work";
// "/"
app.get(homePageDir, (req, res) => {
    const parsedDate = (0, global_1.getDate)();
    res.render("list", {
        listTitle: parsedDate,
        listOfItems: dailyList,
        formAction: homePageDir,
    });
});
app.post(homePageDir, (req, res) => {
    const item = req.body.newItem;
    dailyList.push(item);
    res.redirect(homePageDir);
});
// "/work"
app.get(workPageDir, (req, res) => {
    const workTitle = "Work";
    res.render("list", {
        listTitle: workTitle,
        listOfItems: workList,
        formAction: workPageDir,
    });
});
app.post(workPageDir, (req, res) => {
    const item = req.body.newItem;
    workList.push(item);
    res.redirect(workPageDir);
});
// "/about"
app.get("/about", (req, res) => {
    res.render("about");
});
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
