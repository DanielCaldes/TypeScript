import { ValidationUtils } from '../utils/ValidationUtils';
import {validate} from '../decorators/validate';

export class User{
    constructor(
        private _name : string,
        private _email : string,
        private _birthDate : Date
    ){}

    // Getter y Setter para 'name'
    public get name(): string {
        return this._name;
    }

    @validate(ValidationUtils.validateNotEmptyString, "User name")
    public set name(newName: string) {
        this._name = newName;
    }

    // Getter y Setter para 'email'
    public get email(): string {
        return this._email;
    }

    @validate(ValidationUtils.validateEmail, "User email")
    public set email(newEmail: string) {
        this._email = newEmail;
    }

    // Getter y Setter para 'birthday'
    public get birthDate(): Date {
        return this._birthDate;
    }

    @validate(ValidationUtils.validateBirthday, "User birthDate")
    public set birthDate(newBirthDate: Date) {
        this._birthDate = newBirthDate;
    }
}