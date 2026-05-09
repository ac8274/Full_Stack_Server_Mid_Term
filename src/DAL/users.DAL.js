let usersDB = []

export const UsersDAL = {
    addUser: (email, password,uid) => {
        usersDB.push({
            Email: `${email}`,
            Password: `${password}`,
            UID: `${uid}`
        })
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
    }
}