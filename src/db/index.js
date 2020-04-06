import mongoose from 'mongoose'

mongoose.Promise = global.Promise


export const connectDatabase = (MONGO_URI) => {
    mongoose.connect(MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true});
}