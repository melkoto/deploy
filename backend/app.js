require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { User } = require('./db/models')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const corsOptions = {
    origin: 'http://87.228.9.214:5173',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.post('/api/users', async (req, res) => {
    console.log('req.body', req.body)
    const { name, email } = req.body
    try {
        const user = await User.create({ name, email })
        console.log({ user })
        res.json(user)
    } catch (error) {
        console.log('error', error)
    }
})

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id, {})
    res.json(user)
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
