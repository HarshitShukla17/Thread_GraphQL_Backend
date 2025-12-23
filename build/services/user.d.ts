import JWT from "jsonwebtoken";
export interface createUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}
export interface getUserTokenPayload {
    email: string;
    password: string;
}
declare class userService {
    private static generateHash;
    private static getUserByEmail;
    static createUser(payload: createUserPayload): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library.js").GetResult<{
        id: string;
        firstName: string;
        lastName: string | null;
        profileImageUrl: string | null;
        email: string;
        password: string;
        salt: string;
    }, unknown> & {}, never, import("@prisma/client/runtime/library.js").DefaultArgs>;
    static getUserToken(payload: getUserTokenPayload): Promise<string>;
    static decodeJwtToken(token: string): string | JWT.JwtPayload;
}
export default userService;
//# sourceMappingURL=user.d.ts.map