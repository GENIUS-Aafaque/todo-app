"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoValidator = exports.userValidator = void 0;
const zod_1 = require("zod");
exports.userValidator = zod_1.z.object({
    username: zod_1.z.string().min(1).max(25),
    password: zod_1.z.string().min(4).max(15)
});
exports.todoValidator = zod_1.z.object({
    title: zod_1.z.string().min(1).max(30),
    description: zod_1.z.string().min(1).max(100)
});
