const router = require('express').Router()

const Person = require('../models/Person')

//rotas da api
router.post('/', async (req, res) => {
    // req.body

    const { name, salary, approved } = req.body

    if (!name || !salary || !approved) {
        res.status(422).json({ error: 'todos campos são obirgatorio!' })
        return
    }

    const person = {
        name,
        salary,
        approved,
    }

    try {
        //criar dados no banco
        await Person.create(person)

        res.status(201).json({ message: 'criado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json({ 'dados do objeo': people })
    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})

router.get('/:id', async (req, res) => {
    //extrair o dado da requisição

    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ erro: 'usuario não encontrado' })
            return
        }
        res.status(200).json(person)
    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})


router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }


    try {
        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(422).json({ message: 'nenhum usuario modificado!' })
            return
        }
        res.status(200).json(person)
    }
    catch (erro) {
        res.status(500).json({ erro: erro })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = Person.findOne({ _id: id })

    if (!person) {
        res.status(200).json('usuario nao encontrado')
        return
    }

    try {
        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'usuario removido com sucesso!!' })

    } catch (erro) {
        res.status(500).json({ erro: erro })
    }
})

module.exports = router