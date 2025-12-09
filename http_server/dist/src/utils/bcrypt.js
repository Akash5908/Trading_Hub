import bcrypt from "bcrypt";
export function hashPassword(password) {
    // Using bcrypt for hashing password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
//# sourceMappingURL=bcrypt.js.map