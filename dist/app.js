"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const global_1 = require("./global");
const mongoose_1 = __importDefault(require("mongoose"));
const lodash_1 = __importDefault(require("lodash"));
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect("mongodb://127.0.0.1:27017/to-do-list"); //connect to MongoDB "to-do-list" collection through mongoose
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "/public"))); //everything on public dir will be static avaible to the client
app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path_1.default.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir
let dailyList = [];
async function updateDailyList() {
    try {
        const result = await global_1.Item.find({});
        dailyList = result;
    }
    catch (error) {
        console.log(error);
    }
}
const homePageDir = "/";
const aboutPageDir = "/about";
// "/" default list
app.get(homePageDir, async (req, res) => {
    const parsedDate = (0, global_1.getDate)();
    await updateDailyList();
    res.render("list", {
        listTitle: parsedDate,
        listOfItems: dailyList,
        thisPath: homePageDir,
    });
});
// add item to the default list
app.post(homePageDir, (req, res) => {
    const newDocumentId = new mongoose_1.default.Types.ObjectId();
    global_1.Item.create({ _id: newDocumentId, name: req.body.newItem }, (error, doc) => {
        if (error) {
            // handle error
        }
        else {
            console.log(doc);
        }
    });
    res.redirect(homePageDir);
});
// delete item from the default list
app.post("/delete/", (req, res) => {
    const itemId = lodash_1.default.replace(req.body.deleteCheckbox, /\s/g, "");
    global_1.Item.findByIdAndRemove({ _id: itemId }, (error, result) => {
        if (error) {
            //console.log(error);
        }
        else {
            console.log(result);
        }
    });
    res.redirect(homePageDir);
});
// "/about"
app.get(aboutPageDir, (req, res) => {
    res.render("about");
});
//return already existing lists or create a new one if it doesn't exist
app.get("/lists/:listId", (req, res) => {
    const listId = lodash_1.default.kebabCase(lodash_1.default.lowerCase(req.params.listId));
    //console.log(listId);
    global_1.List.find({ name: listId }, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            //console.log(result[0].items);
            if (result.length === 0) {
                console.log("Nothing found, will create a new list and redirect back to the new list created");
                //create default items
                const newDocumentId1 = new mongoose_1.default.Types.ObjectId();
                const newDocumentId2 = new mongoose_1.default.Types.ObjectId();
                const newDocumentId3 = new mongoose_1.default.Types.ObjectId();
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
                const newDocumentId = new mongoose_1.default.Types.ObjectId();
                global_1.List.create({
                    _id: newDocumentId,
                    name: listId,
                    items: defaultDocuments,
                });
                res.redirect("/lists/" + listId);
            }
            else {
                console.log("Found");
                const listTitle = lodash_1.default.startCase(listId);
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
app.post("/lists/:listId", (req, res) => {
    const newItemName = req.body.newItem;
    console.log(`The new item to add: ${newItemName}`);
    const newDocumentId = new mongoose_1.default.Types.ObjectId();
    const newItem = { _id: newDocumentId, name: newItemName };
    const listName = lodash_1.default.kebabCase(lodash_1.default.lowerCase(req.params.listId));
    console.log(`The name of the list where to add the new item: ${listName}`);
    global_1.List.findOneAndUpdate({ name: listName }, { $push: { items: newItem } }, (error, doc) => {
        if (error) {
            // Handle the error
            console.log("Error updating the document");
        }
        else {
            // The document was updated successfully
            console.log("The document was updated successfully");
            // console.log(doc);
            res.redirect("/lists/" + listName);
        }
    });
});
//delete item from the custom list
app.post("/lists/:listId/delete", (req, res) => {
    //console.log(req.body.deleteCheckbox);
    //console.log(req.params.listId);
    const itemId = lodash_1.default.replace(req.body.deleteCheckbox, /\s/g, "");
    const listName = req.params.listId;
    // console.log(itemId);
    // console.log(listName);
    global_1.List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemId } } }, function (error, doc) {
        if (error) {
            // Handle the error
            console.log("Error updating the document");
        }
        else {
            // The document was updated successfully
            console.log("The document was updated successfully");
            // console.log(doc);
            res.redirect("/lists/" + listName);
        }
    });
});
// listening port number
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
