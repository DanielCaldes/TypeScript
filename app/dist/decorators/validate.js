"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate(validationFn, campo) {
    return function (target, propertyKey, descriptor) {
        if (descriptor.set) {
            // Validación para setters
            const originalSetter = descriptor.set;
            descriptor.set = function (value) {
                if (validationFn(value, campo)) {
                    originalSetter === null || originalSetter === void 0 ? void 0 : originalSetter.call(this, value);
                }
            };
        }
        else if (descriptor.value) {
            // Validación para métodos
            const originalMethod = descriptor.value;
            descriptor.value = function (...args) {
                if (args.some((arg) => !validationFn(arg, campo))) {
                    console.warn(`Validación fallida para el campo: ${campo}`);
                    return;
                }
                return originalMethod.apply(this, args);
            };
        }
    };
}
