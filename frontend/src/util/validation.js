// src/utils/validations.js

export function checkPasswordStrength(password) {
    // Password criteria: minimum 8 characters, one uppercase, one lowercase, one digit
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

export function checkPasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

export function validateUsername(username) {
    // Username criteria: alphanumeric, 3-15 characters, must start with a letter
    const regex = /^[A-Za-z][A-Za-z0-9]{2,14}$/;
    return regex.test(username);
}
