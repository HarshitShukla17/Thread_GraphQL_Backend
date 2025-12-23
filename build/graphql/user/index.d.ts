export declare const User: {
    typeDefs: string;
    queries: string;
    mutations: string;
    resolvers: {
        queries: {
            getUserToken: (_: any, payload: import("../../services/user.js").getUserTokenPayload) => Promise<string>;
            getCurrentLoggedInUser: (_: any, parameters: any, context: any) => Promise<never>;
        };
        mutations: {
            createUser: (_: any, payload: import("../../services/user.js").createUserPayload) => Promise<string>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map