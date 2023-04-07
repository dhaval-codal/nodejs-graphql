import { Users } from "#model/app-user.js"
import { GraphQLID, GraphQLString } from "graphql"
import { Todos } from "../../models/todo.js"
import { responseType } from "../typeDef/message.js"

export const createUserTodo = {
    type: responseType,
    args: {
        userId: { type: GraphQLID },
        description: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const { userId, description } = args
        let userDetails = await Users.findOneBy({ id: parseInt(userId) });
        if (!userDetails) {
            return { error: true, message: `User not found with userId : ${userId}.` }
        }
        const todDetails = new Todos()
        todDetails.description = description
        todDetails.userId = userId
        await todDetails.save()
        return { error: false, message: `Todo details saved for user id : ${userId}.` }
    }
}

export const updateUserTodoDetails = {
    type: responseType,
    args: {
        userId: { type: GraphQLID },
        todoId: { type: GraphQLID },
        description: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { userId, todoId, description } = args
        let userDetails = await Users.findOneBy({ id: userId });
        if (!userDetails) {
            return { error: true, message: `User not  with userId : ${userId}.` }
        }
        let todoDetails = await Todos.findOneBy({ userId: parseInt(userId), id: parseInt(todoId) });
        if (!todoDetails) {
            return { error: true, message: `Todo details not found with todoId : ${todoId}.` }
        }
        todoDetails.description = description
        await todoDetails.save()
        return { error: false, message: `Todo details updated for user Id : ${userId}.` }
    }
}

export const deleteUserTodo = {
    type: responseType,
    args: {
        userId: { type: GraphQLID },
        todoId: { type: GraphQLID },
    },
    async resolve(parent, args) {
        const { userId, todoId } = args
        await Todos.delete({ id: todoId, userId: userId });
        return { error: false, message: `Todo details deleted.` }
    }
}