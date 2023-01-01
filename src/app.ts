import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";
import { getDate, Item, itemSchema, List, listSchema } from "./global";
import mongoose, { CallbackError, Model, model, Schema } from "mongoose";
import _ from "lodash";
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/to-do-list"); //connect to MongoDB "to-do-list" collection through mongoose
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public"))); //everything on public dir will be static avaible to the client
app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir

let dailyList: Item[] = [];
async function updateDailyList() {
	try {
		const result = await Item.find({});
		dailyList = result;
	} catch (error) {
		console.log(error);
	}
}

const homePageDir = "/";
const aboutPageDir = "/about";

// "/" default list
app.get(homePageDir, async (req, res) => {
	const parsedDate = getDate();
	await updateDailyList();
	res.render("list", {
		listTitle: parsedDate,
		listOfItems: dailyList,
		thisPath: homePageDir,
	});
});
// add item to the default list
app.post(homePageDir, (req, res) => {
	const newDocumentId = new mongoose.Types.ObjectId();
	Item.create(
		{ _id: newDocumentId, name: req.body.newItem },
		(error: any, doc: Item) => {
			if (error) {
				// handle error
			} else {
				console.log(doc);
			}
		}
	);

	res.redirect(homePageDir);
});
// delete item from the default list
app.post("/delete/", (req, res) => {
	const itemId = _.replace(req.body.deleteCheckbox, /\s/g, "");
	Item.findByIdAndRemove(
		{ _id: itemId },
		(error: CallbackError, result: any) => {
			if (error) {
				//console.log(error);
			} else {
				console.log(result);
			}
		}
	);
	res.redirect(homePageDir);
});
// "/about"
app.get(aboutPageDir, (req, res) => {
	res.render("about");
});

//return already existing lists or create a new one if it doesn't exist
app.get("/lists/:listId", (req, res) => {
	const listId = _.kebabCase(_.lowerCase(req.params.listId));
	//console.log(listId);
	List.find({ name: listId }, (error: CallbackError, result: List[]) => {
		if (error) {
			console.log(error);
		} else {
			//console.log(result[0].items);
			if (result.length === 0) {
				console.log(
					"Nothing found, will create a new list and redirect back to the new list created"
				);
				//create default items
				const newDocumentId1 = new mongoose.Types.ObjectId();
				const newDocumentId2 = new mongoose.Types.ObjectId();
				const newDocumentId3 = new mongoose.Types.ObjectId();
				const defaultDocuments = [
					{
						_id: newDocumentId1,
						name: "Welcome to your To Do List!",
					},
					{
						_id: newDocumentId2,
						name: "Click the + to add a new item",
					},
					{
						_id: newDocumentId3,
						name: "<--- Check the box to remove the item!",
					},
				];
				//create a new list
				const newDocumentId = new mongoose.Types.ObjectId();
				List.create({
					_id: newDocumentId,
					name: listId,
					items: defaultDocuments,
				});
				res.redirect("/lists/" + listId);
			} else {
				console.log("Found");
				const listTitle = _.startCase(listId);
				const thisPath = `/lists/${listId}/`;
				res.render("list", {
					listTitle: listTitle,
					listOfItems: result[0].items,
					thisPath: thisPath,
				});
			}
		}
	});
});
//add item to the custom list
app.post("/lists/:listId", (req: any, res) => {
	const newItemName = req.body.newItem;
	console.log(`The new item to add: ${newItemName}`);
	const newDocumentId = new mongoose.Types.ObjectId();
	const newItem = { _id: newDocumentId, name: newItemName };
	const listName = _.kebabCase(_.lowerCase(req.params.listId));
	console.log(`The name of the list where to add the new item: ${listName}`);
	List.findOneAndUpdate(
		{ name: listName },
		{ $push: { items: newItem } },
		(error: any, doc: Item) => {
			if (error) {
				// Handle the error
				console.log("Error updating the document");
			} else {
				// The document was updated successfully
				console.log("The document was updated successfully");
				// console.log(doc);
				res.redirect("/lists/" + listName);
			}
		}
	);
});
//delete item from the custom list
app.post("/lists/:listId/delete", (req: any, res) => {
	//console.log(req.body.deleteCheckbox);
	//console.log(req.params.listId);
	const itemId = _.replace(req.body.deleteCheckbox, /\s/g, "");
	const listName = req.params.listId;
	// console.log(itemId);
	// console.log(listName);

	List.findOneAndUpdate(
		{ name: listName },
		{ $pull: { items: { _id: itemId } } },
		function (error: any, doc: Item) {
			if (error) {
				// Handle the error
				console.log("Error updating the document");
			} else {
				// The document was updated successfully
				console.log("The document was updated successfully");
				// console.log(doc);
				res.redirect("/lists/" + listName);
			}
		}
	);
});
// listening port number
app.listen(3000, () => {
	console.log("Listening on port 3000...");
});
