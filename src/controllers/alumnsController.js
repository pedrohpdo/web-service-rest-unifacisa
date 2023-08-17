import Alumns from '../models/Alumn.js'

class AlumnController {
  static findAll = async (req, res, next) => {
    try {
      const result = await Alumns.find({})
        .populate({ path: 'professor', select: 'class' })
        .exec()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static findById = async (req, res, next) => {
    const { id } = req.params
    try {
      const result = await Alumns.findById(id)
        .populate({ path: 'professor', select: 'class' })
        .exec()

      if (result !== null) {
        res.status(200).json(result)
      } else {
        res.status(404).json({
          message: 'Cannot Entity with id: ' + id,
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static findByParam = async (req, res, next) => {
    const idParam = req.query.professorId
    try {
      const result = await Alumns.find({ professor: idParam })
        .populate({ path: 'professor', select: 'class' })
        .exec()

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static insert = async (req, res, next) => {
    const newAlumn = new Alumns(req.body)
    try {
      await Alumns.create(newAlumn)
      res.status(201).send(newAlumn.toJSON())
    } catch (error) {
      next(error)
    }
  }

  static alter = async (req, res, next) => {
    const id = req.params.id
    try {
      await Alumns.findByIdAndUpdate(id, req.body)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  static delete = async (req, res, next) => {
    const { id } = req.params

    try {
      await Alumns.findByIdAndDelete(id)
      res.status(204).json({
        message: 'Deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}

export default AlumnController
