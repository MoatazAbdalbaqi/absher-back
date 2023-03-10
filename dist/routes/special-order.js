"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const is_admin_1 = __importDefault(require("../middleware/is-admin"));
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const user_1 = __importDefault(require("../models/user"));
const special_order_1 = require("../controlers/special-order");
const router = (0, express_1.Router)();
router.get('/', is_admin_1.default, is_auth_1.default, special_order_1.getOrders);
router.get('/:userId', is_auth_1.default, special_order_1.getOrdersByUserId);
router.post('/', is_auth_1.default, [
    (0, express_validator_1.body)('orderMessage').not().isEmpty(),
    (0, express_validator_1.body)('userId').custom((value) => {
        return user_1.default.findById(value).then((user) => {
            if (!user) {
                return Promise.reject('هذا الحساب غير موجود');
            }
        });
    }),
], special_order_1.createOrder);
router.put('/:orderId', is_admin_1.default, is_auth_1.default, [(0, express_validator_1.body)('status').trim().not().isEmpty()], special_order_1.updateOrder);
router.delete('/:orderId', is_admin_1.default, is_auth_1.default, special_order_1.deleteOrder);
exports.default = router;
