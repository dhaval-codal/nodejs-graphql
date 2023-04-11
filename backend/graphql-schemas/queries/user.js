import { Users } from "#model/app-user.js"
import { userType } from "#schema/typeDef/user.js"
import { GraphQLID, GraphQLList } from "graphql"

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

export const getUsersDetails = {
    type: userType,
    args: {
        userId: { type: GraphQLID },
    },
    async resolve(parent, args) {
        const { userId } = args
        let userDetails = await Users.findOne({
            relations: {
                todos: true,
            }, where: { id: parseInt(userId) }
        });
        delete userDetails.password
        return userDetails
    }
}