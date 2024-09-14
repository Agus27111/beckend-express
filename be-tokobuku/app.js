const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

//route
const userRouter = require('./src/app/users/router')
const errorHandler = require('./src/middleware/errorHandler')

const url = '/api/v1'

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use(url, userRouter)


app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))