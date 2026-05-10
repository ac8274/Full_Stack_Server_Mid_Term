let usersDB = []
let latestID = 1

export const UsersDAL = {
    addUser: (email, password,coockie) => {
        usersDB.push({
            Email: `${email}`,
            Password: `${password}`,
            UID: latestID.toString(),
            Coockie: `${coockie}`
        })
        latestID += 1
    },
    getUserByUID: (uid) => {
        const user = usersDB.find((userInfo) => {return userInfo["UID"] === uid})
        return user;
    },
    getUserByEmail: (email) => {
        const user = usersDB.find((userInfo) => {return userInfo["Email"] === email})
        return user;
    },
    updatePasswordByUID: (uid,password) => {
        const user = usersDB.findIndex((userInfo) => {return userInfo["UID"] === uid})
        usersDB[user]["Password"] = password;
    },
    deleteUserByUID: (uid) => {
        const user = usersDB.findIndex((userInfo) => {return userInfo["UID"] === uid})
        usersDB.splice(user,1);
    }
}