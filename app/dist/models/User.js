"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const ValidationUtils_1 = require("../utils/ValidationUtils");
const validate_1 = require("../decorators/validate");
class User {
    constructor(_name, _email, _birthDate) {
        this._name = _name;
        this._email = _email;
        this._birthDate = _birthDate;
    }
    // Getter y Setter para 'name'
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    // Getter y Setter para 'email'
    get email() {
        return this._email;
    }
    set email(newEmail) {
        this._email = newEmail;
    }
    // Getter y Setter para 'birthday'
    get birthDate() {
        return this._birthDate;
    }
    set birthDate(newBirthDate) {
        this._birthDate = newBirthDate;
    }
}
exports.User = User;
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateNotEmptyString, "User name"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], User.prototype, "name", null);
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateEmail, "User email"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], User.prototype, "email", null);
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateBirthday, "User birthDate"),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], User.prototype, "birthDate", null);
