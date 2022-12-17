import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir

let listOfItems: string[] = [];

app.get("/", (req, res) => {
	let date = new Date();
	let options: Intl.DateTimeFormatOptions = {
		//options to parse the Date returned by the function toLocaleDateString
		weekday: "long",
		day: "numeric",
		month: "long",
	};
	let parsedDate = date.toLocaleDateString("en-US", options);

	res.render("list", { parsedDate: parsedDate, listOfItems: listOfItems });
});

app.post("/", (req, res) => {
	let item: string = req.body.newItem;
	listOfItems.push(item);
	res.redirect("/");
});

app.listen(3000, () => {
	console.log("Listening on port 3000...");
});
