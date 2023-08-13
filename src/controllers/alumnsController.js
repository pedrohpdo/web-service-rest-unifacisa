import alumns from '../models/Alumn.js';

class AlumnController {
  static findAll = async function (req, res) {
    try {
      const result = await alumns.find({}).exec();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static findById = async function (req, res) {
    const {id} = req.params;
    try {
      const result = await alumns.findById(id).exec();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error: `${error.message}`,
      });
    }
  };

  static insertAlumns = async function (req, res) {
    try {
      await alumns.create(req.body);
      res.status(201).json({
        message: 'Created',
      });
    } catch (error) {
      res.status(500).json({
        error: `${error.message}`,
      });
    }
  };

  static alterAlumn = async function (req, res) {
    const id = req.params.id;
    try {
      await alumns.findByIdAndUpdate(id, req.body);
      res.status(200).send("fé");

    } catch (error) {
      res.status(500).json({
        error: `${error.message}`,
      });
    }
  };
}

export default AlumnController;
