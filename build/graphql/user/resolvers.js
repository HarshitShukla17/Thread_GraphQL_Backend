import userService from "../../services/user.js";
const queries = {
    getUserToken: async (_, payload) => {
        const res = await userService.getUserToken(payload);
        return res;
    },
    getCurrentLoggedInUser: async (_, parameters, context) => {
        console.log(context);
        throw new Error("I dont Know who are You");
    }
};
const mutations = {
    createUser: async (_, payload) => {
        const res = await userService.createUser(payload);
        return res.id;
    }
};
export const resolvers = { queries, mutations };
//# sourceMappingURL=resolvers.js.map