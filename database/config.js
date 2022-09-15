import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongodbnodefh')
        console.log('Base de datos online')
    } catch (e) {
        console.log(e)
        throw new Error('Error initialing the database')
    }
}
