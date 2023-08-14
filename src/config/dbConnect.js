import mongoose from 'mongoose';

mongoose.connect(process.env.URI_CONNECTION_DB);

const dbConnection = mongoose.connection;

export default dbConnection;