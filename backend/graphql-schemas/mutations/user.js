import { Users } from "#model/user.js"
import { GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { encryptKey } from "../../helper.js"
import { userType } from "../typeDef/user.js"

export const createUser = {
    type: new GraphQLList(userType),
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
    type: new GraphQLList(userType),
    args: {
        userId: { type: GraphQLID },
    },
    async resolve(parent, args) {
        const { userId } = args
        await Users.delete(userId);
    }
}