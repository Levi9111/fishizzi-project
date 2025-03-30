"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
});
const customerSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    profileImg: { type: String, default: '' },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
// generating full name
customerSchema.virtual('fullName').get(function () {
    return this?.name?.firstName + '' + this?.name?.lastName;
});
// filter out deleted documents
customerSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
customerSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
//checking if user is already exist!
customerSchema.statics.isUserExists = async function (id) {
    const existingUser = await exports.Customer.findOne({ id });
    return existingUser;
};
exports.Customer = (0, mongoose_1.model)('Customer', customerSchema);
