//Entity
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const alumnSchema = new Schema({
  id: { type : ObjectId },
  name: { type: String, require: true },
  surname: { type: String, require: true },
  mail: { type: String, required: true }
});

const alumns = mongoose.model('Alumn', alumnSchema);

export default alumns;
