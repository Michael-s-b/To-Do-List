import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";

const app = express();

app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir

enum Weekdays {
	"Monday" = 1,
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
}

app.get("/", (req, res) => {
	let date = new Date();
	let dayOfTheWeek = Weekdays[date.getDay()];
	res.render("list", { dayOfTheWeek: dayOfTheWeek });
});

app.listen(3000, () => {
	console.log("Listening on port 3000...");
});
