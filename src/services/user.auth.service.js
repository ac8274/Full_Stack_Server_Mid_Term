import {UsersDAL} from "../DAL/users.DAL.js"
import crypto from 'node:crypto';

export const usersAuthService = {
        registerNewUser : async (email, password) => {
        if(UsersDAL.getUserByEmail(email)){throw {status: 403, Error: `User with email: "${email}" already exists!`}}
        const userUID = crypto.randomUUID();
        UsersDAL.addUser(email,crypto.createHash("md5").update(password).digest('hex'),userUID);
        return {
            status: 201,
            UID: userUID
        };
    },
    logInUser: async (email,password) => {
        const user = await UsersDAL.getUserByEmail(email)
        if(!user){
            throw {
                status: 404,
                Error: "No user with Email: '" + email + "'"
            }
        }
        else if(crypto.createHash("md5").update(password).digest('hex') !== user["Password"]){
            throw {
                status: 400,
                Error: "Incorect password!"
            }
        }
        else{
            return {
                status: 200,
                UID: user["UID"]
            }
        }
    },
    updatePassword: async (uid,password) => {
        const user = await UsersDAL.getUserByUID(uid)
        if(!user){
            throw {
                status: 404,
                Error: "No user found"
            }
        }
        else{
            UsersDAL.updatePasswordByUID(uid,crypto.createHash("md5").update(password).digest('hex'))
            return {status: 204};
        }
    },
    deleteUser: async (uid) => {
        const user = await UsersDAL.getUserByUID(uid)
        if(!user){
            throw {
                status: 404,
                Error: "No user found"
            }
        }
        else{
            UsersDAL.deleteUserByUID(uid)
            return {status: 204};
        }
    }
}