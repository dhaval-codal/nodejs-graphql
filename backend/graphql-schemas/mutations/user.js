import { Users } from "#model/user.js"
import { GraphQLID, GraphQLString } from "graphql"
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
        return { error: false, message: `user created with email : ${email}.` }
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
        return { error: false, message: `user password updated for user Id : ${userId}.` }
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
        return { error: false, message: `userId ${userId} deleted.` }
    }
}