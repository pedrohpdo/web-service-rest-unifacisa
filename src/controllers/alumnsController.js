import alumns from '../models/Alumn.js';

class AlumnController {
  static findAll = async function (req, res) {
    try {
      const result = await alumns.find({}).populate("professor", "name").exec();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: `${error.message}` });
    }
  };

  static findById = async function (req, res) {
    const { id } = req.params;
    try {
      const result = await alumns.findById(id).populate('professor', 'name').exec();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error: `${error.message}`,
      });
    }
  };

  static insert = async function (req, res) {
    let newAlumn = new alumns(req.body);
    try {
      await alumns.create(newAlumn);
      res.status(201).send(newAlumn.toJSON());
    } catch (error) {
      res.status(500).json({
        error: `${error.message}`,
      });
    }
  };

  static alter = async function (req, res) {
    const id = req.params.id;
    try {
      await alumns.findByIdAndUpdate(id, req.body);
      res.status(200).send('fé');
    } catch (error) {
      res.status(500).json({
        error: `${error.message}`,
      });
    }
  };

  static delete = async function (req, res) {
    const { id } = req.params;

    try {
      await alumns.findByIdAndDelete(id);
      res.status(204).json({
        message: 'Deleted successfully',
      });
    } catch (error) {
      res.status(404).json({
        error: `${error.message}`,
      });
    }
  };
}

export default AlumnController;
