import { Users } from "#model/user.js"
import { GraphQLID, GraphQLString } from "graphql"
import { Not } from "typeorm"
import { decryptKey, encryptKey } from "../../helper.js"
import { responseType } from "../typeDef/message.js"

export const createUser = {
    type: responseType,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const { username, email, password } = args
        const userDetails = new Users()
        userDetails.username = username
        userDetails.email = email
        userDetails.password = await encryptKey(password)
        await userDetails.save()
        return { error: false, message: `User created with email : ${email}.` }
    }
}

export const updateUserPassword = {
    type: responseType,
    args: {
        userId: { type: GraphQLID },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { userId, oldPassword, newPassword } = args
        let userDetails = await Users.findOneBy({ id: parseInt(userId) });
        if (!userDetails) {
            return { error: true, message: `User not found with userId : ${userId}.` }
        }
        let userPassword = await decryptKey(userDetails.password)
        if (oldPassword !== userPassword) {
            return { error: true, message: `Old password is not correct.` }
        }
        userDetails.password = await encryptKey(newPassword)
        await userDetails.save()
        return { error: false, message: `User password updated for user Id : ${userId}.` }
    }
}

export const updateUserDetails = {
    type: responseType,
    args: {
        userId: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { userId, username, email } = args
        let userDetails = await Users.findOneBy({ email: email, id: Not(userId) });
        console.log("🚀 ~ file: user.js:57 ~ resolve ~ userDetails:", userDetails)
        if (userDetails) {
            return { error: true, message: `User found with same email : ${email}.` }
        }
        userDetails = await Users.findOneBy({ id: parseInt(userId) });
        console.log("🚀 ~ file: user.js:62 ~ resolve ~ userDetails:", userDetails)
        if (!userDetails) {
            return { error: true, message: `User not found with userId : ${userId}.` }
        }
        userDetails.username = username
        userDetails.email = email
        await userDetails.save()
        return { error: false, message: `User details updated for user Id : ${userId}.` }
    }
}

export const deleteUser = {
    type: responseType,
    args: {
        userId: { type: GraphQLID },
    },
    async resolve(parent, args) {
        const { userId } = args
        await Users.delete(userId);
        return { error: false, message: `UserId ${userId} deleted.` }
    }
}