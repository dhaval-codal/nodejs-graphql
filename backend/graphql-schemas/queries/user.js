import { Users } from "#model/user.js"
import { userType } from "#schema/typeDef/user.js"
import { GraphQLList } from "graphql"

export const getAllUsers = {
    type: new GraphQLList(userType),
    resolve() {
        return Users.find()
    }
}