import express from 'express';
import dbConnection from './config/dbConnect.js';
import alumns from './models/Alumn.js';
import routes from './routes/index.js';

const app = express();
app.use(express.json());

dbConnection.on('error', console.log.bind(console, 'connection error'));

dbConnection.once('open', function () {
  console.log('connection opened');
});

routes(app);

// app.put('/:id', function (req, res) {
//   let index = search(req.params.id);
//   alumns[index].name = req.body.name;
//   res.status(200).json(alumns);
// });

app.delete('/:id', function (req, res) {
  let index = search(req.params.id);
  alumns.splice(index, 1);

  res.send(`id ${index} deleted successfully`);
});

function search(id) {
  return alumns.findIndex((value) => id == value.id);
}

export default app;
