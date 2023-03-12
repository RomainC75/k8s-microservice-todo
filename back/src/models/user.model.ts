import { Schema, model, SchemaTypes, Model } from 'mongoose'
import { MongoUserInterface } from '../@types/userInterface'

const userSchema:Schema = new Schema<MongoUserInterface>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: SchemaTypes.String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    // isMailValidated: {
    //   type: Boolean,
    //   default: false,
    // },
    // emailValidationCode: {
    //   type: Number,
    //   required: true,
    // },
    // imageUrl:String
  },
  {
    timestamps: true,
  }
)

const User:Model<any, object> = model<MongoUserInterface>('User', userSchema)

export default User
