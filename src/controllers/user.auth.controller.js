import { usersAuthService } from "../services/user.auth.service.js";
import { basicStringCheck } from "../utils/utility.js";

export const registerUser = async (req,res) => {
    try{
        if(!req.query){
            throw {
                status: 400,
                Error: "No User Credentialls found"
            }
        }
        const {email: userEmail, password: userPassword} = req.query;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //found online

        const checkPassword = basicStringCheck(userPassword,400,"Password")
        const checkEmail = basicStringCheck(userEmail,400,"Email")
        if(checkPassword && checkEmail)
        {
            throw {
                status: 400,
                Error: checkEmail["Error"] + checkPassword["Error"]
            }
        }
        else if(checkEmail)
        {
            throw checkEmail;
        }
        else if(checkPassword)
        {
            throw checkPassword
        }
        else if(!emailRegex.test(userEmail)){throw {status: 400, Error: "Fabricated email provided"}}
        else{
            const response = await usersAuthService.registerNewUser(userEmail,userPassword);
            res.status(response.status).json(response)
        }
    }
    catch(error)
    {
        res.status(error.status).json(error)
    }
}

export const logInUser = async (req,res) => {
    try{
        if(!req.body){
            throw {
                status: 400,
                Error: "No User Credentialls found"
            }
        }
        const {email: userEmail, password: userPassword} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //found online

        const checkPassword = basicStringCheck(userPassword,400,"Password")
        const checkEmail = basicStringCheck(userEmail,400,"Email")
        if(checkPassword && checkEmail)
        {
            throw {
                status: 400,
                Error: checkEmail["Error"] + checkPassword["Error"]
            }
        }
        else if(checkEmail)
        {
            throw checkEmail;
        }
        else if(checkPassword)
        {
            throw checkPassword
        }
        else if(!emailRegex.test(userEmail)){throw {status: 400, Error: "Fabricated email provided"}}
        else{
            const response = await usersAuthService.logInUser(userEmail,userPassword);
            res.status(response.status).json(response)
        }
    }
    catch(error)
    {
        res.status(error.status).json(error)
    }
}

export const updateUserPassword = async (req,res) => {
    try{
        if(!req.body){
            throw {
                status: 400,
                Error: "No User Credentialls found"
            }
        }
        else if(!req.query){
            throw {
                status: 401,
                Error: "No User provided"
            }
        }

        const {password: userPassword} = req.body;
        const {UID: uid} = req.query;
        
        const checkPassword = basicStringCheck(userPassword,400,"Password")
        const checkUid = basicStringCheck(uid,401,"UID")
        if(checkPassword && checkUid)
        {
            throw {
                status: 401,
                Error: checkUid["Error"] + checkPassword["Error"]
            }
        }
        else if(checkUid)
        {
            throw checkUid;
        }
        else if(checkPassword)
        {
            throw checkPassword
        }
        else{
            const response = await usersAuthService.updatePassword(uid,userPassword);
            res.status(response.status).json(response)
        }
    }
    catch(error)
    {
        res.status(error.status).json(error)
    }
}

export const deleteUser = async (req,res) => {
    try{
        if(!req.query){
            throw {
                status: 400,
                Error: "No user provided"
            }
        }

        const {UID: uid} = req.query;

        const checkUid = basicStringCheck(uid,401,"UID")

        if(checkUid)
        {
            throw checkUid;
        }
        else
        {
            const response = await usersAuthService.deleteUser(uid);
            res.status(response.status).json(response)
        }
    }
    catch(error)
    {
        res.status(error.status).json(error)
    }
}


