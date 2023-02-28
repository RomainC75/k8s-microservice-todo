import { Schema, model, SchemaTypes } from 'mongoose'

const listSchema = new Schema(
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
