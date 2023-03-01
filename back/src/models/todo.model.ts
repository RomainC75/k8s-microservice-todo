import { Schema, model, SchemaTypes } from 'mongoose'
import { TodoInterface } from '../@types/todo.type'

const todoSchema = new Schema<TodoInterface>(
  {
    listId: {
      type: SchemaTypes.ObjectId,
      ref: 'List',
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    deadLine:{
      type:Date
    },
    isDone:{
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
)

const Todo = model<TodoInterface>('Todo', todoSchema)

module.exports = Todo
