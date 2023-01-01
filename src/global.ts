import mongoose, { model, Schema, Types } from "mongoose";

export function getDate() {
	const date = new Date();
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};
	return date.toLocaleDateString("en-US", options);
}
////////////////////////////////////////////////////////
// 1. Create an interface representing a document in MongoDB.
export interface Item {
	_id: Types.ObjectId;
	name: string;
}

// 2. Create a Schema corresponding to the document interface.
export const itemSchema = new Schema<Item>({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
	name: { type: String, required: true },
});

// 3. Create a Model.
export const Item = model<Item>("Item", itemSchema);
/////////////////////////////////////////////////////////

// export const defaultList = Item.create(
// 	defaultDocuments,
// 	(error: any, docs: Item[]) => {
// 		if (error) {
// 			// handle error
// 			console.log(error);
// 		}
// 	}
// );
////////////////////////////////////////////////////////
// 1. Create an interface representing a document in MongoDB.
export interface List {
	_id: Types.ObjectId;
	name: string;
	items: Item[];
}
// 2. Create a Schema corresponding to the document interface.
export const listSchema = new Schema<List>({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	name: { type: String, required: true },
	items: { type: [itemSchema], required: true },
});
// 3. Create a Model.
export const List = model<List>("List", listSchema);
