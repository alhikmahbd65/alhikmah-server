"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({}),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({}),
});
exports.UserValidation = {
    createValidation,
    updateValidation,
};
