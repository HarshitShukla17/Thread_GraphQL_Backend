import { prismaClient } from "../lib/db.js";
import {createHmac,randomBytes} from "node:crypto";
import JWT from "jsonwebtoken"

const JWT_SECRET="superman123";

export interface createUserPayload{
    firstName:string
    lastName?:string
    email:string
    password:string
}

export interface getUserTokenPayload{
    email:string
    password:string
}

class userService{
    private static generateHash(salt:string,password:string)
    {
        const hashedPassword=createHmac('sha256',salt).update(password).digest('hex');
        return hashedPassword;
    }

    private static getUserByEmail(email:string){
        return prismaClient.user.findUnique({where:{email:email}});
    }

    public static createUser(payload:createUserPayload){
        const {firstName,email,password}=payload;
        const lastName=payload.lastName??"";
        const salt=randomBytes(32).toString('hex');
        const hashedPassword=userService.generateHash(salt,password);
        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword,
            }
        })
    }
   
    public static async getUserToken(payload:getUserTokenPayload)
    {
        const {email,password}=payload;
        const user=await userService.getUserByEmail(email);
        if(!user)throw new Error('User not found')

        const userHashedPassword=userService.generateHash(user.salt,password)
        if(userHashedPassword!==user.password)throw new Error("Password Incorrect")

        //Generate the token because password match

        const token=JWT.sign({id:user.id,email:user.email},JWT_SECRET);
        return token;




       

    }

    public static decodeJwtToken(token:string)
    {
        return JWT.verify(token,JWT_SECRET);
    }
}

export default userService