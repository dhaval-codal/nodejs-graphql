import { Users } from "#model/app-user.js"
import { userType } from "#schema/typeDef/user.js"
import { GraphQLList } from "graphql"

export const getAllUsers = {
    type: new GraphQLList(userType),
    async resolve() {
        let usersDetails = await Users.find({
            relations: {
                todos: true,
            },
        })
        await usersDetails.map((user) => {
            delete user.password
        })
        return usersDetails
    }
}