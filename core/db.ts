import mongoose from 'mongoose'
import {config} from './config'

export const connectMongoose = () => {
  return mongoose.connect(config.mongo)
}
