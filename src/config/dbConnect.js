import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://pedrohpdo:d0c3d19403@cluster0.yhcp71b.mongodb.net/node-express');

const dbConnection = mongoose.connection;

export default dbConnection;