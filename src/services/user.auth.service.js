/*
1. Seperation of the (validation and manipulation) into the service layer allows us room to breath when switching between frameworks because
   when you switch between frameworks the req data's structure changes which means functions that you wrote before for a diffrent framework won't work anymore.
   This means that if you were to write the validation, manipulation and extraction in the same function that needs to extract the data from the request you would need to
   rewrite the whole function to accomidate the new framework.
   Meanwhile when you seperate thte data extraction from the request and the validation and manipulation into 2 diffrent layers it allows you to save on time when switching
   between frameworks, the only thing that would need to be rewriten is the data extraction and not the whole function containing the validation and manipulation of the data.

2. Seperationg the data validation+manipulation and extraction into two layers allows you to preform more precise unit tests on each of them.
   The validation+manipulation can be activated and tested without the need for the server to be running which allows to save on resources.
*/


import {UsersDAL} from "../DAL/users.DAL.js"
import crypto from 'node:crypto';

export const usersAuthService = {
        registerNewUser : async (email, password) => {
        if(UsersDAL.getUserByEmail(email)){throw {status: 403, Error: `User with email: "${email}" already exists!`}}
        const userCoockie = crypto.randomUUID();
        UsersDAL.addUser(email,crypto.createHash("md5").update(password).digest('hex'),userCoockie);
        const userUID = await UsersDAL.getUserByEmail(email)["UID"]
        return {
            status: 201,
            UID: userUID,
            Coockie: userCoockie
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
                UID: user["UID"],
                Coockie: user["Coockie"]
            }
        }
    },
    updatePassword: async (uid,password,coockie) => {
        const user = await UsersDAL.getUserByUID(uid)
        if(!user){
            throw {
                status: 404,
                Error: "No user found"
            }
        }
        else if(user["Coockie"] !== coockie)
        {
            throw {
                status: 401,
                Error: "Coockie doesn't match the users recorded Coockie"
            }
        }
        else{
            UsersDAL.updatePasswordByUID(uid,crypto.createHash("md5").update(password).digest('hex'))
            return {status: 204};
        }
    },
    deleteUser: async (uid,coockie) => {
        const user = await UsersDAL.getUserByUID(uid)
        if(!user){
            throw {
                status: 404,
                Error: "No user found"
            }
        }
        else if(user["Coockie"] !== coockie)
        {
            throw {
                status: 401,
                Error: "Coockie doesn't match the users recorded Coockie"
            }
        }
        else{
            UsersDAL.deleteUserByUID(uid)
            return {status: 204};
        }
    }
}