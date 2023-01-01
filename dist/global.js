"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.listSchema = exports.Item = exports.itemSchema = exports.getDate = void 0;
const mongoose_1 = __importStar(require("mongoose"));
function getDate() {
    const date = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    return date.toLocaleDateString("en-US", options);
}
exports.getDate = getDate;
// 2. Create a Schema corresponding to the document interface.
exports.itemSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    name: { type: String, required: true },
});
// 3. Create a Model.
exports.Item = (0, mongoose_1.model)("Item", exports.itemSchema);
// 2. Create a Schema corresponding to the document interface.
exports.listSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    name: { type: String, required: true },
    items: { type: [exports.itemSchema], required: true },
});
// 3. Create a Model.
exports.List = (0, mongoose_1.model)("List", exports.listSchema);
