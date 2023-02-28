import { Schema, model, SchemaTypes } from 'mongoose'
import { ListInterface } from '../@types/list'

const listSchema = new Schema<ListInterface>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const List = model('List', listSchema)

module.exports = List
