
//config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

//configurar Midwlare para se comunicar com json
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())



const personRouters = require('./routes/personRoutes')
const categoryRouters = require('./routes/categoryRoutes')

app.use('/person', personRouters)
app.use('/category', categoryRouters)

//rotas da api
app.get('/', (req, res) => {
    res.json({ message: 'olá mundo!' })
})

app.get('/libros', (req, res) => {
    res.json([{
        nome: 'joao', idade: '50', livros: {
            l1: 'aliçe', l2: 'pandora'
        }
    }])
})

//porta para escutar
//assim que conectar ao banco mongoose ele inicia o servidor ok deixa mais pratico e não faz o serve não iniciar caso o banco caia hehe

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@omegaalfa.4beg4.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        //INICIANDO A ESCUTA DO SERVIDOR EXPRESS API NA PORTA 20000
        app.listen(2000, () => {
            console.log('conectado ao mongo db')
        })
    })
    .catch(erro => console.log(erro))


