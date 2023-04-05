import { Users } from "#model/user.js"
import { GraphQLID, GraphQLString } from "graphql"
import { encryptKey } from "../../helper.js"
import { responseType } from "../typeDef/message.js"
import { userType } from "../typeDef/user.js"

export const createUser = {
    type: userType,
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
        return Users.find({ where: { username: username, email: email } })
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