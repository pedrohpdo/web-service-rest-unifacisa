import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const professorSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    surname: { type: String },
    class: { type: String },
    mail: { type: String },
});

const professors = mongoose.model('Professor', professorSchema);

export default professors;
