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
      required: true,
    },
    description: {
      type: String,
    },
    deadLine: {
      type: Date,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

todoSchema.index({ listId: 1, name: 1 }, { unique: true })

const Todo = model<TodoInterface>('Todo', todoSchema)

export default Todo
