import { Schema, model, SchemaTypes } from 'mongoose'
import { ListInterface } from '../@types/list'

const listSchema = new Schema<ListInterface>(
  {
    name: {
      type: String,
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

const List = model<ListInterface>('List', listSchema)

export default List
