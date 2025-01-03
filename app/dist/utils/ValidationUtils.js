"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
class ValidationUtils {
    // Función para validar cadenas no vacías
    static validateNotEmptyString(cadena, campo) {
        if (cadena.trim().length === 0) {
            console.error(`${campo} no puede estar vacío.`);
            return false;
        }
        return true;
    }
    // Función para validar correo electrónico
    static validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.error("El correo electrónico no es válido.");
            return false;
        }
        return true;
    }
    // Función para validar fecha de nacimiento
    static validateBirthday(birthDate) {
        const today = new Date();
        if (birthDate >= today) {
            console.error("La fecha de nacimiento no puede ser en el futuro.");
            return false;
        }
        return true;
    }
    // Función para validar que un número sea positivo
    static validateNotNegativeNumber(numero, campo) {
        if (numero < 0) {
            console.error(`${campo} debe ser un número positivo.`);
            return false;
        }
        return true;
    }
}
exports.ValidationUtils = ValidationUtils;
