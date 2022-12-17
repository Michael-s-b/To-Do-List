import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";
import { getDate } from "./global";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir

const dailyList: string[] = []; // to do list of homePageDir
const workList: string[] = []; // to do list of workPageDir
const homePageDir = "/";
const workPageDir = "/work";
// "/"
app.get(homePageDir, (req, res) => {
	const parsedDate = getDate();
	res.render("list", {
		listTitle: parsedDate,
		listOfItems: dailyList,
		formAction: homePageDir,
	});
});

app.post(homePageDir, (req, res) => {
	const item: string = req.body.newItem;
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
	const item: string = req.body.newItem;
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
