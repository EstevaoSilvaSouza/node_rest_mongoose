const router = require('express').Router()

const Category = require('../models/Category')

router.get('/', async (req, res) => {
    try {
        const categorys = await Category.find()
        res.status(200).json(categorys)
    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})

router.post('/', async (req, res) => {
    const { name, type } = req.body

    const category = {
        name,
        type
    }

    try {
        await Category.create(category)
        res.status(200).json({ mensage: 'Usuario criado com sucesso', usuario: category })
    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const categoryFind = await Category.findOne({ _id: id })
        if (!categoryFind) {
            res.status(422).json({ mensagem: 'category not search' })
            return
        }

        res.status(200).json(categoryFind)
    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, type } = req.body

    const category = {
        name,
        type
    }

    try {
        const categoryUpdate = await Category.updateOne({ _id: id }, category)
        res.status(200).json({ user: 'modificado com sucesso', usuario: categoryUpdate })
    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const categoryFind = await Category.findOne({ _id: id })
        if (!categoryFind) {
            res.status(422).json({ message: 'usuario nao encontrado!!!' })
            return
        }

        await Category.deleteOne({ _id: id })
        res.status(200).json({ message: 'deletado com sucesso!!!', category: categoryFind })

    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})

module.exports = router