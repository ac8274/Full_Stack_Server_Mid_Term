import { usersAuthService } from "../services/user.auth.service.js";

export const registerUser = async (req,res) => {
    try{
        if(!req.body){
            throw {
                status: 400,
                Error: "No body found"
            }
        }
        const {email: userEmail, password: userPassword} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //found online
        if(!userEmail || !userPassword)
        {
            let response = ""
            if(!userEmail){response += "Email wasn't sent!\n"}
            if(!userPassword){response += "Password wasn't sent!\n"}
            throw {
                status: 400,
                Error: `${response}`
            }
        }
        else if(typeof(userEmail) !== typeof("") || typeof(userPassword) !== typeof(""))
        {
            let response = ""
            if(typeof(userEmail) !== typeof("")){response += "Email must be 'String'\n"}
            if(typeof(userPassword) !== typeof("")){response += "Password must be 'String'\n"}
            throw {
                status: 400,
                Error: `${response}`
            }
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
                Error: "No body found"
            }
        }
        const {email: userEmail, password: userPassword} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //found online
        if(!userEmail || !userPassword)
        {
            let response = ""
            if(!userEmail){response += "Email wasn't sent!\n"}
            if(!userPassword){response += "Password wasn't sent!\n"}
            throw {
                status: 400,
                Error: `${response}`
            }
        }
        else if(typeof(userEmail) !== typeof("") || typeof(userPassword) !== typeof(""))
        {
            let response = ""
            if(typeof(userEmail) !== typeof("")){response += "Email must be 'String'\n"}
            if(typeof(userPassword) !== typeof("")){response += "Password must be 'String'\n"}
            throw {
                status: 400,
                Error: `${response}`
            }
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
                Error: "No body found"
            }
        }
        else if(!req.query){
            throw {
                status: 400,
                Error: "No query found"
            }
        }

        const {password: userPassword} = req.body;
        const {UID: uid} = req.query;
        
        if(!uid || !userPassword)
        {
            let response = ""
            if(!userPassword){response += "Password wasn't sent!\n"}
            if(!uid){
                throw {
                    status: 401,
                    Error: response + "UID wasn't sent!\n"
                }
            }
            throw {
                status: 400,
                Error: `${response}`
            }
        }
        else if(typeof(uid) !== typeof("") || typeof(userPassword) !== typeof(""))
        {
            let response = ""
            if(typeof(userPassword) !== typeof("")){response += "Password must be 'String'\n"}
            if(typeof(uid) !== typeof("")){
                throw {
                    status: 401,
                    Error: response + "UID must be 'String'\n"
                }
            }
            throw {
                status: 400,
                Error: `${response}`
            }
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