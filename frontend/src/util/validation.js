export function checkPasswordStrength(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}
export function checkPasswordMatch(password, confirmPassword) {
    return password == confirmPassword;
}
export function validateUsername(username) {
    const regex = /^[A-Za-z][A-Za-z0-9]{2,14}$/;
    return regex.test(username);
}