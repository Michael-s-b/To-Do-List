"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
function getDate() {
    let date = new Date();
    //options to parse the Date returned by the function toLocaleDateString
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    let parsedDate = date.toLocaleDateString("en-US", options);
    return parsedDate;
}
exports.getDate = getDate;
