import { prismaClient } from "../lib/db.js";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
const JWT_SECRET = "superman123";
class userService {
    static generateHash(salt, password) {
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashedPassword;
    }
    static getUserByEmail(email) {
        return prismaClient.user.findUnique({ where: { email: email } });
    }
    static createUser(payload) {
        const { firstName, email, password } = payload;
        const lastName = payload.lastName ?? "";
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = userService.generateHash(salt, password);
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            }
        });
    }
    static async getUserToken(payload) {
        const { email, password } = payload;
        const user = await userService.getUserByEmail(email);
        if (!user)
            throw new Error('User not found');
        const userHashedPassword = userService.generateHash(user.salt, password);
        if (userHashedPassword !== user.password)
            throw new Error("Password Incorrect");
        //Generate the token because password match
        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;
    }
    static decodeJwtToken(token) {
        return JWT.verify(token, JWT_SECRET);
    }
}
export default userService;
//# sourceMappingURL=user.js.map