import { GraphQLID, GraphQLList } from "graphql"
import { Todos } from "../../models/todo.ts"
import { todoTypes } from "../typeDef/todos.js"

export const getUsersAllTodos = {
    type: new GraphQLList(todoTypes),
    args: {
        userId: { type: GraphQLID },
    },
    async resolve(parent, args) {
        let { userId } = args
        let todoDetails = await Todos.find()
        return todoDetails
    }
}