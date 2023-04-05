import { Users } from "#model/user.js"
import { GraphQLList, GraphQLString } from "graphql"
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
        await Users.insert({ username, email, password })
        return Users.find()
    }
}