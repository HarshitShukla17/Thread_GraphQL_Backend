import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import createApolloGraphqlServer from "./graphql/index.js";
import userService from "./services/user.js";
const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT || 8000);
//create graphql server..
// const gqlServer=new ApolloServer({
//     typeDefs:`  
//         type Query{
//             hello:String!
//             say(name:String):String!
//         }
//         type Mutation{
//             createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
//         }
//     `,//schema
//     resolvers:{
//         Query:{
//             hello:()=>`Hello i am harshit i am testing the graphql resolver for the Query Schema`,
//             say:(_,{name}:{name:String})=>`Hello ${name} welcome to new appolo server`
//         },
//         Mutation:{
//             createUser:async(_,{firstName,lastName,email,password}:{firstName:string,lastName:string,email:string,password:string})=>{
//                 await prismaClient.user.create({
//                     data:{
//                         email,firstName,lastName,password,
//                         salt:"random_salt"
//                     }
//                 });
//                 return true
//             }
//         }
//     } 
// })
//start the server
app.get("/", (req, res) => {
    res.json({
        message: "Server is up and running"
    });
});
app.use('/graphql', expressMiddleware(await createApolloGraphqlServer(), { context: async ({ req }) => {
        // @ts-ignore
        // 1. Get the token safely (returns "" if header is missing)
        const token = req.headers['token'][0] ?? "";
        console.log(req.headers);
        console.log(token);
        // 2. Prepare an empty context object
        const context = {};
        // 3. Only attempt to decode if a token is present
        if (token) {
            try {
                const user = userService.decodeJwtToken(token);
                // If user is successfully decoded (not null/undefined/false), add it to the context
                if (user) {
                    context.user = user;
                }
            }
            catch (error) {
                // If decoding fails (expired, invalid), log the error 
                // but still return an empty context object.
                console.error("JWT Decoding Failed:", error);
                // The context remains empty: {}
            }
        }
        // 4. CRITICAL FIX: Always return the context object (never undefined)
        return context;
    } }));
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
//# sourceMappingURL=index.js.map