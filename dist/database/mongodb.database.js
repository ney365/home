"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongodbDatabase = function (mongoUri) {
    mongoose_1.default
        .connect("".concat(mongoUri))
        .then(function () {
        console.log('DB CONNECTED');
    })
        .catch(function (error) {
        throw error;
    });
};
exports.default = mongodbDatabase;
