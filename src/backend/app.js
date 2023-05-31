import web from './routes/web.js'

const express = require('express')
const cors = require('cors')
const driver = require('./neo4jService')

const app = express()
app.use(cors())
// Load Routes
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
app.use('/api', web)