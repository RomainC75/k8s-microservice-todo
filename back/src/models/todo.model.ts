import { Schema, model, SchemaTypes } from 'mongoose'

const todoSchema = new Schema(
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
      unique: true,
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

const Todo = model('Todo', todoSchema)

module.exports = Todo
