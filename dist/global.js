"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
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
