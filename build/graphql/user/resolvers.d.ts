import { createUserPayload, getUserTokenPayload } from "../../services/user.js";
export declare const resolvers: {
    queries: {
        getUserToken: (_: any, payload: getUserTokenPayload) => Promise<string>;
        getCurrentLoggedInUser: (_: any, parameters: any, context: any) => Promise<never>;
    };
    mutations: {
        createUser: (_: any, payload: createUserPayload) => Promise<string>;
    };
};
//# sourceMappingURL=resolvers.d.ts.map