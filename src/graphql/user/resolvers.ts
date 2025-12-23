import userService,{createUserPayload,getUserTokenPayload} from "../../services/user.js";

const queries={
    getUserToken:async(_:any,payload:getUserTokenPayload)=>{
        const res=await userService.getUserToken(payload);
        return res;
    },
    getCurrentLoggedInUser:async(_:any,parameters:any,context:any)=>{
         console.log(context)
        throw new Error("I dont Know who are You")
    }
}
const mutations={
    createUser:async(_:any,payload:createUserPayload)=>{
        const res=await userService.createUser(payload);
        return res.id
    }
}

export const resolvers={queries,mutations}